import {
  CloudCog,
  Globe2,
  Headphones,
  ServerCog,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const costs = [
  {
    title: "دامنه",
    value: "۳۰۰ هزار تا ۳ میلیون",
    unit: "سالانه",
    description: "بسته به پسوند و نوع دامنه",
    icon: Globe2,
    level: 28,
  },
  {
    title: "هاست یا سرور",
    value: "۲٫۲ تا ۱۰۰+ میلیون",
    unit: "سالانه",
    description: "متناسب با معماری و مصرف منابع",
    icon: ServerCog,
    level: 78,
  },
  {
    title: "پشتیبانی",
    value: "۱۸ تا ۱۴۰+ میلیون",
    unit: "سالانه",
    description: "نگهداری، امنیت و بروزرسانی",
    icon: Headphones,
    level: 86,
  },
  {
    title: "سرویس‌ها و API",
    value: "بر اساس مصرف",
    unit: "ماهیانه یا سالانه",
    description: "پیامک، نقشه، ابر و اتصال‌ها",
    icon: CloudCog,
    level: 58,
  },
];

export function CostsSection() {
  return (
    <section className="section costs-section">
      <div className="site-container">
        <SectionHeading
          icon="costs"
          eyebrow="بدون عددهای پنهان"
          title="تمام هزینه‌ها، از ابتدا شفاف"
          description="طراحی سایت فقط هزینه ساخت نیست؛ زیرساخت، نگهداری و سرویس‌های مصرفی نیز بخشی از تصویر واقعی‌اند."
        />

        <div className="costs-grid">
          {costs.map((cost, index) => {
            const Icon = cost.icon;
            return (
              <Reveal className="cost-card" key={cost.title} delay={index * 0.08}>
                <div className="cost-icon">
                  <Icon />
                </div>
                <small>{cost.unit}</small>
                <h3>{cost.title}</h3>
                <strong>{cost.value}</strong>
                <p>{cost.description}</p>
                <div className="cost-meter" aria-hidden="true">
                  <span>
                    <i style={{ width: `${cost.level}%` }} />
                    <b style={{ insetInlineStart: `${cost.level}%` }} />
                  </span>
                  <em>متناسب با مقیاس پروژه</em>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="costs-insight">
          <span>
            <TrendingUp />
          </span>
          <div>
            <small>اصل مهم بودجه‌ریزی</small>
            <strong>هزینه مالکیت را ببینید، نه فقط هزینه ساخت را</strong>
            <p>
              انتخاب زیرساخت و سطح پشتیبانی باید با ترافیک، اهمیت عملیاتی و
              برنامه رشد کسب‌وکار هماهنگ باشد.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
