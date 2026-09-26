"use client";

import * as React from "react";
import { renderMath } from "@/lib/math-render";

/**
 * Render a string that may contain inline ($...$) or display ($$...$$)
 * LaTeX math. The HTML is produced by KaTeX on the client.
 *
 * Use this anywhere question text, options, or solutions appear.
 */
export interface MathTextProps {
  /** The text to render. */
  children: string;
  /** Optional className for the wrapper. */
  className?: string;
  /** If true, render as a block-level element. */
  block?: boolean;
}

export const MathText = React.memo(function MathText({
  children,
  className,
  block,
}: MathTextProps) {
  const html = React.useMemo(() => renderMath(children || ""), [children]);
  return (
    <span
      className={["sat-math-text", className].filter(Boolean).join(" ")}
      style={{ display: block ? "block" : "inline" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
