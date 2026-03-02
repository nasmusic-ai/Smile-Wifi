import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section className="px-4 mb-6">
      <div className="max-w-xl mx-auto rounded-2xl overflow-hidden glass-card shadow-2xl">
        <div className="aspect-video relative">
          <video 
            className="w-full h-full object-cover"
            poster="https://picsum.photos/id/1018/800/450"
            controls
            playsInline
          >
            <source 
              src="https://raw.githubusercontent.com/etherneomdc3-IT/RAW/main/Cantilan.mp4" 
              type="video/mp4" 
            />
          </video>
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter uppercase">Live Portal TV</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white/90">Experience the future of local connectivity</h3>
          <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-medium">Smile Network Daily Highlight</p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;