
import React from 'react';
import { AppItem } from '../types';

interface Props {
  apps: AppItem[];
  onClose: () => void;
}

const AllAppsOverlay: React.FC<Props> = ({ apps, onClose }) => {
  return (
    <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl p-6 flex flex-col animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Ecosystem Apps</h2>
          <p className="text-xs text-cyan-400/70 font-bold uppercase tracking-widest mt-1">Full Catalog</p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold hover:bg-red-500 transition-colors"
        >✕</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-12">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {apps.map((app) => (
            <a 
              key={app.id} 
              href={app.href}
              className="flex flex-col items-center gap-3 group animate-in zoom-in-75 duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={app.img} 
                  alt={app.name} 
                  className="w-20 h-20 rounded-2xl object-cover border border-white/10 group-hover:border-cyan-400 group-hover:scale-105 transition-all relative z-10" 
                />
              </div>
              <span className="text-[11px] font-semibold text-white/80 group-hover:text-cyan-400 text-center uppercase tracking-tight">
                {app.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppsOverlay;
