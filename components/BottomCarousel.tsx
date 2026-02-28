import React from 'react';

interface Props {
  onHomeClick: () => void;
  hasStarted: boolean;
}

const BottomCarousel: React.FC<Props> = ({ onHomeClick, hasStarted }) => {
  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-8
        transition-all duration-1000 transform
        ${hasStarted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
    >
      {/* Left GIF */}
      <a
        href="#"
        className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-white/10 hover:border-cyan-400/50 hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <img
          src="https://github.com/nasmusic-ai/RAW/blob/main/Mars.gif?raw=true"
          alt="Mars"
          className="w-full h-full object-contain object-center"
        />
      </a>

      {/* Center Button with Liked GIF */}
      <button
        onClick={onHomeClick}
        className="w-20 h-20 rounded-full glass-card flex items-center justify-center border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,209,255,0.2)] hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <img
          src="https://github.com/nasmusic-ai/RAW/blob/main/liked.gif?raw=true"
          alt="Liked"
          className="w-full h-full object-contain object-center"
        />
      </button>

      {/* Right GIF */}
      <a
        href="#"
        className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-white/10 hover:border-cyan-400/50 hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <img
          src="https://github.com/nasmusic-ai/RAW/blob/main/earth.gif?raw=true"
          alt="Earth"
          className="w-full h-full object-contain object-center"
        />
      </a>
    </div>
  );
};

export default BottomCarousel;
