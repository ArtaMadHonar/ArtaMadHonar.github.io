import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Layers,
  Film,
  Users,
  BookOpen,
  Inbox,
  Search,
  Save,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Image as ImageIcon,
  Video,
  Sparkles,
  Copy,
  ChevronLeft,
  X,
  FileText,
  Globe,
  Share2,
} from 'lucide-react';
import {
  getStudioContent,
  saveStudioContent,
  resetStudioContentToDefault,
  type StudioContent,
} from '../../data/contentStore';
import type { ProjectWork, TeamMember, DomainGalleryItem } from '../../data/studioData';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'overview' | 'domains' | 'gallery' | 'team' | 'catalog' | 'inbox' | 'seo' | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [content, setContent] = useState<StudioContent>(() => getStudioContent());
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active domain selected in Domains tab
  const [selectedDomainId, setSelectedDomainId] = useState<string>('wonderful-day');

  // Active domain filter for Gallery tab
  const [galleryFilterDomain, setGalleryFilterDomain] = useState<string>('all');
  const [editingGalleryItem, setEditingGalleryItem] = useState<{ domainId: string; item: DomainGalleryItem; isNew?: boolean } | null>(null);

  // Team search and editing
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState<{ member: TeamMember; isNew?: boolean } | null>(null);

  // Inquiries
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Theme toggle
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupImportRef = useRef<HTMLInputElement>(null);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Dark/Light
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('amh-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('amh-theme', 'light');
    }
  };

  // Load Inquiries
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.inquiries) {
          setInquiries(json.inquiries);
          return;
        }
      }
    } catch {
      // Fallback to localStorage
    }
    try {
      const local = localStorage.getItem('amh-inquiries');
      if (local) {
        setInquiries(JSON.parse(local));
      }
    } catch {
      // Ignore
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'inbox') {
      fetchInquiries();
    }
  }, [activeTab]);

  // Handle Full Save
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const result = await saveStudioContent(content);
      setHasUnsavedChanges(false);
      if (result.diskSaved) {
        showToast('✓ تغییرات با موفقیت روی فایل‌های پروژه ذخیره شد');
      } else {
        showToast('✓ تغییرات در حافظه مرورگر ذخیره و روی پیش‌نمایش اعمال شد');
      }
    } catch {
      showToast('خطا در ذخیره‌سازی داده‌ها');
    } finally {
      setIsSaving(false);
    }
  };

  // Generic content updater
  const updateContent = (updater: (prev: StudioContent) => StudioContent) => {
    setContent((prev) => {
      const next = updater(prev);
      setHasUnsavedChanges(true);
      return next;
    });
  };

  // File Upload Helper
  const handleUploadAsset = async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name, base64 }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              showToast(`تصویر با موفقیت در پروژه آپلود شد`);
              resolve(data.url);
              return;
            }
          }
        } catch {
          // If disk API fails, resolve base64 data url directly
        }
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // Backup Download
  const handleDownloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `artamad-content-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('نسخه پشتیبان JSON با موفقیت دانلود شد');
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.selectedWorks && parsed.teamMembers) {
          setContent(parsed);
          setHasUnsavedChanges(true);
          showToast('فایل پشتیبان با موفقیت بارگذاری شد. لطفاً ذخیره را بزنید.');
        } else {
          showToast('ساختار فایل JSON معتبر نیست');
        }
      } catch {
        showToast('خطا در خواندن فایل JSON');
      }
    };
    reader.readAsText(file);
  };

  // Reset to Factory
  const handleResetFactory = async () => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید تمام داده‌ها را به مقادیر اولیه کارخانه بازنشانی کنید؟')) {
      const def = await resetStudioContentToDefault();
      setContent(def);
      setHasUnsavedChanges(false);
      showToast('تمام داده‌ها با موفقیت به مقادیر پیش‌فرض اولیه بازنشانی شدند');
    }
  };

  // Stats
  const totalGalleryItems = content.selectedWorks.reduce((acc, w) => acc + (w.galleryItems?.length || 0), 0);
  const totalMembers = content.teamMembers.length;
  const currentDomain = content.selectedWorks.find((w) => w.id === selectedDomainId) || content.selectedWorks[0];

  return (
    <div className="min-h-screen bg-[#EDE9DF] dark:bg-[#0C1011] text-[#1E2424] dark:text-[#F2EFE9] flex flex-col font-fa transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-3 rounded-2xl bg-[#1E2424] dark:bg-[#FAF8F4] text-[#FAF8F4] dark:text-[#1E2424] shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#65B7B5] dark:text-[#3E777A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 dark:bg-[#151E20]/95 backdrop-blur-md border-b border-[#DCD6C8] dark:border-[#27363A] px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E777A] text-white flex items-center justify-center font-bold text-base shadow-xs">
              AMH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-[#1E2424] dark:text-white">
                  مدیریت محتوای آرتا ماد هنر
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#3E777A]/12 text-[#2E5A5C] dark:text-[#65B7B5] text-[10px] font-mono font-bold">
                  CMS v2.0
                </span>
              </div>
              <span className="text-[11px] text-[#777A76] dark:text-[#889290]">
                محیط امن محلی (Local-first Engine)
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            
            {/* Live Site Link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white dark:hover:bg-[#65B7B5] dark:hover:text-[#1E2424] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>مشاهده سایت</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                hasUnsavedChanges
                  ? 'bg-[#3E777A] text-white hover:bg-[#326265] animate-pulse'
                  : 'bg-[#2E5A5C] text-white hover:bg-[#25494B]'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'در حال ذخیره...' : hasUnsavedChanges ? 'ذخیره تغییرات جدید *' : 'ذخیره شده در پروژه'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-[#1E2424] dark:text-[#F2EFE9] hover:text-[#3E777A] transition-colors cursor-pointer"
              aria-label="تغییر تم"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
              title="خروج از پنل"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-[#FAF8F4]/70 dark:bg-[#131A1C]/90 border-b border-[#DCD6C8] dark:border-[#27363A] px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>داشبورد کلی</span>
          </button>

          <button
            onClick={() => setActiveTab('domains')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>۵ دپارتمان استودیو</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>گالری آثار و تیزرها</span>
            <span className="px-1.5 py-0.2 rounded-md bg-black/15 text-[10px] farsi-nums font-mono">
              {totalGalleryItems}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'team'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>اعضای تیم ({totalMembers})</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>کاتالوگ «روز شگفت‌انگیز»</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>صندوق پیام‌ها</span>
            {inquiries.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-md bg-rose-500 text-white text-[10px] farsi-nums font-mono font-bold">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>سئو و پیش‌نمایش گوگل</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-[#3E777A] text-white shadow-xs'
                : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>پشتیبان‌گیری</span>
          </button>

        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* =========================================================================
            TAB 1: OVERVIEW DASHBOARD
           ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top Stat Banners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">
                    دپارتمان‌های فعال
                  </span>
                  <span className="text-3xl font-black text-[#1E2424] dark:text-[#FAF8F4] farsi-nums">
                    ۵
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">
                    کل آثار و شات‌ها
                  </span>
                  <span className="text-3xl font-black text-[#1E2424] dark:text-[#FAF8F4] farsi-nums">
                    {totalGalleryItems}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Film className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">
                    اعضای ثبت‌شده تیم
                  </span>
                  <span className="text-3xl font-black text-[#1E2424] dark:text-[#FAF8F4] farsi-nums">
                    {totalMembers}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">
                    سلامت سئوی سایت
                  </span>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 farsi-nums">
                    ۱۰۰٪
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-[#1E2424] dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#3E777A]" />
                  <span>دسترسی سریع به دپارتمان‌ها</span>
                </h3>
                <div className="space-y-2">
                  {content.selectedWorks.map((work, idx) => (
                    <div
                      key={work.id}
                      onClick={() => {
                        setSelectedDomainId(work.id);
                        setActiveTab('domains');
                      }}
                      className="p-3 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:bg-[#3E777A]/10 border border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#3E777A] font-bold">0{idx + 1}</span>
                        <div>
                          <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">{work.shortTitle}</h4>
                          <span className="text-xs text-[#777A76] dark:text-[#889290]">{work.galleryItems?.length || 0} اثر در گالری</span>
                        </div>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-[#777A76]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-[#1E2424] dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#3E777A]" />
                  <span>راهنمای کاربری و وضعیت محلی</span>
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-[#434846] dark:text-[#A8B2B0] leading-relaxed">
                  <p>
                    ✓ <strong>محیط لوکال امن:</strong> تمام تغییراتی که در این پنل اعمال می‌کنید، در فایل <code className="font-mono px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">studioContent.json</code> روی سیستم شما ذخیره می‌شود.
                  </p>
                  <p>
                    ✓ <strong>پیش‌نمایش فوری:</strong> به محض زدن دکمه «ذخیره تغییرات»، اگر صفحه اصلی سایت در تب دیگر باز باشد با یک رفرش تمام تغییرات (متن‌ها، عکس‌ها و اعضا) به روز می‌شوند.
                  </p>
                  <p>
                    ✓ <strong>پوش به گیتهاب:</strong> طبق درخواست شما، تا زمانی که اعلام نکنید هیچ تغییری به گیتهاب ارسال نمی‌شود و می‌توانید با خیال راحت به صورت لوکال ویرایش و بررسی کنید.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: DOMAINS & DEPARTMENTS
           ========================================================================= */}
        {activeTab === 'domains' && (
          <div className="space-y-6">
            
            {/* Domain Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#DCD6C8] dark:border-[#27363A]">
              {content.selectedWorks.map((work) => (
                <button
                  key={work.id}
                  onClick={() => setSelectedDomainId(work.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedDomainId === work.id
                      ? 'bg-[#3E777A] text-white shadow-xs'
                      : 'bg-[#FAF8F4] dark:bg-[#151E20] text-[#434846] dark:text-[#A8B2B0] border border-[#DCD6C8] dark:border-[#27363A]'
                  }`}
                >
                  {work.shortTitle}
                </button>
              ))}
            </div>

            {/* Department Edit Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6">
              
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    ویرایش دپارتمان: {currentDomain.title}
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    شناسه دپارتمان: <code className="font-mono text-[#3E777A]">{currentDomain.id}</code>
                  </span>
                </div>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all flex items-center gap-2 self-start cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره این بخش</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                    عنوان کامل دپارتمان (فارسی):
                  </label>
                  <input
                    type="text"
                    value={currentDomain.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, title: val } : w)),
                      }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                  />
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                    عنوان کوتاه (برای منو و تب‌ها):
                  </label>
                  <input
                    type="text"
                    value={currentDomain.shortTitle || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, shortTitle: val } : w)),
                      }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                  />
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                    عنوان انگلیسی (Subtitle):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={currentDomain.subtitle}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, subtitle: val } : w)),
                      }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                  />
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                    مسیر تصویر کاور اصلی (Cover Image):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      dir="ltr"
                      value={currentDomain.imageUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateContent((prev) => ({
                          ...prev,
                          selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, imageUrl: val } : w)),
                        }));
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                    />
                    <label className="px-3 py-2.5 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>آپلود</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleUploadAsset(file);
                            if (url) {
                              updateContent((prev) => ({
                                ...prev,
                                selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, imageUrl: url } : w)),
                              }));
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

              </div>

              {/* Text Areas */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                  خلاصه کوتاه دپارتمان (نمایش در کارت صفحه اول):
                </label>
                <textarea
                  rows={2}
                  value={currentDomain.shortSummary}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, shortSummary: val } : w)),
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A] leading-relaxed"
                />
              </div>

              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                  توضیحات جامع دپارتمان (نمایش در بالای صفحه اختصاصی):
                </label>
                <textarea
                  rows={4}
                  value={currentDomain.description}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      selectedWorks: prev.selectedWorks.map((w) => (w.id === currentDomain.id ? { ...w, description: val } : w)),
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A] leading-relaxed"
                />
              </div>

              {/* Highlights List */}
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9]">
                    ویژگی‌ها و نکات برجسته (Highlights):
                  </label>
                  <button
                    onClick={() => {
                      updateContent((prev) => ({
                        ...prev,
                        selectedWorks: prev.selectedWorks.map((w) =>
                          w.id === currentDomain.id ? { ...w, highlights: [...w.highlights, 'ویژگی جدید دپارتمان...'] } : w
                        ),
                      }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] hover:bg-[#3E777A] hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>افزودن مورد</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {currentDomain.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => ({
                            ...prev,
                            selectedWorks: prev.selectedWorks.map((w) => {
                              if (w.id === currentDomain.id) {
                                const newHl = [...w.highlights];
                                newHl[hIdx] = val;
                                return { ...w, highlights: newHl };
                              }
                              return w;
                            }),
                          }));
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                      />
                      <button
                        onClick={() => {
                          updateContent((prev) => ({
                            ...prev,
                            selectedWorks: prev.selectedWorks.map((w) => {
                              if (w.id === currentDomain.id) {
                                return { ...w, highlights: w.highlights.filter((_, idx) => idx !== hIdx) };
                              }
                              return w;
                            }),
                          }));
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: GALLERY & PORTFOLIO WORKS
           ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            {/* Header + Add button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD6C8] dark:border-[#27363A]">
              <div>
                <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                  مدیریت آثار، تیزرها و شات‌های گالری
                </h3>
                <span className="text-xs text-[#777A76] dark:text-[#889290]">
                  کل آثار ثبت‌شده: {totalGalleryItems} اثر
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Filter */}
                <select
                  value={galleryFilterDomain}
                  onChange={(e) => setGalleryFilterDomain(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold text-[#1E2424] dark:text-white focus:outline-none"
                >
                  <option value="all">همه دپارتمان‌ها</option>
                  {content.selectedWorks.map((w) => (
                    <option key={w.id} value={w.id}>{w.shortTitle}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    const targetDomainId = galleryFilterDomain === 'all' ? content.selectedWorks[0].id : galleryFilterDomain;
                    setEditingGalleryItem({
                      domainId: targetDomainId,
                      isNew: true,
                      item: {
                        id: `work-${Date.now()}`,
                        title: 'عنوان اثر جدید',
                        subtitle: 'New Work Subtitle',
                        badge: 'رندر نهایی ۳D',
                        description: 'توضیحات اثر و فرآیند تولید...',
                        imageUrl: '/assets/wonderful-day-hero.webp',
                      },
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن اثر جدید</span>
                </button>
              </div>
            </div>

            {/* Gallery Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.selectedWorks
                .filter((w) => galleryFilterDomain === 'all' || w.id === galleryFilterDomain)
                .flatMap((w) => (w.galleryItems || []).map((item) => ({ domain: w, item })))
                .map(({ domain, item }) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
                  >
                    <div>
                      {/* Media Preview Stage */}
                      <div className="aspect-video w-full bg-[#121616] relative overflow-hidden flex items-center justify-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-10 h-10 text-white/30" />
                        )}
                        {item.videoUrl && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs">
                            <Video className="w-3 h-3 text-[#D6B16A]" />
                            <span>ویدیو مستقیم</span>
                          </div>
                        )}
                        {item.embedUrl && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs">
                            <Globe className="w-3 h-3 text-[#65B7B5]" />
                            <span>Embed</span>
                          </div>
                        )}
                        {item.badge && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#3E777A]/90 text-white text-[10px] font-bold backdrop-blur-xs">
                            {item.badge}
                          </div>
                        )}
                      </div>

                      {/* Info Body */}
                      <div className="p-4 space-y-2 text-right">
                        <span className="text-[10px] font-mono font-bold text-[#3E777A] dark:text-[#65B7B5] block">
                          {domain.shortTitle}
                        </span>
                        <h4 className="text-sm font-bold text-[#1E2424] dark:text-white leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#777A76] dark:text-[#889290] line-clamp-2 leading-relaxed">
                          {item.description || item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="px-4 py-2.5 bg-[#EDE9DF]/50 dark:bg-[#1B2629]/60 border-t border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-between text-xs">
                      <button
                        onClick={() => setEditingGalleryItem({ domainId: domain.id, item, isNew: false })}
                        className="text-[#3E777A] dark:text-[#65B7B5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>ویرایش</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`آیا از حذف اثر «${item.title}» مطمئن هستید؟`)) {
                            updateContent((prev) => ({
                              ...prev,
                              selectedWorks: prev.selectedWorks.map((w) =>
                                w.id === domain.id
                                  ? { ...w, galleryItems: (w.galleryItems || []).filter((g) => g.id !== item.id) }
                                  : w
                              ),
                            }));
                            showToast('اثر با موفقیت از گالری حذف شد');
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>

                  </div>
                ))}
            </div>

            {/* Editing / Adding Gallery Item Modal */}
            {editingGalleryItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="relative w-full max-w-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#DCD6C8] dark:border-[#27363A] pb-3">
                    <h4 className="text-base font-bold text-[#1E2424] dark:text-white">
                      {editingGalleryItem.isNew ? 'افزودن اثر جدید به گالری' : 'ویرایش اثر گالری'}
                    </h4>
                    <button
                      onClick={() => setEditingGalleryItem(null)}
                      className="p-1 text-[#777A76] hover:text-[#1E2424] dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-right">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold block">دپارتمان مربوطه:</label>
                      <select
                        value={editingGalleryItem.domainId}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, domainId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold text-[#1E2424] dark:text-white"
                      >
                        {content.selectedWorks.map((w) => (
                          <option key={w.id} value={w.id}>{w.shortTitle}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">عنوان اثر (Title):</label>
                      <input
                        type="text"
                        value={editingGalleryItem.item.title}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, title: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">زیرعنوان انگلیسی (Subtitle):</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editingGalleryItem.item.subtitle || ''}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, subtitle: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">برچسب یا بج (Badge):</label>
                      <input
                        type="text"
                        value={editingGalleryItem.item.badge || ''}
                        placeholder="مثلاً: رندر نهایی ۳D یا ویدیوی رسمی اثر"
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, badge: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">آدرس تصویر (Image URL):</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          dir="ltr"
                          value={editingGalleryItem.item.imageUrl || ''}
                          onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, imageUrl: e.target.value } })}
                          className="flex-1 px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                        />
                        <label className="px-3 py-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0">
                          <Upload className="w-3 h-3" />
                          <span>آپلود</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUploadAsset(file);
                                if (url) {
                                  setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, imageUrl: url } });
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">آدرس ویدیو مستقیم (mp4 / WebM):</label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="https://...mp4"
                        value={editingGalleryItem.item.videoUrl || ''}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, videoUrl: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">یا آدرس Embed (Aparat / YouTube / Vimeo):</label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="https://www.youtube.com/embed/..."
                        value={editingGalleryItem.item.embedUrl || ''}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, embedUrl: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">توضیحات اثر:</label>
                      <textarea
                        rows={3}
                        value={editingGalleryItem.item.description || ''}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, description: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                      />
                    </div>

                  </div>

                  <div className="pt-3 border-t border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingGalleryItem(null)}
                      className="px-4 py-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] text-xs font-bold transition-colors cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      onClick={() => {
                        const { domainId, item, isNew } = editingGalleryItem;
                        updateContent((prev) => ({
                          ...prev,
                          selectedWorks: prev.selectedWorks.map((w) => {
                            if (w.id === domainId) {
                              const items = w.galleryItems || [];
                              const updatedItems = isNew
                                ? [item, ...items]
                                : items.map((i) => (i.id === item.id ? item : i));
                              return { ...w, galleryItems: updatedItems };
                            }
                            return w;
                          }),
                        }));
                        setEditingGalleryItem(null);
                        showToast(isNew ? 'اثر جدید با موفقیت اضافه شد' : 'تغییرات اثر با موفقیت ذخیره شد');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      تایید و اعمال
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 4: TEAM MEMBERS
           ========================================================================= */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            
            {/* Header + Add button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD6C8] dark:border-[#27363A]">
              <div>
                <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                  مدیریت اعضای تیم و هم‌بنیان‌گذاران
                </h3>
                <span className="text-xs text-[#777A76] dark:text-[#889290]">
                  تعداد کل اعضا: {totalMembers} نفر
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Search */}
                <input
                  type="text"
                  placeholder="جستجو در اعضا..."
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                />

                <button
                  onClick={() => {
                    setEditingMember({
                      isNew: true,
                      member: {
                        id: `member-${Date.now()}`,
                        name: 'نام و نام خانوادگی',
                        nameEn: 'Full Name',
                        initials: 'FN',
                        roleFa: 'نقش تخصصی',
                        roleEn: 'Specialist Role',
                        expertiseFa: 'تخصص‌ها',
                        expertiseEn: 'Expertise',
                        summary: 'بیوگرافی کوتاه و سوابق...',
                        imageUrl: '',
                        isFounder: false,
                        socials: {},
                      },
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن عضو جدید</span>
                </button>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {content.teamMembers
                .filter((m) =>
                  !teamSearchQuery ||
                  m.name.includes(teamSearchQuery) ||
                  m.roleFa.includes(teamSearchQuery) ||
                  m.nameEn.toLowerCase().includes(teamSearchQuery.toLowerCase())
                )
                .map((member) => (
                  <div
                    key={member.id}
                    className="p-4 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all space-y-3 text-right"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-[#EDE9DF] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] shrink-0 flex items-center justify-center">
                        {member.imageUrl ? (
                          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-mono font-bold text-xs text-[#777A76]">{member.initials}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-[#1E2424] dark:text-white truncate">
                            {member.name}
                          </h4>
                          {member.isFounder && (
                            <span className="px-1.5 py-0.2 rounded-md bg-[#D6B16A]/15 text-[#8A6A2A] dark:text-[#E8C27D] text-[9px] font-bold shrink-0">
                              موسس
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#3E777A] dark:text-[#65B7B5] font-semibold block truncate">
                          {member.roleFa}
                        </span>
                        <span className="text-[10px] font-mono text-[#777A76] dark:text-[#889290] truncate block" dir="ltr">
                          {member.nameEn}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#DCD6C8]/60 dark:border-[#27363A]/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setEditingMember({ member, isNew: false })}
                        className="text-[#3E777A] dark:text-[#65B7B5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>ویرایش</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`آیا از حذف «${member.name}» مطمئن هستید؟`)) {
                            updateContent((prev) => ({
                              ...prev,
                              teamMembers: prev.teamMembers.filter((m) => m.id !== member.id),
                            }));
                            showToast('عضو با موفقیت حذف شد');
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>

                  </div>
                ))}
            </div>

            {/* Editing / Adding Member Modal */}
            {editingMember && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="relative w-full max-w-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#DCD6C8] dark:border-[#27363A] pb-3">
                    <h4 className="text-base font-bold text-[#1E2424] dark:text-white">
                      {editingMember.isNew ? 'افزودن عضو جدید به تیم' : 'ویرایش مشخصات عضو'}
                    </h4>
                    <button
                      onClick={() => setEditingMember(null)}
                      className="p-1 text-[#777A76] hover:text-[#1E2424] dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold block">نام و نام خانوادگی (فارسی):</label>
                      <input
                        type="text"
                        value={editingMember.member.name}
                        onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, name: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">نام انگلیسی (Full Name):</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editingMember.member.nameEn}
                        onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, nameEn: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">نقش اصلی (فارسی):</label>
                      <input
                        type="text"
                        value={editingMember.member.roleFa}
                        onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, roleFa: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block">نقش انگلیسی (Role EN):</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editingMember.member.roleEn}
                        onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, roleEn: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold block">آدرس تصویر پرتره چهره:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          dir="ltr"
                          value={editingMember.member.imageUrl || ''}
                          onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, imageUrl: e.target.value } })}
                          className="flex-1 px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                        />
                        <label className="px-3 py-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0">
                          <Upload className="w-3 h-3" />
                          <span>آپلود عکس</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUploadAsset(file);
                                if (url) {
                                  setEditingMember({ ...editingMember, member: { ...editingMember.member, imageUrl: url } });
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold block">بیوگرافی و سوابق حرفه‌ای:</label>
                      <textarea
                        rows={3}
                        value={editingMember.member.summary || ''}
                        onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, summary: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="isFounder"
                        checked={editingMember.member.isFounder || false}
                        onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, isFounder: e.target.checked } })}
                        className="w-4 h-4 rounded text-[#3E777A] focus:ring-0"
                      />
                      <label htmlFor="isFounder" className="text-xs font-bold cursor-pointer">
                        این عضو هم‌بنیان‌گذار / موسس استودیو است
                      </label>
                    </div>

                  </div>

                  <div className="pt-3 border-t border-[#DCD6C8] dark:border-[#27363A] flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingMember(null)}
                      className="px-4 py-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] text-xs font-bold transition-colors cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      onClick={() => {
                        const { member, isNew } = editingMember;
                        updateContent((prev) => ({
                          ...prev,
                          teamMembers: isNew
                            ? [member, ...prev.teamMembers]
                            : prev.teamMembers.map((m) => (m.id === member.id ? member : m)),
                        }));
                        setEditingMember(null);
                        showToast(isNew ? 'عضو جدید اضافه شد' : 'مشخصات عضو ذخیره شد');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      تایید و اعمال
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 5: WONDERFUL DAY CATALOG
           ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6">
              
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    مشخصات انیمیشن سینمایی «روز شگفت‌انگیز»
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    اثر پرچمدار و توسعه IP استودیو
                  </span>
                </div>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all flex items-center gap-2 self-start cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان اثر (فارسی):</label>
                  <input
                    type="text"
                    value={content.wonderfulDayCatalog.titleFa}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, titleFa: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان انگلیسی (Title EN):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.wonderfulDayCatalog.titleEn}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, titleEn: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">ژانر اثر:</label>
                  <input
                    type="text"
                    value={content.wonderfulDayCatalog.genre}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, genre: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">مخاطب اثر:</label>
                  <input
                    type="text"
                    value={content.wonderfulDayCatalog.audience}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, audience: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

              </div>

              {/* Logline */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold block">لاگ‌لاین و خلاصه داستان انیمیشن:</label>
                <textarea
                  rows={4}
                  value={content.wonderfulDayCatalog.loglineFa}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, loglineFa: val },
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                />
              </div>

              {/* Upcoming IP Slate */}
              <div className="space-y-3 text-right pt-4 border-t border-[#DCD6C8] dark:border-[#27363A]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">
                      آثار و پروژه‌های در دست توسعه استودیو (Upcoming IP Slate)
                    </h4>
                    <span className="text-xs text-[#777A76] dark:text-[#889290]">
                      پروژه‌هایی که در نوار پایین دپارتمان انیمیشن نمایش داده می‌شوند
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      updateContent((prev) => ({
                        ...prev,
                        wonderfulDayCatalog: {
                          ...prev.wonderfulDayCatalog,
                          upcomingProjects: [
                            ...prev.wonderfulDayCatalog.upcomingProjects,
                            { titleFa: 'پروژه جدید', titleEn: 'New Project', year: '۱۴۰۵', format: 'سینمایی' },
                          ],
                        },
                      }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] hover:bg-[#3E777A] hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>افزودن اثر</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {content.wonderfulDayCatalog.upcomingProjects.map((proj, pIdx) => (
                    <div key={pIdx} className="p-3 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 w-full">
                        <input
                          type="text"
                          value={proj.titleFa}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const newProj = [...prev.wonderfulDayCatalog.upcomingProjects];
                              newProj[pIdx].titleFa = val;
                              return { ...prev, wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, upcomingProjects: newProj } };
                            });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold text-[#1E2424] dark:text-white"
                          placeholder="عنوان فارسی"
                        />
                        <input
                          type="text"
                          dir="ltr"
                          value={proj.titleEn}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const newProj = [...prev.wonderfulDayCatalog.upcomingProjects];
                              newProj[pIdx].titleEn = val;
                              return { ...prev, wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, upcomingProjects: newProj } };
                            });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                          placeholder="Title EN"
                        />
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const newProj = [...prev.wonderfulDayCatalog.upcomingProjects];
                              newProj[pIdx].year = val;
                              return { ...prev, wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, upcomingProjects: newProj } };
                            });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                          placeholder="سال انتشار"
                        />
                        <input
                          type="text"
                          value={proj.format}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const newProj = [...prev.wonderfulDayCatalog.upcomingProjects];
                              newProj[pIdx].format = val;
                              return { ...prev, wonderfulDayCatalog: { ...prev.wonderfulDayCatalog, upcomingProjects: newProj } };
                            });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                          placeholder="فرمت"
                        />
                      </div>
                      <button
                        onClick={() => {
                          updateContent((prev) => ({
                            ...prev,
                            wonderfulDayCatalog: {
                              ...prev.wonderfulDayCatalog,
                              upcomingProjects: prev.wonderfulDayCatalog.upcomingProjects.filter((_, idx) => idx !== pIdx),
                            },
                          }));
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer self-end sm:self-center"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 6: INQUIRIES INBOX
           ========================================================================= */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#DCD6C8] dark:border-[#27363A]">
              <div>
                <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                  صندوق پیام‌ها و درخواست‌های همکاری
                </h3>
                <span className="text-xs text-[#777A76] dark:text-[#889290]">
                  پیام‌های ثبت‌شده از طریق فرم «استعلام پروژه» در سایت
                </span>
              </div>
              <button
                onClick={fetchInquiries}
                disabled={loadingInquiries}
                className="px-3.5 py-1.5 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
                <span>بروزرسانی پیام‌ها</span>
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-3">
                <Inbox className="w-12 h-12 mx-auto text-[#777A76]/50" />
                <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">هیچ پیامی ثبت نشده است</h4>
                <p className="text-xs text-[#777A76] dark:text-[#889290]">
                  هنگامی که مخاطبی در سایت روی دکمه «شروع همکاری / استعلام» کلیک کرده و فرم را ارسال کند، پیامش در اینجا نمایش داده می‌شود.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq: any, idx: number) => (
                  <div
                    key={inq.id || idx}
                    className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-3 text-right shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCD6C8]/60 dark:border-[#27363A]/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1E2424] dark:text-white">
                          {inq.name || 'بدون نام'}
                        </span>
                        {inq.code && (
                          <span className="px-2 py-0.5 rounded-md bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] font-mono text-[10px] font-bold">
                            {inq.code}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-[#EDE9DF] dark:bg-[#1B2629] text-[10px] text-[#777A76] font-semibold">
                          {inq.project || 'عمومی'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777A76] font-mono" dir="ltr">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleString('fa-IR') : 'به تازگی'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#777A76] block mb-0.5">اطلاعات تماس:</span>
                        <span className="font-mono font-bold text-[#1E2424] dark:text-white select-all">
                          {inq.contact || 'ثبت نشده'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#777A76] block mb-0.5">متن پیام:</span>
                        <p className="text-[#1E2424] dark:text-[#FAF8F4] leading-relaxed">
                          {inq.message || inq.description || 'بدون متن'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 7: SEO & GOOGLE SERP SIMULATOR
           ========================================================================= */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                  تنظیمات سئو، کلمات کلیدی و پیش‌نمایش در گوگل
                </h3>
                <span className="text-xs text-[#777A76] dark:text-[#889290]">
                  تنظیم دقیق متاتگ‌ها و نحوه نمایش در موتورهای جستجو
                </span>
              </div>
              <button
                onClick={handleSaveAll}
                className="px-4 py-2 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white text-xs font-bold transition-all flex items-center gap-2 self-start cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره متاتگ‌ها</span>
              </button>
            </div>

            {/* Google SERP Live Simulation Widget */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#DCD6C8] dark:border-[#333] shadow-md space-y-3 text-right">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3E777A] text-white text-[11px] font-bold flex items-center justify-center">
                    G
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    شبیه‌ساز پیش‌نمایش در نتایج گوگل (Google Search SERP Preview)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Google Rich Snippet
                </span>
              </div>

              {/* Realistic Google SERP Card */}
              <div className="max-w-2xl py-2 space-y-1 select-none">
                {/* Breadcrumb URL */}
                <div className="flex items-center gap-2 text-xs text-[#202124] dark:text-[#BDC1C6]" dir="ltr">
                  <div className="w-4 h-4 rounded-full bg-[#3E777A] text-white text-[8px] flex items-center justify-center font-bold">
                    A
                  </div>
                  <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
                    {content.seo.siteUrl}
                  </span>
                  <span className="text-gray-400">›</span>
                  <span className="text-[11px] text-gray-500">fa</span>
                </div>

                {/* Clickable Blue Google Link */}
                <h4 className="text-base sm:text-xl font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                  {content.seo.siteTitle}
                </h4>

                {/* Snippet Description */}
                <p className="text-xs sm:text-[13px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-2">
                  {content.seo.description}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-[#777A76] flex items-center justify-between border-t border-gray-100 dark:border-neutral-800">
                <span>تعداد کاراکتر عنوان: <strong className="font-mono">{content.seo.siteTitle.length}</strong> (بهینه: زیر ۶۰ کاراکتر)</span>
                <span>تعداد کاراکتر توضیحات: <strong className="font-mono">{content.seo.description.length}</strong> (بهینه: ۱۲۰ تا ۱۶۰ کاراکتر)</span>
              </div>
            </div>

            {/* SEO Form Inputs */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-5 text-right">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                  عنوان اصلی وب‌سایت در گوگل (Site Title):
                </label>
                <input
                  type="text"
                  value={content.seo.siteTitle}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, siteTitle: val },
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                  توضیحات متا برای موتورهای جستجو (Meta Description):
                </label>
                <textarea
                  rows={3}
                  value={content.seo.description}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, description: val },
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-sm text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A] leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                  کلمات کلیدی اصلی سئو (Meta Keywords - با کاما جدا کنید):
                </label>
                <input
                  type="text"
                  value={content.seo.keywords}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, keywords: val },
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                    آدرس دامنه رسمی (Canonical URL):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.seo.siteUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, siteUrl: val },
                      }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E2424] dark:text-[#F2EFE9] block">
                    تصویر اشتراک‌گذاری شبکه‌های اجتماعی (OG Image):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.seo.ogImage}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, ogImage: val },
                      }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white focus:outline-none focus:border-[#3E777A]"
                  />
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 8: BACKUP & DATA RECOVERY
           ========================================================================= */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            
            <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4">
              <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                پشتیبان‌گیری، خروجی JSON و مدیریت داده‌ها
              </h3>
              <span className="text-xs text-[#777A76] dark:text-[#889290]">
                دریافت و ذخیره فایل‌های محتوایی برای نگهداری، انتقال یا بازیابی
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Export Backup Card */}
              <div className="p-6 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-4 text-right flex flex-col justify-between shadow-2xs">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] flex items-center justify-center">
                    <Download className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E2424] dark:text-white">
                    دانلود پشتیبان کامل محتوا
                  </h4>
                  <p className="text-xs text-[#777A76] dark:text-[#889290] leading-relaxed">
                    یک نسخه کامل از تمام متون، دپارتمان‌ها، آثار گالری، اعضا و سئو در قالب فایل JSON استاندارد دانلود می‌شود.
                  </p>
                </div>
                <button
                  onClick={handleDownloadBackup}
                  className="w-full py-3 rounded-xl bg-[#3E777A] hover:bg-[#326265] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود فایل JSON</span>
                </button>
              </div>

              {/* Import Backup Card */}
              <div className="p-6 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-4 text-right flex flex-col justify-between shadow-2xs">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E2424] dark:text-white">
                    بازیابی از فایل پشتیبان
                  </h4>
                  <p className="text-xs text-[#777A76] dark:text-[#889290] leading-relaxed">
                    بارگذاری فایل JSON پشتیبانی که قبلاً دانلود کرده‌اید برای بازگردانی سریع کلیه محتویات سایت.
                  </p>
                </div>
                <label className="w-full py-3 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] dark:border-[#27363A] font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
                  <Upload className="w-4 h-4" />
                  <span>انتخاب فایل پشتیبان</span>
                  <input
                    type="file"
                    ref={backupImportRef}
                    accept=".json"
                    className="hidden"
                    onChange={handleImportBackup}
                  />
                </label>
              </div>

              {/* Factory Reset Card */}
              <div className="p-6 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-4 text-right flex flex-col justify-between shadow-2xs">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E2424] dark:text-white">
                    بازنشانی به حالت کارخانه
                  </h4>
                  <p className="text-xs text-[#777A76] dark:text-[#889290] leading-relaxed">
                    بازگرداندن تمام داده‌ها به حالت اولیه پیش‌فرض استودیو و پاک‌سازی هرگونه ویرایش انجام‌شده.
                  </p>
                </div>
                <button
                  onClick={handleResetFactory}
                  className="w-full py-3 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-rose-500/30"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>بازنشانی به تنظیمات کارخانه</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};
