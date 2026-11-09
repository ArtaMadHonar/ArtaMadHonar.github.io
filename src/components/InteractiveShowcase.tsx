import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SELECTED_WORKS } from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';

export const InteractiveShowcase: React.FC = () => {
  return (
    <section id="works" className="py-14 sm:py-18 relative scroll-mt-20">
      <div id="departments" className="absolute -top-20 pointer-events-none" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-7 sm:space-y-9">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD6C8] pb-5 sm:pb-6 text-right">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#3E777A]">
              <span>۵ دپارتمان تخصصی</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span
                dir="ltr"
                className="font-mono text-[11px] uppercase tracking-widest text-[#777A76]"
              >
                STUDIO DOMAINS & PORTFOLIO
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424]">
              حوزه‌های فعالیت استودیو
            </h2>
          </div>

          <span className="text-xs text-[#777A76]">
            برای مشاهده گالری آثار و اعضای هر بخش، روی دپارتمان مورد نظر کلیک کنید
          </span>
        </div>

        {/* 2 + 3 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 sm:gap-6">
          {SELECTED_WORKS.map((project, idx) => {
            const isTopRowBento = idx < 2;
            const colSpanClass = isTopRowBento ? 'md:col-span-3' : 'md:col-span-2';
            const deptNum = String(idx + 1).padStart(2, '0');

            return (
              <a
                key={project.id}
                href={`/${project.id}`}
                className={`${colSpanClass} group cursor-pointer rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-[0_18px_45px_rgba(30,36,36,0.08)] hover:-translate-y-1 no-underline text-inherit`}
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

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-2 text-right">
                    <div className="flex items-center justify-between text-[11px] text-[#777A76]">
                      <span className="font-en text-[11px] text-[#777A76] truncate">
                        {project.subtitle}
                      </span>
                      <span
                        dir="ltr"
                        className="font-mono font-bold text-[#3E777A] tabular-nums shrink-0"
                      >
                        {deptNum}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors leading-snug">
                      {project.shortTitle || project.title}
                    </h3>

                    <div className="pt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-semibold text-[#3E777A]">
                      {project.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          {tIdx > 0 && (
                            <span aria-hidden="true" className="text-[#777A76]">
                              ·
                            </span>
                          )}
                          <span>{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-5 sm:px-6 py-3.5 bg-[#F4F0E6]/65 border-t border-[#E5E0D4] flex items-center justify-between text-xs font-semibold text-[#3E777A]">
                  <span>ورود به دپارتمان و مشاهده آثار</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-85 group-hover:-translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
