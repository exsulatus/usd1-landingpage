import { notFound } from "next/navigation";
import { loadLesson } from "@/lib/lessons/loadLesson";
import { LessonId } from "@/lib/lessons/types";
import { LessonShell } from "@/components/LessonShell";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const lessonId = params.lessonId as LessonId;

  try {
    const lesson = await loadLesson(lessonId);
    return <LessonShell lesson={lesson} />;
  } catch {
    notFound();
  }
}




