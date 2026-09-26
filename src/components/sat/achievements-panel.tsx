"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Award, Flame, BookOpen, CheckCircle2, Zap, Home as HomeIcon } from "lucide-react";

interface AchievementsPanelProps {
  answeredCount: number;
  correctCount: number;
  quizzesCompleted: number;
  bestStreak: number;
  flashcardsReviewed: number;
  totalQuestions: number;
}

export function AchievementsPanel({
  answeredCount,
  correctCount,
  quizzesCompleted,
  bestStreak,
  flashcardsReviewed,
  totalQuestions,
}: AchievementsPanelProps) {
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const completion = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const achievements = [
    { id: "first-lesson", icon: BookOpen, title: "First Steps", desc: "Open your first lesson", color: "var(--teal)", unlocked: answeredCount >= 1, progress: answeredCount > 0 ? 100 : 0 },
    { id: "ten-questions", icon: Target, title: "Sharpshooter", desc: "Answer 10 questions", color: "var(--gold)", unlocked: answeredCount >= 10, progress: Math.min(100, (answeredCount / 10) * 100) },
    { id: "fifty-questions", icon: Star, title: "Half-Century", desc: "Answer 50 questions", color: "var(--green)", unlocked: answeredCount >= 50, progress: Math.min(100, (answeredCount / 50) * 100) },
    { id: "perfect-quiz", icon: Trophy, title: "Perfect Score", desc: "Score 100% on a quiz", color: "var(--gold)", unlocked: false, progress: 0 },
    { id: "streak-5", icon: Flame, title: "On Fire", desc: "Get 5 in a row correct", color: "var(--red)", unlocked: bestStreak >= 5, progress: Math.min(100, (bestStreak / 5) * 100) },
    { id: "quiz-master", icon: Award, title: "Quiz Master", desc: "Complete 5 quizzes", color: "var(--navy)", unlocked: quizzesCompleted >= 5, progress: Math.min(100, (quizzesCompleted / 5) * 100) },
    { id: "flashcards", icon: Zap, title: "Flashcard Fan", desc: "Review 20 flashcards", color: "var(--teal)", unlocked: flashcardsReviewed >= 20, progress: Math.min(100, (flashcardsReviewed / 20) * 100) },
    { id: "all-questions", icon: CheckCircle2, title: "Completionist", desc: "Answer every question", color: "var(--gold)", unlocked: answeredCount >= totalQuestions && totalQuestions > 0, progress: completion },
  ];

  // Overall stats
  const stats = [
    { label: "Answered", value: answeredCount, color: "var(--navy)" },
    { label: "Correct", value: correctCount, color: "var(--green)" },
    { label: "Accuracy", value: `${accuracy}%`, color: "var(--gold)" },
    { label: "Completion", value: `${completion}%`, color: "var(--teal)" },
  ];

  return (
    <div className="gat-cover" style={{ background: "linear-gradient(150deg, var(--navy) 0%, #0d4a6e 55%, var(--teal) 100%)" }}>
      <div className="gat-cover-top" style={{ paddingBottom: 20 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="gat-cover-badge">Achievements</div>
            <h2 className="text-2xl font-bold text-white">Your Progress Dashboard</h2>
          </div>
          <div className="gat-cover-chip">
            <Trophy className="h-3 w-3" />
            {achievements.filter((a) => a.unlocked).length} / {achievements.length}
          </div>
        </div>

        {/* Quick stats */}
        <div className="gat-cover-bottom" style={{ background: "rgba(255,255,255,0.08)" }}>
          {stats.map((s) => (
            <div key={s.label} className="gat-cover-stat">
              <div className="sn">{s.value}</div>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="gat-cover-footer" style={{ padding: "20px 24px" }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.id}
                className="rounded-lg p-3 transition-all"
                style={{
                  background: a.unlocked ? "rgba(184, 134, 42, 0.18)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${a.unlocked ? "rgba(184, 134, 42, 0.4)" : "rgba(255,255,255,0.1)"}`,
                  opacity: a.unlocked ? 1 : 0.7,
                }}
              >
                <div className="flex flex-col items-center text-center text-white gap-1">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: a.unlocked ? a.color : "rgba(255,255,255,0.1)",
                      color: a.unlocked ? "#fff" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-bold">{a.title}</div>
                  <div className="text-[10px] opacity-70 leading-tight">{a.desc}</div>
                  {!a.unlocked && a.progress > 0 && (
                    <div className="w-full mt-1">
                      <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                        <div
                          className="h-1 rounded-full"
                          style={{ width: `${a.progress}%`, background: a.color }}
                        />
                      </div>
                      <div className="text-[9px] opacity-60 mt-0.5">{Math.round(a.progress)}%</div>
                    </div>
                  )}
                  {a.unlocked && (
                    <Badge className="bg-white/20 text-white text-[9px] mt-0.5">Unlocked</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
