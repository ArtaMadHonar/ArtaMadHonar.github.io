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
    url: 'https://s1.uploadkon.ir/b1225488-41b4-4176-a55d-78b6678dd761/b1225488-41b4-4176-a55d-78b6678dd761-babyham.webp',
    alt: 'روز شگفت‌انگیز - کانسپت‌آرت و شخصیت کودک',
  },
  {
    id: 'slide-2',
    url: 'https://s1.uploadkon.ir/22f0d12f-8b58-4c91-b4c6-3ad99b3d694f/22f0d12f-8b58-4c91-b4c6-3ad99b3d694f-hamsters2.webp',
    alt: 'روز شگفت‌انگیز - همسترها و شخصیت‌های مکمل',
  },
  {
    id: 'slide-3',
    url: 'https://s1.uploadkon.ir/e14fa7ac-1b24-4d1a-ac3b-06e5be9dc7e2/e14fa7ac-1b24-4d1a-ac3b-06e5be9dc7e2-Poyogran.webp',
    alt: 'روز شگفت‌انگیز - شات سینمایی پویو و پدربزرگ',
  },
  {
    id: 'slide-4',
    url: 'https://s1.uploadkon.ir/907a66af-e858-475b-866d-a2c491cead48/907a66af-e858-475b-866d-a2c491cead48-poyocactus.webp',
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

  // Preload all slides on mount so switching is instant
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.url;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
      setCurrentDelay(AUTO_SWITCH_DELAY);
    }, currentDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, currentDelay, resetToken, setSlideIndex]);

  const handleUserChange = useCallback(
    (nextIndexOrFn: number | ((prev: number) => number)) => {
      setCurrentDelay(USER_SWITCH_DELAY);
      setResetToken((t) => t + 1);
      setSlideIndex(nextIndexOrFn);
    },
    [setSlideIndex]
  );

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

  const formatEnglishNum = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative group overflow-hidden select-none w-full h-full aspect-video lg:aspect-auto bg-[#121616] ${className}`}
    >
      {/* Subtle timer progress bar indicator in Poyo Turquoise & Warm Ochre */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none overflow-hidden">
        <div
          key={`progress-${currentIndex}-${currentDelay}-${resetToken}`}
          className="h-full bg-gradient-to-r from-[#65B7B5] to-[#D6B16A] animate-slide-progress"
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
            {/* Main Crisp Image */}
            <img
              src={slide.url}
              alt={slide.alt}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="sync"
              className="relative z-10 w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-101"
            />
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={handleNext}
        aria-label="تصویر بعدی"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#3E777A] text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={handlePrev}
        aria-label="تصویر قبلی"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#3E777A] text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Bottom Rail: Slide Counter (English Numerals) & Dots */}
      <div className="absolute bottom-2.5 sm:bottom-4 inset-x-2.5 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
        <div
          dir="ltr"
          className="text-[11px] sm:text-xs font-mono font-bold text-white/95 bg-black/65 px-3 py-1 rounded-full backdrop-blur-md border border-white/15 tabular-nums tracking-wider"
        >
          {formatEnglishNum(currentIndex + 1)} / {formatEnglishNum(SLIDES.length)}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15">
          {SLIDES.map((_, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={(e) => handleSelectDot(idx, e)}
                className={`transition-all rounded-full cursor-pointer ${
                  active
                    ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-[#D6B16A]'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
