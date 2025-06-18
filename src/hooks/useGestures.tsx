
import { useState, useCallback, useRef, useEffect } from 'react';

interface TouchPoint {
  x: number;
  y: number;
}

interface UseGesturesProps {
  onPinch?: (scale: number) => void;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  minScale?: number;
  maxScale?: number;
}

export const useGestures = ({ 
  onPinch, 
  onSwipe, 
  minScale = 0.5, 
  maxScale = 3 
}: UseGesturesProps = {}) => {
  const [scale, setScale] = useState(1);
  const [lastScale, setLastScale] = useState(1);
  const touchStartRef = useRef<TouchPoint | null>(null);
  const initialDistanceRef = useRef<number | null>(null);
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Single touch for swipe detection
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    } else if (e.touches.length === 2) {
      // Two fingers for pinch detection
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      initialDistanceRef.current = distance;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistanceRef.current && onPinch) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const newScale = Math.min(Math.max((distance / initialDistanceRef.current) * lastScale, minScale), maxScale);
      setScale(newScale);
      onPinch(newScale);
    }
  }, [onPinch, lastScale, minScale, maxScale]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      // Handle swipe detection
      if (touchStartRef.current && onSwipe) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
          onSwipe(deltaX > 0 ? 'right' : 'left');
        } else if (Math.abs(deltaY) > minSwipeDistance) {
          onSwipe(deltaY > 0 ? 'down' : 'up');
        }
      }
      
      touchStartRef.current = null;
      setLastScale(scale);
    }
    
    if (e.touches.length < 2) {
      initialDistanceRef.current = null;
    }
  }, [onSwipe, scale]);

  return {
    scale,
    gestureHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
};
