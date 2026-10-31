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
  subtitle: string;
  description: string;
  badge?: string;
  category?: 'AI Assisted' | 'Making of' | 'Editorial' | 'Sound Design' | '2D' | 'Showreel';
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

export const STUDIO_CATALOG_INFO = {
  intro:
    'آرتا ماد هنر مجموعه‌ای خلاق در تلاقی هنر و فناوری است که در زمینه تولید انیمیشن، محتوای تبلیغاتی و تجربه‌های تعاملی فعالیت می‌کند. ما با هم‌افزایی تخصص‌های هنری و فنی، ایده‌ها را به تجربه‌هایی تصویری و متمایز تبدیل می‌کنیم.',
  history:
    'آرتا ماد هنر حاصل سال‌ها تجربه و همکاری مشترک اعضای اصلی تیم در حوزه‌های مختلف هنر و تولید است؛ تجربه‌ای که در قالب شکل‌گیری این مجموعه، با نگاهی نو و رویکردی یکپارچه به خلق، تولید و توسعه ایده‌ها پیوند خورده است.',
  vision:
    'چشم‌انداز آرتا ماد هنر، خلق و توسعه دارایی‌های فکری (IP) با هویت هنری و فرهنگی متمایز و قابلیت رقابت در بازارهای بین‌المللی است. رویکرد استودیو بر پیوند خلاقیت، توسعه تجاری و بهره‌گیری هدفمند از فناوری‌های نوین استوار است.',
};

export const WONDERFUL_DAY_CATALOG = {
  titleFa: 'روز شگفت‌انگیز',
  titleEn: 'A Wonderful Day',
  genre: 'کمدی، ماجراجویی و خانوادگی',
  audience: 'کودکان و خانواده',
  format: 'انیمیشن سه‌بعدی سینمایی بلند',
  synopsisParagraphs: [
    '«روز شگفت‌انگیز» داستان پویو، پسربچه‌ای گربه‌ای است که خودش را بدشانس‌ترین بچه دنیا می‌داند؛ کودکی که اتفاق‌های پیش‌بینی‌ناپذیر بارها او را در موقعیت‌های خنده‌دار و دردسرساز قرار می‌دهند. در آستانه روز تولدش، همزمان با جشن بزرگ شهر و رقابت برای انتخاب «خانواده شایسته»، پویو آرزو دارد این بار توانایی‌هایش را نشان دهد و به‌جای خرابکار خانواده، جدی گرفته شود. اما رقابت با خواهر کمال‌گرایش، تمسخر هم‌کلاسی‌ها و فشار انتظارات، مسیر او را به ماجرایی غیرمنتظره می‌کشاند؛ ماجرایی که نگاه او و خانواده‌اش را به معنای خوش‌شانسی، موفقیت و کامل بودن به چالش می‌کشد.',
    'داستان در شهری رنگارنگ و خیال‌پردازانه از حیوانات انسان‌وار شکل می‌گیرد؛ جهانی که در آن کارگاه شیرینی‌سازی مجهز به دستگاه تبدیل احساسات به طعم، تمرین‌های موسیقی، شعبده‌بازی، رقابت‌های کودکانه و جشن‌های شهری درهم می‌آمیزند. در مرکز این جهان، خانواده میو قرار دارد: پدری مخترع و منظم، مادری گرافیست و کمال‌گرا، نینو، خواهر بااستعداد و دقیق پویو، و آقا میو، پدربزرگی بازیگوش که زندگی را همچون یک بازی می‌بیند. لویی، دوست همراه پویو، و رودی، رقیب او، نیز در مسیر داستان نقش دارند.',
    'تمایز روایی فیلم در ترکیب کمدی فیزیکی و موقعیت‌های اغراق‌آمیز با موسیقی، ترانه، رپ و لحظه‌های فانتزی است؛ جایی که بدبیاری‌های پویو فقط زمینه‌ساز شوخی نیستند، بلکه به بخشی از مسیر شناخت خود او تبدیل می‌شوند. فیلم با محوریت پذیرش تفاوت‌ها، رهایی از فشار کمال‌گرایی و ارزش پیوندهای خانوادگی، این پرسش را مطرح می‌کند که آیا برای داشتن یک روز خوب، باید همه‌چیز بی‌نقص باشد؟',
  ],
  artisticValue:
    '«روز شگفت‌انگیز» با بهره‌گیری از جهان‌سازی خیال‌پردازانه، شخصیت‌پردازی حیوانات انسان‌وار و ترکیب کمدی، موسیقی و فانتزی، بستری برای روایت دغدغه‌های انسانی در قالبی سرگرم‌کننده فراهم می‌کند. تمرکز بر پذیرش تفاوت‌های فردی، فاصله گرفتن از کمال‌گرایی افراطی و اهمیت حمایت خانوادگی، تجربه‌هایی قابل‌درک و همذات‌پندارانه برای کودکان و خانواده‌ها خلق می‌کند.',
  pipelineText:
    'در آرتا ماد هنر، هوش مصنوعی به‌عنوان بخشی از پایپلاین تولید، در کنار تخصص‌های هنری و فنی به کار گرفته می‌شود. این رویکرد می‌تواند توسعه کانسپت و طراحی بصری، تولید و اصلاح فریم‌ها، حفظ پیوستگی سبک بصری و پردازش تصویر را پشتیبانی کند. یکپارچه‌سازی ابزارهای هوشمند با بازبینی و کنترل کیفیت، با هدف بهینه‌سازی گردش‌کار و دستیابی به خروجی بصری منسجم دنبال می‌شود.',
  visualPillars: [
    {
      titleEn: 'Visual Style & Character Design',
      titleFa: 'سبک بصری و طراحی کاراکتر',
      description:
        'انیمیشن سه‌بعدی استایلایز با تناسبات اغراق‌شده و کنترل‌شده، سیلوئت‌های متمایز و جزئیات چهره، خز و پوشش.',
    },
    {
      titleEn: 'Environment Design',
      titleFa: 'طراحی محیط و جهان شهری',
      description: 'جهان شهری فانتزی با معماری رنگارنگ، جزئیات محیطی و عمق فضایی.',
    },
    {
      titleEn: 'Lighting, Color & Cinematography',
      titleFa: 'نورپردازی، رنگ و فیلم‌برداری',
      description:
        'نورپردازی سینمایی و طبیعی‌نما، سایه‌پردازی حجمی، پالت رنگی زنده با کنتراست کنترل‌شده و ترکیب‌بندی هدایت‌گر.',
    },
    {
      titleEn: 'Animation & Character Performance',
      titleFa: 'انیمیت و بازیگری شخصیت‌ها',
      description: 'بازیگری کارتونی، اکتینگ چهره و بدن، ژست‌پردازی و زمان‌بندی کمدی.',
    },
    {
      titleEn: 'Rendering, Compositing & Sound',
      titleFa: 'رندرینگ، کامپوزیت و صدا',
      description:
        'پرداخت نهایی تصویر با تأکید بر یکپارچگی نور، رنگ و متریال؛ همراه با تلفیق دیالوگ، موسیقی و عناصر ریتمیک در خدمت روایت.',
    },
  ] as VisualQualityPillar[],
  upcomingProjects: [
    {
      titleFa: 'روز شگفت‌انگیز ۲',
      titleEn: 'A Wonderful Day 2',
      badge: 'در مسیر توسعه IP',
      description:
        'ادامه مسیر جهان داستانی «روز شگفت‌انگیز» با هدف گسترش دنیای شخصیت‌ها و توسعه ظرفیت‌های روایی این مجموعه.',
    },
    {
      titleFa: 'داستان نوروز',
      titleEn: 'Nowruz Story',
      badge: 'اثر جدید در حال توسعه',
      description:
        'پروژه‌ای انیمیشنی با محوریت نوروز که در مسیر توسعه آثار جدید استودیو قرار دارد.',
    },
  ] as UpcomingProject[],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mahmoud-mohammadian',
    name: 'محمود محمدیان',
    nameEn: 'Mahmoud Mohammadian',
    role: 'هم‌بنیانگذار | کارگردان و نویسنده انیمیشن',
    roleEn: 'Co-Founder | Animation Director & Screenwriter',
    department: 'leadership',
    initials: 'MM',
    isCoFounder: true,
    education: 'کارشناس سینما — دانشگاه هنر تهران',
    imageUrl: '/assets/team/mahmoud-mohammadian.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/6da9e3c0-3a20-4f44-ab3a-67f359f394de/6da9e3c0-3a20-4f44-ab3a-67f359f394de-Mr-Mohammadia-Mahmoud.webp',
    bio: 'کارگردان و نویسنده سینما و انیمیشن؛ دانش‌آموخته دانشگاه هنر تهران و کارگردان فیلم سینمایی «روز شگفت‌انگیز» به تهیه‌کنندگی فیلمیران.',
    fullBio:
      'محمود محمدیان، دانش‌آموخته رشته سینما از دانشگاه هنر تهران، کارگردان و نویسنده‌ای با پیشینه متنوع در سینمای داستانی، انیمیشن بلند، مستند و تبلیغات تلویزیونی است. تجربه مستقیم او در مدیریت تصویربرداری، انیماتوری و کارگردانی، نگاهی دقیق به دکوپاژ، نورپردازی، ریتم روایی و هدایت بازیگران به آثار استودیو بخشیده و محور هدایت هنری فیلم سینمایی «روز شگفت‌انگیز» را شکل داده است.',
    workHistory: [
      {
        role: 'کارگردان',
        projectOrOrg: 'فیلم انیمیشن سینمایی «روز شگفت‌انگیز» (به تهیه‌کنندگی فیلمیران)',
        year: 'در حال تولید',
        detail: 'هدایت هنری، کارگردانی و توسعه روایت انیمیشن بلند سینمایی استودیو آرتا ماد هنر.',
      },
      {
        role: 'کارگردان',
        projectOrOrg: 'فیلم داستانی «خطور»',
        year: 'سینمای داستانی',
        detail: 'کارگردانی و هدایت دراماتیک اثر.',
      },
      {
        role: 'انیماتور',
        projectOrOrg: 'انیمیشن سینمایی «آقای مهربان»',
        year: 'انیمیشن بلند سینمایی',
        detail: 'اجرای انیمیت و بازیگری شخصیت‌ها در اولین انیمیشن بلند سه‌بعدی با رندر دوبعدی.',
      },
      {
        role: 'مدیر تصویربرداری',
        projectOrOrg: 'تله‌فیلم‌های «بازگشت» و «بهترین‌های شهر»',
        year: 'تولیدات تلویزیونی',
        detail: 'طراحی نورپردازی، قاب‌بندی و مدیریت فیلم‌برداری.',
      },
      {
        role: 'کارگردان',
        projectOrOrg: 'مجموعه مستند «همدلی» و مستند «حاشیه شهر»',
        year: 'سینمای مستند',
        detail: 'پژوهش، کارگردانی و روایت‌پردازی مستندهای اجتماعی.',
      },
      {
        role: 'کارگردان تیزرهای تبلیغاتی',
        projectOrOrg: 'برندهای معتبر کشور (پخش در شبکه سراسری)',
        year: 'تبلیغات بازرگانی',
        detail: 'ایده‌پردازی و کارگردانی کمپین‌ها و تیزرهای تلویزیونی در مقیاس ملی.',
      },
    ],
    specialties: [
      'کارگردانی و نویسندگی انیمیشن سینمایی',
      'کارگردانی فیلم داستانی و مستند',
      'طراحی دکوپاژ، نورپردازی و مدیریت تصویربرداری',
      'کارگردانی تیزرهای تبلیغاتی شبکه سراسری',
    ],
  },
  {
    id: 'mehdi-mohammadian',
    name: 'مهدی محمدیان',
    nameEn: 'Mehdi Mohammadian',
    role: 'هم‌بنیانگذار | کارگردان و نویسنده انیمیشن',
    roleEn: 'Co-Founder | Animation Director & Screenwriter',
    department: 'leadership',
    initials: 'MM',
    isCoFounder: true,
    education: 'کارشناس سینما (گرایش کارگردانی) — دانشگاه هنر تهران',
    imageUrl: '/assets/team/mehdi-mohammadian.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/d5e8b4cb-60eb-4baf-a48f-cde7211b5759/d5e8b4cb-60eb-4baf-a48f-cde7211b5759-Mr-Mohammadian-Mahdi.webp',
    bio: 'کارگردان، فیلمنامه‌نویس و کارگردان فنی انیمیشن؛ دانش‌آموخته کارگردانی سینما از دانشگاه هنر تهران با کارنامه‌ای از آثار شاخص ملی و بین‌المللی.',
    fullBio:
      'مهدی محمدیان، دانش‌آموخته کارگردانی سینما از دانشگاه هنر تهران، از سال ۱۳۸۸ در خط مقدم تولید انیمیشن‌های بلند سینمایی، سریال‌های بین‌المللی و پروژه‌های جلوه‌های ویژه فعالیت دارد. ویژگی متمایز کارنامه او، اشراف هم‌زمان بر دو ساحت «روایت و کارگردانی سینما» و «مهندسی جریان کار، برنامه‌نویسی و سوپروایزری انیمیت» است؛ ترکیبی که زیرساخت تولیدی و هنری آثار بلند استودیو را شکل می‌دهد.',
    workHistory: [
      {
        role: 'مجری طرح، دستیار کارگردان و مدیر تولید',
        projectOrOrg: 'انیمیشن سینمایی «روز شگفت‌انگیز» (به تهیه‌کنندگی فیلمیران)',
        year: '۱۴۰۴',
        detail: 'مدیریت اجرایی و هدایت خط تولید انیمیشن سینمایی بلند با پروانه ساخت رسمی سازمان سینمایی.',
      },
      {
        role: 'فیلمنامه‌نویس',
        projectOrOrg: 'انیمیشن‌های سینمایی «طب سوزنی دکتر پشه» و «قهرمان ذهن»',
        year: '۱۴۰۳',
        detail: 'نگارش فیلمنامه و توسعه جهان داستانی و شخصیت‌پردازی برای آثار بلند سینمایی.',
      },
      {
        role: 'سوپروایزر انیمیت',
        projectOrOrg: 'استودیوی سایبر گروپ فرانسه (Cyber Group Studios)',
        year: '۱۴۰۲',
        detail: 'نظارت کیفی و هدایت تیم انیمیت در تولید سریال انیمیشن بین‌المللی و پرمخاطب «Giganto».',
      },
      {
        role: 'مجری طرح و سوپروایزر انیمیت',
        projectOrOrg: 'شرکت ایما — انیمیشن سینمایی «ببعی قهرمان»',
        year: '۱۴۰۰',
        detail: 'مدیریت اجرایی طرح و سرپرستی دپارتمان انیمیت در یکی از موفق‌ترین آثار سینمای کودک و نوجوان.',
      },
      {
        role: 'کارگردان فنی و مدیر جریان کار (Pipeline & Workflow)',
        projectOrOrg: 'استودیو آینده‌نگر رسانه — سریال ۵۲ قسمتی «هالیلند»',
        year: '۱۳۹۷',
        detail: 'طراحی ساختار فنی و مدیریت پایپلاین تولید برای سریال انیمیشنی ۵۲ قسمتی.',
      },
      {
        role: 'مسئول فنی جلوه‌های ویژه',
        projectOrOrg: 'استودیو الزهرا — فیلم سینمایی «باهوبالی (Baahubali)»',
        year: '۱۳۹۶',
        detail: 'مدیریت فنی بخش جلوه‌های ویژه بصری در یکی از پرفروش‌ترین آثار تاریخ سینمای هند (بخش ایران).',
      },
      {
        role: 'مجری پروژه سه‌بعدی، کارگردان فنی و سوپروایزر انیمیت',
        projectOrOrg: 'شرکت حرکت کلیدی — انیمیشن سینمایی «آقای مهربان»',
        year: '۱۳۹۰',
        detail: 'اجرای نخستین انیمیشن بلند سه‌بعدی ایران با تکنیک رندر دوبعدی (Stylized 2D Render).',
      },
      {
        role: 'کارگردان فنی و برنامه‌نویس',
        projectOrOrg: 'استودیو رائیکا تصویر',
        year: '۱۳۸۸',
        detail: 'توسعه ابزارهای فنی و مشارکت در تولید تیزرهای تبلیغاتی شاخص کشور.',
      },
      {
        role: 'مدرس سینما (کارگردانی و انیمیت)',
        projectOrOrg: 'دانشگاه علمی کاربردی تهران',
        year: 'تدریس دانشگاهی',
        detail: 'آموزش تخصصی اصول کارگردانی، بازیگری انیمیشن و تکنیک‌های انیمیت به دانشجویان سینما.',
      },
    ],
    specialties: [
      'کارگردانی و فیلمنامه‌نویسی انیمیشن سینمایی',
      'کارگردانی فنی (TD) و برنامه‌نویسی پایپلاین',
      'مدیریت تولید و مهندسی جریان کار (Workflow Management)',
      'سوپروایزری انیمیت و بازیگری کاراکتر',
    ],
  },
  {
    id: 'mohammad-rahimi',
    name: 'محمد رحیمی',
    nameEn: 'Mohamad Rahimi',
    role: 'هم‌بنیانگذار | مدیر فنی هوش مصنوعی و معمار پایپلاین تولید',
    roleEn: 'Co-Founder | AI Technical Director & Production Pipeline Architect',
    department: 'leadership',
    initials: 'MR',
    isCoFounder: true,
    education: 'کارشناس علوم اجتماعی (۱۳۷۸ – ۱۳۸۱)',
    imageUrl: '/assets/team/mohammad-rahimi.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/cc11826b-445d-47de-a31a-08878aee2c2b/cc11826b-445d-47de-a31a-08878aee2c2b-Mr.Rahimi.webp',
    bio: 'معمار پایپلاین تولید و مدیر فنی هوش مصنوعی با بیش از ۲۲ سال سابقه در جلوه‌های بصری (VFX)، پس‌ازتولید سینمایی و تیزرهای تجاری.',
    fullBio:
      'محمد رحیمی با بیش از دو دهه فعالیت پیوسته در جلوه‌های بصری کلاسیک (VFX)، تدوین، کامپوزیت و تولید تیزرهای تبلیغاتی، هدایت فنی و معماری پایپلاین هوش مصنوعی استودیو را بر عهده دارد. تمرکز اصلی او بر پیوند استانداردهای سینمایی پس‌ازتولید با گردش‌کارهای نوین مبتنی بر هوش مصنوعی است؛ رویکردی که در پروژه سینمایی «روز شگفت‌انگیز» امکان دستیابی به کیفیتی رقابتی و یکپارچه را در کنار بهینه‌سازی چشمگیر زمان و منابع تولید فراهم کرده است.',
    workHistory: [
      {
        role: 'هم‌بنیانگذار و مدیر فنی هوش مصنوعی',
        projectOrOrg: 'استودیو آرتا ماد هنر (Arta Mad Honar Studio)',
        year: '۱۴۰۱ تاکنون',
        detail:
          'طراحی و هدایت پایپلاین فنی انیمیشن سینمایی بلند «روز شگفت‌انگیز» و یکپارچه‌سازی ابزارهای هوش مصنوعی مولد با فرآیندهای حرفه‌ای VFX و پس‌ازتولید.',
      },
      {
        role: 'هنرمند فنی تصویر و تهیه‌کننده بصری رویدادهای بزرگ',
        projectOrOrg: 'تولیدات مستقل و پروژه‌های صحنه‌ای',
        year: '۱۴۰۱ تا ۱۴۰۴',
        detail:
          'کارگردانی فنی و تولید محتوای عظیم ویدئو مپینگ (Video Mapping) برای اجراهای بزرگ تئاتری و کنسرت‌های استادیومی به همراه ساخت تیزرهای تبلیغاتی.',
      },
      {
        role: 'تدوینگر ارشد و آرتیست جلوه‌های بصری (VFX)',
        projectOrOrg: 'آژانس تبلیغاتی بازتاب',
        year: '۱۴۰۰ تا ۱۴۰۲',
        detail:
          'مدیریت کامل چرخه پس‌ازتولید، کامپوزیت، اصلاح رنگ و یکپارچه‌سازی جلوه‌های ویژه بصری برای کمپین‌های تلویزیونی برندهای ملی.',
      },
      {
        role: 'کامپوزیتور ارشد (Senior Compositor)',
        projectOrOrg: 'استودیو لیچی (Lichi Studios)',
        year: '۱۳۹۷ تا ۱۳۹۹',
        detail:
          'اجرای کامپوزیت پیشرفته برای سریال انیمیشنی «Annie and Manny»؛ اثری که موفق به کسب رتبه سوم در میان ۳۰ پروژه برتر جشنواره بین‌المللی MIPJunior کن فرانسه شد.',
      },
    ],
    specialties: [
      'معماری پایپلاین هوش مصنوعی (Sora, Veo, Kling, Midjourney)',
      'مهندسی پرامپت و بهینه‌سازی گردش‌کار تولید',
      'کامپوزیت پیشرفته و جلوه‌های بصری (After Effects, Maya)',
      'تدوین، اصلاح رنگ سینمایی و طراحی صدا (DaVinci Resolve, Premiere Pro)',
      'طراحی و اجرای ویدئو مپینگ در مقیاس کلان',
    ],
  },
  {
    id: 'lotfallah-salehi',
    name: 'لطف‌الله صالحی',
    role: 'سوپروایزر تولید و پایپلاین ویدیو',
    roleEn: 'Cinematic Video & Animation Pipeline Specialist',
    department: 'animation',
    initials: 'LS',
    imageUrl: '/assets/team/lotfallah-salehi.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/2cc4e820-1299-47c8-8943-9e0d4ce9c498/2cc4e820-1299-47c8-8943-9e0d4ce9c498-Salehi2.webp',
    bio: 'معماری و اتوماسیون جریان داده‌های رندرینگ، بهینه‌سازی موتورهای گرافیکی و یکپارچه‌سازی پایپلاین تولید.',
  },
  {
    id: 'ali-alipour',
    name: 'علی علیپور',
    role: 'دستیار کارگردان و هنرمند چندرسانه‌ای انیمیشن',
    roleEn: 'Animation Assistant Director & Multimedia Artist',
    department: 'animation',
    initials: 'AA',
    imageUrl: '/assets/team/ali-alipour.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/98b0c5c9-9a34-4149-9652-a401d33bc47d/98b0c5c9-9a34-4149-9652-a401d33bc47d-Ali2.webp',
    bio: 'همراهی در هدایت هنری و اجرایی پروژه، تدوین روایت تصویری، ضبط و اجرای نریشن و توسعهٔ کانسپت‌های بصری در مسیر تولید انیمیشن.',
  },
  {
    id: 'negar-baratzadeh',
    name: 'نگار برات‌زاده',
    role: 'طراح ارشد کانسپت و فریم‌آرتیست انیمیشن',
    roleEn: 'Senior Visual Development & Concept Frame Artist',
    department: 'animation',
    initials: 'NB',
    imageUrl: '/assets/team/negar-baratzadeh.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/1bc592dc-72c2-4814-a2a6-33e7ce5f4758/1bc592dc-72c2-4814-a2a6-33e7ce5f4758-Negar2.webp',
    bio: 'خلق دنیاهای مسحورکننده بصری، توسعه کانسپت کاراکترها و تصویرسازی کلیدفریم‌های احساسی و سینمایی.',
  },
  {
    id: 'hilda-baghban',
    name: 'هیلدا باغبان',
    role: 'آرتیست پردازش تصویر و اصلاح بصری',
    roleEn: 'Digital Image & Visual Finishing Artist',
    department: 'animation',
    initials: 'HB',
    imageUrl: '/assets/team/hilda-baghban.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/b5441acf-dba7-4e58-a067-6f5d4209dd14/b5441acf-dba7-4e58-a067-6f5d4209dd14-Hilda2.webp',
    bio: 'پردازش دقیق لایه‌های گرافیکی، فینیشینگ دیجیتال، کنترل گرمای رنگ و تثبیت وفاداری استایل بصری در فریم‌های نهایی.',
  },
  {
    id: 'aida-varasteh',
    name: 'آیدا وارسته',
    role: 'عضو دپارتمان کارگردانی و هنری انیمیشن',
    roleEn: 'Animation Directing & Visual Art Specialist',
    department: 'animation',
    initials: 'AV',
    hideFromHome: true,
    imageUrl: '/assets/team/aida-varasteh.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/ee0b984a-0bd0-4ad7-945b-c34a4f16b68b/ee0b984a-0bd0-4ad7-945b-c34a4f16b68b-Ida.webp',
  },
  {
    id: 'mahla-moein',
    name: 'مهلا معین',
    role: 'عضو دپارتمان کارگردانی و هنری انیمیشن',
    roleEn: 'Animation Directing & Visual Art Specialist',
    department: 'animation',
    initials: 'MM',
    hideFromHome: true,
    imageUrl: '/assets/team/mahla-moein.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/f00b90e5-4dc8-479c-ada9-946395520acf/f00b90e5-4dc8-479c-ada9-946395520acf-Mahla2.webp',
  },
  {
    id: 'mohammad-amin-zafari',
    name: 'محمدامین ظفری',
    role: 'عضو دپارتمان فنی انیمیشن',
    roleEn: 'Animation Technical Pipeline Specialist',
    department: 'animation',
    initials: 'MZ',
    hideFromHome: true,
    imageUrl: '/assets/team/mohammad-amin-zafari.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/686410fc-abcb-4e9b-a9ba-c865f77c425e/686410fc-abcb-4e9b-a9ba-c865f77c425e-Amin.webp',
  },
  {
    id: 'khorshid-khooban',
    name: 'خورشید خوبان',
    role: 'مدیر پروژه و تولید تیزر | آهنگساز و طراح موسیقی',
    roleEn: 'Teaser Product Manager | Music Composer & Audio Producer',
    department: 'commercial',
    initials: 'KK',
    imageUrl: '/assets/team/khorshid-khooban.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/cf59011d-a461-4870-bfbf-eba2a170e5f3/cf59011d-a461-4870-bfbf-eba2a170e5f3-Khorshid3.webp',
    bio: 'مدیریت دقیق زمان‌بندی دپارتمان تیزر همگام با ساخت موسیقی متن و معماری اتمسفر صوتی اختصاصی برندها.',
  },
  {
    id: 'hanieh-samipoor',
    name: 'حانیه سامی‌پور',
    role: 'تدوینگر ارشد و طراح جلوه‌های صوتی',
    roleEn: 'Lead Video Editor & Sound Designer - SFX',
    department: 'commercial',
    initials: 'HS',
    imageUrl: '/assets/team/hanieh-samipoor.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/340f0b90-08f8-4ffc-8ec2-4f739970e205/340f0b90-08f8-4ffc-8ec2-4f739970e205-Haniye.webp',
    bio: 'خلق ریتم‌های گیرا در تدوین فیلم و طراحی بافت‌های صوتی هایپررئال (Foley & SFX) جهت درگیرسازی حسی مخاطب.',
  },
  {
    id: 'reyhaneh-saeidi',
    name: 'ریحانه سعیدی',
    role: 'عضو دپارتمان تبلیغات و تولیدات تصویری',
    roleEn: 'Commercial & Creative Production Specialist',
    department: 'commercial',
    initials: 'RS',
    hideFromHome: true,
    imageUrl: '/assets/team/reyhaneh-saeidi.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/6f421555-2851-4464-bedd-d13cc5d94cb5/6f421555-2851-4464-bedd-d13cc5d94cb5-Reyhane.webp',
  },
  {
    id: 'nima-nekookar',
    name: 'نیما نکوکار',
    role: 'مدیر ارشد دپارتمان وب۳ و سوپروایزر NFT',
    roleEn: 'Head of Web3 & NFT Supervisor',
    department: 'web3',
    initials: 'NN',
    imageUrl: '/assets/team/nima-nekookar.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/b96458cc-d87d-4345-b703-bfe6d3615e7d/b96458cc-d87d-4345-b703-bfe6d3615e7d-Nima.webp',
    bio: 'معماری اکوسیستم بلاکچین بر بستر اتریوم، قراردادهای هوشمند ایمن و هدایت جهان‌های دیجیتال دوبعدی.',
  },
  {
    id: 'ali-ebrahimi',
    name: 'علی ابراهیمی',
    role: 'طراح ارشد کالکشن و تصویرساز وب۳',
    roleEn: 'Lead NFT Artist & Digital Illustrator',
    department: 'web3',
    initials: 'AE',
    imageUrl: '/assets/team/ali-ebrahimi.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/772b4b4b-c8bc-44cd-ba13-951cef7d99d5/772b4b4b-c8bc-44cd-ba13-951cef7d99d5-Ali%20Ebrahimi.webp',
    bio: 'خلق کاراکترها و تصویرسازی مجموعه‌های دوبعدی با لایه‌بندی هنری غنی، لور داستانی و ماندگاری بصری.',
  },
];

export const CHARACTER_CONCEPTS: CharacterConcept[] = [
  {
    id: 'poyo',
    nameFa: 'پویو (قهرمان داستان)',
    nameEn: 'Poyo · The Protagonist',
    role: 'پسربچه گربه‌ای پرماجرا',
    description:
      'کودکی که خودش را بدشانس‌ترین بچه دنیا می‌داند و در آستانه روز تولدش، آرزو دارد توانایی‌های واقعی خود را نشان دهد.',
    renderType: 'hero',
  },
  {
    id: 'nino',
    nameFa: 'نینو (خواهر کمال‌گرا)',
    nameEn: 'Nino · Perfectionist Sister',
    role: 'خواهر بااستعداد و دقیق پویو',
    description:
      'عضو منظم و تحسین‌شده خانواده میو که رقابت پویو با او محرک اصلی وقایع کمدی و عاطفی داستان می‌شود.',
    renderType: 'companion',
  },
  {
    id: 'mr-mio',
    nameFa: 'آقا میو (پدربزرگ بازیگوش)',
    nameEn: 'Mr. Mio · Playful Grandfather',
    role: 'قلب تپنده و همراه خانواده میو',
    description:
      'پدربزرگی بازیگوش و باذوق که زندگی را همچون یک بازی شگفت‌انگیز می‌بیند و نگاهی متفاوت به موفقیت دارد.',
    renderType: 'mentor',
  },
  {
    id: 'louie-rudy',
    nameFa: 'لویی و رودی',
    nameEn: 'Louie & Rudy',
    role: 'دوست همراه و رقیب داستان',
    description:
      'لویی، دوست صمیمی و همراه پویو در ماجراجویی‌های شهری، و رودی، رقیبی که چالش‌های جشن بزرگ شهر را رقم می‌زند.',
    renderType: 'creature',
  },
];

export const SELECTED_WORKS: ProjectWork[] = [
  {
    id: 'wonderful-day',
    title: 'انیمیشن و توسعه IP · سینمایی بلند «روز شگفت‌انگیز»',
    shortTitle: 'انیمیشن سینمایی و توسعه IP',
    categoryFa: '۱. انیمیشن و توسعه IP',
    categoryKey: 'animation',
    subtitle: 'Animation & IP Development · Feature Films',
    shortSummary:
      'توسعه و تولید انیمیشن‌های سه‌بعدی سینمایی، خلق شخصیت‌ها و جهان‌های داستانی با محوریت «روز شگفت‌انگیز»، «روز شگفت‌انگیز ۲» و «داستان نوروز».',
    imageUrl:
      'https://s1.uploadkon.ir/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6-WonderfulDay.webp',
    videoUrl:
      'https://my.uploadkon.ir/d/kTietQDzNP9HG0g6en6svEr0bdejyd/NTM1NDZ8cGFkZA.mp4',
    description:
      'توسعه و تولید انیمیشن، خلق شخصیت‌ها و جهان‌های داستانی و گسترش دارایی‌های فکری (IP) با هویت هنری و فرهنگی متمایز. محور اصلی این دپارتمان، انیمیشن سه‌بعدی سینمایی بلند «روز شگفت‌انگیز» به تهیه‌کنندگی فیلمیران درباره پویو و خانواده میو در شهری خیال‌پردازانه است.',
    secondaryDescription:
      'در کنار «روز شگفت‌انگیز»، پروژه‌های «روز شگفت‌انگیز ۲ (A Wonderful Day 2)» با هدف گسترش دنیای شخصیت‌ها و «داستان نوروز (Nowruz Story)» با محوریت نوروز در مسیر توسعه آثار جدید استودیو قرار دارند.',
    highlightsTitle: 'ویژگی‌های هویت بصری و توسعه IP:',
    highlights: [
      'انیمیشن سه‌بعدی استایلایز با سیلوئت‌های متمایز، جزئیات چهره، خز و پوشش و جهان شهری فانتزی رنگارنگ',
      'ترکیب کمدی فیزیکی، موسیقی، ترانه، رپ و لحظه‌های فانتزی با محوریت پذیرش تفاوت‌های فردی و ارزش خانواده',
      'پشتیبانی پایپلاین تولید با ابزارهای هوشمند برای توسعه کانسپت، اصلاح فریم‌ها و حفظ پیوستگی سبک بصری',
    ],
    tags: ['انیمیشن سه‌بعدی سینمایی بلند', 'توسعه IP و جهان‌سازی', 'کمدی و خانوادگی', 'پایپلاین هوشمند'],
    canvasType: 'wonderful-day',
    relatedMemberIds: [
      'mahmoud-mohammadian',
      'mehdi-mohammadian',
      'mohammad-rahimi',
      'mahla-moein',
      'aida-varasteh',
      'ali-alipour',
      'negar-baratzadeh',
      'hanieh-samipoor',
      'lotfallah-salehi',
      'mohammad-amin-zafari',
      'khorshid-khooban',
      'hilda-baghban',
    ],
    teamGroups: [
      {
        id: 'wd-directing',
        title: 'بخش کارگردانی',
        headIds: ['mahmoud-mohammadian'],
        memberIds: ['mahla-moein', 'aida-varasteh', 'ali-alipour'],
      },
      {
        id: 'wd-technical',
        title: 'بخش فنی',
        headIds: ['mehdi-mohammadian'],
        memberIds: [
          'ali-alipour',
          'negar-baratzadeh',
          'hanieh-samipoor',
          'lotfallah-salehi',
          'mohammad-amin-zafari',
        ],
      },
      {
        id: 'wd-artistic',
        title: 'بخش هنری',
        headIds: ['mohammad-rahimi'],
        memberIds: [
          'negar-baratzadeh',
          'khorshid-khooban',
          'hilda-baghban',
          'mahla-moein',
          'aida-varasteh',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'wd-showreel',
        title: 'تیزر و شوریل سینمایی «روز شگفت‌انگیز»',
        subtitle: 'Official Cinematic Showreel · A Wonderful Day',
        badge: 'ویدیوی رسمی اثر',
        description:
          'نمایشی از فضای شهری رنگارنگ، کاراکترهای پویو و خانواده میو، نورپردازی سینمایی و کیفیت بصری انیمیشن بلند «روز شگفت‌انگیز».',
        imageUrl:
          'https://s1.uploadkon.ir/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6-WonderfulDay.webp',
        videoUrl:
          'https://my.uploadkon.ir/d/kTietQDzNP9HG0g6en6svEr0bdejyd/NTM1NDZ8cGFkZA.mp4',
      },
      {
        id: 'wd-shot-1',
        title: 'پویو و آقا میو · شات سینمایی کاراکترها',
        subtitle: 'Character & Lighting Study · Poyo & Grandfather',
        badge: 'رندر نهایی ۳D',
        description:
          'جزئیات بافت خز، لباس، نورپردازی گرم و ارتباط عاطفی پویو با پدربزرگ بازیگوش خانواده میو.',
        imageUrl:
          'https://s1.uploadkon.ir/e14fa7ac-1b24-4d1a-ac3b-06e5be9dc7e2/e14fa7ac-1b24-4d1a-ac3b-06e5be9dc7e2-Poyogran.webp',
      },
      {
        id: 'wd-shot-2',
        title: 'پویو و موقعیت‌های کمدی · طراحی اکتینگ',
        subtitle: 'Stylized 3D Acting & Expression · Poyo',
        badge: 'شات سینمایی',
        description:
          'اکتینگ چهره و بدن، تناسبات استایلایز و زمان‌بندی کمدی در مواجهه با اتفاقات پیش‌بینی‌ناپذیر داستان.',
        imageUrl:
          'https://s1.uploadkon.ir/907a66af-e858-475b-866d-a2c491cead48/907a66af-e858-475b-866d-a2c491cead48-poyocactus.webp',
      },
      {
        id: 'wd-shot-3',
        title: 'شخصیت‌های مکمل و جهان حیوانات انسان‌وار',
        subtitle: 'Secondary Cast & Worldbuilding · Hamsters',
        badge: 'طراحی کاراکتر و محیط',
        description:
          'تنوع سیلوئت‌ها و شخصیت‌پردازی شهروندان شهر در کنار پالت رنگی زنده و معماری فانتزی محیط.',
        imageUrl:
          'https://s1.uploadkon.ir/22f0d12f-8b58-4c91-b4c6-3ad99b3d694f/22f0d12f-8b58-4c91-b4c6-3ad99b3d694f-hamsters2.webp',
      },
      {
        id: 'wd-shot-4',
        title: 'کانسپت‌آرت و پردازش چهره کاراکتر کودک',
        subtitle: 'Visual Development & Fur Grooming',
        badge: 'توسعه بصری',
        description:
          'توسعه استایل بصری، کنترل گرمای رنگ و ظرافت پردازش مو و چشم‌ها در پایپلاین تولید استودیو.',
        imageUrl:
          'https://s1.uploadkon.ir/b1225488-41b4-4176-a55d-78b6678dd761/b1225488-41b4-4176-a55d-78b6678dd761-babyham.webp',
      },
    ],
  },
  {
    id: 'commercial-cgi',
    title: 'تبلیغات، تیزرهای تجاری و تولیدات تصویری CGI',
    shortTitle: 'تبلیغات و تولیدات تصویری CGI',
    categoryFa: '۲. تبلیغات و تولیدات تصویری',
    categoryKey: 'commercial',
    subtitle: 'Commercials, Product Films & Creative CGI',
    shortSummary:
      'تولید تیزرهای تبلیغاتی، محتوای CGI، فیلم‌های معرفی محصول و ساخت موسیقی و صدای اختصاصی متناسب با هویت برندها.',
    imageUrl: '/assets/commercial-teaser-banner.webp',
    fallbackImageUrl:
      'https://s1.uploadkon.ir/de56bd6b-1e23-4a57-823e-47f2af166cdf/de56bd6b-1e23-4a57-823e-47f2af166cdf-TeaserSection.webp',
    internationalUnit: {
      name: 'BearStudio',
      roleLabel: 'International Unit · BearStudio',
      logoUrl:
        'https://s1.uploadkon.ir/823af67f-3f44-4f1d-a041-96a831aae368/823af67f-3f44-4f1d-a041-96a831aae368-BearStudio-Logo.png',
      websiteUrl: 'https://3earstudio.com/',
      websiteLabel: '3earstudio.com',
      keywordsFa: ['تیزرهای تبلیغاتی', 'تولیدات تصویری CGI', 'هوش مصنوعی', 'طراحی صدا'],
      keywordsEn: ['Commercials', 'Creative CGI', 'AI Assisted', '2D Motion', 'Sound Design'],
    },
    description:
      'آرتا ماد هنر با بهره‌گیری از ظرفیت‌های انیمیشن سه‌بعدی، جلوه‌های بصری و هوش مصنوعی، در زمینه تولید تیزرهای تبلیغاتی، محتوای CGI، فیلم‌های معرفی محصول و تولیدات تصویری خلاقانه متناسب با نیاز برندها و کسب‌وکارها فعالیت می‌کند.',
    secondaryDescription:
      'به‌کارگیری هوش مصنوعی، متناسب با نیاز هر پروژه، به تسریع مراحل تولید، افزایش انعطاف‌پذیری در اجرای ایده‌های بصری و مدیریت بهینه منابع کمک می‌کند؛ بدون آنکه نقش کارگردانی هنری، کیفیت بصری و هویت برند در فرایند خلق اثر نادیده گرفته شود.',
    highlightsTitle: 'رویکرد تولید یکپارچه محتوای تجاری:',
    highlights: [
      'همراهی کامل از توسعه ایده و طراحی بصری تا تولید، اصلاح فریم‌ها و پرداخت نهایی تصویر',
      'تلفیق ایده‌پردازی خلاقانه و تخصص هنری با استفاده هدفمند از فناوری‌های نوین در مراحل مختلف تولید',
      'حفظ کامل کارگردانی هنری، کیفیت بصری و اصالت هویت برند در کنار بهینه‌سازی زمان و منابع',
    ],
    tags: ['تیزرهای تبلیغاتی', 'محتوای CGI', 'فیلم معرفی محصول', 'کارگردانی هنری برند'],
    canvasType: 'commercial-cgi',
    relatedMemberIds: [
      'mohammad-rahimi',
      'khorshid-khooban',
      'hanieh-samipoor',
      'reyhaneh-saeidi',
    ],
    teamGroups: [
      {
        id: 'cgi-head',
        title: 'هد دپارتمان',
        isHead: true,
        memberIds: ['mohammad-rahimi'],
      },
      {
        id: 'cgi-members',
        title: 'اعضای تیم',
        memberIds: ['khorshid-khooban', 'hanieh-samipoor', 'reyhaneh-saeidi'],
      },
    ],
    galleryItems: [
      {
        id: 'cgi-01-kmc-shadow',
        title: 'تیزر تبلیغاتی خودرو KMC Shadow',
        titleEn: 'KMC Shadow',
        subtitle: 'AI Assisted Commercial Film · Automotive CGI',
        category: 'AI Assisted',
        badge: 'تولید ترکیبی AI و CGI',
        description:
          'تیزر سینمایی معرفی خودرو KMC Shadow با کارگردانی هنری نور و سایه، شبیه‌سازی محیط و یکپارچه‌سازی پایپلاین هوش مصنوعی مولد با کامپوزیت حرفه‌ای.',
        imageUrl: 'https://3earstudio.com/thumbnails/kmc-shadow.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/kmc-shadow-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/JI81cPnvoFU?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/JI81cPnvoFU',
        platform: 'youtube',
      },
      {
        id: 'cgi-02-sadra',
        title: 'فیلم تبلیغاتی و هویت بصری SADRA',
        titleEn: 'SADRA',
        subtitle: 'AI Assisted Brand Film & Visual Storytelling',
        category: 'AI Assisted',
        badge: 'تولید ترکیبی AI و CGI',
        description:
          'روایت تصویری و تیزر تبلیغاتی برند صدرا (SADRA) با بهره‌گیری از گردش‌کار ترکیبی هوش مصنوعی، اصلاح رنگ سینمایی و طراحی فضای بصری متمایز.',
        imageUrl: 'https://3earstudio.com/thumbnails/sadra.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/sadra-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/7UYXnPXlpSY?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/7UYXnPXlpSY',
        platform: 'youtube',
      },
      {
        id: 'cgi-03-moeini-pour',
        title: 'تیزر تبلیغاتی برند معینی‌پور (Moeini Pour)',
        titleEn: 'Moeini Pour',
        subtitle: 'Luxury Product Film & AI Assisted Visuals',
        category: 'AI Assisted',
        badge: 'تولید ترکیبی AI و CGI',
        description:
          'خلق اتمسفر لوکس، کارگردانی هنری محصول و اجرای جلوه‌های بصری با ترکیب تکنیک‌های CGI و هوش مصنوعی برای کمپین تبلیغاتی برند معینی‌پور.',
        imageUrl:
          'https://s1.uploadkon.ir/94160ee8-99c8-4a18-996e-9ceb72a0da45/94160ee8-99c8-4a18-996e-9ceb72a0da45-Moeini%20Teaser%202.webp',
        fallbackImageUrl: 'https://3earstudio.com/thumbnails/moeini-pour.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/moeini-pour-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/TXuGBz6Qg8I?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/TXuGBz6Qg8I',
        platform: 'youtube',
      },
      {
        id: 'cgi-04-sorfe-making-of',
        title: 'پشت‌صحنه و مراحل تولید موزیک‌ویدیو «سرفه»',
        titleEn: '"SORFE" Music Video',
        subtitle: 'Making of · VFX Breakdown & Production Pipeline',
        category: 'Making of',
        badge: 'پشت‌صحنه و مراحل ساخت',
        description:
          'نمایش لایه‌به‌لایه مراحل ساخت، کامپوزیت، جلوه‌های بصری و فرآیند پس‌ازتولید موزیک‌ویدیو «سرفه» از ایده اولیه تا خروجی نهایی.',
        imageUrl: 'https://3earstudio.com/thumbnails/sorfe.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/sorfe-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/Zm9FOwcllmI?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/Zm9FOwcllmI',
        platform: 'youtube',
      },
      {
        id: 'cgi-05-mardomak',
        title: 'تیزر تبلیغاتی اکسسوری مردمک (Mardomak Accessories)',
        titleEn: 'Mardomak Accessories',
        subtitle: 'Commercial Editorial · Fashion & Accessories',
        category: 'Editorial',
        badge: 'تدوین و کارگردانی بصری',
        description:
          'تدوین ریتمیک، ضرباهنگ بصری پویا و پرداخت رنگ و نور برای معرفی کالکشن برند اکسسوری مردمک متناسب با رسانه‌های دیجیتال.',
        imageUrl: 'https://3earstudio.com/thumbnails/mardomak.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/mardomak-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/YA57qZWrIrA?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/YA57qZWrIrA',
        platform: 'youtube',
      },
      {
        id: 'cgi-06-burux-magicbox',
        title: 'طراحی صدا و فضای صوتی Burux Magicbox',
        titleEn: 'Burux Magicbox Sound Design',
        subtitle: 'Bespoke Sound Design, Foley & Audio Architecture',
        category: 'Sound Design',
        badge: 'طراحی صدا و SFX',
        description:
          'معماری صوتی اختصاصی، افکت‌های صوتی دقیق (SFX & Foley) و همگام‌سازی بافت‌های شنیداری با حرکات سه‌بعدی و موشن‌گرافیک محصول.',
        imageUrl: 'https://3earstudio.com/thumbnails/burux-magicbox-sound-design.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/burux-magicbox-sound-design-preview.mp4',
        embedUrl:
          'https://player.vimeo.com/video/1192792284?h=617dc49fd3&autoplay=1&title=0&byline=0&portrait=0',
        externalUrl: 'https://player.vimeo.com/video/1192792284?h=617dc49fd3',
        platform: 'vimeo',
      },
      {
        id: 'cgi-07-football-future',
        title: 'طراحی صدا و تدوین تیزر Football Future',
        titleEn: 'Football Future',
        subtitle: 'Cinematic Sound Design & Dynamic Sports Audio',
        category: 'Sound Design',
        badge: 'طراحی صدا و SFX',
        description:
          'خلق اتمسفر صوتی پرانرژی، لایه‌بندی افکت‌های محیطی استادیوم و ضرباهنگ سینمایی برای القای هیجان و آینده‌نگری در تصویر.',
        imageUrl: 'https://3earstudio.com/thumbnails/football-future.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/football-future-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/HVu-3mx592c?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/HVu-3mx592c',
        platform: 'youtube',
      },
      {
        id: 'cgi-08-cyber-car',
        title: 'طراحی صدای هایپررئال پروژه Cyber Car',
        titleEn: 'Cyber Car',
        subtitle: 'Sci-Fi Automotive SFX & Acoustic Post-Production',
        category: 'Sound Design',
        badge: 'طراحی صدا و SFX',
        description:
          'طراحی بافت‌های صوتی مکانیکی، غرش موتور، افکت‌های سایبرنتیک و میکس استریو برای شبیه‌سازی حس سرعت و فناوری در فضای سه‌بعدی.',
        imageUrl: 'https://3earstudio.com/thumbnails/cyber-car.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/cyber-car-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/eV7RHSN40Y0?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/eV7RHSN40Y0',
        platform: 'youtube',
      },
      {
        id: 'cgi-09-no-way-back',
        title: 'طراحی صدا و اتمسفر سینمایی No Way Back',
        titleEn: 'No Way Back',
        subtitle: 'Dramatic Soundscape, Foley & Tension Building',
        category: 'Sound Design',
        badge: 'طراحی صدا و SFX',
        description:
          'ساختار صوتی دراماتیک، کنترل پویایی صدا (Dynamics) و ترکیب موسیقی و افکت‌های محیطی برای تقویت تعلیق و روایت بصری اثر.',
        imageUrl: 'https://3earstudio.com/thumbnails/no-way-back.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/no-way-back-preview.mp4',
        embedUrl: 'https://www.youtube.com/embed/4oBniNGSixA?autoplay=1&rel=0',
        externalUrl: 'https://youtu.be/4oBniNGSixA',
        platform: 'youtube',
      },
      {
        id: 'cgi-10-novin-electronic',
        title: 'موشن‌گرافیک و تیزر دوبعدی نوین الکترونیک',
        titleEn: 'Novin Electronic',
        subtitle: '2D Motion Design & Corporate Visual Identity',
        category: '2D',
        badge: 'موشن‌گرافیک و ۲D',
        description:
          'طراحی گرافیک متحرک (2D Motion Graphics)، تصویرسازی برداری و انیمیت روان برای معرفی خدمات و محصولات برند نوین الکترونیک.',
        imageUrl: 'https://3earstudio.com/thumbnails/novin.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/novin-preview.mp4',
        embedUrl:
          'https://player.vimeo.com/video/1188785498?h=16f5ecf8f2&autoplay=1&title=0&byline=0&portrait=0',
        externalUrl: 'https://player.vimeo.com/video/1188785498?h=16f5ecf8f2',
        platform: 'vimeo',
      },
      {
        id: 'cgi-11-evolution-freemasonry',
        title: 'مستند انیمیشنی و موشن‌گرافیک دوبعدی (2D Storytelling)',
        titleEn: 'The Evolution of Freemasonry',
        subtitle: '2D Animated Documentary & Visual Narrative',
        category: '2D',
        badge: 'انیمیشن و روایت ۲D',
        description:
          'تصویرسازی اختصاصی، کارگردانی هنری دوبعدی، کامپوزیت لایه‌های نوری و حرکت دوربین در فضای ۲.۵ بعدی برای روایت مستند تاریخی.',
        imageUrl: 'https://3earstudio.com/thumbnails/the-evolution-of-freemasonry.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/the-evolution-of-freemasonry-preview.mp4',
        embedUrl:
          'https://player.vimeo.com/video/1185425680?h=8ec53b6b9d&autoplay=1&title=0&byline=0&portrait=0',
        externalUrl: 'https://player.vimeo.com/video/1185425680?h=8ec53b6b9d',
        platform: 'vimeo',
      },
      {
        id: 'cgi-12-social-media-showreel',
        title: 'شوریل تولیدات دیجیتال و شبکه‌های اجتماعی (Social Media Showreel)',
        titleEn: 'Social Media Showreel',
        subtitle: 'Showreel · Short-Form Commercials & Digital Content',
        category: 'Showreel',
        badge: 'شوریل رسمی (Showreel)',
        description:
          'گزیده‌ای از تیزرها، ویدیوهای خلاقانه و کمپین‌های تولیدشده ویژه پلتفرم‌های دیجیتال و شبکه‌های اجتماعی با ریتم تند و هویت بصری متنوع.',
        imageUrl: 'https://3earstudio.com/thumbnails/social-media.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/social-media-preview.mp4',
        embedUrl:
          'https://player.vimeo.com/video/1185064470?h=3b1fb4b7d7&autoplay=1&title=0&byline=0&portrait=0',
        externalUrl: 'https://player.vimeo.com/video/1185064470?h=3b1fb4b7d7',
        platform: 'vimeo',
      },
      {
        id: 'cgi-13-commercial-showreel',
        title: 'شوریل جامع تیزرهای تبلیغاتی و تولیدات تجاری (Commercial Showreel)',
        titleEn: 'Commercial Showreel',
        subtitle: 'Showreel · Flagship Broadcast & CGI Commercials',
        category: 'Showreel',
        badge: 'شوریل رسمی (Showreel)',
        description:
          'مروری بر شاخص‌ترین تیزرهای تبلیغاتی، فیلم‌های معرفی محصول، جلوه‌های ویژه بصری و تولیدات CGI استودیو برای برندها و کسب‌وکارها.',
        imageUrl: 'https://3earstudio.com/thumbnails/commercial.jpg',
        previewVideoUrl: 'https://3earstudio.com/videos/commercial-preview.mp4',
        embedUrl:
          'https://player.vimeo.com/video/1184364258?h=61c6ba7c49&autoplay=1&title=0&byline=0&portrait=0',
        externalUrl: 'https://player.vimeo.com/video/1184364258?h=61c6ba7c49',
        platform: 'vimeo',
      },
    ],
  },
  {
    id: 'game-lab',
    title: 'بازی‌سازی و سرگرمی تعاملی (Interactive Entertainment)',
    shortTitle: 'بازی‌سازی و سرگرمی تعاملی',
    categoryFa: '۳. بازی‌سازی و سرگرمی تعاملی',
    categoryKey: 'game',
    subtitle: 'PC, Mobile & Tabletop Game Development',
    shortSummary:
      'طراحی و توسعه بازی‌های رایانه‌ای، موبایلی و رومیزی با تمرکز بر روایت‌پردازی، جهان‌سازی و گسترش زنجیره ارزش IP.',
    description:
      'طراحی و توسعه بازی‌های رایانه‌ای، موبایلی و رومیزی با تمرکز بر روایت، جهان‌سازی و تجربه‌های تعاملی که امتداد زنجیره ارزش دارایی‌های فکری (IP) استودیو را در رسانه‌های تعاملی شکل می‌دهند.',
    secondaryDescription:
      'در استودیو آرتا ماد هنر، شخصیت‌ها و جهان‌های خلق‌شده در آثار انیمیشنی از ابتدا با قابلیت گسترش به بازی‌های ویدیویی و بردگیم‌های خانوادگی طراحی می‌شوند تا مخاطب بتواند فراتر از تماشای فیلم، در دنیای اثر زندگی و تعامل کند.',
    highlightsTitle: 'محورهای طراحی و توسعه سرگرمی تعاملی:',
    highlights: [
      'طراحی و توسعه بازی‌های رایانه‌ای، موبایلی و رومیزی با هویت هنری منسجم',
      'تمرکز عمیق بر روایت‌پردازی، جهان‌سازی و خلق تجربه‌های تعاملی درگیرکننده',
      'گسترش دارایی‌های فکری (IP) استودیو در قالب محصولات و پلتفرم‌های سرگرمی متنوع',
    ],
    tags: ['بازی‌های رایانه‌ای و موبایلی', 'بازی‌های رومیزی', 'جهان‌سازی و روایت تعاملی', 'توسعه زنجیره ارزش IP'],
    canvasType: 'game-lab',
    isUpcoming: true,
    relatedMemberIds: [
      'mehdi-mohammadian',
      'mahmoud-mohammadian',
      'negar-baratzadeh',
      'ali-alipour',
    ],
    teamGroups: [
      {
        id: 'game-head',
        title: 'هد دپارتمان',
        isHead: true,
        memberIds: ['mehdi-mohammadian'],
      },
      {
        id: 'game-members',
        title: 'اعضای تیم',
        memberIds: ['mahmoud-mohammadian', 'negar-baratzadeh', 'ali-alipour'],
      },
    ],
    galleryItems: [
      {
        id: 'game-digital',
        title: 'توسعه بازی‌های رایانه‌ای و موبایلی مبتنی بر جهان IP',
        subtitle: 'Interactive Storytelling & Stylized Game Worlds',
        badge: 'بازی‌های دیجیتال',
        description:
          'طراحی مکانیک‌های گیم‌پلی، مراحل و دارایی‌های سه‌بعدی برای پلتفرم‌های موبایل و رایانه‌های شخصی در امتداد جهان داستانی استودیو.',
        canvasType: 'game-lab',
      },
      {
        id: 'game-tabletop',
        title: 'طراحی بازی‌های رومیزی (Board Games) خانوادگی و استراتژیک',
        subtitle: 'Tabletop Game Design & Physical IP Merchandising',
        badge: 'بازی‌های رومیزی',
        description:
          'خلق تجربه‌های تعاملی فیزیکی، طراحی کارت‌ها، فیگورها و قوانین بازی با هدف تقویت تعامل خانواده‌ها و گسترش محصولات جانبی IP.',
        canvasType: 'character-concept',
      },
    ],
  },
  {
    id: 'web3-nft',
    title: 'فناوری‌های نوین، هوش مصنوعی و توسعه محصول (Web3 & AI)',
    shortTitle: 'فناوری‌های نوین، AI و Web3',
    categoryFa: '۴. فناوری‌های نوین و توسعه محصول',
    categoryKey: 'web3',
    subtitle: 'AI Automation, Creative Tech & Web3 Solutions',
    shortSummary:
      'به‌کارگیری هوش مصنوعی و اتوماسیون در پایپلاین‌های تولید رسانه و توسعه محصولات فناورانه و کالکشن‌های دیجیتال Web3.',
    description:
      'به‌کارگیری هوش مصنوعی و اتوماسیون در فرایندهای تولید و توسعه محصولات فناورانه در حوزه رسانه و سرگرمی، از جمله راهکارهای مبتنی بر هوش مصنوعی و فناوری‌های Web3.',
    secondaryDescription:
      'این دپارتمان وظیفه تحقیق و توسعه (R&D)، مهندسی پایپلاین‌های هوشمند تصویر و ویدیو، و همچنین خلق دارایی‌های دیجیتال کلکسیونی بر بستر بلاکچین را بر عهده دارد.',
    highlightsTitle: 'ظرفیت‌های فناورانه و نوآوری محصول:',
    highlights: [
      'یکپارچه‌سازی هوش مصنوعی و اتوماسیون در گردش‌کار تولید رسانه و انیمیشن',
      'توسعه محصولات فناورانه و دارایی‌های دیجیتال مبتنی بر فناوری‌های Web3',
      'پشتیبانی از توسعه کانسپت، پردازش تصویر و کنترل کیفیت با ابزارهای هوشمند اختصاصی',
    ],
    tags: ['هوش مصنوعی و اتوماسیون', 'فناوری‌های Web3', 'توسعه محصول فناورانه', 'بهینه‌سازی گردش‌کار'],
    canvasType: 'web3-nft',
    relatedMemberIds: [
      'nima-nekookar',
      'mohammad-rahimi',
      'lotfallah-salehi',
      'ali-ebrahimi',
      'hilda-baghban',
    ],
    teamGroups: [
      {
        id: 'web3-head',
        title: 'هد دپارتمان',
        isHead: true,
        memberIds: ['nima-nekookar'],
      },
      {
        id: 'web3-members',
        title: 'اعضای تیم',
        memberIds: ['mohammad-rahimi', 'lotfallah-salehi', 'ali-ebrahimi', 'hilda-baghban'],
      },
    ],
    galleryItems: [
      {
        id: 'web3-collections',
        title: 'معماری اکوسیستم Web3 و کالکشن‌های هنری دیجیتال',
        subtitle: 'Ethereum Smart Contracts & 2D Collectible Art',
        badge: 'Web3 & NFT',
        description:
          'طراحی کاراکترها و مجموعه‌های دوبعدی کلکسیونی با لایه‌بندی هنری غنی، لور داستانی و پیاده‌سازی قراردادهای هوشمند ایمن.',
        canvasType: 'web3-nft',
      },
      {
        id: 'ai-pipeline-arch',
        title: 'اتوماسیون پایپلاین هوش مصنوعی و کنترل پیوستگی بصری',
        subtitle: 'Hybrid AI Production Workflows & Consistency Tools',
        badge: 'هوش مصنوعی در تولید',
        description:
          'طراحی گردش‌کارهای ترکیبی (Sora, Veo, Kling, Midjourney) در کنار کنترل کیفی انسانی برای تثبیت استایل بصری در مقیاس سینمایی.',
        canvasType: 'character-poopi',
      },
    ],
  },
  {
    id: 'vfx-mapping',
    title: 'ویدئو مپینگ، کارگردانی بصری صحنه و تجربه‌های فراگیر',
    shortTitle: 'ویدئو مپینگ و تجربه‌های بصری فراگیر',
    categoryFa: '۵. تجربه‌های بصری و رسانه‌های نوین',
    categoryKey: 'vfx',
    subtitle: 'Architectural Video Mapping & Live Stage Visuals',
    imageUrl: '/assets/vfx-img-1.webp',
    shortSummary:
      'طراحی و اجرای ویدئو مپینگ معماری، کارگردانی بصری کنسرت‌ها و خلق تجربه‌های تصویری فراگیر همگام با اجرای زنده ارکستر (نظیر کنسرت‌های علیرضا قربانی در کاخ سعدآباد).',
    description:
      'طراحی و اجرای ویدئو مپینگ در مقیاس معماری (Architectural Projection Mapping)، کارگردانی بصری کنسرت‌ها و خلق تجربه‌های تصویری فراگیر برای اجراهای بزرگ صحنه‌ای و فضاهای تاریخی و شهری. این دپارتمان با پیوند هنر تصویر، تدوین ریتمیک، طراحی صدا و مهندسی نمایش، بناهای شاخص و صحنه‌های اجرا را به بوم‌های زنده و همگام با موسیقی تبدیل می‌کند.',
    secondaryDescription:
      'از شاخص‌ترین پروژه‌های اجراشده در این دپارتمان، طراحی و اجرای ویدئو مپینگ و کارگردانی بصری صحنه در کنسرت‌های بزرگ علیرضا قربانی در مجموعه فرهنگی‌تاریخی کاخ سعدآباد (تابستان ۱۴۰۲) است؛ جایی که خطوط معماری، ایوان و ستون‌های بنای تاریخی سعدآباد در هماهنگی کامل با ارکستر و قطعاتی چون «شوشتری» و «عروج» به بخشی از روایت تصویری و حسی اجرا بدل شدند.',
    highlightsTitle: 'محورهای تخصصی در ویدئو مپینگ و اجراهای صحنه‌ای:',
    highlights: [
      'طراحی و اجرای ویدئو مپینگ معماری (Architectural Mapping) منطبق بر هندسه، ستون‌ها و کالبد بناهای تاریخی و صحنه‌های بزرگ',
      'کارگردانی بصری کنسرت و همگام‌سازی دقیق لایه‌های تصویر و نورپردازی صحنه با ریتم موسیقی زنده و اجرای ارکستر',
      'هم‌افزایی طراحی جلوه‌های بصری (VFX)، تدوین موسیقی‌محور و مهندسی اتمسفر صوتی و تصویری برای رویدادهای کلان فرهنگی و هنری',
    ],
    tags: [
      'ویدئو مپینگ معماری',
      'کارگردانی بصری کنسرت',
      'علیرضا قربانی · کاخ سعدآباد',
      'تجربه‌های بصری فراگیر',
    ],
    canvasType: 'vfx-mapping',
    relatedMemberIds: [
      'mohammad-rahimi',
      'hanieh-samipoor',
      'khorshid-khooban',
      'reyhaneh-saeidi',
    ],
    teamGroups: [
      {
        id: 'vfx-head',
        title: 'هد دپارتمان',
        isHead: true,
        memberIds: ['mohammad-rahimi'],
      },
      {
        id: 'vfx-members',
        title: 'اعضای تیم',
        memberIds: ['hanieh-samipoor', 'khorshid-khooban', 'reyhaneh-saeidi'],
      },
    ],
    galleryItems: [
      {
        id: 'vfx-video-shoushtari',
        title: 'قطعه «شوشتری» — کنسرت علیرضا قربانی (کاخ سعدآباد)',
        titleEn: 'Shoushtari · Live Mapping',
        subtitle: 'Alireza Ghorbani Live Concert · Architectural Video Mapping & Stage Visuals',
        badge: 'ویدیوی اجرای زنده · کاخ سعدآباد',
        description:
          'نمونه اجرای زنده و کارگردانی بصری صحنه در قطعه «شوشتری» از کنسرت تابستان ۱۴۰۲ علیرضا قربانی در مجموعه فرهنگی‌تاریخی کاخ سعدآباد؛ تلفیق نورپردازی و مپینگ معماری ستون‌های کاخ با تکنوازی و فضای موسیقایی اثر.',
        imageUrl: '/assets/vfx-yt-shoushtari.jpg',
        fallbackImageUrl: 'https://i.ytimg.com/vi/SMRroEsmD8w/hqdefault.jpg',
        embedUrl: 'https://www.youtube.com/embed/SMRroEsmD8w?autoplay=1&rel=0',
        externalUrl:
          'https://www.youtube.com/watch?v=SMRroEsmD8w&list=PLev5CzGOeUFnx0jUynX8CPrtQOGOPPAhI&index=10',
        platform: 'youtube',
      },
      {
        id: 'vfx-video-orouj',
        title: 'قطعه «عروج» — کنسرت علیرضا قربانی (کاخ سعدآباد)',
        titleEn: 'Orouj · Live Mapping',
        subtitle: 'Alireza Ghorbani Live Concert · Synchronized Stage & Facade Mapping',
        badge: 'ویدیوی اجرای زنده · کاخ سعدآباد',
        description:
          'بخشی از اجرای زنده قطعه «عروج» با صدای علیرضا قربانی در محوطه کاخ سعدآباد؛ همگام‌سازی جلوه‌های بصری، نورپردازی حجمی و ویدئو مپینگ نمای کاخ با اوج‌گیری دراماتیک ارکستر و آواز.',
        imageUrl: '/assets/vfx-yt-orouj.jpg',
        fallbackImageUrl: 'https://i.ytimg.com/vi/5h4KPTBcpEw/hqdefault.jpg',
        embedUrl: 'https://www.youtube.com/embed/5h4KPTBcpEw?autoplay=1&rel=0',
        externalUrl:
          'https://www.youtube.com/watch?v=5h4KPTBcpEw&list=PLev5CzGOeUFnx0jUynX8CPrtQOGOPPAhI&index=14',
        platform: 'youtube',
      },
      {
        id: 'vfx-photo-sadabad-1',
        title: 'نمای سراسری صحنه و ویدئو مپینگ کاخ سعدآباد — کنسرت علیرضا قربانی',
        titleEn: 'Sa’dabad Complex · Summer 2023 Full Stage View',
        subtitle: 'Monumental Outdoor Concert Stage & Palace Facade Mapping',
        badge: 'قاب صحنه · ۱ از ۳',
        description:
          'نمای باز از استیج کنسرت تابستان ۱۴۰۲ علیرضا قربانی در مجموعه فرهنگی‌تاریخی سعدآباد؛ انطباق دقیق ویدئو مپینگ بر روی ستون‌ها و نمای بنا در کنار تایپوگرافی و چیدمان ارکستر.',
        imageUrl: '/assets/vfx-img-1.webp',
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/qEI9yLY4BC6xhPR75WLXTP7EDMqDQw/OTEzNzN8cGFkZA.webp',
      },
      {
        id: 'vfx-photo-sadabad-2',
        title: 'مپینگ هندسی ستون‌ها و ایوان کاخ سعدآباد همگام با ارکستر',
        titleEn: 'Architectural Geometry & Column Projection Mapping',
        subtitle: 'Precision 3D Mapping on Historical Facade Architecture',
        badge: 'قاب صحنه · ۲ از ۳',
        description:
          'تفکیک نوری و گرافیکی خطوط سنتوری، ستون‌ها و ورودی‌های ایوان کاخ سعدآباد با استفاده از تکنیک ویدئو مپینگ کالیبره‌شده بر روی هندسه بنا در حین اجرای زنده.',
        imageUrl: '/assets/vfx-img-2.webp',
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/EfJ05mS4kD8eQnWNuASKg1Ttb17q3v/OTEzNzR8cGFkZA.webp',
      },
      {
        id: 'vfx-photo-sadabad-3',
        title: 'نورپردازی حجمی و اتمسفر بصری ستون‌های صحنه در اجرای زنده',
        titleEn: 'Volumetric Stage Lighting & Live Visual Atmosphere',
        subtitle: 'Immersive Stage Environment & Real-Time Visual Direction',
        badge: 'قاب صحنه · ۳ از ۳',
        description:
          'ایجاد عمق بصری و اتمسفر نوری یکپارچه بر روی ستون‌های عظیم پس‌زمینه صحنه، همسو با حس و حال قطعات موسیقایی در کنسرت کاخ سعدآباد.',
        imageUrl: '/assets/vfx-img-3-stage.jpg',
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/EfJ05mS4kD8eQnWNuASKg1Ttb17q3v/OTEzNzR8cGFkZA.webp',
      },
    ],
  },
];

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
