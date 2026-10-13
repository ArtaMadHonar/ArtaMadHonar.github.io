import React, { useRef } from 'react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import { HeroVideoPlayer, HeroVideoPlayerHandle } from './HeroVideoPlayer';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenShowreel,
  onOpenContact,
}) => {
  const playerRef = useRef<HeroVideoPlayerHandle>(null);

  const handlePlayClick = () => {
    playerRef.current?.play();
  };

  return (
    <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Editorial Text Block */}
        <div className="space-y-6 text-right max-w-3xl mx-auto text-center sm:text-right">
          {/* Editorial Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#EAE6DF] text-xs font-medium text-[#52525B]">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-800" />
            <span>استودیو مستقل انیمیشن، رسانه و تکنولوژی سینمایی</span>
          </div>

          {/* Refined Dignified Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#18181B] tracking-normal leading-[1.4] text-balance">
            خلق سینما و هنر تصویر با تلاقی اصالت و مهندسی خلاقیت
          </h1>

          {/* Refined Harmonious Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#52525B] font-normal leading-relaxed max-w-2xl">
            ما ادعا نمی‌کنیم هر کاری را انجام می‌دهیم؛ اما متعهدیم برای چالش‌های به‌ظاهر غیرممکن در دنیای تصویر و انیمیشن، راه‌حلی نوآورانه و بی‌بدیل خلق کنیم.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-full bg-[#18181B] hover:opacity-90 text-[#FAF8F5] text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>شروع همکاری و ثبت پروژه</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-70" />
            </button>

            <button
              onClick={handlePlayClick}
              className="px-5 py-3 rounded-full bg-white hover:bg-stone-50 border border-[#EAE6DF] text-[#18181B] text-xs sm:text-sm font-medium transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#18181B]" />
              <span>پخش تیزر سینمایی روز شگفت‌انگیز</span>
            </button>
          </div>
        </div>

        {/* The Grand Hero Canvas (Wide 21:9 / 16:9 Showcase) with In-Place Video Player */}
        <div className="space-y-4">
          <div className="group relative rounded-3xl overflow-hidden border border-[#EAE6DF] bg-[#0C0B0A] shadow-[0_12px_40px_rgba(24,24,27,0.06)] transition-all duration-500 hover:shadow-2xl">
            <HeroVideoPlayer ref={playerRef} className="w-full h-full" />
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs text-[#71717A] px-2 font-fa text-center sm:text-right">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <span className="font-semibold text-[#18181B]">تیزر رسمی انیمیشن سینمایی «روز شگفت‌انگیز»</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-mono text-[11px] font-semibold text-stone-900">4K MASTER CINEMA</span>
              <span aria-hidden="true" className="text-stone-300 hidden sm:inline">·</span>
              <span className="hidden sm:inline">پایپلاین اختصاصی هوش مصنوعی و CGI</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>آماده برای رونمایی و اکران فجر</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
