"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Check, Clock3, CodeXml, Gauge, Layers3, Puzzle, Scale, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const solutions = {
  wordpress: { title: "وردپرس", label: "فضای آماده، تجهیز‌شده برای برند", icon: Puzzle, points: ["راه‌اندازی سریع‌تر و اقتصادی‌تر", "مدیریت محتوا و فروشگاه آماده", "مناسب نیازهای رایج و استاندارد"], tags: ["شرکتی", "فروشگاه", "پزشکی", "آموزشی", "رزرو"] },
  custom: { title: "طراحی اختصاصی", label: "ساخته‌شده از پایه برای فرایند شما", icon: CodeXml, points: ["آزادی کامل در معماری و تجربه", "مناسب نقش‌ها و گردش‌کار پیچیده", "آماده توسعه و مقیاس بلندمدت"], tags: ["مارکت‌پلیس", "پرتال", "SaaS", "فرایند خاص"] },
};

function ComparisonVisual({ kind }: { kind: "wordpress" | "custom" }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const image = kind === "wordpress"
    ? `${basePath}/comparison/wordpress-transparent.png`
    : `${basePath}/comparison/custom-transparent.png`;
  const alt = kind === "wordpress" ? "نمونه تصویری طراحی سایت وردپرسی" : "نمونه تصویری طراحی سایت اختصاصی";

  return (
    <div className={`comparison-visual comparison-visual-${kind}`}>
      <motion.div
        className="comparison-visual-main"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: kind === "wordpress" ? 5.4 : 6.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={image} alt={alt} fill sizes="(max-width: 920px) 100vw, 50vw" />
      </motion.div>
      <span className="comparison-visual-glow" />
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section id="compare" className="section comparison-section comparison-section-v3">
      <div className="site-container">
        <SectionHeading icon="comparison" eyebrow="انتخاب آگاهانه" title="دو مسیر متفاوت برای دو نوع نیاز" description="وردپرس و طراحی اختصاصی رقیب یکدیگر نیستند؛ هرکدام برای مسئله، بودجه و آینده متفاوتی ساخته شده‌اند." />

        <Reveal className="comparison-arena">
          <div className="arena-head">
            {Object.values(solutions).map((solution) => { const Icon = solution.icon; return <div key={solution.title}><span><Icon size={18} /></span><small>{solution.label}</small><h3>{solution.title}</h3></div>; })}
          </div>
          <div className="arena-stage comparison-image-stage">
            <div className="arena-side arena-side-wordpress"><ComparisonVisual kind="wordpress" /></div>
            <div className="arena-versus"><span>یا</span></div>
            <div className="arena-side arena-side-custom"><ComparisonVisual kind="custom" /></div>
          </div>
          <div className="arena-details">
            {[solutions.wordpress, solutions.custom].map((solution) => <div key={solution.title}><ul>{solution.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul><div>{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>)}
          </div>
        </Reveal>

        <div className="comparison-mobile-cards" aria-label="مقایسه وردپرس و طراحی اختصاصی">
          {(["wordpress", "custom"] as const).map((kind, index) => {
            const solution = solutions[kind];
            const Icon = solution.icon;
            return (
              <article className={`comparison-mobile-card comparison-mobile-card-${kind}`} key={kind}>
                <header>
                  <span><Icon size={19} /></span>
                  <div>
                    <small>{solution.label}</small>
                    <h3>{solution.title}</h3>
                  </div>
                  <b>{(index + 1).toLocaleString("fa-IR")}</b>
                </header>
                <div className="comparison-mobile-visual">
                  <ComparisonVisual kind={kind} />
                </div>
                <div className="comparison-mobile-copy">
                  <ul>
                    {solution.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}
                  </ul>
                  <div className="comparison-mobile-tags">
                    {solution.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal className="choice-spectrum choice-spectrum-v3">
          <div className="choice-spectrum-title"><Sparkles size={17} /><strong>مقایسه در یک نگاه</strong><span>اولویت پروژه، نقطه مناسب روی طیف را مشخص می‌کند.</span></div>
          <div className="spectrum-grid">
            {[{ icon: Clock3, label: "زمان اجرا", a: "سریع‌تر", b: "طولانی‌تر", pos: "24%" }, { icon: Gauge, label: "بودجه اولیه", a: "اقتصادی‌تر", b: "سرمایه‌گذاری بیشتر", pos: "35%" }, { icon: Layers3, label: "آزادی فرایند", a: "استاندارد", b: "کاملاً منعطف", pos: "78%" }].map((item) => { const Icon = item.icon; return <div className="spectrum-row" key={item.label}><span className="spectrum-label"><Icon size={15} />{item.label}</span><small>{item.a}</small><span className="spectrum-line"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} /><b style={{ right: item.pos }} /></span><small>{item.b}</small></div>; })}
          </div>
        </Reveal>
        <Reveal className="quality-statement quality-statement-v2"><Scale size={21} /><div><strong>اختصاصی بودن به‌تنهایی تضمین کیفیت نیست.</strong><p>معماری، تست، امنیت و پشتیبانی حرفه‌ای از نام تکنولوژی مهم‌ترند.</p></div></Reveal>
      </div>
    </section>
  );
}
