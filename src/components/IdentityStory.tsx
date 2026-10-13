import React from 'react';
import { NAME_PILLARS } from '../data/studioData';

export const IdentityStory: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#EAE6DF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl text-right space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
            ORIGIN & ETYMOLOGY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18181B] tracking-tight font-fa">
            داستان و ریشه نام «آرتا ماد هنر»
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-fa">
            نام استودیو، بیانیه هویتی ماست؛ سه‌گانه‌ای که پیوند میان فضیلت اخلاقی، ریشه‌های تاریخی و تجلی خلاقیت انسان را بازتاب می‌دهد.
          </p>
        </div>

        {/* The Three Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NAME_PILLARS.map((pillar) => (
            <div
              key={pillar.word}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE6DF] shadow-[0_12px_40px_rgba(24,24,27,0.03)] space-y-5 text-right transition-all duration-300 hover:border-[#18181B]/50 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-5">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#18181B] font-fa">
                  {pillar.word}
                </span>
                <span className="text-xs font-mono font-bold text-[#71717A] bg-[#FBF9F5] px-3 py-1 rounded-full border border-[#EAE6DF] font-en">
                  {pillar.phonetic}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#18181B] block mb-1 font-fa">
                  معنای بنیادین:
                </span>
                <h3 className="text-base font-bold text-[#18181B] font-fa">
                  {pillar.meaning}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-fa">
                {pillar.elaboration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
