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
  bio?: string;
  fullBio?: string;
  workHistory?: WorkHistoryItem[];
  specialties?: string[];
  notableWorks?: string[];
  education?: string;
  isCoFounder?: boolean;
  isMystery?: boolean;
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
  subtitle: string;
  description: string;
  badge?: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
  videoUrl?: string;
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
  videoUrl?: string;
  isUpcoming?: boolean;
  relatedMemberIds?: string[];
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
    id: 'mohammad-rahimi',
    name: 'محمد رحیمی',
    nameEn: 'Mohamad Rahimi',
    role: 'هم‌بنیانگذار | مدیر فنی هوش مصنوعی و معمار پایپلاین تولید',
    roleEn: 'Co-Founder | AI Technical Director & Production Pipeline Architect',
    department: 'leadership',
    initials: 'MR',
    isCoFounder: true,
    education: 'کارشناس علوم اجتماعی (۱۳۷۸ – ۱۳۸۱)',
    imageUrl:
      'https://s1.uploadkon.ir/5b883526-116f-4883-bc10-b13d8034b9f8/5b883526-116f-4883-bc10-b13d8034b9f8-Mr-Rahimi.webp',
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
    id: 'mehdi-mohammadian',
    name: 'مهدی محمدیان',
    nameEn: 'Mehdi Mohammadian',
    role: 'هم‌بنیانگذار | کارگردان و نویسنده انیمیشن',
    roleEn: 'Co-Founder | Animation Director & Screenwriter',
    department: 'leadership',
    initials: 'MM',
    isCoFounder: true,
    education: 'کارشناس سینما (گرایش کارگردانی) — دانشگاه هنر تهران',
    imageUrl:
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
    id: 'mahmoud-mohammadian',
    name: 'محمود محمدیان',
    nameEn: 'Mahmoud Mohammadian',
    role: 'هم‌بنیانگذار | کارگردان و نویسنده انیمیشن',
    roleEn: 'Co-Founder | Animation Director & Screenwriter',
    department: 'leadership',
    initials: 'MM',
    isCoFounder: true,
    education: 'کارشناس سینما — دانشگاه هنر تهران',
    imageUrl:
      'https://s1.uploadkon.ir/119f851b-c260-470e-af9a-68803c9aa9ec/119f851b-c260-470e-af9a-68803c9aa9ec-Mr-Mohammadia-Mahmoud2.webp',
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
    id: 'lotfallah-salehi',
    name: 'لطف‌الله صالحی',
    role: 'سوپروایزر تولید و پایپلاین ویدیو',
    roleEn: 'Cinematic Video & Animation Pipeline Specialist',
    department: 'animation',
    initials: 'LS',
    imageUrl:
      'https://s1.uploadkon.ir/e93bca88-90cc-4c47-ba22-fd124f7330d6/e93bca88-90cc-4c47-ba22-fd124f7330d6-Salehii.webp',
    bio: 'معماری و اتوماسیون جریان داده‌های رندرینگ، بهینه‌سازی موتورهای گرافیکی و یکپارچه‌سازی پایپلاین تولید.',
  },
  {
    id: 'ali-alipour',
    name: 'علی علیپور',
    role: 'دستیار کارگردان و هنرمند چندرسانه‌ای انیمیشن',
    roleEn: 'Animation Assistant Director & Multimedia Artist',
    department: 'animation',
    initials: 'AA',
    imageUrl:
      'https://s1.uploadkon.ir/8553b6d2-c72a-4672-9e8b-91e182d3a818/8553b6d2-c72a-4672-9e8b-91e182d3a818-Alipour.webp',
    bio: 'همراهی در هدایت هنری و اجرایی پروژه، تدوین روایت تصویری، ضبط و اجرای نریشن و توسعهٔ کانسپت‌های بصری در مسیر تولید انیمیشن.',
  },
  {
    id: 'negar-baratzadeh',
    name: 'نگار برات‌زاده',
    role: 'طراح ارشد کانسپت و فریم‌آرتیست انیمیشن',
    roleEn: 'Senior Visual Development & Concept Frame Artist',
    department: 'animation',
    initials: 'NB',
    imageUrl:
      'https://s1.uploadkon.ir/cc81ebc2-2d6d-450e-aeda-21f19236decb/cc81ebc2-2d6d-450e-aeda-21f19236decb-Negar.webp',
    bio: 'خلق دنیاهای مسحورکننده بصری، توسعه کانسپت کاراکترها و تصویرسازی کلیدفریم‌های احساسی و سینمایی.',
  },
  {
    id: 'hilda-baghban',
    name: 'هیلدا باغبان',
    role: 'آرتیست پردازش تصویر و اصلاح بصری',
    roleEn: 'Digital Image & Visual Finishing Artist',
    department: 'animation',
    initials: 'HB',
    imageUrl:
      'https://s1.uploadkon.ir/1a596e04-2840-4f60-b243-9e5804365f0d/1a596e04-2840-4f60-b243-9e5804365f0d-Hilda.webp',
    bio: 'پردازش دقیق لایه‌های گرافیکی، فینیشینگ دیجیتال، کنترل گرمای رنگ و تثبیت وفاداری استایل بصری در فریم‌های نهایی.',
  },
  {
    id: 'khorshid-khooban',
    name: 'خورشید خوبان',
    role: 'مدیر پروژه و تولید تیزر | آهنگساز و طراح موسیقی',
    roleEn: 'Teaser Product Manager | Music Composer & Audio Producer',
    department: 'commercial',
    initials: 'KK',
    imageUrl:
      'https://s1.uploadkon.ir/afa19693-7400-493b-a892-5b9194ecbc39/afa19693-7400-493b-a892-5b9194ecbc39-Khorshid.webp',
    bio: 'مدیریت دقیق زمان‌بندی دپارتمان تیزر همگام با ساخت موسیقی متن و معماری اتمسفر صوتی اختصاصی برندها.',
  },
  {
    id: 'hanieh-samipoor',
    name: 'حانیه سامی‌پور',
    role: 'تدوینگر ارشد و طراح جلوه‌های صوتی',
    roleEn: 'Lead Video Editor & Sound Designer - SFX',
    department: 'commercial',
    initials: 'HS',
    imageUrl:
      'https://s1.uploadkon.ir/2bd7e8c4-476a-4de2-9e70-5925159e6d5f/2bd7e8c4-476a-4de2-9e70-5925159e6d5f-Haniye.webp',
    bio: 'خلق ریتم‌های گیرا در تدوین فیلم و طراحی بافت‌های صوتی هایپررئال (Foley & SFX) جهت درگیرسازی حسی مخاطب.',
  },
  {
    id: 'nima-nekookar',
    name: 'نیما نکوکار',
    role: 'مدیر ارشد دپارتمان وب۳ و سوپروایزر NFT',
    roleEn: 'Head of Web3 & NFT Supervisor',
    department: 'web3',
    initials: 'NN',
    imageUrl:
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
    imageUrl:
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
      'lotfallah-salehi',
      'ali-alipour',
      'negar-baratzadeh',
      'hilda-baghban',
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
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/YJHLUj7EHxpdPffT3TkF4Iv7QR7Ulq/NTM0NjR8cGFkZA.webp',
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
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/pT94wdX9g1Ii0z0tQbng2CSiIA0neX/NTM0NjN8cGFkZA.webp',
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
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/738azeYo1haWym8RKQkuAhD9a4mKkv/NTM0NjZ8cGFkZA.webp',
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
        fallbackImageUrl:
          'https://my.uploadkon.ir/d/s5m1gGTGtQHGTXoNJbqbODjCBDlp0C/NTM0NjV8cGFkZA.webp',
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
    imageUrl:
      'https://s1.uploadkon.ir/94160ee8-99c8-4a18-996e-9ceb72a0da45/94160ee8-99c8-4a18-996e-9ceb72a0da45-Moeini%20Teaser%202.webp',
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
      'mahmoud-mohammadian',
      'mohammad-rahimi',
      'khorshid-khooban',
      'hanieh-samipoor',
    ],
    galleryItems: [
      {
        id: 'cgi-moeini',
        title: 'تیزر تبلیغاتی و رندرینگ محصول تجاری',
        subtitle: 'Commercial CGI & Product Visualization',
        badge: 'تیزر تبلیغاتی',
        description:
          'کارگردانی هنری، نورپردازی استودیویی، شبیه‌سازی متریال و کامپوزیت نهایی برای معرفی محصول با استاندارد پخش تلویزیونی.',
        imageUrl:
          'https://s1.uploadkon.ir/94160ee8-99c8-4a18-996e-9ceb72a0da45/94160ee8-99c8-4a18-996e-9ceb72a0da45-Moeini%20Teaser%202.webp',
        canvasType: 'commercial-cgi',
      },
      {
        id: 'cgi-sound-edit',
        title: 'تدوین ریتمیک، طراحی صدا (SFX) و موسیقی اختصاصی برند',
        subtitle: 'Bespoke Audio Architecture, Foley & Commercial Editing',
        badge: 'صدا و پس‌ازتولید',
        description:
          'آهنگسازی اختصاصی، طراحی بافت‌های صوتی هایپررئال (Foley & SFX) و تدوین دقیق برای درگیرسازی حسی مخاطب در کمپین‌های تبلیغاتی.',
        canvasType: 'hero-showreel',
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
      'mohammad-rahimi',
      'lotfallah-salehi',
      'nima-nekookar',
      'ali-ebrahimi',
      'hilda-baghban',
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
    title: 'تجربه‌های بصری فراگیر، ویدئو مپینگ و رسانه‌های نوین',
    shortTitle: 'ویدئو مپینگ و تجربه‌های بصری فراگیر',
    categoryFa: '۵. تجربه‌های بصری و رسانه‌های نوین',
    categoryKey: 'vfx',
    subtitle: 'Immersive Visual Experiences & Video Mapping',
    shortSummary:
      'طراحی و اجرای ویدئو مپینگ در مقیاس کلان، جلوه‌های بصری ویژه رویدادها، کنسرت‌ها و اجراهای بزرگ صحنه‌ای و شهری.',
    description:
      'طراحی و اجرای تجربه‌های بصری فراگیر، ویدئو مپینگ و تولیدات ویژه رویدادها با بهره‌گیری از ظرفیت‌های هنر و فناوری برای اجراهای بزرگ و فضاهای شهری و صحنه‌ای.',
    secondaryDescription:
      'با تکیه بر تجربه اجرای پروژه‌های عظیم ویدئو مپینگ برای تئاترهای بزرگ و کنسرت‌های استادیومی، این بخش محیط‌های فیزیکی و معماری صحنه را به بوم‌های زنده و پویای روایی تبدیل می‌کند.',
    highlightsTitle: 'شاخصه‌های اجرایی در رسانه‌های نوین:',
    highlights: [
      'طراحی و اجرای ویدئو مپینگ برای اجراهای بزرگ، کنسرت‌ها و رویدادهای ویژه',
      'خلق تجربه‌های بصری فراگیر (Immersive) با پیوند هنر تصویر و مهندسی نمایش',
      'تولید محتوای بصری اختصاصی متناسب با معماری صحنه و فضاهای رویداد محور',
    ],
    tags: ['ویدئو مپینگ', 'تجربه‌های بصری فراگیر', 'تولیدات ویژه رویدادها', 'رسانه‌های نوین'],
    canvasType: 'vfx-mapping',
    relatedMemberIds: [
      'mohammad-rahimi',
      'mehdi-mohammadian',
      'lotfallah-salehi',
      'hanieh-samipoor',
    ],
    galleryItems: [
      {
        id: 'vfx-stage-mapping',
        title: 'ویدئو مپینگ اجراهای بزرگ صحنه‌ای و کنسرت‌های استادیومی',
        subtitle: 'Large-Scale Architectural & Stage Projection Mapping',
        badge: 'اجراهای صحنه‌ای و شهری',
        description:
          'طراحی و تولید محتوای بصری با رزولوشن بالا، منطبق بر هندسه سه بعدی صحنه و هماهنگ با نورپردازی و موسیقی زنده رویداد.',
        canvasType: 'vfx-mapping',
      },
      {
        id: 'vfx-immersive',
        title: 'تجربه‌های بصری فراگیر (Immersive Environments)',
        subtitle: 'Interactive & Spatial Media Installations',
        badge: 'رسانه‌های نوین',
        description:
          'ترکیب جلوه‌های ویژه بصری (VFX)، طراحی صدا و مهندسی نمایش برای خلق فضاهای غوطه‌ورکننده در نمایشگاه‌ها و رویدادهای فرهنگی و تجاری.',
        canvasType: 'character-creature',
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
