"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Check,
  ChevronLeft,
  CloudCog,
  Code2,
  Database,
  Gauge,
  Globe2,
  Languages,
  LayoutDashboard,
  PlugZap,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  calculateEstimate,
  features,
  formatRange,
  ongoingCosts,
  projectPackages,
  type SiteKind,
} from "@/lib/pricing";
import { SectionHeading } from "@/components/ui/section-heading";

const featureIcons = {
  "custom-ui": Sparkles,
  "second-language": Languages,
  booking: CalendarDays,
  "user-panel": Users,
  integration: PlugZap,
  "multi-vendor": ShoppingBag,
  wallet: WalletCards,
  analytics: LayoutDashboard,
} as const;

const ongoingIcons = {
  domain: Globe2,
  hosting: ServerCog,
  support: ShieldCheck,
  services: CloudCog,
  seo: Search,
} as const;

const steps = [
  { id: 1, title: "نوع سایت", description: "انتخاب مسیر اجرا" },
  { id: 2, title: "سطح پروژه", description: "مقیاس و پیچیدگی" },
  { id: 3, title: "امکانات", description: "قابلیت‌های موردنیاز" },
  { id: 4, title: "هزینه‌های جاری", description: "تصویر کامل سالانه" },
];

const defaultOngoing = ongoingCosts
  .filter((item) => item.defaultSelected)
  .map((item) => item.id);

export function EstimatorSection() {
  const [kind, setKind] = useState<SiteKind>("wordpress");
  const [packageId, setPackageId] = useState("corporate-pro");
  const [featureIds, setFeatureIds] = useState(["custom-ui"]);
  const [ongoingIds, setOngoingIds] = useState(defaultOngoing);
  const [step, setStep] = useState(1);
  const reduceMotion = false;

  const estimate = useMemo(
    () => calculateEstimate(kind, packageId, featureIds, ongoingIds),
    [kind, packageId, featureIds, ongoingIds],
  );

  const changeKind = (next: SiteKind) => {
    setKind(next);
    setPackageId(
      next === "wordpress" ? "corporate-pro" : "custom-corporate-pro",
    );
    setFeatureIds((current) =>
      next === "custom"
        ? current.filter((item) => item !== "multi-vendor")
        : current,
    );
    setStep(2);
  };

  const toggleFeature = (id: string) => {
    setFeatureIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const toggleOngoing = (id: string) => {
    setOngoingIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <section id="estimator" className="section estimator-section">
      <div className="estimator-glow" />
      <div className="site-container">
        <SectionHeading
          icon="estimator"
          eyebrow="برآورد شفاف و تعاملی"
          title="پروژه‌تان را بسازید، قیمت را ببینید"
          description="با چند انتخاب ساده، بازه واقعی هزینه راه‌اندازی و نگهداری سالانه را قبل از جلسه مشاوره ببینید."
        />

        <div className="estimator-shell">
          <div className="stepper" role="tablist" aria-label="مراحل برآورد">
            {steps.map((item) => (
              <button
                key={item.id}
                className={step === item.id ? "active" : step > item.id ? "done" : ""}
                onClick={() => setStep(item.id)}
                role="tab"
                aria-selected={step === item.id}
              >
                <span>
                  {step > item.id ? <Check size={15} /> : item.id.toLocaleString("fa-IR")}
                </span>
                <i>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </i>
              </button>
            ))}
            <motion.div
              className="stepper-progress"
              animate={{ scaleX: (step - 1) / 3 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
            />
          </div>

          <div className="estimator-content">
            <div className="estimator-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                  transition={{ duration: 0.28 }}
                >
                  {step === 1 ? (
                    <div className="stage-panel">
                      <div className="stage-title">
                        <div>
                          <small>مرحله اول</small>
                          <h3>کدام مسیر برای پروژه شما مناسب‌تر است؟</h3>
                        </div>
                        <BadgeCheck size={23} />
                      </div>
                      <div className="kind-grid">
                        <button
                          className={kind === "wordpress" ? "selected" : ""}
                          onClick={() => changeKind("wordpress")}
                        >
                          <span className="kind-icon">
                            <Globe2 />
                          </span>
                          <div>
                            <small>راه‌اندازی سریع و اقتصادی</small>
                            <strong>سایت وردپرسی</strong>
                            <p>
                              برای سایت‌های شرکتی، فروشگاهی و خدماتی با نیازهای
                              استاندارد
                            </p>
                          </div>
                          <i>{kind === "wordpress" ? <Check /> : null}</i>
                        </button>
                        <button
                          className={kind === "custom" ? "selected" : ""}
                          onClick={() => changeKind("custom")}
                        >
                          <span className="kind-icon">
                            <Code2 />
                          </span>
                          <div>
                            <small>معماری ویژه و توسعه بلندمدت</small>
                            <strong>طراحی اختصاصی</strong>
                            <p>
                              برای فرایندهای خاص، چند نوع کاربر و محصولات
                              نرم‌افزاری
                            </p>
                          </div>
                          <i>{kind === "custom" ? <Check /> : null}</i>
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="stage-panel">
                      <div className="stage-title">
                        <div>
                          <small>مرحله دوم</small>
                          <h3>سطح نزدیک‌تر به پروژه‌تان را انتخاب کنید</h3>
                        </div>
                        <Gauge size={23} />
                      </div>
                      <div className="package-list">
                        {projectPackages[kind].map((item) => (
                          <button
                            key={item.id}
                            className={packageId === item.id ? "selected" : ""}
                            onClick={() => setPackageId(item.id)}
                          >
                            <span className="package-check">
                              {packageId === item.id ? <Check size={15} /> : null}
                            </span>
                            <span className="package-copy">
                              <small>{item.eyebrow}</small>
                              <strong>{item.title}</strong>
                              <p>{item.description}</p>
                            </span>
                            <span className="package-price">
                              <strong>{formatRange(item.price)}</strong>
                              <small>میلیون تومان</small>
                            </span>
                            {item.popular ? <i>پیشنهادی</i> : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="stage-panel">
                      <div className="stage-title">
                        <div>
                          <small>مرحله سوم</small>
                          <h3>قابلیت‌هایی که واقعاً نیاز دارید</h3>
                        </div>
                        <Database size={23} />
                      </div>
                      <div className="feature-grid">
                        {features.map((feature) => {
                          const Icon =
                            featureIcons[feature.id as keyof typeof featureIcons] ??
                            Sparkles;
                          const selected = featureIds.includes(feature.id);
                          return (
                            <button
                              key={feature.id}
                              className={selected ? "selected" : ""}
                              onClick={() => toggleFeature(feature.id)}
                              aria-pressed={selected}
                            >
                              <span>
                                <Icon size={19} />
                              </span>
                              <div>
                                <strong>{feature.title}</strong>
                                <p>{feature.description}</p>
                                <small>
                                  + {formatRange(feature[kind])} میلیون
                                </small>
                              </div>
                              <i>{selected ? <Check size={14} /> : "+"}</i>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="stage-panel">
                      <div className="stage-title">
                        <div>
                          <small>مرحله چهارم</small>
                          <h3>هزینه‌های سالانه را هم از ابتدا ببینید</h3>
                        </div>
                        <ServerCog size={23} />
                      </div>
                      <div className="ongoing-list">
                        {ongoingCosts.map((cost) => {
                          const Icon =
                            ongoingIcons[cost.id as keyof typeof ongoingIcons] ??
                            CloudCog;
                          const selected = ongoingIds.includes(cost.id);
                          return (
                            <button
                              key={cost.id}
                              className={selected ? "selected" : ""}
                              onClick={() => toggleOngoing(cost.id)}
                              aria-pressed={selected}
                            >
                              <span>
                                <Icon />
                              </span>
                              <div>
                                <strong>{cost.title}</strong>
                                <p>{cost.description}</p>
                              </div>
                              <small>
                                {formatRange(cost[kind])}
                                <em> میلیون / سال</em>
                              </small>
                              <i>{selected ? <Check size={14} /> : "+"}</i>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="estimator-navigation">
                <button
                  className="secondary-button"
                  onClick={() => setStep((current) => Math.max(1, current - 1))}
                  disabled={step === 1}
                >
                  <ArrowRight size={17} />
                  مرحله قبل
                </button>
                <button
                  className="primary-button"
                  onClick={() =>
                    step < 4
                      ? setStep((current) => Math.min(4, current + 1))
                      : document.querySelector("#contact")?.scrollIntoView()
                  }
                >
                  {step === 4 ? "دریافت مشاوره" : "مرحله بعد"}
                  <ArrowLeft size={17} />
                </button>
              </div>
            </div>

            <aside className="estimate-summary">
              <div className="summary-head">
                <span>
                  <BarChart3 size={19} />
                  خلاصه برآورد
                </span>
                <i>به‌روزرسانی زنده</i>
              </div>
              <div className="summary-selected">
                <small>{kind === "wordpress" ? "وردپرس" : "اختصاصی"}</small>
                <strong>{estimate.selectedPackage.title}</strong>
                <p>{estimate.selectedPackage.description}</p>
              </div>

              <div className="summary-price">
                <span>هزینه راه‌اندازی</span>
                <AnimatePresence mode="popLayout">
                  <motion.strong
                    key={`${estimate.launchPrice.min}-${estimate.launchPrice.max}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  >
                    {formatRange(estimate.launchPrice)}
                  </motion.strong>
                </AnimatePresence>
                <small>میلیون تومان</small>
              </div>

              <div className="summary-breakdown">
                <div>
                  <span>پایه پروژه</span>
                  <strong>
                    {formatRange(estimate.selectedPackage.price)} م.
                  </strong>
                  <i style={{ "--bar": "88%" } as React.CSSProperties} />
                </div>
                <div>
                  <span>امکانات انتخابی</span>
                  <strong>{formatRange(estimate.featurePrice)} م.</strong>
                  <i
                    style={{
                      "--bar": `${Math.min(86, 18 + featureIds.length * 11)}%`,
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <span>هزینه سالانه</span>
                  <strong>{formatRange(estimate.annualPrice)} م.</strong>
                  <i
                    style={{
                      "--bar": `${Math.min(80, 14 + ongoingIds.length * 12)}%`,
                    } as React.CSSProperties}
                  />
                </div>
              </div>

              <div className="annual-total">
                <span>
                  <CloudCog size={18} />
                  هزینه جاری تقریبی
                </span>
                <strong>
                  {formatRange(estimate.annualPrice)}
                  <small> میلیون تومان در سال</small>
                </strong>
              </div>

              <div className="summary-note">
                <ShieldCheck size={17} />
                <p>
                  این برآورد بودجه‌ای است. قیمت نهایی پس از تحلیل دقیق نیازها و
                  تعیین دامنه پروژه ارائه می‌شود.
                </p>
              </div>
              <a href="#contact" className="summary-cta">
                ثبت درخواست با این مشخصات
                <ChevronLeft size={17} />
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
