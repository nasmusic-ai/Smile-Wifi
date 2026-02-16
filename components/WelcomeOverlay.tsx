
import React from 'react';

interface Props {
  onStart: () => void;
}

const WelcomeOverlay: React.FC<Props> = ({ onStart }) => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 text-center px-6"
      onClick={onStart}
    >
      <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-105">
        <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all"></div>
        <img 
          src="https://github.com/nasmusic-ai/RAW/blob/main/smile-logo.png?raw=true" 
          alt="Smile Logo" 
          className="w-40 h-40 object-cover rounded-full border-4 border-cyan-400/50 shadow-[0_0_50px_rgba(0,209,255,0.4)] animate-pulse-custom"
        />
      </div>
      
      <h1 className="mt-8 text-3xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        SMILE WIFI
      </h1>
      <p className="mt-2 text-cyan-300/80 font-medium tracking-widest text-sm">
        V5 PORTAL ECOSYSTEM
      </p>
      
      <p className="mt-12 text-white/50 text-sm animate-bounce">
        Tap anywhere to enter
      </p>
    </div>
  );
};

export default WelcomeOverlay;
