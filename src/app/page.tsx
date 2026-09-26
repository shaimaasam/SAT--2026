"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MathText } from "@/components/math-text";
import { QuestionCard } from "@/components/sat/question-card";
import { QuizCenter } from "@/components/sat/quiz-center";
import { Flashcards } from "@/components/sat/flashcards";
import { AchievementsPanel } from "@/components/sat/achievements-panel";
import {
  chapters,
  platformConfig,
  findModule,
  buildChapterQuiz,
  getQuestionOfTheDay,
  type ChapterConfig,
  type Module,
  type Question,
} from "@/lib/modules";
import { getImage } from "@/lib/images";
import {
  Sun,
  Moon,
  Home as HomeIcon,
  Eye,
  EyeOff,
  Clock,
  Layers,
  FileDown,
  BookOpen,
  Compass,
  Play,
  ChevronRight,
  Star,
  Trophy,
  HelpCircle,
  FileQuestion,
  CheckSquare,
  Timer,
  Hourglass,
  Lightbulb,
  Image as ImageIcon,
  Calculator,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "next-themes";

type View = "dashboard" | "lesson" | "quiz" | "flashcards" | "qotd";

interface PersistedState {
  answers: Record<string, "A" | "B" | "C" | "D">;
  stopwatches: Record<string, number>;
  bestScores: Record<string, number>;
  lastAttempts: Record<string, number>;
  quizzesCompleted: number;
  bestStreak: number;
  flashcardsReviewed: number;
}

const STORAGE_KEY = "sat-math-2026-state-v2";

function emptyState(): PersistedState {
  return {
    answers: {},
    stopwatches: {},
    bestScores: {},
    lastAttempts: {},
    quizzesCompleted: 0,
    bestStreak: 0,
    flashcardsReviewed: 0,
  };
}

function loadState(): PersistedState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    // Migration: if the v1 key exists, copy answers over
    const v1raw = localStorage.getItem("sat-math-2026-state-v1");
    if (v1raw && !raw) {
      return { ...emptyState(), ...JSON.parse(v1raw) };
    }
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
}

function saveState(s: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function fmtTimer(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [chapterId, setChapterId] = React.useState<string>(chapters[0].id);
  const [moduleId, setModuleId] = React.useState<string | null>(null);
  const [view, setView] = React.useState<View>("dashboard");
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [lessonTimer, setLessonTimer] = React.useState(0);
  const [state, setState] = React.useState<PersistedState>(emptyState());
  const [toast, setToast] = React.useState<{ msg: string; show: boolean }>({ msg: "", show: false });

  const chapter = React.useMemo(
    () => chapters.find((c) => c.id === chapterId) || chapters[0],
    [chapterId]
  );
  const activeModule = React.useMemo(
    () => (moduleId ? findModule(chapter, moduleId) : null),
    [chapter, moduleId]
  );

  React.useEffect(() => {
    setMounted(true);
    setState(loadState());
  }, []);

  React.useEffect(() => {
    saveState(state);
  }, [state]);

  function showToast(msg: string) {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  }

  React.useEffect(() => {
    if (view !== "lesson" || !activeModule) return;
    setLessonTimer(0);
    const id = setInterval(() => setLessonTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [view, activeModule]);

  React.useEffect(() => {
    if (view !== "lesson" || !activeModule) return;
    const id = setInterval(() => {
      setState((prev) => {
        if (!activeModule) return prev;
        const key = `${activeModule.id}`;
        const cur = prev.stopwatches[key] || 0;
        return { ...prev, stopwatches: { ...prev.stopwatches, [key]: cur + 1 } };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [view, activeModule]);

  // Keyboard shortcuts
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setShowAnswers((s) => !s);
        showToast("Toggled Show Answers");
        return;
      }
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        setView("dashboard");
        setModuleId(null);
        showToast("Back to Cover");
        return;
      }
      if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        setView("quiz");
        showToast("Opened Quiz Center");
        return;
      }
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        setView("flashcards");
        showToast("Opened Flashcards");
        return;
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
        showToast("Theme toggled");
        return;
      }
      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < chapters.length) {
          e.preventDefault();
          setChapterId(chapters[idx].id);
          setModuleId(null);
          setView("dashboard");
          showToast(`Chapter ${idx + 1}: ${chapters[idx].title}`);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [theme, setTheme]);

  function handleSelectAnswer(q: Question, choice: "A" | "B" | "C" | "D") {
    if (!activeModule) return;
    const key = `${activeModule.id}-${q.n}`;
    setState((prev) => {
      const prevAnswer = prev.answers[key];
      const newAnswers = { ...prev.answers, [key]: choice };
      const isCorrect = choice === q.a;
      const wasCorrect = prevAnswer === q.a;
      const newStreak = isCorrect ? prev.bestStreak + (wasCorrect ? 0 : 1) : 0;
      return { ...prev, answers: newAnswers, bestStreak: Math.max(prev.bestStreak, newStreak) };
    });
  }

  function handleSubmitQuiz(scorePercent: number) {
    setState((prev) => ({
      ...prev,
      bestScores: {
        ...prev.bestScores,
        [chapter.id]: Math.max(prev.bestScores[chapter.id] || 0, scorePercent),
      },
      lastAttempts: { ...prev.lastAttempts, [chapter.id]: Date.now() },
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));
    showToast(`Quiz submitted: ${scorePercent}%`);
  }

  function handleFlashcardReview() {
    setState((prev) => ({ ...prev, flashcardsReviewed: prev.flashcardsReviewed + 1 }));
  }

  function openModule(m: Module) {
    setModuleId(m.id);
    setView("lesson");
  }

  function openQuiz() {
    setView("quiz");
  }

  function openFlashcards() {
    setView("flashcards");
  }

  function openQOTD() {
    setView("qotd");
  }

  function goCover() {
    setView("dashboard");
    setModuleId(null);
  }

  function selectChapter(c: ChapterConfig) {
    setChapterId(c.id);
    setModuleId(null);
    setView("dashboard");
  }

  function exportPdf() {
    window.print();
  }

  const totalQuestionsAcrossPlatform = React.useMemo(
    () => chapters.reduce((s, c) => s + c.modules.reduce((s2, m) => s2 + m.qcount, 0), 0),
    []
  );

  const correctCountActual = React.useMemo(() => {
    let count = 0;
    for (const c of chapters) {
      for (const m of c.modules) {
        for (const q of m.qs) {
          const key = `${m.id}-${q.n}`;
          if (state.answers[key] === q.a) count++;
        }
      }
    }
    return count;
  }, [state.answers]);

  const answeredCountActual = React.useMemo(() => {
    let count = 0;
    for (const c of chapters) {
      for (const m of c.modules) {
        for (const q of m.qs) {
          const key = `${m.id}-${q.n}`;
          if (state.answers[key]) count++;
        }
      }
    }
    return count;
  }, [state.answers]);

  const qotd = React.useMemo(() => getQuestionOfTheDay(), []);

  // Determine the current chapter index for display
  const chapterIdx = chapters.findIndex((c) => c.id === chapterId);

  return (
    <TooltipProvider delayDuration={300}>
      <div id="gat-app" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Top bar */}
        <div className="gat-topbar">
          <div className="gat-brand">
            <div className="title flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5" style={{ color: "#f0c060" }} />
              {platformConfig.name} · Chapter {chapterIdx + 1}: {chapter.title}
            </div>
            <div className="sub">{platformConfig.instructor} · Interactive Workbook</div>
          </div>

          <div className="gat-controls">
            {/* Timer */}
            <div className="gat-timer-bar">
              <div className="gat-timer-item">
                <span className="gat-timer-label">Lesson</span>
                <span className={`gat-timer-value ${lessonTimer > (activeModule?.timeLimit || 9999) ? "warning" : ""}`}>
                  {fmtTimer(lessonTimer)}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <div className="gat-timer-item">
                <span className="gat-timer-label">Q</span>
                <span className="gat-timer-value">
                  {fmtTimer(activeModule ? (state.stopwatches[activeModule.id] || 0) : 0)}
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="gat-score-chip">
              <Trophy className="h-3 w-3" style={{ color: "#f0c060" }} />
              Score: {correctCountActual} / {answeredCountActual || 0}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={goCover}
                  className="gat-btn gat-btn-ghost"
                  title="Cover (H)"
                >
                  <HomeIcon className="h-3 w-3" />
                  Cover
                </button>
              </TooltipTrigger>
              <TooltipContent>Return to dashboard (H)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowAnswers((s) => !s)}
                  className={`gat-btn gat-btn-ghost ${showAnswers ? "active" : ""}`}
                  title="Show Answers (Ctrl+Shift+A)"
                >
                  {showAnswers ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </button>
              </TooltipTrigger>
              <TooltipContent>Toggle answer keys (Ctrl+Shift+A)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={openQOTD}
                  className="gat-btn gat-btn-qotd"
                  title="Question of the Day"
                >
                  <Star className="h-3 w-3" />
                  Q of the Day
                </button>
              </TooltipTrigger>
              <TooltipContent>Today's featured question</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={openFlashcards} className="gat-btn gat-btn-ghost" title="Flashcards (F)">
                  <Layers className="h-3 w-3" />
                  Flashcards
                </button>
              </TooltipTrigger>
              <TooltipContent>Open flashcards (F)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={exportPdf} className="gat-btn gat-btn-ghost" title="PDF Export">
                  <FileDown className="h-3 w-3" />
                  PDF
                </button>
              </TooltipTrigger>
              <TooltipContent>Export as PDF (print)</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6 bg-white/15" />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="gat-btn gat-btn-ghost"
                  title="Theme (T)"
                >
                  {mounted && theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                  {mounted && theme === "dark" ? "Light" : "Dark"}
                </button>
              </TooltipTrigger>
              <TooltipContent>Toggle light/dark mode (T)</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Chapter selector pills */}
        <div className="gat-chapter-pills">
          <div className="mx-auto max-w-[1300px] w-full flex gap-2 overflow-x-auto">
            {chapters.map((c, idx) => {
              const isActive = c.id === chapterId;
              return (
                <button
                  key={c.id}
                  onClick={() => selectChapter(c)}
                  className={`gat-chapter-pill ${isActive ? "active" : ""}`}
                >
                  <span className="opacity-70">Ch{idx + 1}</span>
                  <span>{c.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body: sidebar + content */}
        <div id="gat-body" style={{ display: "flex", flex: 1, maxWidth: 1300, width: "100%", margin: "0 auto" }}>
          {/* Sidebar */}
          <Sidebar
            chapter={chapter}
            activeModuleId={moduleId}
            view={view}
            state={state}
            onSelectModule={openModule}
            onSelectQuiz={openQuiz}
            onSelectFlashcards={openFlashcards}
            onSelectQOTD={openQOTD}
          />

          {/* Main content */}
          <main className="gat-content">
            {view === "dashboard" && (
              <DashboardView
                chapter={chapter}
                qotd={qotd}
                onStartLesson={() => {
                  const firstWithContent = chapter.modules.find((m) => m.qs.length > 0);
                  const target = firstWithContent || chapter.modules[0];
                  openModule(target);
                }}
                onOpenQuiz={openQuiz}
                onOpenFlashcards={openFlashcards}
                state={state}
                totalQuestions={totalQuestionsAcrossPlatform}
                answeredCount={answeredCountActual}
                correctCount={correctCountActual}
              />
            )}

            {view === "lesson" && activeModule && (
              <LessonView
                chapter={chapter}
                module={activeModule}
                showAnswers={showAnswers}
                state={state}
                onSelectAnswer={handleSelectAnswer}
                onOpenQuiz={openQuiz}
                onNavigate={(id) => setModuleId(id)}
              />
            )}

            {view === "quiz" && (
              <QuizCenter
                quiz={buildChapterQuiz(chapter)}
                chapterColor={chapter.color}
                lastAttemptAt={state.lastAttempts[chapter.id] || null}
                bestScore={state.bestScores[chapter.id] || null}
                onSubmit={handleSubmitQuiz}
                onClose={goCover}
              />
            )}

            {view === "flashcards" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--navy)" }}>
                      <Layers className="h-5 w-5" style={{ color: "var(--teal)" }} />
                      {chapter.title} — Flashcards
                    </h2>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      Tap a card to flip between question and answer.
                    </p>
                  </div>
                  <Button variant="outline" onClick={goCover}>
                    <HomeIcon className="h-4 w-4 mr-1" /> Back to Dashboard
                  </Button>
                </div>
                <Flashcards
                  questions={getAllQuestionsForChapter(chapter)}
                  chapterColor={chapter.color}
                  onReview={handleFlashcardReview}
                />
              </div>
            )}

            {view === "qotd" && (
              <QOTDView qotd={qotd} onClose={goCover} />
            )}
          </main>
        </div>

        {/* Watermark */}
        <div className="gat-watermark">{platformConfig.name}</div>

        {/* Toast */}
        <div className={`gat-toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>

        {/* Footer */}
        <footer
          className="text-white text-xs py-3 px-4"
          style={{ background: "var(--navy)", marginTop: "auto" }}
        >
          <div className="mx-auto max-w-[1300px] text-center opacity-70">
            {platformConfig.name} · {platformConfig.instructor} · {platformConfig.tagline} · SAT Math 2026 Edition
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

/* Helpers */
function getAllQuestionsForChapter(chapter: ChapterConfig): Question[] {
  const out: Question[] = [];
  for (const m of chapter.modules) {
    for (const q of m.qs) out.push(q);
  }
  return out;
}

/* ----------------------------------------------------------------- */
/* Sidebar                                                           */
/* ----------------------------------------------------------------- */

interface SidebarProps {
  chapter: ChapterConfig;
  activeModuleId: string | null;
  view: View;
  state: PersistedState;
  onSelectModule: (m: Module) => void;
  onSelectQuiz: () => void;
  onSelectFlashcards: () => void;
  onSelectQOTD: () => void;
}

function Sidebar({
  chapter,
  activeModuleId,
  view,
  state,
  onSelectModule,
  onSelectQuiz,
  onSelectFlashcards,
  onSelectQOTD,
}: SidebarProps) {
  // Count completed lessons (lessons where all questions are answered)
  const completedLessons = chapter.modules.filter((m) => {
    if (m.qs.length === 0) return false;
    return m.qs.every((q) => state.answers[`${m.id}-${q.n}`]);
  }).length;

  return (
    <aside className="gat-sidebar">
      <h3>Chapter Lessons</h3>
      <div style={{ marginBottom: 8 }}>
        {chapter.modules.map((m) => {
          const isActive = activeModuleId === m.id && view === "lesson";
          const answeredInModule = m.qs.filter((q) => state.answers[`${m.id}-${q.n}`]).length;
          const completed = m.qs.length > 0 && answeredInModule === m.qs.length;
          const progressPct = m.qs.length > 0 ? (answeredInModule / m.qs.length) * 100 : 0;

          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(m)}
              className={`gat-module-btn ${isActive ? "active" : ""}`}
            >
              <div className="lid">
                <span className="active-dot" />
                {completed ? (
                  <CheckSquare className="h-3 w-3" style={{ color: isActive ? "#fff" : "var(--green)" }} />
                ) : null}
                {m.num}
              </div>
              <div className="ltitle">{m.title}</div>
              <div className="lsub">
                Questions {m.qrange} · {m.qs.length || m.qcount} Q
                {m.qs.length > 0 && ` · ${Math.round(progressPct)}%`}
              </div>
              {m.qs.length > 0 && (
                <div className="lprog">
                  <div className="lprog-fill" style={{ width: `${progressPct}%` }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 12,
          marginTop: 8,
        }}
      >
        <h3>Quick Actions</h3>
        <button
          onClick={onSelectQOTD}
          className="gat-module-btn"
          style={{
            borderLeftColor: "var(--gold)",
            background: "linear-gradient(135deg, var(--gold-lt) 0%, #fff 100%)",
            border: "1px solid rgba(184, 134, 42, 0.3)",
          }}
        >
          <div className="lid" style={{ color: "var(--navy)" }}>
            <Star className="h-3 w-3" style={{ color: "var(--gold)" }} /> Question of the Day
          </div>
          <div className="lsub" style={{ color: "var(--muted)" }}>New question every day · Tap to try!</div>
        </button>
        <button onClick={onSelectQuiz} className="gat-module-btn" style={{ borderLeftColor: "var(--gold)" }}>
          <div className="lid" style={{ color: "var(--navy)" }}>
            <Compass className="h-3 w-3" style={{ color: "var(--gold)" }} /> Quiz Center
          </div>
          <div className="lsub">Chapter quiz · 12 min · 10 Q</div>
        </button>
        <button onClick={onSelectFlashcards} className="gat-module-btn" style={{ borderLeftColor: "var(--teal)" }}>
          <div className="lid" style={{ color: "var(--navy)" }}>
            <Layers className="h-3 w-3" style={{ color: "var(--teal)" }} /> Flashcards
          </div>
          <div className="lsub">Active recall study mode</div>
        </button>
      </div>

      {/* Progress summary */}
      <div id="gat-progress-summary" style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 8 }}>
        <div className="ps-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "var(--muted)", textTransform: "uppercase", padding: "0 6px", marginBottom: 6 }}>
          Progress Summary
        </div>
        <div className="gat-ps-row" style={{ display: "flex", justifyContent: "space-between", padding: "2px 6px", fontSize: 11, color: "var(--muted)" }}>
          <span>Lessons completed</span>
          <span style={{ fontWeight: 600, color: "var(--navy)" }}>{completedLessons} / {chapter.modules.length}</span>
        </div>
        <div className="gat-ps-row" style={{ display: "flex", justifyContent: "space-between", padding: "2px 6px", fontSize: 11, color: "var(--muted)" }}>
          <span>Best quiz score</span>
          <span style={{ fontWeight: 600, color: "var(--navy)" }}>
            {state.bestScores[chapter.id] !== undefined ? `${state.bestScores[chapter.id]}%` : "—"}
          </span>
        </div>
        <div className="gat-ps-row" style={{ display: "flex", justifyContent: "space-between", padding: "2px 6px", fontSize: 11, color: "var(--muted)" }}>
          <span>Current streak</span>
          <span style={{ fontWeight: 600, color: "var(--navy)" }}>{state.bestStreak} 🔥</span>
        </div>
      </div>
    </aside>
  );
}

/* ----------------------------------------------------------------- */
/* Dashboard View                                                    */
/* ----------------------------------------------------------------- */

interface DashboardViewProps {
  chapter: ChapterConfig;
  qotd: Question;
  onStartLesson: () => void;
  onOpenQuiz: () => void;
  onOpenFlashcards: () => void;
  state: PersistedState;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
}

function DashboardView({
  chapter,
  qotd,
  onStartLesson,
  onOpenQuiz,
  onOpenFlashcards,
  state,
  totalQuestions,
  answeredCount,
  correctCount,
}: DashboardViewProps) {
  const totalLessonsInChapter = chapter.modules.length;
  const totalQuestionsInChapter = chapter.modules.reduce((s, m) => s + m.qs.length, 0);
  const totalQuestionsInChapterDisplay = chapter.modules.reduce((s, m) => s + m.qcount, 0);
  const hasImages = chapter.modules.some((m) => m.qs.some((q) => q.img));
  const qotdImg = getImage(qotd.img);
  const bestQuizScore = state.bestScores[chapter.id];

  const features = [
    { icon: BookOpen, label: `${totalLessonsInChapter} Lessons` },
    { icon: HelpCircle, label: `${totalQuestionsInChapterDisplay} Questions` },
    { icon: CheckSquare, label: "MCQ Format" },
    { icon: FileQuestion, label: "Answer Keys" },
    { icon: Timer, label: "Per-Lesson Timer" },
    { icon: Hourglass, label: "Per-Q Stopwatch" },
    { icon: Lightbulb, label: "Strategy Boxes" },
    { icon: ImageIcon, label: hasImages ? "Figures" : "No Figures" },
  ];

  const stats = [
    { sn: totalLessonsInChapter, sl: "Lessons" },
    { sn: totalQuestionsInChapterDisplay, sl: "Questions" },
    { sn: answeredCount, sl: "Answered" },
    { sn: `${correctCount}`, sl: "Correct" },
    { sn: bestQuizScore !== undefined ? `${bestQuizScore}%` : "—", sl: "Quiz Best" },
    { sn: state.bestStreak, sl: "Streak" },
  ];

  return (
    <div>
      {/* Cover hero */}
      <div className="gat-cover">
        <div className="gat-cover-top">
          <div className="gat-cover-badge">SAT 2026 · CHAPTER {chapter.id.replace("ch", "")} · {chapter.title.toUpperCase()}</div>
          <h1 className="gat-cover-title flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 shrink-0" style={{ color: "#f0c060", WebkitTextFillColor: "#f0c060", flexShrink: 0 }} />
            SAT 2026 · Chapter: {chapter.title}
          </h1>
          <p className="gat-cover-sub">{platformConfig.instructor} · {platformConfig.tagline}</p>
          <div className="gat-cover-chips">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="gat-cover-chip">
                  <Icon className="h-3 w-3" />
                  {f.label}
                </div>
              );
            })}
          </div>
          <button onClick={onStartLesson} className="gat-start-btn">
            <Play className="h-4 w-4" />
            Start Lesson {chapter.defaultModule}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Stats grid */}
        <div className="gat-cover-bottom">
          {stats.map((s, i) => (
            <div key={i} className="gat-cover-stat">
              <div className="sn">{s.sn}</div>
              <div className="sl">{s.sl}</div>
            </div>
          ))}
        </div>

        {/* Cover footer */}
        <div className="gat-cover-footer">
          <span>SAT 2026 · Interactive Workbook</span>
          <button
            onClick={onOpenQuiz}
            className="gat-btn gat-btn-ghost"
            style={{ borderColor: "var(--gold)", color: "var(--gold)", background: "transparent", border: "2px solid var(--gold)" }}
          >
            <Compass className="h-3 w-3" />
            Open Quiz Center
          </button>
        </div>
      </div>

      {/* Question of the Day */}
      <div className="gat-qotd">
        <div className="gat-qotd-header">
          <div className="gat-qotd-title">
            <Star className="h-3 w-3" style={{ color: "var(--gold)" }} />
            Question of the Day
          </div>
          <span className="gat-new-badge">NEW</span>
        </div>
        <div className="gat-qotd-body">
          <div className="gat-qtop">
            <div className="gat-qnum">Q{qotd.n}</div>
            <div className="flex-1">
              <div className="gat-qmeta">
                <span className={`gat-qmeta-tag ${qotd.difficulty}`}>{qotd.difficulty}</span>
                <span className="gat-qmeta-tag domain">{qotd.domain}</span>
              </div>
              <div className="gat-qtext">
                <MathText block>{qotd.text}</MathText>
              </div>
            </div>
          </div>
          {qotdImg && (
            <div className="gat-q-img-wrap">
              <img src={qotdImg} alt="Question of the day figure" className="gat-q-img" />
            </div>
          )}
          <div className="gat-opts">
            {qotd.o.map((opt, i) => {
              const letter = ["A", "B", "C", "D"][i];
              const isCorrect = letter === qotd.a;
              return (
                <div key={letter} className={`gat-opt ${isCorrect ? "correct" : ""}`} style={{ cursor: "default" }}>
                  <span className="gat-opt-bubble">{letter}</span>
                  <span className="flex-1">
                    <MathText block>{opt}</MathText>
                  </span>
                  {isCorrect && (
                    <span className="gat-confidence-dot option-correct">
                      <CheckSquare className="h-3 w-3" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="gat-answer-reveal">
            <div className="gat-solution-box">
              <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                Solution
              </div>
              <MathText block>{qotd.solution}</MathText>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-4">
        <AchievementsPanel
          answeredCount={answeredCount}
          correctCount={correctCount}
          quizzesCompleted={state.quizzesCompleted}
          bestStreak={state.bestStreak}
          flashcardsReviewed={state.flashcardsReviewed}
          totalQuestions={totalQuestions}
        />
      </div>

      {/* Flashcards teaser */}
      <div
        className="gat-strategy-box mt-4"
        style={{ display: "flex", alignItems: "center", gap: 16, padding: 16 }}
      >
        <div className="gat-strategy-shimmer" />
        <Layers className="h-8 w-8 shrink-0" style={{ color: "var(--gold)", position: "relative" }} />
        <div style={{ flex: 1, position: "relative" }}>
          <div className="gat-strategy-title">Active Recall Mode</div>
          <div className="gat-strategy-body">
            Flip through chapter questions as study cards. Active recall is one of the most effective ways to retain math concepts long-term.
          </div>
        </div>
        <button onClick={onOpenFlashcards} className="gat-mnav-btn next" style={{ flex: "0 0 auto", padding: "8px 16px" }}>
          <Layers className="h-4 w-4 mr-1" />
          Open Flashcards
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Lesson View                                                       */
/* ----------------------------------------------------------------- */

interface LessonViewProps {
  chapter: ChapterConfig;
  module: Module;
  showAnswers: boolean;
  state: PersistedState;
  onSelectAnswer: (q: Question, choice: "A" | "B" | "C" | "D") => void;
  onOpenQuiz: () => void;
  onNavigate: (id: string) => void;
}

function LessonView({
  chapter,
  module,
  showAnswers,
  state,
  onSelectAnswer,
  onOpenQuiz,
  onNavigate,
}: LessonViewProps) {
  const questions = module.qs;
  const answered = questions.filter((q) => state.answers[`${module.id}-${q.n}`]).length;
  const correct = questions.filter((q) => state.answers[`${module.id}-${q.n}`] === q.a).length;
  const progress = questions.length > 0 ? (answered / questions.length) * 100 : 0;
  const moduleStopwatch = state.stopwatches[module.id] || 0;

  // Find adjacent modules within chapter
  const moduleIdx = chapter.modules.findIndex((m) => m.id === module.id);
  const prevModule = moduleIdx > 0 ? chapter.modules[moduleIdx - 1] : null;
  const nextModule = moduleIdx < chapter.modules.length - 1 ? chapter.modules[moduleIdx + 1] : null;

  return (
    <div>
      {/* Module header */}
      <div className="gat-module-header">
        <div className="gat-mh-badge">Lesson {module.num}</div>
        <h2 className="gat-mh-title">{module.title}</h2>
        <div className="gat-mh-meta">
          <span><HelpCircle className="h-3 w-3" /> {answered} / {questions.length} answered</span>
          <span><CheckSquare className="h-3 w-3" /> {correct} correct</span>
          <span><Hourglass className="h-3 w-3" /> {fmtTimer(moduleStopwatch)}</span>
        </div>
        <div className="gat-mh-prog-bar">
          <div className="gat-mh-prog-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Strategy box */}
      <div className="gat-strategy-box">
        <div className="gat-strategy-shimmer" />
        <div className="gat-strategy-title">{module.strategyTitle}</div>
        <div className="gat-strategy-name">{module.title}</div>
        <div className="gat-strategy-body">{module.strategyBody}</div>
      </div>

      {/* Questions list or empty state */}
      {questions.length === 0 ? (
        <div className="gat-quiz-card text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-3" style={{ color: "var(--muted)" }} />
          <div className="text-base font-semibold mb-1">Questions coming soon</div>
          <div className="text-sm max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            This lesson is scaffolded and waiting for content. The instructor is preparing
            questions for <b>{module.title}</b>. In the meantime, explore other lessons or take a quiz.
          </div>
          <Button onClick={onOpenQuiz} variant="outline" className="mt-4 gat-mnav-btn next">
            <Compass className="h-4 w-4 mr-2" />
            Take Chapter Quiz
          </Button>
        </div>
      ) : (
        <div>
          {questions.map((q) => {
            const key = `${module.id}-${q.n}`;
            return (
              <QuestionCard
                key={key}
                question={q}
                selected={state.answers[key] || null}
                answered={!!state.answers[key]}
                showAnswers={showAnswers}
                stopwatch={moduleStopwatch}
                onSelect={(choice) => onSelectAnswer(q, choice)}
                chapterColor={chapter.color}
              />
            );
          })}

          {/* Answer Keys Block */}
          {showAnswers && (
            <div className="gat-ak-block">
              <div className="gat-ak-title">Answer Keys — Lesson {module.num}</div>
              <div className="gat-ak-grid">
                {questions.map((q) => (
                  <div key={q.n} className="gat-ak-item">
                    <span className="aqn">Q{q.n}</span>
                    {" → "}
                    <span className="aqa">{q.a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module navigation */}
          <div className="gat-mnav">
            <button
              className="gat-mnav-btn"
              onClick={() => prevModule && onNavigate(prevModule.id)}
              disabled={!prevModule}
              style={{ opacity: prevModule ? 1 : 0.4, cursor: prevModule ? "pointer" : "not-allowed" }}
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              {prevModule ? `Previous: ${prevModule.title}` : "No previous lesson"}
            </button>
            <button
              className="gat-mnav-btn next"
              onClick={onOpenQuiz}
            >
              <Compass className="h-4 w-4 mr-1" />
              Take Chapter Quiz
            </button>
            <button
              className="gat-mnav-btn next"
              onClick={() => nextModule && onNavigate(nextModule.id)}
              disabled={!nextModule}
              style={{ opacity: nextModule ? 1 : 0.4, cursor: nextModule ? "pointer" : "not-allowed" }}
            >
              {nextModule ? `Next: ${nextModule.title}` : "End of chapter"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Question of the Day View                                           */
/* ----------------------------------------------------------------- */

interface QOTDViewProps {
  qotd: Question;
  onClose: () => void;
}

function QOTDView({ qotd, onClose }: QOTDViewProps) {
  const [selected, setSelected] = React.useState<"A" | "B" | "C" | "D" | null>(null);
  const [showSolution, setShowSolution] = React.useState(false);
  const img = getImage(qotd.img);

  function handleSelect(letter: "A" | "B" | "C" | "D") {
    setSelected(letter);
    setShowSolution(true);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="gat-cover">
        <div className="gat-cover-top" style={{ padding: "32px 40px" }}>
          <div className="gat-cover-badge" style={{ background: "var(--gold)" }}>
            ⭐ QUESTION OF THE DAY
          </div>
          <h1 className="gat-cover-title" style={{ fontSize: 28 }}>
            Today's Featured Question
          </h1>
          <p className="gat-cover-sub">
            A new question every day — come back tomorrow for another!
          </p>
        </div>
      </div>

      {/* Question card */}
      <div className="gat-qcard" style={{ marginLeft: 0 }}>
        <div className="gat-qtop">
          <div className="gat-qnum">Q{qotd.n}</div>
          <div className="flex-1">
            <div className="gat-qmeta">
              <span className={`gat-qmeta-tag ${qotd.difficulty}`}>{qotd.difficulty}</span>
              <span className="gat-qmeta-tag domain">{qotd.domain}</span>
            </div>
            <div className="gat-qtext">
              <MathText block>{qotd.text}</MathText>
            </div>
          </div>
        </div>

        {img && (
          <div className="gat-q-img-wrap">
            <img src={img} alt="Figure" className="gat-q-img" />
          </div>
        )}

        <div className="gat-opts">
          {qotd.o.map((opt, i) => {
            const letter = ["A", "B", "C", "D"][i] as "A" | "B" | "C" | "D";
            const isSelected = selected === letter;
            const isCorrectOpt = showSolution && letter === qotd.a;
            const showAsWrong = showSolution && isSelected && letter !== qotd.a;
            let cls = "gat-opt";
            if (isCorrectOpt) cls += " correct";
            else if (showAsWrong) cls += " wrong";
            else if (isSelected) cls += " selected";
            return (
              <button
                key={letter}
                onClick={() => !selected && handleSelect(letter)}
                disabled={!!selected}
                className={cls}
              >
                <span className="gat-opt-bubble">{letter}</span>
                <span className="flex-1">
                  <MathText block>{opt}</MathText>
                </span>
                {isCorrectOpt && (
                  <span className="gat-confidence-dot option-correct">
                    <CheckSquare className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showSolution && (
          <div className="gat-answer-reveal">
            <div className="gat-solution-box">
              <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                Step-by-step Solution
              </div>
              <MathText block>{qotd.solution}</MathText>
              <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                <span className="font-semibold">Your answer:</span> {selected || "—"}
                <span className="mx-2">|</span>
                <span className="font-semibold">Correct:</span>{" "}
                <span style={{ color: "var(--green)", fontWeight: 700 }}>{qotd.a}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="gat-mnav">
        <button className="gat-mnav-btn" onClick={onClose}>
          <HomeIcon className="h-4 w-4 mr-1" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}
