"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MathText } from "@/components/math-text";
import { ChevronLeft, ChevronRight, RotateCcw, Layers, Lightbulb } from "lucide-react";
import type { Question } from "@/lib/modules";

interface FlashcardsProps {
  questions: Question[];
  chapterColor: string;
  onReview?: () => void;
}

export function Flashcards({ questions, chapterColor, onReview }: FlashcardsProps) {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  if (questions.length === 0) {
    return (
      <div className="gat-quiz-card text-center py-10">
        <Layers className="h-12 w-12 mx-auto mb-3" style={{ color: "var(--muted)" }} />
        <div className="text-base font-semibold mb-1">No flashcards yet</div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          Flashcards are generated from the chapter's questions. Once lessons are populated, flashcards will appear here.
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const total = questions.length;

  function next() {
    setIdx((i) => (i + 1) % total);
    setFlipped(false);
  }
  function prev() {
    setIdx((i) => (i - 1 + total) % total);
    setFlipped(false);
  }

  return (
    <div className="gat-flashcard">
      <div
        className="px-4 py-2 text-white text-sm font-semibold flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%)" }}
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <span>Flashcards</span>
        </div>
        <span className="text-xs opacity-80">{idx + 1} / {total}</span>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-[10px]" style={{ color: "var(--teal)", borderColor: "var(--teal)" }}>
            Q{q.n}
          </Badge>
          <Badge variant="outline" className={`gat-qmeta-tag ${q.difficulty}`}>
            {q.difficulty}
          </Badge>
          <Badge variant="outline" className="gat-qmeta-tag domain">
            {q.domain}
          </Badge>
        </div>
      </div>

      <button
        onClick={() => {
          setFlipped((f) => !f);
          onReview?.();
        }}
        className="gat-flashcard-inner w-full text-left"
      >
        {!flipped ? (
          <div>
            <div className="text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1" style={{ color: "var(--muted)" }}>
              <Lightbulb className="h-3 w-3" /> Question
            </div>
            <div className="text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
              <MathText block>{q.text}</MathText>
            </div>
            <div className="mt-4 text-xs" style={{ color: "var(--muted)" }}>Tap to reveal answer</div>
          </div>
        ) : (
          <div>
            <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--green)" }}>
              Answer & Solution
            </div>
            <div className="text-base font-semibold mb-3" style={{ color: "var(--navy)" }}>
              Correct answer: <span style={{ color: "var(--green)" }}>{q.a}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-3">
              {q.o.map((opt, i) => (
                <div
                  key={i}
                  className="text-sm rounded px-2 py-1"
                  style={
                    ["A", "B", "C", "D"][i] === q.a
                      ? { background: "var(--green-lt)", color: "var(--green)", fontWeight: 600 }
                      : {}
                  }
                >
                  <span className="font-bold mr-1">{["A", "B", "C", "D"][i]}.</span>
                  <MathText block>{opt}</MathText>
                </div>
              ))}
            </div>
            <div className="gat-solution-box">
              <MathText block>{q.solution}</MathText>
            </div>
            <div className="mt-3 text-xs" style={{ color: "var(--muted)" }}>Tap to flip back</div>
          </div>
        )}
      </button>

      <div className="gat-mnav p-3 pt-0">
        <Button variant="outline" size="sm" onClick={prev} className="gat-mnav-btn">
          <ChevronLeft className="h-4 w-4 mr-1" /> Prev
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setFlipped(false); setIdx(0); }}>
          <RotateCcw className="h-3 w-3 mr-1" /> Reset
        </Button>
        <Button variant="outline" size="sm" onClick={next} className="gat-mnav-btn">
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
