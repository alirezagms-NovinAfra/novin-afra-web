"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Info, Sparkles } from "lucide-react";
import { useState } from "react";
import { formatRange, projectPackages, type SiteKind } from "@/lib/pricing";
import { SectionHeading } from "@/components/ui/section-heading";

export function PricingSection() {
  const [kind, setKind] = useState<SiteKind>("wordpress");
  const reduceMotion = false;

  return (
    <section id="pricing" className="section pricing-section">
      <div className="site-container">
        <SectionHeading
          icon="pricing"
          eyebrow="تعرفه‌های شفاف ۱۴۰۵"
          title="بازه‌های واقعی طراحی سایت"
          description="قیمت‌ها برای تصمیم‌گیری بودجه‌ای ارائه شده‌اند و با امکانات، محتوا، اتصال‌ها و سطح پشتیبانی تغییر می‌کنند."
        />

        <div className="pricing-tabs">
          {(["wordpress", "custom"] as const).map((item) => (
            <button
              key={item}
              className={kind === item ? "active" : ""}
              onClick={() => setKind(item)}
            >
              {item === "wordpress" ? "وردپرس" : "طراحی اختصاصی"}
              {kind === item ? <motion.i layoutId="pricing-tab" /> : null}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="pricing-grid"
            key={kind}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {projectPackages[kind].map((item, index) => (
              <motion.article
                className={`pricing-card ${item.popular ? "popular" : ""}`}
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {item.popular ? (
                  <span className="popular-tag">
                    <Sparkles size={13} />
                    انتخاب محبوب
                  </span>
                ) : null}
                <small>{item.eyebrow}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="pricing-value">
                  <strong>{formatRange(item.price)}</strong>
                  <span>میلیون تومان</span>
                </div>
                <ul>
                  <li>
                    <Check size={15} />
                    طراحی ریسپانسیو
                  </li>
                  <li>
                    <Check size={15} />
                    ساختار فنی استاندارد
                  </li>
                  <li>
                    <Check size={15} />
                    آموزش و تحویل پروژه
                  </li>
                </ul>
                <a href="#estimator">
                  محاسبه با امکانات من
                  <ArrowLeft size={16} />
                </a>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="pricing-note">
          <Info size={17} />
          <p>
            قیمت نهایی پس از تحلیل دقیق نیازها، تعداد صفحات، کیفیت محتوا و
            یکپارچه‌سازی‌های موردنیاز مشخص می‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}
