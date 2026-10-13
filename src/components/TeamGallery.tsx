import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../data/studioData';

interface TeamGalleryProps {
  onSelectMember: (member: TeamMember) => void;
}

// Eagerly pre-instantiate and warm all team photos in browser cache immediately at module load
if (typeof window !== 'undefined') {
  TEAM_MEMBERS.forEach((m) => {
    if (m.imageUrl) {
      const img = new Image();
      img.src = m.imageUrl;
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    }
  });
}

export const TeamGallery: React.FC<TeamGalleryProps> = ({ onSelectMember }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Pre-decode all team member photos into GPU texture cache on mount
  useEffect(() => {
    TEAM_MEMBERS.forEach((m) => {
      if (m.imageUrl) {
        const img = new Image();
        img.src = m.imageUrl;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    });
  }, []);

  const filterTabs = [
    { id: 'all', label: 'تمام اعضا' },
    { id: 'leadership', label: 'مدیریت و کارگردانی' },
    { id: 'animation', label: 'انیمیشن' },
    { id: 'commercial', label: 'تیزرسازی و صدا' },
    { id: 'web3', label: 'وب۳' },
  ];

  return (
    <section id="team" className="py-20 sm:py-28 border-t border-[#EAE6DF] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAE6DF] pb-8">
          <div className="space-y-2 text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              STUDIO ENSEMBLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#18181B]">
              تیم متخصص آرتا ماد هنر
            </h2>
          </div>

          {/* Department Tabs with Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#F3EFEA] border border-[#EAE6DF] rounded-2xl overflow-x-auto max-w-full scrollbar-none shrink-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#18181B] text-[#FAF8F5] shadow-xs'
                    : 'text-[#52525B] hover:text-[#18181B] hover:bg-stone-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Team Members Grid - Keep all cards mounted so cached images never unmount or reload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => {
            const isVisible = activeTab === 'all' || member.department === activeTab;
            const isMystery = member.isMystery;

            return (
              <div
                key={member.id}
                onClick={() => onSelectMember(member)}
                className={`group cursor-pointer rounded-3xl bg-white border border-[#EAE6DF] p-7 text-center flex-col items-center justify-between transition-all duration-300 hover:border-[#18181B]/40 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? 'flex' : 'hidden'
                } ${isMystery ? 'bg-gradient-to-b from-white via-white to-[#FBF9F5]' : ''}`}
              >
                <div className="w-full flex flex-col items-center">
                  {/* Portrait Avatar */}
                  <div
                    className="w-24 h-24 rounded-full border border-[#EAE6DF] mb-5 flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden bg-[#FBF9F5] shadow-xs relative shrink-0"
                  >
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
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
                      className="flex-col items-center justify-center text-[#71717A] w-full h-full"
                    >
                      {isMystery ? (
                        <span className="text-4xl font-black text-[#18181B] select-none">
                          ؟
                        </span>
                      ) : (
                        <>
                          <User className="w-8 h-8 opacity-60 mb-0.5" />
                          <span className="text-[10px] font-mono font-bold tracking-wider">
                            {member.initials}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-base sm:text-lg font-bold text-[#18181B] group-hover:text-black transition-colors font-soft">
                    {member.name}
                  </h3>

                  {/* Job Titles */}
                  {isMystery ? (
                    <div className="my-3">
                      <span className="text-3xl font-extrabold text-[#18181B] tracking-wider select-none font-soft">
                        « ؟ »
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1.5 mb-3 space-y-0.5">
                      <div className="text-xs font-medium text-stone-800 leading-snug font-soft">
                        {member.role}
                      </div>
                      <div className="text-[11px] text-[#71717A] font-en tracking-tight">
                        {member.roleEn}
                      </div>
                    </div>
                  )}

                  {/* Role Summary */}
                  {isMystery ? (
                    <p className="text-xs text-[#71717A] font-mono tracking-widest mt-1">
                      (...)
                    </p>
                  ) : (
                    member.bio && (
                      <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2 mt-1 font-soft">
                        {member.bio}
                      </p>
                    )
                  )}
                </div>

                {/* View Details Kicker */}
                <div className="mt-4 pt-3 w-full border-t border-[#EAE6DF]/70 text-[11px] text-[#71717A] group-hover:text-[#18181B] transition-colors flex items-center justify-center gap-1">
                  <span>مشاهده رزومه و مشخصات</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
