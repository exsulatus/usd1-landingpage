/**
 * Series data for the Learn section.
 * Each series contains multiple lessons, displayed as stepping stones on a river.
 * Colors are distinct from the existing mint/lavender/peach palette.
 */

export type SeriesLesson = {
  slug: string;
  title: string;
  pages: {
    title: string;
    content: string;
  }[];
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  /** Hex color for series accent - distinct from site mint/lavender/peach */
  color: string;
  lessons: SeriesLesson[];
};

/**
 * Series accent colors - chosen to:
 * - Fit dark aesthetic
 * - Be cohesive with each other
 * - Be DIFFERENT from existing mint (#21B58F), lavender (#A78BFA), peach (#FF7A6B)
 */
export const SERIES_COLORS = {
  amber: "#F59E0B",      // Warm amber/gold
  cyan: "#06B6D4",       // Cool cyan/teal  
  rose: "#F43F5E",       // Vibrant rose/red
  violet: "#8B5CF6",     // Deep violet
  emerald: "#10B981",    // Rich emerald (darker than site mint)
} as const;

export const SERIES: Series[] = [
  {
    slug: "foundations",
    title: "Foundations",
    description: "Start here. Learn what money actually is and why it matters.",
    color: SERIES_COLORS.amber,
    lessons: [
      {
        slug: "what-is-money",
        title: "What Is Money?",
        pages: [
          {
            title: "Money is a tool",
            content: "Money is simply a tool that helps people trade. Before money, people had to barter — trading goods directly for other goods. Imagine trying to buy bread with a chicken. What if the baker doesn't want a chicken? Money solves this problem by being something everyone agrees has value."
          },
          {
            title: "The three jobs of money",
            content: "Money does three main jobs: (1) It's a medium of exchange — you can trade it for things. (2) It's a unit of account — you can measure and compare prices. (3) It's a store of value — you can save it for later. When money stops doing these jobs well, problems arise."
          },
          {
            title: "Trust makes it work",
            content: "Money only works because people trust it. A dollar bill is just paper. But if everyone agrees it's worth something, it becomes useful. This trust is the foundation of all money — whether it's coins, bills, or digital numbers in a bank account."
          }
        ]
      },
      {
        slug: "prices-and-value",
        title: "Prices and Value",
        pages: [
          {
            title: "Prices are messages",
            content: "Every price tells a story. When something costs more, it usually means it's harder to get or more people want it. When prices drop, supply might be high or demand might be low. Prices help coordinate millions of decisions without anyone being in charge."
          },
          {
            title: "Value is subjective",
            content: "Value isn't fixed — it depends on who's looking. A glass of water is worth more to someone in a desert than to someone by a lake. This is why trades happen: both sides think they're getting something more valuable than what they're giving up."
          },
          {
            title: "Price vs. cost vs. value",
            content: "Price is what you pay. Cost is what the seller spent to provide it. Value is what it's worth to you. Smart decisions come from understanding all three — and recognizing when they don't match up."
          }
        ]
      },
      {
        slug: "saving-basics",
        title: "Saving Basics",
        pages: [
          {
            title: "Why save at all?",
            content: "Saving is choosing your future self over your present self. It means giving up something now — a purchase, an experience — so that future-you has more options. Savings create a buffer between you and life's surprises."
          },
          {
            title: "The emergency fund",
            content: "Before anything else, build a small emergency fund. This is money set aside for true emergencies — not wants, but unexpected needs. Even a small cushion changes how you feel about money and risk."
          }
        ]
      }
    ]
  },
  {
    slug: "how-the-system-works",
    title: "How the System Works",
    description: "Understand the rules, players, and forces shaping money.",
    color: SERIES_COLORS.cyan,
    lessons: [
      {
        slug: "inflation-explained",
        title: "Inflation Explained",
        pages: [
          {
            title: "What is inflation?",
            content: "Inflation means prices generally rising over time. The same dollar buys less than it used to. A candy bar that cost 25 cents decades ago might cost $1.50 today. That's inflation at work — the purchasing power of money shrinks."
          },
          {
            title: "Why does inflation happen?",
            content: "Inflation can happen when there's more money chasing the same goods, when production costs rise, or when supply chains break down. It's not one thing — it's a mix of forces. Governments and central banks try to manage it, with varying success."
          },
          {
            title: "Living with inflation",
            content: "You can't avoid inflation, but you can prepare for it. Holding all your wealth in cash means slowly losing purchasing power. That's why people invest — to try to grow their money faster than inflation erodes it."
          }
        ]
      },
      {
        slug: "banks-and-lending",
        title: "Banks and Lending",
        pages: [
          {
            title: "What banks actually do",
            content: "Banks take deposits and make loans. When you deposit $100, the bank doesn't just store it in a vault. They lend most of it to someone else — a business, a homebuyer. Your deposit becomes someone else's loan. This is how banks create credit."
          },
          {
            title: "Interest: the price of time",
            content: "Interest is what you pay to borrow money, or what you earn when you lend it. It's the price of using money over time. Higher interest means borrowing is expensive; lower interest means it's cheap. This affects everything from mortgages to credit cards."
          }
        ]
      }
    ]
  },
  {
    slug: "navigating-noise",
    title: "Navigating Noise",
    description: "Stay calm and think clearly when markets get loud.",
    color: SERIES_COLORS.rose,
    lessons: [
      {
        slug: "hype-cycles",
        title: "Hype Cycles",
        pages: [
          {
            title: "The pattern of hype",
            content: "New things often follow a pattern: excitement builds, prices soar, reality sets in, prices crash, and then — sometimes — something useful emerges. This has happened with railroads, dot-coms, and crypto. Recognizing the pattern helps you stay grounded."
          },
          {
            title: "FOMO is a feature, not a bug",
            content: "Fear of missing out is built into us. When everyone around you seems to be getting rich, staying on the sidelines feels painful. But FOMO often peaks right before things go wrong. The crowd isn't always right."
          },
          {
            title: "Questions to ask",
            content: "Before jumping in: What problem does this solve? Who's actually using it? Would I hold this if the price dropped 50%? If you can't answer clearly, you might be speculating, not investing."
          }
        ]
      },
      {
        slug: "risk-and-uncertainty",
        title: "Risk and Uncertainty",
        pages: [
          {
            title: "Risk vs. uncertainty",
            content: "Risk is when you know the odds — like a coin flip. Uncertainty is when you don't — like predicting next year's economy. Most financial decisions involve uncertainty, not clean probabilities. Humility helps."
          },
          {
            title: "Diversification basics",
            content: "Don't put all your eggs in one basket. Spreading money across different assets means one bad outcome doesn't ruin everything. It's not about maximizing returns — it's about surviving the things you didn't predict."
          }
        ]
      }
    ]
  }
];

/**
 * Get a series by its slug
 */
export function getSeriesBySlug(slug: string): Series | null {
  return SERIES.find((s) => s.slug === slug) ?? null;
}

/**
 * Get a lesson by series slug and lesson slug
 */
export function getLessonBySlug(seriesSlug: string, lessonSlug: string): SeriesLesson | null {
  const series = getSeriesBySlug(seriesSlug);
  if (!series) return null;
  return series.lessons.find((l) => l.slug === lessonSlug) ?? null;
}

/**
 * Get the index of a lesson within its series
 */
export function getLessonIndex(seriesSlug: string, lessonSlug: string): number {
  const series = getSeriesBySlug(seriesSlug);
  if (!series) return -1;
  return series.lessons.findIndex((l) => l.slug === lessonSlug);
}
