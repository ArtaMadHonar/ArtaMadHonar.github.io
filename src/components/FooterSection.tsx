import React from 'react';
import { Mail, ArrowUp, MapPin, ArrowLeft } from 'lucide-react';
import { STUDIO_CATALOG_INFO } from '../data/studioData';

interface FooterSectionProps {
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'اینستاگرام', href: '#contact' },
    { label: 'تلگرام', href: '#contact' },
    { label: 'لینکدین', href: '#contact' },
    { label: 'یوتیوب', href: '#contact' },
  ];

  return (
    <footer id="contact" className="border-t border-[#DCD6C8] bg-[#EDE9DF] pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Contact Banner Card in Poyo Deep Teal & Warm Ochre */}
        <div className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-[#274D50] text-[#FAF8F4] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-[0_20px_50px_rgba(39,77,80,0.18)] border border-[#3E777A]">
          {/* Subtle Poyo Palette Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,#65B7B5_0%,transparent_55%)] opacity-25 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,#D6B16A_0%,transparent_50%)] opacity-20 pointer-events-none" />

          <div className="space-y-3 text-right max-w-2xl z-10">
            <span className="text-xs font-mono tracking-widest text-[#D6B16A] uppercase latin-soft font-semibold">
              COLLABORATION & PRODUCTION INQUIRY
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FAF8F4] leading-snug font-soft">
              آماده خلق تجربه‌ای تصویری، تیزر تبلیغاتی یا توسعه محصول مشترک هستید؟
            </h3>
            <p className="text-xs sm:text-sm text-[#EDE9DF]/90 leading-relaxed font-soft">
              از توسعه و تولید انیمیشن و دارایی‌های فکری (IP) تا تیزرهای تبلیغاتی CGI، بازی‌سازی، راهکارهای هوش مصنوعی و ویدئو مپینگ؛ تیم آرتا ماد هنر همراه شماست.
            </p>
          </div>

          <div className="z-10 shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FAF8F4] hover:bg-[#EDE9DF] text-[#1E2424] keep-light-pill text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 font-soft cursor-pointer whitespace-nowrap"
            >
              <span>ثبت درخواست همکاری</span>
              <ArrowLeft className="w-4 h-4 rotate-180 text-[#3E777A]" />
            </button>
          </div>
        </div>

        {/* Studio Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 pb-12 border-b border-[#DCD6C8]">
          {/* Monogram and Description */}
          <div className="md:col-span-5 space-y-4 text-right">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#1E2424] font-soft">
                آرتا ماد هنر
              </span>
              <span className="text-[11px] font-mono text-[#3E777A] tracking-wider uppercase latin-soft font-semibold mt-0.5">
                ARTA MAD HONAR STUDIO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#434846] leading-relaxed max-w-md">
              {STUDIO_CATALOG_INFO.intro}
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="md:col-span-3 space-y-3 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              دسترسی سریع
            </span>
            <div className="flex flex-col space-y-2.5 text-xs text-[#434846]">
              <a href="#about-studio" className="hover:text-[#3E777A] transition-colors">
                معرفی استودیو و چشم‌انداز
              </a>
              <a href="#flagship" className="hover:text-[#3E777A] transition-colors">
                انیمیشن سینمایی «روز شگفت‌انگیز»
              </a>
              <a href="#works" className="hover:text-[#3E777A] transition-colors">
                حوزه‌های فعالیت ۵گانه
              </a>
              <a href="#philosophy" className="hover:text-[#3E777A] transition-colors">
                توانمندی‌های کلیدی
              </a>
              <a href="#team" className="hover:text-[#3E777A] transition-colors">
                هم‌بنیانگذاران و اعضای تیم
              </a>
            </div>
          </div>

          {/* Contact Details & Social Links */}
          <div className="md:col-span-4 space-y-4 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              راه‌های ارتباط مستقیم
            </span>
            <div className="space-y-2.5 text-xs text-[#434846]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3E777A] shrink-0" />
                <span>مشهد، بلوار کوثر، جنب میدان پژوهش، کارخانه نوآوری</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3E777A] shrink-0" />
                <span className="font-mono dir-ltr">info@artamad.ir</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#777A76] block mb-2">شبکه‌های ارتباطی:</span>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#434846]">
                {socialLinks.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenContact();
                      }}
                      className="hover:text-[#3E777A] font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                    {idx < socialLinks.length - 1 && (
                      <span aria-hidden="true" className="text-[#C7C2B6]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777A76]">
          <div>
            © آرتا ماد هنر (Arta Mad Honar) · تمامی حقوق محفوظ است.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#3E777A] transition-colors group cursor-pointer"
            aria-label="بازگشت به بالای صفحه"
          >
            <span>بازگشت به بالا</span>
            <div className="p-1.5 rounded-full bg-[#FAF8F4] border border-[#DCD6C8] group-hover:border-[#3E777A] transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
