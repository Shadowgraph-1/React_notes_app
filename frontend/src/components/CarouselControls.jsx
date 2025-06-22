import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export const NavigationButtons = ({ handlePrev, handleNext, isTransitioning }) => (
  <>
    <div className="carousel-controls left">
      <button className="nav-button" onClick={handlePrev} disabled={isTransitioning}>
        <ChevronLeft size={24} />
      </button>
    </div>
    <div className="carousel-controls right">
      <button className="nav-button" onClick={handleNext} disabled={isTransitioning}>
        <ChevronRight size={24} />
      </button>
    </div>
  </>
);

export const CarouselInfo = ({ 
  isAutoScroll, 
  toggleAutoScroll, 
  currentPostIndex, 
  totalPosts 
}) => (
  <div className="carousel-info">
    <button className="auto-scroll-toggle" onClick={toggleAutoScroll}>
      {isAutoScroll ? <Pause size={16} /> : <Play size={16} />}
      {isAutoScroll ? 'Пауза' : 'Воспроизвести'}
    </button>
    
    <div className="progress-bar">
      <div 
        className="progress-fill"
        style={{ width: `${((currentPostIndex + 1) / totalPosts) * 100}%` }}
      ></div>
    </div>
    
    <span className="carousel-indicator">
      {currentPostIndex + 1} из {totalPosts}
    </span>
  </div>
);