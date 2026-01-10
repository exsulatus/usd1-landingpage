import fs from "node:fs/promises";
import path from "node:path";
import { Lesson, LessonId, LessonPage } from "@/lib/lessons/types";
import { getLessonMeta } from "@/lib/lessons/registry";

const PAGE_MARKER = "---PAGE---";

export type LoadLessonOptions = {
  marker?: string;
};

function splitIntoPages(raw: string, marker: string): LessonPage[] {
  const chunks = raw
    .split(marker)
    .map((c) => c.trim())
    .filter(Boolean);

  return chunks.map((chunk, index) => {
    const lines = chunk.split("\n");
    const first = lines[0]?.trim() ?? "";
    let title: string | undefined;
    let bodyLines = lines;
    if (first.startsWith("# ")) {
      title = first.replace(/^#\s+/, "").trim();
      bodyLines = lines.slice(1);
    }
    const body = bodyLines.join("\n").trim();
    return { index, title, body };
  });
}

export async function loadLesson(lessonId: LessonId, opts: LoadLessonOptions = {}): Promise<Lesson> {
  const meta = getLessonMeta(lessonId);
  if (!meta) throw new Error(`Unknown lessonId: ${lessonId}`);

  const filePath = path.join(process.cwd(), "content", "lessons", `${lessonId}.txt`);
  const raw = await fs.readFile(filePath, "utf8");
  const pages = splitIntoPages(raw, opts.marker ?? PAGE_MARKER);

  return { ...meta, pages };
}




