import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FlagshipSlideshow, SLIDES } from './FlagshipSlideshow';
import { WONDERFUL_DAY_CATALOG } from '../data/studioData';

interface FlagshipSpotlightProps {
  onOpenTeaser?: () => void;
  onOpenDomain?: () => void;
}

export const FlagshipSpotlight: React.FC<FlagshipSpotlightProps> = ({
  onOpenDomain,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <section
      id="flagship"
      className="py-14 sm:py-18 bg-[#F4F0E6]/65 border-y border-[#DCD6C8] relative scroll-mt-20"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-8">
        {/* 1. Refined Header: Small "انیمیشن سینمایی" above Large "روز شگفت‌انگیز" + Subtle English */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#DCD6C8]">
          <div className="space-y-1.5 text-right">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-[#3E777A]">
              <span>انیمیشن سینمایی</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span className="text-xs font-semibold text-[#434846]">
                به تهیه‌کنندگی فیلمیران
              </span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span
                dir="ltr"
                className="font-en text-[11px] sm:text-xs font-bold tracking-wider text-[#777A76] uppercase"
              >
                {WONDERFUL_DAY_CATALOG.titleEn} · 3D FEATURE FILM
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-[#1E2424] tracking-tight leading-[1.1]">
              {WONDERFUL_DAY_CATALOG.titleFa}
            </h2>
          </div>

          {/* Unboxed Specs + Direct Link to Animation Department */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            <div className="text-xs text-[#434846] flex flex-wrap items-center gap-2">
              <span>
                ژانر: <strong className="text-[#1E2424]">{WONDERFUL_DAY_CATALOG.genre}</strong>
              </span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span>
                مخاطب: <strong className="text-[#1E2424]">{WONDERFUL_DAY_CATALOG.audience}</strong>
              </span>
            </div>

            {onOpenDomain && (
              <button
                onClick={onOpenDomain}
                className="px-4 sm:px-5 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>ورود به دپارتمان انیمیشن</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-85" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Balanced Main Showcase Card (16:9 Slideshow + Logline & Frame Strip, Zero Empty Space) */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.05)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Visual Column (7 cols): Full-height 16:9 Slideshow with English numerals */}
            <div className="lg:col-span-7 relative w-full bg-[#121616] aspect-video lg:aspect-auto lg:min-h-[430px] flex">
              <FlagshipSlideshow
                className="w-full h-full object-cover"
                activeIndex={activeSlideIndex}
                onIndexChange={setActiveSlideIndex}
              />
            </div>

            {/* Logline, Frame Selector & Credits Column (5 cols): 100% height-matched */}
            <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between text-right bg-[#FAF8F4] border-t lg:border-t-0 lg:border-r border-[#DCD6C8] gap-5">
              {/* Top: Official Story Introduction Block (Without writing the word 'لاگ‌لاین') */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F0E6]/85 border border-[#E5E0D4] space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-[#DCD6C8]/80 pb-2">
                  <span className="text-xs sm:text-[13px] font-black text-[#3E777A]">
                    انیمیشن سینمایی روز شگفت‌انگیز :
                  </span>
                  <span
                    dir="ltr"
                    className="text-[10px] font-mono font-bold tracking-wider text-[#777A76] uppercase shrink-0"
                  >
                    A WONDERFUL DAY
                  </span>
                </div>

                <p className="text-xs sm:text-[14px] text-[#1E2424] font-medium leading-[1.9] text-justify">
                  پویو یه بچه‌ی بدشانسه که توی خانواده‌ای زندگی می‌کنه که اعضاش اونقدر خوش‌شانس و بی‌نقصن که نامزدِ «خانواده‌ی شایسته» شدن! پویو روز تولدش آرزو می‌کنه که بقیه هم بتونن درکش کنن؛ غافل از اینکه برای اولین بار، قراره همه به اندازه‌ی خودش بدشانس بشن!
                </p>
              </div>

              {/* Middle: Synchronized 4-Frame Concept Selector + Concise Keywords */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#777A76]">
                  <span className="font-bold text-[#1E2424]">قاب‌های منتخب انیمیشن</span>
                  <span dir="ltr" className="font-mono font-semibold text-[#3E777A]">
                    0{activeSlideIndex + 1} / 0{SLIDES.length}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {SLIDES.map((slide, idx) => {
                    const isSelected = idx === activeSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        aria-label={slide.alt}
                        className={`group relative aspect-video rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#3E777A] ring-2 ring-[#3E777A]/35 opacity-100 shadow-2xs'
                            : 'border-[#DCD6C8] opacity-65 hover:opacity-100 hover:border-[#3E777A]/60'
                        }`}
                      >
                        <img
                          src={slide.url}
                          alt={slide.alt}
                          referrerPolicy="no-referrer"
                          loading="eager"
                          decoding="sync"
                          className="w-full h-full object-cover"
                        />
                        <span
                          dir="ltr"
                          className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/65 text-[9px] font-mono font-bold text-white tabular-nums"
                        >
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-[#3E777A]">
                  <span>انیمیشن سه‌بعدی استایلایز</span>
                  <span aria-hidden="true" className="text-[#777A76]">·</span>
                  <span>کمدی فانتزی و موزیکال</span>
                  <span aria-hidden="true" className="text-[#777A76]">·</span>
                  <span>پایپلاین ترکیبی هنر و AI</span>
                </div>
              </div>

              {/* Bottom: Key Creative Credits Strip */}
              <div className="pt-3.5 border-t border-[#E5E0D4] grid grid-cols-3 gap-2.5 text-right">
                <div>
                  <span className="text-[10px] text-[#777A76] block">کارگردان</span>
                  <span className="text-xs font-bold text-[#1E2424]">محمود محمدیان</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777A76] block">مجری طرح و مدیر تولید</span>
                  <span className="text-xs font-bold text-[#1E2424]">مهدی محمدیان</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777A76] block">مدیر فنی پایپلاین AI</span>
                  <span className="text-xs font-bold text-[#1E2424]">محمد رحیمی</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



