import contentData from './studioContent.json';

export interface WorkHistoryItem {
  role: string;
  projectOrOrg: string;
  year?: string;
  detail?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameEn?: string;
  role: string;
  roleEn: string;
  department: 'leadership' | 'animation' | 'commercial' | 'web3' | 'mystery';
  initials: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
  bio?: string;
  fullBio?: string;
  workHistory?: WorkHistoryItem[];
  specialties?: string[];
  notableWorks?: string[];
  education?: string;
  isCoFounder?: boolean;
  isMystery?: boolean;
  hideFromHome?: boolean;
}

export interface CharacterConcept {
  id: string;
  nameFa: string;
  nameEn: string;
  role: string;
  description: string;
  renderType: 'hero' | 'companion' | 'mentor' | 'creature';
}

export interface DomainGalleryItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  description: string;
  badge?: string;
  category?: 'AI Assisted' | 'Making of' | 'Editorial' | 'Sound Design' | '2D' | 'Demoreel';
  aspectRatio?: '16:9' | '9:16' | '1:1';
  imageUrl?: string;
  fallbackImageUrl?: string;
  videoUrl?: string;
  previewVideoUrl?: string;
  embedUrl?: string;
  externalUrl?: string;
  platform?: 'youtube' | 'vimeo';
  canvasType?:
    | 'hero-showreel'
    | 'wonderful-day'
    | 'commercial-cgi'
    | 'vfx-mapping'
    | 'web3-nft'
    | 'game-lab'
    | 'character-concept'
    | 'character-saman'
    | 'character-poopi'
    | 'character-mentor'
    | 'character-creature';
}

export interface DepartmentTeamGroup {
  id: string;
  title: string;
  isHead?: boolean;
  headIds?: string[];
  memberIds: string[];
}

export interface InternationalUnitInfo {
  name: string;
  roleLabel: string;
  logoUrl: string;
  fallbackLogoUrl?: string;
  websiteUrl: string;
  websiteLabel: string;
  keywordsFa: string[];
  keywordsEn: string[];
}

export interface ProjectWork {
  id: string;
  title: string;
  shortTitle?: string;
  categoryFa: string;
  categoryKey: 'animation' | 'commercial' | 'vfx' | 'web3' | 'game';
  subtitle: string;
  shortSummary?: string;
  description: string;
  secondaryDescription?: string;
  highlightsTitle?: string;
  highlights: string[];
  tags: string[];
  canvasType: 'wonderful-day' | 'commercial-cgi' | 'vfx-mapping' | 'web3-nft' | 'game-lab';
  imageUrl?: string;
  fallbackImageUrl?: string;
  videoUrl?: string;
  internationalUnit?: InternationalUnitInfo;
  isUpcoming?: boolean;
  relatedMemberIds?: string[];
  teamGroups?: DepartmentTeamGroup[];
  galleryItems?: DomainGalleryItem[];
}

export interface RdPrinciple {
  number: string;
  title: string;
  englishTitle: string;
  description: string;
  accent: string;
}

export interface NamePillar {
  word: string;
  phonetic: string;
  meaning: string;
  elaboration: string;
}

export interface VisualQualityPillar {
  titleEn: string;
  titleFa: string;
  description: string;
}

export interface UpcomingProject {
  titleFa: string;
  titleEn: string;
  description: string;
  badge: string;
}

export const STUDIO_CATALOG_INFO = contentData.studioCatalogInfo;
export const WONDERFUL_DAY_CATALOG = contentData.wonderfulDayCatalog;
export const TEAM_MEMBERS: TeamMember[] = contentData.teamMembers as unknown as TeamMember[];
export const CHARACTER_CONCEPTS: CharacterConcept[] = contentData.characterConcepts as unknown as CharacterConcept[];
export const SELECTED_WORKS: ProjectWork[] = contentData.selectedWorks as unknown as ProjectWork[];

export const RD_PRINCIPLES: RdPrinciple[] = [
  {
    number: '۰۱',
    title: 'توسعه IP و جهان‌سازی',
    englishTitle: 'IP Development & Worldbuilding',
    description:
      'خلق شخصیت‌ها و جهان‌های داستانی با هویت هنری و فرهنگی متمایز و ظرفیت توسعه در رسانه‌ها و بازارهای گوناگون داخلی و بین‌المللی.',
    accent: 'bg-[#3E777A] text-[#FAF8F4]',
  },
  {
    number: '۰۲',
    title: 'تولید یکپارچه محتوای تصویری',
    englishTitle: 'Integrated Visual Production',
    description:
      'همراهی کامل از مرحله ایده‌پردازی و طراحی بصری تا تولید، اصلاح فریم‌ها و پرداخت نهایی انیمیشن، تیزر تبلیغاتی و جلوه‌های بصری CGI.',
    accent: 'bg-[#3E777A] text-[#FAF8F4]',
  },
  {
    number: '۰۳',
    title: 'تلفیق هدفمند هنر و فناوری',
    englishTitle: 'Fusion of Art & Technology',
    description:
      'استفاده هدفمند از هوش مصنوعی و ابزارهای نوین برای گسترش گزینه‌های خلاقانه، حفظ پیوستگی سبک بصری و بهینه‌سازی گردش‌کار تولید.',
    accent: 'bg-[#3E777A] text-[#FAF8F4]',
  },
  {
    number: '۰۴',
    title: 'توسعه زنجیره ارزش',
    englishTitle: 'Value Chain Expansion',
    description:
      'نگاه فراتر از تولید یک اثر تک‌بعدی، با توجه به ظرفیت تجاری‌سازی دارایی‌های فکری (IP) و گسترش آن در محصولات، رسانه‌ها و تجربه‌های متنوع.',
    accent: 'bg-[#3E777A] text-[#FAF8F4]',
  },
  {
    number: '۰۵',
    title: 'همکاری میان‌رشته‌ای',
    englishTitle: 'Interdisciplinary Synergy',
    description:
      'هم‌افزایی تجربه‌های هنری، فنی و مدیریتی اعضای تیم در مسیر تبدیل ایده خام به محصولی با استاندارد رقابتی.',
    accent: 'bg-[#3E777A] text-[#FAF8F4]',
  },
];

export const NAME_PILLARS: NamePillar[] = [
  {
    word: 'آرتا',
    phonetic: 'ARTĀ',
    meaning: 'حقیقت، راستی و نظم خلاقانه کهن',
    elaboration:
      'تعهد به اصالت در تولید، کیفیت سنجیده و احترام به نگاه مخاطب؛ ریشه در مفاهیم بنیادین فرهنگ و تمدن ایرانی.',
  },
  {
    word: 'ماد',
    phonetic: 'MĀD',
    meaning: 'ریشه فرهنگی و شالوده هویتی',
    elaboration:
      'اتکا بر پیشینه فرهنگی و هنری برای خلق دارایی‌های فکری (IP) که هم هویت بومی دارند و هم برای مخاطب جهانی قابل درک‌اند.',
  },
  {
    word: 'هنر',
    phonetic: 'HONAR',
    meaning: 'تلاقی تخیل، روایت و فناوری',
    elaboration:
      'جان‌مایه‌ای که تخصص‌های فنی و ابزارهای نوین را در خدمت داستان‌گویی، تصویرسازی و خلق تجربه‌های ماندگار قرار می‌دهد.',
  },
];
