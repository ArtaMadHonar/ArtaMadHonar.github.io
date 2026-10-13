import React from 'react';
import { Sparkles, Cpu, Layers } from 'lucide-react';
import { RD_PRINCIPLES } from '../data/studioData';

export const EditorialPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 sm:py-28 border-t border-[#EAE6DF] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl text-right space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
            EDITORIAL R&D MANIFESTO
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18181B] tracking-tight leading-snug">
            تمایز علمی و هنری: چرا آرتا ماد هنر متفاوت است؟
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
            ما انیمیشن را تنها یک هنر بصری نمی‌دانیم، بلکه آن را تلاقی عمیق تخیل انسانی با مهندسی محاسباتی تلقی می‌کنیم. مانیفست سه‌گانه آزمایشگاه R&D استودیو نقشه راه ما در خلق جهان‌های نو است.
          </p>
        </div>

        {/* 3-Column Editorial Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RD_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE6DF] shadow-[0_12px_40px_rgba(24,24,27,0.03)] space-y-6 text-right transition-all duration-300 hover:border-[#18181B]/50 hover:-translate-y-1"
            >
              {/* Pillar Number & English Tag */}
              <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-5">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#18181B] font-soft farsi-nums">
                  {principle.number}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] latin-soft">
                  {principle.englishTitle}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#18181B] leading-snug">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
