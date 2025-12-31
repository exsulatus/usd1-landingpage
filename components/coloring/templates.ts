export type ColoringRegion = {
  id: string;
  d: string;
  stroke?: string;
};

export type ColoringTemplate = {
  id: string;
  title: string;
  viewBox: string;
  regions: ColoringRegion[];
};

// Simple, “meme-template-ish” outlines. Replace with real art later; the fill-mode wiring stays.
export const COLORING_TEMPLATES: ColoringTemplate[] = [
  {
    id: "t1",
    title: "USD1 Hero Pose",
    viewBox: "0 0 400 300",
    regions: [
      { id: "sky", d: "M0 0H400V300H0Z" },
      { id: "body", d: "M120 220c0-70 40-120 80-120s80 50 80 120-40 60-80 60-80 10-80-60Z" },
      { id: "horn", d: "M205 60c12 14 20 34 18 52-10-14-22-26-38-34 6-8 12-14 20-18Z" },
      { id: "bubble", d: "M225 90h135a20 20 0 0 1 20 20v70a20 20 0 0 1-20 20H300l-40 28 8-28h-43a20 20 0 0 1-20-20v-70a20 20 0 0 1 20-20Z" }
    ]
  },
  {
    id: "t2",
    title: "Teacher Time",
    viewBox: "0 0 400 300",
    regions: [
      { id: "board", d: "M30 40H370V170H30Z" },
      { id: "chalk", d: "M70 90h160v16H70Z" },
      { id: "teacher", d: "M160 250c0-52 28-80 60-80s60 28 60 80" },
      { id: "horn", d: "M214 116c10 12 18 30 16 46-8-12-18-22-32-30 5-7 10-12 16-16Z" }
    ]
  },
  {
    id: "t3",
    title: "Stars & Snacks",
    viewBox: "0 0 400 300",
    regions: [
      { id: "bg", d: "M0 0H400V300H0Z" },
      { id: "star1", d: "M80 70l10 26 28 2-22 16 8 27-24-14-24 14 8-27-22-16 28-2 10-26Z" },
      { id: "star2", d: "M320 60l8 20 22 2-18 13 7 22-19-11-19 11 7-22-18-13 22-2 8-20Z" },
      { id: "mascot", d: "M130 240c0-58 34-100 70-100s70 42 70 100-34 50-70 50-70 8-70-50Z" }
    ]
  },
  {
    id: "t4",
    title: "Rainbow Hat",
    viewBox: "0 0 400 300",
    regions: [
      { id: "bg", d: "M0 0H400V300H0Z" },
      { id: "hat", d: "M90 120c30-60 190-60 220 0-70 28-150 28-220 0Z" },
      { id: "mascot", d: "M140 250c0-62 30-110 60-110s60 48 60 110-30 44-60 44-60 10-60-44Z" }
    ]
  },
  {
    id: "t5",
    title: "Mini Flag Vibes",
    viewBox: "0 0 400 300",
    regions: [
      { id: "flag", d: "M40 50h320v200H40Z" },
      { id: "stripe1", d: "M40 70h320v20H40Z" },
      { id: "stripe2", d: "M40 110h320v20H40Z" },
      { id: "stripe3", d: "M40 150h320v20H40Z" },
      { id: "stripe4", d: "M40 190h320v20H40Z" }
    ]
  },
  {
    id: "t6",
    title: "Coin Flip",
    viewBox: "0 0 400 300",
    regions: [
      { id: "bg", d: "M0 0H400V300H0Z" },
      { id: "coin", d: "M200 150m-90 0a90 90 0 1 0 180 0a90 90 0 1 0-180 0" },
      { id: "face", d: "M200 150m-55 0a55 55 0 1 0 110 0a55 55 0 1 0-110 0" }
    ]
  },
  {
    id: "t7",
    title: "Wizard Wand",
    viewBox: "0 0 400 300",
    regions: [
      { id: "bg", d: "M0 0H400V300H0Z" },
      { id: "wand", d: "M60 240l240-160 20 20-240 160-20-20Z" },
      { id: "spark", d: "M340 54l8 12 12 8-12 8-8 12-8-12-12-8 12-8 8-12Z" }
    ]
  },
  {
    id: "t8",
    title: "Meme Frame",
    viewBox: "0 0 400 300",
    regions: [
      { id: "frameOuter", d: "M30 30H370V270H30Z" },
      { id: "frameInner", d: "M60 60H340V240H60Z" },
      { id: "captionBar", d: "M60 240H340V270H60Z" }
    ]
  },
  {
    id: "t9",
    title: "Trenches Helmet",
    viewBox: "0 0 400 300",
    regions: [
      { id: "bg", d: "M0 0H400V300H0Z" },
      { id: "helmet", d: "M90 170c18-80 202-80 220 0-40 26-180 26-220 0Z" },
      { id: "visor", d: "M140 170h120v22H140Z" }
    ]
  },
  {
    id: "t10",
    title: "Magic Badge",
    viewBox: "0 0 400 300",
    regions: [
      { id: "bg", d: "M0 0H400V300H0Z" },
      { id: "badge", d: "M200 60l54 24 54 54-24 54-54 54-54-24-54-54 24-54 54-54Z" },
      { id: "center", d: "M200 150m-50 0a50 50 0 1 0 100 0a50 50 0 1 0-100 0" }
    ]
  }
];


