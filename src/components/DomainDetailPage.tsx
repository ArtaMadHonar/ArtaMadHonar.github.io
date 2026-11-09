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
  type ProjectWork,
  type TeamMember,
  type DomainGalleryItem,
} from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';
import { useModalScrollLock } from '../hooks/useModalScrollLock';
import { openTeamMemberModal, openInquiryModal } from '../utils/modalEvents';

interface DomainDetailPageProps {
  domain: ProjectWork;
  onSelectDomain?: (domainId: string) => void;
  onBackToHome?: () => void;
  onSelectMember?: (member: TeamMember) => void;
  onOpenContact?: (domainId?: string) => void;
}

const PORTFOLIO_CATEGORIES: {
  id: string;
  label: string;
}[] = [
  { id: 'All', label: 'All' },
  { id: 'Demoreel', label: 'Demoreel' },
  { id: '2D', label: '2D' },
  { id: 'Sound Design', label: 'Sound Design' },
  { id: 'Editorial', label: 'Editorial' },
  { id: 'Making of', label: 'Making of' },
  { id: 'AI Assisted', label: 'AI Assisted' },
];

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({
  domain,
  onSelectDomain = (id: string) => { window.location.href = `/${id}`; },
  onBackToHome = () => { window.location.href = '/#works'; },
  onSelectMember = (m: TeamMember) => { openTeamMemberModal(m); },
  onOpenContact = (id?: string) => { openInquiryModal(id); },
}) => {
  const [selectedItem, setSelectedItem] = useState<DomainGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeVfxPhotoIndex, setActiveVfxPhotoIndex] = useState<number>(0);
  const [activeLumindyIndex, setActiveLumindyIndex] = useState<number>(0);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  useModalScrollLock(!!selectedItem, modalScrollRef);

  useEffect(() => {
    setActiveCategory('All');
    setHoveredCardId(null);
    setSelectedItem(null);
    setActiveVfxPhotoIndex(0);
    setActiveLumindyIndex(0);
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
  // For vfx-mapping, the 3 stage photos are displayed once in the top Hero viewer,
  // so the bottom Portfolio section only renders the 2 video works (no duplicate photos).
  const portfolioBaseItems =
    domain.id === 'vfx-mapping'
      ? galleryItems.filter((item) => Boolean(item.embedUrl))
      : galleryItems;

  const hasCategorizedVideos = portfolioBaseItems.some((item) =>
    Boolean(item.category && item.embedUrl)
  );

  const filteredGalleryItems =
    activeCategory === 'All'
      ? portfolioBaseItems
      : portfolioBaseItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#EDE9DF] text-[#1E2424] pb-20">
      {/* 1. Sub-Header Bar: Back to Home + Quick Switcher Between 5 Domains */}
      <div className="bg-[#F4F0E6] border-b border-[#DCD6C8] py-3 sm:py-3.5 px-3 sm:px-6 lg:px-8 xl:px-10">
        <div className="w-full mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3.5">
          <div className="flex items-center justify-between lg:justify-start gap-3">
            <button
              onClick={onBackToHome}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#3E777A] text-[#1E2424] hover:text-[#FAF8F4] border border-[#DCD6C8] hover:border-[#3E777A] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به صفحه اصلی</span>
            </button>

            <span className="text-[11px] font-mono text-[#777A76] lg:hidden farsi-nums">
              حوزه {toPersianNum(canonicalNum)} از ۰۵
            </span>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 p-1 bg-[#EDE9DF] border border-[#DCD6C8] rounded-2xl max-w-full">
            {SELECTED_WORKS.map((item, idx) => {
              const isActive = item.id === domain.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectDomain(item.id)}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-10 sm:pt-14 space-y-16 sm:space-y-20">
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

          {/* Hero Stage: Full-Width 21:9 Banner + Minimalist International Unit Bar for Commercial-CGI */}
          {domain.id === 'commercial-cgi' && domain.internationalUnit ? (
            <div className="rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-[0_16px_45px_rgba(30,36,36,0.07)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)] overflow-hidden">
              {/* Real Studio Photo Hero Stage (16:9) */}
              <div className="aspect-[16/9] w-full bg-[#121616] relative overflow-hidden">
                <img
                  src={domain.imageUrl || '/assets/commercial-teaser-banner.webp'}
                  alt={domain.title}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="sync"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback =
                      domain.fallbackImageUrl ||
                      'https://my.uploadkon.ir/d/8ZUbcLFR84n4O6DvYRgWFI4ebabId8/OTQ5Mzl8cGFkZA.webp';
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                  className="w-full h-full object-cover object-center block"
                />
              </div>

              {/* Minimalist Signature Bar: Concise Keywords + BearStudio (3earstudio.com) */}
              <div className="px-4 sm:px-8 py-4 sm:py-5 bg-[#FAF8F4] dark:bg-[#151E20] border-t border-[#DCD6C8] dark:border-[#27363A] flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Concise Keywords Only (No cluttered paragraphs) */}
                <div className="space-y-1 text-right">
                  <div className="text-xs sm:text-sm font-bold text-[#1E2424] dark:text-[#F2EFE9]">
                    {domain.internationalUnit.keywordsFa.join(' · ')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-en text-[#777A76] dark:text-[#96A7A7] tracking-wide">
                    {domain.internationalUnit.keywordsEn.join(' · ')}
                  </div>
                </div>

                {/* Subtle International Unit Signature Link (BearStudio · 3earstudio.com) */}
                <a
                  href={domain.internationalUnit.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="group w-full md:w-auto justify-between md:justify-start flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-[#F4F0E6] dark:bg-[#1B2629] hover:bg-[#1E2424] dark:hover:bg-[#243337] border border-[#DCD6C8] dark:border-[#2C3E42] hover:border-[#1E2424] dark:hover:border-[#65B7B5] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#181D1D] flex items-center justify-center p-1.5 shrink-0 border border-white/10">
                    <img
                      src={domain.internationalUnit.logoUrl}
                      alt={domain.internationalUnit.name}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-left">
                    <div className="text-xs font-en font-bold text-[#1E2424] dark:text-[#F2EFE9] group-hover:text-[#FAF8F4] transition-colors flex items-center gap-1.5">
                      <span>{domain.internationalUnit.roleLabel}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#3E777A] dark:text-[#65B7B5] group-hover:text-[#65B7B5] transition-colors flex items-center gap-1">
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
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-[#DCD6C8] shadow-[0_12px_32px_rgba(30,36,36,0.10)] bg-[#EDE9DF] flex items-center justify-center">
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

                {/* Engaging, Non-Essay IP Creation & Flagship Film Column (8 Cols on Desktop) */}
                <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between gap-4 sm:gap-5 text-right">
                  {/* Block 1: IP Creation & Development Architecture */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 border border-[#E5E0D4] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCD6C8] pb-3">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-[#3E777A] block">
                          فلسفه و ماموریت دپارتمان انیمیشن
                        </span>
                        <h2 className="text-base sm:text-xl font-black text-[#1E2424]">
                          خلق و توسعه دارایی‌های فکری اورجینال (IP Development)
                        </h2>
                      </div>
                      <span
                        dir="ltr"
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#777A76]"
                      >
                        ORIGINAL IP STUDIO
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed">
                      در آرتا ماد هنر، انیمیشن تنها یک محصول تک‌بعدی نیست؛ بلکه نقطه آغاز خلق یک «دارایی فکری ماندگار» با هویت فرهنگی بومی و استاندارد روایت جهانی است.
                    </p>

                    {/* 3 Visual & Scannable IP Pillars (Instead of long essay paragraphs) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            dir="ltr"
                            className="text-xs font-mono font-black text-[#3E777A]"
                          >
                            01
                          </span>
                          <span
                            dir="ltr"
                            className="text-[9px] font-mono uppercase text-[#777A76]"
                          >
                            WORLDBUILDING
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-black text-[#1E2424]">
                          جهان‌سازی و کاراکتر
                        </h3>
                        <p className="text-[11px] text-[#434846] leading-relaxed">
                          خلق شخصیت‌های متمایز و دنیاهای فانتزی با قابلیت هم‌ذات‌پنداری جهانی
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            dir="ltr"
                            className="text-xs font-mono font-black text-[#3E777A]"
                          >
                            02
                          </span>
                          <span
                            dir="ltr"
                            className="text-[9px] font-mono uppercase text-[#777A76]"
                          >
                            HYBRID PIPELINE
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-black text-[#1E2424]">
                          پایپلاین سه‌بعدی و AI
                        </h3>
                        <p className="text-[11px] text-[#434846] leading-relaxed">
                          تلفیق انیمیشن 3D استایلایز با هوش مصنوعی برای ارتقای کیفیت و سرعت تولید
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            dir="ltr"
                            className="text-xs font-mono font-black text-[#3E777A]"
                          >
                            03
                          </span>
                          <span
                            dir="ltr"
                            className="text-[9px] font-mono uppercase text-[#777A76]"
                          >
                            360° VALUE CHAIN
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-black text-[#1E2424]">
                          زنجیره ارزش میان‌رسانه‌ای
                        </h3>
                        <p className="text-[11px] text-[#434846] leading-relaxed">
                          گسترش IP از اکران سینمایی به دنباله‌ها، سریال، بازی و محصولات جانبی
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Block 2: Flagship Feature Film Story & Specs (Matches Bottom of Poster) */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 border border-[#E5E0D4] flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCD6C8] pb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-[#1E2424]">
                            اثر شاخص: انیمیشن سینمایی «روز شگفت‌انگیز»
                          </span>
                          <span className="text-[11px] font-semibold text-[#3E777A]">
                            (به تهیه‌کنندگی فیلمیران)
                          </span>
                        </div>
                        <span
                          dir="ltr"
                          className="text-[10px] font-mono font-bold text-[#3E777A] uppercase"
                        >
                          A WONDERFUL DAY · FEATURE FILM
                        </span>
                      </div>

                      <p className="text-xs sm:text-[13.5px] text-[#1E2424] font-medium leading-[1.9] text-justify">
                        <strong className="text-[#3E777A]">انیمیشن سینمایی روز شگفت‌انگیز : </strong>
                        پویو یه بچه‌ی بدشانسه که توی خانواده‌ای زندگی می‌کنه که اعضاش اونقدر خوش‌شانس و بی‌نقصن که نامزدِ «خانواده‌ی شایسته» شدن! پویو روز تولدش آرزو می‌کنه که بقیه هم بتونن درکش کنن؛ غافل از اینکه برای اولین بار، قراره همه به اندازه‌ی خودش بدشانس بشن!
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#DCD6C8] flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
                      <div className="flex flex-wrap items-center gap-2 text-[#434846]">
                        <span>
                          ژانر: <strong className="text-[#1E2424]">کمدی، ماجراجویی و خانوادگی</strong>
                        </span>
                        <span aria-hidden="true" className="text-[#777A76]">·</span>
                        <span>
                          تکنیک: <strong className="text-[#1E2424]">سه‌بعدی استایلایز</strong>
                        </span>
                      </div>
                      <span className="font-semibold text-[#3E777A]">
                        {domain.tags.join(' · ')}
                      </span>
                    </div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    {/* Clean, Unobstructed Stage Photography Viewer (7 Cols) - Top-Aligned & Dynamic Caption Box Below */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-3.5">
                      <div className="space-y-3">
                        <div
                          onClick={() => currentHeroPhoto && setSelectedItem(currentHeroPhoto)}
                          className="group relative w-full rounded-2xl overflow-hidden border border-[#DCD6C8] bg-[#0B0E11] shadow-[0_10px_28px_rgba(30,36,36,0.1)] cursor-pointer"
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
                            className="w-full h-auto block"
                          />
                        </div>

                        {/* Clean 3-Thumbnail Switcher Strip (Pure Images, Zero Text Clutter) */}
                        {vfxPhotos.length > 1 && (
                          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                            {vfxPhotos.map((photo, idx) => {
                              const isActive = idx === activeVfxPhotoIndex;
                              return (
                                <button
                                  key={photo.id}
                                  type="button"
                                  onClick={() => setActiveVfxPhotoIndex(idx)}
                                  aria-label={photo.title}
                                  className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                    isActive
                                      ? 'border-[#3E777A] ring-2 ring-[#3E777A]/40 opacity-100 shadow-xs'
                                      : 'border-[#DCD6C8] opacity-60 hover:opacity-100 hover:border-[#3E777A]/60'
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
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Dynamic Selected Photo Description Box (Fills Bottom Space Under Album) */}
                      {currentHeroPhoto && (
                        <div className="flex-1 flex flex-col justify-center p-4 sm:p-5 rounded-2xl bg-[#F4F0E6]/65 border border-[#E5E0D4] text-right space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#3E777A]/12 text-[#2E5A5C] text-[11px] font-bold">
                              {currentHeroPhoto.badge || `قاب صحنه · ${activeVfxPhotoIndex + 1} از ${vfxPhotos.length}`}
                            </span>
                            {currentHeroPhoto.titleEn && (
                              <span
                                className="text-[11px] font-mono text-[#777A76] tracking-wide"
                                dir="ltr"
                              >
                                {currentHeroPhoto.titleEn}
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs sm:text-sm font-black text-[#1E2424] leading-snug">
                            {currentHeroPhoto.title}
                          </h4>

                          <p className="text-xs sm:text-[13px] text-[#434846] leading-relaxed">
                            {currentHeroPhoto.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Concise, Keyword-Focused Narrative & Highlights Column (5 Cols) */}
                    <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-[#F4F0E6]/65 border border-[#E5E0D4] flex flex-col justify-between space-y-5 text-right">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#DCD6C8] pb-3">
                          <span className="text-xs sm:text-sm font-black text-[#3E777A]">
                            معرفی و رویکرد دپارتمان
                          </span>
                          <span
                            dir="ltr"
                            className="text-[10px] font-mono font-semibold text-[#777A76] uppercase"
                          >
                            STAGE & PROJECTION
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#1E2424] leading-relaxed font-medium">
                          طراحی و اجرای ویدئو مپینگ معماری (Architectural Mapping)، کارگردانی بصری کنسرت‌ها و خلق تجربه‌های تصویری فراگیر؛ تبدیل بناهای شاخص و صحنه‌های اجرا به بوم‌های زنده و همگام با موسیقی.
                        </p>

                        {/* Compact Flagship Case Study Box */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#1E2424]">
                              اثر شاخص: کنسرت علیرضا قربانی · کاخ سعدآباد
                            </span>
                            <span className="text-[10px] font-semibold text-[#3E777A]">
                              تابستان ۱۴۰۲
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-[#434846] leading-relaxed">
                            کارگردانی بصری صحنه و مپینگ کالیبره‌شده بر روی ایوان و ستون‌های کاخ سعدآباد در هماهنگی کامل با ارکستر (قطعات «شوشتری» و «عروج»).
                          </p>
                        </div>

                        {/* Concise 3 Pillars */}
                        <div className="pt-2 space-y-2.5">
                          <h3 className="text-xs font-black text-[#1E2424]">
                            محورهای تخصصی این حوزه:
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-xs text-[#434846]">
                              <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                              <span>ویدئو مپینگ معماری منطبق بر هندسه بناهای تاریخی و شهری</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-[#434846]">
                              <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                              <span>کارگردانی بصری کنسرت و همگام‌سازی تصویر و نور با ارکستر زنده</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-[#434846]">
                              <CheckCircle2 className="w-4 h-4 text-[#3E777A] shrink-0 mt-0.5" />
                              <span>طراحی جلوه‌های بصری (VFX) و مهندسی اتمسفر صحنه‌ای رویدادها</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-[#DCD6C8] flex flex-wrap items-center gap-2 text-xs text-[#3E777A] font-semibold">
                        <span>{domain.tags.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : domain.id === 'game-lab' ? (
            <div className="rounded-3xl bg-[#FAF8F4] dark:bg-[#121616] border border-[#DCD6C8] dark:border-[#27363A] shadow-[0_14px_40px_rgba(30,36,36,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-5 sm:p-7 lg:p-8 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Right Column in RTL (6 Cols): 93-Minute DIRC Stat + Vision Narrative + 5 IP Expansion Pillars */}
                <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#E5E0D4] dark:border-[#2E3636] flex flex-col justify-start space-y-4 text-right transition-colors">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCD6C8] dark:border-[#2E3636] pb-3">
                      <span className="text-xs sm:text-sm font-black text-[#3E777A] dark:text-[#5DB8BD]">
                        معرفی و رویکرد دپارتمان بازی‌سازی
                      </span>
                      <span
                        dir="ltr"
                        className="text-[10px] font-mono font-bold text-[#777A76] dark:text-[#889290] uppercase tracking-wider"
                      >
                        GAME DEV & INTERACTIVE IP
                      </span>
                    </div>

                    {/* Prominent 93-Minute Daily Playtime Highlight Box (Exact Data from Slide) */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151A1A] border border-[#DCD6C8] dark:border-[#2A3232] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
                      <div className="flex items-baseline gap-2.5 shrink-0">
                        <span className="text-4xl sm:text-5xl font-black text-[#3E777A] dark:text-[#5DB8BD] leading-none farsi-nums">
                          ۹۳
                        </span>
                        <span className="text-base sm:text-lg font-black text-[#1E2424] dark:text-[#E8F1F2]">
                          دقیقه
                        </span>
                      </div>

                      <div className="space-y-1 text-right sm:border-r sm:border-[#DCD6C8] dark:sm:border-[#2E3636] sm:pr-4 flex-1">
                        <div className="text-xs sm:text-sm font-black text-[#1E2424] dark:text-[#E8F1F2]">
                          میانگین بازی در ایران در روز
                        </div>
                        <div className="text-[11px] sm:text-xs font-medium text-[#777A76] dark:text-[#889290]">
                          منبع: مرکز تحقیقات بازی‌های دیجیتال (دایرک)
                        </div>
                      </div>
                    </div>

                    {/* Exact Philosophy & Vision Narrative from Reference Slide */}
                    <div className="space-y-3 text-xs sm:text-[13.5px] text-[#1E2424] dark:text-[#D1DDD8] leading-[1.95] text-justify font-medium">
                      <p>
                        این زمان، فرصتی برای گسترش ارتباط کودک با شخصیت‌ها و جهان‌های داستانی است. تماشای انیمیشن می‌تواند نخستین پیوند عاطفی کودک با یک شخصیت را شکل دهد؛ اما بازی، امکان ادامه‌دادن این ارتباط را از طریق تعامل و تجربه‌های مکرر فراهم می‌کند.
                      </p>
                      <p className="text-[#434846] dark:text-[#A8B2B0]">
                        ما با توسعه بازی‌های موبایلی، رایانه‌ای و رومیزی در امتداد جهان پویو، تلاش می‌کنیم این ارتباط را فراتر از تماشای فیلم ادامه دهیم؛ تا کودک نه فقط تماشاگر ماجراهای پویو، بلکه همراه و بخشی از دنیای او باشد.
                      </p>
                    </div>
                  </div>

                  {/* 5 IP Ecosystem Signposts Strip */}
                  <div className="pt-3.5 border-t border-[#DCD6C8] dark:border-[#2E3636] space-y-2">
                    <span className="text-[11px] font-bold text-[#777A76] dark:text-[#889290] block">
                      زنجیره گسترش تعاملی جهان «روز شگفت‌انگیز»:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        'مرچندایز',
                        'گیم موبایلی',
                        'گیم برد (بازی رومیزی)',
                        'اکشن‌پز شخصیت',
                        'بازی آموزش زبان',
                      ].map((pillar) => (
                        <span
                          key={pillar}
                          className="px-3 py-1 rounded-xl bg-[#FAF8F4] dark:bg-[#161B1B] border border-[#DCD6C8] dark:border-[#2E3636] text-[11px] sm:text-xs font-bold text-[#1E2424] dark:text-[#E8F1F2]"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Left Column in RTL (6 Cols): Ecosystem Signpost Visual + 3 Core Game Lines */}
                <div className="lg:col-span-6 flex flex-col justify-start gap-4">
                  {/* Top Visual: Wonderful Day Interactive Ecosystem Banner */}
                  <div className="w-full rounded-2xl overflow-hidden bg-transparent">
                    <img
                      src="/assets/game-lab/rollercoaster-banner.webp"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const fallback =
                          'https://my.uploadkon.ir/d/OOrFtYqpxnk7dUtWNacvwQB0G4KHsZ/OTQ4MDd8cGFkZA.webp';
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                      alt="اکوسیستم بازی و محصولات تعاملی روز شگفت‌انگیز"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-auto block rounded-2xl"
                    />
                  </div>

                  {/* Bottom 3-Pillar Product Line Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#E5E0D4] dark:border-[#2E3636] flex flex-col justify-between space-y-2 text-right transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#3E777A] dark:text-[#5DB8BD]" dir="ltr">
                          01 · MOBILE
                        </span>
                        <span className="text-[10px] font-bold text-[#777A76] dark:text-[#889290]">دسته اول</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-[#1E2424] dark:text-[#E8F1F2]">
                        بازی موبایلی «پازل پویو»
                      </h3>
                      <p className="text-[11px] text-[#434846] dark:text-[#A8B2B0] leading-relaxed">
                        چالش سرعت عمل، تطبیق تاس و انتخاب کارت‌های شخصیت برای پلتفرم موبایل
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#E5E0D4] dark:border-[#2E3636] flex flex-col justify-between space-y-2 text-right transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#3E777A] dark:text-[#5DB8BD]" dir="ltr">
                          02 · BOARD GAME
                        </span>
                        <span className="text-[10px] font-bold text-[#777A76] dark:text-[#889290]">دسته دوم</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-[#1E2424] dark:text-[#E8F1F2]">
                        بازی رومیزی «روز شگفت‌انگیز»
                      </h3>
                      <p className="text-[11px] text-[#434846] dark:text-[#A8B2B0] leading-relaxed">
                        بردگیم خانوادگی با کارت‌های شانس و چالش به همراه مهره‌های استندی کاراکترها
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#E5E0D4] dark:border-[#2E3636] flex flex-col justify-between space-y-2 text-right transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#3E777A] dark:text-[#5DB8BD]" dir="ltr">
                          03 · PC GAME
                        </span>
                        <span className="text-[10px] font-bold text-[#777A76] dark:text-[#889290]">دسته سوم</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-[#1E2424] dark:text-[#E8F1F2]">
                        بازی PC «ماجراجویی پویو»
                      </h3>
                      <p className="text-[11px] text-[#434846] dark:text-[#A8B2B0] leading-relaxed">
                        گیم‌پلی سه‌بعدی، دوچرخه‌سواری در شهر و جمع‌آوری آیتم‌ها در دنیای پویو
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : domain.id === 'web3-nft' ? (
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] dark:border-[#27363A] shadow-[0_14px_40px_rgba(30,36,36,0.06)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.5)] p-5 sm:p-7 lg:p-8 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Visual Cover (7 Cols) */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      id: 'web3-nft-cover-preview',
                      title: 'مجموعه‌های کلکسیونی NFT و دارایی‌های دیجیتال جهان پویو',
                      titleEn: 'Web3 & NFT Character Collectibles',
                      subtitle: 'Character-driven Digital Assets & On-Chain Provenance',
                      badge: 'کاور رسمی دپارتمان وب۳ و NFT',
                      description:
                        'طراحی مجموعه‌های کلکسیونی و دارایی‌های دیجیتال مبتنی بر شخصیت‌ها و جهان‌های داستانی استودیو؛ ثبت اصالت و مالکیت بر بستر بلاکچین و ایجاد تجربه‌های تعاملی جدید برای مخاطبان و طرفداران آثار.',
                      imageUrl: '/assets/web3-nft-cover.webp',
                      fallbackImageUrl:
                        'https://my.uploadkon.ir/d/D5zfgGnIPLtg5Fowg9wZUMCXbiq8nL/OTUxNjV8cGFkZA.webp',
                    })
                  }
                  className="lg:col-span-7 group cursor-pointer relative rounded-2xl overflow-hidden border border-[#DCD6C8] hover:border-[#3E777A] dark:border-[#27363A] dark:hover:border-[#65B7B5] bg-[#121616] shadow-[0_10px_28px_rgba(30,36,36,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all"
                >
                  <img
                    src="/assets/web3-nft-cover.webp"
                    alt={domain.title}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="sync"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback =
                        'https://my.uploadkon.ir/d/D5zfgGnIPLtg5Fowg9wZUMCXbiq8nL/OTUxNjV8cGFkZA.webp';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-[#FAF8F4] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#65B7B5] animate-pulse" />
                    <span className="text-[11px] font-bold">
                      دارایی‌های کلکسیونی NFT · جهان داستانی پویو
                    </span>
                  </div>
                </div>

                {/* Narrative & 2 Pillars (5 Cols) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1B2629] border border-[#E5E0D4] dark:border-[#202D31] flex flex-col justify-between space-y-5 text-right transition-colors">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCD6C8] dark:border-[#27363A] pb-3">
                      <span className="text-xs sm:text-sm font-black text-[#3E777A] dark:text-[#65B7B5]">
                        معرفی و رویکرد دپارتمان
                      </span>
                      <span
                        dir="ltr"
                        className="text-[10px] font-mono font-bold text-[#777A76] dark:text-[#8C9997] uppercase tracking-wider"
                      >
                        WEB3 & TECH SOLUTIONS
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-[#1E2424] dark:text-[#F2EFE9] leading-relaxed font-medium">
                      تلاقی فناوری‌های نرم‌افزاری هوشمند، اتوماسیون پایپلاین‌های تولید رسانه و به‌کارگیری فناوری‌های وب۳ و بلاکچین در راستای مالکیت دیجیتال و گسترش بازارپردازی دارایی‌های فکری (IP).
                    </p>

                    {/* 2 Strategic Pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#2A393D] dark:hover:border-[#65B7B5]/40 transition-colors space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span dir="ltr" className="text-xs font-mono font-black text-[#3E777A] dark:text-[#65B7B5]">
                            01
                          </span>
                          <span dir="ltr" className="text-[9px] font-mono uppercase text-[#777A76] dark:text-[#8C9997]">
                            LUMINDY PLATFORM
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-black text-[#1E2424] dark:text-[#F2EFE9]">
                          پروژه لوماندی
                        </h3>
                        <p className="text-[11px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                          مدیریت هوشمند پروژه‌ها، گردش‌کار (Workflow)، ارجاع وظایف و نمودار گانت
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#2A393D] dark:hover:border-[#65B7B5]/40 transition-colors space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span dir="ltr" className="text-xs font-mono font-black text-[#3E777A] dark:text-[#65B7B5]">
                            02
                          </span>
                          <span dir="ltr" className="text-[9px] font-mono uppercase text-[#777A76] dark:text-[#8C9997]">
                            WEB3 & NFT
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-black text-[#1E2424] dark:text-[#F2EFE9]">
                          وب۳ و بازارپردازی دیجیتال
                        </h3>
                        <p className="text-[11px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                          مالکیت دارایی‌های دیجیتال و مجموعه‌های کلکسیونی مبتنی بر کاراکترها و جهان‌های داستانی
                        </p>
                      </div>
                    </div>

                    {/* 3 Value bullets */}
                    <div className="pt-2 space-y-2">
                      <div className="flex items-start gap-2 text-xs text-[#434846] dark:text-[#CED7D5]">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5] shrink-0 mt-0.5" />
                        <span>گردش‌کار اختصاصی و فرآیند هوشمند ارجاع و بررسی توسط سرپرست</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#434846] dark:text-[#CED7D5]">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5] shrink-0 mt-0.5" />
                        <span>ثبت اصالت و مالکیت بر بستر بلاکچین برای دارایی‌های دیجیتال منحصربه‌فرد</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#434846] dark:text-[#CED7D5]">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5] shrink-0 mt-0.5" />
                        <span>ایجاد تجربه‌های جدید و ارزش‌افزا برای مخاطبان و طرفداران آثار استودیو</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[#DCD6C8] dark:border-[#27363A] flex flex-wrap items-center gap-2 text-xs text-[#3E777A] dark:text-[#65B7B5] font-semibold">
                    <span>{domain.tags.join(' · ')}</span>
                  </div>
                </div>
              </div>
            </div>
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

        {/* 3. Department Portfolio Grid (Bespoke Clustered Showcases for game-lab, Unified Grid for Others) */}
        {domain.id === 'game-lab' ? (
          <section className="space-y-12 border-t border-[#DCD6C8] pt-14 text-right">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block">
                  INTERACTIVE PRODUCTS & GAME SHOWCASE
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                  محصولات و بازی‌های توسعه‌یافته در جهان پویو
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#777A76]">
                برای مشاهده هر تصویر در ابعاد بزرگ، روی آن کلیک کنید
              </span>
            </div>

            {/* Category 1: Mobile Game "Poyo Puzzle" — 4 Vertical (9:16) Screenshots Grouped Together */}
            <div className="rounded-3xl bg-[#FAF8F4] dark:bg-[#121616] border border-[#DCD6C8] dark:border-[#27363A] p-5 sm:p-7 lg:p-8 space-y-6 shadow-[0_12px_34px_rgba(30,36,36,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#DCD6C8] dark:border-[#27363A] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#3E777A]/12 dark:bg-[#5DB8BD]/15 text-[#2E5A5C] dark:text-[#78CCD0] text-[11px] font-bold">
                      دسته اول · گیم موبایلی
                    </span>
                    <span
                      dir="ltr"
                      className="text-[11px] font-mono font-semibold text-[#777A76] dark:text-[#889290]"
                    >
                      POYO PUZZLE · MOBILE GAME
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-[#1E2424] dark:text-[#E8F1F2]">
                    بازی موبایلی «پازل پویو»
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-[#434846] dark:text-[#A8B2B0] md:max-w-md leading-relaxed">
                  طراحی‌شده برای پلتفرم موبایل با محوریت سرعت عمل، تطبیق تاس‌ها و انتخاب کارت درست از میان شخصیت‌های دنیای پویو در زمان محدود.
                </p>
              </div>

              {/* 4 Vertical Mobile Screenshots Side-by-Side */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
                {galleryItems
                  .filter((item) => item.id.startsWith('game-mobile-'))
                  .map((screen, idx) => (
                    <article
                      key={screen.id}
                      onClick={() => setSelectedItem(screen)}
                      className="group cursor-pointer rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#DCD6C8] dark:border-[#2E3636] hover:border-[#3E777A] dark:hover:border-[#5DB8BD] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,36,36,0.08)] flex flex-col justify-start"
                    >
                      <div className="relative w-full bg-transparent overflow-hidden border-b border-[#DCD6C8] dark:border-[#2E3636]">
                        <img
                          src={screen.imageUrl}
                          alt={screen.title}
                          referrerPolicy="no-referrer"
                          loading="eager"
                          decoding="sync"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (
                              screen.fallbackImageUrl &&
                              target.src !== screen.fallbackImageUrl
                            ) {
                              target.src = screen.fallbackImageUrl;
                            }
                          }}
                          className="w-full h-auto block transition-transform duration-500 group-hover:scale-103"
                        />
                        <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 flex items-center justify-between gap-2">
                        <span className="text-[11px] sm:text-xs font-bold text-[#1E2424] dark:text-[#E8F1F2] group-hover:text-[#3E777A] dark:group-hover:text-[#5DB8BD] transition-colors truncate">
                          {idx === 0
                            ? 'صفحه شروع بازی'
                            : idx === 1
                              ? 'چالش تاس و کارت'
                              : idx === 2
                                ? 'ثبت رکورد پیروزی'
                                : 'واکنش انتخاب اشتباه'}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#3E777A] dark:text-[#5DB8BD] shrink-0 farsi-nums">
                          ۰{idx + 1}
                        </span>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            {/* Category 2: Board Game "Wonderful Day" — 3 Action Cards Side-by-Side + Standee Tokens Showcase */}
            <div className="rounded-3xl bg-[#FAF8F4] dark:bg-[#121616] border border-[#DCD6C8] dark:border-[#27363A] p-5 sm:p-7 lg:p-8 space-y-6 shadow-[0_12px_34px_rgba(30,36,36,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#DCD6C8] dark:border-[#27363A] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#3E777A]/12 dark:bg-[#5DB8BD]/15 text-[#2E5A5C] dark:text-[#78CCD0] text-[11px] font-bold">
                      دسته دوم · گیم برد (بازی رومیزی)
                    </span>
                    <span
                      dir="ltr"
                      className="text-[11px] font-mono font-semibold text-[#777A76] dark:text-[#889290]"
                    >
                      WONDERFUL DAY · BOARD GAME
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-[#1E2424] dark:text-[#E8F1F2]">
                    بازی رومیزی «روز شگفت‌انگیز»
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-[#434846] dark:text-[#A8B2B0] md:max-w-md leading-relaxed">
                  تجربه تعاملی و فیزیکی برای دورهمی‌های خانوادگی؛ ترکیبی از صفحه بازی، کارت‌های اتفاق و شانس و مهره‌های استندی شخصیت‌های فیلم.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 3 Board Game Action Cards Grouped Together (8 Cols) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  {galleryItems
                    .filter((item) => item.id.startsWith('game-board-card-'))
                    .map((card, idx) => (
                      <article
                        key={card.id}
                        onClick={() => setSelectedItem(card)}
                        className="group cursor-pointer rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#DCD6C8] dark:border-[#2E3636] hover:border-[#3E777A] dark:hover:border-[#5DB8BD] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,36,36,0.08)] flex flex-col justify-start"
                      >
                        <div className="relative w-full bg-transparent overflow-hidden border-b border-[#DCD6C8] dark:border-[#2E3636]">
                          <img
                            src={card.imageUrl}
                            alt={card.title}
                            referrerPolicy="no-referrer"
                            loading="eager"
                            decoding="sync"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (
                                card.fallbackImageUrl &&
                                target.src !== card.fallbackImageUrl
                              ) {
                                target.src = card.fallbackImageUrl;
                              }
                            }}
                            className="w-full h-auto block transition-transform duration-500 group-hover:scale-103"
                          />
                          <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="p-3.5 space-y-1 text-right">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-[#1E2424] dark:text-[#E8F1F2] group-hover:text-[#3E777A] dark:group-hover:text-[#5DB8BD] transition-colors">
                              {idx === 0
                                ? 'کارت شانس · تاس مجدد'
                                : idx === 1
                                  ? 'کارت چالش · توقف در آرد'
                                  : 'کارت رقیب · یک دور توقف'}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-[#3E777A] dark:text-[#5DB8BD] shrink-0">
                              CARD 0{idx + 1}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#434846] dark:text-[#A8B2B0] truncate">
                            {card.subtitle}
                          </p>
                        </div>
                      </article>
                    ))}
                </div>

                {/* Board Game Mechanics & Standee Tokens Showcase (4 Cols) */}
                <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#E5E0D4] dark:border-[#2E3636] flex flex-col justify-start space-y-4 transition-colors">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-[#DCD6C8] dark:border-[#2E3636] pb-2.5">
                      <span className="text-xs sm:text-sm font-black text-[#1E2424] dark:text-[#E8F1F2]">
                        اجزا و قوانین بازی رومیزی
                      </span>
                      <span
                        dir="ltr"
                        className="text-[10px] font-mono font-bold text-[#3E777A] dark:text-[#5DB8BD]"
                      >
                        TABLETOP SET
                      </span>
                    </div>

                    <p className="text-xs text-[#434846] dark:text-[#A8B2B0] leading-relaxed">
                      در این بردگیم خانوادگی، بازیکنان با انداختن تاس در مسیر شهری «روز شگفت‌انگیز» حرکت می‌کنند و با کشیدن کارت‌های اتفاق، همان چالش‌های خوش‌شانسی و بدبیاری‌های بامزه فیلم را در کنار خانواده تجربه می‌کنند.
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="flex items-start gap-2 text-xs text-[#1E2424] dark:text-[#D1DDD8]">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#5DB8BD] shrink-0 mt-0.5" />
                        <span>کارت‌های شانس، تله‌های شیرینی‌پزی و رقابت دوستانه</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#1E2424] dark:text-[#D1DDD8]">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#5DB8BD] shrink-0 mt-0.5" />
                        <span>مناسب برای تقویت تعامل کودکان و والدین در فضای فیزیکی</span>
                      </div>
                    </div>
                  </div>

                  {/* Character Standee Tokens Showcase Box (Pouyo & Grandfather Standees) */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F4] dark:bg-[#151A1A] border border-[#DCD6C8] dark:border-[#2A3232] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#DCD6C8]/60 dark:border-[#2E3636] pb-2">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#3E777A]/12 dark:bg-[#5DB8BD]/15 text-[#2E5A5C] dark:text-[#78CCD0] text-[10.5px] font-bold">
                        مهره‌های استندی کاراکترها
                      </span>
                      <span className="text-[10px] text-[#777A76] dark:text-[#889290]">
                        برای بزرگنمایی کلیک کنید
                      </span>
                    </div>

                    {/* Both Tokens Displayed Side by Side */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Standee 1: Pouyo */}
                      <button
                        type="button"
                        onClick={() => {
                          const item = galleryItems.find((i) => i.id === 'game-token-poyo') || {
                            id: 'game-token-poyo',
                            title: 'مهره استندی کاراکتر «پویو» — بازی رومیزی «روز شگفت‌انگیز»',
                            titleEn: 'Poyo Standee Character Token',
                            subtitle: 'مهره اختصاصی شخصیت اصلی برای حرکت روی صفحه بازی',
                            badge: 'مهره استندی بازی',
                            description:
                              'استند اختصاصی و برش‌خورده کاراکتر «پویو» برای حرکت روی خانه‌های نقشه بازی رومیزی «روز شگفت‌انگیز»، طراحی‌شده با جزئیات کامل و کیفیت بالا برای تجربه تعاملی و ملموس کودکان.',
                            imageUrl: '/assets/game-lab/token-2.png',
                            fallbackImageUrl:
                              'https://my.uploadkon.ir/d/7Cr5fPAT3qX0sknuvbSJMZy3EqxhHX/OTQ4MDZ8cGFkZA.png',
                          };
                          setSelectedItem(item);
                        }}
                        className="group text-right cursor-pointer rounded-xl bg-[#F4F0E6] dark:bg-[#1E2424] border border-[#DCD6C8] dark:border-[#2E3636] hover:border-[#3E777A] dark:hover:border-[#5DB8BD] p-2 sm:p-2.5 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <div className="h-24 sm:h-28 w-full flex items-center justify-center p-1">
                          <img
                            src="/assets/game-lab/token-2.png"
                            alt="مهره استندی کاراکتر پویو"
                            referrerPolicy="no-referrer"
                            loading="eager"
                            decoding="sync"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const fallback =
                                'https://my.uploadkon.ir/d/7Cr5fPAT3qX0sknuvbSJMZy3EqxhHX/OTQ4MDZ8cGFkZA.png';
                              if (target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                            className="max-h-full w-auto object-contain block drop-shadow-xs group-hover:scale-106 transition-transform duration-300"
                          />
                        </div>
                        <div className="w-full text-center pt-1.5 border-t border-[#DCD6C8]/60 dark:border-[#2E3636]">
                          <span className="text-xs font-black text-[#1E2424] dark:text-[#E8F1F2] group-hover:text-[#3E777A] dark:group-hover:text-[#5DB8BD] transition-colors block">
                            مهره «پویو»
                          </span>
                          <span className="text-[10px] text-[#777A76] dark:text-[#889290] block">
                            شخصیت اصلی
                          </span>
                        </div>
                      </button>

                      {/* Standee 2: Grandfather */}
                      <button
                        type="button"
                        onClick={() => {
                          const item = galleryItems.find(
                            (i) => i.id === 'game-token-grandfather'
                          ) || {
                            id: 'game-token-grandfather',
                            title:
                              'مهره استندی کاراکتر «پدربزرگ» — بازی رومیزی «روز شگفت‌انگیز»',
                            titleEn: 'Grandfather Standee Character Token',
                            subtitle:
                              'مهره اختصاصی شخصیت پدربزرگ با جزئیات دقیق و عینک نمادین',
                            badge: 'مهره استندی بازی',
                            description:
                              'استند کاراکتر «پدربزرگ» به عنوان یکی از مهره‌های اصلی بازیکنان در بردگیم «روز شگفت‌انگیز»، مکمل مهره پویو در مسیر رقابت‌های پرهیجان و دورهمی‌های خانوادگی.',
                            imageUrl: '/assets/game-lab/token-grandfather.png',
                            fallbackImageUrl:
                              'https://my.uploadkon.ir/d/LcoX3RvbvVul093yF7Vio4NSAJaPsg/OTQ4MDV8cGFkZA.png',
                          };
                          setSelectedItem(item);
                        }}
                        className="group text-right cursor-pointer rounded-xl bg-[#F4F0E6] dark:bg-[#1E2424] border border-[#DCD6C8] dark:border-[#2E3636] hover:border-[#3E777A] dark:hover:border-[#5DB8BD] p-2 sm:p-2.5 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <div className="h-24 sm:h-28 w-full flex items-center justify-center p-1">
                          <img
                            src="/assets/game-lab/token-grandfather.png"
                            alt="مهره استندی کاراکتر پدربزرگ"
                            referrerPolicy="no-referrer"
                            loading="eager"
                            decoding="sync"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const fallback =
                                'https://my.uploadkon.ir/d/LcoX3RvbvVul093yF7Vio4NSAJaPsg/OTQ4MDV8cGFkZA.png';
                              if (target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                            className="max-h-full w-auto object-contain block drop-shadow-xs group-hover:scale-106 transition-transform duration-300"
                          />
                        </div>
                        <div className="w-full text-center pt-1.5 border-t border-[#DCD6C8]/60 dark:border-[#2E3636]">
                          <span className="text-xs font-black text-[#1E2424] dark:text-[#E8F1F2] group-hover:text-[#3E777A] dark:group-hover:text-[#5DB8BD] transition-colors block">
                            مهره «پدربزرگ»
                          </span>
                          <span className="text-[10px] text-[#777A76] dark:text-[#889290] block">
                            شخصیت مکمل
                          </span>
                        </div>
                      </button>
                    </div>

                    <p className="text-[11px] text-[#434846] dark:text-[#A8B2B0] leading-snug text-center">
                      مهره‌های ایستاده فیزیکی شخصیت‌های فیلم با پایه رومیزی برای هدایت مسیر بازی
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: PC Game "Poyo Adventure" — Widescreen 16:9 Gameplay Showcase */}
            {(() => {
              const pcItem = galleryItems.find((item) => item.id === 'game-pc-adventure');
              if (!pcItem) return null;
              return (
                <div className="rounded-3xl bg-[#FAF8F4] dark:bg-[#121616] border border-[#DCD6C8] dark:border-[#27363A] p-5 sm:p-7 lg:p-8 space-y-6 shadow-[0_12px_34px_rgba(30,36,36,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#DCD6C8] dark:border-[#27363A] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#3E777A]/12 dark:bg-[#5DB8BD]/15 text-[#2E5A5C] dark:text-[#78CCD0] text-[11px] font-bold">
                          دسته سوم · بازی رایانه‌ای (PC)
                        </span>
                        <span
                          dir="ltr"
                          className="text-[11px] font-mono font-semibold text-[#777A76] dark:text-[#889290]"
                        >
                          POYO ADVENTURE · PC 3D GAME
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-[#1E2424] dark:text-[#E8F1F2]">
                        بازی PC «ماجراجویی پویو»
                      </h3>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#434846] dark:text-[#A8B2B0] md:max-w-md leading-relaxed">
                      تجربه گیم‌پلی سه‌بعدی در خیابان‌های شهر؛ همراهی مستقیم کودک با کاراکتر پویو در مسیرهای شهری و جمع‌آوری امتیازها.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Widescreen 16:9 PC Screenshot (8 Cols) */}
                    <div
                      onClick={() => setSelectedItem(pcItem)}
                      className="lg:col-span-8 group cursor-pointer relative rounded-2xl overflow-hidden border border-[#DCD6C8] dark:border-[#2E3636] hover:border-[#3E777A] dark:hover:border-[#5DB8BD] bg-transparent shadow-[0_10px_28px_rgba(30,36,36,0.08)]"
                    >
                      <img
                        src={pcItem.imageUrl}
                        alt={pcItem.title}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="sync"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (
                            pcItem.fallbackImageUrl &&
                            target.src !== pcItem.fallbackImageUrl
                          ) {
                            target.src = pcItem.fallbackImageUrl;
                          }
                        }}
                        className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-103"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* PC Game Highlights & Specs Column (4 Cols) */}
                    <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1A2020]/80 border border-[#E5E0D4] dark:border-[#2E3636] flex flex-col justify-start space-y-4 transition-colors">
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[#DCD6C8] dark:border-[#2E3636] pb-2.5">
                          <span className="text-xs sm:text-sm font-black text-[#1E2424] dark:text-[#E8F1F2]">
                            ویژگی‌های نسخه رایانه‌ای
                          </span>
                          <span
                            dir="ltr"
                            className="text-[10px] font-mono font-bold text-[#3E777A] dark:text-[#5DB8BD]"
                          >
                            3D ACTION & RUNNER
                          </span>
                        </div>

                        <p className="text-xs text-[#434846] dark:text-[#A8B2B0] leading-relaxed">
                          در نسخه PC «ماجراجویی پویو»، معماری شهری، نورپردازی گرم و فضاسازی فانتزی انیمیشن سینمایی «روز شگفت‌انگیز» به یک محیط سه‌بعدی قابل کاوش تبدیل شده است تا کودک بتواند در خیابان‌های شهر دوچرخه‌سواری کند و ماموریت‌های بازی را پشت سر بگذارد.
                        </p>

                        <div className="space-y-2.5 pt-1">
                          <div className="flex items-start gap-2 text-xs text-[#1E2424] dark:text-[#D1DDD8]">
                            <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#5DB8BD] shrink-0 mt-0.5" />
                            <span>طراحی محیط سه‌بعدی منطبق بر جهان بصری فیلم سینمایی</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-[#1E2424] dark:text-[#D1DDD8]">
                            <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#5DB8BD] shrink-0 mt-0.5" />
                            <span>مکانیک دوچرخه‌سواری، مسیریابی با نقشه (Minimap) و جمع‌آوری کاپ‌کیک‌ها</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-[#1E2424] dark:text-[#D1DDD8]">
                            <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#5DB8BD] shrink-0 mt-0.5" />
                            <span>رابط کاربری (HUD) ساده و خوانا متناسب با گروه سنی کودک و نوجوان</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#DCD6C8] dark:border-[#2E3636] flex items-center justify-between text-[11px] text-[#777A76] dark:text-[#889290]">
                        <span className="font-bold text-[#1E2424] dark:text-[#E8F1F2]">پلتفرم هدف:</span>
                        <span className="font-semibold text-[#3E777A] dark:text-[#5DB8BD]">رایانه‌های شخصی (PC)</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        ) : domain.id === 'web3-nft' ? (
          <section className="space-y-14 border-t border-[#DCD6C8] dark:border-[#27363A] pt-14 text-right">
            {/* 1. Lumindy Smart Project Management Platform Showcase */}
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] dark:border-[#27363A] p-5 sm:p-7 lg:p-8 space-y-8 shadow-[0_12px_34px_rgba(30,36,36,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD6C8] dark:border-[#27363A] pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#3E777A]/12 text-[#2E5A5C] dark:text-[#65B7B5] text-[11px] font-bold">
                      پلتفرم نرم‌افزاری اختصاصی
                    </span>
                    <span
                      dir="ltr"
                      className="text-[11px] font-mono font-semibold text-[#777A76] dark:text-[#8C9997]"
                    >
                      LUMINDY · SMART WORKFLOW & PROJECT MANAGEMENT
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-[#1E2424] dark:text-[#F2EFE9]">
                    لوماندی | مدیریت هوشمند پروژه‌ها، از برنامه‌ریزی تا اجرا
                  </h2>
                </div>

                <span className="text-xs font-semibold text-[#777A76] dark:text-[#8C9997]">
                  برای مشاهده هر تصویر در ابعاد بزرگ، روی آن کلیک کنید
                </span>
              </div>

              {/* Exact Lumindy Platform Descriptive Narrative */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1B2629] border border-[#E5E0D4] dark:border-[#202D31] space-y-4 transition-colors">
                <p className="text-xs sm:text-[14px] text-[#1E2424] dark:text-[#F2EFE9] leading-[2.1] text-justify font-medium">
                  لوماندی (Lumindy) یک پلتفرم هوشمند و یکپارچه مدیریت پروژه است که با هدف ساده‌سازی فرآیندها، افزایش بهره‌وری و ایجاد هماهنگی میان اعضای تیم طراحی شده است. در لوماندی، سازمان‌ها می‌توانند گردش کار (Workflow) اختصاصی شرکت و پروژه‌های خود را تعریف کرده، اعضای تیم، نقش‌ها و مسئولیت‌های هر فرد را مشخص کنند. با آغاز پروژه، وظایف به‌صورت خودکار و بر اساس گردش کار تعریف‌شده به افراد مربوطه ارجاع داده می‌شوند و پس از تکمیل هر وظیفه، فرآیند بررسی و تأیید آن توسط سرپرست مربوطه انجام می‌گیرد. این چرخه هوشمند تا پایان پروژه به‌صورت منظم ادامه می‌یابد. همچنین مدیران پروژه می‌توانند با استفاده از نمودار گانت (Gantt Chart)، زمان‌بندی فعالیت‌ها را مدیریت کرده و از طریق گزارش‌ها و نماهای متنوع، وضعیت پیشرفت پروژه را به‌صورت شفاف و دقیق پایش کنند. لوماندی، راهکاری برای مدیریت ساختاریافته، هوشمند و بدون وقفه پروژه‌هاست.
                </p>

                {/* 4 Feature Architecture Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#2A393D] dark:hover:border-[#65B7B5]/40 dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span dir="ltr" className="text-xs font-mono font-black text-[#3E777A] dark:text-[#65B7B5]">
                        01
                      </span>
                      <span dir="ltr" className="text-[9px] font-mono uppercase text-[#777A76] dark:text-[#8C9997]">
                        WORKFLOW
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black text-[#1E2424] dark:text-[#F2EFE9]">
                      گردش‌کار اختصاصی
                    </h4>
                    <p className="text-[11px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                      طراحی بصری نمودار فرآیندها و تعیین نقش‌ها و دسترسی‌های هر فرد در سازمان
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#2A393D] dark:hover:border-[#65B7B5]/40 dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span dir="ltr" className="text-xs font-mono font-black text-[#3E777A] dark:text-[#65B7B5]">
                        02
                      </span>
                      <span dir="ltr" className="text-[9px] font-mono uppercase text-[#777A76] dark:text-[#8C9997]">
                        AUTO ROUTING
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black text-[#1E2424] dark:text-[#F2EFE9]">
                      چرخه ارجاع و تأیید
                    </h4>
                    <p className="text-[11px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                      ارجاع خودکار وظایف و ارسال خروجی‌ها به سرپرست مربوطه جهت بررسی نهایی
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#2A393D] dark:hover:border-[#65B7B5]/40 dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span dir="ltr" className="text-xs font-mono font-black text-[#3E777A] dark:text-[#65B7B5]">
                        03
                      </span>
                      <span dir="ltr" className="text-[9px] font-mono uppercase text-[#777A76] dark:text-[#8C9997]">
                        GANTT CHART
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black text-[#1E2424] dark:text-[#F2EFE9]">
                      نمودار گانت و زمان‌بندی
                    </h4>
                    <p className="text-[11px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                      مدیریت زمان‌بندی فعالیت‌ها، پیش‌بینی گلوگاه‌ها و جلوگیری از وقفه در پروژه
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#2A393D] dark:hover:border-[#65B7B5]/40 dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span dir="ltr" className="text-xs font-mono font-black text-[#3E777A] dark:text-[#65B7B5]">
                        04
                      </span>
                      <span dir="ltr" className="text-[9px] font-mono uppercase text-[#777A76] dark:text-[#8C9997]">
                        MONITORING
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black text-[#1E2424] dark:text-[#F2EFE9]">
                      پایش شفاف و نماهای متنوع
                    </h4>
                    <p className="text-[11px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                      رصد پیشرفت، نمودارهای بازدهی و داشبورد یکپارچه برای تصمیم‌گیری دقیق
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Multi-Screenshot Gallery for Lumindy */}
              {(() => {
                const lumindyScreens = [
                  {
                    id: 'lumindy-screen-1',
                    title: 'پروژه لوماندی | اکوسیستم یکپارچه ابزارها و داشبورد چندگانه',
                    titleEn: 'Lumindy Ecosystem · Multi-Device Suite',
                    subtitle: 'Unified Workflow, Dynamic Task Delegation & Gantt Monitoring',
                    badge: 'نمای جامع ابزارها · ۱ از ۴',
                    description:
                      'نمایش همزمان ابزارهای کلیدی لوماندی: طراحی گردش‌کار (Workflow)، فرم مدیریت هوشمند وظایف، نمودار گانت زمان‌بندی و مانیتورینگ نرخ پیشرفت.',
                    imageUrl: '/assets/lumindy-1.webp',
                    fallbackImageUrl:
                      'https://my.uploadkon.ir/d/I3YepF58zLAZt9pfWot3Xg8DCQOnbd/OTUxNzF8cGFkZA.webp',
                  },
                  {
                    id: 'lumindy-screen-2',
                    title: 'موتور طراحی گردش‌کار اختصاصی (Workflow Designer)',
                    titleEn: 'Workflow Engine · Node Pipeline Graph',
                    subtitle: 'Visual Node Graph for Studio Pipelines',
                    badge: 'طراحی گردش‌کار · ۲ از ۴',
                    description:
                      'طراحی گرافیکی جریان کار (Workflow) اختصاصی برای هر شرکت و پروژه با قابلیت پیوند مراحل کانسپت، استوری‌بورد، انیمیت و کامپوزیت.',
                    imageUrl: '/assets/lumindy-3.webp',
                    fallbackImageUrl:
                      'https://my.uploadkon.ir/d/fSafEP9Ptd5hgnCxowZtFZK19IJc8u/OTUxNjl8cGFkZA.webp',
                  },
                  {
                    id: 'lumindy-screen-3',
                    title: 'فرم وظایف، شرح کارگردان و چرخه تأیید (Send for Review)',
                    titleEn: 'Task Delegation & Supervisor Review Loop',
                    subtitle: 'Automated Routing & Quality Sign-Off',
                    badge: 'مدیریت وظایف · ۳ از ۴',
                    description:
                      'ارجاع خودکار تسک‌ها بر اساس گردش‌کار تعریف‌شده، همراه با دریافت دستورالعمل کارگردان (Director’s Description)، آپلود فایل و ارسال برای بازبینی سرپرست.',
                    imageUrl: '/assets/lumindy-2.webp',
                    fallbackImageUrl:
                      'https://my.uploadkon.ir/d/nS6vhmxLTbf9FLN6wUZWgo5zUlkIY1/OTUxNzB8cGFkZA.webp',
                  },
                  {
                    id: 'lumindy-screen-4',
                    title: 'نمودار گانت، ماتریس وضعیت شات‌ها و تحلیل روند پیشرفت',
                    titleEn: 'Gantt Chart & Shot Status Analytics',
                    subtitle: 'Timeline Scheduling & Multi-View Status Matrix',
                    badge: 'گانت و مانیتورینگ · ۴ از ۴',
                    description:
                      'مدیریت خط زمانی پروژه‌ها با نمودار گانت (Gantt Chart)، ماتریس وضعیت سکانس‌ها و پایش لحظه‌ای درصد تکمیل فعالیت‌های اعضای تیم.',
                    imageUrl: '/assets/lumindy-4.webp',
                    fallbackImageUrl:
                      'https://my.uploadkon.ir/d/8zh0Q2YW6NNrNdAVOxGX6NBZXcgleF/OTUxNjh8cGFkZA.webp',
                  },
                ];

                const currentScreen =
                  lumindyScreens[activeLumindyIndex] || lumindyScreens[0];

                return (
                  <div className="space-y-5">
                    {/* Primary Interactive Hero Screen */}
                    <div
                      onClick={() => setSelectedItem(currentScreen)}
                      className="group cursor-pointer relative w-full rounded-2xl overflow-hidden border border-[#DCD6C8] hover:border-[#3E777A] dark:border-[#27363A] dark:hover:border-[#65B7B5] bg-[#121616] shadow-[0_12px_32px_rgba(30,36,36,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
                    >
                      <img
                        src={currentScreen.imageUrl}
                        alt={currentScreen.title}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="sync"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (
                            currentScreen.fallbackImageUrl &&
                            target.src !== currentScreen.fallbackImageUrl
                          ) {
                            target.src = currentScreen.fallbackImageUrl;
                          }
                        }}
                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-102"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Active Screen Caption Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1B2629] border border-[#E5E0D4] dark:border-[#202D31] space-y-1.5 text-right transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#3E777A]/12 text-[#2E5A5C] dark:text-[#65B7B5] text-[11px] font-bold">
                          {currentScreen.badge}
                        </span>
                        <span
                          dir="ltr"
                          className="text-[11px] font-mono text-[#777A76] dark:text-[#8C9997] tracking-wide"
                        >
                          {currentScreen.titleEn}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-base font-black text-[#1E2424] dark:text-[#F2EFE9]">
                        {currentScreen.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                        {currentScreen.description}
                      </p>
                    </div>

                    {/* 4 Interactive Thumbnail Cards to Switch */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {lumindyScreens.map((screen, idx) => {
                        const isSelected = activeLumindyIndex === idx;
                        return (
                          <div
                            key={screen.id}
                            onClick={() => setActiveLumindyIndex(idx)}
                            className={`cursor-pointer rounded-2xl p-2.5 transition-all duration-300 border flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#FAF8F4] border-[#3E777A] shadow-md ring-2 ring-[#3E777A]/20 dark:bg-[#151E20] dark:border-[#65B7B5] dark:ring-2 dark:ring-[#65B7B5]/40 dark:shadow-[0_0_20px_rgba(101,183,181,0.22)]'
                                : 'bg-[#F4F0E6]/60 border-[#DCD6C8] hover:border-[#3E777A]/60 hover:bg-[#FAF8F4] dark:bg-[#151E20]/60 dark:border-[#27363A] dark:hover:border-[#65B7B5]/50 dark:hover:bg-[#151E20]'
                            }`}
                          >
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#121616] mb-2 border border-[#DCD6C8]/60 dark:border-[#27363A]">
                              <img
                                src={screen.imageUrl}
                                alt={screen.title}
                                referrerPolicy="no-referrer"
                                loading="eager"
                                decoding="sync"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  if (
                                    screen.fallbackImageUrl &&
                                    target.src !== screen.fallbackImageUrl
                                  ) {
                                    target.src = screen.fallbackImageUrl;
                                  }
                                }}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="text-right space-y-0.5">
                              <span className="text-[10px] font-mono font-bold text-[#3E777A] dark:text-[#65B7B5] block">
                                نمای ۰{idx + 1}
                              </span>
                              <h4 className="text-[11px] sm:text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] truncate">
                                {idx === 0
                                  ? 'اکوسیستم جامع لوماندی'
                                  : idx === 1
                                    ? 'موتور طراحی گردش‌کار'
                                    : idx === 2
                                      ? 'مدیریت و چرخه تأیید وظایف'
                                      : 'نمودار گانت و مانیتورینگ'}
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 2. Web3, NFT & Character Universe Digital Merchandising */}
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] dark:border-[#27363A] p-5 sm:p-7 lg:p-8 space-y-8 shadow-[0_12px_34px_rgba(30,36,36,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD6C8] dark:border-[#27363A] pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#3E777A]/12 text-[#2E5A5C] dark:text-[#65B7B5] text-[11px] font-bold">
                      دارایی‌های فکری و بازارپردازی دیجیتال
                    </span>
                    <span
                      dir="ltr"
                      className="text-[11px] font-mono font-semibold text-[#777A76] dark:text-[#8C9997]"
                    >
                      WEB3 & NFT DIGITAL MERCHANDISING
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-[#1E2424] dark:text-[#F2EFE9]">
                    وب۳، دارایی‌های دیجیتال و افق‌های نوین بازارپردازی
                  </h2>
                </div>

                <span className="text-xs font-semibold text-[#777A76] dark:text-[#8C9997]">
                  مجموعه‌های کلکسیونی مبتنی بر کاراکترها و جهان‌های داستانی
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Visual NFT Collectible Showcase (7 Cols) */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      id: 'web3-nft-merchandise-modal',
                      title: 'مجموعه‌های کلکسیونی NFT و بازارپردازی دیجیتال جهان پویو',
                      titleEn: 'Web3 & NFT Character Collectibles',
                      subtitle: 'Digital Provenance & Extended Fan Engagement',
                      badge: 'کالکشن‌های دیجیتال NFT',
                      description:
                        'وب۳ نسل جدیدی از اینترنت است که بر بستر فناوری بلاکچین، تعامل مستقیم‌تر کاربران و مالکیت دارایی‌های دیجیتال را امکان‌پذیر می‌کند. NFT نیز نوعی دارایی دیجیتال منحصربه‌فرد است که اصالت و مالکیت آن روی بلاکچین ثبت می‌شود. این فناوری‌ها ظرفیت تازه‌ای برای توسعه بازارپردازی دیجیتال فراهم می‌کنند؛ از طراحی مجموعه‌های کلکسیونی و دارایی‌های دیجیتال مبتنی بر شخصیت‌ها و جهان‌های داستانی گرفته تا ایجاد تجربه‌های جدید برای مخاطبان و طرفداران آثار.',
                      imageUrl: '/assets/web3-nft-cover.webp',
                      fallbackImageUrl:
                        'https://my.uploadkon.ir/d/D5zfgGnIPLtg5Fowg9wZUMCXbiq8nL/OTUxNjV8cGFkZA.webp',
                    })
                  }
                  className="lg:col-span-7 group cursor-pointer relative rounded-2xl overflow-hidden border border-[#DCD6C8] hover:border-[#3E777A] dark:border-[#27363A] dark:hover:border-[#65B7B5] bg-[#121616] shadow-[0_12px_32px_rgba(30,36,36,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all"
                >
                  <img
                    src="/assets/web3-nft-cover.webp"
                    alt="کالکشن NFT و دارایی‌های کلکسیونی دیجیتال پویو"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="sync"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback =
                        'https://my.uploadkon.ir/d/D5zfgGnIPLtg5Fowg9wZUMCXbiq8nL/OTUxNjV8cGFkZA.webp';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  {/* Floating Token & Trait Badge */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[#FAF8F4]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#65B7B5] animate-pulse" />
                      <span className="text-[11px] font-bold">
                        کارت‌های کلکسیونی NFT: جادوگر، فضانورد، دایناسور، عکاس و اسکیت‌برد
                      </span>
                    </div>
                    <span dir="ltr" className="text-[10px] font-mono text-[#DCD6C8] shrink-0">
                      ON-CHAIN ASSETS
                    </span>
                  </div>
                </div>

                {/* Narrative & Strategic Value Column (5 Cols) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#F4F0E6]/70 dark:bg-[#1B2629] border border-[#E5E0D4] dark:border-[#202D31] flex flex-col justify-between space-y-5 text-right transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#DCD6C8] dark:border-[#27363A] pb-3">
                      <span className="text-xs sm:text-sm font-black text-[#3E777A] dark:text-[#65B7B5]">
                        مفهوم و راهبرد بازارپردازی دیجیتال
                      </span>
                      <span
                        dir="ltr"
                        className="text-[10px] font-mono font-bold text-[#777A76] dark:text-[#8C9997] uppercase tracking-wider"
                      >
                        DIGITAL IP EXTENSION
                      </span>
                    </div>

                    {/* Exact User Text for Web3 & NFT */}
                    <div className="space-y-3 text-xs sm:text-[13.5px] text-[#1E2424] dark:text-[#F2EFE9] leading-[2.05] text-justify font-medium">
                      <p>
                        وب۳ نسل جدیدی از اینترنت است که بر بستر فناوری بلاکچین، تعامل مستقیم‌تر کاربران و مالکیت دارایی‌های دیجیتال را امکان‌پذیر می‌کند.
                      </p>
                      <p>
                        NFT نیز نوعی دارایی دیجیتال منحصربه‌فرد است که اصالت و مالکیت آن روی بلاکچین ثبت می‌شود.
                      </p>
                      <p className="text-[#434846] dark:text-[#BCC6C4]">
                        این فناوری‌ها ظرفیت تازه‌ای برای توسعه بازارپردازی دیجیتال فراهم می‌کنند؛ از طراحی مجموعه‌های کلکسیونی و دارایی‌های دیجیتال مبتنی بر شخصیت‌ها و جهان‌های داستانی گرفته تا ایجاد تجربه‌های جدید برای مخاطبان و طرفداران آثار.
                      </p>
                    </div>

                    {/* 3 Strategic Merchandising Pillars */}
                    <div className="pt-2 space-y-2.5">
                      <div className="flex items-start gap-2.5 text-xs text-[#1E2424] dark:text-[#F2EFE9] p-2.5 rounded-xl bg-[#FAF8F4]/80 dark:bg-[#151E20] border border-[#DCD6C8]/70 dark:border-[#2A393D] transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5] shrink-0 mt-0.5" />
                        <span>اصالت و مالکیت اثبات‌پذیر بر بستر شفاف و ایمن بلاکچین</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#1E2424] dark:text-[#F2EFE9] p-2.5 rounded-xl bg-[#FAF8F4]/80 dark:bg-[#151E20] border border-[#DCD6C8]/70 dark:border-[#2A393D] transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5] shrink-0 mt-0.5" />
                        <span>طراحی مجموعه‌های کلکسیونی از کاراکترها و جهان داستانی پویو</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#1E2424] dark:text-[#F2EFE9] p-2.5 rounded-xl bg-[#FAF8F4]/80 dark:bg-[#151E20] border border-[#DCD6C8]/70 dark:border-[#2A393D] transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5] shrink-0 mt-0.5" />
                        <span>خلق تجربه‌های تعاملی و پیوند عاطفی ماندگار با هواداران و مخاطبان</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[#DCD6C8] dark:border-[#27363A] flex flex-wrap items-center justify-between text-[11px] text-[#777A76] dark:text-[#8C9997]">
                    <span className="font-bold text-[#1E2424] dark:text-[#F2EFE9]">حوزه فناوری:</span>
                    <span className="font-semibold text-[#3E777A] dark:text-[#65B7B5]">بلاکچین، NFT و بازارپردازی دیجیتال</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : portfolioBaseItems.length > 0 && (
          <section className="space-y-10 border-t border-[#DCD6C8] pt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block">
                  SELECTED WORKS & ARCHIVE
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
                  className="flex flex-wrap items-center gap-1.5 sm:gap-2"
                >
                  {PORTFOLIO_CATEGORIES.map((cat) => {
                    const count =
                      cat.id === 'All'
                        ? portfolioBaseItems.length
                        : portfolioBaseItems.filter((i) => i.category === cat.id).length;

                    if (count === 0 && cat.id !== 'All') return null;

                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-en font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#3E777A] text-[#FAF8F4] shadow-xs'
                            : 'bg-[#FAF8F4] dark:bg-[#151E20] hover:bg-[#E4DFD3] dark:hover:bg-[#1E2B2E] text-[#434846] dark:text-[#CBD5D5] hover:text-[#1E2424] dark:hover:text-[#F2EFE9] border border-[#DCD6C8] dark:border-[#27363A]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clean, Concise Grid Cards (Unified across Teaser & Video Mapping) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
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
                      className="group cursor-pointer rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] hover:border-[#3E777A] dark:hover:border-[#65B7B5] overflow-hidden transition-all duration-300 hover:shadow-[0_14px_35px_rgba(30,36,36,0.08)] dark:hover:shadow-[0_14px_35px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
                    >
                      {/* Top Window Bar: Category + 3 Dots (Exact 3earstudio structure) */}
                      <div className="px-4 py-2.5 bg-[#F4F0E6] dark:bg-[#1B2629] border-b border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-between">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="w-2 h-2 rounded-full bg-[#1E2424]/20 dark:bg-white/20 group-hover:bg-[#3E777A] transition-colors" />
                          <span className="w-2 h-2 rounded-full bg-[#1E2424]/20 dark:bg-white/20 group-hover:bg-[#65B7B5] transition-colors" />
                          <span className="w-2 h-2 rounded-full bg-[#1E2424]/20 dark:bg-white/20 group-hover:bg-[#D6B16A] transition-colors" />
                        </div>
                        <span className="text-xs font-en font-semibold text-[#434846] dark:text-[#CBD5D5]">
                          {item.category || 'Live Video Mapping'}
                        </span>
                      </div>

                      {/* 16:9 Thumbnail / Preview Stage */}
                      <div className="aspect-video w-full bg-[#121616] relative overflow-hidden">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.titleEn || item.title}
                            referrerPolicy="no-referrer"
                            loading="eager"
                            decoding="sync"
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
                          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#FAF8F4]/90 group-hover:bg-[#3E777A] text-[#1E2424] group-hover:text-[#FAF8F4] keep-light-pill flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Minimal Card Title Bar */}
                      <div className="px-4 sm:px-5 py-3.5 bg-[#FAF8F4] dark:bg-[#151E20] flex items-center justify-between gap-3">
                        <h3
                          dir={item.title === item.titleEn ? 'ltr' : 'rtl'}
                          className="text-sm sm:text-base font-bold text-[#1E2424] dark:text-[#F2EFE9] group-hover:text-[#3E777A] dark:group-hover:text-[#65B7B5] transition-colors truncate"
                        >
                          {item.title}
                        </h3>
                        {item.titleEn && item.titleEn !== item.title && (
                          <span className="text-xs font-en font-semibold text-[#777A76] dark:text-[#96A7A7] shrink-0">
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
                              loading="eager"
                              decoding="sync"
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

            {/* Compact Upcoming IP Strip for Animation Department */}
            {domain.id === 'wonderful-day' && (
              <div className="px-4 sm:px-6 py-4 rounded-2xl bg-[#F4F0E6]/85 border border-[#DCD6C8] flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 text-right">
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs sm:text-sm font-black text-[#1E2424]">
                    آثار و IPهای در دست توسعه:
                  </span>
                  <span
                    dir="ltr"
                    className="text-[10px] font-mono text-[#3E777A] font-semibold uppercase"
                  >
                    UPCOMING IP SLATE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 lg:max-w-3xl">
                  {WONDERFUL_DAY_CATALOG.upcomingProjects.map((up, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="text-xs sm:text-sm font-black text-[#1E2424] truncate">
                          {up.titleFa}
                        </h4>
                        <span
                          dir="ltr"
                          className="font-en text-[11px] text-[#777A76] font-semibold shrink-0"
                        >
                          {up.titleEn}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#3E777A] shrink-0">
                        {up.badge}
                      </span>
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
                        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-16">
                          {group.heads.map((head) => (
                            <div
                              key={`${group.id}-head-${head.id}`}
                              onClick={() => onSelectMember(head)}
                              className="group cursor-pointer flex flex-col items-center text-center"
                            >
                              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#3E777A] group-hover:border-[#65B7B5] mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#FAF8F4] shadow-xs relative shrink-0">
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
                                      if (
                                        head.fallbackImageUrl &&
                                        target.src !== head.fallbackImageUrl
                                      ) {
                                        target.src = head.fallbackImageUrl;
                                        return;
                                      }
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

                              <h4 className="text-sm sm:text-lg font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
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
                          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14">
                            {group.members.map((member) => (
                              <div
                                key={`${group.id}-member-${member.id}`}
                                onClick={() => onSelectMember(member)}
                                className="group cursor-pointer flex flex-col items-center text-center"
                              >
                                <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full border-2 border-[#DCD6C8] group-hover:border-[#3E777A] mb-2.5 sm:mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#FAF8F4] shadow-xs relative shrink-0">
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
                                        if (
                                          member.fallbackImageUrl &&
                                          target.src !== member.fallbackImageUrl
                                        ) {
                                          target.src = member.fallbackImageUrl;
                                          return;
                                        }
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

                                <h4 className="text-xs sm:text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
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

                // Case B: Standard Group (e.g., Commercial-CGI, Game-Lab, Web3, VFX)
                return (
                  <div key={group.id} className="space-y-7">
                    {!group.isHead && (
                      <div className="flex items-center justify-center gap-4">
                        <span className="h-px w-12 sm:w-20 bg-[#DCD6C8]" />
                        <span className="text-xs sm:text-sm font-bold text-[#434846]">
                          {group.title}
                        </span>
                        <span className="h-px w-12 sm:w-20 bg-[#DCD6C8]" />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-16">
                      {group.members.map((member) => (
                        <div
                          key={`${group.id}-${member.id}`}
                          onClick={() => onSelectMember(member)}
                          className="group cursor-pointer flex flex-col items-center text-center"
                        >
                          <div
                            className={`${
                              group.isHead ? 'w-24 h-24 sm:w-32 sm:h-32' : 'w-20 h-20 sm:w-26 sm:h-26'
                            } rounded-full border-2 ${
                              group.isHead
                                ? 'border-[#3E777A] group-hover:border-[#65B7B5]'
                                : 'border-[#DCD6C8] group-hover:border-[#3E777A]'
                            } mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#FAF8F4] shadow-xs relative shrink-0`}
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
                                  if (
                                    member.fallbackImageUrl &&
                                    target.src !== member.fallbackImageUrl
                                  ) {
                                    target.src = member.fallbackImageUrl;
                                    return;
                                  }
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
                              group.isHead ? 'text-sm sm:text-lg font-black' : 'text-xs sm:text-base font-bold'
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
      {selectedItem && (() => {
        const isCompactModal =
          selectedItem.aspectRatio === '9:16' || selectedItem.aspectRatio === '1:1';
        return (
          <div
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/80 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-5 overscroll-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${
                selectedItem.aspectRatio === '9:16'
                  ? 'max-w-[min(92vw,360px)] sm:max-w-[min(390px,45dvh)]'
                  : selectedItem.aspectRatio === '1:1'
                    ? 'max-w-[min(92vw,440px)] sm:max-w-[min(460px,56dvh)]'
                    : 'max-w-4xl'
              } bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[92dvh]`}
            >
              {/* Modal Header */}
              <div
                className={`flex items-center justify-between ${
                  isCompactModal ? 'px-4 py-3' : 'px-4 sm:px-6 py-3.5 sm:py-4'
                } bg-[#F4F0E6] dark:bg-[#1B2629] border-b border-[#DCD6C8] dark:border-[#27363A] shrink-0 gap-2`}
              >
                <div className="flex flex-wrap items-center gap-2 text-right min-w-0">
                  {selectedItem.category && (
                    <span className="px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#3E777A] text-[#FAF8F4] text-[11px] sm:text-xs font-en font-semibold shrink-0">
                      {selectedItem.category}
                    </span>
                  )}
                  {selectedItem.badge && (
                    <span className="text-[11px] sm:text-xs font-bold text-[#3E777A] dark:text-[#65B7B5] truncate">
                      {selectedItem.badge}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 sm:p-2 rounded-full bg-[#EDE9DF] dark:bg-[#243337] hover:bg-[#3E777A] dark:hover:bg-[#3E777A] text-[#1E2424] dark:text-[#F2EFE9] hover:text-[#FAF8F4] transition-colors cursor-pointer shrink-0"
                  aria-label="بستن"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div ref={modalScrollRef} className="overflow-y-auto flex-1 overscroll-contain">
                {/* Embedded Player or Image Matched to Native Aspect Ratio (Zero Extra Margins) */}
                <div
                  className={`w-full bg-black flex items-center justify-center overflow-hidden border-b border-[#DCD6C8] dark:border-[#27363A] shrink-0 ${
                    selectedItem.embedUrl || selectedItem.videoUrl || selectedItem.canvasType
                      ? selectedItem.aspectRatio === '9:16'
                        ? 'aspect-[9/16]'
                        : selectedItem.aspectRatio === '1:1'
                          ? 'aspect-square'
                          : 'aspect-video'
                      : ''
                  }`}
                >
                  {selectedItem.embedUrl ? (
                    <iframe
                      src={selectedItem.embedUrl}
                      title={selectedItem.title}
                      className="w-full h-full border-0 block"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : selectedItem.videoUrl ? (
                    <video
                      src={selectedItem.videoUrl}
                      poster={selectedItem.imageUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover block"
                    />
                  ) : selectedItem.imageUrl ? (
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="sync"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (
                          selectedItem.fallbackImageUrl &&
                          target.src !== selectedItem.fallbackImageUrl
                        ) {
                          target.src = selectedItem.fallbackImageUrl;
                        }
                      }}
                      className={
                        selectedItem.id.startsWith('game-mobile-') ||
                        selectedItem.id.startsWith('game-board-card-') ||
                        selectedItem.id.startsWith('game-token-')
                          ? 'max-h-[65vh] w-auto mx-auto block object-contain py-4 drop-shadow-md'
                          : 'w-full h-auto block'
                      }
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
                <div
                  className={`${
                    isCompactModal ? 'p-4 sm:p-5 space-y-3' : 'p-5 sm:p-8 space-y-4'
                  } text-right bg-[#FAF8F4] dark:bg-[#151E20]`}
                >
                  <div
                    className={`flex ${
                      isCompactModal
                        ? 'flex-col items-start gap-2.5'
                        : 'flex-col sm:flex-row sm:items-center justify-between gap-3'
                    } border-b border-[#E5E0D4] dark:border-[#27363A] pb-3.5`}
                  >
                    <div className={isCompactModal ? 'w-full' : 'min-w-0 flex-1'}>
                      <h3
                        dir={selectedItem.title === selectedItem.titleEn ? 'ltr' : 'rtl'}
                        className={`${
                          isCompactModal ? 'text-sm sm:text-base' : 'text-base sm:text-xl'
                        } font-black text-[#1E2424] dark:text-[#F2EFE9] leading-snug`}
                      >
                        {selectedItem.title}
                      </h3>
                      <span className="text-[11px] sm:text-xs font-en text-[#777A76] dark:text-[#96A7A7] block mt-0.5">
                        {selectedItem.subtitle}
                      </span>
                    </div>

                    {selectedItem.externalUrl && (
                      <a
                        href={selectedItem.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isCompactModal ? 'self-start' : 'self-start sm:self-auto'
                        } px-3.5 py-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1E2B2E] hover:bg-[#3E777A] dark:hover:bg-[#3E777A] text-[#1E2424] dark:text-[#F2EFE9] hover:text-[#FAF8F4] text-xs font-bold flex items-center gap-2 transition-colors shrink-0 border border-transparent dark:border-[#2C3E42]`}
                      >
                        <span>مشاهده در پلتفرم اصلی</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-[#3E777A] dark:text-[#65B7B5] block">
                      درباره این اثر:
                    </span>
                    <p className="text-xs sm:text-sm text-[#434846] dark:text-[#CBD5D5] leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
