"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { TeamSection } from "@/components/sections/team";
import { ComparisonSection } from "@/components/sections/comparison";
import { EstimatorSection } from "@/components/sections/estimator";
import { PortfolioSection } from "@/components/sections/portfolio";
import { PricingSection } from "@/components/sections/pricing";
import { CostsSection } from "@/components/sections/costs";
import { Footer } from "@/components/footer";
import { CinematicScroll } from "@/components/cinematic-scroll";

export function MarketingPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.4,
  });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = Math.min(6800, Math.max(4800, 4200 + start * 0.1));
    const startedAt = window.performance.now();
    const ease = (value: number) => value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;

    const frame = (now: number) => {
      const progressValue = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, start * (1 - ease(progressValue)));
      if (progressValue < 1) window.requestAnimationFrame(frame);
    };

    window.requestAnimationFrame(frame);
  };

  return (
    <>
      <div className="site-galaxy" aria-hidden="true">
        <i className="site-nebula site-nebula-a" />
        <i className="site-nebula site-nebula-b" />
        <i className="site-nebula site-nebula-c" />
        <span className="site-starfield site-starfield-a" />
        <span className="site-starfield site-starfield-b" />
      </div>
      <CinematicScroll />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <TeamSection />
        <ComparisonSection />
        <EstimatorSection />
        <PortfolioSection />
        <PricingSection />
        <CostsSection />
      </main>
      <Footer />
      <motion.button
        className="scroll-top"
        aria-label="بازگشت به بالای صفحه"
        onClick={scrollToTop}
        initial={false}
        animate={{
          opacity: showTop ? 1 : 0,
          y: showTop ? 0 : 12,
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        <ArrowUp size={19} />
      </motion.button>
    </>
  );
}
