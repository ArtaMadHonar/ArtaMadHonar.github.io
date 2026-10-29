import React from 'react';
import { NAME_PILLARS } from '../data/studioData';

export const IdentityStory: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 border-t border-[#DCD6C8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Full-Width Balanced Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DCD6C8] pb-6 text-right">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold">
              ORIGIN & STUDIO IDENTITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424] tracking-tight font-fa">
              ریشه و هویت نام «آرتا ماد هنر»
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#434846] max-w-md leading-relaxed font-fa">
            نام استودیو بازتابی از چشم‌انداز ما در خلق دارایی‌های فکری (IP) با هویت هنری و فرهنگی متمایز است؛ پیوندی میان اصالت کهن و نوآوری معاصر.
          </p>
        </div>

        {/* The Three Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {NAME_PILLARS.map((pillar) => (
            <div
              key={pillar.word}
              className="p-7 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-4 text-right transition-all duration-300 hover:border-[#3E777A]/60 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-3.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1E2424] font-fa">
                  {pillar.word}
                </span>
                <span className="text-xs font-mono font-bold text-[#3E777A] font-en tracking-wider">
                  {pillar.phonetic}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#777A76] block mb-1 font-fa">
                  مفهوم بنیادین:
                </span>
                <h3 className="text-base font-bold text-[#1E2424] font-fa">
                  {pillar.meaning}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#434846] leading-relaxed font-fa">
                {pillar.elaboration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

