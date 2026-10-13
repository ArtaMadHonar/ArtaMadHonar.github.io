export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  department: 'leadership' | 'animation' | 'commercial' | 'web3' | 'mystery';
  initials: string;
  imageUrl?: string;
  bio?: string;
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

export interface ProjectWork {
  id: string;
  title: string;
  categoryFa: string;
  categoryKey: 'animation' | 'commercial' | 'vfx' | 'web3' | 'game';
  subtitle: string;
  description: string;
  highlightsTitle?: string;
  highlights: string[];
  tags: string[];
  canvasType: 'wonderful-day' | 'commercial-cgi' | 'vfx-mapping' | 'web3-nft' | 'game-lab';
  imageUrl?: string;
  videoUrl?: string;
  isUpcoming?: boolean;
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

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mahmoud-mohammadian',
    name: 'محمود محمدیان',
    role: 'هم‌بنیانگذار و مدیرعامل | کارگردان انیمیشن سینمایی',
    roleEn: 'Co-Founder & CEO | Animation Film Director',
    department: 'leadership',
    initials: 'MM',
    imageUrl: 'https://s1.uploadkon.ir/119f851b-c260-470e-af9a-68803c9aa9ec/119f851b-c260-470e-af9a-68803c9aa9ec-Mr-Mohammadia-Mahmoud2.webp',
    bio: 'رهبری استراتژیک استودیو، کارگردانی انیمیشن‌های بلند سینمایی و پیشبرد تلفیق هنر داستان‌گویی با پایپلاین‌های نوین.',
  },
  {
    id: 'mehdi-mohammadian',
    name: 'مهدی محمدیان',
    role: 'هم‌بنیانگذار | مشاور ارشد کارگردانی و توسعه استودیو',
    roleEn: 'Co-Founder | Senior Directorial & Creative Advisor',
    department: 'leadership',
    initials: 'MM',
    imageUrl: 'https://s1.uploadkon.ir/d5e8b4cb-60eb-4baf-a48f-cde7211b5759/d5e8b4cb-60eb-4baf-a48f-cde7211b5759-Mr-Mohammadian-Mahdi.webp',
    bio: 'طراحی استراتژی توسعه بین‌المللی استودیو، دراماتورژی فیلمنامه‌ها و نظارت ارشد بر عمق جهان‌های داستانی.',
  },
  {
    id: 'mohammad-rahimi',
    name: 'محمد رحیمی',
    role: 'هم‌بنیانگذار و مدیر ارشد خلاقیت (CCO) | کارگردان هنری و سوپروایزر ارشد VFX',
    roleEn: 'Co-Founder & Chief Creative Officer | Art Director & Senior VFX Supervisor',
    department: 'leadership',
    initials: 'MR',
    imageUrl: 'https://s1.uploadkon.ir/5b883526-116f-4883-bc10-b13d8034b9f8/5b883526-116f-4883-bc10-b13d8034b9f8-Mr-Rahimi.webp',
    bio: 'هدایت هویت بصری جامع استودیو، نظارت دقیق بر فوتورئالیسم، کامپوزیتینگ و استانداردهای زیبایی‌شناسی سینما.',
  },
  {
    id: 'lotfallah-salehi',
    name: 'لطف‌الله صالحی',
    role: 'سوپروایزر تولید و پایپلاین ویدیو',
    roleEn: 'Cinematic Video & Animation Pipeline Specialist',
    department: 'animation',
    initials: 'LS',
    imageUrl: 'https://s1.uploadkon.ir/e93bca88-90cc-4c47-ba22-fd124f7330d6/e93bca88-90cc-4c47-ba22-fd124f7330d6-Salehii.webp',
    bio: 'معماری و اتوماسیون جریان داده‌های رندرینگ، بهینه‌سازی موتورهای گرافیکی و یکپارچه‌سازی پایپلاین تولید.',
  },
  {
    id: 'ali-alipour',
    name: 'علی علیپور',
    role: 'دستیار کارگردان و هنرمند چندرسانه‌ای انیمیشن',
    roleEn: 'Animation Assistant Director & Multimedia Artist',
    department: 'animation',
    initials: 'AA',
    imageUrl: 'https://s1.uploadkon.ir/8553b6d2-c72a-4672-9e8b-91e182d3a818/8553b6d2-c72a-4672-9e8b-91e182d3a818-Alipour.webp',
    bio: 'همراهی در هدایت هنری و اجرایی پروژه، تدوین روایت تصویری، ضبط و اجرای نریشن و توسعهٔ کانسپت‌های بصری در مسیر تولید انیمیشن.',
  },
  {
    id: 'negar-baratzadeh',
    name: 'نگار برات‌زاده',
    role: 'طراح ارشد کانسپت و فریم‌آرتیست انیمیشن',
    roleEn: 'Senior Visual Development & Concept Frame Artist',
    department: 'animation',
    initials: 'NB',
    imageUrl: 'https://s1.uploadkon.ir/cc81ebc2-2d6d-450e-aeda-21f19236decb/cc81ebc2-2d6d-450e-aeda-21f19236decb-Negar.webp',
    bio: 'خلق دنیاهای مسحورکننده بصری، توسعه کانسپت کاراکترها و تصویرسازی کلیدفریم‌های احساسی و سینمایی.',
  },
  {
    id: 'hilda-baghban',
    name: 'هیلدا باغبان',
    role: 'آرتیست پردازش تصویر و اصلاح بصری',
    roleEn: 'Digital Image & Visual Finishing Artist',
    department: 'animation',
    initials: 'HB',
    imageUrl: 'https://s1.uploadkon.ir/1a596e04-2840-4f60-b243-9e5804365f0d/1a596e04-2840-4f60-b243-9e5804365f0d-Hilda.webp',
    bio: 'پردازش دقیق لایه‌های گرافیکی، فینیشینگ دیجیتال، کنترل گرمای رنگ و تثبیت وفاداری استایل بصری در فریم‌های نهایی.',
  },
  {
    id: 'khorshid-khooban',
    name: 'خورشید خوبان',
    role: 'مدیر پروژه و تولید تیزر | آهنگساز و طراح موسیقی',
    roleEn: 'Teaser Product Manager | Music Composer & Audio Producer',
    department: 'commercial',
    initials: 'KK',
    imageUrl: 'https://s1.uploadkon.ir/afa19693-7400-493b-a892-5b9194ecbc39/afa19693-7400-493b-a892-5b9194ecbc39-Khorshid.webp',
    bio: 'مدیریت دقیق زمان‌بندی دپارتمان تیزر همگام با ساخت موسیقی متن و معماری اتمسفر صوتی اختصاصی برندها.',
  },
  {
    id: 'hanieh-samipoor',
    name: 'حانیه سامی‌پور',
    role: 'تدوینگر ارشد و طراح جلوه‌های صوتی',
    roleEn: 'Lead Video Editor & Sound Designer - SFX',
    department: 'commercial',
    initials: 'HS',
    imageUrl: 'https://s1.uploadkon.ir/2bd7e8c4-476a-4de2-9e70-5925159e6d5f/2bd7e8c4-476a-4de2-9e70-5925159e6d5f-Haniye.webp',
    bio: 'خلق ریتم‌های گیرا در تدوین فیلم و طراحی بافت‌های صوتی هایپررئال (Foley & SFX) جهت درگیرسازی حسی مخاطب.',
  },
  {
    id: 'nima-nekookar',
    name: 'نیما نکوکار',
    role: 'مدیر ارشد دپارتمان وب۳ و سوپروایزر NFT',
    roleEn: 'Head of Web3 & NFT Supervisor',
    department: 'web3',
    initials: 'NN',
    imageUrl: 'https://s1.uploadkon.ir/b96458cc-d87d-4345-b703-bfe6d3615e7d/b96458cc-d87d-4345-b703-bfe6d3615e7d-Nima.webp',
    bio: 'معماری اکوسیستم بلاکچین بر بستر اتریوم، قراردادهای هوشمند ایمن و هدایت جهان‌های دیجیتال دوبعدی.',
  },
  {
    id: 'ali-ebrahimi',
    name: 'علی ابراهیمی',
    role: 'طراح ارشد کالکشن و تصویرساز وب۳',
    roleEn: 'Lead NFT Artist & Digital Illustrator',
    department: 'web3',
    initials: 'AE',
    imageUrl: 'https://s1.uploadkon.ir/772b4b4b-c8bc-44cd-ba13-951cef7d99d5/772b4b4b-c8bc-44cd-ba13-951cef7d99d5-Ali%20Ebrahimi.webp',
    bio: 'خلق کاراکترها و تصویرسازی مجموعه‌های دوبعدی با لایه‌بندی هنری غنی، لور داستانی و ماندگاری بصری.',
  },
];

export const CHARACTER_CONCEPTS: CharacterConcept[] = [
  {
    id: 'saman',
    nameFa: 'سامان (قهرمان نوجوان)',
    nameEn: 'Saman · The Explorer',
    role: 'کاراکتر اصلی داستان',
    description: 'کودکی ماجراجو با گوگِل‌های ساعت‌ساز طلایی، روحیه‌ای ناآرام و کنجکاوی پایان‌ناپذیر که به دنبال گشودن راز زمان است.',
    renderType: 'hero',
  },
  {
    id: 'poopi',
    nameFa: 'پوپی (همراه مکانیکی)',
    nameEn: 'Poopi · Mechanical Companion',
    role: 'همراه طنز و احساسی',
    description: 'همدم کوچک و دوست‌داشتنی با بدنه نقره‌ای صیقلی، احساسات عمیق و حرکات بامزه که زبان اختصاصی خودش را برای شوخی دارد.',
    renderType: 'companion',
  },
  {
    id: 'ostad-sohrab',
    nameFa: 'استاد سهراب (ساعت‌ساز کهن)',
    nameEn: 'Master Sohrab · The Watchmaker',
    role: 'مرشد و دانای کل',
    description: 'پیرمردی خردمند و مهربان که سال‌ها در کارگاهی غرق در نور طلایی و چرخ‌دنده‌های رقصان، از توازن زمان حراست می‌کند.',
    renderType: 'mentor',
  },
  {
    id: 'crystal-guardian',
    nameFa: 'نگهبان دره بلورین',
    nameEn: 'Crystal Valley Guardian',
    role: 'موجود فانتزی افسانه‌ای',
    description: 'موجودی شگفت‌انگیز با بافت سنگی متخلخل و ارگانیک که چشمان شب‌تاب آن راه تاریک دره را برای قهرمانان روشن می‌سازد.',
    renderType: 'creature',
  },
];

export const SELECTED_WORKS: ProjectWork[] = [
  {
    id: 'wonderful-day',
    title: 'انیمیشن سینمایی بلند «روز شگفت‌انگیز»',
    categoryFa: 'انیمیشن سینمایی',
    categoryKey: 'animation',
    subtitle: 'A Wonderful Day · 3D Feature Animation',
    imageUrl: 'https://s1.uploadkon.ir/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6/9e2cf738-3ac0-4cf6-ae0d-d021a84546c6-WonderfulDay.webp',
    videoUrl: 'https://s1.uploadkon.ir/749db110-5043-4619-b4b0-1b2734e7fdea/749db110-5043-4619-b4b0-1b2734e7fdea-Wonderful%20Day%20-%20Trailer_%20Telegram%20.mp4',
    description: 'شاهکار ۳D سینمایی بلند با استایل بصری پیکسار، طراحی شخصیت‌های غنی و اتمسفر گرم نورپردازی ساعت طلایی. این اثر با پایپلاین نوین R&D و هوش مصنوعی استودیو تولید شده و در مرحله فاینالایزینگ برای جشنواره فیلم فجر قرار دارد.',
    highlightsTitle: 'شاخصه‌های هنری و تمایز تولید:',
    highlights: [
      'استایل بصری فاخر به سبک پیکسار (Pixar-Style)',
      'نخستین انیمیشن بلند با پایپلاین ترکیبی هوش مصنوعی در ایران',
      'بیش از ۴۵۰ بلِندشیپ حرکتی برای ایجاد واکنش‌های حسی واقعی',
    ],
    tags: ['سینمایی بلند ۳D', 'کودک و خانواده و طنز', 'پایپلاین R&D', 'فستیوال فجر'],
    canvasType: 'wonderful-day',
  },
  {
    id: 'commercial-cgi',
    title: 'تیزرسازی تبلیغاتی سطح بالا (Commercials & High-End CGI)',
    categoryFa: 'تیزرسازی و تبلیغات تجاری',
    categoryKey: 'commercial',
    subtitle: 'Commercials & Luxury Product CGI',
    imageUrl: 'https://s1.uploadkon.ir/94160ee8-99c8-4a18-996e-9ceb72a0da45/94160ee8-99c8-4a18-996e-9ceb72a0da45-Moeini%20Teaser%202.webp',
    description: 'تولید بدون مرز با جسارت بی‌نهایت («هر کی هر چی بخواد می‌تونیم بزنیم و می‌زنیم»). از مدل‌سازی سه‌بعدی محصولات لوکس، برندها، خودرو و جواهرات تا کمپین‌های تلفیقی لایواکشن و CGI همراه با استودیو اختصاصی ضبط صدا، آهنگسازی و تدوین ریتمیک.',
    highlightsTitle: 'مزیت‌های استودیو و ظرفیت‌های تولید:',
    highlights: [
      'تولید صفر تا صد درون استودیو بدون وابستگی بیرونی',
      'فوتورئالیسم بی‌نقص و شبیه‌سازی دقیق فیزیک نور و مایعات',
      'استودیو اختصاصی صداگذاری، آهنگسازی اختصاصی و تدوین کارگردانی‌شده',
    ],
    tags: ['Luxury Product CGI', 'هایپررئال', 'استودیو صدا و موسیقی', 'تلفیق زنده و ۳D'],
    canvasType: 'commercial-cgi',
  },
  {
    id: 'vfx-mapping',
    title: 'پروجکشن مپینگ، رویدادها و کنسرت‌ها',
    categoryFa: 'پروجکشن مپینگ و رویدادها',
    categoryKey: 'vfx',
    subtitle: 'Concert Video Mapping & Stage Architecture',
    description: 'اجرای ویدئو مپینگ و طراحی تصاویر سه‌بعدی زنده برای بزرگترین کنسرت‌های کشور و رویدادهای ملی.',
    highlightsTitle: 'توانمندی‌ها و استانداردهای اجرایی:',
    highlights: [
      'اجرای زنده مپینگ روی اماکن و بزرگترین استیج‌های کنسرت‌های ایران',
      'مدیریت پروجکشن‌های چندکاناله و ترکینگ',
      'اسکن سه‌بعدی پیشرفته برای اجرای دقیق‌ترین خروجی.',
    ],
    tags: ['ویدیو مپینگ زنده', 'کنسرت‌های بزرگ', 'رویدادهای ملی', 'اسکن ۳D دقیق'],
    canvasType: 'vfx-mapping',
  },
  {
    id: 'web3-nft',
    title: 'اکوسیستم وب۳ و بلاکچین (Web3 & NFT Studio)',
    categoryFa: 'وب۳ و بلاکچین',
    categoryKey: 'web3',
    subtitle: 'Ethereum 2D Collectibles & Digital Lore',
    description: 'خلق همه‌جانبه ۲ کالکشن مستقل دوبعدی (2D) با هزاران لایه دست‌ساز، جهان‌سازی عمیق داستانی، کمیک‌بوک‌های همراه و قراردادهای هوشمند استاندارد ERC-721A بر بستر شبکه اتریوم.',
    highlightsTitle: 'معماری فنی و هویت کالکشن:',
    highlights: [
      '۲ کالکشن مستقل ۲D در مرحله خلق فعال',
      'استقرار مستقیم روی شبکه اتریوم با امنیت حداکثری',
      'داستان‌پردازی و هویت‌بخشی کاراکترها فراتر از فرمت‌های متداول',
    ],
    tags: ['شبکه اتریوم', '۲ کالکشن مستقل ۲D', 'جهان‌سازی روایی', 'هنر دیجیتال فاخر'],
    canvasType: 'web3-nft',
  },
  {
    id: 'game-lab',
    title: 'آزمایشگاه بازی‌سازی (Interactive Game Lab)',
    categoryFa: 'آزمایشگاه بازیسازی',
    categoryKey: 'game',
    subtitle: 'Next-Gen Interactive Experiences',
    description: 'پروژه‌ای سرشار از رمز و راز و حس ماجراجویی در اعماق جهان تعاملی گیم. تلفیق موتور Unreal Engine 5، هوش مصنوعی رفتاری کاراکترها و هنر انیمیشن‌سازی استودیو برای ورود طوفانی به صنعت بازی.',
    highlightsTitle: 'تکنولوژی‌های کلیدی و افق توسعه:',
    highlights: [
      'رندرینگ بلادرنگ با Nanite و نورپردازی پویای Lumen',
      'شاخه‌های روایی سینمایی با عاملیت مخاطب',
      'ورود استراتژیک استودیو به بازی‌های تعاملی با استاندارد AAA',
    ],
    tags: ['آنریل انجین ۵', 'به‌زودی...', 'روایت تعاملی', 'گیمینگ نسل نو'],
    canvasType: 'game-lab',
    isUpcoming: true,
  },
];

export const RD_PRINCIPLES: RdPrinciple[] = [
  {
    number: '۰۱',
    title: 'پایپلاین‌های شتاب‌یافته بومی',
    englishTitle: 'Proprietary Neural Pipelines',
    description: 'ما منتظر ابزارهای آماده بازار نمی‌مانیم؛ در آزمایشگاه R&D اسکریپت‌ها و مدل‌های هوش مصنوعی اختصاصی خود را مهندسی می‌کنیم تا زمان و هزینه سنتی رندر بدون افت کیفیت سینمایی شکسته شود.',
    accent: 'bg-stone-900 text-white',
  },
  {
    number: '۰۲',
    title: 'کنترل دقیق هنری (Human-in-the-Loop)',
    englishTitle: 'Artist-Governed Fidelity',
    description: 'هوش مصنوعی در استودیوی ما ابزاری در خدمت نبوغ آرتیست است، نه جایگزین احساس و اصالت داستان. تک‌تک فریم‌ها تحت نظارت میکرونی کارگردانان هنری صیقل می‌خورند.',
    accent: 'bg-stone-900 text-white',
  },
  {
    number: '۰۳',
    title: 'حل مسئله فراتر از مرزها',
    englishTitle: 'Boundary-Pushing Problem Solving',
    description: '«هر کی هر چی بخواد می‌تونیم بزنیم و می‌زنیم» تنها یک شعار نیست؛ فرهنگ سازمانی استودیو بر پایه حل غیرممکن‌ترین چالش‌های فنی و هنری با جسارت و نوآوری بنا شده است.',
    accent: 'bg-stone-900 text-white',
  },
];

export const NAME_PILLARS: NamePillar[] = [
  {
    word: 'آرتا',
    phonetic: 'ARTĀ',
    meaning: 'حقیقت، راستی و سرشت پاک باستانی',
    elaboration: 'تعهد به راستی در تولید، کیفیت بی‌کم‌وکاست و احترام مطلق به نگاه مخاطب؛ ریشه در پاک‌ترین مفاهیم تمدن پارسی.',
  },
  {
    word: 'ماد',
    phonetic: 'MĀD',
    meaning: 'اصالت کهن و نخستین شالوده تمدن',
    elaboration: 'تکیه بر کهن‌ترین ریشه‌های فرهنگی فلات ایران؛ یادآور این که هر جهش نوآورانه تنها با اتکا بر ستون‌های هویتی پایدار است.',
  },
  {
    word: 'هنر',
    phonetic: 'HONAR',
    meaning: 'خلق شگفتی و جاودانگی روح',
    elaboration: 'جان‌مایه‌ای که خطوط کد و رندرها را به جادویی ماندگار در ذهن انسان بدل می‌سازد و احساس را در کالبد تصویر جاری می‌کند.',
  },
];
