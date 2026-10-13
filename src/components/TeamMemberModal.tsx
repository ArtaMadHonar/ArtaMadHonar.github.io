import React from 'react';
import { X, User } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-sm bg-[#FBF9F5] text-[#18181B] rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-2xl flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#EAE6DF] bg-white shrink-0">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#71717A]">
            TEAM
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#71717A] hover:text-[#18181B] hover:bg-stone-100 transition-colors"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 sm:space-y-6 text-center overflow-y-auto flex-1">
          {/* Avatar representation */}
          <div
            className="mx-auto w-28 h-28 rounded-full border-2 border-[#EAE6DF] flex items-center justify-center overflow-hidden bg-[#FBF9F5] shadow-md relative shrink-0"
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
              className="flex-col items-center justify-center text-[#71717A] w-full h-full"
            >
              {member.isMystery ? (
                <span className="text-4xl font-black text-[#18181B] select-none">
                  ؟
                </span>
              ) : (
                <>
                  <User className="w-9 h-9 mb-0.5 opacity-60" />
                  <span className="text-[11px] font-mono tracking-wider font-semibold">
                    {member.initials}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Name & Titles */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#18181B]">{member.name}</h3>
            {member.isMystery ? (
              <div className="font-mono text-3xl font-extrabold text-[#18181B] my-2 select-none">
                « ؟ »
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-[#18181B]">{member.role}</p>
                <p className="text-[11px] text-[#71717A] font-mono">{member.roleEn}</p>
              </div>
            )}
          </div>

          {/* Bio / Impact */}
          {member.isMystery ? (
            <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] text-xs text-[#71717A] text-center font-mono tracking-widest">
              (...)
            </div>
          ) : (
            member.bio && (
              <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] text-xs text-[#52525B] leading-relaxed text-right font-fa">
                {member.bio}
              </div>
            )
          )}

          <div className="pt-2 border-t border-[#EAE6DF]/60 text-xs text-[#71717A]">
            استودیو آرتا ماد هنر · کارخانه نوآوری مشهد
          </div>
        </div>
      </div>
    </div>
  );
};
