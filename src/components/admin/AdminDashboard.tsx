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
  ChevronLeft,
  ChevronDown,
  X,
  FileText,
  Globe,
  Smartphone,
  Camera,
  Coins,
  TrendingUp,
  Sliders,
  Compass,
  MapPin,
  Mail,
  Phone,
  Code,
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

// Hierarchical Navigation Menu Structure
type NavSection =
  | 'overview'
  // Home Page Sections
  | 'home-hero'
  | 'home-spotlight'
  | 'home-capabilities'
  | 'home-footer'
  // 5 Specific Domains
  | 'domain-wonderful-day'
  | 'domain-commercial-cgi'
  | 'domain-vfx-mapping'
  | 'domain-web3-nft'
  | 'domain-game-lab'
  // Display Types Hub
  | 'display-widescreen'
  | 'display-mobile-vertical'
  | 'display-stage-photo'
  | 'display-posters'
  | 'display-tokens'
  | 'display-stats'
  // Team, Inquiries, SEO, Backup
  | 'team'
  | 'inbox'
  | 'seo'
  | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [content, setContent] = useState<StudioContent>(() => getStudioContent());
  const [currentNav, setCurrentNav] = useState<NavSection>('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Group Collapsing States
  const [openGroups, setOpenGroups] = useState({
    home: true,
    domains: true,
    displayTypes: true,
    system: true,
  });

  const toggleGroup = (key: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Editing Modals / States
  const [editingGalleryItem, setEditingGalleryItem] = useState<{ domainId: string; item: DomainGalleryItem; isNew?: boolean } | null>(null);
  const [editingMember, setEditingMember] = useState<{ member: TeamMember; isNew?: boolean } | null>(null);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');

  // Inquiries
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  const backupImportRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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
      // Local fallback
    }
    try {
      const local = localStorage.getItem('amh-inquiries') || localStorage.getItem('amh_inquiries');
      if (local) setInquiries(JSON.parse(local));
    } catch {
      // Ignore
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (currentNav === 'inbox') fetchInquiries();
  }, [currentNav]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const result = await saveStudioContent(content);
      setHasUnsavedChanges(false);
      if (result.diskSaved) {
        showToast('✓ تمام تغییرات با موفقیت روی فایل‌های پروژه ذخیره شد');
      } else {
        showToast('✓ تغییرات در حافظه مرورگر ذخیره و روی پیش‌نمایش اعمال شد');
      }
    } catch {
      showToast('خطا در ذخیره‌سازی داده‌ها');
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (updater: (prev: StudioContent) => StudioContent) => {
    setContent((prev) => {
      const next = updater(prev);
      setHasUnsavedChanges(true);
      return next;
    });
  };

  // Upload Asset Helper
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
              showToast(`تصویر با موفقیت در پروژه ذخیره شد`);
              resolve(data.url);
              return;
            }
          }
        } catch {
          // Fallback
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
    downloadAnchor.setAttribute('download', `artamad-content-${new Date().toISOString().split('T')[0]}.json`);
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
          showToast('فایل پشتیبان با موفقیت بارگذاری شد. لطفاً دکمه ذخیره را بزنید.');
        } else {
          showToast('ساختار فایل معتبر نیست');
        }
      } catch {
        showToast('خطا در خواندن فایل JSON');
      }
    };
    reader.readAsText(file);
  };

  // Factory Reset
  const handleResetFactory = async () => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید تمام داده‌ها را به مقادیر اولیه کارخانه بازنشانی کنید؟')) {
      const def = await resetStudioContentToDefault();
      setContent(def);
      setHasUnsavedChanges(false);
      showToast('تمام داده‌ها با موفقیت به مقادیر اولیه بازنشانی شدند');
    }
  };

  // Helper to get domain work
  const getDomainWork = (id: string): ProjectWork => {
    return content.selectedWorks.find((w) => w.id === id) || content.selectedWorks[0];
  };

  // Calculate stats
  const totalGalleryItems = content.selectedWorks.reduce((acc, w) => acc + (w.galleryItems?.length || 0), 0);
  const totalMembers = content.teamMembers.length;

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
      <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 dark:bg-[#151E20]/95 backdrop-blur-md border-b border-[#DCD6C8] dark:border-[#27363A] px-4 sm:px-6 lg:px-8 py-3 transition-colors">
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
                  PRO STUDIO CMS
                </span>
              </div>
              <span className="text-[11px] text-[#777A76] dark:text-[#889290]">
                تفکیک دقیق بخش‌های وبسایت و انواع نمایش رسانه‌ها
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white dark:hover:bg-[#65B7B5] dark:hover:text-[#1E2424] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>مشاهده زنده سایت</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

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

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-[#1E2424] dark:text-[#F2EFE9] hover:text-[#3E777A] transition-colors cursor-pointer"
              aria-label="تغییر تم"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

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

      {/* Main Layout: 2-Column with Categorized Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* =========================================================================
            RIGHT SIDEBAR: CATEGORIZED NAVIGATION MENU
           ========================================================================= */}
        <aside className="w-full lg:w-72 shrink-0 bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-3xl p-4 shadow-sm space-y-4">
          
          {/* Group 0: Overview */}
          <div>
            <button
              onClick={() => setCurrentNav('overview')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentNav === 'overview'
                  ? 'bg-[#3E777A] text-white shadow-xs'
                  : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF] dark:hover:bg-[#1B2629]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>داشبورد و آمار کلی</span>
              </div>
            </button>
          </div>

          {/* Group 1: Home Page Sections */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('home')}
              className="w-full px-3 py-1.5 flex items-center justify-between text-xs font-bold text-[#777A76] dark:text-[#889290] hover:text-[#1E2424] dark:hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#3E777A]" />
                <span>بخش‌های صفحه اصلی</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openGroups.home ? '' : '-rotate-90'}`} />
            </button>

            {openGroups.home && (
              <div className="space-y-0.5 pr-2 border-r-2 border-[#DCD6C8] dark:border-[#27363A]">
                <button
                  onClick={() => setCurrentNav('home-hero')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'home-hero'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>هدر و تیزر ویدیویی هیرو</span>
                </button>

                <button
                  onClick={() => setCurrentNav('home-spotlight')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'home-spotlight'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ویترین «روز شگفت‌انگیز» و اسلایدها</span>
                </button>

                <button
                  onClick={() => setCurrentNav('home-capabilities')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'home-capabilities'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>ارکان و توانمندی‌های استودیو</span>
                </button>

                <button
                  onClick={() => setCurrentNav('home-footer')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'home-footer'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>پاورقی، راه‌های تماس و آدرس</span>
                </button>
              </div>
            )}
          </div>

          {/* Group 2: 5 Specialized Studio Domains */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('domains')}
              className="w-full px-3 py-1.5 flex items-center justify-between text-xs font-bold text-[#777A76] dark:text-[#889290] hover:text-[#1E2424] dark:hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#3E777A]" />
                <span>۵ دپارتمان تخصصی استودیو</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openGroups.domains ? '' : '-rotate-90'}`} />
            </button>

            {openGroups.domains && (
              <div className="space-y-0.5 pr-2 border-r-2 border-[#DCD6C8] dark:border-[#27363A]">
                <button
                  onClick={() => setCurrentNav('domain-wonderful-day')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'domain-wonderful-day'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5 text-[#D6B16A]" />
                  <span>۱. انیمیشن و توسعه IP</span>
                </button>

                <button
                  onClick={() => setCurrentNav('domain-commercial-cgi')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'domain-commercial-cgi'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#3E777A]" />
                  <span>۲. تیزر تبلیغاتی و CGI</span>
                </button>

                <button
                  onClick={() => setCurrentNav('domain-vfx-mapping')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'domain-vfx-mapping'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-sky-600" />
                  <span>۳. ویدیو مپینگ و اجرای زنده</span>
                </button>

                <button
                  onClick={() => setCurrentNav('domain-web3-nft')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'domain-web3-nft'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>۴. اکوسیستم وب۳ و NFT</span>
                </button>

                <button
                  onClick={() => setCurrentNav('domain-game-lab')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'domain-game-lab'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-teal-600" />
                  <span>۵. آزمایشگاه بازی و سرگرمی</span>
                </button>
              </div>
            )}
          </div>

          {/* Group 3: Display Types Hub (انواع روش‌های نمایش محتوا) */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('displayTypes')}
              className="w-full px-3 py-1.5 flex items-center justify-between text-xs font-bold text-[#777A76] dark:text-[#889290] hover:text-[#1E2424] dark:hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#3E777A]" />
                <span>انواع نمایش محتوا (Display Types)</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openGroups.displayTypes ? '' : '-rotate-90'}`} />
            </button>

            {openGroups.displayTypes && (
              <div className="space-y-0.5 pr-2 border-r-2 border-[#DCD6C8] dark:border-[#27363A]">
                <button
                  onClick={() => setCurrentNav('display-widescreen')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'display-widescreen'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>پلیرهای عریض ۱۶:۹ سینمایی</span>
                </button>

                <button
                  onClick={() => setCurrentNav('display-mobile-vertical')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'display-mobile-vertical'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>اسکرین‌شات‌های عمودی ۹:۱۶ موبایل</span>
                </button>

                <button
                  onClick={() => setCurrentNav('display-stage-photo')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'display-stage-photo'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>قاب‌های عکاسی صحنه و معماری</span>
                </button>

                <button
                  onClick={() => setCurrentNav('display-posters')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'display-posters'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>پوستر رسمی ۳:۴ و بنرهای پانوراما</span>
                </button>

                <button
                  onClick={() => setCurrentNav('display-tokens')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'display-tokens'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>استند توکن‌های سه‌بعدی کاراکتر</span>
                </button>

                <button
                  onClick={() => setCurrentNav('display-stats')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'display-stats'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>باکس‌های آمار و شاخص‌های عددی</span>
                </button>
              </div>
            )}
          </div>

          {/* Group 4: Human Capital & Tools */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('system')}
              className="w-full px-3 py-1.5 flex items-center justify-between text-xs font-bold text-[#777A76] dark:text-[#889290] hover:text-[#1E2424] dark:hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#3E777A]" />
                <span>تیم، ابزارها و سئو</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openGroups.system ? '' : '-rotate-90'}`} />
            </button>

            {openGroups.system && (
              <div className="space-y-0.5 pr-2 border-r-2 border-[#DCD6C8] dark:border-[#27363A]">
                <button
                  onClick={() => setCurrentNav('team')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    currentNav === 'team'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>اعضای تیم استودیو</span>
                  </div>
                  <span className="font-mono text-[10px]">{totalMembers}</span>
                </button>

                <button
                  onClick={() => setCurrentNav('inbox')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    currentNav === 'inbox'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Inbox className="w-3.5 h-3.5" />
                    <span>صندوق پیام‌های تماس</span>
                  </div>
                  {inquiries.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold">
                      {inquiries.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentNav('seo')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'seo'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>سئو و شبیه‌ساز گوگل SERP</span>
                </button>

                <button
                  onClick={() => setCurrentNav('backup')}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentNav === 'backup'
                      ? 'bg-[#3E777A]/15 text-[#2E5A5C] dark:text-[#65B7B5] font-bold'
                      : 'text-[#434846] dark:text-[#A8B2B0] hover:bg-[#EDE9DF]/60 dark:hover:bg-[#1B2629]'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>پشتیبان‌گیری و خروجی داده</span>
                </button>
              </div>
            )}
          </div>

        </aside>

        {/* =========================================================================
            LEFT COLUMN: DYNAMIC CONTENT PANEL
           ========================================================================= */}
        <main className="flex-1 w-full space-y-6">

          {/* 1. OVERVIEW */}
          {currentNav === 'overview' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">دپارتمان‌های ۵ گانه</span>
                    <span className="text-3xl font-black text-[#1E2424] dark:text-[#FAF8F4] farsi-nums">۵</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] flex items-center justify-center">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">کل آثار و شات‌ها</span>
                    <span className="text-3xl font-black text-[#1E2424] dark:text-[#FAF8F4] farsi-nums">{totalGalleryItems}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Film className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">اعضای ثبت‌شده تیم</span>
                    <span className="text-3xl font-black text-[#1E2424] dark:text-[#FAF8F4] farsi-nums">{totalMembers}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#777A76] dark:text-[#889290] font-semibold block mb-1">انواع نمایش رسانه</span>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 farsi-nums">۸ نوع</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Display Types Map Callout */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1E2424] dark:text-white">
                      نقشه روش‌های متنوع نمایش محتوا در وب‌سایت
                    </h3>
                    <p className="text-xs text-[#777A76] dark:text-[#889290]">
                      روی هر نوع نمایش کلیک کنید تا وارد بخش مدیریت و تنظیمات اختصاصی آن شوید:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div onClick={() => setCurrentNav('display-widescreen')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <Video className="w-5 h-5 text-[#3E777A]" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">پلیر عریض ۱۶:۹</h4>
                    <span className="text-[10px] text-[#777A76] block">تیزرها و شات‌های سینمایی</span>
                  </div>

                  <div onClick={() => setCurrentNav('display-mobile-vertical')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <Smartphone className="w-5 h-5 text-teal-600" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">اسکرین‌شات ۹:۱۶</h4>
                    <span className="text-[10px] text-[#777A76] block">بازی موبایل و فرمت ریلز</span>
                  </div>

                  <div onClick={() => setCurrentNav('display-stage-photo')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <Camera className="w-5 h-5 text-sky-600" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">عکاسی صحنه سعدآباد</h4>
                    <span className="text-[10px] text-[#777A76] block">کپشن‌های تخصصی معماری</span>
                  </div>

                  <div onClick={() => setCurrentNav('display-posters')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <FileText className="w-5 h-5 text-[#D6B16A]" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">پوستر عمودی ۳:۴</h4>
                    <span className="text-[10px] text-[#777A76] block">پوستر رسمی روز شگفت‌انگیز</span>
                  </div>

                  <div onClick={() => setCurrentNav('display-tokens')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">استند توکن‌های ۳D</h4>
                    <span className="text-[10px] text-[#777A76] block">توکن پویو و پدربزرگ</span>
                  </div>

                  <div onClick={() => setCurrentNav('display-stats')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">باکس‌های آمار شاخص</h4>
                    <span className="text-[10px] text-[#777A76] block">۹۳ دقیقه بازی روزانه</span>
                  </div>

                  <div onClick={() => setCurrentNav('home-spotlight')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <Sparkles className="w-5 h-5 text-[#3E777A]" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">اسلایدشو کانسپت</h4>
                    <span className="text-[10px] text-[#777A76] block">۴ اسلاید کانسپت‌آرت فیلم</span>
                  </div>

                  <div onClick={() => setCurrentNav('home-capabilities')} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] hover:border-[#3E777A] border border-[#DCD6C8] dark:border-[#27363A] cursor-pointer transition-all space-y-1.5 text-right">
                    <Sliders className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xs font-bold text-[#1E2424] dark:text-white">کارت‌های ۵ گانه توانمندی</h4>
                    <span className="text-[10px] text-[#777A76] block">ارکان راهبردی استودیو</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 2. HOME: HERO & 21:9 VIDEO PLAYER */}
          {currentNav === 'home-hero' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    تنظیمات هدر و پلیر هیرو (Hero Section)
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    بخش ورودی بالای سایت و پلیر تیزر سینمایی
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              {/* Live Miniature Preview */}
              <div className="p-4 rounded-2xl bg-[#EDE9DF]/70 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-3">
                <span className="text-xs font-bold text-[#3E777A] block">پیش‌نمایش شماتیک هیرو:</span>
                <div className="flex items-center justify-between border-b border-[#DCD6C8] pb-2 text-xs">
                  <h4 className="text-lg font-black text-[#1E2424] dark:text-white">{content.home.hero.titleFa}</h4>
                  <div className="flex items-center gap-1.5">
                    {content.home.hero.badges.map((b, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] text-[10px] font-semibold">{b}</span>
                    ))}
                  </div>
                </div>

                <div className="aspect-[21/9] max-h-48 w-full bg-black rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img src={content.home.hero.posterUrl} alt="Hero Teaser" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF8F4] text-[#3E777A] flex items-center justify-center shadow-lg">
                      <Film className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان استودیو (فارسی):</label>
                  <input
                    type="text"
                    value={content.home.hero.titleFa}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, titleFa: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان استودیو (انگلیسی):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.home.hero.titleEn}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, titleEn: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان تیزر هیرو:</label>
                  <input
                    type="text"
                    value={content.home.hero.teaserTitle}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, teaserTitle: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">ژانر اثر:</label>
                  <input
                    type="text"
                    value={content.home.hero.teaserGenre}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, teaserGenre: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold block">تصویر کاور هیرو (Poster 16:9):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      dir="ltr"
                      value={content.home.hero.posterUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, posterUrl: val } } }));
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                    />
                    <label className="px-3 py-2 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>آپلود تصویر</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleUploadAsset(file);
                            if (url) {
                              updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, posterUrl: url } } }));
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold block">لینک مستقیم فایل ویدیو (mp4):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.home.hero.videoUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, hero: { ...prev.home.hero, videoUrl: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. HOME: FLAGSHIP SPOTLIGHT & CONCEPT SLIDES */}
          {currentNav === 'home-spotlight' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    ویترین انیمیشن سینمایی «روز شگفت‌انگیز» و اسلایدها
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    بخش دوم صفحه اصلی؛ اسلایدشوی کانسپت‌آرت و لاگ‌لاین رسمی
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              {/* 4 Slides Gallery Manager */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#3E777A] block">اسلایدهای کانسپت‌آرت (Concept Slides):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.home.flagshipSpotlight.slides.map((slide, sIdx) => (
                    <div key={slide.id} className="p-3.5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-2.5">
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative">
                        <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                          اسلاید ۰{sIdx + 1}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={slide.caption || ''}
                          placeholder="کپشن اسلاید..."
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const newSlides = [...prev.home.flagshipSpotlight.slides];
                              newSlides[sIdx].caption = val;
                              return { ...prev, home: { ...prev.home, flagshipSpotlight: { ...prev.home.flagshipSpotlight, slides: newSlides } } };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-bold text-[#1E2424] dark:text-white"
                        />
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            dir="ltr"
                            value={slide.url}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const newSlides = [...prev.home.flagshipSpotlight.slides];
                                newSlides[sIdx].url = val;
                                return { ...prev, home: { ...prev.home, flagshipSpotlight: { ...prev.home.flagshipSpotlight, slides: newSlides } } };
                              });
                            }}
                            className="flex-1 px-2.5 py-1 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] text-[11px] font-mono text-[#1E2424] dark:text-white"
                          />
                          <label className="p-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] text-xs cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleUploadAsset(file);
                                  if (url) {
                                    updateContent((prev) => {
                                      const newSlides = [...prev.home.flagshipSpotlight.slides];
                                      newSlides[sIdx].url = url;
                                      return { ...prev, home: { ...prev.home, flagshipSpotlight: { ...prev.home.flagshipSpotlight, slides: newSlides } } };
                                    });
                                  }
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logline & Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold block">لاگ‌لاین انیمیشن روز شگفت‌انگیز:</label>
                <textarea
                  rows={3}
                  value={content.home.flagshipSpotlight.logline}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateContent((prev) => ({
                      ...prev,
                      home: { ...prev.home, flagshipSpotlight: { ...prev.home.flagshipSpotlight, logline: val } },
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* 4. HOME: CAPABILITIES & PILLARS */}
          {currentNav === 'home-capabilities' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    ۵ توانمندی راهبردی و ارکان هویتی استودیو
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    بخش فلسفه و شایستگی‌های محوری در صفحه اصلی
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.home.capabilities.map((cap, cIdx) => (
                  <div key={cap.num} className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#DCD6C8] pb-2">
                      <span className="font-mono font-bold text-sm text-[#3E777A]">{cap.num}</span>
                      <input
                        type="text"
                        dir="ltr"
                        value={cap.en}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => {
                            const newCaps = [...prev.home.capabilities];
                            newCaps[cIdx].en = val;
                            return { ...prev, home: { ...prev.home, capabilities: newCaps } };
                          });
                        }}
                        className="px-2 py-0.5 rounded bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] text-[10px] font-mono text-left w-36"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold block">عنوان فارسی:</label>
                      <input
                        type="text"
                        value={cap.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => {
                            const newCaps = [...prev.home.capabilities];
                            newCaps[cIdx].title = val;
                            return { ...prev, home: { ...prev.home, capabilities: newCaps } };
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] text-xs font-bold text-[#1E2424] dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold block">کلیدواژه‌ها (با کاما جدا کنید):</label>
                      <input
                        type="text"
                        value={cap.keywords.join(' · ')}
                        onChange={(e) => {
                          const val = e.target.value.split('·').map((s) => s.trim()).filter(Boolean);
                          updateContent((prev) => {
                            const newCaps = [...prev.home.capabilities];
                            newCaps[cIdx].keywords = val;
                            return { ...prev, home: { ...prev.home, capabilities: newCaps } };
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. HOME: FOOTER & CONTACT INFO */}
          {currentNav === 'home-footer' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    پاورقی، راه‌های تماس و آدرس استودیو
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    بخش انتهایی سایت و لینک‌های شبکه‌های اجتماعی
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold block">آدرس رسمی کارخانه نوآوری:</label>
                  <input
                    type="text"
                    value={content.home.footer.address}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, footer: { ...prev.home.footer, address: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">ایمیل استودیو:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.home.footer.email}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, footer: { ...prev.home.footer, email: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">لینک گوگل مپ (Google Maps):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.home.footer.googleMapsUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, footer: { ...prev.home.footer, googleMapsUrl: val } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">اینستاگرام:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.home.footer.socials.instagram}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, footer: { ...prev.home.footer, socials: { ...prev.home.footer.socials, instagram: val } } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">لینکدین:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={content.home.footer.socials.linkedin}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, home: { ...prev.home, footer: { ...prev.home.footer, socials: { ...prev.home.footer.socials, linkedin: val } } } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 6. INDIVIDUAL DOMAINS (1 to 5) */}
          {currentNav.startsWith('domain-') && (() => {
            const domainId = currentNav.replace('domain-', '');
            const domain = getDomainWork(domainId);
            return (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
                <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                      دپارتمان: {domain.title}
                    </h3>
                    <span className="text-xs text-[#777A76] dark:text-[#889290]">
                      شناسه اختصاصی: <code className="font-mono text-[#3E777A]">{domain.id}</code>
                    </span>
                  </div>
                  <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                    <Save className="w-3.5 h-3.5" />
                    <span>ذخیره تغییرات</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">عنوان کامل دپارتمان:</label>
                    <input
                      type="text"
                      value={domain.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateContent((prev) => ({
                          ...prev,
                          selectedWorks: prev.selectedWorks.map((w) => (w.id === domain.id ? { ...w, title: val } : w)),
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold block">عنوان کوتاه (برای منوها):</label>
                    <input
                      type="text"
                      value={domain.shortTitle || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateContent((prev) => ({
                          ...prev,
                          selectedWorks: prev.selectedWorks.map((w) => (w.id === domain.id ? { ...w, shortTitle: val } : w)),
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold block">خلاصه کارت صفحه اول:</label>
                    <textarea
                      rows={2}
                      value={domain.shortSummary || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateContent((prev) => ({
                          ...prev,
                          selectedWorks: prev.selectedWorks.map((w) => (w.id === domain.id ? { ...w, shortSummary: val } : w)),
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold block">توضیحات تفصیلی صفحه اختصاصی:</label>
                    <textarea
                      rows={4}
                      value={domain.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateContent((prev) => ({
                          ...prev,
                          selectedWorks: prev.selectedWorks.map((w) => (w.id === domain.id ? { ...w, description: val } : w)),
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                    />
                  </div>
                </div>

                {/* Sub-gallery items belonging to this specific domain */}
                <div className="pt-4 border-t border-[#DCD6C8] dark:border-[#27363A] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">
                        آثار و شات‌های این دپارتمان ({domain.galleryItems?.length || 0} مورد)
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        setEditingGalleryItem({
                          domainId: domain.id,
                          isNew: true,
                          item: {
                            id: `${domain.id}-item-${Date.now()}`,
                            title: 'عنوان اثر جدید',
                            subtitle: 'Work Subtitle',
                            badge: 'رندر نهایی ۳D',
                            description: 'توضیحات فرآیند تولید اثر...',
                            imageUrl: '/assets/wonderful-day-hero.webp',
                          },
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#3E777A]/10 text-[#3E777A] dark:text-[#65B7B5] hover:bg-[#3E777A] hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>افزودن اثر جدید</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(domain.galleryItems || []).map((item) => (
                      <div key={item.id} className="p-3 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] flex flex-col justify-between space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                          {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#3E777A] block">{item.badge || 'اثر استودیو'}</span>
                          <h5 className="text-xs font-bold text-[#1E2424] dark:text-white truncate">{item.title}</h5>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-[#DCD6C8]/60 text-xs">
                          <button
                            onClick={() => setEditingGalleryItem({ domainId: domain.id, item, isNew: false })}
                            className="text-[#3E777A] dark:text-[#65B7B5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>ویرایش</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`حذف «${item.title}»؟`)) {
                                updateContent((prev) => ({
                                  ...prev,
                                  selectedWorks: prev.selectedWorks.map((w) =>
                                    w.id === domain.id ? { ...w, galleryItems: (w.galleryItems || []).filter((g) => g.id !== item.id) } : w
                                  ),
                                }));
                              }
                            }}
                            className="text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 7. DISPLAY TYPES: WIDESCREEN 16:9 VIDEOS */}
          {currentNav === 'display-widescreen' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    نوع نمایش ۱: ویدیوها و تیزرهای عریض ۱۶:۹ سینمایی
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    تمام آثاری که دارای ویدیوی مستقیم یا تیزر با پلیر اختصاصی هستند
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.selectedWorks
                  .flatMap((w) => (w.galleryItems || []).filter((i) => Boolean(i.videoUrl)).map((item) => ({ domain: w, item })))
                  .map(({ domain, item }) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-3">
                      <div className="aspect-video w-full rounded-xl bg-black overflow-hidden relative flex items-center justify-center">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#FAF8F4] text-[#3E777A] flex items-center justify-center shadow-lg">
                            <Video className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#3E777A]">{domain.shortTitle} · {item.badge || 'تیزر'}</span>
                        <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">{item.title}</h4>
                        <span className="text-xs text-[#777A76] font-mono block truncate" dir="ltr">{item.videoUrl}</span>
                      </div>
                      <div className="pt-2 border-t border-[#DCD6C8]/60 flex items-center justify-between text-xs">
                        <button
                          onClick={() => setEditingGalleryItem({ domainId: domain.id, item, isNew: false })}
                          className="text-[#3E777A] dark:text-[#65B7B5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>ویرایش ویدیو و پوستر</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 8. DISPLAY TYPES: VERTICAL 9:16 MOBILE SCREENSHOTS */}
          {currentNav === 'display-mobile-vertical' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    نوع نمایش ۲: اسکرین‌شات‌های عمودی ۹:۱۶ بازی موبایل
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    نمایش شبیه‌ساز گوشی موبایل در دپارتمان آزمایشگاه بازی (بازی گربه شهری)
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              {/* 4 Phone Frames Mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {content.selectedWorks
                  .find((w) => w.id === 'game-lab')
                  ?.galleryItems?.filter((item) => item.id.startsWith('game-mobile-'))
                  .map((screen, idx) => (
                    <div key={screen.id} className="p-3 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-2 text-center">
                      <div className="aspect-[9/16] w-full rounded-xl overflow-hidden bg-black border border-[#DCD6C8] relative">
                        <img src={screen.imageUrl} alt={screen.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                          فریم ۰{idx + 1}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={screen.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => ({
                            ...prev,
                            selectedWorks: prev.selectedWorks.map((w) => {
                              if (w.id === 'game-lab') {
                                return {
                                  ...w,
                                  galleryItems: (w.galleryItems || []).map((g) => (g.id === screen.id ? { ...g, title: val } : g)),
                                };
                              }
                              return w;
                            }),
                          }));
                        }}
                        className="w-full px-2 py-1 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] text-[11px] font-bold text-center text-[#1E2424] dark:text-white"
                      />
                      <label className="w-full py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] text-[11px] font-bold cursor-pointer transition-colors flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>تعویض اسکرین‌شات</span>
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
                                  selectedWorks: prev.selectedWorks.map((w) => {
                                    if (w.id === 'game-lab') {
                                      return {
                                        ...w,
                                        galleryItems: (w.galleryItems || []).map((g) => (g.id === screen.id ? { ...g, imageUrl: url } : g)),
                                      };
                                    }
                                    return w;
                                  }),
                                }));
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 9. DISPLAY TYPES: STAGE PHOTOGRAPHY */}
          {currentNav === 'display-stage-photo' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    نوع نمایش ۳: قاب‌های عکاسی صحنه و مپینگ معماری
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    ۳ قاب عکاسی استیج کنسرت کاخ سعدآباد با توضیحات تخصصی نور و پرسپکتیو
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {content.selectedWorks
                  .find((w) => w.id === 'vfx-mapping')
                  ?.galleryItems?.filter((item) => item.id.startsWith('vfx-photo-'))
                  .map((photo, pIdx) => (
                    <div key={photo.id} className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-3">
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-black relative">
                        <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#3E777A] text-white text-[10px] font-bold">
                          قاب صحنه · ۰{pIdx + 1} از ۳
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={photo.title}
                          placeholder="عنوان قاب عکاسی..."
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => ({
                              ...prev,
                              selectedWorks: prev.selectedWorks.map((w) => {
                                if (w.id === 'vfx-mapping') {
                                  return {
                                    ...w,
                                    galleryItems: (w.galleryItems || []).map((g) => (g.id === photo.id ? { ...g, title: val } : g)),
                                  };
                                }
                                return w;
                              }),
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] text-xs font-bold text-[#1E2424] dark:text-white"
                        />
                        <textarea
                          rows={3}
                          value={photo.description}
                          placeholder="کپشن تخصصی معماری..."
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => ({
                              ...prev,
                              selectedWorks: prev.selectedWorks.map((w) => {
                                if (w.id === 'vfx-mapping') {
                                  return {
                                    ...w,
                                    galleryItems: (w.galleryItems || []).map((g) => (g.id === photo.id ? { ...g, description: val } : g)),
                                  };
                                }
                                return w;
                              }),
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] text-[11px] text-[#1E2424] dark:text-white leading-relaxed"
                        />
                        <label className="w-full py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#151E20] hover:bg-[#3E777A] hover:text-white border border-[#DCD6C8] text-[11px] font-bold cursor-pointer transition-colors flex items-center justify-center gap-1">
                          <Upload className="w-3 h-3" />
                          <span>تغییر تصویر قاب</span>
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
                                    selectedWorks: prev.selectedWorks.map((w) => {
                                      if (w.id === 'vfx-mapping') {
                                        return {
                                          ...w,
                                          galleryItems: (w.galleryItems || []).map((g) => (g.id === photo.id ? { ...g, imageUrl: url } : g)),
                                        };
                                      }
                                      return w;
                                    }),
                                  }));
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 10. DISPLAY TYPES: 3:4 OFFICIAL POSTER & PANORAMA BANNERS */}
          {currentNav === 'display-posters' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    نوع نمایش ۴: پوستر عمودی ۳:۴ رسمی و بنرهای عریض
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    پوستر رسمی بدون کراپ انیمیشن بلند و بنرهای پانوراما
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* 3:4 Official Poster Box */}
                <div className="p-5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-4">
                  <span className="text-xs font-bold text-[#3E777A] block">پوستر عمودی ۳:۴ رسمی (Official Key Art):</span>
                  <div className="aspect-[3/4] max-w-xs mx-auto rounded-2xl overflow-hidden bg-black shadow-lg border border-[#DCD6C8]">
                    <img src="/assets/wonderful-day-poster.webp" alt="Official Poster" className="w-full h-full object-cover" />
                  </div>
                  <label className="w-full py-2.5 rounded-xl bg-[#3E777A] text-white font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                    <Upload className="w-4 h-4" />
                    <span>آپلود فایل جدید پوستر رسمی (۳:۴)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadAsset(file);
                          if (url) showToast('پوستر رسمی آپلود شد');
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Banner Management */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-2">
                    <span className="text-xs font-bold text-[#3E777A] block">بنر اکوسیستم وب۳:</span>
                    <div className="aspect-[21/9] rounded-xl overflow-hidden bg-black">
                      <img src="/assets/web3-nft-cover.webp" alt="Web3 Banner" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] space-y-2">
                    <span className="text-xs font-bold text-[#3E777A] block">بنر تیزر تجاری (CGI):</span>
                    <div className="aspect-[21/9] rounded-xl overflow-hidden bg-black">
                      <img src="/assets/commercial-teaser-banner.webp" alt="Commercial Banner" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 11. DISPLAY TYPES: 3D CHARACTER TOKENS */}
          {currentNav === 'display-tokens' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    نوع نمایش ۵: استندها و توکن‌های کاراکترهای سه‌بعدی
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    نمایش ترنسپرنت کاراکترهای استندآپ پویو و پدربزرگ در اکوسیستم وب۳ و بازی
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="h-44 flex items-center justify-center">
                    <img src="/assets/game-lab/token-1.webp" alt="Pouyo Token" className="max-h-full object-contain filter drop-shadow-xl" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">توکن استندآپ ۱: کاراکتر پویو (Pouyo)</h4>
                  <span className="text-xs text-[#777A76]">فرمت PNG بدون پس‌زمینه با نورپردازی گرم</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="h-44 flex items-center justify-center">
                    <img src="/assets/game-lab/token-grandfather.png" alt="Grandfather Token" className="max-h-full object-contain filter drop-shadow-xl" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">توکن استندآپ ۲: پدربزرگ خانواده میو</h4>
                  <span className="text-xs text-[#777A76]">رندر استایلایز ۳D با استایل سیلوئت متمایز</span>
                </div>
              </div>
            </div>
          )}

          {/* 12. DISPLAY TYPES: STAT CALLOUTS */}
          {currentNav === 'display-stats' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    نوع نمایش ۶: باکس‌های آمار و شاخص‌های عددی برجسته
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    باکس‌های داده‌های آماری کلیدی (مانند ۹۳ دقیقه بازی روزانه)
                  </span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>

              {/* Live Preview of Stat Callout Box */}
              <div className="p-6 rounded-2xl bg-[#FAF8F4] dark:bg-[#151A1A] border border-[#DCD6C8] dark:border-[#2A3232] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3 shrink-0">
                  <span className="text-5xl font-black text-[#3E777A] dark:text-[#5DB8BD] leading-none farsi-nums">
                    {content.gameLabHighlights.dailyPlaytimeMinutes}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-[#1E2424] dark:text-white block">
                      {content.gameLabHighlights.dailyPlaytimeLabel}
                    </span>
                    <span className="text-xs text-[#777A76] dark:text-[#889290] block">
                      {content.gameLabHighlights.dailyPlaytimeSub}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#3E777A]/10 text-[#3E777A] text-xs font-bold font-mono">
                  ANALYTICS CALLOUT
                </span>
              </div>

              {/* Edit Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold block">عدد شاخص (مثلاً ۹۳):</label>
                  <input
                    type="text"
                    value={content.gameLabHighlights.dailyPlaytimeMinutes}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        gameLabHighlights: { ...prev.gameLabHighlights, dailyPlaytimeMinutes: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs font-bold text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان شاخص:</label>
                  <input
                    type="text"
                    value={content.gameLabHighlights.dailyPlaytimeLabel}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        gameLabHighlights: { ...prev.gameLabHighlights, dailyPlaytimeLabel: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs font-bold text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">زیرعنوان توضیحی منبع داده:</label>
                  <input
                    type="text"
                    value={content.gameLabHighlights.dailyPlaytimeSub}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({
                        ...prev,
                        gameLabHighlights: { ...prev.gameLabHighlights, dailyPlaytimeSub: val },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 13. TEAM MEMBERS MANAGEMENT */}
          {currentNav === 'team' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD6C8] dark:border-[#27363A]">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">
                    مدیریت اعضای تیم، هم‌بنیان‌گذاران و متخصصان
                  </h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">
                    کل اعضای ثبت‌شده: {totalMembers} نفر
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="جستجو در اعضا..."
                    value={teamSearchQuery}
                    onChange={(e) => setTeamSearchQuery(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />

                  <button
                    onClick={() => {
                      setEditingMember({
                        isNew: true,
                        member: {
                          id: `member-${Date.now()}`,
                          name: 'نام عضو جدید',
                          nameEn: 'Full Name',
                          initials: 'FN',
                          roleFa: 'نقش تخصصی',
                          roleEn: 'Specialist Role',
                          department: 'animation',
                          imageUrl: '',
                          isCoFounder: false,
                        },
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن عضو</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.teamMembers
                  .filter((m) => !teamSearchQuery || m.name.includes(teamSearchQuery) || m.roleFa.includes(teamSearchQuery))
                  .map((member) => (
                    <div key={member.id} className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] dark:border-[#27363A] flex flex-col justify-between space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/60 dark:bg-black/30 border border-[#DCD6C8] shrink-0 flex items-center justify-center">
                          {member.imageUrl ? <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" /> : <span className="font-mono text-xs">{member.initials}</span>}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-[#1E2424] dark:text-white truncate">{member.name}</h4>
                            {member.isCoFounder && <span className="px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[9px] font-bold">موسس</span>}
                          </div>
                          <span className="text-[11px] text-[#3E777A] dark:text-[#65B7B5] font-semibold truncate block">{member.roleFa}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-[#DCD6C8]/60 flex items-center justify-between text-xs">
                        <button onClick={() => setEditingMember({ member, isNew: false })} className="text-[#3E777A] font-bold flex items-center gap-1 cursor-pointer">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>ویرایش</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`حذف عضو «${member.name}»؟`)) {
                              updateContent((prev) => ({ ...prev, teamMembers: prev.teamMembers.filter((m) => m.id !== member.id) }));
                              showToast('عضو حذف شد');
                            }
                          }}
                          className="text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 14. INBOX */}
          {currentNav === 'inbox' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">صندوق پیام‌ها و استعلام‌های همکاری</h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">پیام‌های ارسال‌شده از فرم مودال سایت</span>
                </div>
                <button onClick={fetchInquiries} disabled={loadingInquiries} className="px-3.5 py-1.5 rounded-xl bg-[#EDE9DF] dark:bg-[#1B2629] text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
                  <span>بروزرسانی</span>
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#EDE9DF]/40 space-y-2">
                  <Inbox className="w-10 h-10 mx-auto text-[#777A76]/50" />
                  <h4 className="text-sm font-bold">هیچ پیامی هنوز ثبت نشده است</h4>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq, idx) => (
                    <div key={inq.id || idx} className="p-4 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] space-y-2 text-right">
                      <div className="flex items-center justify-between border-b border-[#DCD6C8]/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{inq.name}</span>
                          <span className="px-2 py-0.5 rounded bg-[#3E777A]/15 text-[#3E777A] font-mono text-[10px] font-bold">{inq.code}</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#777A76]" dir="ltr">{inq.createdAt ? new Date(inq.createdAt).toLocaleString('fa-IR') : 'به تازگی'}</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div><strong className="text-[#777A76]">تماس:</strong> <span className="font-mono font-bold select-all">{inq.contact}</span></div>
                        <div><strong className="text-[#777A76]">پیام:</strong> <span>{inq.message || inq.description}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 15. SEO & GOOGLE SERP SIMULATOR */}
          {currentNav === 'seo' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#1E2424] dark:text-white">تنظیمات سئو و شبیه‌ساز نتایج گوگل</h3>
                  <span className="text-xs text-[#777A76] dark:text-[#889290]">بهینه‌سازی متاتگ‌ها و پیش‌نمایش زنده سرچ گوگل</span>
                </div>
                <button onClick={handleSaveAll} className="px-4 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره متاتگ‌ها</span>
                </button>
              </div>

              {/* Realistic Google SERP Widget */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#DCD6C8] dark:border-[#333] shadow-md space-y-3 text-right">
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-neutral-800 pb-2">
                  <div className="w-6 h-6 rounded-full bg-[#3E777A] text-white text-[11px] font-bold flex items-center justify-center">G</div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">پیش‌نمایش در نتایج گوگل (Google SERP Desktop Preview)</span>
                </div>
                <div className="max-w-2xl py-2 space-y-1 select-none">
                  <div className="flex items-center gap-2 text-xs text-[#202124] dark:text-[#BDC1C6]" dir="ltr">
                    <div className="w-4 h-4 rounded-full bg-[#3E777A] text-white text-[8px] flex items-center justify-center font-bold">A</div>
                    <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">{content.seo.siteUrl}</span>
                  </div>
                  <h4 className="text-base sm:text-xl font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                    {content.seo.siteTitle}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-2">
                    {content.seo.description}
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-[#777A76] flex items-center justify-between border-t border-gray-100">
                  <span>کاراکتر عنوان: <strong className="font-mono">{content.seo.siteTitle.length}</strong></span>
                  <span>کاراکتر توضیحات: <strong className="font-mono">{content.seo.description.length}</strong> (۱۲۰ تا ۱۶۰ مناسب است)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold block">عنوان سایت در گوگل (Meta Title):</label>
                  <input
                    type="text"
                    value={content.seo.siteTitle}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, seo: { ...prev.seo, siteTitle: val } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">توضیحات متا برای جستجوی گوگل (Meta Description):</label>
                  <textarea
                    rows={3}
                    value={content.seo.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, seo: { ...prev.seo, description: val } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">کلمات کلیدی اصلی (با کاما جدا کنید):</label>
                  <input
                    type="text"
                    value={content.seo.keywords}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => ({ ...prev, seo: { ...prev.seo, keywords: val } }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 16. BACKUP & SYSTEM */}
          {currentNav === 'backup' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] space-y-6 text-right">
              <div className="border-b border-[#DCD6C8] dark:border-[#27363A] pb-4">
                <h3 className="text-lg font-black text-[#1E2424] dark:text-white">پشتیبان‌گیری، خروجی JSON و بازیابی</h3>
                <span className="text-xs text-[#777A76] dark:text-[#889290]">مدیریت پایگاه داده و فایل‌های اصلی سایت</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] space-y-3 flex flex-col justify-between">
                  <div>
                    <Download className="w-6 h-6 text-[#3E777A] mb-2" />
                    <h4 className="text-sm font-bold">دانلود فایل کامل داده‌ها</h4>
                    <p className="text-xs text-[#777A76]">دانلود کلیه محتواهای سایت در قالب JSON</p>
                  </div>
                  <button onClick={handleDownloadBackup} className="w-full py-2.5 rounded-xl bg-[#3E777A] text-white text-xs font-bold cursor-pointer">
                    دانلود بک‌آپ
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] space-y-3 flex flex-col justify-between">
                  <div>
                    <Upload className="w-6 h-6 text-teal-600 mb-2" />
                    <h4 className="text-sm font-bold">بازیابی از فایل JSON</h4>
                    <p className="text-xs text-[#777A76]">بارگذاری فایل پشتیبان ذخیره‌شده قبلی</p>
                  </div>
                  <label className="w-full py-2.5 rounded-xl bg-[#EDE9DF] border border-[#DCD6C8] text-xs font-bold cursor-pointer text-center block">
                    انتخاب فایل
                    <input type="file" ref={backupImportRef} accept=".json" className="hidden" onChange={handleImportBackup} />
                  </label>
                </div>

                <div className="p-5 rounded-2xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] space-y-3 flex flex-col justify-between">
                  <div>
                    <RefreshCw className="w-6 h-6 text-rose-500 mb-2" />
                    <h4 className="text-sm font-bold">بازنشانی کارخانه</h4>
                    <p className="text-xs text-[#777A76]">بازگشت به پیش‌فرض اولیه استودیو</p>
                  </div>
                  <button onClick={handleResetFactory} className="w-full py-2.5 rounded-xl bg-rose-500/15 text-rose-600 text-xs font-bold cursor-pointer border border-rose-500/30">
                    بازنشانی به تنظیمات کارخانه
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Editing / Adding Gallery Item Modal */}
      {editingGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-right">
            <div className="flex items-center justify-between border-b border-[#DCD6C8] pb-3">
              <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">
                {editingGalleryItem.isNew ? 'افزودن اثر جدید به دپارتمان' : 'ویرایش اثر'}
              </h4>
              <button onClick={() => setEditingGalleryItem(null)} className="p-1 text-[#777A76] cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-right">
              <div className="space-y-1">
                <label className="text-xs font-bold block">عنوان اثر:</label>
                <input
                  type="text"
                  value={editingGalleryItem.item.title}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, title: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">برچسب (Badge):</label>
                <input
                  type="text"
                  value={editingGalleryItem.item.badge || ''}
                  placeholder="رندر نهایی ۳D یا ویدیوی رسمی"
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, badge: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">مسیر تصویر کاور (Image URL):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={editingGalleryItem.item.imageUrl || ''}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, imageUrl: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                  <label className="px-3 py-2 rounded-xl bg-[#EDE9DF] border border-[#DCD6C8] text-xs font-bold cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 inline ml-1" />
                    <span>آپلود</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadAsset(file);
                          if (url) setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, imageUrl: url } });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">لینک ویدیو مستقیم (mp4 / WebM اختیاری):</label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="https://...mp4"
                  value={editingGalleryItem.item.videoUrl || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, videoUrl: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs font-mono text-[#1E2424] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">یا لینک Embed (Aparat / YouTube اختیاری):</label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="https://www.youtube.com/embed/..."
                  value={editingGalleryItem.item.embedUrl || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, embedUrl: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs font-mono text-[#1E2424] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">توضیحات اثر:</label>
                <textarea
                  rows={3}
                  value={editingGalleryItem.item.description || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, item: { ...editingGalleryItem.item, description: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCD6C8] flex items-center justify-end gap-2">
              <button onClick={() => setEditingGalleryItem(null)} className="px-4 py-2 rounded-xl bg-[#EDE9DF] text-xs font-bold cursor-pointer">انصراف</button>
              <button
                onClick={() => {
                  const { domainId, item, isNew } = editingGalleryItem;
                  updateContent((prev) => ({
                    ...prev,
                    selectedWorks: prev.selectedWorks.map((w) => {
                      if (w.id === domainId) {
                        const items = w.galleryItems || [];
                        const updated = isNew ? [item, ...items] : items.map((i) => (i.id === item.id ? item : i));
                        return { ...w, galleryItems: updated };
                      }
                      return w;
                    }),
                  }));
                  setEditingGalleryItem(null);
                  showToast(isNew ? 'اثر اضافه شد' : 'اثر ویرایش شد');
                }}
                className="px-5 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold cursor-pointer"
              >
                تایید و اعمال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editing Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#FAF8F4] dark:bg-[#151E20] border border-[#DCD6C8] dark:border-[#27363A] rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-right">
            <div className="flex items-center justify-between border-b border-[#DCD6C8] pb-3">
              <h4 className="text-sm font-bold text-[#1E2424] dark:text-white">
                {editingMember.isNew ? 'افزودن عضو جدید' : 'ویرایش مشخصات عضو'}
              </h4>
              <button onClick={() => setEditingMember(null)} className="p-1 text-[#777A76] cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold block">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    value={editingMember.member.name}
                    onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, name: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold block">نام انگلیسی (Full Name):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editingMember.member.nameEn || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, nameEn: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold block">سمت تخصصی (فارسی):</label>
                  <input
                    type="text"
                    value={editingMember.member.roleFa}
                    onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, roleFa: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold block">سمت (انگلیسی):</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editingMember.member.roleEn}
                    onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, roleEn: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs text-[#1E2424] dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold block">تصویر پرتره چهره:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={editingMember.member.imageUrl || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, imageUrl: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#EDE9DF]/60 dark:bg-[#1B2629] border border-[#DCD6C8] text-xs font-mono text-[#1E2424] dark:text-white"
                  />
                  <label className="px-3 py-2 rounded-xl bg-[#EDE9DF] border border-[#DCD6C8] text-xs font-bold cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 inline ml-1" />
                    <span>آپلود</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadAsset(file);
                          if (url) setEditingMember({ ...editingMember, member: { ...editingMember.member, imageUrl: url } });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="founderCheck"
                  checked={editingMember.member.isCoFounder || false}
                  onChange={(e) => setEditingMember({ ...editingMember, member: { ...editingMember.member, isCoFounder: e.target.checked } })}
                  className="w-4 h-4 rounded text-[#3E777A]"
                />
                <label htmlFor="founderCheck" className="text-xs font-bold cursor-pointer">
                  عضو هم‌بنیان‌گذار / موسس استودیو
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCD6C8] flex items-center justify-end gap-2">
              <button onClick={() => setEditingMember(null)} className="px-4 py-2 rounded-xl bg-[#EDE9DF] text-xs font-bold cursor-pointer">انصراف</button>
              <button
                onClick={() => {
                  const { member, isNew } = editingMember;
                  updateContent((prev) => ({
                    ...prev,
                    teamMembers: isNew ? [member, ...prev.teamMembers] : prev.teamMembers.map((m) => (m.id === member.id ? member : m)),
                  }));
                  setEditingMember(null);
                  showToast(isNew ? 'عضو اضافه شد' : 'مشخصات ذخیره شد');
                }}
                className="px-5 py-2 rounded-xl bg-[#3E777A] text-white text-xs font-bold cursor-pointer"
              >
                تایید و ثبت
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
