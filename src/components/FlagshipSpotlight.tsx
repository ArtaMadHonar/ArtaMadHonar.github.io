import React from 'react';
import { Trophy, ArrowLeft, Play, Images } from 'lucide-react';
import { FlagshipSlideshow } from './FlagshipSlideshow';

interface FlagshipSpotlightProps {
  onOpenTeaser: () => void;
}

export const FlagshipSpotlight: React.FC<FlagshipSpotlightProps> = ({ onOpenTeaser }) => {
  return (
    <section id="flagship" className="py-20 sm:py-28 border-t border-[#EAE6DF] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Section Kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAE6DF] pb-8">
          <div className="space-y-2 text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              FEATURE FILM SPOTLIGHT · CONCEPT SLIDESHOW
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#18181B] font-fa">
              انیمیشن سینمایی بلند «روز شگفت‌انگیز»
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#52525B] max-w-md text-right leading-relaxed font-fa">
            اسلایدهای کانسپت‌آرت، رندرهای سه‌بعدی و شات‌های هنری اثر با امکان افزودن مستقیم تصاویر دلخواه و مشاهده جزئیات باکیفیت.
          </p>
        </div>

        {/* Magazine-Style Grand Showcase Card */}
        <div className="rounded-3xl bg-white border border-[#EAE6DF] shadow-[0_12px_40px_rgba(24,24,27,0.04)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Visual Slideshow Column */}
            <div className="lg:col-span-7 relative w-full aspect-video bg-[#141210] overflow-hidden flex items-center justify-center">
              <FlagshipSlideshow className="w-full h-full" />
            </div>

            {/* Editorial Synopsis & Story Details Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-right bg-white">
              <div className="space-y-6">
                {/* Prestigious Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B]">
                  <span className="px-3 py-1 rounded-full bg-[#F3EFEA] text-[#18181B] font-semibold font-fa">
                    سینمای کودک، خانواده و طنز
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F3EFEA] text-[#18181B] font-semibold font-fa">
                    نخستین پایپلاین اختصاصی هوش مصنوعی
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FBF9F5] text-amber-700 border border-amber-200/60 font-semibold font-fa flex items-center gap-1">
                    <Images className="w-3.5 h-3.5" />
                    <span>گالری و اسلایدشو فعال</span>
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#18181B] leading-tight font-fa">
                    روز شگفت‌انگیز
                  </h3>
                  <p className="text-xs text-[#71717A] font-en mt-1">
                    A Wonderful Day · 3D Feature Film Showcase
                  </p>
                </div>

                {/* Story Synopsis */}
                <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-fa">
                  روایتی پر از ماجراجویی، خنده و احساس با طراحی بصری فاخر به سبک پیکسار (Pixar-Style)، تولیدشده با تلفیق هنر دست انیماتورهای تراز اول و شتاب‌دهنده‌های هوش مصنوعی استودیو آرتا ماد هنر.
                </p>

                {/* Festival Ribbon */}
                <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-[#18181B] block font-fa">
                      هدف‌گذاری رونمایی جشنواره فیلم فجر
                    </span>
                    <span className="text-[#71717A] font-fa">
                      آماده‌سازی نسخه مستر ۴K با صدای دالبی اتموس
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#EAE6DF] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={onOpenTeaser}
                  className="px-4 py-2.5 rounded-full border border-[#D4CEBF] hover:border-[#18181B] text-[#18181B] text-xs font-semibold transition-all flex items-center gap-2 font-fa"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>تیزر ویدیویی سینمایی</span>
                </button>

                <button
                  onClick={onOpenTeaser}
                  className="px-5 py-2.5 rounded-full bg-[#18181B] hover:opacity-90 text-[#FAF8F5] text-xs font-semibold transition-all flex items-center gap-2 shadow-xs font-fa"
                >
                  <span>سالن نمایش کامل</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-70" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

