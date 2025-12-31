export type Announcement = {
  id: string;
  authorName: string;
  handle: string;
  url: string;
  date: string; // ISO
  preview: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    authorName: "UnicornSheepDog",
    handle: "@unicornsheepdog",
    url: "https://x.com/unicornsheepdog/status/0000000000000000000",
    date: "2025-12-10",
    preview:
      "We’re building tiny money lessons you can finish in 3 minutes.\nNo jargon. No yelling.\nJust: what money is and how it works."
  },
  {
    id: "a2",
    authorName: "UnicornSheepDog",
    handle: "@unicornsheepdog",
    url: "https://x.com/unicornsheepdog/status/0000000000000000001",
    date: "2025-12-16",
    preview:
      "A small note on stablecoins vs memes:\nDifferent jobs. Different risks.\nWe’ll keep the comparisons calm and educational."
  },
  {
    id: "a3",
    authorName: "UnicornSheepDog",
    handle: "@unicornsheepdog",
    url: "https://x.com/unicornsheepdog/status/0000000000000000002",
    date: "2025-12-22",
    preview:
      "Yes, we see the wider ecosystem (you know the ones).\nNods stay subtle. Education stays first."
  }
];


