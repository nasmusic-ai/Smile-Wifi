
import React, { useState, useRef, useEffect } from 'react';
import { PORTAL_APPS } from '../constants';

const AppGrid: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pageSize = 6;
  const pages = [];
  for (let i = 0; i < PORTAL_APPS.length; i += pageSize) {
    pages.push(PORTAL_APPS.slice(i, i + pageSize));
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActivePage(index);
    }
  };

  return (
    <section className="mb-4">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {pages.map((page, pIdx) => (
          <div key={pIdx} className="min-w-full grid grid-cols-3 gap-y-8 gap-x-4 p-6 snap-start">
            {page.map((app) => (
              <a 
                key={app.id} 
                href={app.href}
                className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden glass-card border border-white/20 shadow-xl group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] transition-all">
                  <img src={app.img} alt={app.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                </div>
                <span className="text-[10px] font-medium text-white/70 group-hover:text-cyan-400 text-center line-clamp-1 w-full uppercase tracking-tighter">
                  {app.name}
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {pages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${activePage === idx ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AppGrid;
