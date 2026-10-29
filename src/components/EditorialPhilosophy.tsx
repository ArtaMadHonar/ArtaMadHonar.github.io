import React from 'react';
import { RD_PRINCIPLES } from '../data/studioData';

export const EditorialPhilosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="py-14 sm:py-20 border-t border-[#DCD6C8] relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Full-Width Balanced Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DCD6C8] pb-6 text-right">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold">
              CORE STUDIO CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424] tracking-tight leading-snug">
              توانمندی‌های کلیدی استودیو آرتا ماد هنر
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#434846] max-w-md leading-relaxed">
            رویکرد استودیو بر پیوند خلاقیت، توسعه تجاری دارایی‌های فکری (IP) و بهره‌گیری هدفمند از فناوری‌های نوین در تمامی حلقه‌های زنجیره تولید استوار است.
          </p>
        </div>

        {/* 5 Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RD_PRINCIPLES.map((principle, idx) => (
            <div
              key={principle.number}
              className={`p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-4 text-right flex flex-col justify-between transition-all duration-300 hover:border-[#3E777A]/60 hover:-translate-y-0.5 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#FAF8F4] to-[#F3EFE5]' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Pillar Number & English Tag */}
                <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-3.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#3E777A] font-soft farsi-nums">
                    {principle.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A76] latin-soft">
                    {principle.englishTitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2424] leading-snug">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#434846] leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>

              {idx === 0 && (
                <div className="pt-3 border-t border-[#E5E0D4] flex flex-wrap items-center justify-between gap-2 text-xs text-[#3E777A] font-semibold">
                  <span>انیمیشن سینمایی بلند · توسعه دنیای داستانی · اقتباس میان‌رسانه‌ای</span>
                  <span className="font-mono text-[11px] text-[#777A76]">IP ECOSYSTEM</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

