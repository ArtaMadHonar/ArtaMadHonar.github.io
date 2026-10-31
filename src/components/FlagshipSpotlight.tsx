import React, { useState } from 'react';
import { Play, Film, Sparkles, Layers } from 'lucide-react';
import { FlagshipSlideshow } from './FlagshipSlideshow';
import { WONDERFUL_DAY_CATALOG } from '../data/studioData';

interface FlagshipSpotlightProps {
  onOpenTeaser: () => void;
}

export const FlagshipSpotlight: React.FC<FlagshipSpotlightProps> = ({ onOpenTeaser }) => {
  const [activeTab, setActiveTab] = useState<'world' | 'visual' | 'pipeline'>('world');

  return (
    <section
      id="flagship"
      className="py-16 sm:py-20 bg-[#F4F0E6]/65 border-y border-[#DCD6C8] relative scroll-mt-20"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-8 sm:space-y-10">
        {/* 1. Refined Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#DCD6C8]">
          <div className="space-y-2 text-right">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#3E777A]">
              <span className="font-mono uppercase tracking-widest">FEATURE FILM SPOTLIGHT</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span>اثر سینمایی شاخص استودیو</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span>به تهیه‌کنندگی فیلمیران</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424]">
                انیمیشن سینمایی «{WONDERFUL_DAY_CATALOG.titleFa}»
              </h2>
              <span className="text-lg sm:text-2xl font-en font-bold text-[#3E777A]">
                {WONDERFUL_DAY_CATALOG.titleEn}
              </span>
            </div>
          </div>

          {/* Primary Action & Unboxed Specs */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            <div className="text-xs text-[#434846] flex items-center gap-2">
              <span>ژانر: <strong className="text-[#1E2424]">{WONDERFUL_DAY_CATALOG.genre}</strong></span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span>مخاطب: <strong className="text-[#1E2424]">{WONDERFUL_DAY_CATALOG.audience}</strong></span>
            </div>

            <button
              onClick={onOpenTeaser}
              className="px-5 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>تماشای تیزر سینمایی</span>
            </button>
          </div>
        </div>

        {/* 2. Balanced Main Showcase Card (16:9 Slideshow + Concise Core Synopsis) */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.05)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Visual Column (7 cols): Full-height Slideshow without extra box underneath */}
            <div className="lg:col-span-7 relative w-full bg-[#121616] aspect-video lg:aspect-auto lg:min-h-[420px] flex">
              <FlagshipSlideshow className="w-full h-full object-cover" />
            </div>

            {/* Narrative Column (5 cols): Perfectly proportioned to match the 16:9 slideshow height */}
            <div className="lg:col-span-5 p-5 sm:p-8 lg:p-9 flex flex-col justify-between text-right bg-[#FAF8F4] border-t lg:border-t-0 lg:border-r border-[#DCD6C8] space-y-5 sm:space-y-6">
              <div className="space-y-3.5 sm:space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#3E777A] block">
                    خلاصه داستان و درون‌مایه اثر
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-[#1E2424] leading-snug">
                    آیا برای داشتن یک روز خوب، باید همه‌چیز بی‌نقص باشد؟
                  </h3>
                </div>

                <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                  {WONDERFUL_DAY_CATALOG.synopsisParagraphs[0]}
                </p>

                <p className="text-xs sm:text-[13px] text-[#434846] leading-relaxed">
                  تمایز روایی فیلم در ترکیب کمدی فیزیکی و موقعیت‌های اغراق‌آمیز با موسیقی، ترانه، رپ و لحظه‌های فانتزی است؛ جایی که بدبیاری‌های پویو به بخشی از مسیر شناخت خود، پذیرش تفاوت‌های فردی و درک ارزش واقعی خانواده تبدیل می‌شوند.
                </p>
              </div>

              {/* Key Creative Credits Strip */}
              <div className="pt-4 border-t border-[#E5E0D4] grid grid-cols-2 sm:grid-cols-3 gap-3 text-right">
                <div>
                  <span className="text-[10px] text-[#777A76] block">کارگردان</span>
                  <span className="text-xs font-bold text-[#1E2424]">محمود محمدیان</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777A76] block">مجری طرح و مدیر تولید</span>
                  <span className="text-xs font-bold text-[#1E2424]">مهدی محمدیان</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#777A76] block">مدیر فنی پایپلاین AI</span>
                  <span className="text-xs font-bold text-[#1E2424]">محمد رحیمی</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Full-Width Interactive Production Dossier Bar Below the Split */}
          <div className="border-t border-[#DCD6C8] bg-[#F4F0E6]/60 p-4 sm:p-8 space-y-5 sm:space-y-6">
            {/* Segmented Navigation Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 border-b border-[#DCD6C8] pb-4">
              <div className="text-right">
                <h4 className="text-sm sm:text-base font-black text-[#1E2424]">
                  ابعاد هنری، هویت بصری و پایپلاین تولید «روز شگفت‌انگیز»
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:flex items-center gap-1.5 p-1.5 bg-[#EDE9DF] border border-[#DCD6C8] rounded-xl shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('world')}
                  className={`px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
                    activeTab === 'world'
                      ? 'bg-[#3E777A] text-[#FAF8F4] shadow-2xs'
                      : 'text-[#434846] hover:text-[#1E2424]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5 shrink-0" />
                  <span>جهان داستان و ارزش فرهنگی</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('visual')}
                  className={`px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
                    activeTab === 'visual'
                      ? 'bg-[#3E777A] text-[#FAF8F4] shadow-2xs'
                      : 'text-[#434846] hover:text-[#1E2424]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>۵ رکن هویت بصری و کیفیت</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
                    activeTab === 'pipeline'
                      ? 'bg-[#3E777A] text-[#FAF8F4] shadow-2xs'
                      : 'text-[#434846] hover:text-[#1E2424]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>فناوری تولید و توسعه IP</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Story World, Characters & Cultural Value in a Balanced 2-Column Row */}
            {activeTab === 'world' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-[#1E2424]">
                      جهان شهری و خانواده میو
                    </span>
                    <span className="text-[10px] font-mono text-[#3E777A] font-semibold uppercase">
                      STORY WORLD & CAST
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                    {WONDERFUL_DAY_CATALOG.synopsisParagraphs[1]}
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-[#1E2424]">
                      ارزش هنری و فرهنگی اثر
                    </span>
                    <span className="text-[10px] font-mono text-[#3E777A] font-semibold uppercase">
                      ARTISTIC & CULTURAL VALUE
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                    {WONDERFUL_DAY_CATALOG.artisticValue}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: 5 Visual Pillars in a Clean 5-Column Horizontal Grid */}
            {activeTab === 'visual' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-right">
                {WONDERFUL_DAY_CATALOG.visualPillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#3E777A] font-semibold block">
                        0{i + 1} · {pillar.titleEn}
                      </span>
                      <h5 className="text-xs sm:text-sm font-black text-[#1E2424]">
                        {pillar.titleFa}
                      </h5>
                    </div>
                    <p className="text-xs text-[#434846] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Hybrid AI Pipeline + Upcoming IP Slate */}
            {activeTab === 'pipeline' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right items-stretch">
                <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#3E777A] font-semibold block">
                      HYBRID AI & VFX PIPELINE
                    </span>
                    <h5 className="text-sm sm:text-base font-black text-[#1E2424]">
                      فناوری و پایپلاین تولید در آرتا ماد هنر
                    </h5>
                    <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                      {WONDERFUL_DAY_CATALOG.pipelineText}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {WONDERFUL_DAY_CATALOG.upcomingProjects.map((up, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] flex flex-col justify-between space-y-2.5"
                    >
                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-[#3E777A] block">
                          {up.badge}
                        </span>
                        <h5 className="text-sm font-black text-[#1E2424]">
                          {up.titleFa}{' '}
                          <span className="font-en text-xs font-semibold text-[#777A76] block mt-0.5">
                            {up.titleEn}
                          </span>
                        </h5>
                      </div>
                      <p className="text-xs text-[#434846] leading-relaxed">
                        {up.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


