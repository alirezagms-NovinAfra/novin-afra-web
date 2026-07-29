"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      anchors: {
        offset: -82,
        duration: 1.05,
      },
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      const alignHash = () => {
        const target = document.querySelector(window.location.hash);
        if (target) lenis.scrollTo(target as HTMLElement, { immediate: true, offset: -82 });
      };
      requestAnimationFrame(alignHash);
      window.setTimeout(alignHash, 80);
      window.setTimeout(alignHash, 240);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}
