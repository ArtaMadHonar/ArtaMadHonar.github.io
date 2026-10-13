import React from 'react';
import { X, Play } from 'lucide-react';
import { ProjectWork } from '../data/studioData';
import { VisualArtCanvas } from './VisualArtCanvas';

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

  React.useEffect(() => {
    setIsPlayingVideo(false);
  }, [isOpen, work?.id]);

  if (!isOpen || !work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#FBF9F5] text-[#18181B] rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-2xl flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#EAE6DF] bg-white shrink-0">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#71717A]">
              {work.subtitle}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-[#18181B]">{work.categoryFa}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#71717A] hover:text-[#18181B] hover:bg-stone-100 transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Visual Media - True 16:9 Aspect Ratio with Zero Cropping */}
          <div dir="ltr" className="relative aspect-video w-full bg-stone-950 flex items-center justify-center overflow-hidden shrink-0">
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
                    className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/45 transition-colors group cursor-pointer"
                    aria-label="پخش تیزر ویدیویی"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-3 rounded-full bg-amber-500/30 blur-lg group-hover:bg-amber-500/50 transition-all" />
                      <div className="relative w-16 h-16 rounded-full bg-white text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                        <Play className="w-7 h-7 translate-x-0.5 fill-current text-stone-950" />
                      </div>
                    </div>
                    <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 text-white text-xs font-semibold backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-md">
                      <Play className="w-3 h-3 fill-current text-amber-400" />
                      <span>پخش تیزر سینمایی</span>
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Info Details */}
          <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 text-right">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#18181B]">
              {work.title}
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              {work.description}
            </p>
          </div>

          {/* Highlights */}
          {work.highlights && work.highlights.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] space-y-2 text-xs text-[#52525B]">
              <span className="font-bold text-[#18181B] block">
                {work.highlightsTitle || 'ویژگی‌های شاخص پروژه:'}
              </span>
              {work.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE6DF]">
            <span className="text-xs text-[#71717A] ml-2">برچسب‌ها:</span>
            {work.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white border border-[#EAE6DF] text-xs text-[#18181B]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#71717A]">
              استودیو آرتا ماد هنر
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry(work.id);
              }}
              className="px-5 py-2 rounded-full bg-[#18181B] text-[#FBF9F5] text-xs font-medium hover:opacity-90 transition-opacity"
            >
              ثبت سفارش مشابه
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
