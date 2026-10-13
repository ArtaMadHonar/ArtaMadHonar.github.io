import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Box, Film, Video, Gamepad2 } from 'lucide-react';
import { SELECTED_WORKS, ProjectWork } from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';

interface InteractiveShowcaseProps {
  onSelectProject: (project: ProjectWork) => void;
}

// Preload project posters into browser cache
if (typeof window !== 'undefined') {
  SELECTED_WORKS.forEach((w) => {
    if (w.imageUrl) {
      const img = new Image();
      img.src = w.imageUrl;
    }
  });
}

export const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = ({
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'همه آثار' },
    { id: 'animation', label: 'انیمیشن سینمایی' },
    { id: 'commercial', label: 'تیزرسازی و تبلیغات تجاری' },
    { id: 'vfx', label: 'پروجکشن مپینگ و رویدادها' },
    { id: 'web3', label: 'وب۳ و بلاکچین' },
    { id: 'game', label: 'آزمایشگاه بازی‌سازی' },
  ];

  const filteredProjects = SELECTED_WORKS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.categoryKey === activeTab;
  });

  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const toPersianNum = (num: number) => String(num).padStart(2, '0').replace(/[0-9]/g, (w) => persianDigits[+w]);

  const getCanonicalDeptIndex = (project: ProjectWork, fallbackIdx: number) => {
    const canonicalIndex = SELECTED_WORKS.findIndex((w) => w.id === project.id) + 1;
    return canonicalIndex > 0 ? canonicalIndex : fallbackIdx + 1;
  };

  return (
    <section id="works" className="py-20 sm:py-28 border-t border-[#EAE6DF] relative scroll-mt-20">
      {/* Anchor for direct departments navigation */}
      <div id="departments" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header & Interactive Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAE6DF] pb-8">
          <div className="space-y-2 text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              PORTFOLIO & CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#18181B]">
              آثار و دپارتمان‌های تخصصی استودیو
            </h2>
          </div>

          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#F3EFEA] border border-[#EAE6DF] rounded-2xl overflow-x-auto max-w-full scrollbar-none shrink-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#18181B] text-[#FAF8F5] shadow-xs'
                    : 'text-[#52525B] hover:text-[#18181B] hover:bg-stone-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid with Consistent, Orderly Studio Layout */}
        <div className="space-y-8 sm:space-y-12">
          {filteredProjects.map((project, idx) => {
            const isGameLab = project.isUpcoming;
            const canonicalNum = getCanonicalDeptIndex(project, idx);

            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-3xl bg-white border border-[#EAE6DF] overflow-hidden transition-all duration-300 hover:border-[#18181B]/40 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  {/* Visual Canvas - Always Pristine 16:9 Aspect Ratio with Zero Cropping */}
                  <div className="lg:col-span-7 w-full shrink-0">
                    <div className="aspect-video w-full overflow-hidden bg-[#121110] relative flex items-center justify-center">
                      <VisualArtCanvas
                        type={project.canvasType}
                        imageUrl={project.imageUrl}
                        className="w-full h-full group-hover:scale-102 transition-transform duration-700"
                        showControls={false}
                      />
                      {isGameLab && (
                        <div className="absolute top-4 right-4 z-10 px-3.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-md">
                          Coming Soon · به‌زودی
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Information Details */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-5 text-right flex flex-col justify-between">
                    {/* Header Tags & Canonical Department Index */}
                    <div className="flex items-center justify-between text-xs text-[#71717A] border-b border-[#EAE6DF] pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#18181B]">{project.categoryFa}</span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="font-mono text-[11px] text-[#71717A] tracking-wider">{project.subtitle}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-stone-800 bg-[#F3EFEA] px-2.5 py-1 rounded-full border border-[#EAE6DF]/60 shrink-0">
                        دپارتمان {toPersianNum(canonicalNum)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#18181B] group-hover:text-black transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights list */}
                    <div className="space-y-2 pt-2 border-t border-[#EAE6DF]">
                      {project.highlightsTitle && (
                        <span className="text-xs font-bold text-[#18181B] block mb-1">
                          {project.highlightsTitle}
                        </span>
                      )}
                      {project.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#52525B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Link & Meta Footer */}
                    <div className="pt-3 border-t border-[#EAE6DF] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#18181B] group-hover:underline flex items-center gap-1.5">
                        <span>مشاهده پرونده تخصصی این اثر</span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-70" />
                      </span>
                      <span className="text-[11px] font-mono text-[#71717A]">
                        {project.tags?.[0] || 'استودیو آرتا ماد هنر'}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
