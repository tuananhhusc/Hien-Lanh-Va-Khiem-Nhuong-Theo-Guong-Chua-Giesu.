import type { ReactNode } from "react";

import { TOC } from "@/components/toc";
import type { TOCItem } from "@/lib/toc";

type ArticleLayoutProps = {
  toc: TOCItem[];
  children: ReactNode;
};

export function ArticleLayout({ toc, children }: ArticleLayoutProps) {
  return (
    <section className="shell pb-14 pt-5 sm:pb-20 sm:pt-7">
      <div className="academic-layout grid grid-cols-1 gap-5 lg:grid-cols-[minmax(20rem,24rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(22rem,26rem)_minmax(0,1fr)]">
        <aside aria-label="Mục lục bài viết" className="order-1 min-w-0">
          <TOC items={toc} />
        </aside>

        <article className="order-2 min-w-0" id="noi-dung">
          <div className="mobile-reading-wrap max-w-[90ch]">{children}</div>
        </article>
      </div>
    </section>
  );
}
