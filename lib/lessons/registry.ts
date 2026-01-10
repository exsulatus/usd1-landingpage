import { LessonMeta, FeaturedLesson, CategoryMeta } from "@/lib/lessons/types";

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

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "money-simply",
    title: "Money, Simply",
    description: "Start with the basics — what money is and how it works.",
    accent: "mint"
  },
  {
    id: "how-the-game-works",
    title: "How the Game Works",
    description: "Understand the rules that shape prices and incentives.",
    accent: "lavender"
  },
  {
    id: "the-trenches",
    title: "The Trenches",
    description: "Navigate hype, risk, and pressure with a clear head.",
    accent: "coral"
  }
];

export const FEATURED_LESSONS: FeaturedLesson[] = [
  {
    lessonId: "money-simply",
    pageIndex: 0,
    title: "Money is a tool",
    description: "The simplest starting point — what money actually is.",
    tag: "Good first read"
  },
  {
    lessonId: "money-simply",
    pageIndex: 2,
    title: "Prices are messages",
    description: "Why prices go up and down, and what they're trying to tell you.",
    tag: "Popular"
  },
  {
    lessonId: "how-the-game-works",
    pageIndex: 0,
    title: "The rules behind money",
    description: "Inflation, interest, and the forces that shape everyday economics.",
    tag: "Foundational"
  },
  {
    lessonId: "money-simply",
    pageIndex: 4,
    title: "Simple money safety rules",
    description: "A few clear rules that help many adults stay grounded.",
    tag: "Short"
  },
  {
    lessonId: "the-trenches",
    pageIndex: 0,
    title: "When things get noisy",
    description: "How to think clearly when everyone else seems certain.",
  }
];

export function getLessonMeta(id: string) {
  return LESSONS.find((l) => l.id === id) ?? null;
}

export function getCategoryMeta(id: string) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}




