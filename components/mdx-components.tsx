import type { MDXComponents } from "mdx/types";
import {
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { slugify } from "@/lib/slugify";

const citationPattern =
  /([)\]"'”’.!?])([1-9]|1\d|2[0-1])(?=(?:\s|$|[,.;:!?]))|(\s)([1-9]|1\d|2[0-1])(?=[,.;:!?])/g;

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return "";
}

function decorateCitationText(text: string, keyPrefix: string): ReactNode {
  citationPattern.lastIndex = 0;

  const tokens: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = citationPattern.exec(text)) !== null) {
    const index = match.index;
    const full = match[0];
    const prefix = match[1] ?? match[3] ?? "";
    const citation = match[2] ?? match[4] ?? "";

    if (index > cursor) {
      tokens.push(text.slice(cursor, index));
    }

    tokens.push(prefix);
    tokens.push(
      <sup className="citation-sup" key={`${keyPrefix}-${index}-${citation}`}>
        <a
          className="citation-ref"
          data-ref={citation}
          href={`#ref-${citation}`}
          aria-label={`Xem nguồn trích dẫn ${citation}`}
        >
          {citation}
        </a>
      </sup>,
    );

    cursor = index + full.length;
  }

  if (!tokens.length) {
    return text;
  }

  if (cursor < text.length) {
    tokens.push(text.slice(cursor));
  }

  return tokens;
}

function decorateCitationNode(node: ReactNode, keyPrefix: string): ReactNode {
  if (typeof node === "string") {
    return decorateCitationText(node, keyPrefix);
  }

  if (typeof node === "number" || node == null || typeof node === "boolean") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <Fragment key={`${keyPrefix}-${index}`}>
        {decorateCitationNode(child, `${keyPrefix}-${index}`)}
      </Fragment>
    ));
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.props.children == null) {
      return node;
    }

    return cloneElement(
      node as ReactElement<{ children?: ReactNode }>,
      undefined,
      decorateCitationNode(node.props.children, `${keyPrefix}-child`),
    );
  }

  return node;
}

function createHeading(level: "h2" | "h3") {
  return function Heading({
    children,
  }: {
    children: ReactNode;
  }) {
    const text = getTextContent(children);
    const id = slugify(text);
    const Tag = level;

    return <Tag id={id}>{children}</Tag>;
  };
}

export const mdxComponents: MDXComponents = {
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  p: ({ children }) => <p>{decorateCitationNode(children, "p")}</p>,
  a: ({ href = "", children }) => (
    <a
      className="underline decoration-gold decoration-2 underline-offset-4 transition hover:text-purple"
      href={href}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote>{decorateCitationNode(children, "blockquote")}</blockquote>
  ),
  ul: ({ children, className }) => (
    <ul className={["list-disc", className].filter(Boolean).join(" ")}>{children}</ul>
  ),
  ol: ({ children, className }) => (
    <ol className={["list-decimal", className].filter(Boolean).join(" ")}>{children}</ol>
  ),
  table: ({ children }) => (
    <div className="table-shell">
      <table>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{decorateCitationNode(children, "td")}</td>,
  hr: () => <hr />,
};
