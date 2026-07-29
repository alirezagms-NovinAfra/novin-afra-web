"use client";

import { motion } from "motion/react";
import { ArrowLeft, BriefcaseBusiness, Check, Code2, Compass, Cpu, Orbit, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const members = [
  {
    index: "01",
    initials: "AG",
    name: "علیرضا گرمسیری",
    role: "توسعه‌دهنده فول‌استک",
    meta: "کارشناسی ارشد هوش مصنوعی",
    statement: "محصولی سریع، قابل توسعه و مهندسی‌شده؛ از رابط کاربری تا معماری و زیرساخت.",
    icon: Code2,
    skills: ["معماری نرم‌افزار", "توسعه Front-end", "Back-end و API", "هوش مصنوعی"],
    kind: "engineering",
  },
  {
    index: "02",
    initials: "MS",
    name: "میثم سبزعلی",
    role: "مدیر پروژه و متخصص کسب‌وکار",
    meta: "تحلیل، برنامه‌ریزی و هدایت پروژه",
    statement: "مسئله کسب‌وکار به تصمیم، اولویت و مسیر اجرایی شفاف و نتیجه‌محور تبدیل می‌شود.",
    icon: BriefcaseBusiness,
    skills: ["تحلیل کسب‌وکار", "استراتژی محصول", "مدیریت پروژه", "تجربه مشتری"],
    kind: "strategy",
  },
];

function EngineeringObject() {
  return (
    <div className="discipline-object engineering-object" aria-hidden="true">
      <motion.span className="orbit-ring orbit-ring-a" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}><i /></motion.span>
      <motion.span className="orbit-ring orbit-ring-b" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}><i /></motion.span>
      <div className="architecture-core"><Code2 size={34} /><span /><span /><span /></div>
      <motion.div className="tech-satellite sat-api" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.6, repeat: Infinity }}>API</motion.div>
      <motion.div className="tech-satellite sat-ai" animate={{ y: [0, 7, 0] }} transition={{ duration: 4.2, repeat: Infinity }}><Cpu size={15} /> AI</motion.div>
      <motion.div className="tech-satellite sat-system" animate={{ x: [0, 6, 0] }} transition={{ duration: 4.8, repeat: Infinity }}><Orbit size={15} /></motion.div>
    </div>
  );
}

function StrategyObject() {
  return (
    <div className="discipline-object strategy-object" aria-hidden="true">
      <svg viewBox="0 0 520 260" preserveAspectRatio="none">
        <motion.path d="M25 206 C120 200 105 84 205 112 S330 230 390 112 S455 42 500 58" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} />
        <path className="route-shadow" d="M25 206 C120 200 105 84 205 112 S330 230 390 112 S455 42 500 58" />
      </svg>
      {[
        { label: "کشف", icon: Compass, cls: "strategy-point-one" },
        { label: "تصمیم", icon: Target, cls: "strategy-point-two" },
        { label: "رشد", icon: Orbit, cls: "strategy-point-three" },
      ].map(({ label, icon: Icon, cls }, index) => (
        <motion.span className={`strategy-orb ${cls}`} key={label} title={label} animate={{ y: [0, index % 2 ? 7 : -7, 0] }} transition={{ duration: 3.8 + index * .45, repeat: Infinity, ease: "easeInOut" }}><i><Icon size={18} /></i></motion.span>
      ))}
    </div>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="section team-section team-section-v3">
      <div className="site-container">
        <SectionHeading icon="team" eyebrow="تیم نوین افرا" title="دو تخصص مکمل، در یک ساختار متمرکز" description="تصمیم فنی از مسئله کسب‌وکار جدا نیست. هر پروژه هم‌زمان از زاویه محصول، اجرا و نتیجه بررسی می‌شود." />

        <Reveal className="team-studio">
          <div className="studio-signal"><span>BUSINESS</span><i /><b>PRODUCT</b><i /><span>ENGINEERING</span></div>
          <div className="team-duo-grid">
            {members.map((member) => {
              const Icon = member.icon;
              return (
                <article className={`discipline-panel discipline-${member.kind}`} key={member.name}>
                  <div className="discipline-head">
                    <span className="discipline-index">{member.index}</span>
                    <div className="discipline-person"><span className="discipline-monogram">{member.initials}</span><div><small><Icon size={14} /> {member.role}</small><h3>{member.name}</h3><p>{member.meta}</p></div></div>
                  </div>
                  <div className="discipline-art">{member.kind === "engineering" ? <EngineeringObject /> : <StrategyObject />}</div>
                  <p className="discipline-statement">{member.statement}</p>
                  <ul>{member.skills.map((skill) => <li key={skill}><Check size={13} />{skill}</li>)}</ul>
                </article>
              );
            })}
          </div>
          <div className="studio-outcome"><span>شناخت مسئله</span><ArrowLeft size={15} /><span>طراحی تجربه</span><ArrowLeft size={15} /><span>توسعه مهندسی</span><ArrowLeft size={15} /><strong>نتیجه قابل‌اندازه‌گیری</strong></div>
        </Reveal>
      </div>
    </section>
  );
}
