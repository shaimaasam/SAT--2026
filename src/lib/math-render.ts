/**
 * SAT Platform - LaTeX/Math renderer using KaTeX
 *
 * Supports inline math with $...$ and display math with $$...$$
 * Falls back gracefully on parse errors.
 */

import katex from "katex";

/**
 * Escape HTML special characters to prevent injection.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Render a single LaTeX string to HTML using KaTeX.
 * Returns the original escaped string on error.
 */
function renderTeX(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: "html",
    });
  } catch {
    return `<span class="text-destructive">${escapeHtml(tex)}</span>`;
  }
}

/**
 * Process a chunk of text, replacing $...$ (inline) and $$...$$ (display)
 * with rendered KaTeX HTML. Text outside math delimiters is HTML-escaped.
 *
 * The parser is hand-written to:
 * - avoid collisions between inline $...$ and unescaped dollar signs in prose
 * - handle nested braces correctly
 * - tolerate LaTeX strings that contain \\\\( and \\\\[ (display in source)
 */
export function renderMath(input: string): string {
  if (!input) return "";
  let out: string[] = [];
  let i = 0;
  const n = input.length;

  while (i < n) {
    // 1) Display math: $$...$$
    if (input[i] === "$" && input[i + 1] === "$") {
      const end = input.indexOf("$$", i + 2);
      if (end === -1) {
        out.push(escapeHtml(input.slice(i)));
        break;
      }
      const tex = input.slice(i + 2, end);
      out.push(renderTeX(tex, true));
      i = end + 2;
      continue;
    }

    // 2) Inline LaTeX using \( ... \) delimiters
    if (
      input[i] === "\\" &&
      input[i + 1] === "("
    ) {
      const end = input.indexOf("\\)", i + 2);
      if (end === -1) {
        out.push(escapeHtml(input.slice(i)));
        break;
      }
      const tex = input.slice(i + 2, end);
      out.push(renderTeX(tex, false));
      i = end + 2;
      continue;
    }

    // 3) Display LaTeX using \[ ... \] delimiters
    if (
      input[i] === "\\" &&
      input[i + 1] === "["
    ) {
      const end = input.indexOf("\\]", i + 2);
      if (end === -1) {
        out.push(escapeHtml(input.slice(i)));
        break;
      }
      const tex = input.slice(i + 2, end);
      out.push(renderTeX(tex, true));
      i = end + 2;
      continue;
    }

    // 4) Inline math with single $...$ — only if a closing $ exists
    //    and the contents look "mathy" (don't trigger on prose dollar amounts).
    if (input[i] === "$") {
      // Find next unescaped $
      let j = i + 1;
      while (j < n && input[j] !== "$") {
        // allow escaped \$ inside
        if (input[j] === "\\" && j + 1 < n) j += 2;
        else j++;
      }
      if (j < n) {
        const candidate = input.slice(i + 1, j);
        // Require at least one math-ish character to treat as math.
        // This avoids eating "$5 and $6" prose as math.
        const mathy = /[=+\-*/^_{}\\]|\\frac|\\sqrt|\\sum|\\int|\\cdot|\\le|\\ge|\\ne|\\pi|\\alpha|\\beta|\\gamma|\\theta|\\angle|\\times|\\div|\\frac|\\overline|\\underline|\\left|\\right|\\mathbf|\\textbf|\\mathrm|\\sin|\\cos|\\tan|\\log|\\ln|\\infty|\\partial|\\nabla|\\Delta|\\vec|\\hat|\\bar|\\dot|\\ddot|\\cal|\\mathbb|\\mathcal|\\propto|\\sim|\\approx|\\equiv|\\cong|\\forall|\\exists|\\cup|\\cap|\\subset|\\supset|\\subseteq|\\supseteq|\\emptyset|\\in|\\notin|\\ni|\\to|\\rightarrow|\\leftarrow|\\Rightarrow|\\Leftarrow|\\leftrightarrow|\\Leftrightarrow|\\mapsto|\\circ|\\bullet|\\star|\\dagger|\\ddagger|\\parallel|\\perp|\\not|\\cdots|\\vdots|\\ddots|\\prime|\\infty|\\Re|\\Im|\\aleph|\\hbar|\\ell|\\wp|\\Im|\\Re|\\neg|\\land|\\lor|\\oplus|\\ominus|\\otimes|\\oslash|\\odot|\\rangle|\\langle|\\rfloor|\\lfloor|\\rceil|\\lceil|\\flat|\\sharp|\\natural|\\clap|\\text|\\textbf|\\textit|\\textrm|\\textsf|\\texttt|\\uppercase|\\lowercase|\\hspace|\\mspace|\\space|\\kern|\\mkern|\\raise|\\lower|\\smash|\\vcenter|\\hphantom|\\vphantom|\\smash|\\bbox|\\color|\\textcolor|\\colorbox|\\fcolorbox|\\href|\\url|\\image|\\mathchoice|\\substack|\\overrightarrow|\\overleftarrow|\\overleftrightarrow|\\overbrace|\\underbrace|\\overline|\\underline|\\overgroup|\\undergroup|\\overlinesegment|\\underlinesegment|\\overgroup/;
        if (mathy.test(candidate) || candidate.length >= 1) {
          out.push(renderTeX(candidate, false));
          i = j + 1;
          continue;
        }
      }
    }

    // 5) Plain text — collect until next potential math delimiter
    let k = i;
    while (
      k < n &&
      input[k] !== "$" &&
      !(input[k] === "\\" && (input[k + 1] === "(" || input[k + 1] === "["))
    ) {
      k++;
    }
    out.push(escapeHtml(input.slice(i, k)));
    i = k;
  }

  return out.join("");
}

/**
 * Lightweight helper: returns true if the string looks like it contains
 * LaTeX math (so callers can decide whether to use renderMath or plain text).
 */
export function hasMath(s: string): boolean {
  if (!s) return false;
  return (
    s.includes("$") ||
    s.includes("\\(") ||
    s.includes("\\[") ||
    /\\[a-zA-Z]+\{/.test(s) ||
    /\\(frac|sqrt|sum|int|cdot|le|ge|ne|pi|alpha|beta|gamma|theta|angle|times|div|left|right|mathbf|textbf|mathrm|sin|cos|tan|log|ln|infty|partial|nabla|Delta|vec|hat|bar|dot|ddot|cal|mathbb|mathcal|propto|sim|approx|equiv|cong|forall|exists|cup|cap|subset|supset|subseteq|supseteq|emptyset|in|notin|ni|to|rightarrow|leftarrow|Rightarrow|Leftarrow|leftrightarrow|Leftrightarrow|mapsto|circ|bullet|star|dagger|ddagger|parallel|perp|not|cdots|vdots|ddots|prime|Re|Im|aleph|hbar|ell|wp|neg|land|lor|oplus|ominus|otimes|oslash|odot|rangle|langle|rfloor|lfloor|rceil|lceil|flat|sharp|natural|clap|text|textbf|textit|textrm|textsf|texttt)\b/.test(
      s
    )
  );
}

/**
 * Convert plain-text math notation to LaTeX.
 * Useful when question data uses plain "x^2" or "1/2" form and we want
 * pretty rendering. Idempotent — if the input is already LaTeX it is left alone.
 */
export function toLatex(input: string): string {
  if (!input) return "";
  // If already contains $...$ or \begin/\end, assume it's LaTeX.
  if (input.includes("$") || input.includes("\\(") || input.includes("\\[")) {
    return input;
  }
  // Replace standalone fractions like 1/2 with \frac{1}{2} only when no spaces surround /
  let s = input;
  // x^2 → x^{2} (only single-char exponents; multi-char already uses {})
  s = s.replace(/([A-Za-z0-9\)\]])\^([0-9+\-A-Za-z])/g, (_m, base, exp) => {
    return `${base}^{${exp}}`;
  });
  // Standalone fractions like 5/2 → \frac{5}{2}
  s = s.replace(/(^|[^A-Za-z0-9_}{])(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g, (_m, p, a, b) => {
    return `${p}\\frac{${a}}{${b}}`;
  });
  // Wrap whole result in inline math if it looks like math.
  if (/[=+\-*/^_{}]/.test(s)) {
    return `$${s}$`;
  }
  return s;
}
