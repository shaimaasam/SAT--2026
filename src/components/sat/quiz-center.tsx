"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MathText } from "@/components/math-text";
import {
  Play,
  RotateCcw,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Compass,
  Award,
  AlertCircle,
  Home,
} from "lucide-react";
import type { QuizConfig } from "@/lib/modules";
import { getImage } from "@/lib/images";

interface QuizCenterProps {
  quiz: QuizConfig;
  chapterColor: string;
  lastAttemptAt: number | null;
  bestScore: number | null;
  onSubmit: (scorePercent: number) => void;
  onClose: () => void;
}

type Phase = "intro" | "taking" | "submitted" | "review";

const COOLDOWN_MS = 5 * 60 * 1000;
const LETTERS = ["A", "B", "C", "D"];

export function QuizCenter({
  quiz,
  chapterColor,
  lastAttemptAt,
  bestScore,
  onSubmit,
  onClose,
}: QuizCenterProps) {
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = React.useState(quiz.timeLimitSeconds);
  const [reviewIdx, setReviewIdx] = React.useState(0);
  const [finalScore, setFinalScore] = React.useState<number | null>(null);

  const now = Date.now();
  const cooldownRemaining = lastAttemptAt
    ? Math.max(0, COOLDOWN_MS - (now - lastAttemptAt))
    : 0;
  const inCooldown = cooldownRemaining > 0;

  React.useEffect(() => {
    if (phase !== "taking") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  function fmtTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function handleStart() {
    setPhase("taking");
    setCurrentIdx(0);
    setAnswers({});
    setTimeLeft(quiz.timeLimitSeconds);
  }

  function handleSelect(letter: string) {
    setAnswers((prev) => ({ ...prev, [currentIdx]: letter }));
  }

  function handleSubmit() {
    const qList = quiz.questions;
    let correct = 0;
    for (let i = 0; i < qList.length; i++) {
      if (answers[i] === qList[i].a) correct++;
    }
    const pct = Math.round((correct / qList.length) * 100);
    setFinalScore(pct);
    setPhase("submitted");
    onSubmit(pct);
  }

  const qList = quiz.questions;
  const total = qList.length;
  const answeredCount = Object.keys(answers).length;
  const currentQ = phase === "taking" ? qList[currentIdx] : qList[reviewIdx];

  /* -------------------------------------------------------------- */
  /* INTRO                                                          */
  /* -------------------------------------------------------------- */
  if (phase === "intro") {
    return (
      <div className="gat-quiz-card">
        <div className="gat-quiz-hero">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/15 mb-3">
            <Compass className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-1">{quiz.title}</h2>
          <p className="text-sm opacity-80 mb-4">{quiz.subtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="rounded-lg bg-white/10 p-3">
              <Compass className="h-4 w-4 mx-auto mb-1" />
              <div className="text-xl font-bold">{total}</div>
              <div className="text-[10px] uppercase tracking-wide opacity-70">Questions</div>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <Clock className="h-4 w-4 mx-auto mb-1" />
              <div className="text-xl font-bold">{quiz.timeLimitSeconds / 60}</div>
              <div className="text-[10px] uppercase tracking-wide opacity-70">Minutes</div>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <Award className="h-4 w-4 mx-auto mb-1" />
              <div className="text-xl font-bold">{bestScore !== null ? `${bestScore}%` : "—"}</div>
              <div className="text-[10px] uppercase tracking-wide opacity-70">Best</div>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <AlertCircle className="h-4 w-4 mx-auto mb-1" />
              <div className="text-xl font-bold">5 min</div>
              <div className="text-[10px] uppercase tracking-wide opacity-70">Cooldown</div>
            </div>
          </div>
        </div>

        <div className="gat-strategy-box">
          <div className="gat-strategy-shimmer" />
          <div className="gat-strategy-title">Quiz Rules</div>
          <div className="gat-strategy-body">
            • You have <b>{quiz.timeLimitSeconds / 60} minutes</b> to complete the quiz.<br />
            • Each question has exactly one correct answer (A, B, C, or D).<br />
            • You can navigate between questions before submitting — your answers are saved.<br />
            • After submitting, you must wait <b>5 minutes</b> before retaking.<br />
            • Your best score is saved automatically to localStorage.
          </div>
        </div>

        {inCooldown ? (
          <div className="rounded-lg border-2 p-6 text-center" style={{ borderColor: "var(--red)", background: "var(--red-lt)" }}>
            <Clock className="h-10 w-10 mx-auto mb-2" style={{ color: "var(--red)" }} />
            <div className="text-base font-bold mb-1" style={{ color: "var(--red)" }}>
              Cooldown active
            </div>
            <div className="text-sm mb-3" style={{ color: "var(--muted)" }}>
              You can retake this quiz in <b>{fmtTime(Math.ceil(cooldownRemaining / 1000))}</b>
            </div>
            <div className="w-full max-w-sm mx-auto">
              <Progress value={((COOLDOWN_MS - cooldownRemaining) / COOLDOWN_MS) * 100} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleStart}
              size="lg"
              className="text-white"
              style={{ background: "var(--gold)" }}
            >
              <Play className="h-4 w-4 mr-2" />
              {bestScore !== null ? "Retake Quiz" : "Start Quiz"}
            </Button>
            <Button variant="outline" onClick={onClose} size="lg">
              <Home className="h-4 w-4 mr-2" /> Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /* TAKING                                                         */
  /* -------------------------------------------------------------- */
  if (phase === "taking" && currentQ) {
    const img = getImage(currentQ.img);
    const selected = answers[currentIdx] || null;
    return (
      <div className="gat-quiz-card">
        <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4" style={{ color: "var(--teal)" }} />
            <span className="font-semibold" style={{ color: "var(--navy)" }}>{quiz.title}</span>
          </div>
          <div className={`flex items-center gap-1 font-mono text-sm font-bold ${timeLeft < 60 ? "text-red-500" : ""}`} style={{ color: timeLeft < 60 ? "var(--red)" : "var(--navy)" }}>
            <Clock className="h-4 w-4" />
            {fmtTime(timeLeft)}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted)" }}>
            <span>Question {currentIdx + 1} of {total}</span>
            <span>{answeredCount} answered</span>
          </div>
          <Progress value={((currentIdx + 1) / total) * 100} className="h-2" />
        </div>

        <div className="gat-qcard">
          <div className="gat-qtop">
            <div className="gat-qnum">Q{currentQ.n}</div>
            <div className="flex-1">
              <div className="gat-qtext">
                <MathText block>{currentQ.text}</MathText>
              </div>
            </div>
          </div>
          {img && (
            <div className="gat-q-img-wrap">
              <img src={img} alt="Figure" className="gat-q-img" />
            </div>
          )}
          <div className="gat-opts">
            {currentQ.o.map((opt, i) => {
              const letter = LETTERS[i];
              const isSelected = selected === letter;
              return (
                <button
                  key={letter}
                  onClick={() => handleSelect(letter)}
                  className={`gat-opt ${isSelected ? "selected" : ""}`}
                >
                  <span className="gat-opt-bubble">{letter}</span>
                  <span className="flex-1">
                    <MathText block>{opt}</MathText>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="gat-mnav">
          <Button
            variant="outline"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="gat-mnav-btn"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <div className="flex flex-wrap gap-1.5 items-center max-w-md justify-center">
            {qList.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className="h-3 w-3 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === currentIdx
                      ? "var(--teal)"
                      : answers[i]
                      ? "var(--gold)"
                      : "var(--border)",
                  transform: i === currentIdx ? "scale(1.3)" : undefined,
                }}
                aria-label={`Go to question ${i + 1}`}
              />
            ))}
          </div>

          {currentIdx === total - 1 ? (
            <Button
              onClick={handleSubmit}
              className="gat-mnav-btn next"
              style={{ background: "var(--teal)", borderColor: "var(--teal)" }}
            >
              <Send className="h-4 w-4 mr-1" /> Submit
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentIdx((i) => Math.min(total - 1, i + 1))}
              className="gat-mnav-btn next"
              style={{ background: "var(--teal)", borderColor: "var(--teal)", color: "#fff" }}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /* SUBMITTED                                                      */
  /* -------------------------------------------------------------- */
  if (phase === "submitted" && finalScore !== null) {
    const correct = Math.round((finalScore / 100) * total);
    const passed = finalScore >= 70;
    return (
      <div className="gat-quiz-card">
        <div
          className="gat-quiz-hero"
          style={passed ? {} : { background: "linear-gradient(135deg, var(--red) 0%, #8e2c1f 100%)" }}
        >
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/15 mb-3">
            {passed ? <Award className="h-10 w-10" /> : <RotateCcw className="h-10 w-10" />}
          </div>
          <div className="text-5xl font-bold mb-1">{finalScore}%</div>
          <div className="text-sm opacity-80">
            You answered <b>{correct}</b> out of <b>{total}</b> correctly
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-lg border p-3 text-center" style={{ borderColor: "var(--green)", background: "var(--green-lt)" }}>
            <CheckCircle2 className="h-5 w-5 mx-auto mb-1" style={{ color: "var(--green)" }} />
            <div className="text-2xl font-bold" style={{ color: "var(--green)" }}>{correct}</div>
            <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Correct</div>
          </div>
          <div className="rounded-lg border p-3 text-center" style={{ borderColor: "var(--red)", background: "var(--red-lt)" }}>
            <XCircle className="h-5 w-5 mx-auto mb-1" style={{ color: "var(--red)" }} />
            <div className="text-2xl font-bold" style={{ color: "var(--red)" }}>{total - correct}</div>
            <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Wrong</div>
          </div>
          <div className="rounded-lg border p-3 text-center" style={{ borderColor: "var(--border)" }}>
            <Clock className="h-5 w-5 mx-auto mb-1" style={{ color: "var(--teal)" }} />
            <div className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{fmtTime(quiz.timeLimitSeconds - timeLeft)}</div>
            <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Used</div>
          </div>
        </div>

        {bestScore !== null && finalScore >= bestScore && (
          <div className="gat-strategy-box mb-4">
            <div className="gat-strategy-shimmer" />
            <div className="gat-strategy-title">New best score!</div>
            <div className="gat-strategy-body">
              You set a new personal record: <b>{finalScore}%</b> — previous best was {bestScore}%.
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setPhase("review")} variant="outline" size="lg">
            <Eye className="h-4 w-4 mr-2" /> Review Answers
          </Button>
          <Button
            onClick={() => {
              setPhase("intro");
              setFinalScore(null);
            }}
            variant="outline"
            size="lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Retake (5-min cooldown)
          </Button>
          <Button onClick={onClose} size="lg" style={{ background: "var(--teal)", color: "#fff" }}>
            <Home className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /* REVIEW                                                         */
  /* -------------------------------------------------------------- */
  if (phase === "review" && currentQ) {
    const img = getImage(currentQ.img);
    const userAnswer = answers[reviewIdx];
    const isCorrect = userAnswer === currentQ.a;
    return (
      <div className="gat-quiz-card">
        <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="font-semibold" style={{ color: "var(--navy)" }}>
            Review — Question {reviewIdx + 1} of {total}
          </span>
          {isCorrect ? (
            <Badge style={{ background: "var(--green-lt)", color: "var(--green)" }}>
              <CheckCircle2 className="h-3 w-3 mr-1" /> Correct
            </Badge>
          ) : (
            <Badge style={{ background: "var(--red-lt)", color: "var(--red)" }}>
              <XCircle className="h-3 w-3 mr-1" /> Wrong
            </Badge>
          )}
        </div>

        <div className="gat-qcard">
          <div className="gat-qtop">
            <div className="gat-qnum">Q{currentQ.n}</div>
            <div className="flex-1">
              <div className="gat-qtext">
                <MathText block>{currentQ.text}</MathText>
              </div>
            </div>
          </div>
          {img && (
            <div className="gat-q-img-wrap">
              <img src={img} alt="Figure" className="gat-q-img" />
            </div>
          )}
          <div className="gat-opts">
            {currentQ.o.map((opt, i) => {
              const letter = LETTERS[i];
              const isCorrectOpt = letter === currentQ.a;
              const isUserPick = letter === userAnswer;
              const showAsWrong = isUserPick && !isCorrectOpt;
              let cls = "gat-opt";
              if (isCorrectOpt) cls += " correct";
              else if (showAsWrong) cls += " wrong";
              return (
                <div key={letter} className={cls}>
                  <span className="gat-opt-bubble">{letter}</span>
                  <span className="flex-1">
                    <MathText block>{opt}</MathText>
                  </span>
                  {isCorrectOpt && <CheckCircle2 className="h-4 w-4" style={{ color: "var(--green)" }} />}
                  {showAsWrong && <XCircle className="h-4 w-4" style={{ color: "var(--red)" }} />}
                </div>
              );
            })}
          </div>

          <div className="gat-answer-reveal">
            <div className="gat-solution-box">
              <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                Step-by-step Solution
              </div>
              <MathText block>{currentQ.solution}</MathText>
              <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                <span className="font-semibold">Your answer:</span> {userAnswer || "—"}
                <span className="mx-2">|</span>
                <span className="font-semibold">Correct:</span> {currentQ.a}
              </div>
            </div>
          </div>
        </div>

        <div className="gat-mnav">
          <Button
            variant="outline"
            onClick={() => setReviewIdx((i) => Math.max(0, i - 1))}
            disabled={reviewIdx === 0}
            className="gat-mnav-btn"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-xs self-center" style={{ color: "var(--muted)" }}>
            {reviewIdx + 1} / {total}
          </span>
          {reviewIdx === total - 1 ? (
            <Button
              onClick={() => setPhase("submitted")}
              className="gat-mnav-btn next"
              style={{ background: "var(--teal)", borderColor: "var(--teal)", color: "#fff" }}
            >
              Back to Results
            </Button>
          ) : (
            <Button
              onClick={() => setReviewIdx((i) => Math.min(total - 1, i + 1))}
              className="gat-mnav-btn next"
              style={{ background: "var(--teal)", borderColor: "var(--teal)", color: "#fff" }}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
