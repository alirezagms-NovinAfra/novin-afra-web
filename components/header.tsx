"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpLeft,
  BadgeDollarSign,
  Calculator,
  GitCompareArrows,
  Menu,
  Moon,
  PanelsTopLeft,
  Sparkles,
  Sun,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { BrandMark } from "@/components/brand-mark";

const navItems = [
  { label: "معرفی تیم", caption: "دو تخصص مکمل", href: "#team", icon: UsersRound },
  { label: "مقایسه مسیرها", caption: "وردپرس یا اختصاصی", href: "#compare", icon: GitCompareArrows },
  { label: "برآورد قیمت", caption: "محاسبه تعاملی پروژه", href: "#estimator", icon: Calculator },
  { label: "نمونه‌های واقعی", caption: "پروژه‌های ایرانی", href: "#portfolio", icon: PanelsTopLeft },
  { label: "تعرفه‌ها", caption: "بازه شفاف هزینه‌ها", href: "#pricing", icon: BadgeDollarSign },
];

function subscribeToTheme(callback: () => void) {
  window.addEventListener("novin-theme-change", callback);
  return () => window.removeEventListener("novin-theme-change", callback);
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function Header() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "dark",
  );
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const applyTheme = () => {
      root.dataset.theme = next;
      window.localStorage.setItem("theme", next);
      window.dispatchEvent(new Event("novin-theme-change"));
    };
    root.classList.add("theme-transitioning");
    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(applyTheme).finished.finally(() => {
        root.classList.remove("theme-transitioning");
      });
    } else {
      applyTheme();
      window.setTimeout(() => root.classList.remove("theme-transitioning"), 1900);
    }
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <a href="#top" className="shrink-0" aria-label="صفحه اصلی نوین افرا">
          <BrandMark />
        </a>

        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "فعال‌کردن تم روشن" : "فعال‌کردن تم تاریک"}
          >
            <motion.span
              layout
              className={theme === "dark" ? "translate-x-0" : "-translate-x-7"}
            >
              {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
            </motion.span>
          </button>
          <a href="#estimator" className="primary-button header-cta">
            برآورد هوشمند پروژه
          </a>
          <button
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="نمایش منو"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="mobile-nav-backdrop"
              aria-label="بستن منو"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.nav
              className="mobile-nav"
              aria-label="منوی موبایل"
              initial={{ opacity: 0, y: -24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 310, damping: 28 }}
            >
              <motion.div
                className="mobile-nav-intro"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                <span><Sparkles size={17} /></span>
                <div><strong>مسیر پروژه شما</strong><small>مستقیم به بخش موردنظر بروید</small></div>
              </motion.div>
              <motion.div
                className="mobile-nav-links"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      variants={{
                        hidden: { opacity: 0, x: 18 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <span><Icon size={19} /></span>
                      <div><strong>{item.label}</strong><small>{item.caption}</small></div>
                      <b>{(index + 1).toLocaleString("fa-IR")}</b>
                    </motion.a>
                  );
                })}
              </motion.div>
              <motion.a
                href="#contact"
                className="mobile-nav-cta"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
              >
                شروع گفت‌وگو درباره پروژه
                <ArrowUpLeft size={18} />
              </motion.a>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
