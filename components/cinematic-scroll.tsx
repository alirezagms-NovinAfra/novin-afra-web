"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapterNames = [
  "معرفی تیم",
  "انتخاب مسیر",
  "برآورد هوشمند",
  "نمونه‌های واقعی",
  "بازه‌های قیمت",
  "هزینه‌های شفاف",
];

export function CinematicScroll() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const forceMotionPreview = new URLSearchParams(window.location.search).get("motion") === "full";
    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forceMotionPreview;
    const compactMotion = window.matchMedia("(max-width: 920px)").matches;
    if (reduceMotion) {
      overlay.hidden = true;
      return;
    }

    const context = gsap.context(() => {
      const select = <T extends HTMLElement>(selector: string) =>
        overlay.querySelector<T>(selector);
      const topBar = select<HTMLElement>(".cinematic-letterbox-top");
      const bottomBar = select<HTMLElement>(".cinematic-letterbox-bottom");
      const lightLeak = select<HTMLElement>(".cinematic-light-leak");
      const vignette = select<HTMLElement>(".cinematic-vignette");
      const chapterNumber = select<HTMLElement>(".cinematic-chapter-number");
      const chapterTitle = select<HTMLElement>(".cinematic-chapter-title");
      const chapterMarker = select<HTMLElement>(".cinematic-chapter-marker");
      const chapterProgress = select<HTMLElement>(".cinematic-chapter-progress i");
      const shutterLeft = select<HTMLElement>(".cinematic-shutter-left");
      const shutterRight = select<HTMLElement>(".cinematic-shutter-right");
      const iris = select<HTMLElement>(".cinematic-iris");
      const focusFrame = select<HTMLElement>(".cinematic-focus-frame");
      const pageMain = document.querySelector<HTMLElement>("main");
      const hero = document.querySelector<HTMLElement>(".hero-section");
      const sections = gsap.utils.toArray<HTMLElement>("main > .section");

      const pulseCut = (index: number, direction: 1 | -1) => {
        if (
          !topBar || !bottomBar || !lightLeak || !chapterMarker || !chapterNumber ||
          !chapterTitle || !shutterLeft || !shutterRight || !iris || !focusFrame
        ) return;

        chapterNumber.textContent = String(index + 2).padStart(2, "0");
        chapterTitle.textContent = chapterNames[index] ?? "فصل بعد";
        gsap.killTweensOf([
          topBar, bottomBar, lightLeak, chapterMarker, shutterLeft,
          shutterRight, iris, focusFrame,
        ]);

        gsap
          .timeline()
          .set(lightLeak, { xPercent: direction > 0 ? -145 : 145, opacity: 0 })
          .set(iris, { scale: 0.18, opacity: 0 })
          .set(focusFrame, { scale: 1.18, opacity: 0 })
          .to([topBar, bottomBar], {
            scaleY: 0.92,
            duration: 0.18,
            ease: "power3.in",
          }, 0)
          .to(shutterLeft, { scaleX: 1, duration: 0.2, ease: "power4.in" }, 0)
          .to(shutterRight, { scaleX: 1, duration: 0.2, ease: "power4.in" }, 0)
          .to(iris, { scale: 1, opacity: 0.84, duration: 0.26, ease: "power3.out" }, 0.12)
          .to(chapterMarker, {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            ease: "power3.out",
          }, 0.16)
          .to(focusFrame, {
            scale: 1,
            opacity: 0.48,
            duration: 0.28,
            ease: "power3.out",
          }, 0.17)
          .to(lightLeak, {
            xPercent: direction > 0 ? 145 : -145,
            opacity: 0.92,
            duration: 0.72,
            ease: "power3.inOut",
          }, 0.18)
          .to([shutterLeft, shutterRight], {
            scaleX: 0,
            duration: 0.62,
            ease: "power4.out",
          }, 0.22)
          .to([topBar, bottomBar], {
            scaleY: 0,
            duration: 0.68,
            ease: "power4.out",
          }, 0.28)
          .to(iris, {
            scale: 2.8,
            opacity: 0,
            duration: 0.68,
            ease: "power3.out",
          }, 0.3)
          .to(focusFrame, {
            scale: 0.94,
            opacity: 0,
            duration: 0.56,
            ease: "power2.out",
          }, 0.52)
          .to(lightLeak, { opacity: 0, duration: 0.28 }, 0.66);
      };

      if (pageMain && vignette) {
        gsap.fromTo(vignette, { opacity: 0.18 }, {
          opacity: 0.52,
          ease: "none",
          scrollTrigger: {
            trigger: pageMain,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.45,
          },
        });

        [
          [".site-nebula-a", { yPercent: -38, xPercent: 14, rotate: 10, scale: 1.15 }, 1.9],
          [".site-nebula-b", { yPercent: 32, xPercent: -12, rotate: -9, scale: 1.1 }, 2.3],
          [".site-nebula-c", { yPercent: -48, xPercent: 10, rotate: 7, scale: 1.3 }, 2.7],
          [".site-starfield-a", { yPercent: -16, xPercent: 4, rotate: 4, scale: 1.08 }, 1.5],
          [".site-starfield-b", { yPercent: 21, xPercent: -5, rotate: -5, scale: 1.18 }, 2.1],
        ].forEach(([target, vars, scrub]) => {
          gsap.to(target as string, {
            ...(vars as gsap.TweenVars),
            ease: "none",
            scrollTrigger: {
              trigger: pageMain,
              start: "top top",
              end: "bottom bottom",
              scrub: scrub as number,
            },
          });
        });
      }

      if (hero) {
        gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        })
          .to(".hero-copy", {
            yPercent: -28,
            scale: 0.84,
            autoAlpha: 0.06,
            filter: "blur(18px)",
            ease: "none",
          }, 0)
          .to(".hero-art", {
            yPercent: -13,
            scale: 1.28,
            rotateY: -5,
            filter: "blur(2px) brightness(.62) saturate(1.35)",
            ease: "none",
          }, 0)
          .to(".hero-galaxy-canvas", {
            scale: 1.62,
            rotate: 9,
            opacity: 0.72,
            ease: "none",
          }, 0)
          .to(".hero-ambient", {
            scale: 1.75,
            opacity: 0.04,
            ease: "none",
          }, 0);
      }

      sections.forEach((section, index) => {
        section.classList.add("cinematic-chapter");
        const container = section.querySelector<HTMLElement>(":scope > .site-container");
        const heading = section.querySelector<HTMLElement>(".section-heading");
        const headingTitle = heading?.querySelector<HTMLElement>("h2");
        const headingCopy = heading?.querySelector<HTMLElement>("p");
        const eyebrow = heading?.querySelector<HTMLElement>(".eyebrow");
        const surface = section.querySelector<HTMLElement>(
          ".team-studio, .comparison-arena, .estimator-shell, .portfolio-grid, .pricing-grid, .costs-grid",
        );

        if (container) {
          gsap.fromTo(container, {
            y: compactMotion ? 86 : 178,
            scale: compactMotion ? 0.94 : 0.855,
            rotateX: compactMotion ? 3 : 9,
            autoAlpha: compactMotion ? 0.2 : 0.055,
            filter: compactMotion
              ? "blur(9px) brightness(.72)"
              : "blur(24px) brightness(.46) saturate(.72)",
            transformPerspective: 1500,
            transformOrigin: "50% 12%",
          }, {
            y: 0,
            scale: 1,
            rotateX: 0,
            autoAlpha: 1,
            filter: "blur(0px) brightness(1) saturate(1)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 100%",
              end: compactMotion ? "top 24%" : "top 10%",
              scrub: compactMotion ? 0.75 : 1.15,
            },
          });

          gsap.fromTo(container, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px) brightness(1)",
          }, {
            y: compactMotion ? -44 : -118,
            scale: compactMotion ? 1.025 : 1.085,
            autoAlpha: compactMotion ? 0.42 : 0.12,
            filter: compactMotion
              ? "blur(5px) brightness(.78)"
              : "blur(19px) brightness(.5) saturate(.7)",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "bottom 78%",
              end: "bottom 6%",
              scrub: compactMotion ? 0.7 : 1.1,
            },
          });
        }

        if (headingTitle) {
          gsap.fromTo(headingTitle, {
            yPercent: compactMotion ? 68 : 116,
            clipPath: "inset(0 0 100% 0)",
            scale: compactMotion ? 0.94 : 0.86,
            filter: compactMotion ? "blur(5px)" : "blur(12px)",
          }, {
            yPercent: 0,
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 96%",
              end: compactMotion ? "top 50%" : "top 36%",
              scrub: compactMotion ? 0.58 : 0.82,
            },
          });
        }

        if (headingCopy) {
          gsap.fromTo(headingCopy, {
            y: compactMotion ? 22 : 46,
            autoAlpha: 0,
            filter: "blur(10px)",
          }, {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              end: "top 38%",
              scrub: 0.7,
            },
          });
        }

        if (eyebrow) {
          gsap.fromTo(eyebrow, {
            x: compactMotion ? 28 : 76,
            rotate: compactMotion ? 0 : -4,
            scale: compactMotion ? 0.94 : 0.78,
            autoAlpha: 0,
            letterSpacing: "0.09em",
          }, {
            x: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            letterSpacing: "0em",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 99%",
              end: "top 68%",
              scrub: 0.64,
            },
          });
        }

        if (surface) {
          const revealFrom = index % 2 === 0
            ? "inset(0% 0% 0% 100%)"
            : "inset(0% 100% 0% 0%)";
          gsap.fromTo(surface, {
            x: compactMotion ? 0 : index % 2 === 0 ? 136 : -136,
            y: compactMotion ? 48 : 96,
            rotateX: compactMotion ? 3 : 8,
            rotateY: compactMotion ? 0 : index % 2 === 0 ? -7 : 7,
            scale: compactMotion ? 0.97 : 0.91,
            clipPath: compactMotion ? "inset(9% 2% 0% 2%)" : revealFrom,
            filter: compactMotion ? "blur(5px)" : "blur(14px) brightness(.64)",
            transformOrigin: index % 2 === 0 ? "100% 30%" : "0% 30%",
            transformPerspective: 1500,
          }, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px) brightness(1)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: compactMotion ? "top 12%" : "top -4%",
              scrub: compactMotion ? 0.82 : 1.25,
            },
          });
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => pulseCut(index, 1),
          onEnterBack: () => pulseCut(index, -1),
          onLeave: () => {
            if (chapterMarker) gsap.to(chapterMarker, { autoAlpha: 0, y: -8, duration: 0.28 });
          },
          onLeaveBack: () => {
            if (chapterMarker) gsap.to(chapterMarker, { autoAlpha: 0, y: 8, duration: 0.28 });
          },
          onUpdate: (self) => {
            if (chapterProgress) gsap.set(chapterProgress, { scaleX: self.progress });
          },
        });
      });
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => {
      window.clearTimeout(refreshTimer);
      context.revert();
    };
  }, []);

  return (
    <div ref={overlayRef} className="cinematic-scroll-fx" aria-hidden="true">
      <span className="cinematic-letterbox cinematic-letterbox-top" />
      <span className="cinematic-letterbox cinematic-letterbox-bottom" />
      <span className="cinematic-vignette" />
      <span className="cinematic-light-leak" />
      <span className="cinematic-grain" />
      <span className="cinematic-shutter cinematic-shutter-left" />
      <span className="cinematic-shutter cinematic-shutter-right" />
      <span className="cinematic-iris" />
      <span className="cinematic-focus-frame"><i /><i /><i /><i /></span>
      <span className="cinematic-chapter-marker">
        <span>
          <i className="cinematic-chapter-number">02</i>
          <b className="cinematic-chapter-title">معرفی تیم</b>
        </span>
        <em className="cinematic-chapter-progress"><i /></em>
      </span>
    </div>
  );
}
