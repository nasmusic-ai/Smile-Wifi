
import React from 'react';
import { NAV_LINKS } from '../constants';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={onOpen}
        className="fixed top-4 left-4 z-[1001] bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg active:scale-95 transition-all"
      >
        <div className="w-6 h-0.5 bg-cyan-400 mb-1.5 rounded-full"></div>
        <div className="w-6 h-0.5 bg-cyan-400 mb-1.5 rounded-full"></div>
        <div className="w-4 h-0.5 bg-cyan-400 rounded-full"></div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Menu Panel */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-black/95 border-r border-white/10 z-[1200]
        transform transition-transform duration-300 ease-out p-6 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-cyan-400">Navigation</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
        </div>

        <nav className="space-y-2">
          {NAV_LINKS.map((link, idx) => (
            <a 
              key={idx}
              href={link.href}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="text-white/80 font-medium group-hover:text-cyan-400 transition-colors">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20">
            <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-white/70">Local Network Connected</span>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-white/20 text-center">Smile Wifi V5.0.0 © 2024</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
