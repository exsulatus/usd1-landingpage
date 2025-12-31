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


