import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, Sun, Moon, ChevronLeft } from 'lucide-react';
import { SELECTED_WORKS } from '../data/studioData';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigateHome?: (sectionHref?: string) => void;
  onSelectDomain?: (domainId: string) => void;
  activeDomainId?: string | null;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onNavigateHome,
  onSelectDomain,
  activeDomainId,
  isDark,
  onToggleTheme,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'معرفی استودیو', href: '#about-studio' },
    { label: 'روز شگفت‌انگیز', href: '#flagship' },
    { label: 'حوزه‌های فعالیت', href: '#works' },
    { label: 'توانمندی‌های کلیدی', href: '#philosophy' },
    { label: 'هم‌بنیانگذاران و تیم', href: '#team' },
  ];

  // Close mobile menu when switching domains or resizing to desktop
  useEffect(() => {
    setMobileOpen(false);
  }, [activeDomainId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(href);
    }
  };

  const handleDomainSelect = (domainId: string) => {
    setMobileOpen(false);
    if (onSelectDomain) {
      onSelectDomain(domainId);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#EDE9DF]/90 border-b border-[#DCD6C8] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-18 sm:h-22 lg:h-24 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0">
        {/* Zone 1: Brand Logo & Subtle Studio Lockup */}
        <a
          href="https://artamad.ir"
          onClick={(e) => handleLinkClick(e, '#')}
          className="group flex items-center gap-2.5 sm:gap-3.5 shrink-0 select-none min-w-0"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/logo-trimmed.png`}
            alt="استودیو آرتا ماد هنر"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            onError={(e) => {
              const target = e.currentTarget;
              const remoteFallback =
                'https://my.uploadkon.ir/d/V7xEfgwAIrHufBKaVf0DjHYu2tyLfL/OTEyMzV8cGFkZA.png';
              if (target.src !== remoteFallback) {
                target.src = remoteFallback;
              }
            }}
            className="brand-logo-img h-11 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
          />
          <div className="flex flex-col justify-center border-r border-[#DCD6C8] pr-2.5 sm:pr-3.5 text-right min-w-0">
            <span className="text-[13px] sm:text-base font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors leading-tight whitespace-nowrap truncate">
              استودیو آرتا ماد هنر
            </span>
            <span className="text-[9px] sm:text-[11px] font-en font-semibold text-[#777A76] tracking-wider uppercase leading-tight whitespace-nowrap mt-0.5 sm:mt-1 truncate">
              Arta Mad Honar Studio
            </span>
          </div>
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-7 text-xs sm:text-sm font-medium text-[#434846]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="hover:text-[#3E777A] transition-colors whitespace-nowrap shrink-0 py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3E777A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme Switch + Primary Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Light / Dark Mode Switch */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'تغییر به حالت روز (روشن)' : 'تغییر به حالت شب (تاریک)'}
            title={isDark ? 'حالت روز (Light Mode)' : 'حالت شب (Dark Mode)'}
            className="h-10 px-2.5 sm:px-3 rounded-full bg-[#FAF8F4] hover:bg-[#F4F0E6] border border-[#DCD6C8] hover:border-[#3E777A] text-[#1E2424] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[#D6B16A] shrink-0" />
                <span className="hidden md:inline text-[11px] font-bold text-[#1E2424]">
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

          {/* Primary Collaboration CTA (Visible on >= sm, and inside drawer on phones) */}
          <button
            type="button"
            onClick={onOpenContact}
            className="hidden sm:flex px-4 lg:px-5 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold active:scale-95 transition-all shadow-xs items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>درخواست همکاری</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-80 shrink-0" />
          </button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
            className={`xl:hidden h-10 px-3 rounded-full border transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              mobileOpen
                ? 'bg-[#3E777A] text-[#FAF8F4] border-[#3E777A]'
                : 'bg-[#FAF8F4] text-[#1E2424] border-[#DCD6C8] hover:border-[#3E777A]'
            }`}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="text-xs font-bold">{mobileOpen ? 'بستن' : 'منو'}</span>
          </button>
        </div>
      </div>

      {/* Overhauled Mobile & Tablet Drawer with Scrim Backdrop */}
      {mobileOpen && (
        <>
          {/* Backdrop Scrim */}
          <div
            onClick={() => setMobileOpen(false)}
            className="xl:hidden fixed inset-x-0 top-18 sm:top-22 bottom-0 h-[calc(100dvh-4.5rem)] bg-black/55 backdrop-blur-xs z-40"
          />

          {/* Slide-Down Sheet */}
          <div className="xl:hidden absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-[#DCD6C8] bg-[#FAF8F4] rounded-b-3xl px-4 sm:px-6 py-5 space-y-5 shadow-2xl">
            {/* Section 1: Main Page Sections */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-[#3E777A]">
                  بخش‌های صفحه اصلی
                </span>
                <span className="text-[10px] font-mono text-[#777A76] uppercase">
                  NAVIGATION
                </span>
              </div>

              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#F4F0E6] hover:bg-[#E7E2D6] border border-[#E5E0D4] text-xs font-bold text-[#1E2424] flex items-center justify-between transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronLeft className="w-3.5 h-3.5 text-[#3E777A] shrink-0" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Section 2: Quick Direct Access to the 5 Specialized Departments */}
            {onSelectDomain && (
              <div className="space-y-2 pt-3 border-t border-[#DCD6C8]">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-[#3E777A]">
                    دسترسی مستقیم به ۵ دپارتمان تخصصی
                  </span>
                  <span className="text-[10px] font-mono text-[#777A76] uppercase">
                    5 DEPARTMENTS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SELECTED_WORKS.map((work, idx) => {
                    const isCurrent = activeDomainId === work.id;
                    return (
                      <button
                        key={work.id}
                        type="button"
                        onClick={() => handleDomainSelect(work.id)}
                        className={`px-3.5 py-2.5 rounded-xl border text-right text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#3E777A] text-[#FAF8F4] border-[#3E777A]'
                            : 'bg-[#EDE9DF] hover:bg-[#E4DFD3] text-[#1E2424] border-[#DCD6C8]'
                        }`}
                      >
                        <span className="truncate">
                          <span className="farsi-nums font-bold">{idx + 1}. </span>
                          {work.shortTitle || work.categoryFa}
                        </span>
                        <ChevronLeft
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isCurrent ? 'text-[#FAF8F4]' : 'text-[#3E777A]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section 3: Theme Toggle Row & Primary Collaboration Button */}
            <div className="pt-3 border-t border-[#DCD6C8] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={onToggleTheme}
                className="py-2.5 px-4 rounded-xl bg-[#F4F0E6] border border-[#DCD6C8] text-xs font-bold text-[#1E2424] flex items-center justify-between sm:justify-center gap-2 cursor-pointer"
              >
                <span>حالت نمایش سایت:</span>
                <span className="inline-flex items-center gap-1.5 text-[#3E777A]">
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-[#D6B16A]" />
                      <span>حالت شب (تغییر به روز)</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-[#3E777A]" />
                      <span>حالت روز (تغییر به شب)</span>
                    </>
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenContact();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>ثبت درخواست همکاری و ارتباط با استودیو</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-85" />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
