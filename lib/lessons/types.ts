export type LessonId = "money-simply" | "how-the-game-works" | "the-trenches";

export type LessonMeta = {
  id: LessonId;
  title: string;
  summary: string;
};

export type LessonPage = {
  index: number;
  title?: string;
  body: string;
};

export type Lesson = LessonMeta & {
  pages: LessonPage[];
};

export type FeaturedLesson = {
  lessonId: LessonId;
  pageIndex: number;
  title: string;
  description: string;
  tag?: "Good first read" | "Popular" | "Short" | "Foundational";
};

export type CategoryMeta = {
  id: LessonId;
  title: string;
  description: string;
  accent: "mint" | "lavender" | "coral";
};

// Re-export series types from data layer for convenience
export type { Series, SeriesLesson } from "@/data/series";




