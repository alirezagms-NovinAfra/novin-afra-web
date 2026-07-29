import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "نوین افرا | طراحی و توسعه حرفه‌ای وب‌سایت",
  description:
    "طراحی سایت وردپرسی و اختصاصی با برآورد شفاف قیمت، توسعه حرفه‌ای و نگاه کسب‌وکاری.",
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem("theme");
      const theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      document.documentElement.dataset.theme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
