
import React, { useState, useEffect } from 'react';
import { getSmartWeatherInsight } from '../services/geminiService';

interface WeatherData {
  temp: number;
  condition: string;
  locationName: string;
  insight: string;
}

const WeatherSection: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      // Using Open-Meteo (Free, no key required)
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;
      
      // Basic WMO Code mapping
      const conditions: Record<number, string> = {
        0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 61: 'Rainy', 71: 'Snowy',
        80: 'Rain Showers', 95: 'Thunderstorm'
      };
      const condition = conditions[code] || 'Stable';
      
      const insight = await getSmartWeatherInsight(temp, condition);
      
      setWeather({
        temp,
        condition,
        locationName: 'Local Sector', // Browser reverse geocoding is slow, using generic local label
        insight
      });
    } catch (err) {
      console.error(err);
      setError("Atmospheric sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => {
          // Fallback to a default location (e.g., Cantilan where Smile is active)
          fetchWeather(9.3333, 125.9667);
        }
      );
    } else {
      fetchWeather(9.3333, 125.9667);
    }
  }, []);

  if (loading) return (
    <div className="px-4 mb-6">
      <div className="max-w-xl mx-auto h-24 glass-card rounded-2xl flex items-center justify-center animate-pulse">
        <span className="text-cyan-400/50 text-xs font-bold tracking-widest uppercase">Scanning Atmosphere...</span>
      </div>
    </div>
  );

  if (!weather) return null;

  return (
    <section className="px-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="max-w-xl mx-auto glass-card rounded-2xl p-4 flex items-center justify-between border-l-4 border-cyan-400">
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {weather.condition.includes('Clear') ? '☀️' : 
             weather.condition.includes('Cloud') || weather.condition.includes('Overcast') ? '☁️' : 
             weather.condition.includes('Rain') ? '🌧️' : '🌤️'}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{weather.temp}°C</span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{weather.condition}</span>
            </div>
            <p className="text-[10px] text-white/40 font-medium uppercase tracking-tighter mt-1 italic">
              {weather.insight}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Environmental Feed</div>
          <div className="text-[10px] font-bold text-cyan-500/80 bg-cyan-500/10 px-2 py-0.5 rounded-full inline-block">
            STABLE
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
