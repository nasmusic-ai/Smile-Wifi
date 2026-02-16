
import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-3-flash-preview";

export interface SearchSource {
  title: string;
  url: string;
}

export interface SmartResponse {
  text: string;
  sources: SearchSource[];
  isWebSearch: boolean;
  isError?: boolean;
}

// Global Circuit Breaker State
let isGlobalQuotaExhausted = false;
let quotaResetTimeout: number | null = null;
const listeners: Array<(available: boolean) => void> = [];

const notifyListeners = () => {
  listeners.forEach(l => l(!isGlobalQuotaExhausted));
};

export const subscribeToAiStatus = (callback: (available: boolean) => void) => {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx > -1) listeners.splice(idx, 1);
  };
};

// Simple In-Memory Caches
const responseCache: Record<string, SmartResponse> = {};
const suggestionCache: Record<string, string[]> = {};

/**
 * Helper to create a fresh AI instance.
 */
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Activates the circuit breaker for 60 seconds if a 429 is hit.
 */
const triggerQuotaCooldown = () => {
  if (isGlobalQuotaExhausted) return;
  
  isGlobalQuotaExhausted = true;
  notifyListeners();
  console.warn("AI Quota Exhausted: Entering 60s cooldown.");
  
  if (quotaResetTimeout) window.clearTimeout(quotaResetTimeout);
  quotaResetTimeout = window.setTimeout(() => {
    isGlobalQuotaExhausted = false;
    quotaResetTimeout = null;
    notifyListeners();
    console.info("AI Quota Cooldown: Resetting circuit breaker.");
  }, 60000);
};

/**
 * Common error handler.
 */
const handleAiError = (error: any, context: string): SmartResponse => {
  const isQuota = 
    error?.status === "RESOURCE_EXHAUSTED" || 
    error?.code === 429 ||
    JSON.stringify(error).toLowerCase().includes("quota") ||
    JSON.stringify(error).toLowerCase().includes("429");

  console.error(`Gemini Service [${context}] Error:`, error);

  if (isQuota) {
    triggerQuotaCooldown();
    return { 
      text: "ALEF AI is currently over-capacity. Switching to local portal indexing.", 
      sources: [], 
      isWebSearch: false,
      isError: true
    };
  }
  return { 
    text: "Atmospheric interference detected. Local search remains operational.", 
    sources: [], 
    isWebSearch: false,
    isError: true
  };
};

export const getSmartResponse = async (query: string): Promise<SmartResponse> => {
  if (!query?.trim()) return { text: "How can I help you today?", sources: [], isWebSearch: false };
  
  const normalizedQuery = query.trim().toLowerCase();
  if (responseCache[normalizedQuery]) return responseCache[normalizedQuery];
  
  if (isGlobalQuotaExhausted) return { 
    text: "ALEF AI is in low-power mode. Local search only.", 
    sources: [], 
    isWebSearch: false 
  };

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: query,
      config: {
        systemInstruction: `
          You are ALEF, the Smile Wifi World-Web Assistant.
          You have real-time access to the entire internet via Google Search.
          When answering:
          1. Prioritize accuracy and recent events.
          2. Keep responses brief and mobile-friendly (under 45 words).
          3. Use bold for key entities.
          4. If the user asks about the creators:
             - The founder of Smile Wifi is CEO **Don Jose Guardo**.
             - The apps developer is **Jorjan Lanaja**.
          5. If the user is looking for an app on the portal, recommend it.
        `,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "I couldn't retrieve a live update. Try another topic!";
    
    // Extract sources from grounding metadata
    const sources: SearchSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web && chunk.web.uri) {
        sources.push({
          title: chunk.web.title || "Web Source",
          url: chunk.web.uri
        });
      }
    });

    const uniqueSources = Array.from(new Map(sources.map(s => [s.url, s])).values());

    const result: SmartResponse = {
      text,
      sources: uniqueSources,
      isWebSearch: uniqueSources.length > 0
    };

    responseCache[normalizedQuery] = result;
    return result;
  } catch (error) {
    return handleAiError(error, "getSmartResponse");
  }
};

export const getDynamicSuggestions = async (input: string): Promise<string[]> => {
  const normalizedInput = input.trim().toLowerCase();
  if (suggestionCache[normalizedInput]) return suggestionCache[normalizedInput];
  if (isGlobalQuotaExhausted) return [];

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `Generate 3 trending questions or topics about "${input}".`,
      config: {
        systemInstruction: "Return exactly 3 short strings separated by newlines. No numbers, no periods.",
        temperature: 0.8,
      },
    });
    
    const results = response.text?.split('\n')
      .map(s => s.trim().replace(/^[^a-zA-Z0-9]+/, ''))
      .filter(s => s.length > 0) || [];
    
    if (results.length > 0) suggestionCache[normalizedInput] = results;
    return results;
  } catch (error) {
    return [];
  }
};

export const getSmartWeatherInsight = async (temp: number, condition: string): Promise<string> => {
  const cacheKey = `weather_${temp}_${condition}`;
  if (isGlobalQuotaExhausted) return "Atmospheric conditions nominal.";

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `Weather: ${temp}°C, ${condition}. Short futuristic vibe insight.`,
      config: {
        systemInstruction: "One short sentence. Under 8 words.",
      }
    });
    return response.text?.trim() || "Optimal conditions.";
  } catch {
    return "Sensors synchronized.";
  }
};

export const isAiAvailable = () => !isGlobalQuotaExhausted;
