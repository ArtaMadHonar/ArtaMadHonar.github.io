import React from 'react';
import { X, User, Briefcase, GraduationCap } from 'lucide-react';
import { TeamMember } from '../data/studioData';

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !member) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-2xl bg-[#EDE9DF] text-[#1E2424] rounded-3xl overflow-hidden border border-[#DCD6C8] shadow-2xl flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#DCD6C8] bg-[#FAF8F4] shrink-0">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold">
            {member.isCoFounder ? 'CO-FOUNDER · EXECUTIVE RESUME' : 'STUDIO TEAM MEMBER'}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777A76] hover:text-[#1E2424] hover:bg-[#E5E0D4] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 text-right">
          {/* Top Identity Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right pb-5 border-b border-[#DCD6C8]">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[#DCD6C8] flex items-center justify-center overflow-hidden bg-[#FAF8F4] shadow-sm relative shrink-0">
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
                <User className="w-9 h-9 mb-0.5 opacity-60" />
                <span className="text-[11px] font-mono tracking-wider font-semibold">
                  {member.initials}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#1E2424]">{member.name}</h3>
                {member.nameEn && (
                  <span className="text-xs font-en text-[#777A76] font-medium">
                    | {member.nameEn}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#3E777A]">{member.role}</p>
              <p className="text-[11px] text-[#777A76] font-mono">{member.roleEn}</p>
              {member.education && (
                <div className="pt-1.5 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#434846] font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#3E777A] shrink-0" />
                  <span>{member.education}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Work Experience Summary (خلاصه سوابق کاری - مطابق رزومه) */}
          {member.workHistory && member.workHistory.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#3E777A] shrink-0" />
                  <h4 className="text-sm sm:text-base font-black text-[#1E2424]">
                    خلاصه سوابق کاری
                  </h4>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777A76] font-semibold">
                  WORK EXPERIENCE
                </span>
              </div>

              <div className="space-y-3.5">
                {member.workHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[#F4F0E6] border border-[#E2DDD1] space-y-1.5 transition-colors hover:border-[#65B7B5]"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-xs sm:text-[13.5px] font-bold text-[#1E2424]">
                        {item.role}
                      </span>
                      {item.year && (
                        <span className="text-[11px] font-semibold text-[#3E777A]">
                          {item.year}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-[#3E777A]">
                      {item.projectOrOrg}
                    </div>
                    {item.detail && (
                      <p className="text-xs text-[#434846] leading-relaxed pt-0.5">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Separate Narrative Biography Paragraph (درباره و رویکرد حرفه‌ای) */}
          {(member.fullBio || member.bio) && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-2.5">
                <h4 className="text-xs sm:text-sm font-black text-[#1E2424]">
                  درباره و جایگاه حرفه‌ای در استودیو
                </h4>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777A76] font-semibold">
                  PROFILE OVERVIEW
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#434846] leading-relaxed font-fa">
                {member.fullBio || member.bio}
              </p>
            </div>
          )}

          {/* Section 3: Key Specialties & Tools */}
          {member.specialties && member.specialties.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-2">
              <span className="text-xs font-bold text-[#1E2424] block">
                تخصص‌های کلیدی و ابزارها:
              </span>
              <p className="text-xs text-[#434846] leading-relaxed">
                {member.specialties.join(' · ')}
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-[#DCD6C8] text-xs text-[#777A76] flex items-center justify-between">
            <span>آرتا ماد هنر · تلاقی هنر و فناوری</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#3E777A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#326265] transition-colors cursor-pointer"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

