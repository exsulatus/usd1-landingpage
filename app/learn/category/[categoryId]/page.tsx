import { notFound } from "next/navigation";
import { loadLesson } from "@/lib/lessons/loadLesson";
import { getCategoryMeta } from "@/lib/lessons/registry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import type { LessonId } from "@/lib/lessons/types";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = params.categoryId as LessonId;
  const category = getCategoryMeta(categoryId);

  if (!category) {
    notFound();
  }

  let lesson;
  try {
    lesson = await loadLesson(categoryId);
  } catch {
    notFound();
  }

  return <CategoryPageClient category={category} pages={lesson.pages} />;
}
