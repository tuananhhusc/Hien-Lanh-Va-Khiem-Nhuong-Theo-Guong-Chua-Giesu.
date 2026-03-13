import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";

const academicSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  variable: "--font-academic-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const academicSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-academic-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Khảo Luận Hiền Lành Và Khiêm Nhường",
    template: "%s | Khảo Luận Hiền Lành Và Khiêm Nhường",
  },
  description:
    "Một website học thuật Công giáo trình bày khảo luận chuyên sâu về lòng hiền lành và khiêm nhường theo gương Chúa Giêsu.",
  applicationName: "Khảo Luận Công giáo",
  creator: "Ban biên soạn khảo luận Công giáo",
  publisher: "Khảo Luận Công giáo",
  authors: [{ name: "Ban biên soạn khảo luận Công giáo" }],
  keywords: [
    "Catholic academic report",
    "Khảo luận Công giáo",
    "lòng hiền lành",
    "đức khiêm nhường",
    "thần học",
  ],
  category: "Theology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Khảo Luận Hiền Lành Và Khiêm Nhường",
    description:
      "Khảo luận học thuật Công giáo về những thách thức và lộ trình đạt tới lòng hiền lành và khiêm nhường theo gương Chúa Giêsu.",
    type: "article",
    url: "/",
    locale: "vi_VN",
    siteName: "Khảo Luận Công giáo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khảo Luận Hiền Lành Và Khiêm Nhường",
    description:
      "Khảo luận học thuật Công giáo về lòng hiền lành và khiêm nhường theo gương Chúa Giêsu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${academicSerif.variable} ${academicSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
