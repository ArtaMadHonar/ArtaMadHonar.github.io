import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface FlagshipImageSlide {
  id: string;
  url: string;
  fallbackUrl: string;
  alt: string;
}

const SLIDES: FlagshipImageSlide[] = [
  {
    id: 'slide-1',
    url: 'https://s1.uploadkon.ir/b1225488-41b4-4176-a55d-78b6678dd761/b1225488-41b4-4176-a55d-78b6678dd761-babyham.webp',
    fallbackUrl: 'https://my.uploadkon.ir/d/s5m1gGTGtQHGTXoNJbqbODjCBDlp0C/NTM0NjV8cGFkZA.webp',
    alt: 'روز شگفت‌انگیز - کانسپت‌آرت و شخصیت کودک',
  },
  {
    id: 'slide-2',
    url: 'https://s1.uploadkon.ir/22f0d12f-8b58-4c91-b4c6-3ad99b3d694f/22f0d12f-8b58-4c91-b4c6-3ad99b3d694f-hamsters2.webp',
    fallbackUrl: 'https://my.uploadkon.ir/d/738azeYo1haWym8RKQkuAhD9a4mKkv/NTM0NjZ8cGFkZA.webp',
    alt: 'روز شگفت‌انگیز - همسترها و شخصیت‌های مکمل',
  },
  {
    id: 'slide-3',
    url: 'https://s1.uploadkon.ir/e14fa7ac-1b24-4d1a-ac3b-06e5be9dc7e2/e14fa7ac-1b24-4d1a-ac3b-06e5be9dc7e2-Poyogran.webp',
    fallbackUrl: 'https://my.uploadkon.ir/d/YJHLUj7EHxpdPffT3TkF4Iv7QR7Ulq/NTM0NjR8cGFkZA.webp',
    alt: 'روز شگفت‌انگیز - شات سینمایی پوپو',
  },
  {
    id: 'slide-4',
    url: 'https://s1.uploadkon.ir/907a66af-e858-475b-866d-a2c491cead48/907a66af-e858-475b-866d-a2c491cead48-poyocactus.webp',
    fallbackUrl: 'https://my.uploadkon.ir/d/pT94wdX9g1Ii0z0tQbng2CSiIA0neX/NTM0NjN8cGFkZA.webp',
    alt: 'روز شگفت‌انگیز - شات ۳D پوپو و کاکتوس',
  },
];

// Timing configuration:
// 5 seconds default automatic switch
// 8 seconds if user manually interacts / changes slide
const AUTO_SWITCH_DELAY = 5000;
const USER_SWITCH_DELAY = 8000;

export const FlagshipSlideshow: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDelay, setCurrentDelay] = useState(AUTO_SWITCH_DELAY);
  const [resetToken, setResetToken] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Preload all slides in advance
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;
    });
  }, []);

  // Auto slide transition effect:
  // Runs with `currentDelay` (5000ms by default, 8000ms if user manually switched).
  // Once an automatic transition executes, it reverts the delay back to 5000ms.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      // Auto change reverts timer back to 5 seconds
      setCurrentDelay(AUTO_SWITCH_DELAY);
    }, currentDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, currentDelay, resetToken]);

  // Handler for user manual switch:
  // Resets timer, gives 8 seconds for the upcoming switch
  const handleUserChange = useCallback((nextIndexOrFn: number | ((prev: number) => number)) => {
    setCurrentDelay(USER_SWITCH_DELAY);
    setResetToken((t) => t + 1);
    setCurrentIndex(nextIndexOrFn);
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleUserChange((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleUserChange((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSelectDot = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleUserChange(idx);
  };

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleUserChange((prev) => (prev + 1) % SLIDES.length);
      } else {
        handleUserChange((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      }
    }
    touchStartX.current = null;
  };

  // Helper for Persian numerals
  const toPersianNum = (num: number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative group overflow-hidden select-none w-full h-full aspect-video bg-[#141210] ${className}`}
    >
      {/* Subtle timer progress bar indicator */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none overflow-hidden">
        <div
          key={`progress-${currentIndex}-${currentDelay}-${resetToken}`}
          className="h-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-slide-progress"
          style={{
            animationDuration: `${currentDelay}ms`,
          }}
        />
      </div>

      {/* Main Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out overflow-hidden ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Ambient blurred backdrop to eliminate harsh black borders */}
            <img
              src={slide.url}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-30 pointer-events-none"
            />
            {/* Sharp foreground image */}
            <img
              src={slide.url}
              alt={slide.alt}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== slide.fallbackUrl) {
                  target.src = slide.fallbackUrl;
                }
              }}
              className="relative z-10 w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-101"
            />
          </div>
        );
      })}

      {/* Navigation Arrows (Floating Sides) */}
      <button
        onClick={handleNext}
        aria-label="تصویر بعدی"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 hover:scale-105 shadow-xl cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={handlePrev}
        aria-label="تصویر قبلی"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 hover:scale-105 shadow-xl cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Minimal Bottom Rail: Slide Counter & Clean Indicator Dots */}
      <div className="absolute bottom-2.5 sm:bottom-4 inset-x-2.5 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
        {/* Persian Slide Counter Badge */}
        <div className="text-[10px] sm:text-xs font-mono font-bold text-white/90 bg-black/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border border-white/15 shadow-md">
          {toPersianNum(currentIndex + 1)} / {toPersianNum(SLIDES.length)}
        </div>

        {/* Clean Indicator Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border border-white/15">
          {SLIDES.map((_, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={(e) => handleSelectDot(idx, e)}
                className={`transition-all rounded-full cursor-pointer ${
                  active
                    ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-amber-400 shadow-xs'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`اسلاید ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
