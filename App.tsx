
import React, { useState, useEffect, useCallback } from 'react';
import { SECTIONS } from './constants';
import TerminalOutput from './components/TerminalOutput';

const App: React.FC = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowDown") {
      setCurrentSectionIndex(prevIndex => (prevIndex + 1) % SECTIONS.length);
    } else if (e.key === "ArrowUp") {
      setCurrentSectionIndex(prevIndex => (prevIndex - 1 + SECTIONS.length) % SECTIONS.length);
    }
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStartY(e.targetTouches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartY === null) {
      return;
    }

    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY - touchEndY;

    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    if (isSwipeUp) {
      setCurrentSectionIndex(prevIndex => (prevIndex + 1) % SECTIONS.length);
    } else if (isSwipeDown) {
      setCurrentSectionIndex(prevIndex => (prevIndex - 1 + SECTIONS.length) % SECTIONS.length);
    }
    
    setTouchStartY(null);
  }, [touchStartY]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleKeyDown, handleTouchStart, handleTouchEnd]);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-gray-900/70 border-2 border-green-700/50 rounded-lg shadow-2xl shadow-green-500/10 p-4 sm:p-6 md:p-8">
        <div className="flex items-center pb-4 border-b-2 border-green-700/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="ml-4 text-sm text-gray-400">bash -- GridPirat Terminal</p>
        </div>
        <div className="pt-4 mt-2 text-base sm:text-lg">
          <div className="flex items-center flex-wrap">
            <span className="text-cyan-400">user@gridpirat</span>
            <span className="text-gray-500">:</span>
            <span className="text-yellow-400">~</span>
            <span className="text-gray-500">$</span>
          </div>
          <div className="mt-4">
            <TerminalOutput key={currentSectionIndex} textToType={SECTIONS[currentSectionIndex]} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
