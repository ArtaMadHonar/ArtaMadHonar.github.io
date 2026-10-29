import React, { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigateHome?: (sectionHref?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onNavigateHome }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'معرفی استودیو', href: '#about-studio' },
    { label: 'روز شگفت‌انگیز', href: '#flagship' },
    { label: 'حوزه‌های فعالیت', href: '#works' },
    { label: 'توانمندی‌های کلیدی', href: '#philosophy' },
    { label: 'هم‌بنیانگذاران و تیم', href: '#team' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigateHome) {
      e.preventDefault();
      setMobileOpen(false);
      onNavigateHome(href);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#EDE9DF]/90 border-b border-[#DCD6C8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-8 min-w-0">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="text-lg sm:text-xl font-black text-[#1E2424] tracking-tight hover:text-[#3E777A] transition-colors font-fa whitespace-nowrap shrink-0 select-none"
        >
          آرتا ماد هنر
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#434846]">
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

        {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold active:scale-95 transition-all shadow-xs flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>درخواست همکاری</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-80 shrink-0" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl text-[#1E2424] hover:text-[#3E777A] hover:bg-[#E2DDD1] transition-colors shrink-0"
            aria-label="منو"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-b border-[#DCD6C8] bg-[#F6F3EC] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#434846]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="py-2 hover:text-[#3E777A] border-b border-[#DCD6C8]/60 last:border-none whitespace-nowrap"
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
            className="w-full mt-2 py-3 px-4 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
          >
            <span>ثبت درخواست همکاری و ارتباط با استودیو</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-80" />
          </button>
        </div>
      )}
    </header>
  );
};

