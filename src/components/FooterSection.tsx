import React from 'react';
import { Mail, ArrowUp, MapPin, ArrowLeft, ExternalLink, Instagram } from 'lucide-react';
import { STUDIO_CATALOG_INFO, SELECTED_WORKS } from '../data/studioData';
import { openInquiryModal } from '../utils/modalEvents';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickNavLinks = [
    { label: 'معرفی استودیو', href: '/#about-studio' },
    { label: 'انیمیشن سینمایی «روز شگفت‌انگیز»', href: '/wonderful-day' },
    { label: 'حوزه‌های فعالیت استودیو', href: '/#works' },
    { label: 'توانمندی‌های کلیدی', href: '/#philosophy' },
    { label: 'هم‌بنیانگذاران و اعضای تیم', href: '/#team' },
  ];

  return (
    <footer id="contact" className="border-t border-[#DCD6C8] bg-[#EDE9DF] pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-16">
        {/* Collaboration Banner Card */}
        <div className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-[#274D50] text-[#FAF8F4] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-[0_20px_50px_rgba(39,77,80,0.18)] border border-[#3E777A]">
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
              onClick={() => openInquiryModal()}
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

          {/* Quick Nav Anchors */}
          <div className="md:col-span-3 space-y-3 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              دسترسی سریع
            </span>
            <div className="flex flex-col space-y-2.5 text-xs text-[#434846]">
              {quickNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#3E777A] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Departments Links */}
          <div className="md:col-span-2 space-y-3 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              دپارتمان‌ها
            </span>
            <div className="flex flex-col space-y-2 text-xs text-[#434846]">
              {SELECTED_WORKS.map((work) => (
                <a
                  key={work.id}
                  href={`/${work.id}`}
                  className="hover:text-[#3E777A] transition-colors line-clamp-1"
                >
                  {work.shortTitle || work.title}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-3 space-y-4 text-right">
            <span className="text-xs font-bold text-[#1E2424] block">
              ارتباط مستقیم
            </span>

            <div className="space-y-2.5 text-xs text-[#434846]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3E777A] shrink-0" />
                <a
                  href="mailto:info@artamad.ir"
                  className="font-en text-xs hover:text-[#3E777A] transition-colors"
                  dir="ltr"
                >
                  info@artamad.ir
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#3E777A] shrink-0" />
                <a
                  href="https://www.instagram.com/artamad_honar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3E777A] transition-colors flex items-center gap-1 font-en text-xs"
                  dir="ltr"
                >
                  <span>@artamad_honar</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DCD6C8] hover:border-[#3E777A] text-[11px] font-semibold text-[#777A76] hover:text-[#1E2424] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>بازگشت به بالای صفحه</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777A76] text-center sm:text-right">
          <p>
            تمامی حقوق مادی و معنوی متعلق به <strong>استودیو آرتا ماد هنر</strong> است. © {new Date().getFullYear()}
          </p>
          <span className="font-en text-[11px] text-[#777A76]" dir="ltr">
            Arta Mad Honar Studio · All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};
