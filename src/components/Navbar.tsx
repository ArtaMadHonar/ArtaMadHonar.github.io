import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowLeft, Sun, Moon, ChevronLeft } from 'lucide-react';
import { SELECTED_WORKS } from '../data/studioData';
import { openInquiryModal } from '../utils/modalEvents';

interface NavbarProps {
  activeDomainId?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeDomainId }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check initial theme from DOM or localStorage
    const isDarkTheme =
      document.documentElement.classList.contains('dark') ||
      localStorage.getItem('amh-theme') === 'dark';
    setIsDark(isDarkTheme);
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('amh-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('amh-theme', 'light');
    }
  };

  const navItems = [
    { label: 'معرفی استودیو', href: '/#about-studio' },
    { label: 'روز شگفت‌انگیز', href: '/wonderful-day' },
    { label: 'حوزه‌های فعالیت', href: '/#works' },
    { label: 'توانمندی‌های کلیدی', href: '/#philosophy' },
    { label: 'هم‌بنیانگذاران و تیم', href: '/#team' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#EDE9DF]/90 dark:bg-[#0E1415]/90 border-b border-[#DCD6C8] dark:border-[#27363A] transition-colors duration-300">
      <div className="w-full mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 h-18 sm:h-22 lg:h-24 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0">
        {/* Zone 1: Brand Logo */}
        <a
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3.5 shrink-0 select-none min-w-0"
        >
          <img
            src="/assets/logo-trimmed.png"
            alt="استودیو آرتا ماد هنر"
            loading="eager"
            className="brand-logo-img h-11 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
          />
          <div className="flex flex-col justify-center border-r border-[#DCD6C8] dark:border-[#27363A] pr-2.5 sm:pr-3.5 text-right min-w-0">
            <span className="text-[13px] sm:text-base font-black text-[#1E2424] dark:text-[#F2EFE9] group-hover:text-[#3E777A] dark:group-hover:text-[#65B7B5] transition-colors leading-tight whitespace-nowrap truncate">
              استودیو آرتا ماد هنر
            </span>
            <span className="text-[9px] sm:text-[11px] font-en font-semibold text-[#777A76] tracking-wider uppercase leading-tight whitespace-nowrap mt-0.5 sm:mt-1 truncate">
              Arta Mad Honar Studio
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-7 text-xs sm:text-sm font-medium text-[#434846] dark:text-[#BCC6C4]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#3E777A] dark:hover:text-[#65B7B5] transition-colors whitespace-nowrap shrink-0 py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3E777A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme Switch + Action + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Light / Dark Mode Switch */}
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={isDark ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
            title={isDark ? 'حالت روز (Light Mode)' : 'حالت شب (Dark Mode)'}
            className="h-10 px-2.5 sm:px-3 rounded-full bg-[#FAF8F4] dark:bg-[#151E20] hover:bg-[#F4F0E6] dark:hover:bg-[#233136] border border-[#DCD6C8] dark:border-[#27363A] hover:border-[#3E777A] text-[#1E2424] dark:text-[#F2EFE9] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[#D6B16A] shrink-0" />
                <span className="hidden md:inline text-[11px] font-bold text-[#F2EFE9]">
                  روز
                </span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#3E777A] shrink-0" />
                <span className="hidden md:inline text-[11px] font-bold text-[#1E2424]">
                  شب
                </span>
              </>
            )}
          </button>

          {/* Inquiry Action */}
          <button
            type="button"
            onClick={() => openInquiryModal()}
            className="h-10 px-4 sm:px-5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>شروع همکاری</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-90 hidden sm:inline" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden h-10 w-10 rounded-full bg-[#FAF8F4] dark:bg-[#151E20] hover:bg-[#F4F0E6] border border-[#DCD6C8] dark:border-[#27363A] text-[#1E2424] dark:text-[#F2EFE9] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="منوی سایت"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[#DCD6C8] dark:border-[#27363A] bg-[#FAF8F4] dark:bg-[#151E20] px-4 py-6 space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777A76] block mb-2 px-2">
              بخش‌های سایت
            </span>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629] text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#DCD6C8] dark:border-[#27363A] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777A76] block mb-2 px-2">
              دپارتمان‌های تخصصی
            </span>
            {SELECTED_WORKS.map((work) => (
              <a
                key={work.id}
                href={`/${work.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629] text-xs font-semibold text-[#434846] dark:text-[#BCC6C4] transition-colors"
              >
                <span>{work.shortTitle || work.title}</span>
                <ChevronLeft className="w-3.5 h-3.5 text-[#777A76]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
