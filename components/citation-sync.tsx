"use client";

import { useEffect } from "react";

function syncCitations() {
  const seen = new Set<string>();
  const refs = document.querySelectorAll<HTMLAnchorElement>(
    "a.citation-ref[data-ref]",
  );

  refs.forEach((ref) => {
    const key = ref.dataset.ref;
    if (!key || seen.has(key)) {
      return;
    }

    ref.id = `cite-${key}`;
    seen.add(key);
  });
}

function syncReferences() {
  const referencesHeading = document.getElementById("nguon-trich-dan");
  if (!referencesHeading) {
    return;
  }

  let node: Element | null = referencesHeading.nextElementSibling;
  while (node && node.tagName !== "OL") {
    node = node.nextElementSibling;
  }

  if (!node || node.tagName !== "OL") {
    return;
  }

  const list = node as HTMLOListElement;
  list.classList.add("references-list");

  const items = Array.from(list.children).filter(
    (child): child is HTMLLIElement => child.tagName === "LI",
  );

  items.forEach((item, index) => {
    const number = String(index + 1);
    item.id = `ref-${number}`;

    const backlink = item.querySelector<HTMLAnchorElement>("a.ref-backlink");
    if (backlink) {
      backlink.href = `#cite-${number}`;
      return;
    }

    const link = document.createElement("a");
    link.className = "ref-backlink";
    link.href = `#cite-${number}`;
    link.setAttribute("aria-label", `Quay lại chú thích ${number}`);
    link.textContent = "↩";

    item.append(" ", link);
  });
}

export function CitationSync() {
  useEffect(() => {
    const run = () => {
      syncCitations();
      syncReferences();
    };

    run();
    const timeoutId = window.setTimeout(run, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
