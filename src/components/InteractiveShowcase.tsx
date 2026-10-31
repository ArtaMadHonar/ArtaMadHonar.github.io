import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SELECTED_WORKS, ProjectWork } from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';

// Preload all project cover images at module load so tab switching is instant
if (typeof window !== 'undefined') {
  SELECTED_WORKS.forEach((work) => {
    if (work.imageUrl) {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = work.imageUrl;
    }
  });
}

interface InteractiveShowcaseProps {
  onSelectProject: (project: ProjectWork) => void;
}

export const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = ({
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'همه حوزه‌ها (۵)' },
    { id: 'animation', label: '۱. انیمیشن و توسعه IP' },
    { id: 'commercial', label: '۲. تبلیغات و CGI' },
    { id: 'game', label: '۳. بازی‌سازی تعاملی' },
    { id: 'web3', label: '۴. فناوری و Web3' },
    { id: 'vfx', label: '۵. ویدئو مپینگ و رویداد' },
  ];

  const filteredProjects = SELECTED_WORKS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.categoryKey === activeTab;
  });

  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const toPersianNum = (num: number) =>
    String(num)
      .padStart(2, '0')
      .replace(/[0-9]/g, (w) => persianDigits[+w]);

  const getCanonicalDeptIndex = (project: ProjectWork, fallbackIdx: number) => {
    const canonicalIndex = SELECTED_WORKS.findIndex((w) => w.id === project.id) + 1;
    return canonicalIndex > 0 ? canonicalIndex : fallbackIdx + 1;
  };

  return (
    <section id="works" className="py-14 sm:py-20 relative scroll-mt-20">
      <div id="departments" className="absolute -top-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Section Header: Two-Tier Editorial Architecture */}
        <div className="space-y-5 sm:space-y-6 border-b border-[#DCD6C8] pb-6 sm:pb-7">
          {/* Tier 1: Title & Lead Copy */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 text-right">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#3E777A]">
                <span className="font-mono uppercase tracking-widest">
                  STUDIO DOMAINS & PORTFOLIO
                </span>
                <span aria-hidden="true" className="text-[#777A76]">·</span>
                <span>۵ محور تخصصی خلق و تولید</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424] tracking-tight">
                حوزه‌های فعالیت و آثار منتخب استودیو
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#434846] max-w-xl leading-relaxed lg:text-left">
              هر یک از پنج دپارتمان تخصصی استودیو دارای صفحه اختصاصی شامل گالری آثار، تصاویر، ویدیوها و معرفی اعضای متخصص همان بخش است.
            </p>
          </div>

          {/* Tier 2: Dedicated Filter Bar (Wraps cleanly on mobile, inline on desktop) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F4F0E6] border border-[#DCD6C8] rounded-2xl">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#3E777A] text-[#FAF8F4] shadow-xs'
                      : 'text-[#434846] hover:text-[#1E2424] hover:bg-[#E7E2D6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="hidden lg:inline-block text-xs text-[#777A76] whitespace-nowrap shrink-0">
              برای ورود به صفحه اختصاصی هر دپارتمان، روی کارت کلیک کنید
            </span>
          </div>
        </div>

        {/* Compact Bento Grid (2 Top Featured Cards + 3 Bottom Cards when showing all) */}
        <div
          className={`grid grid-cols-1 gap-6 sm:gap-7 ${
            activeTab === 'all' ? 'md:grid-cols-6' : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProjects.map((project, idx) => {
            const canonicalNum = getCanonicalDeptIndex(project, idx);
            const isTopRowBento = activeTab === 'all' && idx < 2;
            const colSpanClass =
              activeTab === 'all'
                ? isTopRowBento
                  ? 'md:col-span-3'
                  : 'md:col-span-2'
                : 'col-span-1';

            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`${colSpanClass} group cursor-pointer rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-[0_18px_45px_rgba(30,36,36,0.08)] hover:-translate-y-1`}
              >
                <div>
                  {/* 16:9 Visual Cover */}
                  <div className="aspect-video w-full overflow-hidden bg-[#121616] relative flex items-center justify-center border-b border-[#DCD6C8]">
                    <VisualArtCanvas
                      type={project.canvasType}
                      imageUrl={project.imageUrl}
                      className="w-full h-full group-hover:scale-103 transition-transform duration-700"
                      showControls={false}
                    />
                  </div>

                  {/* Concise Card Body */}
                  <div className="p-5 sm:p-6 space-y-2.5 text-right">
                    {/* Unboxed Metadata Row */}
                    <div className="flex items-center justify-between text-[11px] text-[#777A76]">
                      <span className="font-bold text-[#3E777A]">{project.categoryFa}</span>
                      <span className="font-mono font-bold text-[#3E777A] farsi-nums">
                        حوزه {toPersianNum(canonicalNum)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors leading-snug">
                      {project.shortTitle || project.title}
                    </h3>

                    {/* Concise 2-Line Summary */}
                    <p className="text-xs text-[#434846] leading-relaxed line-clamp-2">
                      {project.shortSummary || project.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action -> Enters Dedicated Page */}
                <div className="px-5 sm:px-6 py-4 bg-[#F4F0E6]/65 border-t border-[#E5E0D4] flex items-center justify-between text-xs font-semibold text-[#3E777A]">
                  <span>ورود به صفحه اختصاصی دپارتمان</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-85 group-hover:-translate-x-1 transition-transform" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};


