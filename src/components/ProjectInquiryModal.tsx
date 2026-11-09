import React, { useState, useRef } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { SELECTED_WORKS } from '../data/studioData';
import { useModalScrollLock } from '../hooks/useModalScrollLock';

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
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useModalScrollLock(isOpen, scrollContainerRef);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot trapped
      return;
    }
    if (!name.trim() || !contact.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const code = `AMH-${Math.floor(100000 + Math.random() * 900000)}`;
    const inquiryPayload = {
      trackingCode: code,
      name: name.trim(),
      contact: contact.trim(),
      project: projectId,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    };

    // 1. Always store locally in browser so local testing can be verified without any network
    try {
      const existing = JSON.parse(localStorage.getItem('amh_inquiries') || '[]');
      existing.unshift(inquiryPayload);
      localStorage.setItem('amh_inquiries', JSON.stringify(existing));
    } catch {}

    // 2. Dispatch to Telegram Bot if configured
    const tgToken = import.meta.env.PUBLIC_TELEGRAM_BOT_TOKEN;
    const tgChat = import.meta.env.PUBLIC_TELEGRAM_CHAT_ID;
    if (tgToken && tgChat) {
      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: tgChat,
            text: `🎨 درخواست همکاری در وب‌سایت آرتا ماد هنر\n\n🆔 کد رهگیری: ${code}\n👤 نام/برند: ${name}\n📞 تماس: ${contact}\n📂 حوزه: ${projectId}\n📝 توضیحات:\n${description}`,
          }),
        });
      } catch (tgErr) {
        console.error('Telegram dispatch error:', tgErr);
      }
    }

    // 3. Dispatch to Email via Web3Forms if configured
    const web3Key = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `[آرتا ماد هنر] درخواست همکاری: ${name} (${code})`,
            from_name: 'وب‌سایت آرتا ماد هنر',
            name,
            contact,
            project: projectId,
            message: description,
          }),
        });
      } catch (mailErr) {
        console.error('Email dispatch error:', mailErr);
      }
    }

    // 4. Save to dev server API and inquiries inbox
    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Date.now().toString(), code, ...inquiryPayload, message: description }),
      });
    } catch {
      // Fallback
    }
    try {
      const existing = JSON.parse(localStorage.getItem('amh-inquiries') || '[]');
      existing.unshift({ id: Date.now().toString(), code, ...inquiryPayload, message: description });
      localStorage.setItem('amh-inquiries', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setIsSubmitting(false);
    setSubmittedCode(code);
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setDescription('');
    setSubmittedCode(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/65 backdrop-blur-sm overscroll-none"
    >
      <div
        className="relative w-full max-w-xl bg-[#EDE9DF] dark:bg-[#151E20] text-[#1E2424] dark:text-[#F2EFE9] rounded-3xl overflow-hidden border border-[#DCD6C8] dark:border-[#27363A] shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#DCD6C8] dark:border-[#27363A] bg-[#FAF8F4] dark:bg-[#1B2629] shrink-0">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#3E777A] dark:text-[#65B7B5] font-semibold block">
              COLLABORATION & INQUIRY
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1E2424] dark:text-[#F2EFE9] mt-0.5">
              شروع همکاری و ارتباط با آرتا ماد هنر
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777A76] hover:text-[#1E2424] dark:hover:text-[#F2EFE9] hover:bg-[#E5E0D4] dark:hover:bg-[#233136] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div ref={scrollContainerRef} className="p-5 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
          {submittedCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#65B7B5]/20 text-[#3E777A] dark:text-[#65B7B5] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#1E2424] dark:text-[#F2EFE9]">
                  درخواست شما با موفقیت ثبت شد
                </h4>
                <p className="text-xs sm:text-sm text-[#434846] dark:text-[#BCC6C4] max-w-sm mx-auto leading-relaxed">
                  تیم استودیو آرتا ماد هنر در اسرع وقت جهت گفت‌وگو پیرامون پروژه با شما تماس خواهد گرفت.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F4] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] inline-block">
                <span className="text-xs text-[#777A76] block mb-0.5">کد رهگیری اختصاصی:</span>
                <span className="font-mono text-base font-bold text-[#3E777A] dark:text-[#65B7B5] tracking-wider tabular-nums">
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
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <p className="text-xs sm:text-sm text-[#434846] dark:text-[#BCC6C4] leading-relaxed">
                لطفاً خلاصه نیازمندی‌ها، نوع پروژه و چشم‌انداز اثر خود را با ما در میان بگذارید. پیام شما به تیم استودیو ارسال خواهد شد.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] mb-1.5">
                    نام و نام‌خانوادگی / برند یا مجموعه <span className="text-[#3E777A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام شما یا نام برند"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs sm:text-sm text-[#1E2424] dark:text-[#F2EFE9] focus:outline-none focus:border-[#3E777A] transition-colors placeholder:text-[#777A76]/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] mb-1.5">
                    اطلاعات تماس (شماره تماس یا ایمیل) <span className="text-[#3E777A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="۰۹۱۲... یا email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs sm:text-sm text-[#1E2424] dark:text-[#F2EFE9] focus:outline-none focus:border-[#3E777A] transition-colors placeholder:text-[#777A76]/60 dir-ltr text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] mb-1.5">
                    حوزه فعالیت مورد نظر:
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs sm:text-sm text-[#1E2424] dark:text-[#F2EFE9] focus:outline-none focus:border-[#3E777A] transition-colors"
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
                  <label className="block text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] mb-1.5">
                    توضیحات مختصر پروژه <span className="text-[#3E777A]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="هدف، فضا، انتظارات و زمان‌بندی پروژه..."
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs sm:text-sm text-[#1E2424] dark:text-[#F2EFE9] focus:outline-none focus:border-[#3E777A] transition-colors placeholder:text-[#777A76]/60 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
