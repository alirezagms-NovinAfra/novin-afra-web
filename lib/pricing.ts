export type SiteKind = "wordpress" | "custom";

export type PriceRange = {
  min: number;
  max: number;
};

export type ProjectPackage = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  price: PriceRange;
  popular?: boolean;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  wordpress: PriceRange;
  custom: PriceRange;
};

export type OngoingCost = {
  id: string;
  title: string;
  description: string;
  wordpress: PriceRange;
  custom: PriceRange;
  defaultSelected?: boolean;
};

export const projectPackages: Record<SiteKind, ProjectPackage[]> = {
  wordpress: [
    {
      id: "landing",
      title: "لندینگ‌پیج",
      eyebrow: "کمپین و معرفی",
      description: "یک صفحه هدفمند، فرم تماس و نسخه موبایل",
      price: { min: 8, max: 18 },
    },
    {
      id: "personal",
      title: "شخصی و رزومه‌ای",
      eyebrow: "برند شخصی",
      description: "۳ تا ۶ صفحه، نمونه‌کار، مقاله و تماس",
      price: { min: 10, max: 22 },
    },
    {
      id: "corporate-basic",
      title: "شرکتی اقتصادی",
      eyebrow: "شروع مطمئن",
      description: "۵ تا ۱۰ صفحه، وبلاگ و سئوی فنی اولیه",
      price: { min: 15, max: 30 },
    },
    {
      id: "corporate-pro",
      title: "شرکتی حرفه‌ای",
      eyebrow: "پیشنهاد نوین افرا",
      description: "رابط اختصاصی، سرعت بهتر و ساختار برندمحور",
      price: { min: 30, max: 65 },
      popular: true,
    },
    {
      id: "store-standard",
      title: "فروشگاه استاندارد",
      eyebrow: "فروش آنلاین",
      description: "ووکامرس، درگاه، حمل‌ونقل، تخفیف و پیامک",
      price: { min: 25, max: 55 },
    },
    {
      id: "store-pro",
      title: "فروشگاه حرفه‌ای",
      eyebrow: "فروش در مقیاس",
      description: "فیلتر پیشرفته، مقایسه، ترب و چند روش ارسال",
      price: { min: 55, max: 100 },
    },
    {
      id: "wordpress-advanced",
      title: "وردپرس پیشرفته",
      eyebrow: "فرایندهای ویژه",
      description: "رزرو، آموزش، عضویت یا قابلیت اختصاصی",
      price: { min: 90, max: 180 },
    },
  ],
  custom: [
    {
      id: "custom-corporate-base",
      title: "شرکتی اختصاصی پایه",
      eyebrow: "پنل اختصاصی",
      description: "مدیریت محتوا، خدمات، مقالات و فرم‌های اختصاصی",
      price: { min: 80, max: 130 },
    },
    {
      id: "custom-corporate-pro",
      title: "شرکتی اختصاصی حرفه‌ای",
      eyebrow: "سازمانی",
      description: "UI/UX کامل، چندزبانه، نقش‌ها و گزارش‌ها",
      price: { min: 120, max: 250 },
      popular: true,
    },
    {
      id: "custom-store",
      title: "فروشگاه اختصاصی",
      eyebrow: "فرایند فروش خاص",
      description: "انبار، سفارش، پرداخت، ارسال و پنل مشتری",
      price: { min: 150, max: 300 },
    },
    {
      id: "advanced-portal",
      title: "پرتال پیشرفته",
      eyebrow: "یکپارچه‌سازی",
      description: "ERP، قیمت همکار، باشگاه مشتریان و گزارش",
      price: { min: 300, max: 700 },
    },
    {
      id: "marketplace",
      title: "سامانه یا مارکت‌پلیس",
      eyebrow: "چند نقش و گردش‌کار",
      description: "فروشندگان، کمیسیون، تسویه، کیف پول و پنل‌ها",
      price: { min: 700, max: 2000 },
    },
    {
      id: "platform",
      title: "پلتفرم نرم‌افزاری",
      eyebrow: "محصول دیجیتال",
      description: "معماری مقیاس‌پذیر، API، امنیت و مانیتورینگ",
      price: { min: 1500, max: 4000 },
    },
  ],
};

export const features: Feature[] = [
  {
    id: "custom-ui",
    title: "UI/UX کاملاً اختصاصی",
    description: "طراحی تجربه و رابط منطبق با برند",
    wordpress: { min: 10, max: 35 },
    custom: { min: 30, max: 100 },
  },
  {
    id: "second-language",
    title: "زبان دوم",
    description: "ساختار چندزبانه و مدیریت ترجمه",
    wordpress: { min: 6, max: 18 },
    custom: { min: 20, max: 60 },
  },
  {
    id: "booking",
    title: "رزرو یا نوبت‌دهی",
    description: "تقویم، ظرفیت، اعلان و مدیریت رزرو",
    wordpress: { min: 10, max: 30 },
    custom: { min: 40, max: 120 },
  },
  {
    id: "user-panel",
    title: "پنل کاربری",
    description: "پروفایل، سوابق، وضعیت سفارش یا خدمات",
    wordpress: { min: 20, max: 50 },
    custom: { min: 70, max: 200 },
  },
  {
    id: "integration",
    title: "اتصال CRM یا ERP",
    description: "یکپارچگی با نرم‌افزارهای داخلی",
    wordpress: { min: 15, max: 60 },
    custom: { min: 50, max: 200 },
  },
  {
    id: "multi-vendor",
    title: "چندفروشندگی",
    description: "پنل فروشنده، کمیسیون و مدیریت سفارش",
    wordpress: { min: 30, max: 80 },
    custom: { min: 150, max: 400 },
  },
  {
    id: "wallet",
    title: "کیف پول و تسویه",
    description: "تراکنش داخلی و قواعد تسویه مالی",
    wordpress: { min: 20, max: 60 },
    custom: { min: 80, max: 250 },
  },
  {
    id: "analytics",
    title: "داشبورد مدیریتی",
    description: "گزارش‌های عملیاتی و شاخص‌های کلیدی",
    wordpress: { min: 15, max: 50 },
    custom: { min: 60, max: 250 },
  },
];

export const ongoingCosts: OngoingCost[] = [
  {
    id: "domain",
    title: "دامنه",
    description: "ثبت و تمدید سالانه دامنه",
    wordpress: { min: 0.3, max: 3 },
    custom: { min: 0.3, max: 3 },
    defaultSelected: true,
  },
  {
    id: "hosting",
    title: "هاست یا سرور",
    description: "زیرساخت متناسب با ترافیک و پردازش",
    wordpress: { min: 2.2, max: 12 },
    custom: { min: 12, max: 100 },
    defaultSelected: true,
  },
  {
    id: "support",
    title: "پشتیبانی فنی",
    description: "نگهداری، بروزرسانی و پایش دوره‌ای",
    wordpress: { min: 18, max: 60 },
    custom: { min: 60, max: 140 },
    defaultSelected: true,
  },
  {
    id: "services",
    title: "سرویس‌ها و API",
    description: "پیامک، نقشه، فضای ابری و سرویس‌های مصرفی",
    wordpress: { min: 2, max: 18 },
    custom: { min: 6, max: 45 },
  },
  {
    id: "seo",
    title: "سئوی مستمر",
    description: "تولید محتوا و رشد مداوم ورودی ارگانیک",
    wordpress: { min: 36, max: 120 },
    custom: { min: 60, max: 180 },
  },
];

export function addRanges(...ranges: PriceRange[]): PriceRange {
  return ranges.reduce(
    (total, item) => ({
      min: total.min + item.min,
      max: total.max + item.max,
    }),
    { min: 0, max: 0 },
  );
}

export function calculateEstimate(
  kind: SiteKind,
  packageId: string,
  featureIds: string[],
  ongoingIds: string[],
) {
  const selectedPackage =
    projectPackages[kind].find((item) => item.id === packageId) ??
    projectPackages[kind][0];

  const selectedFeatures = features.filter((item) =>
    featureIds.includes(item.id),
  );
  const selectedOngoing = ongoingCosts.filter((item) =>
    ongoingIds.includes(item.id),
  );

  const featurePrice = addRanges(
    ...selectedFeatures.map((item) => item[kind]),
  );
  const annualPrice = addRanges(
    ...selectedOngoing.map((item) => item[kind]),
  );

  return {
    selectedPackage,
    selectedFeatures,
    selectedOngoing,
    launchPrice: addRanges(selectedPackage.price, featurePrice),
    featurePrice,
    annualPrice,
  };
}

const persianNumber = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 1,
});

export function formatMillion(value: number) {
  return persianNumber.format(value);
}

export function formatRange(range: PriceRange) {
  return `${formatMillion(range.min)} تا ${formatMillion(range.max)}`;
}
