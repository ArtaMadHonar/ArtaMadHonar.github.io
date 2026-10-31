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

interface TeamGalleryProps {
  onSelectMember: (member: TeamMember) => void;
}

export const TeamGallery: React.FC<TeamGalleryProps> = ({ onSelectMember }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const coFounders = TEAM_MEMBERS.filter((m) => m.isCoFounder);
  const ensembleMembers = TEAM_MEMBERS.filter((m) => !m.isCoFounder && !m.hideFromHome);

  const filterTabs = [
    { id: 'all', label: 'همه اعضای تیم تولید' },
    { id: 'animation', label: 'دپارتمان انیمیشن' },
    { id: 'commercial', label: 'تیزرسازی و صدا' },
    { id: 'web3', label: 'فناوری و وب۳' },
  ];

  return (
    <section id="team" className="py-14 sm:py-20 border-t border-[#DCD6C8] relative scroll-mt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-14">
        {/* Part 1: Dedicated 3 Co-Founders & Management Team Section (هم‌بنیانگذاران و تیم مدیریتی آرتا ماد هنر) */}
        <div className="space-y-7 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#DCD6C8] pb-6">
            <div className="space-y-2 text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold">
                CO-FOUNDERS & MANAGEMENT TEAM
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E2424]">
                هم‌بنیانگذاران و تیم مدیریتی آرتا ماد هنر
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#434846] max-w-md text-right leading-relaxed">
              تلاقی کارگردانی سینما و انیمیشن با معماری پایپلاین‌های هوش مصنوعی و جلوه‌های بصری؛ حاصل سال‌ها تجربه و همکاری مشترک در شکل‌گیری آرتا ماد هنر.
            </p>
          </div>

          {/* 3 Co-Founders Concise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch">
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

        {/* Part 2: Studio Specialists & Artists Ensemble */}
        <div className="space-y-7 sm:space-y-10 pt-8 border-t border-[#DCD6C8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-1.5 text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777A76]">
                STUDIO ARTISTS & SPECIALISTS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E2424]">
                اعضای تخصصی دپارتمان‌های استودیو
              </h3>
            </div>

            {/* Department Filter Tabs (Wraps cleanly on mobile) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F4F0E6] border border-[#DCD6C8] rounded-2xl">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#3E777A] text-[#FAF8F4] shadow-xs'
                      : 'text-[#434846] hover:text-[#1E2424] hover:bg-[#E7E2D6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {ensembleMembers.map((member) => {
              const isVisible = activeTab === 'all' || member.department === activeTab;

              return (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className={`group cursor-pointer rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] p-4 sm:p-6 text-center flex-col items-center justify-between transition-all duration-300 hover:border-[#3E777A]/60 hover:shadow-md hover:-translate-y-0.5 ${
                    isVisible ? 'flex' : 'hidden'
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    {/* Portrait Avatar */}
                    <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-[#DCD6C8] mb-3 sm:mb-4 flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden bg-[#EDE9DF] shadow-2xs relative shrink-0">
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

                    {/* Job Titles */}
                    <div className="mt-1 mb-2 space-y-0.5">
                      <div className="text-[11px] sm:text-xs font-medium text-[#3E777A] leading-snug font-soft line-clamp-2">
                        {member.role}
                      </div>
                      <div className="hidden sm:block text-[10px] text-[#777A76] font-en tracking-tight">
                        {member.roleEn}
                      </div>
                    </div>

                    {/* Role Summary */}
                    {member.bio && (
                      <p className="hidden sm:line-clamp-2 text-xs text-[#434846] leading-relaxed mt-1 font-soft">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* View Details Kicker */}
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 w-full border-t border-[#E5E0D4] text-[10px] sm:text-[11px] text-[#777A76] group-hover:text-[#3E777A] transition-colors flex items-center justify-center gap-1">
                    <span>مشاهده مشخصات</span>
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

