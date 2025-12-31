import { LessonMeta } from "@/lib/lessons/types";

export const LESSONS: LessonMeta[] = [
  {
    id: "money-simply",
    title: "Money, Simply",
    summary: "What money is, why it exists, and how to use it as a tool."
  },
  {
    id: "how-the-game-works",
    title: "How the Game Works",
    summary: "Inflation, incentives, and the rules behind everyday money."
  },
  {
    id: "the-trenches",
    title: "The Trenches",
    summary: "Risk, hype, and calm decision-making when things get noisy."
  }
];

export function getLessonMeta(id: string) {
  return LESSONS.find((l) => l.id === id) ?? null;
}


