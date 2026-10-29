import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Film,
  Maximize2,
  X,
  Play,
  Square,
  Tv,
  ExternalLink,
  Sparkles,
  FileText,
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
  labelEn: string;
  labelFa: string;
}[] = [
  { id: 'All', labelEn: 'All', labelFa: 'همه آثار' },
  { id: 'Showreel', labelEn: 'Showreel', labelFa: 'شوریل' },
  { id: 'AI Assisted', labelEn: 'AI Assisted', labelFa: 'تولید ترکیبی AI' },
  { id: '2D', labelEn: '2D', labelFa: 'دوبعدی و موشن' },
  { id: 'Sound Design', labelEn: 'Sound Design', labelFa: 'طراحی صدا' },
  { id: 'Editorial', labelEn: 'Editorial', labelFa: 'تدوین' },
  { id: 'Making of', labelEn: 'Making of', labelFa: 'پشت‌صحنه' },
];

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({
  domain,
  onSelectDomain,
  onBackToHome,
  onSelectMember,
  onOpenContact,
}) => {
  const [lightboxItem, setLightboxItem] = useState<DomainGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [expandedDescIds, setExpandedDescIds] = useState<Record<string, boolean>>({});
  const [mainStageVideoItem, setMainStageVideoItem] = useState<DomainGalleryItem | null>(null);
  const [isMainStagePlaying, setIsMainStagePlaying] = useState<boolean>(false);

  const mainStageRef = useRef<HTMLDivElement>(null);

  // Reset local states when switching between the 5 domains
  useEffect(() => {
    setActiveCategory('All');
    setInlinePlayingId(null);
    setHoveredCardId(null);
    setLightboxItem(null);

    const items = domain.galleryItems || [];
    const firstEmbedItem = items.find((item) => Boolean(item.embedUrl)) || null;
    setMainStageVideoItem(firstEmbedItem);
    setIsMainStagePlaying(false);
  }, [domain.id]);

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

  // Resolve department team members in the order specified by relatedMemberIds
  const departmentMembers: TeamMember[] = (domain.relatedMemberIds || [])
    .map((id) => TEAM_MEMBERS.find((m) => m.id === id))
    .filter((m): m is TeamMember => Boolean(m));

  const galleryItems = domain.galleryItems || [];
  const hasCategorizedVideos = galleryItems.some((item) => Boolean(item.category && item.embedUrl));

  const filteredGalleryItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handlePlayInMainStage = (item: DomainGalleryItem) => {
    setInlinePlayingId(null);
    setMainStageVideoItem(item);
    setIsMainStagePlaying(true);
    if (mainStageRef.current) {
      mainStageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleDescriptionExpand = (id: string) => {
    setExpandedDescIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#EDE9DF] text-[#1E2424] pb-20">
      {/* 1. Sub-Header Bar: Back to Home + Quick Switcher Between 5 Domains */}
      <div className="bg-[#F4F0E6] border-b border-[#DCD6C8] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          {/* Back to Home Button */}
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

          {/* 5-Domain Quick Switcher Bar */}
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
        {/* 2. Domain Hero & Comprehensive Overview */}
        <section className="space-y-8">
          {/* Domain Title Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DCD6C8] pb-7 text-right">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#3E777A]">
                <span className="font-mono uppercase tracking-widest farsi-nums">
                  DEPARTMENT {toPersianNum(canonicalNum)}
                </span>
                <span aria-hidden="true" className="text-[#777A76]">·</span>
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

          {/* 12-Column Overview Card with Main Stage Player Support */}
          <div
            ref={mainStageRef}
            id="domain-main-stage"
            className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.05)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Visual / Showreel Column (7 Cols) */}
              <div className="lg:col-span-7 bg-[#121616] relative flex flex-col justify-between min-h-[280px] sm:min-h-[400px]">
                {domain.id === 'wonderful-day' ? (
                  <div className="w-full h-full flex items-center justify-center flex-1">
                    <HeroVideoPlayer />
                  </div>
                ) : mainStageVideoItem && mainStageVideoItem.embedUrl ? (
                  <div className="w-full h-full flex flex-col flex-1">
                    {/* Top Status Strip of Main Stage Player */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#181D1D] border-b border-white/10 text-[#FAF8F4] text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <Tv className="w-3.5 h-3.5 text-[#65B7B5] shrink-0" />
                        <span className="font-bold text-[#65B7B5]">پلیر اصلی دپارتمان:</span>
                        <span className="truncate font-semibold">{mainStageVideoItem.title}</span>
                        {mainStageVideoItem.titleEn && (
                          <span className="font-en text-[11px] text-white/60 hidden sm:inline">
                            ({mainStageVideoItem.titleEn})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {isMainStagePlaying && (
                          <button
                            onClick={() => setIsMainStagePlaying(false)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors cursor-pointer"
                          >
                            نمایش کاور
                          </button>
                        )}
                        {mainStageVideoItem.externalUrl && (
                          <a
                            href={mainStageVideoItem.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                            title="باز کردن در تب جدید"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Video Stage (16:9 or Full Height) */}
                    <div className="relative flex-1 w-full aspect-video lg:aspect-auto bg-black overflow-hidden flex items-center justify-center">
                      {isMainStagePlaying ? (
                        <iframe
                          key={mainStageVideoItem.id}
                          src={mainStageVideoItem.embedUrl}
                          title={mainStageVideoItem.title}
                          className="w-full h-full min-h-[260px] sm:min-h-[360px] border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          onClick={() => setIsMainStagePlaying(true)}
                          className="group relative w-full h-full min-h-[260px] sm:min-h-[360px] cursor-pointer overflow-hidden flex items-center justify-center"
                        >
                          <img
                            src={mainStageVideoItem.imageUrl || domain.imageUrl}
                            alt={mainStageVideoItem.title}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (
                                mainStageVideoItem.fallbackImageUrl &&
                                target.src !== mainStageVideoItem.fallbackImageUrl
                              ) {
                                target.src = mainStageVideoItem.fallbackImageUrl;
                              } else if (domain.imageUrl && target.src !== domain.imageUrl) {
                                target.src = domain.imageUrl;
                              }
                            }}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-85"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                          {/* Play Button Overlay */}
                          <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
                            <div className="w-16 h-16 rounded-full bg-[#3E777A] group-hover:bg-[#65B7B5] text-[#FAF8F4] group-hover:text-[#121616] flex items-center justify-center shadow-[0_0_35px_rgba(101,183,181,0.45)] transition-all duration-300 group-hover:scale-110">
                              <Play className="w-7 h-7 fill-current ml-0.5" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-xs sm:text-sm font-bold text-white block">
                                پخش ویدیو در پلیر اصلی صفحه
                              </span>
                              <span className="text-[11px] font-en text-[#65B7B5] block">
                                {mainStageVideoItem.titleEn || mainStageVideoItem.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Selector Strip at Bottom of Main Stage */}
                    {galleryItems.length > 1 && (
                      <div className="px-4 py-2.5 bg-[#181D1D] border-t border-white/10 flex items-center justify-between gap-3 text-[11px] text-white/75">
                        <span>
                          می‌توانید هر یک از {toPersianNum(galleryItems.length)} اثر زیر را در کارت خودش یا در این پلیر اصلی تماشا کنید.
                        </span>
                        <span className="font-en text-[#65B7B5] shrink-0">
                          {mainStageVideoItem.category || 'FEATURED'}
                        </span>
                      </div>
                    )}
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
                    معرفی جامع و رویکرد دپارتمان
                  </span>

                  <p className="text-xs sm:text-sm text-[#1E2424] leading-relaxed font-medium">
                    {domain.description}
                  </p>

                  {domain.secondaryDescription && (
                    <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                      {domain.secondaryDescription}
                    </p>
                  )}

                  {/* Key Highlights */}
                  <div className="pt-4 border-t border-[#E5E0D4] space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-black text-[#1E2424]">
                      {domain.highlightsTitle || 'محورهای تخصصی این حوزه:'}
                    </h3>
                    <div className="space-y-2">
                      {domain.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#434846] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Unboxed Tags */}
                <div className="pt-4 border-t border-[#E5E0D4] flex flex-wrap items-center gap-2 text-[11px] text-[#777A76]">
                  <span className="font-bold text-[#1E2424]">کلیدواژه‌های تخصصی:</span>
                  <span>{domain.tags.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Department Portfolio, Images & Videos Gallery */}
        {galleryItems.length > 0 && (
          <section className="space-y-8 border-t border-[#DCD6C8] pt-14">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3E777A]">
                  <Film className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase tracking-widest">
                    {hasCategorizedVideos ? 'SELECTED WORKS · VIDEO PORTFOLIO' : 'DEPARTMENT SHOWCASE & GALLERY'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                  {hasCategorizedVideos
                    ? `آثار منتخب، تیزرها و تولیدات ویدیویی (${toPersianNum(galleryItems.length)} اثر)`
                    : 'گالری نمونه‌کارها، تصاویر و تولیدات این دپارتمان'}
                </h2>
              </div>
              <p className="text-xs text-[#777A76]">
                {hasCategorizedVideos
                  ? 'قابلیت پخش مستقیم در هر کارت، انتقال به پلیر اصلی بالای صفحه یا نمایش سینمایی تمام‌صفحه'
                  : 'برای مشاهده تصویر در ابعاد بزرگ‌تر، روی هر نمونه کلیک کنید'}
              </p>
            </div>

            {/* Category Filter Bar (3earstudio.com style, rendered when categorized video works exist) */}
            {hasCategorizedVideos && (
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F4F0E6] border border-[#DCD6C8] p-2.5 sm:p-3 rounded-2xl">
                <div
                  role="tablist"
                  aria-label="فیلتر دسته‌بندی نمونه‌کارها"
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
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setInlinePlayingId(null);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#3E777A] text-[#FAF8F4] shadow-2xs'
                            : 'bg-[#FAF8F4] hover:bg-[#E4DFD3] text-[#434846] hover:text-[#1E2424] border border-[#DCD6C8]'
                        }`}
                      >
                        <span>{cat.labelFa}</span>
                        <span
                          className={`font-en text-[11px] ${
                            isSelected ? 'text-[#FAF8F4]/85' : 'text-[#777A76]'
                          }`}
                        >
                          ({cat.labelEn})
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md farsi-nums ${
                            isSelected
                              ? 'bg-black/20 text-[#FAF8F4]'
                              : 'bg-[#EDE9DF] text-[#3E777A]'
                          }`}
                        >
                          {toPersianNum(count)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-[#777A76] px-2 hidden xl:flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#3E777A]" />
                  <span>نگه داشتن نشانگر موس روی کارت‌ها، پیش‌نمایش متحرک اثر را نمایش می‌دهد</span>
                </div>
              </div>
            )}

            {/* Portfolio Grid (3earstudio.com 2-Column Window-Frame Layout for Video Works) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredGalleryItems.map((item, idx) => {
                const isPlayingInline = inlinePlayingId === item.id;
                const isHovered = hoveredCardId === item.id;
                const isDescExpanded = Boolean(expandedDescIds[item.id]);
                const isCurrentMainStage =
                  mainStageVideoItem?.id === item.id && isMainStagePlaying;

                // If item is a 3earstudio embedded video card
                if (item.embedUrl) {
                  return (
                    <article
                      key={item.id}
                      onMouseEnter={() => setHoveredCardId(item.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className={`group rounded-3xl bg-[#FAF8F4] border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                        isPlayingInline || isCurrentMainStage
                          ? 'border-[#3E777A] ring-2 ring-[#3E777A]/20 shadow-[0_18px_45px_rgba(62,119,122,0.14)]'
                          : 'border-[#DCD6C8] hover:border-[#3E777A] hover:shadow-[0_16px_40px_rgba(30,36,36,0.08)]'
                      }`}
                    >
                      <div>
                        {/* 1. 3earstudio-Inspired Top Window Header Bar */}
                        <div className="px-4 py-3 bg-[#F4F0E6] border-b border-[#DCD6C8] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-[#3E777A] bg-[#EDE9DF] border border-[#DCD6C8] px-2 py-0.5 rounded-md farsi-nums">
                              {toPersianNum(idx + 1)}
                            </span>
                            {item.category && (
                              <span className="text-xs font-en font-bold text-[#1E2424] tracking-wide">
                                {item.category}
                              </span>
                            )}
                            {item.badge && (
                              <>
                                <span className="text-[#777A76]" aria-hidden="true">·</span>
                                <span className="text-[11px] font-semibold text-[#434846]">
                                  {item.badge}
                                </span>
                              </>
                            )}
                          </div>

                          {/* 3earstudio signature 3-dot window indicator */}
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="w-2 h-2 rounded-full bg-[#D6B16A]/70 group-hover:bg-[#D6B16A] transition-colors" />
                            <span className="w-2 h-2 rounded-full bg-[#65B7B5]/70 group-hover:bg-[#65B7B5] transition-colors" />
                            <span className="w-2 h-2 rounded-full bg-[#3E777A]/70 group-hover:bg-[#3E777A] transition-colors" />
                          </div>
                        </div>

                        {/* 2. 16:9 Media Stage (Thumbnail / GIF / Hover Video Preview / Embedded Player) */}
                        <div className="aspect-video w-full bg-[#121616] relative overflow-hidden border-b border-[#DCD6C8]">
                          {isPlayingInline ? (
                            <iframe
                              src={item.embedUrl}
                              title={item.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <div
                              onClick={() => setInlinePlayingId(item.id)}
                              className="w-full h-full relative cursor-pointer overflow-hidden"
                            >
                              {/* Static Thumbnail or Custom GIF */}
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
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
                                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                              )}

                              {/* Optional 3earstudio Hover Muted Video Preview */}
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

                              {/* Subtle Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-2 transition-opacity group-hover:opacity-90" />

                              {/* Center Play Button */}
                              <div className="absolute inset-0 z-3 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-[#3E777A]/95 group-hover:bg-[#65B7B5] text-[#FAF8F4] group-hover:text-[#121616] flex items-center justify-center shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:scale-110">
                                  <Play className="w-6 h-6 fill-current ml-0.5" />
                                </div>
                              </div>

                              {/* Bottom-Left English Title Overlay (like 3earstudio card title bar) */}
                              <div className="absolute bottom-3 left-3 right-3 z-3 flex items-end justify-between gap-2 pointer-events-none">
                                <span className="px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold">
                                  کلیک برای پخش مستقیم
                                </span>
                                {item.titleEn && (
                                  <span className="font-en text-xs sm:text-sm font-bold text-white drop-shadow-xs tracking-wide">
                                    {item.titleEn}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 3. Card Body: Title & Dedicated Description Section */}
                        <div className="p-5 sm:p-6 space-y-3.5 text-right">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <h3 className="text-base sm:text-lg font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors">
                                {item.title}
                              </h3>
                              <span className="text-[11px] font-en text-[#777A76] block">
                                {item.subtitle}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleDescriptionExpand(item.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#EDE9DF] hover:bg-[#E2DDD1] text-[#3E777A] text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                              title="نمایش یا بستن جزئیات و توضیحات اثر"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{isDescExpanded ? 'بستن توضیح' : 'توضیحات اثر'}</span>
                            </button>
                          </div>

                          {/* Dedicated Description Slot */}
                          <div
                            className={`rounded-2xl bg-[#F4F0E6] border border-[#E5E0D4] p-3.5 text-right transition-all ${
                              isDescExpanded ? 'ring-1 ring-[#3E777A]/30' : ''
                            }`}
                          >
                            <p
                              className={`text-xs sm:text-[13px] text-[#434846] leading-relaxed ${
                                isDescExpanded ? '' : 'line-clamp-2'
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 4. Multi-Option Playback & Action Footer */}
                      <div className="px-5 py-3.5 bg-[#F4F0E6] border-t border-[#DCD6C8] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Inline Play/Stop Toggle */}
                          <button
                            type="button"
                            onClick={() =>
                              setInlinePlayingId(isPlayingInline ? null : item.id)
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isPlayingInline
                                ? 'bg-[#1E2424] text-[#FAF8F4]'
                                : 'bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4]'
                            }`}
                          >
                            {isPlayingInline ? (
                              <>
                                <Square className="w-3 h-3 fill-current" />
                                <span>توقف پخش</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>پخش در کارت</span>
                              </>
                            )}
                          </button>

                          {/* Watch in Top Main Stage Player */}
                          <button
                            type="button"
                            onClick={() => handlePlayInMainStage(item)}
                            className="px-3 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#3E777A] text-[#1E2424] hover:text-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Tv className="w-3.5 h-3.5" />
                            <span>تماشا در پلیر اصلی صفحه</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Cinema Lightbox Modal */}
                          <button
                            type="button"
                            onClick={() => {
                              setInlinePlayingId(null);
                              setLightboxItem(item);
                            }}
                            className="p-2 rounded-xl bg-[#FAF8F4] hover:bg-[#E4DFD3] text-[#434846] hover:text-[#1E2424] border border-[#DCD6C8] transition-colors cursor-pointer"
                            title="نمایش سینمایی تمام‌صفحه"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Direct External Link */}
                          {item.externalUrl && (
                            <a
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-[#FAF8F4] hover:bg-[#E4DFD3] text-[#434846] hover:text-[#1E2424] border border-[#DCD6C8] transition-colors"
                              title="مشاهده لینک اصلی ویدیو"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                }

                // Standard Image/Canvas Gallery Card (for other domains)
                return (
                  <article
                    key={item.id}
                    onClick={() => {
                      if (item.imageUrl) {
                        setLightboxItem(item);
                      }
                    }}
                    className={`group rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-[0_16px_40px_rgba(30,36,36,0.07)] ${
                      item.imageUrl ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div>
                      {/* Media Container */}
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

                      {/* Text Body */}
                      <div className="p-6 space-y-2.5 text-right">
                        <div className="flex items-center justify-between gap-2 text-[11px] text-[#777A76]">
                          <span className="font-mono text-[#3E777A] font-semibold">
                            {item.subtitle}
                          </span>
                          {item.badge && (
                            <span className="font-bold text-[#3E777A]">{item.badge}</span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Extra Upcoming IP Strip specifically for Animation & IP Department */}
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

        {/* 4. Department Specialists & Team Section */}
        {departmentMembers.length > 0 && (
          <section className="space-y-8 border-t border-[#DCD6C8] pt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold">
                  DEPARTMENT TEAM & SPECIALISTS
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                  اعضای متخصص این دپارتمان در استودیو
                </h2>
              </div>
              <p className="text-xs text-[#434846]">
                برای مشاهده خلاصه سوابق کاری و معرفی کامل هر عضو، روی کارت کلیک کنید
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="group cursor-pointer rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] p-6 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-[0_14px_35px_rgba(30,36,36,0.07)] hover:-translate-y-1"
                >
                  <div className="w-full flex flex-col items-center">
                    {/* Portrait Avatar */}
                    <div className="w-22 h-22 rounded-full border-2 border-[#DCD6C8] group-hover:border-[#65B7B5] mb-4 flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden bg-[#EDE9DF] shadow-2xs relative shrink-0">
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

                    {/* Name */}
                    <h4 className="text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
                      {member.name}
                    </h4>

                    {/* Job Titles */}
                    <div className="mt-1 mb-2.5 space-y-0.5">
                      <div className="text-xs font-bold text-[#3E777A] leading-snug font-soft">
                        {member.role}
                      </div>
                      <div className="text-[10px] text-[#777A76] font-en tracking-tight line-clamp-1">
                        {member.roleEn}
                      </div>
                    </div>

                    {/* Concise Bio */}
                    {member.bio && (
                      <p className="text-xs text-[#434846] leading-relaxed line-clamp-2 mt-1 font-soft">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 w-full border-t border-[#E5E0D4] text-[11px] font-semibold text-[#3E777A] flex items-center justify-center gap-1">
                    <span>
                      {member.isCoFounder ? 'مشاهده خلاصه سوابق کاری' : 'مشاهده مشخصات'}
                    </span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-80 group-hover:-translate-x-1 transition-transform" />
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
            بازگشت به نمای کلی همه حوزه‌ها در صفحه اصلی
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

      {/* Lightbox Modal for Embedded Video Cinema Mode or High-Res Image Inspection */}
      {lightboxItem && (lightboxItem.embedUrl || lightboxItem.imageUrl) && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#181D1D] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#121616] border-b border-white/10 text-[#FAF8F4]">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold">{lightboxItem.title}</h4>
                  {lightboxItem.category && (
                    <span className="text-[10px] font-en px-2 py-0.5 rounded-md bg-white/10 text-[#65B7B5]">
                      {lightboxItem.category}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#65B7B5]">
                  {lightboxItem.subtitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {lightboxItem.externalUrl && (
                  <a
                    href={lightboxItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    <span>لینک اصلی</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="بستن پنجره"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {lightboxItem.embedUrl ? (
                <iframe
                  src={lightboxItem.embedUrl}
                  title={lightboxItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : lightboxItem.imageUrl ? (
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>
            <div className="p-4 sm:px-6 bg-[#181D1D] text-right text-xs text-[#EDE9DF]/90 leading-relaxed">
              {lightboxItem.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
