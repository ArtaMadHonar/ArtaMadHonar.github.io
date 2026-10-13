import React, { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'انیمیشن روز شگفت‌انگیز', href: '#flagship' },
    { label: 'آثار و دپارتمان‌ها', href: '#works' },
    { label: 'فلسفه و R&D', href: '#philosophy' },
    { label: 'اعضای تیم', href: '#team' },
    { label: 'تماس', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FBF9F5]/85 border-b border-[#EAE6DF] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        {/* Studio Monogram & Wordmark */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 text-right group select-none shrink min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg lg:text-xl font-black text-[#18181B] tracking-tight group-hover:opacity-85 transition-opacity font-fa truncate">
              آرتا ماد هنر
            </span>
            <span className="text-[8px] sm:text-[9px] font-en tracking-wider text-[#71717A] uppercase truncate">
              STUDIO • CINEMA & DIGITAL ARTS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-medium text-[#52525B]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#18181B] transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#18181B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Floating CTA Pill & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full bg-[#18181B] text-[#FAF8F5] text-[11px] sm:text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0"
          >
            <span className="hidden xl:inline">درخواست همکاری / تماس مستقیم</span>
            <span className="hidden sm:inline xl:hidden">درخواست همکاری</span>
            <span className="sm:hidden">همکاری و تماس</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-70 shrink-0" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-700 hover:text-black hover:bg-stone-100 transition-colors shrink-0"
            aria-label="منو"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-b border-[#EAE6DF] bg-[#FBF9F5] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#52525B]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 hover:text-[#18181B] border-b border-[#EAE6DF]/60 last:border-none"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenContact();
            }}
            className="w-full mt-2 py-3 px-4 rounded-full bg-[#18181B] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <span>ثبت درخواست همکاری / تماس مستقیم</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-70" />
          </button>
        </div>
      )}
    </header>
  );
};
