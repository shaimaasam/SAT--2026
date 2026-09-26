"use client";

import * as React from "react";
import { MathText } from "@/components/math-text";
import { Check, ChevronDown, ChevronUp, Clock, Lightbulb, X, Calculator, ExternalLink } from "lucide-react";
import type { Question } from "@/lib/modules";
import { getImage } from "@/lib/images";

interface QuestionCardProps {
  question: Question;
  selected: "A" | "B" | "C" | "D" | null;
  answered: boolean;
  showAnswers: boolean;
  stopwatch: number;
  onSelect: (choice: "A" | "B" | "C" | "D") => void;
  chapterColor: string;
}

const LETTERS: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];

const DIFFICULTY_CLASS: Record<string, string> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

export function QuestionCard({
  question,
  selected,
  answered,
  showAnswers,
  stopwatch,
  onSelect,
}: QuestionCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [showDesmos, setShowDesmos] = React.useState(false);
  const img = getImage(question.img);

  const isCorrect = answered && selected === question.a;
  const isWrong = answered && selected !== null && selected !== question.a;

  let cardClass = "gat-qcard";
  if (answered) cardClass += " answered";
  if (isCorrect) cardClass += " correct-card";
  if (isWrong) cardClass += " wrong-card";

  function fmt(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <div className={cardClass}>
      <div className="gat-qtop">
        <div className="gat-qnum">Q{question.n}</div>
        <div className="flex-1 min-w-0">
          <div className="gat-qmeta">
            <span className={`gat-qmeta-tag ${DIFFICULTY_CLASS[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <span className="gat-qmeta-tag domain">{question.domain}</span>
            {isCorrect && (
              <span className="gat-qmeta-tag" style={{ background: "var(--green-lt)", color: "var(--green)" }}>
                Correct
              </span>
            )}
            {isWrong && (
              <span className="gat-qmeta-tag" style={{ background: "var(--red-lt)", color: "var(--red)" }}>
                Wrong
              </span>
            )}
          </div>
          <div className="gat-qtext">
            <MathText block>{question.text}</MathText>
          </div>
        </div>
        <div className="gat-q-timer">
          <Clock className="h-3 w-3" />
          {fmt(stopwatch)}
        </div>
      </div>

      {img && (
        <div className="gat-q-img-wrap">
          <img src={img} alt={`Figure for Q${question.n}`} className="gat-q-img" />
        </div>
      )}

      <div className="gat-opts">
        {question.o.map((opt, idx) => {
          const letter = LETTERS[idx];
          const isSelected = selected === letter;
          const isCorrectOpt = (showAnswers || answered) && letter === question.a;
          const showAsWrong = (showAnswers || answered) && isSelected && letter !== question.a;

          let cls = "gat-opt";
          if (isCorrectOpt) cls += " correct";
          else if (showAsWrong) cls += " wrong";
          else if (isSelected) cls += " selected";

          return (
            <button
              key={letter}
              onClick={() => !answered && onSelect(letter)}
              disabled={answered}
              className={cls}
            >
              <span className="gat-opt-bubble">{letter}</span>
              <span className="flex-1">
                <MathText block>{opt}</MathText>
              </span>
              {isCorrectOpt && (
                <span className="gat-confidence-dot option-correct">
                  <Check className="h-3 w-3" />
                </span>
              )}
              {showAsWrong && (
                <span className="gat-confidence-dot option-incorrect">
                  <X className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {(showAnswers || answered) && (
        <div className="gat-answer-reveal">
          <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
            <span>
              Your answer:{" "}
              <span className="font-bold" style={{ color: isCorrect ? "var(--green)" : isWrong ? "var(--red)" : "var(--muted)" }}>
                {selected || "—"}
              </span>
            </span>
            <span>•</span>
            <span>
              Correct:{" "}
              <span className="font-bold" style={{ color: "var(--green)" }}>
                {question.a}
              </span>
            </span>
            <button
              onClick={() => setExpanded((s) => !s)}
              className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold"
              style={{ background: "var(--blue-lt)", color: "var(--teal)" }}
            >
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {expanded ? "Hide solution" : "Show solution"}
            </button>
          </div>

          {(expanded || showAnswers) && question.solution && (
            <div className="gat-solution-box">
              <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                Step-by-step Solution
              </div>
              <MathText block>{question.solution}</MathText>
            </div>
          )}
        </div>
      )}

      {/* Desmos hint — always available when desmosHint is provided */}
      {question.desmosHint && (
        <div className="mt-2">
          <button
            onClick={() => setShowDesmos((s) => !s)}
            className={`gat-desmos-btn ${showDesmos ? "active" : ""}`}
          >
            <Calculator className="h-3 w-3" />
            {showDesmos ? "Hide Desmos Hint" : "Desmos Solution"}
          </button>
          {showDesmos && (
            <div className="gat-desmos-box">
              <div className="gat-desmos-header">
                <Calculator className="h-3 w-3" />
                Solve with Desmos Graphing Calculator
              </div>
              <div className="gat-desmos-step">
                <div className="gat-desmos-step-num">1</div>
                <div className="gat-desmos-step-content">
                  <MathText block>{question.desmosHint}</MathText>
                </div>
              </div>
              <a
                href="https://www.desmos.com/calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="gat-desmos-link"
              >
                <ExternalLink className="h-3 w-3" />
                Open Desmos Calculator
              </a>
            </div>
          )}
        </div>
      )}

      {!answered && !showAnswers && question.hint && (
        <div className="mt-2">
          <button
            onClick={() => setShowHint((s) => !s)}
            className="text-xs inline-flex items-center gap-1"
            style={{ color: "var(--teal)" }}
          >
            <Lightbulb className="h-3 w-3" />
            {showHint ? "Hide hint" : "Show hint"}
          </button>
          {showHint && (
            <div className="gat-solution-box mt-1">
              <MathText block>{question.hint}</MathText>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
