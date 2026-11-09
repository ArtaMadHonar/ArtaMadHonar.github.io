import React from 'react';
import { Mail, ArrowUp, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { STUDIO_CATALOG_INFO } from '../data/studioData';

interface FooterSectionProps {
  onOpenContact: () => void;
  onNavigateHome?: (sectionHref?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
  onNavigateHome,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const quickNavLinks = [
    { label: 'معرفی استودیو', href: '#about-studio' },
    { label: 'انیمیشن سینمایی «روز شگفت‌انگیز»', href: '#flagship' },
    { label: 'حوزه‌های فعالیت استودیو', href: '#works' },
    { label: 'توانمندی‌های کلیدی', href: '#philosophy' },
    { label: 'هم‌بنیانگذاران و اعضای تیم', href: '#team' },
  ];

  return (
    <footer id="contact" className="border-t border-[#DCD6C8] bg-[#EDE9DF] pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-16">
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
          <div className="md:col-span-4 space-y-4 text-right">
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

          {/* Quick Nav Anchors with functional scrolling */}
          <div className="md:col-span-3 space-y-3 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              دسترسی سریع
            </span>
            <div className="flex flex-col space-y-2.5 text-xs text-[#434846]">
              {quickNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#3E777A] transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details, Direct Location Map & Social Links */}
          <div className="md:col-span-5 space-y-4 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              راه‌های ارتباط مستقیم
            </span>

            <div className="space-y-3 text-xs text-[#434846]">
              {/* Address with Direct Google Maps Link */}
              <a
                href="https://maps.app.goo.gl/SQPRkju5jTvMjdGMA"
                target="_blank"
                rel="noopener noreferrer"
                title="مشاهده موقعیت در گوگل مپ"
                className="group flex items-start gap-2.5 hover:text-[#3E777A] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[#1E2424] group-hover:text-[#3E777A] font-medium leading-relaxed transition-colors">
                  مشهد، بلوار کوثر، میدان پژوهش، کارخانه نوآوری مشهد، واحد 16
                </span>
              </a>

              {/* Direct Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3E777A] shrink-0" />
                <a
                  href="mailto:dso552na@gmail.com"
                  dir="ltr"
                  className="font-mono text-xs text-[#1E2424] hover:text-[#3E777A] font-semibold transition-colors"
                >
                  dso552na@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-1 px-1">
              <span className="text-[11px] text-[#777A76] block mb-2">شبکه‌های ارتباطی:</span>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#434846]">
                <a
                  href="https://www.instagram.com/artamad_honar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3E777A] font-medium transition-colors"
                >
                  اینستاگرام
                </a>
                <span aria-hidden="true" className="text-[#C7C2B6]">·</span>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenContact();
                  }}
                  className="hover:text-[#3E777A] font-medium transition-colors"
                >
                  تلگرام
                </a>
                <span aria-hidden="true" className="text-[#C7C2B6]">·</span>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenContact();
                  }}
                  className="hover:text-[#3E777A] font-medium transition-colors"
                >
                  لینکدین
                </a>
                <span aria-hidden="true" className="text-[#C7C2B6]">·</span>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenContact();
                  }}
                  className="hover:text-[#3E777A] font-medium transition-colors"
                >
                  یوتیوب
                </a>
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
