import React, { useState } from 'react';
import { User, ArrowLeft } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../data/studioData';

// Preload all team member portraits once at module load time and retain references so GC never evicts them
const TEAM_GALLERY_PRELOAD: HTMLImageElement[] = [];
if (typeof window !== 'undefined') {
  TEAM_MEMBERS.forEach((member) => {
    if (member.imageUrl) {
      const img = new Image();
      img.decoding = 'sync';
      img.src = member.imageUrl;
      img.decode?.().catch(() => {});
      TEAM_GALLERY_PRELOAD.push(img);
    }
  });
}

const SHORT_ROLE_BY_ID: Record<string, string> = {
  'lotfallah-salehi': 'سوپروایزر پایپلاین ویدیو',
  'ali-alipour': 'دستیار کارگردان انیمیشن',
  'negar-baratzadeh': 'طراح ارشد کانسپت',
  'hilda-baghban': 'آرتیست پردازش تصویر',
  'khorshid-khooban': 'مدیر تولید تیزر و آهنگساز',
  'hanieh-samipoor': 'تدوینگر ارشد و طراح صدا',
  'nima-nekookar': 'مدیر دپارتمان وب۳ و NFT',
  'ali-ebrahimi': 'طراح ارشد کالکشن وب۳',
};

const DEPARTMENT_TABS = [
  { id: 'all', label: 'همه اعضا' },
  { id: 'animation', label: 'انیمیشن و توسعه IP' },
  { id: 'commercial', label: 'تبلیغات و CGI' },
  { id: 'web3', label: 'وب۳ و NFT' },
];

interface TeamGalleryProps {
  onSelectMember: (member: TeamMember) => void;
}

export const TeamGallery: React.FC<TeamGalleryProps> = ({ onSelectMember }) => {
  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const coFounders = TEAM_MEMBERS.filter((m) => m.isCoFounder);
  const ensembleMembers = TEAM_MEMBERS.filter((m) => !m.isCoFounder && !m.hideFromHome).slice(0, 8);

  const filteredMembers =
    activeDepartment === 'all'
      ? ensembleMembers
      : ensembleMembers.filter((m) => m.department === activeDepartment);

  return (
    <section id="team" className="py-14 sm:py-18 border-t border-[#DCD6C8] relative scroll-mt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-14">
        {/* Part 1: Dedicated 3 Co-Founders & Management Team Section (Full Cards) */}
        <div className="space-y-6 sm:space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD6C8] pb-5">
            <div className="space-y-1.5 text-right">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3E777A]">
                <span>مدیریت و کارگردانی</span>
                <span aria-hidden="true" className="text-[#777A76]">·</span>
                <span
                  dir="ltr"
                  className="font-mono text-[11px] uppercase tracking-widest text-[#777A76]"
                >
                  CO-FOUNDERS & MANAGEMENT
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424]">
                هم‌بنیانگذاران استودیو آرتا ماد هنر
              </h2>
            </div>
            <span className="text-xs text-[#777A76] text-right">
              تلاقی کارگردانی سینما و انیمیشن با معماری پایپلاین‌های هوش مصنوعی و جلوه‌های بصری
            </span>
          </div>

          {/* 3 Co-Founders Full Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 items-stretch">
            {coFounders.map((founder) => (
              <div
                key={founder.id}
                onClick={() => onSelectMember(founder)}
                className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] p-5 sm:p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-[0_16px_40px_rgba(30,36,36,0.08)] hover:-translate-y-1"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Portrait Avatar */}
                  <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full border-2 border-[#DCD6C8] group-hover:border-[#65B7B5] mb-3.5 sm:mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden bg-[#EDE9DF] shadow-2xs relative shrink-0">
                    {founder.imageUrl ? (
                      <img
                        src={founder.imageUrl}
                        alt={founder.name}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (
                            founder.fallbackImageUrl &&
                            target.src !== founder.fallbackImageUrl
                          ) {
                            target.src = founder.fallbackImageUrl;
                            return;
                          }
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      style={{ display: founder.imageUrl ? 'none' : 'flex' }}
                      className="flex-col items-center justify-center text-[#777A76] w-full h-full"
                    >
                      <User className="w-7 h-7 opacity-60 mb-0.5" />
                      <span className="text-[10px] font-mono font-bold tracking-wider">
                        {founder.initials}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-base sm:text-lg font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
                    {founder.name}
                  </h3>

                  {/* Job Titles */}
                  <div className="mt-1 mb-2 space-y-0.5">
                    <div className="text-xs font-bold text-[#3E777A] leading-snug font-soft">
                      {founder.role}
                    </div>
                    <div className="text-[10px] text-[#777A76] font-en tracking-tight">
                      {founder.roleEn}
                    </div>
                  </div>

                  {/* Concise Summary */}
                  {founder.bio && (
                    <p className="text-xs text-[#434846] leading-relaxed line-clamp-2 mt-1 font-soft">
                      {founder.bio}
                    </p>
                  )}
                </div>

                {/* View Full Resume Kicker */}
                <div className="mt-4 sm:mt-5 pt-3.5 w-full border-t border-[#E5E0D4] text-[11px] font-semibold text-[#3E777A] flex items-center justify-center gap-1.5">
                  <span>مشاهده خلاصه سوابق کاری و جزئیات</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-80 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: 8 Core Studio Members with Interactive Department Switcher */}
        <div className="space-y-6 sm:space-y-8 pt-8 border-t border-[#DCD6C8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
            <div className="space-y-1">
              <span
                dir="ltr"
                className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block"
              >
                STUDIO ENSEMBLE & DEPARTMENTS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E2424]">
                اعضای دپارتمان‌های استودیو
              </h3>
            </div>

            {/* Interactive Department Switcher Tabs */}
            <div
              role="tablist"
              aria-label="فیلتر اعضای دپارتمان‌ها"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EDE9DF] border border-[#DCD6C8] rounded-2xl"
            >
              {DEPARTMENT_TABS.map((tab) => {
                const isActive = activeDepartment === tab.id;
                const count =
                  tab.id === 'all'
                    ? ensembleMembers.length
                    : ensembleMembers.filter((m) => m.department === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveDepartment(tab.id)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#3E777A] text-[#FAF8F4] shadow-xs'
                        : 'text-[#434846] hover:text-[#1E2424] hover:bg-[#E4DFD3]'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Members Grid Filtered by Department Switch */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 items-stretch transition-all duration-300">
            {filteredMembers.map((member) => {
              const shortRole = SHORT_ROLE_BY_ID[member.id] || member.role;
              return (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="group cursor-pointer rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-[#3E777A] hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* Portrait Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#DCD6C8] group-hover:border-[#3E777A] mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#EDE9DF] shadow-2xs relative shrink-0">
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
                      <User className="w-6 h-6 sm:w-7 sm:h-7 opacity-60 mb-0.5" />
                      <span className="text-[10px] font-mono font-bold tracking-wider">
                        {member.initials}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="text-sm sm:text-base font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors font-soft">
                    {member.name}
                  </h4>

                  {/* Short Role */}
                  <div className="mt-1 text-xs font-semibold text-[#3E777A] font-soft">
                    {shortRole}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


