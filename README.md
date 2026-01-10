## UnicornSheepDog1 (USD1) — USD1.edu

Education-forward site with:
- **Sticky dark header** with responsive nav + light/dark toggle (sun/moon icons)
- **Hero** illustration with an integrated speech bubble
- **Learn** section with modular lessons stored as plain text and split into pages
- **Lesson pages** with a right-side AI chat (Grok via xAI) behind a single server API endpoint (`/api/chat`)
- **Fun & Games**: Coloring (fill + draw), Flappy USD1, USD1 Quiz
- **News & Education**: manual lists of X posts and X articles with sort/filter + list/grid toggle
- **Discover footer** with socials, contact, education, and USD1 links + disclaimer

### Local dev

Install deps and run:

```bash
npm install
npm run dev
```

### Lesson content (copy/paste friendly)

Lessons are plain text files in `content/lessons/`.

- Page breaks are marked with a line that says: `---PAGE---`
- Optional page title: first line can be `# Title`

Example:

```text
# Page title
Page text...

---PAGE---
# Next page title
More text...
```

### AI chat (optional)

The site works without AI.

To enable AI chat, set environment variables:
- `XAI_API_KEY`: your xAI API key (or `GROK_API_KEY` as an alias)
- `XAI_BASE_URL` (optional): defaults to `https://api.x.ai/v1`
- `LLM_MODEL` (optional): defaults to `grok-2-latest`
- `LLM_DISABLED` (optional): set to `true` to disable AI completely

The only place the frontend calls is `POST /api/chat`. Provider logic is isolated in `lib/llm/`.

### TODO for you to customize

- Update the contract address in `components/Footer.tsx` (`CONTRACT_ADDRESS`)
- Update Solscan / DexScreener links in `components/Footer.tsx`
- Replace placeholder X post/article URLs in `data/announcements.ts` and `data/articles.ts`
- Swap in real coloring templates (SVG regions) in `components/coloring/templates.ts`


