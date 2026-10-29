import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { SELECTED_WORKS } from '../data/studioData';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProjectId,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId || 'wonderful-day');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `AMH-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedCode(code);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setDescription('');
    setSubmittedCode(null);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-xl bg-[#EDE9DF] text-[#1E2424] rounded-3xl overflow-hidden border border-[#DCD6C8] shadow-2xl flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#DCD6C8] bg-[#FAF8F4] shrink-0">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#3E777A] font-semibold block">
              COLLABORATION
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1E2424] mt-0.5">
              شروع همکاری و ارتباط با آرتا ماد هنر
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777A76] hover:text-[#1E2424] hover:bg-[#E5E0D4] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {submittedCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#65B7B5]/20 text-[#3E777A] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#1E2424]">
                  درخواست شما با موفقیت ثبت شد
                </h4>
                <p className="text-xs sm:text-sm text-[#434846] max-w-sm mx-auto leading-relaxed">
                  تیم استودیو آرتا ماد هنر در اسرع وقت جهت گفت‌وگو پیرامون پروژه با شما تماس خواهد گرفت.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#DCD6C8] inline-block">
                <span className="text-xs text-[#777A76] block mb-0.5">کد رهگیری:</span>
                <span className="font-mono text-base font-bold text-[#3E777A] tracking-wider tabular-nums">
                  {submittedCode}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] text-[#FAF8F4] text-xs font-semibold transition-colors cursor-pointer"
                >
                  بستن
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              <p className="text-xs sm:text-sm text-[#434846] leading-relaxed">
                لطفاً خلاصه نیازمندی‌ها، نوع پروژه و چشم‌انداز اثر خود را با ما در میان بگذارید.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2424] mb-1.5">
                    نام و نام‌خانوادگی / برند یا مجموعه <span className="text-[#3E777A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام شما یا نام برند"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] text-xs sm:text-sm text-[#1E2424] focus:outline-none focus:border-[#3E777A] transition-colors placeholder:text-[#777A76]/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2424] mb-1.5">
                    اطلاعات تماس (شماره یا ایمیل) <span className="text-[#3E777A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="۰۹۱۲... یا email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] text-xs sm:text-sm text-[#1E2424] focus:outline-none focus:border-[#3E777A] transition-colors placeholder:text-[#777A76]/60 dir-ltr text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2424] mb-1.5">
                    حوزه فعالیت مورد نظر:
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] text-xs sm:text-sm text-[#1E2424] focus:outline-none focus:border-[#3E777A] transition-colors"
                  >
                    {SELECTED_WORKS.map((work) => (
                      <option key={work.id} value={work.id}>
                        {work.title}
                      </option>
                    ))}
                    <option value="other">سایر زمینه‌های همکاری</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2424] mb-1.5">
                    توضیحات مختصر پروژه <span className="text-[#3E777A]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="هدف، فضا و زمان‌بندی مورد انتظار..."
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DCD6C8] text-xs sm:text-sm text-[#1E2424] focus:outline-none focus:border-[#3E777A] transition-colors placeholder:text-[#777A76]/60 resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#3E777A] hover:bg-[#326265] disabled:opacity-50 text-[#FAF8F4] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'در حال ثبت...' : 'ارسال درخواست همکاری'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
