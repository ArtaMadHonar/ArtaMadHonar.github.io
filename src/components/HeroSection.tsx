import React, { useRef } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { HeroVideoPlayer, HeroVideoPlayerHandle } from './HeroVideoPlayer';
import { STUDIO_CATALOG_INFO } from '../data/studioData';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
}) => {
  const playerRef = useRef<HeroVideoPlayerHandle>(null);

  const handlePlayClick = () => {
    playerRef.current?.play();
  };

  return (
    <section
      id="about-studio"
      className="pt-8 pb-14 sm:pt-12 sm:pb-20 overflow-hidden relative scroll-mt-20"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        {/* Full-Width Balanced Editorial Hero Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end border-b border-[#DCD6C8] pb-7 sm:pb-8 text-right">
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
            {/* Unboxed Clean Kicker with Typographic Separator */}
            <div className="flex flex-wrap items-center justify-start gap-2 text-xs sm:text-sm font-medium text-[#3E777A]">
              <span className="font-bold">آرتا ماد هنر</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span>معرفی استودیو</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span className="font-en text-[11px] sm:text-xs text-[#777A76]">Art, Animation & Creative Technology</span>
            </div>

            {/* Dignified Display Headline */}
            <h1 className="text-xl sm:text-4xl lg:text-[2.6rem] font-black text-[#1E2424] tracking-tight leading-[1.4] sm:leading-[1.35]">
              مجموعه‌ای خلاق در تلاقی هنر و فناوری؛ تبدیل ایده‌ها به تجربه‌های تصویری و متمایز
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-4 sm:space-y-5 flex flex-col items-stretch sm:items-start lg:items-end justify-between">
            {/* Official Studio Intro from Catalog */}
            <p className="text-xs sm:text-sm text-[#434846] font-normal leading-relaxed text-right">
              {STUDIO_CATALOG_INFO.intro}
            </p>

            {/* Action Row: Full-width stacked on phones, inline on sm+ */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-start lg:justify-end gap-2.5 w-full">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>شروع همکاری و ثبت پروژه</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-85" />
              </button>

              <button
                onClick={handlePlayClick}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#FAF8F4] hover:bg-[#F3EFE6] border border-[#D5CFC0] hover:border-[#65B7B5] text-[#1E2424] text-xs font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#3E777A]" />
                <span>پخش تیزر «روز شگفت‌انگیز»</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Grand Hero Video Showcase */}
        <div className="space-y-3">
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5CFC0] bg-[#141818] shadow-[0_18px_50px_rgba(30,36,36,0.08)] transition-all duration-500">
            <HeroVideoPlayer ref={playerRef} className="w-full h-full" />
          </div>

          {/* Clean Unboxed Metadata Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-xs text-[#777A76] px-1 sm:px-2 font-fa text-right">
            <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2.5">
              <span className="font-bold text-[#1E2424]">انیمیشن سینمایی بلند «روز شگفت‌انگیز» (A Wonderful Day)</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#3E777A] font-semibold">ژانر: کمدی، ماجراجویی و خانوادگی</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">مخاطب: کودکان و خانواده</span>
            </div>
            <div className="text-[11px] sm:text-xs text-[#777A76]">
              <span>تولید استودیو آرتا ماد هنر · پایپلاین ترکیبی هنر و هوش مصنوعی</span>
            </div>
          </div>
        </div>

        {/* Studio History & Vision Grid (Directly from Page 2 of the Official Catalog) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* History Card */}
          <div className="p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-3 text-right relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-3">
              <h2 className="text-sm sm:text-lg font-bold text-[#1E2424]">
                تاریخچه شکل‌گیری
              </h2>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#3E777A] font-semibold">
                01. STUDIO HERITAGE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#434846] leading-relaxed">
              {STUDIO_CATALOG_INFO.history}
            </p>
          </div>

          {/* Vision & Approach Card */}
          <div className="p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-3 text-right relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-3">
              <h2 className="text-sm sm:text-lg font-bold text-[#1E2424]">
                چشم‌انداز و رویکرد بین‌المللی
              </h2>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#3E777A] font-semibold">
                02. VISION & IP APPROACH
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#434846] leading-relaxed">
              {STUDIO_CATALOG_INFO.vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
