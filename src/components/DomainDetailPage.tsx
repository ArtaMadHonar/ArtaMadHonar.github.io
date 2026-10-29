import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Maximize2,
  X,
  Play,
  ExternalLink,
} from 'lucide-react';
import {
  SELECTED_WORKS,
  TEAM_MEMBERS,
  WONDERFUL_DAY_CATALOG,
  ProjectWork,
  TeamMember,
  DomainGalleryItem,
} from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';
import { HeroVideoPlayer } from './HeroVideoPlayer';

interface DomainDetailPageProps {
  domain: ProjectWork;
  onSelectDomain: (domainId: string) => void;
  onBackToHome: () => void;
  onSelectMember: (member: TeamMember) => void;
  onOpenContact: (domainId?: string) => void;
}

const PORTFOLIO_CATEGORIES: {
  id: string;
  label: string;
}[] = [
  { id: 'All', label: 'All' },
  { id: 'Showreel', label: 'Showreel' },
  { id: '2D', label: '2D' },
  { id: 'Sound Design', label: 'Sound Design' },
  { id: 'Editorial', label: 'Editorial' },
  { id: 'Making of', label: 'Making of' },
  { id: 'AI Assisted', label: 'AI Assisted' },
];

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({
  domain,
  onSelectDomain,
  onBackToHome,
  onSelectMember,
  onOpenContact,
}) => {
  const [selectedItem, setSelectedItem] = useState<DomainGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  useEffect(() => {
    setActiveCategory('All');
    setHoveredCardId(null);
    setSelectedItem(null);
  }, [domain.id]);

  // Lock body scroll when detail modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const toPersianNum = (num: number) =>
    String(num)
      .padStart(2, '0')
      .replace(/[0-9]/g, (w) => persianDigits[+w]);

  const currentIndex = SELECTED_WORKS.findIndex((w) => w.id === domain.id);
  const canonicalNum = currentIndex >= 0 ? currentIndex + 1 : 1;

  const prevDomain =
    SELECTED_WORKS[(currentIndex - 1 + SELECTED_WORKS.length) % SELECTED_WORKS.length];
  const nextDomain = SELECTED_WORKS[(currentIndex + 1) % SELECTED_WORKS.length];

  const resolvedTeamGroups = (
    domain.teamGroups && domain.teamGroups.length > 0
      ? domain.teamGroups
      : [
          {
            id: 'default-members',
            title: 'اعضای تیم',
            isHead: false,
            memberIds: domain.relatedMemberIds || [],
          },
        ]
  )
    .map((group) => ({
      ...group,
      members: group.memberIds
        .map((id) => TEAM_MEMBERS.find((m) => m.id === id))
        .filter((m): m is TeamMember => Boolean(m)),
    }))
    .filter((group) => group.members.length > 0);

  const galleryItems = domain.galleryItems || [];
  const hasCategorizedVideos = galleryItems.some((item) => Boolean(item.category && item.embedUrl));

  const filteredGalleryItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#EDE9DF] text-[#1E2424] pb-20">
      {/* 1. Sub-Header Bar: Back to Home + Quick Switcher Between 5 Domains */}
      <div className="bg-[#F4F0E6] border-b border-[#DCD6C8] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          <div className="flex items-center justify-between lg:justify-start gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#3E777A] text-[#1E2424] hover:text-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به صفحه اصلی</span>
            </button>

            <span className="text-[11px] font-mono text-[#777A76] lg:hidden farsi-nums">
              حوزه {toPersianNum(canonicalNum)} از ۰۵
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#EDE9DF] border border-[#DCD6C8] rounded-2xl overflow-x-auto max-w-full scrollbar-none">
            {SELECTED_WORKS.map((item, idx) => {
              const isActive = item.id === domain.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectDomain(item.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#3E777A] text-[#FAF8F4] shadow-xs'
                      : 'text-[#434846] hover:text-[#1E2424] hover:bg-[#E4DFD3]'
                  }`}
                >
                  <span className="farsi-nums">{idx + 1}. </span>
                  <span>{item.shortTitle || item.categoryFa}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-16 sm:space-y-20">
        {/* 2. Domain Hero & Overview */}
        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DCD6C8] pb-7 text-right">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#3E777A]">
                <span>{domain.categoryFa}</span>
                <span aria-hidden="true" className="text-[#777A76]">·</span>
                <span className="font-en text-[#777A76]">{domain.subtitle}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#1E2424] leading-tight">
                {domain.title}
              </h1>
            </div>

            <button
              onClick={() => onOpenContact(domain.id)}
              className="self-start lg:self-auto px-5 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>ثبت سفارش یا همکاری در این حوزه</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-85" />
            </button>
          </div>

          {/* Clean 12-Column Overview Card */}
          <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.05)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Visual Column (7 Cols) - Clean & Original */}
              <div className="lg:col-span-7 bg-[#121616] relative flex items-center justify-center min-h-[260px] sm:min-h-[380px]">
                {domain.id === 'wonderful-day' ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <HeroVideoPlayer />
                  </div>
                ) : (
                  <VisualArtCanvas
                    type={domain.canvasType}
                    imageUrl={domain.imageUrl}
                    className="w-full h-full aspect-video lg:aspect-auto"
                    showControls={false}
                  />
                )}
              </div>

              {/* Narrative & Highlights Column (5 Cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-right border-t lg:border-t-0 lg:border-r border-[#DCD6C8]">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-[#3E777A] block">
                    معرفی و رویکرد دپارتمان
                  </span>

                  <p className="text-xs sm:text-sm text-[#1E2424] leading-relaxed font-medium">
                    {domain.description}
                  </p>

                  {domain.secondaryDescription && (
                    <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                      {domain.secondaryDescription}
                    </p>
                  )}

                  <div className="pt-4 border-t border-[#E5E0D4] space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-black text-[#1E2424]">
                      {domain.highlightsTitle || 'محورهای تخصصی این حوزه:'}
                    </h3>
                    <div className="space-y-2">
                      {domain.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-[#434846] leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E0D4] flex flex-wrap items-center gap-2 text-[11px] text-[#777A76]">
                  <span className="font-bold text-[#1E2424]">کلیدواژه‌ها:</span>
                  <span>{domain.tags.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Department Portfolio Grid (Minimal & Clean 3earstudio-style cards) */}
        {galleryItems.length > 0 && (
          <section className="space-y-8 border-t border-[#DCD6C8] pt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block">
                  SELECTED WORKS
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                  گزیده آثار و نمونه‌کارها
                </h2>
              </div>

              {/* Minimal Category Filter Tabs (like 3earstudio.com) */}
              {hasCategorizedVideos && (
                <div
                  role="tablist"
                  aria-label="فیلتر نمونه‌کارها"
                  className="flex flex-wrap items-center gap-1.5"
                >
                  {PORTFOLIO_CATEGORIES.map((cat) => {
                    const count =
                      cat.id === 'All'
                        ? galleryItems.length
                        : galleryItems.filter((i) => i.category === cat.id).length;

                    if (count === 0 && cat.id !== 'All') return null;

                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-en font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#3E777A] text-[#FAF8F4]'
                            : 'bg-[#FAF8F4] hover:bg-[#E4DFD3] text-[#434846] hover:text-[#1E2424] border border-[#DCD6C8]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clean, Concise Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {filteredGalleryItems.map((item) => {
                const isHovered = hoveredCardId === item.id;

                // Minimal 3earstudio.com-style Card for Video Works
                if (item.embedUrl) {
                  return (
                    <article
                      key={item.id}
                      onMouseEnter={() => setHoveredCardId(item.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      onClick={() => setSelectedItem(item)}
                      className="group cursor-pointer rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] overflow-hidden transition-all duration-300 hover:shadow-[0_14px_35px_rgba(30,36,36,0.08)] hover:-translate-y-0.5"
                    >
                      {/* Top Window Bar: Category + 3 Dots (Exact 3earstudio structure) */}
                      <div className="px-4 py-2.5 bg-[#F4F0E6] border-b border-[#DCD6C8] flex items-center justify-between">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="w-2 h-2 rounded-full bg-[#1E2424]/20 group-hover:bg-[#3E777A] transition-colors" />
                          <span className="w-2 h-2 rounded-full bg-[#1E2424]/20 group-hover:bg-[#65B7B5] transition-colors" />
                          <span className="w-2 h-2 rounded-full bg-[#1E2424]/20 group-hover:bg-[#D6B16A] transition-colors" />
                        </div>
                        <span className="text-xs font-en font-semibold text-[#434846]">
                          {item.category}
                        </span>
                      </div>

                      {/* 16:9 Thumbnail / Preview Stage */}
                      <div className="aspect-video w-full bg-[#121616] relative overflow-hidden">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.titleEn || item.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (
                                item.fallbackImageUrl &&
                                target.src !== item.fallbackImageUrl
                              ) {
                                target.src = item.fallbackImageUrl;
                              } else if (
                                domain.imageUrl &&
                                target.src !== domain.imageUrl
                              ) {
                                target.src = domain.imageUrl;
                              }
                            }}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-104"
                          />
                        )}

                        {isHovered && item.previewVideoUrl && (
                          <video
                            src={item.previewVideoUrl}
                            poster={item.imageUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover object-center z-1"
                          />
                        )}

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors z-2" />

                        {/* Center Play Button */}
                        <div className="absolute inset-0 z-3 flex items-center justify-center">
                          <div className="w-13 h-13 rounded-full bg-[#FAF8F4]/90 group-hover:bg-[#3E777A] text-[#1E2424] group-hover:text-[#FAF8F4] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Minimal Card Title Bar */}
                      <div className="px-5 py-3.5 bg-[#FAF8F4] flex items-center justify-between gap-3">
                        <h3 className="text-sm sm:text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors truncate">
                          {item.title}
                        </h3>
                        {item.titleEn && (
                          <span className="text-xs font-en font-semibold text-[#777A76] shrink-0">
                            {item.titleEn}
                          </span>
                        )}
                      </div>
                    </article>
                  );
                }

                // Standard Concise Card for other domains
                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] overflow-hidden transition-all duration-300 hover:shadow-[0_14px_35px_rgba(30,36,36,0.07)] hover:-translate-y-0.5"
                  >
                    <div className="aspect-video w-full bg-[#121616] relative overflow-hidden border-b border-[#DCD6C8]">
                      {item.imageUrl ? (
                        <>
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (item.fallbackImageUrl && target.src !== item.fallbackImageUrl) {
                                target.src = item.fallbackImageUrl;
                              }
                            }}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                          />
                          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </>
                      ) : item.canvasType ? (
                        <VisualArtCanvas
                          type={item.canvasType}
                          className="w-full h-full"
                          showControls={false}
                        />
                      ) : null}
                    </div>

                    <div className="p-5 flex items-center justify-between gap-3 text-right">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-en text-[#777A76] block mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-semibold text-[#3E777A] shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Upcoming IP Strip for Animation Department */}
            {domain.id === 'wonderful-day' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F0E6] border border-[#DCD6C8] space-y-5 text-right">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCD6C8] pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#1E2424]">
                      آثار و دارایی‌های فکری (IP) در دست توسعه در دپارتمان انیمیشن
                    </h3>
                    <p className="text-xs text-[#434846] mt-0.5">
                      گسترش زنجیره ارزش و خلق جهان‌های داستانی جدید در استودیو آرتا ماد هنر
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#3E777A] font-semibold uppercase">
                    UPCOMING IP SLATE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {WONDERFUL_DAY_CATALOG.upcomingProjects.map((up, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-black text-[#1E2424]">
                          {up.titleFa} |{' '}
                          <span className="font-en text-xs text-[#3E777A] font-bold">
                            {up.titleEn}
                          </span>
                        </h4>
                        <span className="text-xs font-semibold text-[#3E777A]">{up.badge}</span>
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                        {up.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 4. Department Specialists & Team Section (Hierarchical, Non-Card, Photo + Name Only) */}
        {resolvedTeamGroups.length > 0 && (
          <section className="space-y-12 border-t border-[#DCD6C8] pt-14">
            <div className="space-y-1 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block">
                DEPARTMENT TEAM
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                اعضای متخصص این دپارتمان
              </h2>
            </div>

            <div className="space-y-12">
              {resolvedTeamGroups.map((group) => (
                <div key={group.id} className="space-y-7">
                  {/* Group Category Label (e.g., هد دپارتمان / اعضای تیم) */}
                  <div className="flex items-center justify-center gap-4">
                    <span className="h-px w-12 sm:w-20 bg-[#DCD6C8]" />
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        group.isHead ? 'text-[#3E777A]' : 'text-[#434846]'
                      }`}
                    >
                      {group.title}
                    </span>
                    <span className="h-px w-12 sm:w-20 bg-[#DCD6C8]" />
                  </div>

                  {/* Members Row (No Cards, Only Portrait & Full Name) */}
                  <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
                    {group.members.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => onSelectMember(member)}
                        className="group cursor-pointer flex flex-col items-center text-center"
                      >
                        <div
                          className={`${
                            group.isHead ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-24 h-24 sm:w-26 sm:h-26'
                          } rounded-full border-2 ${
                            group.isHead
                              ? 'border-[#3E777A] group-hover:border-[#65B7B5]'
                              : 'border-[#DCD6C8] group-hover:border-[#3E777A]'
                          } mb-3.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#FAF8F4] shadow-xs relative shrink-0`}
                        >
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              referrerPolicy="no-referrer"
                              loading="eager"
                              decoding="sync"
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            style={{ display: member.imageUrl ? 'none' : 'flex' }}
                            className="flex-col items-center justify-center text-[#777A76] w-full h-full"
                          >
                            <User className="w-7 h-7 opacity-60 mb-0.5" />
                            <span className="text-[10px] font-mono font-bold tracking-wider">
                              {member.initials}
                            </span>
                          </div>
                        </div>

                        <h4
                          className={`${
                            group.isHead ? 'text-base sm:text-lg font-black' : 'text-sm sm:text-base font-bold'
                          } text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft`}
                        >
                          {member.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Bottom Next/Previous Department Navigation Bar */}
        <section className="pt-8 border-t border-[#DCD6C8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            onClick={() => onSelectDomain(prevDomain.id)}
            className="p-4 sm:px-6 sm:py-4 rounded-2xl bg-[#FAF8F4] hover:bg-[#F4F0E6] border border-[#DCD6C8] hover:border-[#3E777A] transition-all flex items-center justify-between sm:justify-start gap-4 text-right cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 text-[#3E777A] group-hover:translate-x-1 transition-transform shrink-0" />
            <div>
              <span className="text-[11px] text-[#777A76] block">حوزه قبلی</span>
              <span className="text-xs sm:text-sm font-bold text-[#1E2424] group-hover:text-[#3E777A]">
                {prevDomain.shortTitle || prevDomain.categoryFa}
              </span>
            </div>
          </button>

          <button
            onClick={onBackToHome}
            className="px-6 py-4 rounded-2xl bg-[#EDE9DF] hover:bg-[#E2DDD1] border border-[#DCD6C8] text-xs font-bold text-[#1E2424] transition-colors cursor-pointer text-center"
          >
            بازگشت به صفحه اصلی
          </button>

          <button
            onClick={() => onSelectDomain(nextDomain.id)}
            className="p-4 sm:px-6 sm:py-4 rounded-2xl bg-[#FAF8F4] hover:bg-[#F4F0E6] border border-[#DCD6C8] hover:border-[#3E777A] transition-all flex items-center justify-between sm:justify-end gap-4 text-left cursor-pointer group"
          >
            <div className="text-right sm:text-left">
              <span className="text-[11px] text-[#777A76] block">حوزه بعدی</span>
              <span className="text-xs sm:text-sm font-bold text-[#1E2424] group-hover:text-[#3E777A]">
                {nextDomain.shortTitle || nextDomain.categoryFa}
              </span>
            </div>
            <ArrowLeft className="w-4 h-4 text-[#3E777A] rotate-180 group-hover:-translate-x-1 transition-transform shrink-0" />
          </button>
        </section>
      </div>

      {/* Dedicated Project Detail Card Modal (Opens when clicking Play/Card) */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#FAF8F4] border border-[#DCD6C8] rounded-3xl overflow-hidden shadow-2xl my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#F4F0E6] border-b border-[#DCD6C8]">
              <div className="flex items-center gap-2.5 text-right">
                {selectedItem.category && (
                  <span className="px-2.5 py-1 rounded-lg bg-[#3E777A] text-[#FAF8F4] text-xs font-en font-semibold">
                    {selectedItem.category}
                  </span>
                )}
                {selectedItem.badge && (
                  <span className="text-xs font-bold text-[#3E777A]">
                    {selectedItem.badge}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full bg-[#EDE9DF] hover:bg-[#3E777A] text-[#1E2424] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 16:9 Embedded Player or Image */}
            <div className="aspect-video w-full bg-[#121616] flex items-center justify-center overflow-hidden border-b border-[#DCD6C8]">
              {selectedItem.embedUrl ? (
                <iframe
                  src={selectedItem.embedUrl}
                  title={selectedItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selectedItem.videoUrl ? (
                <video
                  src={selectedItem.videoUrl}
                  poster={selectedItem.imageUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : selectedItem.imageUrl ? (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : selectedItem.canvasType ? (
                <VisualArtCanvas
                  type={selectedItem.canvasType}
                  className="w-full h-full"
                  showControls={false}
                />
              ) : null}
            </div>

            {/* Project Details & Description Inside Modal Card */}
            <div className="p-6 sm:p-8 space-y-4 text-right bg-[#FAF8F4]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D4] pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1E2424]">
                    {selectedItem.title}
                  </h3>
                  <span className="text-xs font-en text-[#777A76] block mt-0.5">
                    {selectedItem.subtitle}
                  </span>
                </div>

                {selectedItem.externalUrl && (
                  <a
                    href={selectedItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#EDE9DF] hover:bg-[#3E777A] text-[#1E2424] hover:text-[#FAF8F4] text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
                  >
                    <span>مشاهده در پلتفرم اصلی</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#3E777A] block">
                  درباره این اثر:
                </span>
                <p className="text-xs sm:text-sm text-[#434846] leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
