"use client";
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpLeft, ExternalLink, Globe2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Project = {
  id: string;
  title: string;
  type: string;
  subtitle: string;
  description: string;
  url: string;
  domain: string;
  tags: string[];
  tone: string;
  complexity: number;
  family: "وردپرسی" | "اختصاصی / محصولی";
  localPreview?: string;
};

const projects: Project[] = [
  { id: "kalleh", title: "کاله پرو", type: "لندینگ‌پیج", subtitle: "معرفی متمرکز خانواده محصول", description: "نمونه‌ای برای درک ساختار لندینگ محصول، روایت مزیت‌ها و هدایت مخاطب به اقدام بعدی.", url: "https://kallehpro.com/", domain: "kallehpro.com", tags: ["لندینگ", "محصول", "کمپین"], tone: "violet", complexity: 2, family: "وردپرسی" },
  { id: "rezasadeghi", title: "رضا صادقی", type: "سایت شخصی و رزومه‌ای", subtitle: "هویت شخصی، آثار و رویدادها", description: "نمونه‌ای از سایت شخصی محتوایی با تمرکز روی هویت فردی، آرشیو آثار و ارتباط با مخاطب.", url: "https://rezasadeghi.com/", domain: "rezasadeghi.com", tags: ["شخصی", "رسانه", "محتوا"], tone: "indigo", complexity: 2, family: "وردپرسی" },
  { id: "hirabsun", title: "هیراب سان", type: "سایت شرکتی اقتصادی", subtitle: "معرفی شرکت، محصولات و خدمات", description: "نمونه‌ای از سایت شرکتی اقتصادی برای معرفی محصولات، نمایندگی، خدمات پس از فروش و مقالات.", url: "https://hirabsun.com/", domain: "hirabsun.com", tags: ["شرکتی", "محصولات", "خدمات"], tone: "blue", complexity: 2, family: "وردپرسی" },
  { id: "shatel", title: "شاتل", type: "سایت شرکتی حرفه‌ای", subtitle: "خدمات گسترده و مسیرهای متعدد", description: "الگوی یک وب‌سایت شرکتی بزرگ با خدمات، تعرفه‌ها، فروش آنلاین، پشتیبانی و محتوای ساختاریافته.", url: "https://www.shatel.ir/", domain: "shatel.ir", tags: ["شرکتی", "خدمات", "فروش"], tone: "cyan", complexity: 3, family: "وردپرسی" },
  { id: "snowhawk", title: "اسنوهاک", type: "فروشگاه استاندارد", subtitle: "کالا، دسته‌بندی و خرید آنلاین", description: "نمونه فروشگاه استاندارد با دسته‌بندی محصول، صفحه کالا، قیمت، خرید آنلاین و نمایندگی‌ها.", url: "https://snowhawk.ir/", domain: "snowhawk.ir", tags: ["فروشگاه", "محصول", "خرید"], tone: "cyan", complexity: 3, family: "وردپرسی" },
  { id: "uniketab", title: "یونیکتاب", type: "فروشگاه حرفه‌ای", subtitle: "کاتالوگ بزرگ و خرید آنلاین", description: "نمونه فروشگاهی با تنوع بالای محصول، جست‌وجو، دسته‌بندی، تخفیف و مدیریت تجربه خرید.", url: "https://uniketab.com/", domain: "uniketab.com", tags: ["فروشگاه", "جست‌وجو", "کاتالوگ"], tone: "rose", complexity: 3, family: "وردپرسی" },
  { id: "iranestekhdam", title: "ایران استخدام", type: "وردپرس پیشرفته", subtitle: "جست‌وجو، حساب کاربری و آگهی", description: "الگوی یک سامانه محتوایی پیشرفته با جست‌وجوی گسترده، حساب کاربری و فرایندهای تخصصی.", url: "https://iranestekhdam.ir/", domain: "iranestekhdam.ir", tags: ["سامانه", "عضویت", "جست‌وجو"], tone: "amber", complexity: 4, family: "وردپرسی" },
  { id: "hezardastan", title: "گروه هزاردستان", type: "سایت شرکتی اختصاصی پایه", subtitle: "معرفی گروه و محصولات زیرمجموعه", description: "نمونه‌ای برای دامنه امکانات یک سایت سازمانی متمرکز با معرفی گروه، محصولات و فرصت‌های شغلی.", url: "https://hezardastan.ir/", domain: "hezardastan.ir", tags: ["شرکتی", "سازمانی", "فرصت شغلی"], tone: "amber", complexity: 3, family: "اختصاصی / محصولی" },
  { id: "golrang", title: "گروه صنعتی گلرنگ", type: "سایت شرکتی حرفه‌ای", subtitle: "برندها، شرکت‌ها و روایت هلدینگ", description: "نمونه‌ای برای مقیاس و ساختار یک سایت سازمانی حرفه‌ای با دامنه محتوایی گسترده.", url: "https://golrang.com/", domain: "golrang.com", tags: ["سازمانی", "هلدینگ", "چندبخشی"], tone: "blue", complexity: 3, family: "اختصاصی / محصولی", localPreview: "/portfolio/golrang-local.png" },
  { id: "khanoumi", title: "خانومی", type: "فروشگاه اختصاصی استاندارد", subtitle: "تجربه کامل جست‌وجو و خرید", description: "نمونه‌ای برای مقیاس یک فروشگاه اختصاصی با جست‌وجو، فیلتر، برندها، تخفیف و فرایند کامل سفارش.", url: "https://www.khanoumi.com/", domain: "khanoumi.com", tags: ["فروشگاه", "فیلتر", "سفارش"], tone: "rose", complexity: 4, family: "اختصاصی / محصولی", localPreview: "/portfolio/khanoumi-local.png" },
  { id: "digikala-seller", title: "پنل فروشندگان دیجی‌کالا", type: "پورتال پیشرفته", subtitle: "عملیات چندنقشی فروشندگان", description: "الگوی یک پورتال عملیاتی شامل ثبت‌نام فروشنده، کالا، قیمت، موجودی، سفارش، تبلیغات و آموزش.", url: "https://seller.digikala.com/", domain: "seller.digikala.com", tags: ["پرتال", "فروشندگان", "عملیات"], tone: "indigo", complexity: 5, family: "اختصاصی / محصولی" },
  { id: "basalam", title: "باسلام", type: "سامانه یا مارکت‌پلیس", subtitle: "چندفروشنده و چندنقشی", description: "الگوی روشن یک بازار چندفروشنده با غرفه، سفارش، تسویه و تجربه‌های متفاوت برای خریدار و فروشنده.", url: "https://basalam.com/", domain: "basalam.com", tags: ["چندفروشنده", "تسویه", "پنل‌ها"], tone: "violet", complexity: 5, family: "اختصاصی / محصولی", localPreview: "/portfolio/basalam-local.png" },
  { id: "divar", title: "دیوار", type: "پلتفرم بزرگ و محصول نرم‌افزاری", subtitle: "محصول دیجیتال در مقیاس بزرگ", description: "نمونه‌ای از مقیاس محصول نرم‌افزاری با ثبت آگهی، جست‌وجو، فیلتر، پرداخت، چت و زیرساخت عملیاتی.", url: "https://divar.ir/", domain: "divar.ir", tags: ["پلتفرم", "مقیاس‌پذیری", "محصول"], tone: "indigo", complexity: 5, family: "اختصاصی / محصولی" },
];

const screenshots = (project: Project) => [
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1280&h=780`,
  `https://image.thum.io/get/width/1280/crop/780/noanimate/${project.url}`,
];

function BrowserPreview({ project, large = false }: { project: Project; large?: boolean }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const sources = screenshots(project);
  const localPreview = project.localPreview
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${project.localPreview}`
    : undefined;

  useEffect(() => {
    if (project.localPreview || loaded || sourceIndex >= sources.length) return;
    const timeout = window.setTimeout(() => setSourceIndex((current) => current + 1), 12000);
    return () => window.clearTimeout(timeout);
  }, [loaded, project.localPreview, sourceIndex, sources.length]);

  return (
    <div className={`project-browser real-browser tone-${project.tone} ${large ? "large" : ""}`}>
      <div className="project-browser-bar">
        <span /><span /><span />
        <i><Globe2 size={11} /> {project.domain}</i>
      </div>
      <div className="real-site-shot" role="img" aria-label={`پیش‌نمایش سایت ${project.title}`}>
        <span className="site-shot-fallback"><Globe2 size={25} /><b>{project.title}</b><small>{project.domain}</small></span>
        {localPreview ? (
          <img
            src={localPreview}
            alt={`نمای سایت ${project.title}`}
            className="is-loaded"
            loading="eager"
          />
        ) : sourceIndex < sources.length ? (
          <img
            key={`${project.id}-${sourceIndex}`}
            src={sources[sourceIndex]}
            alt={`نمای سایت ${project.title}`}
            loading="eager"
            referrerPolicy="no-referrer"
            onLoad={(event) => {
              event.currentTarget.classList.add("is-loaded");
              setLoaded(true);
            }}
            onError={() => {
              setLoaded(false);
              setSourceIndex((current) => current + 1);
            }}
          />
        ) : null}
        <span className="shot-shade" />
        <span className="live-preview-label"><i /> پیش‌نمایش واقعی</span>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduceMotion = false;

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="site-container">
        <SectionHeading icon="portfolio" eyebrow="نمونه‌های واقعی ایرانی" title="مقیاس پروژه را واقعی ببینید" description="پنجره هر نمونه، نمای زنده‌ای از سایت واقعی است. آن را باز کنید، جزئیات را ببینید و مستقیماً وارد وب‌سایت شوید." />

        <motion.div className="portfolio-grid real-portfolio-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-8%" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } } }}>
          {projects.map((project) => (
            <motion.article className="project-card real-project-card" key={project.id} variants={{ hidden: { opacity: 0, y: 28, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} whileHover={reduceMotion ? undefined : { y: -7 }}>
              <button className="project-preview-button" onClick={() => setSelected(project)} aria-label={`نمایش جزئیات ${project.title}`}><BrowserPreview project={project} /></button>
              <div className="project-card-copy"><span><small>{project.family} · {project.type}</small><strong>{project.title}</strong><em>{project.subtitle}</em></span><span className="project-card-actions"><button onClick={() => setSelected(project)} aria-label={`جزئیات ${project.title}`}><ArrowUpLeft size={16} /></button><a href={project.url} target="_blank" rel="noreferrer" aria-label={`ورود به سایت ${project.title}`}><ExternalLink size={15} /> ورود به سایت</a></span></div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="portfolio-footnote"><span>۱۳ نمونه واقعی</span><i /><p>۷ نمونه در گروه وردپرسی و ۶ نمونه در گروه اختصاصی/محصولی؛ فناوری یا ساختار آن‌ها ممکن است در آینده تغییر کند.</p></Reveal>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div className="portfolio-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="portfolio-modal real-portfolio-modal" role="dialog" aria-modal="true" aria-label={`نمونه ${selected.title}`} initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 15 }} transition={{ type: "spring", stiffness: 250, damping: 24 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)} aria-label="بستن پنجره"><X size={18} /></button>
              <div className="modal-preview"><BrowserPreview project={selected} large /></div>
              <div className="modal-copy"><span className="eyebrow"><i /> {selected.type}</span><h3>{selected.title}</h3><p>{selected.description}</p><div className="tag-row">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="complexity"><span>سطح پیچیدگی</span>{Array.from({ length: 5 }).map((_, index) => <i key={index} className={index >= selected.complexity ? "muted" : ""} />)}</div><div className="modal-actions"><a href={selected.url} target="_blank" rel="noreferrer" className="primary-button">مشاهده سایت واقعی <ExternalLink size={17} /></a><a href="#estimator" onClick={() => setSelected(null)} className="secondary-button">برآورد پروژه مشابه <ArrowUpLeft size={17} /></a></div></div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
