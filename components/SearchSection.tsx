
import React, { useState, useEffect, useRef } from 'react';
import { getSmartResponse, getDynamicSuggestions, isAiAvailable, subscribeToAiStatus, SmartResponse } from '../services/geminiService';
import { PORTAL_APPS } from '../constants';

interface Props {
  query: string;
  setQuery: (val: string) => void;
}

const SearchSection: React.FC<Props> = ({ query, setQuery }) => {
  const [aiData, setAiData] = useState<SmartResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [aiReady, setAiReady] = useState(isAiAvailable());
  
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    // Subscribe to global AI status changes (e.g. 429 cooldown resets)
    const unsubscribe = subscribeToAiStatus((available) => {
      setAiReady(available);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const appMatches = PORTAL_APPS
        .filter(app => app.name.toLowerCase().includes(query.toLowerCase()))
        .map(app => `Open ${app.name}`);
      
      setSuggestions(appMatches);
      setShowSuggestions(true);

      if (!aiReady) return;

      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
      
      debounceTimer.current = window.setTimeout(async () => {
        setIsFetchingSuggestions(true);
        const aiSugs = await getDynamicSuggestions(query);
        
        setSuggestions(prev => {
          const combined = Array.from(new Set([...prev, ...aiSugs])).slice(0, 6);
          return combined;
        });
        setIsFetchingSuggestions(false);
      }, 900);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, [query, aiReady]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e?: React.FormEvent, selectedQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = (selectedQuery || query).replace(/^Open /, '');
    if (!finalQuery.trim()) return;
    
    setQuery(finalQuery);
    setShowSuggestions(false);
    setIsSearching(true);
    setAiData(null);
    
    const result = await getSmartResponse(finalQuery);
    setAiData(result);
    setIsSearching(false);
  };

  const handleSuggestionClick = (s: string) => {
    handleSearch(undefined, s);
  };

  const isCooldown = !aiReady;

  return (
    <section className="px-4 mb-8" ref={containerRef}>
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4 relative">
        <div className="text-center mb-2">
          <img src="https://github.com/nasmusic-ai/RAW/blob/main/wireless-wifi-web.png?raw=true" alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,209,255,0.3)]" />
          <p className="text-[10px] text-cyan-300/60 uppercase tracking-[0.2em] font-bold">Wireless Wifi Web</p>
        </div>

        <div className="w-full relative z-20">
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text" 
              value={query}
              onFocus={() => query.length > 1 && setShowSuggestions(true)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isCooldown ? "Search local apps..." : "Ask ALEF AI anything..."}
              className={`w-full bg-white text-black py-4 px-6 rounded-full text-center font-medium shadow-xl focus:outline-none transition-all placeholder:text-gray-400 border-2 ${isCooldown ? 'border-amber-400/50' : 'border-transparent focus:border-cyan-400/30'}`}
            />
            <button 
              type="submit"
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isCooldown ? 'bg-amber-500' : 'bg-cyan-500'} text-white shadow-lg active:scale-95`}
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/20">
              <div className="p-2 border-b border-white/5 bg-white/5 flex justify-between items-center">
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 ${isCooldown ? 'text-amber-400' : 'text-cyan-400/80'}`}>
                  {isCooldown ? 'LOCAL PORTAL INDEX' : 'WORLD WEB TRENDING'}
                </span>
                {isFetchingSuggestions && !isCooldown && (
                   <div className="w-3 h-3 border border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mr-2"></div>
                )}
              </div>
              <ul>
                {suggestions.map((s, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleSuggestionClick(s)}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 active:bg-white/20 group/item"
                    >
                      <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors ${s.startsWith('Open') ? 'group-hover/item:bg-cyan-500/20' : 'group-hover/item:bg-white/10'}`}>
                        {s.startsWith('Open') ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-white/90 group-hover/item:text-cyan-300 transition-colors">{s}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {aiData && (
          <div className={`w-full glass-card p-5 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500 relative z-10 border-t ${aiData.isError ? 'border-amber-500/30' : 'border-white/20'}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${aiData.isError || isCooldown ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                {isCooldown ? 'OFFLINE RECHARGE' : aiData.isWebSearch ? '🌍 ALEF WORLD WEB' : 'Smile ALEF AI'}
              </span>
              {aiData.isWebSearch && !aiData.isError && (
                <span className="text-[9px] text-cyan-400/60 animate-pulse font-bold uppercase tracking-widest ml-1">Live Sync</span>
              )}
              <button onClick={() => setAiData(null)} className="ml-auto text-white/30 text-xs hover:text-white transition-colors">✕</button>
            </div>
            
            <p className="text-sm text-white/95 leading-relaxed">
              {aiData.text}
            </p>

            {aiData.sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">Verified Sources</p>
                <div className="flex flex-wrap gap-2">
                  {aiData.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] bg-white/5 hover:bg-white/10 text-cyan-400 px-3 py-1.5 rounded-lg border border-white/5 transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="max-w-[120px] truncate font-medium">{source.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
