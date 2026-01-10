import { LESSONS, FEATURED_LESSONS } from "@/lib/lessons/registry";
import { getAllConcepts, type Concept } from "./concepts";

export type SearchResultType = "lesson" | "concept" | "page";

export type SearchResult = {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  score: number;
};

function normalizeQuery(q: string): string {
  return q.toLowerCase().trim();
}

function scoreMatch(text: string, query: string): number {
  const normalized = text.toLowerCase();
  if (normalized === query) return 100;
  if (normalized.startsWith(query)) return 80;
  if (normalized.includes(query)) return 60;
  // Check for word match
  const words = normalized.split(/\s+/);
  if (words.some((w) => w.startsWith(query))) return 40;
  return 0;
}

export async function searchSite(query: string, limit = 10): Promise<SearchResult[]> {
  const q = normalizeQuery(query);
  if (!q || q.length < 2) return [];

  const results: SearchResult[] = [];

  // Search lessons
  for (const lesson of LESSONS) {
    const titleScore = scoreMatch(lesson.title, q);
    const summaryScore = scoreMatch(lesson.summary, q) * 0.7;
    const score = Math.max(titleScore, summaryScore);

    if (score > 0) {
      results.push({
        type: "lesson",
        title: lesson.title,
        description: lesson.summary,
        href: `/learn/${lesson.id}`,
        score,
      });
    }
  }

  // Search featured lessons (pages within lessons)
  for (const featured of FEATURED_LESSONS) {
    const titleScore = scoreMatch(featured.title, q);
    const descScore = scoreMatch(featured.description, q) * 0.7;
    const score = Math.max(titleScore, descScore);

    if (score > 0) {
      // Avoid duplicates if the lesson itself already matched
      const existingLesson = results.find(
        (r) => r.type === "lesson" && r.href === `/learn/${featured.lessonId}`
      );
      if (!existingLesson || score > existingLesson.score) {
        results.push({
          type: "page",
          title: featured.title,
          description: featured.description,
          href: `/learn/${featured.lessonId}?p=${featured.pageIndex}`,
          score: score * 0.95, // Slightly lower priority than main lessons
        });
      }
    }
  }

  // Search concepts
  const concepts = getAllConcepts();
  for (const concept of concepts) {
    const titleScore = scoreMatch(concept.title, q);
    const descScore = scoreMatch(concept.description, q) * 0.7;
    const slugScore = scoreMatch(concept.slug, q) * 0.5;
    const score = Math.max(titleScore, descScore, slugScore);

    if (score > 0) {
      results.push({
        type: "concept",
        title: concept.title,
        description: concept.description,
        href: `/concepts/${concept.slug}`,
        score: score * 0.9, // Concepts slightly lower priority
      });
    }
  }

  // Sort by score descending, then limit
  results.sort((a, b) => b.score - a.score);

  // Deduplicate by href
  const seen = new Set<string>();
  const deduped: SearchResult[] = [];
  for (const r of results) {
    if (!seen.has(r.href)) {
      seen.add(r.href);
      deduped.push(r);
    }
  }

  return deduped.slice(0, limit);
}

export { getAllConcepts, getConceptBySlug } from "./concepts";
export type { Concept };
