import React from 'react';
import { Mail, ArrowUp, MapPin, ArrowLeft } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'اینستاگرام', href: '#' },
    { label: 'تلگرام', href: '#' },
    { label: 'لینکدین', href: '#' },
    { label: 'یوتیوب', href: '#' },
    { label: 'ایکس (توییتر)', href: '#' },
  ];

  return (
    <footer id="contact" className="border-t border-[#EAE6DF] bg-[#FBF9F5] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Banner Card */}
        <div className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-[#18181B] text-[#FAF8F5] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl">
          {/* Warm ambient background aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#D97706_0%,transparent_60%)] opacity-20 pointer-events-none" />

          <div className="space-y-3 text-right max-w-xl z-10">
            <span className="text-xs font-mono tracking-widest text-amber-300 uppercase latin-soft">
              COLLABORATION & PRODUCTION INQUIRY
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug font-soft">
              آماده خلق اثری ماندگار و فراتر از مرزهای معمول هستید؟
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-soft">
              از تولید انیمیشن‌های سینمایی و تیزرهای محصولی سه‌بعدی لوکس تا اجرای پروجکشن مپینگ‌های زنده کنسرت و رویدادهای ملی؛ تیم آرتا ماد هنر آماده همکاری با پیشتازان است.
            </p>
          </div>

          <div className="z-10 shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-stone-100 text-[#18181B] text-xs sm:text-sm font-semibold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 font-soft"
            >
              <span>ثبت بریف / درخواست همکاری</span>
              <ArrowLeft className="w-4 h-4 rotate-180 opacity-70" />
            </button>
          </div>
        </div>

        {/* Studio Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 pb-12 border-b border-[#EAE6DF]">
          {/* Monogram and Description */}
          <div className="md:col-span-5 space-y-4 text-right">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#18181B] font-soft">
                استودیو آرتا ماد هنر
              </span>
              <span className="text-[11px] font-mono text-[#71717A] tracking-wider uppercase latin-soft">
                STUDIO • CINEMA & DIGITAL ARTS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed max-w-sm">
              پیشگام در خلق تصویر، انیمیشن‌های سه‌بعدی سینمایی با پایپلاین‌های هوش مصنوعی اختصاصی، تیزرهای تبلیغاتی نامحدود و اکوسیستم‌های وب۳.
            </p>
            <div className="text-xs text-[#71717A]">
              مستقر در قطب نوآوری شرق کشور، کارخانه نوآوری مشهد
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="md:col-span-3 space-y-3 text-right">
            <span className="text-xs font-bold text-[#18181B] uppercase tracking-wider block">
              ناوبری سریع
            </span>
            <div className="flex flex-col space-y-2 text-xs text-[#52525B]">
              <a href="#flagship" className="hover:text-black transition-colors">انیمیشن بلند «روز شگفت‌انگیز»</a>
              <a href="#works" className="hover:text-black transition-colors">آثار و دپارتمان‌های تخصصی</a>
              <a href="#philosophy" className="hover:text-black transition-colors">تمایز و مانیفست R&D</a>
              <a href="#team" className="hover:text-black transition-colors">اعضای تیم و سوپروایزرها</a>
            </div>
          </div>

          {/* Contact Details & Social Links */}
          <div className="md:col-span-4 space-y-4 text-right">
            <span className="text-xs font-bold text-[#18181B] uppercase tracking-wider block">
              راه‌های ارتباط مستقیم
            </span>
            <div className="space-y-2 text-xs text-[#52525B]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-900 shrink-0" />
                <span>مشهد، بلوار کوثر، جنب میدان پژوهش، کارخانه نوآوری</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-900 shrink-0" />
                <span className="font-mono dir-ltr">info@artamadhonar.com</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#71717A] block mb-2">کانال‌های رسمی استودیو:</span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#EAE6DF] hover:border-[#18181B] text-[#52525B] hover:text-[#18181B] text-xs font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div>
            © استودیو آرتا ماد هنر. طراحی‌شده برای آینده سینما و هنر دیجیتال.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#18181B] transition-colors group"
            aria-label="بازگشت به بالای صفحه"
          >
            <span>بازگشت به بالا</span>
            <div className="p-1.5 rounded-full bg-white border border-[#EAE6DF] group-hover:border-[#18181B] transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
