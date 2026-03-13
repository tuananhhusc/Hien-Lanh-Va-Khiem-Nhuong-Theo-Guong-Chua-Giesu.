import type { Metadata } from "next";

import { ArticleLayout } from "@/components/article-layout";
import { CitationSync } from "@/components/citation-sync";
import { Hero } from "@/components/hero";
import Report from "@/content/report.mdx";
import { getTableOfContents } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Khảo Luận Chuyên Sâu Về Lòng Hiền Lành Và Khiêm Nhường",
  description:
    "Khảo luận chuyên sâu về thách thức, nền tảng thần học, lộ trình tu đức và hoa trái của lòng hiền lành và khiêm nhường theo gương Chúa Giêsu.",
  authors: [{ name: "Ban biên soạn khảo luận Công giáo" }],
  keywords: [
    "Khảo luận Công giáo",
    "lòng hiền lành",
    "đức khiêm nhường",
    "Kenosis",
    "Thánh Biển Đức",
    "thần học tu đức",
    "học thuật Kitô giáo",
  ],
  category: "Theology",
  openGraph: {
    title: "Khảo Luận Chuyên Sâu Về Lòng Hiền Lành Và Khiêm Nhường",
    description:
      "Một bài nghiên cứu Công giáo chuyên sâu về lộ trình đạt tới lòng hiền lành và khiêm nhường theo gương Chúa Giêsu.",
    type: "article",
    locale: "vi_VN",
    publishedTime: "2026-03-13T00:00:00+07:00",
    modifiedTime: "2026-03-13T00:00:00+07:00",
    tags: ["Catholic Theology", "Humility", "Meekness", "Spiritual Formation"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khảo Luận Chuyên Sâu Về Lòng Hiền Lành Và Khiêm Nhường",
    description:
      "Bài nghiên cứu học thuật Công giáo về lộ trình nên giống Chúa Giêsu trong đức hiền lành và khiêm nhường.",
  },
  alternates: {
    canonical: "/",
  },
  other: {
    citation_title:
      "Khảo Luận Chuyên Sâu Về Thách Thức Và Lộ Trình Đạt Tới Lòng Hiền Lành Và Khiêm Nhường Theo Gương Chúa Giêsu",
    citation_author: "Ban biên soạn khảo luận Công giáo",
    citation_publication_date: "2026/03/13",
    citation_language: "vi",
    citation_keywords: "Công giáo; thần học; khiêm nhường; hiền lành; linh đạo",
  },
};

const title =
  "Khảo Luận Chuyên Sâu Về Thách Thức Và Lộ Trình Đạt Tới Lòng Hiền Lành Và Khiêm Nhường Theo Gương Chúa Giêsu";

const subtitle =
  "Một khảo luận học thuật Công giáo tổng hợp nền tảng Kinh Thánh, tu đức, tâm lý và truyền thống đan tu để phân tích con đường nên giống Chúa Giêsu trong đức hiền lành và khiêm nhường.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: title,
  description: subtitle,
  inLanguage: "vi",
  datePublished: "2026-03-13",
  dateModified: "2026-03-13",
  author: {
    "@type": "Organization",
    name: "Ban biên soạn khảo luận Công giáo",
  },
  publisher: {
    "@type": "Organization",
    name: "Khảo Luận Công giáo",
  },
  articleSection: ["Thần học", "Linh đạo", "Tu đức"],
  keywords: [
    "Công giáo",
    "khảo luận học thuật",
    "hiền lành",
    "khiêm nhường",
    "Kenosis",
  ],
};

export default async function HomePage() {
  const toc = await getTableOfContents();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CitationSync />
      <Hero subtitle={subtitle} title={title} />
      <ArticleLayout toc={toc}>
        <div className="scholar-prose">
          <Report />
        </div>
      </ArticleLayout>
    </main>
  );
}
