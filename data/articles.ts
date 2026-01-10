export type Article = {
  id: string;
  title: string;
  url: string;
  date: string; // ISO
  authorName: string;
};

export const ARTICLES: Article[] = [
  {
    id: "ar1",
    title: "Money in 5 minutes: the 3 jobs it does",
    url: "https://x.com/i/articles/0000000000000000000",
    date: "2025-11-30",
    authorName: "UnicornSheepDog"
  },
  {
    id: "ar2",
    title: "Inflation: the calm explanation",
    url: "https://x.com/i/articles/0000000000000000001",
    date: "2025-12-08",
    authorName: "UnicornSheepDog"
  },
  {
    id: "ar3",
    title: "Risk vs vibe: a small checklist",
    url: "https://x.com/i/articles/0000000000000000002",
    date: "2025-12-20",
    authorName: "UnicornSheepDog"
  }
];




