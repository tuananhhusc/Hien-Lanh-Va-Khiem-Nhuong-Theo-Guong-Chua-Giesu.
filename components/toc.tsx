"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { TOCItem } from "@/lib/toc";

type TOCProps = {
  items: TOCItem[];
};

export function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [showSubsections, setShowSubsections] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const listRef = useRef<HTMLOListElement | null>(null);

  const hasSubsections = useMemo(
    () => items.some((item) => item.level === 3),
    [items],
  );

  const visibleItems = useMemo(
    () => items.filter((item) => showSubsections || item.level === 2),
    [items, showSubsections],
  );

  const displayActiveId = useMemo(() => {
    if (showSubsections) {
      return activeId;
    }

    const activeIndex = items.findIndex((item) => item.id === activeId);
    if (activeIndex === -1) {
      return visibleItems[0]?.id ?? "";
    }

    if (items[activeIndex]?.level === 2) {
      return activeId;
    }

    for (let index = activeIndex - 1; index >= 0; index -= 1) {
      if (items[index]?.level === 2) {
        return items[index].id;
      }
    }

    return visibleItems[0]?.id ?? "";
  }, [activeId, items, showSubsections, visibleItems]);

  const activeLabel =
    items.find((item) => item.id === displayActiveId)?.text ?? "Mở mục lục";

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headings.length) {
      return;
    }

    const updateActiveByScroll = () => {
      const offset = window.innerWidth >= 1024 ? 152 : 118;
      const position = window.scrollY + offset;

      let current = headings[0];
      for (const heading of headings) {
        if (heading.offsetTop <= position) {
          current = heading;
          continue;
        }

        break;
      }

      if (current?.id) {
        setActiveId((previous) => (previous === current.id ? previous : current.id));
      }
    };

    let frame = 0;

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveByScroll();
      });
    };

    const onHashOrLoad = () => updateActiveByScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashOrLoad);
    window.addEventListener("load", onHashOrLoad);

    updateActiveByScroll();
    window.setTimeout(updateActiveByScroll, 140);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashOrLoad);
      window.removeEventListener("load", onHashOrLoad);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items]);

  useEffect(() => {
    if (!displayActiveId || !listRef.current) {
      return;
    }

    if (window.innerWidth < 1024 && !isMobileOpen) {
      return;
    }

    const target = listRef.current.querySelector<HTMLAnchorElement>(
      `a[href="#${displayActiveId}"]`,
    );

    if (target) {
      target.scrollIntoView({ block: "nearest" });
    }
  }, [displayActiveId, isMobileOpen, visibleItems]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      return;
    }

    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  let chapter = 0;

  return (
    <nav
      className="toc-panel lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto"
      id="muc-luc"
      aria-label="Mục lục"
    >
      <div className="toc-mobile-fab lg:hidden">
        <button
          aria-controls="toc-content"
          aria-expanded={isMobileOpen}
          className="toc-mobile-trigger"
          onClick={() => setIsMobileOpen((value) => !value)}
          type="button"
        >
          <span className="toc-mobile-label">Mục lục</span>
          <span className="toc-mobile-current">{activeLabel}</span>
        </button>
      </div>

      {isMobileOpen ? (
        <button
          aria-label="Đóng mục lục"
          className="toc-mobile-backdrop lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          type="button"
        />
      ) : null}

      <div
        className={`${isMobileOpen ? "block" : "hidden"} toc-mobile-panel lg:block`}
        id="toc-content"
      >
        <div className="toc-topbar">
          <div>
            <p className="toc-kicker">Mục lục học thuật</p>
            <p className="toc-count">{visibleItems.length} mục</p>
          </div>
          <div className="toc-actions">
            {hasSubsections ? (
              <button
                className="toc-toggle"
                onClick={() => setShowSubsections((value) => !value)}
                type="button"
              >
                {showSubsections ? "Ẩn mục phụ" : "Hiện mục phụ"}
              </button>
            ) : null}
            <button
              className="toc-mobile-close lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              type="button"
            >
              Đóng
            </button>
          </div>
        </div>

        <ol className="toc-list" ref={listRef} role="list">
          {visibleItems.map((item) => {
            const isActive = item.id === displayActiveId;
            if (item.level === 2) {
              chapter += 1;
            }

            return (
              <li key={item.id}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={[
                    "toc-link",
                    item.level === 3 ? "toc-link-sub" : "toc-link-main",
                    isActive ? "toc-link-active" : "",
                  ].join(" ")}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.level === 2 ? (
                    <span className="toc-index" aria-hidden="true">
                      {String(chapter).padStart(2, "0")}
                    </span>
                  ) : null}
                  <span>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
