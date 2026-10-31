import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { SvgDefs } from "@/components/common/SvgDefs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionToggle } from "@/components/ui/MotionToggle";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lenienttree Academy",
  description:
    "Learn it live. Build it real. Live classes, offline internships and career guidance from founders and industry mentors.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col font-ui bg-cream text-ink">
        <SvgDefs />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MotionToggle />
      </body>
    </html>
  );
}
