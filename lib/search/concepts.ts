import { LessonId } from "@/lib/lessons/types";

export type Concept = {
  slug: string;
  title: string;
  description: string;
  primaryLessonId?: LessonId;
  relatedLessonIds?: LessonId[];
};

// A simple concept library - can grow over time
export const CONCEPTS: Concept[] = [
  {
    slug: "money",
    title: "What is Money?",
    description:
      "Money is a tool people use to trade value. It makes swapping goods and services easier because everyone agrees it can stand in for many things.",
    primaryLessonId: "money-simply",
    relatedLessonIds: ["how-the-game-works"],
  },
  {
    slug: "inflation",
    title: "Inflation",
    description:
      "Inflation is when prices rise over time, so your money buys less than it used to. Understanding why it happens helps you plan ahead.",
    primaryLessonId: "how-the-game-works",
    relatedLessonIds: ["money-simply"],
  },
  {
    slug: "prices",
    title: "How Prices Work",
    description:
      "Prices are messages. When something is scarce, prices often go up. When it's plentiful, prices go down. But hype and fear can bend prices in the short term.",
    primaryLessonId: "money-simply",
    relatedLessonIds: ["how-the-game-works"],
  },
  {
    slug: "saving",
    title: "Saving vs Spending",
    description:
      "Saving means keeping choices open for later. Spending means getting something now. Neither is always right — it's about balance.",
    primaryLessonId: "money-simply",
    relatedLessonIds: [],
  },
  {
    slug: "risk",
    title: "Understanding Risk",
    description:
      "Risk is the chance that things won't go as planned. Learning to ask 'What could go wrong?' helps you make calmer decisions.",
    primaryLessonId: "the-trenches",
    relatedLessonIds: ["money-simply"],
  },
  {
    slug: "hype",
    title: "Hype and FOMO",
    description:
      "When everyone seems certain about something, it's worth slowing down. Hype can make things look better (or worse) than they really are.",
    primaryLessonId: "the-trenches",
    relatedLessonIds: [],
  },
];

export function getConceptBySlug(slug: string): Concept | null {
  return CONCEPTS.find((c) => c.slug === slug) ?? null;
}

export function getAllConcepts(): Concept[] {
  return CONCEPTS;
}

export function searchConcepts(query: string, limit = 5): Concept[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return CONCEPTS.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
  ).slice(0, limit);
}
