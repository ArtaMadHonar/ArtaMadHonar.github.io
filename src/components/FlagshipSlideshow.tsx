import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface FlagshipImageSlide {
  id: string;
  url: string;
  alt: string;
}

export const SLIDES: FlagshipImageSlide[] = [
  {
    id: 'slide-1',
    url: '/assets/concepts/babyham.webp',
    alt: 'روز شگفت‌انگیز - کانسپت‌آرت و شخصیت کودک',
  },
  {
    id: 'slide-2',
    url: '/assets/concepts/hamsters2.webp',
    alt: 'روز شگفت‌انگیز - همسترها و شخصیت‌های مکمل',
  },
  {
    id: 'slide-3',
    url: '/assets/concepts/Poyogran.webp',
    alt: 'روز شگفت‌انگیز - شات سینمایی پویو و پدربزرگ',
  },
  {
    id: 'slide-4',
    url: '/assets/concepts/poyocactus.webp',
    alt: 'روز شگفت‌انگیز - شات ۳D پویو و کاکتوس',
  },
];

const AUTO_SWITCH_DELAY = 5000;
const USER_SWITCH_DELAY = 8000;

interface FlagshipSlideshowProps {
  className?: string;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const FlagshipSlideshow: React.FC<FlagshipSlideshowProps> = ({
  className = '',
  activeIndex,
  onIndexChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = activeIndex !== undefined ? activeIndex : internalIndex;
  const [currentDelay, setCurrentDelay] = useState(AUTO_SWITCH_DELAY);
  const [resetToken, setResetToken] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const setSlideIndex = useCallback(
    (nextIndexOrFn: number | ((prev: number) => number)) => {
      const nextVal =
        typeof nextIndexOrFn === 'function' ? nextIndexOrFn(currentIndex) : nextIndexOrFn;
      setInternalIndex(nextVal);
      onIndexChange?.(nextVal);
    },
    [currentIndex, onIndexChange]
  );

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setCurrentDelay(USER_SWITCH_DELAY);
    setResetToken((t) => t + 1);
  }, [setSlideIndex]);

  const prevSlide = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setCurrentDelay(USER_SWITCH_DELAY);
    setResetToken((t) => t + 1);
  }, [setSlideIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
      setCurrentDelay(AUTO_SWITCH_DELAY);
    }, currentDelay);

    return () => clearInterval(timer);
  }, [currentIndex, currentDelay, resetToken, setSlideIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`relative overflow-hidden select-none bg-[#121616] ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="اسلایدشوی کانسپت‌آرت‌های انیمیشن روز شگفت‌انگیز"
    >
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        );
      })}

      {/* Progress Bars */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-1.5 pointer-events-none">
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === currentIndex;
          const isPassed = idx < currentIndex;
          return (
            <div
              key={slide.id}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-xs"
            >
              {isCurrent && (
                <div
                  key={`${slide.id}-${resetToken}`}
                  className="h-full bg-[#65B7B5] rounded-full animate-slide-progress"
                  style={{ animationDuration: `${currentDelay}ms` }}
                />
              )}
              {isPassed && <div className="h-full bg-white/60 rounded-full" />}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between z-20 pointer-events-none">
        <button
          type="button"
          onClick={nextSlide}
          aria-label="اسلاید بعد"
          className="p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-xs transition-all pointer-events-auto cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={prevSlide}
          aria-label="اسلاید قبل"
          className="p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-xs transition-all pointer-events-auto cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
