import React, { useRef } from 'react';
import { X, Play } from 'lucide-react';
import { ProjectWork } from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';
import { useModalScrollLock } from '../hooks/useModalScrollLock';

interface ProjectDetailModalProps {
  work: ProjectWork | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (projectId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  work,
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = React.useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useModalScrollLock(isOpen && !!work, scrollContainerRef);

  React.useEffect(() => {
    setIsPlayingVideo(false);
  }, [isOpen, work?.id]);

  if (!isOpen || !work) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/75 backdrop-blur-sm overscroll-none"
    >
      <div
        className="relative w-full max-w-3xl bg-[#EDE9DF] text-[#1E2424] rounded-3xl overflow-hidden border border-[#DCD6C8] shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#DCD6C8] bg-[#FAF8F4] shrink-0">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold">
              {work.subtitle}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-[#1E2424]">{work.categoryFa}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777A76] hover:text-[#1E2424] hover:bg-[#E5E0D4] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div ref={scrollContainerRef} className="overflow-y-auto flex-1 overscroll-contain">
          {/* Visual Media - 16:9 */}
          <div
            dir="ltr"
            className="relative aspect-video w-full bg-[#121616] flex items-center justify-center overflow-hidden shrink-0"
          >
            {isPlayingVideo && work.videoUrl ? (
              <video
                dir="ltr"
                src={work.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
                poster={work.imageUrl}
              />
            ) : (
              <>
                <VisualArtCanvas
                  type={work.canvasType}
                  imageUrl={work.imageUrl}
                  className="w-full h-full"
                  showControls={work.canvasType === 'wonderful-day'}
                />
                {work.videoUrl && (
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/45 transition-colors group cursor-pointer"
                    aria-label="پخش تیزر ویدیویی"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-3 rounded-full bg-[#D6B16A]/35 blur-lg group-hover:bg-[#D6B16A]/55 transition-all" />
                      <div className="relative w-16 h-16 rounded-full bg-[#FAF8F4] text-[#1E2424] flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                        <Play className="w-7 h-7 translate-x-0.5 fill-current text-[#3E777A]" />
                      </div>
                    </div>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Info Details */}
          <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 text-right">
            <div className="space-y-2.5">
              <h3 className="text-xl sm:text-2xl font-black text-[#1E2424]">
                {work.title}
              </h3>
              <p className="text-sm text-[#434846] leading-relaxed">
                {work.description}
              </p>
              {work.secondaryDescription && (
                <p className="text-xs sm:text-sm text-[#777A76] leading-relaxed">
                  {work.secondaryDescription}
                </p>
              )}
            </div>

            {/* Highlights */}
            {work.highlights && work.highlights.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] space-y-2.5 text-xs text-[#434846]">
                <span className="font-bold text-[#1E2424] block">
                  {work.highlightsTitle || 'ویژگی‌های شاخص این حوزه:'}
                </span>
                {work.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E777A] mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DCD6C8] text-xs text-[#777A76]">
              <span className="font-semibold text-[#1E2424]">حوزه‌های مرتبط:</span>
              <span>{work.tags.join(' · ')}</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#777A76]">
                آرتا ماد هنر
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry(work.id);
                }}
                className="px-5 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-colors cursor-pointer"
              >
                ثبت درخواست همکاری در این حوزه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
