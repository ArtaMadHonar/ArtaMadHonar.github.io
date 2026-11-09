import React, { useRef } from 'react';
import { X, User, Briefcase, GraduationCap } from 'lucide-react';
import type { TeamMember } from '../data/studioData';
import { useModalScrollLock } from '../hooks/useModalScrollLock';

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useModalScrollLock(isOpen && !!member, scrollContainerRef);

  if (!isOpen || !member) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overscroll-none"
    >
      <div
        className="relative w-full max-w-2xl bg-[#EDE9DF] dark:bg-[#151E20] text-[#1E2424] dark:text-[#F2EFE9] rounded-3xl overflow-hidden border border-[#DCD6C8] dark:border-[#27363A] shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#DCD6C8] dark:border-[#27363A] bg-[#FAF8F4] dark:bg-[#1B2629] shrink-0">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#3E777A] dark:text-[#65B7B5] font-semibold">
            {member.isCoFounder ? 'CO-FOUNDER · EXECUTIVE RESUME' : 'STUDIO TEAM MEMBER'}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777A76] hover:text-[#1E2424] dark:hover:text-[#F2EFE9] hover:bg-[#E5E0D4] dark:hover:bg-[#233136] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div
          ref={scrollContainerRef}
          className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain text-right"
        >
          {/* Top Identity Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right pb-5 border-b border-[#DCD6C8] dark:border-[#27363A]">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-center overflow-hidden bg-[#FAF8F4] dark:bg-[#1B2629] shadow-xs relative shrink-0">
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <User className="w-12 h-12 text-[#777A76]" />
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#1E2424] dark:text-[#F2EFE9]">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#3E777A] dark:text-[#65B7B5]">
                {member.role}
              </p>
              {member.department && (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F4] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-[11px] text-[#777A76]">
                  {member.department}
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#777A76] uppercase tracking-wider font-mono">
              درباره و پیشینه
            </h4>
            <p className="text-xs sm:text-sm text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Education */}
          {member.education && member.education.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#777A76] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5]" />
                <span>تحصیلات و مدارک تخصصی</span>
              </h4>
              <ul className="space-y-2">
                {member.education.map((edu, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#434846] dark:text-[#BCC6C4] bg-[#FAF8F4] dark:bg-[#1B2629] p-3 rounded-xl border border-[#DCD6C8] dark:border-[#27363A]"
                  >
                    {edu}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Work History */}
          {member.workHistory && member.workHistory.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#777A76] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#3E777A] dark:text-[#65B7B5]" />
                <span>سوابق کاری و پروژه‌های شاخص</span>
              </h4>
              <div className="space-y-2.5">
                {member.workHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF8F4] dark:bg-[#1B2629] p-3.5 rounded-xl border border-[#DCD6C8] dark:border-[#27363A] space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1E2424] dark:text-[#F2EFE9]">
                        {item.title}
                      </span>
                      {item.year && (
                        <span className="text-[#777A76] font-mono text-[11px]">
                          {item.year}
                        </span>
                      )}
                    </div>
                    {item.role && (
                      <span className="text-xs text-[#3E777A] dark:text-[#65B7B5] font-semibold block">
                        {item.role}
                      </span>
                    )}
                    {item.description && (
                      <p className="text-xs text-[#434846] dark:text-[#BCC6C4] leading-relaxed pt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
