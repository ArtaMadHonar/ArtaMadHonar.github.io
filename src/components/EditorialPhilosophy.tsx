import React from 'react';

interface CapabilityPillar {
  num: string;
  title: string;
  en: string;
  keywords: string[];
}

const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    num: '01',
    title: 'خلق و توسعه IP',
    en: 'IP DEVELOPMENT',
    keywords: ['جهان‌سازی و روایت اورجینال', 'شخصیت‌پردازی ماندگار', 'پتانسیل اکران بین‌المللی'],
  },
  {
    num: '02',
    title: 'تولید یکپارچه تصویری',
    en: 'VISUAL PRODUCTION',
    keywords: ['انیمیشن سه‌بعدی سینمایی', 'تیزرهای تبلیغاتی و CGI', 'ویدئو مپینگ و صحنه'],
  },
  {
    num: '03',
    title: 'پایپلاین هنر و AI',
    en: 'HYBRID AI PIPELINE',
    keywords: ['شتاب‌دهی هوشمند تولید', 'تثبیت پیوستگی استایل بصری', 'کنترل کیفی کارگردانی'],
  },
  {
    num: '04',
    title: 'گسترش زنجیره ارزش',
    en: 'VALUE CHAIN',
    keywords: ['اقتباس به سریال و بازی', 'توسعه محصولات جانبی', 'تجاری‌سازی ۳۶۰ درجه'],
  },
  {
    num: '05',
    title: 'هم‌افزایی میان‌رشته‌ای',
    en: 'CREATIVE SYNERGY',
    keywords: ['تلفیق سینما و مهندسی', 'طراحی صدا و موسیقی اختصاصی', 'استاندارد تولید جهانی'],
  },
];

export const EditorialPhilosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="py-12 sm:py-16 border-t border-[#DCD6C8] relative scroll-mt-20"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-8">
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#DCD6C8] pb-5 text-right">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3E777A]">
              <span>۵ رکن راهبردی</span>
              <span aria-hidden="true" className="text-[#777A76]">·</span>
              <span
                dir="ltr"
                className="font-mono text-[11px] uppercase tracking-widest text-[#777A76]"
              >
                CORE STUDIO CAPABILITIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E2424] leading-snug">
              توانمندی‌های کلیدی استودیو
            </h2>
          </div>

          <span className="text-xs text-[#777A76]">
            پیوند خلاقیت هنری، توسعه تجاری IP و فناوری‌های نوین در زنجیره تولید
          </span>
        </div>

        {/* 5-Column Keyword-Driven Grid (Zero Verbose Paragraphs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
          {CAPABILITY_PILLARS.map((item) => (
            <div
              key={item.num}
              className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] flex flex-col justify-between gap-4 text-right transition-all duration-300 hover:border-[#3E777A]/70 hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-2.5">
                  <span
                    dir="ltr"
                    className="text-lg font-mono font-black text-[#3E777A] tabular-nums"
                  >
                    {item.num}
                  </span>
                  <span
                    dir="ltr"
                    className="text-[10px] font-mono uppercase tracking-wider text-[#777A76]"
                  >
                    {item.en}
                  </span>
                </div>

                <h3 className="text-base font-black text-[#1E2424] leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="space-y-1.5 pt-1">
                {item.keywords.map((kw) => (
                  <div
                    key={kw}
                    className="flex items-center gap-2 text-xs font-semibold text-[#434846]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E777A] shrink-0" />
                    <span>{kw}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


