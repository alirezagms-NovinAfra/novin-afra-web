"use client";

import { motion } from "motion/react";
import {
  ArrowUpLeft,
  CheckCircle2,
  Mail,
  MessageCircleMore,
  Phone,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function Footer() {
  const reduceMotion = false;

  return (
    <footer id="contact" className="site-footer">
      <div className="site-container">
        <motion.div
          className="contact-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 45, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-orbit orbit-one" />
          <div className="contact-orbit orbit-two" />
          <div className="contact-copy">
            <span className="eyebrow">
              <i />
              قدم بعدی پروژه
            </span>
            <h2>
              بیایید پروژه شما را
              <span>درست شروع کنیم</span>
            </h2>
            <p>
              یک جلسه کوتاه برای شناخت نیازها، انتخاب مسیر درست و برآورد دقیق
              پروژه کافی است.
            </p>
            <div className="contact-proof">
              <span>
                <CheckCircle2 size={15} />
                مشاوره اولیه بدون هزینه
              </span>
              <span>
                <CheckCircle2 size={15} />
                برآورد شفاف و مرحله‌ای
              </span>
            </div>
          </div>

          <div className="contact-actions">
            <a href="tel:09916396940" className="contact-link">
              <span>
                <Phone />
              </span>
              <div>
                <small>شماره تماس</small>
                <strong dir="ltr">0991 639 6940</strong>
              </div>
              <ArrowUpLeft />
            </a>
            <a href="mailto:alirezag.dev@gmail.com" className="contact-link">
              <span>
                <Mail />
              </span>
              <div>
                <small>ایمیل</small>
                <strong dir="ltr">alirezag.dev@gmail.com</strong>
              </div>
              <ArrowUpLeft />
            </a>
            <a
              href="mailto:alirezag.dev@gmail.com?subject=درخواست مشاوره طراحی سایت"
              className="primary-button contact-cta"
            >
              <MessageCircleMore size={18} />
              دریافت مشاوره و برآورد
            </a>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <BrandMark />
          <p>
            طراحی و توسعه وب‌سایت‌های حرفه‌ای، قابل توسعه و نتیجه‌محور.
          </p>
          <span>
            © {new Date().getFullYear().toLocaleString("fa-IR")} نوین افرا
          </span>
        </div>
      </div>
    </footer>
  );
}
