import React, { useState, useEffect, useRef } from 'react';
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
  const [isHeroVideoReady, setIsHeroVideoReady] = useState<boolean>(false);
  const [activeVfxPhotoIndex, setActiveVfxPhotoIndex] = useState<number>(0);
  const [playingInlineVideoId, setPlayingInlineVideoId] = useState<string | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setActiveCategory('All');
    setHoveredCardId(null);
    setSelectedItem(null);
    setIsHeroVideoReady(false);
    setActiveVfxPhotoIndex(0);
    setPlayingInlineVideoId(null);
  }, [domain.id]);

  // Smart IntersectionObserver to pause autoplay video when scrolled out of view
  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl || !domain.internationalUnit || !domain.videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(videoEl);
    return () => {
      observer.disconnect();
    };
  }, [domain.id, domain.internationalUnit, domain.videoUrl]);

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
            headIds: [],
            memberIds: domain.relatedMemberIds || [],
          },
        ]
  )
    .map((group) => ({
      ...group,
      heads: (group.headIds || [])
        .map((id) => TEAM_MEMBERS.find((m) => m.id === id))
        .filter((m): m is TeamMember => Boolean(m)),
      members: group.memberIds
        .map((id) => TEAM_MEMBERS.find((m) => m.id === id))
        .filter((m): m is TeamMember => Boolean(m)),
    }))
    .filter((group) => group.heads.length > 0 || group.members.length > 0);

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

          {/* Hero Stage: Full-Width Autoplay Video + Minimalist International Unit Bar for Commercial-CGI, or 12-Col Overview for other domains */}
          {domain.internationalUnit && domain.videoUrl ? (
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_16px_45px_rgba(30,36,36,0.07)] overflow-hidden">
              {/* Full-Width Continuous Autoplay Video Stage */}
              <div className="aspect-video w-full bg-[#121616] relative overflow-hidden">
                {domain.imageUrl && (
                  <img
                    src={domain.imageUrl}
                    alt={domain.title}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                      isHeroVideoReady ? 'opacity-0' : 'opacity-90'
                    }`}
                  />
                )}
                <video
                  ref={heroVideoRef}
                  key={domain.videoUrl}
                  src={domain.videoUrl}
                  poster={domain.imageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={() => setIsHeroVideoReady(true)}
                  className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
                    isHeroVideoReady ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Minimalist Signature Bar: Concise Keywords + BearStudio (3earstudio.com) */}
              <div className="px-5 sm:px-8 py-4 sm:py-5 bg-[#FAF8F4] border-t border-[#DCD6C8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Concise Keywords Only (No cluttered paragraphs) */}
                <div className="space-y-1 text-right">
                  <div className="text-xs sm:text-sm font-bold text-[#1E2424]">
                    {domain.internationalUnit.keywordsFa.join(' · ')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-en text-[#777A76] tracking-wide">
                    {domain.internationalUnit.keywordsEn.join(' · ')}
                  </div>
                </div>

                {/* Subtle International Unit Signature Link (BearStudio · 3earstudio.com) */}
                <a
                  href={domain.internationalUnit.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="group self-start md:self-auto flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-[#F4F0E6] hover:bg-[#1E2424] border border-[#DCD6C8] hover:border-[#1E2424] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#181D1D] flex items-center justify-center p-1.5 shrink-0 border border-white/10">
                    <img
                      src={domain.internationalUnit.logoUrl}
                      alt={domain.internationalUnit.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-left">
                    <div className="text-xs font-en font-bold text-[#1E2424] group-hover:text-[#FAF8F4] transition-colors flex items-center gap-1.5">
                      <span>{domain.internationalUnit.roleLabel}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#3E777A] group-hover:text-[#65B7B5] transition-colors flex items-center gap-1">
                      <span>{domain.internationalUnit.websiteLabel}</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ) : domain.id === 'wonderful-day' ? (
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.05)] p-5 sm:p-7 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Official Vertical Poster Column (4 Cols on Desktop) - 100% Uncropped at all zoom levels */}
                <div className="md:col-span-5 lg:col-span-4 flex items-center justify-center">
                  <div className="w-full max-w-[360px] md:max-w-none rounded-2xl overflow-hidden border border-[#DCD6C8] shadow-[0_12px_32px_rgba(30,36,36,0.10)] bg-[#EDE9DF]">
                    <img
                      src="/assets/wonderful-day-poster.webp"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const remoteUrl =
                          'https://my.uploadkon.ir/d/RDkpbAsQe4oJupEi0adPNECBXTa53v/OTEyNzJ8cGFkZA.webp';
                        if (target.src !== remoteUrl) {
                          target.src = remoteUrl;
                        }
                      }}
                      alt="پوستر رسمی انیمیشن سینمایی روز شگفت‌انگیز"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>

                {/* Narrative & Highlights Column (8 Cols on Desktop) - Balanced alongside the vertical poster */}
                <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#F4F0E6]/60 border border-[#E5E0D4] flex flex-col justify-between space-y-6 text-right">
                  <div className="space-y-4">
                    <span className="text-xs sm:text-sm font-bold text-[#3E777A] block">
                      معرفی و رویکرد دپارتمان
                    </span>

                    <p className="text-sm sm:text-base text-[#1E2424] leading-relaxed font-medium">
                      {domain.description}
                    </p>

                    {domain.secondaryDescription && (
                      <p className="text-xs sm:text-sm text-[#434846] leading-relaxed">
                        {domain.secondaryDescription}
                      </p>
                    )}

                    <div className="pt-5 border-t border-[#DCD6C8] space-y-3">
                      <h3 className="text-xs sm:text-sm font-black text-[#1E2424]">
                        {domain.highlightsTitle || 'محورهای تخصصی این حوزه:'}
                      </h3>
                      <div className="space-y-2.5">
                        {domain.highlights.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#434846] leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DCD6C8] flex flex-wrap items-center gap-2 text-xs text-[#777A76]">
                    <span className="font-bold text-[#1E2424]">کلیدواژه‌ها:</span>
                    <span>{domain.tags.join(' · ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : domain.id === 'vfx-mapping' ? (
            (() => {
              const vfxPhotos = galleryItems.filter((item) => !item.embedUrl && item.imageUrl);
              const currentHeroPhoto =
                vfxPhotos[activeVfxPhotoIndex] || vfxPhotos[0] || null;

              return (
                <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.06)] p-5 sm:p-7 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Interactive Stage & Architectural Mapping Visual Column (7 Cols) - 100% Uncropped 16:9 */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <div
                        onClick={() => currentHeroPhoto && setSelectedItem(currentHeroPhoto)}
                        className="group relative w-full rounded-2xl overflow-hidden border border-[#DCD6C8] bg-[#0B0E11] shadow-[0_12px_32px_rgba(30,36,36,0.12)] cursor-pointer"
                      >
                        <img
                          src={currentHeroPhoto?.imageUrl || '/assets/vfx-img-1.webp'}
                          alt={currentHeroPhoto?.title || domain.title}
                          referrerPolicy="no-referrer"
                          loading="eager"
                          decoding="sync"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const fallback =
                              currentHeroPhoto?.fallbackImageUrl ||
                              'https://my.uploadkon.ir/d/qEI9yLY4BC6xhPR75WLXTP7EDMqDQw/OTEzNzN8cGFkZA.webp';
                            if (target.src !== fallback) {
                              target.src = fallback;
                            }
                          }}
                          className="w-full h-auto block transition-transform duration-700 group-hover:scale-102"
                        />

                        {/* Subtle Expand Button & Frame Caption Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between gap-3">
                          <div className="text-right">
                            <span className="text-[11px] font-mono text-[#D6B16A] block">
                              SA’DABAD COMPLEX · ALIREZA GHORBANI LIVE
                            </span>
                            <p className="text-xs sm:text-sm font-bold text-[#FAF8F4] mt-0.5">
                              {currentHeroPhoto?.title || domain.title}
                            </p>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-[#FAF8F4]/90 group-hover:bg-[#3E777A] text-[#1E2424] group-hover:text-[#FAF8F4] flex items-center justify-center shrink-0 transition-colors shadow-md">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* 3-Frame Interactive Thumbnail Selector Strip */}
                      {vfxPhotos.length > 1 && (
                        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                          {vfxPhotos.map((photo, idx) => {
                            const isActive = idx === activeVfxPhotoIndex;
                            return (
                              <button
                                key={photo.id}
                                type="button"
                                onClick={() => setActiveVfxPhotoIndex(idx)}
                                className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer text-right ${
                                  isActive
                                    ? 'border-[#3E777A] ring-2 ring-[#3E777A]/35 shadow-sm'
                                    : 'border-[#DCD6C8] opacity-75 hover:opacity-100 hover:border-[#3E777A]/60'
                                }`}
                              >
                                <img
                                  src={photo.imageUrl}
                                  alt={photo.title}
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    if (
                                      photo.fallbackImageUrl &&
                                      target.src !== photo.fallbackImageUrl
                                    ) {
                                      target.src = photo.fallbackImageUrl;
                                    }
                                  }}
                                  className="w-full h-auto block"
                                />
                                <div className="px-2.5 py-1.5 bg-[#FAF8F4] border-t border-[#DCD6C8] flex items-center justify-between gap-1">
                                  <span className="text-[11px] font-bold text-[#1E2424] truncate">
                                    {photo.badge || `قاب ${idx + 1}`}
                                  </span>
                                  <span
                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                      isActive ? 'bg-[#3E777A]' : 'bg-[#DCD6C8]'
                                    }`}
                                  />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Narrative & Highlights Column (5 Cols) */}
                    <div className="lg:col-span-5 p-6 sm:p-7 lg:p-8 rounded-2xl bg-[#F4F0E6]/65 border border-[#E5E0D4] flex flex-col justify-between space-y-6 text-right">
                      <div className="space-y-4">
                        <span className="text-xs sm:text-sm font-bold text-[#3E777A] block">
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

                        <div className="pt-4 border-t border-[#DCD6C8] space-y-2.5">
                          <h3 className="text-xs sm:text-sm font-black text-[#1E2424]">
                            {domain.highlightsTitle || 'محورهای تخصصی این حوزه:'}
                          </h3>
                          <div className="space-y-2.5">
                            {domain.highlights.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#434846] leading-relaxed"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#DCD6C8] flex flex-wrap items-center gap-2 text-xs text-[#777A76]">
                        <span className="font-bold text-[#1E2424]">کلیدواژه‌ها:</span>
                        <span>{domain.tags.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] shadow-[0_14px_40px_rgba(30,36,36,0.05)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Visual Column (7 Cols) */}
                <div className="lg:col-span-7 bg-[#EDE9DF] relative overflow-hidden min-h-[260px] sm:min-h-[360px]">
                  <VisualArtCanvas
                    type={domain.canvasType}
                    imageUrl={domain.imageUrl}
                    className="w-full h-full lg:absolute lg:inset-0 aspect-video lg:aspect-auto"
                    showControls={false}
                  />
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
          )}
        </section>

        {/* 3. Department Portfolio Grid */}
        {galleryItems.length > 0 && (
          <section className="space-y-10 border-t border-[#DCD6C8] pt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block">
                  SELECTED WORKS & LIVE ARCHIVE
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                  {domain.id === 'vfx-mapping'
                    ? 'گزیده ویدیوهای اجرای زنده و قاب‌های ویدئو مپینگ'
                    : 'گزیده آثار و نمونه‌کارها'}
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

            {domain.id === 'vfx-mapping' ? (
              (() => {
                const vfxVideos = galleryItems.filter((item) => Boolean(item.embedUrl));
                const vfxPhotos = galleryItems.filter((item) => !item.embedUrl && item.imageUrl);

                return (
                  <div className="space-y-12">
                    {/* Part A: 2 Live Concert YouTube Videos (Shoushtari & Orouj) */}
                    {vfxVideos.length > 0 && (
                      <div className="space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-right">
                          <h3 className="text-base sm:text-xl font-black text-[#1E2424]">
                            ویدیوهای اجرای زنده و کارگردانی بصری صحنه · کنسرت علیرضا قربانی (کاخ سعدآباد)
                          </h3>
                          <span className="text-xs font-mono text-[#3E777A] font-semibold">
                            LIVE PERFORMANCE VIDEOS (2)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
                          {vfxVideos.map((video) => {
                            const isPlayingInline = playingInlineVideoId === video.id;

                            return (
                              <article
                                key={video.id}
                                className="rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(30,36,36,0.05)] flex flex-col justify-between"
                              >
                                <div>
                                  {/* Top Bar */}
                                  <div className="px-4 py-2.5 bg-[#F4F0E6] border-b border-[#DCD6C8] flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#3E777A]">
                                      {video.badge || 'ویدیوی اجرای زنده'}
                                    </span>
                                    <span className="text-xs font-en font-semibold text-[#434846]">
                                      {video.titleEn}
                                    </span>
                                  </div>

                                  {/* 16:9 Stage Video Player / Thumbnail */}
                                  <div className="aspect-video w-full bg-[#0B0E11] relative overflow-hidden border-b border-[#DCD6C8]">
                                    {isPlayingInline && video.embedUrl ? (
                                      <iframe
                                        src={video.embedUrl}
                                        title={video.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                      />
                                    ) : (
                                      <div
                                        onClick={() => setPlayingInlineVideoId(video.id)}
                                        className="group w-full h-full relative cursor-pointer"
                                      >
                                        {video.imageUrl && (
                                          <img
                                            src={video.imageUrl}
                                            alt={video.title}
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                              const target = e.currentTarget;
                                              if (
                                                video.fallbackImageUrl &&
                                                target.src !== video.fallbackImageUrl
                                              ) {
                                                target.src = video.fallbackImageUrl;
                                              }
                                            }}
                                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-104"
                                          />
                                        )}
                                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="w-14 h-14 rounded-full bg-[#FAF8F4]/95 group-hover:bg-[#3E777A] text-[#1E2424] group-hover:text-[#FAF8F4] flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
                                            <Play className="w-6 h-6 fill-current ml-0.5" />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Video Info Body */}
                                  <div className="p-5 sm:p-6 space-y-2.5 text-right">
                                    <h4 className="text-base sm:text-lg font-black text-[#1E2424]">
                                      {video.title}
                                    </h4>
                                    <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                                      {video.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Video Card Actions: Play in Modal or Open YouTube Directly */}
                                <div className="px-5 sm:px-6 py-3.5 bg-[#F4F0E6]/70 border-t border-[#E5E0D4] flex flex-wrap items-center justify-between gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedItem(video)}
                                    className="text-xs font-bold text-[#3E777A] hover:text-[#1E2424] flex items-center gap-1.5 cursor-pointer transition-colors"
                                  >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span>پخش در نمای سینمایی</span>
                                  </button>

                                  {video.externalUrl && (
                                    <a
                                      href={video.externalUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#3E777A] text-[#1E2424] hover:text-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] text-xs font-bold flex items-center gap-1.5 transition-all"
                                    >
                                      <span>مشاهده در یوتیوب</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Part B: 3 Architectural & Stage Mapping Photos (Uncropped 16:9) */}
                    {vfxPhotos.length > 0 && (
                      <div className="space-y-5 pt-4 border-t border-[#DCD6C8]/70">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-right">
                          <h3 className="text-base sm:text-xl font-black text-[#1E2424]">
                            گالری قاب‌های اجرایی ویدئو مپینگ و معماری صحنه
                          </h3>
                          <span className="text-xs font-mono text-[#3E777A] font-semibold">
                            STAGE & FACADE PHOTOGRAPHY (3)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {vfxPhotos.map((photo) => (
                            <article
                              key={photo.id}
                              onClick={() => setSelectedItem(photo)}
                              className="group cursor-pointer rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] overflow-hidden transition-all duration-300 hover:shadow-[0_14px_35px_rgba(30,36,36,0.07)] hover:-translate-y-0.5 flex flex-col justify-between"
                            >
                              <div className="w-full bg-[#0B0E11] relative overflow-hidden border-b border-[#DCD6C8]">
                                <img
                                  src={photo.imageUrl}
                                  alt={photo.title}
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    if (
                                      photo.fallbackImageUrl &&
                                      target.src !== photo.fallbackImageUrl
                                    ) {
                                      target.src = photo.fallbackImageUrl;
                                    }
                                  }}
                                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-103"
                                />
                                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                                  <Maximize2 className="w-4 h-4" />
                                </div>
                              </div>

                              <div className="p-4 sm:p-5 space-y-2 text-right">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[11px] font-bold text-[#3E777A]">
                                    {photo.badge}
                                  </span>
                                  <span className="text-[11px] font-en text-[#777A76] truncate">
                                    {photo.titleEn}
                                  </span>
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors leading-snug">
                                  {photo.title}
                                </h4>
                                <p className="text-xs text-[#434846] leading-relaxed">
                                  {photo.description}
                                </p>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              /* Clean, Concise Grid Cards for other domains */
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
            )}

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

            <div className="space-y-14">
              {resolvedTeamGroups.map((group, groupIdx) => {
                // Case A: Sub-division with its own Head(s) + Members (e.g., Animation's 3 sub-divisions)
                if (group.heads.length > 0) {
                  return (
                    <div
                      key={group.id}
                      className={`space-y-10 ${
                        groupIdx > 0 ? 'pt-12 border-t border-[#DCD6C8]/80' : ''
                      }`}
                    >
                      {/* Sub-Division Title (e.g., بخش کارگردانی / بخش فنی / بخش هنری) */}
                      <div className="flex items-center justify-center gap-4">
                        <span className="h-px w-14 sm:w-24 bg-[#3E777A]/35" />
                        <h3 className="text-base sm:text-xl font-black text-[#1E2424]">
                          {group.title}
                        </h3>
                        <span className="h-px w-14 sm:w-24 bg-[#3E777A]/35" />
                      </div>

                      {/* 1. Head of Sub-Division */}
                      <div className="space-y-5">
                        <div className="text-center">
                          <span className="text-xs font-bold text-[#3E777A]">
                            هد {group.title}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
                          {group.heads.map((head) => (
                            <div
                              key={`${group.id}-head-${head.id}`}
                              onClick={() => onSelectMember(head)}
                              className="group cursor-pointer flex flex-col items-center text-center"
                            >
                              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#3E777A] group-hover:border-[#65B7B5] mb-3.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#FAF8F4] shadow-xs relative shrink-0">
                                {head.imageUrl ? (
                                  <img
                                    src={head.imageUrl}
                                    alt={head.name}
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
                                  style={{ display: head.imageUrl ? 'none' : 'flex' }}
                                  className="flex-col items-center justify-center text-[#777A76] w-full h-full"
                                >
                                  <User className="w-7 h-7 opacity-60 mb-0.5" />
                                  <span className="text-[10px] font-mono font-bold tracking-wider">
                                    {head.initials}
                                  </span>
                                </div>
                              </div>

                              <h4 className="text-base sm:text-lg font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
                                {head.name}
                              </h4>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Members of Sub-Division */}
                      {group.members.length > 0 && (
                        <div className="space-y-6">
                          <div className="text-center">
                            <span className="text-xs font-bold text-[#434846]">
                              اعضای تیم
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
                            {group.members.map((member) => (
                              <div
                                key={`${group.id}-member-${member.id}`}
                                onClick={() => onSelectMember(member)}
                                className="group cursor-pointer flex flex-col items-center text-center"
                              >
                                <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full border-2 border-[#DCD6C8] group-hover:border-[#3E777A] mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#FAF8F4] shadow-xs relative shrink-0">
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

                                <h4 className="text-sm sm:text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
                                  {member.name}
                                </h4>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Case B: Standard Group (e.g., Commercial-CGI's هد دپارتمان / اعضای تیم)
                return (
                  <div key={group.id} className="space-y-7">
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

                    <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
                      {group.members.map((member) => (
                        <div
                          key={`${group.id}-${member.id}`}
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
                );
              })}
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
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (
                      selectedItem.fallbackImageUrl &&
                      target.src !== selectedItem.fallbackImageUrl
                    ) {
                      target.src = selectedItem.fallbackImageUrl;
                    }
                  }}
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
