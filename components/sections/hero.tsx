"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, BarChart3, Boxes, CheckCircle2, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const proofPoints = [
  ["طراحی اختصاصی", "تجربه‌ای منطبق با برند شما"],
  ["توسعه مقیاس‌پذیر", "معماری آماده رشد واقعی"],
  ["قیمت‌گذاری شفاف", "برآورد جزئی قبل از شروع"],
];

const panels = [
  { className: "browser-panel panel-1", label: "معماری محتوا" },
  { className: "browser-panel panel-2", label: "داشبورد تحلیل" },
  { className: "browser-panel panel-3", label: "سیستم طراحی" },
  { className: "browser-panel panel-4", label: "تجربه کاربری" },
];

function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationFrame = 0;
    let seed = 7419;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const palette = [
      [199, 151, 255],
      [105, 132, 255],
      [77, 226, 255],
      [255, 103, 197],
      [255, 184, 91],
      [244, 240, 255],
    ];
    const stars = Array.from({ length: 820 }, (_, index) => ({
      arm: index % 4,
      radius: Math.pow(random(), 0.72),
      drift: (random() - 0.5) * 0.72,
      size: random() > 0.92 ? 2.4 + random() * 2.8 : 0.4 + random() * 1.7,
      alpha: 0.18 + random() * 0.72,
      speed: 0.62 + random() * 1.25,
      color: palette[Math.floor(random() * palette.length)],
    }));
    const dust = Array.from({ length: 170 }, () => ({
      x: random(),
      y: random(),
      size: 0.25 + random() * 1.1,
      alpha: 0.08 + random() * 0.3,
      phase: random() * Math.PI * 2,
    }));
    const comets = Array.from({ length: 9 }, (_, index) => ({
      radius: 0.28 + random() * 0.7,
      angle: random() * Math.PI * 2,
      speed: (index % 3 === 0 ? -1 : 1) * (0.32 + random() * 0.42),
      size: 1.7 + random() * 2.8,
      length: 22 + random() * 48,
      phase: random() * Math.PI * 2,
      color: palette[index % (palette.length - 1)],
    }));

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = () => {
      frame += 0.0054;
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.51;
      const centerY = height * 0.49;
      const galaxyRadius = Math.min(width * 0.47, height * 0.53);

      context.save();
      context.globalCompositeOperation = "lighter";
      const nebula = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius);
      nebula.addColorStop(0, "rgba(239,225,255,.34)");
      nebula.addColorStop(0.08, "rgba(187,132,255,.24)");
      nebula.addColorStop(0.3, "rgba(119,70,221,.13)");
      nebula.addColorStop(0.72, "rgba(70,46,142,.055)");
      nebula.addColorStop(1, "rgba(20,10,48,0)");
      context.fillStyle = nebula;
      context.beginPath();
      context.ellipse(centerX, centerY, galaxyRadius * 1.32, galaxyRadius * 0.76, -0.15, 0, Math.PI * 2);
      context.fill();

      for (const star of stars) {
        const radius = star.radius * galaxyRadius;
        const angle = star.arm * (Math.PI / 2) + radius * 0.037 + frame * star.speed + star.drift;
        const spread = (1 - star.radius) * 10 + star.radius * 21;
        const offset = Math.sin(angle * 3.4 + star.drift * 8) * spread;
        const x = centerX + Math.cos(angle) * radius * 1.28 - Math.sin(angle) * offset;
        const y = centerY + Math.sin(angle) * radius * 0.63 + Math.cos(angle) * offset * 0.48;
        const pulse = 0.72 + Math.sin(frame * 12 + star.drift * 17) * 0.28;
        const [red, green, blue] = star.color;
        if (star.size > 2.3) {
          const glow = context.createRadialGradient(x, y, 0, x, y, star.size * 4.2);
          glow.addColorStop(0, `rgba(255,255,255,${star.alpha * pulse})`);
          glow.addColorStop(0.2, `rgba(${red},${green},${blue},${star.alpha * pulse * 0.8})`);
          glow.addColorStop(1, `rgba(${red},${green},${blue},0)`);
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, star.size * 4.2, 0, Math.PI * 2);
          context.fill();
        }
        context.fillStyle = `rgba(${red},${green},${blue},${star.alpha * pulse})`;
        context.beginPath();
        context.arc(x, y, star.size * (0.65 + star.radius * 0.7), 0, Math.PI * 2);
        context.fill();
      }

      for (const comet of comets) {
        const angle = comet.angle + frame * comet.speed;
        const radius = comet.radius * galaxyRadius;
        const x = centerX + Math.cos(angle) * radius * 1.28;
        const y = centerY + Math.sin(angle) * radius * 0.63;
        const directionX = -Math.sin(angle) * Math.sign(comet.speed);
        const directionY = Math.cos(angle) * 0.49 * Math.sign(comet.speed);
        const visibility = 0.45 + Math.sin(frame * 2.6 + comet.phase) * 0.35;
        const [red, green, blue] = comet.color;
        const trail = context.createLinearGradient(
          x,
          y,
          x - directionX * comet.length,
          y - directionY * comet.length,
        );
        trail.addColorStop(0, `rgba(255,255,255,${visibility})`);
        trail.addColorStop(0.16, `rgba(${red},${green},${blue},${visibility * 0.92})`);
        trail.addColorStop(1, `rgba(${red},${green},${blue},0)`);
        context.strokeStyle = trail;
        context.lineWidth = comet.size * 0.7;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - directionX * comet.length, y - directionY * comet.length);
        context.stroke();
        context.fillStyle = `rgba(255,255,255,${visibility + 0.2})`;
        context.beginPath();
        context.arc(x, y, comet.size, 0, Math.PI * 2);
        context.fill();
      }

      for (const particle of dust) {
        const twinkle = 0.45 + Math.sin(frame * 8 + particle.phase) * 0.4;
        context.fillStyle = `rgba(204,178,255,${particle.alpha * twinkle})`;
        context.beginPath();
        context.arc(particle.x * width, particle.y * height, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      const core = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 44);
      core.addColorStop(0, "rgba(255,255,255,.95)");
      core.addColorStop(0.12, "rgba(225,205,255,.78)");
      core.addColorStop(0.45, "rgba(160,103,255,.24)");
      core.addColorStop(1, "rgba(127,78,230,0)");
      context.fillStyle = core;
      context.beginPath();
      context.arc(centerX, centerY, 44, 0, Math.PI * 2);
      context.fill();
      context.restore();

      animationFrame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    draw();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-galaxy-canvas" aria-hidden="true" />;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const reduceMotion = false;

  useLayoutEffect(() => {
    if (reduceMotion || !sectionRef.current || !artRef.current) return;

    const context = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".browser-panel");
      layers.forEach((layer, index) => {
        gsap.to(layer, {
          y: (index + 1) * -22,
          x: index % 2 === 0 ? -18 : 18,
          rotateY: index % 2 === 0 ? -4 : 4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      gsap.to(".hero-orbit", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} id="top" className="hero-section">
      <div className="hero-ambient hero-ambient-one" />
      <div className="hero-ambient hero-ambient-two" />
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <motion.div
            className="hero-kicker"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={16} />
            تیم طراحی و توسعه وب نوین افرا
          </motion.div>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            طراحی وب‌سایت،
            <span>مهندسی‌شده برای رشد</span>
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            ترکیب طراحی دقیق، توسعه حرفه‌ای و شناخت واقعی کسب‌وکار؛ برای
            وب‌سایتی که فقط زیبا نیست، بلکه نتیجه می‌سازد.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <a href="#estimator" className="primary-button">
              پروژه‌ام را برآورد کن
              <ArrowLeft size={18} />
            </a>
            <a href="#portfolio" className="secondary-button">
              مشاهده نمونه‌ها
            </a>
          </motion.div>

          <div className="proof-grid">
            {proofPoints.map(([title, description], index) => (
              <motion.div
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42 + index * 0.08 }}
              >
                <CheckCircle2 size={16} />
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          ref={artRef}
          className="hero-art"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: -25 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <GalaxyCanvas />
          <div className="hero-orbit" aria-hidden="true">
            <span className="galaxy-band galaxy-band-a">
              {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
            </span>
            <span className="galaxy-band galaxy-band-b">
              {Array.from({ length: 9 }).map((_, index) => <i key={index} />)}
            </span>
            <span className="galaxy-core" />
          </div>
          <div className="art-grid-floor" />
          {panels.map((panel, index) => (
            <div className={panel.className} key={panel.label}>
              <div className="browser-bar">
                <span />
                <span />
                <span />
                <small>{panel.label}</small>
              </div>
              <div className="browser-content">
                <div className="browser-side">
                  {Array.from({ length: 4 }).map((_, item) => (
                    <i key={item} />
                  ))}
                </div>
                <div className="browser-main">
                  <span className="metric-line metric-line-a" />
                  <span className="metric-line metric-line-b" />
                  <div className="chart-bars">
                    {[46, 72, 52, 84, 66].map((height) => (
                      <i key={height} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              {index === 2 ? <div className="panel-scan" /> : null}
            </div>
          ))}

          <motion.div
            className="hero-estimate-card"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -9, 0], rotate: [0, -0.6, 0] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="estimate-card-head">
              <span>
                <BarChart3 size={17} />
                برآورد لحظه‌ای پروژه
              </span>
              <i>آنلاین</i>
            </div>
            <dl>
              <div>
                <dt>نوع سایت</dt>
                <dd>وردپرس</dd>
              </div>
              <div>
                <dt>سطح پروژه</dt>
                <dd>شرکتی حرفه‌ای</dd>
              </div>
              <div>
                <dt>امکانات</dt>
                <dd>۴ مورد</dd>
              </div>
            </dl>
            <div className="estimate-range">
              <span>هزینه تخمینی راه‌اندازی</span>
              <strong>۳۰ تا ۶۵</strong>
              <small>میلیون تومان</small>
            </div>
          </motion.div>
          <div className="floating-badge floating-badge-a">
            <Boxes size={16} /> معماری ماژولار
          </div>
        </motion.div>
      </div>
      <a href="#team" className="hero-scroll-indicator" aria-label="اسکرول به بخش معرفی تیم">
        <span className="cinematic-scroll-orbit" aria-hidden="true"><i /></span>
        <span className="cinematic-scroll-copy">
          <small>تجربه تعاملی</small>
          <strong>برای ورود به فصل بعد اسکرول کنید</strong>
        </span>
      </a>
    </section>
  );
}
