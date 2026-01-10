// localStorage helpers for tracking recent and saved lessons
// These only run client-side; gracefully return empty arrays on the server.

export type RecentLesson = {
  lessonId: string;
  pageIndex: number;
  title: string;
  timestamp: number;
};

export type SavedLesson = {
  lessonId: string;
  pageIndex: number;
  title: string;
  description?: string;
  savedAt: number;
};

const RECENT_KEY = "usd1-recent-lessons";
const SAVED_KEY = "usd1-saved-lessons";
const MAX_RECENT = 20;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// ─────────────────────────────────────────────────────────────────────────────
// Recent lessons
// ─────────────────────────────────────────────────────────────────────────────

export function getRecentLessons(): RecentLesson[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as RecentLesson[]) : [];
  } catch {
    return [];
  }
}

export function addRecentLesson(entry: Omit<RecentLesson, "timestamp">): void {
  if (!isBrowser()) return;
  try {
    const list = getRecentLessons();
    // Remove existing entry for the same lesson+page
    const filtered = list.filter(
      (l) => !(l.lessonId === entry.lessonId && l.pageIndex === entry.pageIndex)
    );
    // Add new entry at the front
    const next: RecentLesson[] = [
      { ...entry, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota or parse errors
  }
}

export function clearRecentLessons(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    // Ignore
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Saved lessons
// ─────────────────────────────────────────────────────────────────────────────

export function getSavedLessons(): SavedLesson[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as SavedLesson[]) : [];
  } catch {
    return [];
  }
}

export function isLessonSaved(lessonId: string, pageIndex: number): boolean {
  const list = getSavedLessons();
  return list.some((l) => l.lessonId === lessonId && l.pageIndex === pageIndex);
}

/** Toggle save state. Returns true if now saved, false if removed. */
export function toggleSavedLesson(entry: {
  lessonId: string;
  pageIndex: number;
  title: string;
  description?: string;
}): boolean {
  if (!isBrowser()) return false;
  try {
    const list = getSavedLessons();
    const idx = list.findIndex(
      (l) => l.lessonId === entry.lessonId && l.pageIndex === entry.pageIndex
    );
    if (idx >= 0) {
      // Remove
      list.splice(idx, 1);
      localStorage.setItem(SAVED_KEY, JSON.stringify(list));
      return false;
    } else {
      // Add
      const next: SavedLesson[] = [
        { ...entry, savedAt: Date.now() },
        ...list,
      ];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return true;
    }
  } catch {
    return false;
  }
}

export function removeSavedLesson(lessonId: string, pageIndex: number): void {
  if (!isBrowser()) return;
  try {
    const list = getSavedLessons().filter(
      (l) => !(l.lessonId === lessonId && l.pageIndex === pageIndex)
    );
    localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  } catch {
    // Ignore
  }
}

export function clearSavedLessons(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(SAVED_KEY);
  } catch {
    // Ignore
  }
}
