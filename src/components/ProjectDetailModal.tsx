import React, { useRef } from 'react';
import { X, Play } from 'lucide-react';
import type { ProjectWork, DomainGalleryItem } from '../data/studioData';
import { useModalScrollLock } from '../hooks/useModalScrollLock';

interface ProjectDetailModalProps {
  work: (ProjectWork | DomainGalleryItem) | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (projectId?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  work,
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useModalScrollLock(isOpen && !!work, scrollContainerRef);

  if (!isOpen || !work) return null;

  const title = 'title' in work ? work.title : '';
  const subtitle = 'subtitle' in work ? work.subtitle : '';
  const description = 'description' in work ? work.description : '';
  const imageUrl = 'imageUrl' in work ? work.imageUrl : '';
  const embedUrl = 'embedUrl' in work ? work.embedUrl : undefined;
  const previewVideoUrl = 'previewVideoUrl' in work ? work.previewVideoUrl : undefined;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/75 backdrop-blur-sm overscroll-none"
    >
      <div
        className="relative w-full max-w-3xl bg-[#EDE9DF] dark:bg-[#151E20] text-[#1E2424] dark:text-[#F2EFE9] rounded-3xl overflow-hidden border border-[#DCD6C8] dark:border-[#27363A] shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#DCD6C8] dark:border-[#27363A] bg-[#FAF8F4] dark:bg-[#1B2629] shrink-0">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#3E777A] dark:text-[#65B7B5] font-semibold">
              {subtitle || 'PROJECT SPOTLIGHT'}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-[#1E2424] dark:text-[#F2EFE9]">
              {title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777A76] hover:text-[#1E2424] dark:hover:text-[#F2EFE9] hover:bg-[#E5E0D4] dark:hover:bg-[#233136] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div ref={scrollContainerRef} className="overflow-y-auto flex-1 overscroll-contain">
          {/* Visual Media */}
          <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : previewVideoUrl ? (
              <video
                src={previewVideoUrl}
                poster={imageUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div className="p-5 sm:p-7 space-y-4 text-right">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E2424] dark:text-[#F2EFE9]">
              {title}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                {description}
              </p>
            )}

            <div className="pt-3 border-t border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-between">
              {onOpenInquiry && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenInquiry(work.id);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-colors cursor-pointer"
                >
                  استعلام و سفارش پروژه مشابه
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#777A76] hover:text-[#1E2424] cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
