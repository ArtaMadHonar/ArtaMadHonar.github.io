import React, { useState } from 'react';
import { User } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../data/studioData';
import { openTeamMemberModal } from '../utils/modalEvents';

const SHORT_ROLE_BY_ID: Record<string, string> = {
  'lotfallah-salehi': 'سوپروایزر پایپلاین ویدیو',
  'ali-alipour': 'دستیار کارگردان انیمیشن',
  'negar-baratzadeh': 'طراح ارشد کانسپت',
  'hilda-baghban': 'آرتیست پردازش تصویر',
  'khorshid-khooban': 'مدیر تولید تیزر و آهنگساز',
  'hanieh-samipoor': 'تدوینگر ارشد و طراح صدا',
  'nima-nekookar': 'مدیر دپارتمان وب۳ و NFT',
  'mohammad-shariati': 'طراح ارشد کالکشن وب۳',
  'arya-mohammadkhan': 'عضو دپارتمان بازی‌سازی',
};

const DEPARTMENT_TABS = [
  { id: 'all', label: 'همه اعضا' },
  { id: 'animation', label: 'انیمیشن و توسعه IP' },
  { id: 'commercial', label: 'تبلیغات و CGI' },
  { id: 'web3', label: 'وب۳ و NFT' },
];

export const TeamGallery: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const coFounders = TEAM_MEMBERS.filter((m) => m.isCoFounder);
  const ensembleMembers = TEAM_MEMBERS.filter((m) => !m.isCoFounder && !m.hideFromHome);

  const filteredMembers =
    activeDepartment === 'all'
      ? ensembleMembers
      : ensembleMembers.filter((m) => m.department === activeDepartment);

  return (
    <section id="team" className="py-14 sm:py-18 border-t border-[#DCD6C8] relative scroll-mt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-14">
        {/* Part 1: Co-Founders & Management Team */}
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
                بنیان‌گذاران استودیو آرتا ماد هنر
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
                onClick={() => openTeamMemberModal(founder)}
                className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-[#FAF8F4] border border-[#DCD6C8] p-5 sm:p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-[0_16px_40px_rgba(30,36,36,0.08)] hover:-translate-y-1"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Portrait Avatar */}
                  <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full border-2 border-[#DCD6C8] group-hover:border-[#65B7B5] mb-3.5 sm:mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden bg-[#EDE9DF] shadow-2xs relative shrink-0">
                    {founder.imageUrl ? (
                      <img
                        src={founder.imageUrl}
                        alt={founder.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <User className="w-10 h-10 text-[#777A76]" />
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#1E2424] group-hover:text-[#3E777A] transition-colors">
                    {founder.name}
                  </h3>

                  <span className="text-xs font-bold text-[#3E777A] mt-1 block">
                    {founder.role}
                  </span>

                  <p className="text-xs text-[#434846] mt-3 line-clamp-3 leading-relaxed text-center">
                    {founder.bio}
                  </p>
                </div>

                <div className="w-full pt-4 mt-4 border-t border-[#E5E0D4] flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-[#777A76] group-hover:text-[#3E777A] transition-colors">
                    مشاهده سوابق و رزومه تخصصی ←
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Specialized Ensemble Members */}
        <div className="space-y-6 sm:space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD6C8] pb-5">
            <div className="space-y-1.5 text-right">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3E777A]">
                <span>تیم تخصصی</span>
                <span aria-hidden="true" className="text-[#777A76]">·</span>
                <span
                  dir="ltr"
                  className="font-mono text-[11px] uppercase tracking-widest text-[#777A76]"
                >
                  STUDIO ENSEMBLE
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-[#1E2424]">
                اعضای برگزیده تیم استودیو
              </h2>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F4] p-1 rounded-full border border-[#DCD6C8]">
              {DEPARTMENT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDepartment(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeDepartment === tab.id
                      ? 'bg-[#3E777A] text-[#FAF8F4]'
                      : 'text-[#434846] hover:text-[#1E2424]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symmetrical Grid for Ensemble */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => openTeamMemberModal(member)}
                className="group cursor-pointer rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] p-4 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-[#3E777A] hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#DCD6C8] group-hover:border-[#65B7B5] mb-2.5 flex items-center justify-center transition-all overflow-hidden bg-[#EDE9DF] shrink-0">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <User className="w-8 h-8 text-[#777A76]" />
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#1E2424] group-hover:text-[#3E777A] transition-colors">
                    {member.name}
                  </h4>

                  <span className="text-[10px] sm:text-xs text-[#777A76] mt-0.5 block line-clamp-1">
                    {SHORT_ROLE_BY_ID[member.id] || member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
