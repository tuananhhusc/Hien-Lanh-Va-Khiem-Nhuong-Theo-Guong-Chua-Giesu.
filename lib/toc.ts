import { readFile } from "node:fs/promises";
import path from "node:path";

import { slugify } from "@/lib/slugify";

export type TOCItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const HEADING_PATTERN = /^(##|###)\s+(.+)$/gm;

function cleanHeadingText(value: string) {
  return value
    .replace(/`/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();
}

export async function getTableOfContents(): Promise<TOCItem[]> {
  const filePath = path.join(process.cwd(), "content", "report.mdx");
  const source = await readFile(filePath, "utf8");
  const items: TOCItem[] = [];

  for (const match of source.matchAll(HEADING_PATTERN)) {
    const marks = match[1];
    const text = cleanHeadingText(match[2]);

    if (!text) {
      continue;
    }

    items.push({
      id: slugify(text),
      text,
      level: marks.length === 2 ? 2 : 3,
    });
  }

  return items;
}
