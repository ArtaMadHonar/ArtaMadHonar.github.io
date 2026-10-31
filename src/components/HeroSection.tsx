import React, { useRef } from 'react';
import { HeroVideoPlayer, HeroVideoPlayerHandle } from './HeroVideoPlayer';

interface HeroSectionProps {
  onOpenShowreel?: () => void;
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const playerRef = useRef<HeroVideoPlayerHandle>(null);

  return (
    <section
      id="about-studio"
      className="pt-7 pb-12 sm:pt-10 sm:pb-16 overflow-hidden relative scroll-mt-20"
    >
      {/* Subtle Watercolor & Architectural Ambient Touches from Poyo Palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[32rem] h-[32rem] rounded-full bg-[#82B9D8]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#D6B16A]/15 blur-3xl"
      />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-8 relative z-10">
        {/* Clean Hero Header: Studio Title & Creative Domains */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD6C8] pb-6 sm:pb-7 text-right">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3E777A]">
              <span>استودیو</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span
                dir="ltr"
                className="font-en text-[11px] sm:text-xs font-semibold tracking-widest text-[#777A76] uppercase"
              >
                ARTA MAD HONAR STUDIO
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[4rem] xl:text-[4.4rem] font-black text-[#1E2424] tracking-tight leading-[1.08]">
              آرتا ماد هنر
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm font-semibold text-[#434846]">
            <span className="text-[#3E777A] font-bold">خلق و توسعه IP</span>
            <span aria-hidden="true" className="text-[#777A76]">·</span>
            <span>انیمیشن سینمایی</span>
            <span aria-hidden="true" className="text-[#777A76]">·</span>
            <span>تیزر و CGI</span>
            <span aria-hidden="true" className="text-[#777A76]">·</span>
            <span>بازی‌سازی</span>
            <span aria-hidden="true" className="text-[#777A76]">·</span>
            <span>فناوری‌های نوین</span>
          </div>
        </div>

        {/* The Grand Hero Video Showcase (Full-Width 21:9 Teaser) */}
        <div className="space-y-2.5">
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5CFC0] bg-[#141818] shadow-[0_18px_50px_rgba(30,36,36,0.08)] transition-all duration-500">
            <HeroVideoPlayer ref={playerRef} className="w-full h-full" />
          </div>

          {/* Clean Unboxed Metadata Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-xs text-[#777A76] px-1 sm:px-2 font-fa text-right">
            <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2.5">
              <span className="font-bold text-[#1E2424]">
                تیزر انیمیشن سینمایی بلند «روز شگفت‌انگیز» (A Wonderful Day)
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#3E777A] font-semibold">
                ژانر: کمدی، ماجراجویی و خانوادگی
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-[#777A76]">
              <span>تولید استودیو آرتا ماد هنر · پایپلاین ترکیبی هنر و هوش مصنوعی</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

