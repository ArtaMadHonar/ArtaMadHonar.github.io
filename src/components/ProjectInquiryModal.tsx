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
    }, 700);
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setDescription('');
    setSubmittedCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#FBF9F5] text-[#18181B] rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-2xl flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#EAE6DF] bg-white shrink-0">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#71717A] block">
              COLLABORATION
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] mt-0.5">
              شروع همکاری و ارتباط
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#71717A] hover:text-[#18181B] hover:bg-stone-100 transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {submittedCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#18181B]">
                  درخواست شما با موفقیت ثبت شد
                </h4>
                <p className="text-xs sm:text-sm text-[#71717A] max-w-sm mx-auto leading-relaxed">
                  تیم تولید استودیو آرتا ماد هنر در اسرع وقت جهت گفت‌وگو پیرامون پروژه با شما تماس خواهد گرفت.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#EAE6DF] inline-block">
                <span className="text-xs text-[#71717A] block mb-0.5">کد رهگیری:</span>
                <span className="font-mono text-base font-bold text-[#18181B] tracking-wider">
                  {submittedCode}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#18181B] text-[#FBF9F5] text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  بستن
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                لطفاً خلاصه نیازمندی‌ها و چشم‌انداز اثر خود را با ما در میان بگذارید.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#18181B] mb-1.5">
                    نام و نام‌خانوادگی / مجموعه <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام شما یا نام برند"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EAE6DF] text-xs sm:text-sm text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors placeholder:text-[#71717A]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B] mb-1.5">
                    اطلاعات تماس (شماره یا ایمیل) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="۰۹۱۲... یا email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EAE6DF] text-xs sm:text-sm text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors placeholder:text-[#71717A]/50 dir-ltr text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B] mb-1.5">
                    حوزه پروژه:
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EAE6DF] text-xs sm:text-sm text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors"
                  >
                    {SELECTED_WORKS.map((work) => (
                      <option key={work.id} value={work.id}>
                        {work.title}
                      </option>
                    ))}
                    <option value="other">سایر زمینه‌های تولید</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B] mb-1.5">
                    توضیحات مختصر <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="هدف، فضا و زمان‌بندی مورد انتظار..."
                    className="w-full p-3.5 rounded-xl bg-white border border-[#EAE6DF] text-xs sm:text-sm text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors placeholder:text-[#71717A]/50 resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#18181B] hover:opacity-90 disabled:opacity-50 text-[#FBF9F5] text-xs sm:text-sm font-medium transition-opacity"
                >
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
