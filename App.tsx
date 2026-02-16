
import React, { useState, useEffect, useRef } from 'react';
import WelcomeOverlay from './components/WelcomeOverlay';
import Sidebar from './components/Sidebar';
import SearchSection from './components/SearchSection';
import AppGrid from './components/AppGrid';
import BottomCarousel from './components/BottomCarousel';
import VideoSection from './components/VideoSection';
import WeatherSection from './components/WeatherSection';
import AllAppsOverlay from './components/AllAppsOverlay';
import { PORTAL_APPS } from './constants';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllAppsOpen, setIsAllAppsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-x-hidden">
      {!hasStarted && <WelcomeOverlay onStart={handleStart} />}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onOpen={() => setIsSidebarOpen(true)}
      />

      <main className={`flex-1 flex flex-col pt-16 transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
        <WeatherSection />
        
        <VideoSection />
        
        <SearchSection 
          query={searchQuery} 
          setQuery={setSearchQuery} 
        />

        <div className="flex-1">
          <AppGrid />
        </div>

        <div className="h-24"></div> {/* Spacer for bottom nav */}
      </main>

      <BottomCarousel 
        onHomeClick={() => setIsAllAppsOpen(true)}
        hasStarted={hasStarted}
      />

      {isAllAppsOpen && (
        <AllAppsOverlay 
          apps={PORTAL_APPS} 
          onClose={() => setIsAllAppsOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
