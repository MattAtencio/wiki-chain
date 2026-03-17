# WikiChain — Implementation Plan

## Architecture (Matching Spectrum)
```
app/
  layout.js              — Root layout, PWA meta, fonts, OG tags
  page.js                — Renders <WikiChainGame />
  globals.css            — Reset, scroll prevention, base styles
components/
  WikiChainGame.jsx      — Core game state machine + screens
  WikiChainGame.module.css — All animations and component styles
data/
  puzzles.js             — Puzzle graph definitions (10-15 for MVP)
public/
  manifest.json          — PWA manifest
  icon-192.png           — App icon
  icon-512.png           — App icon large
```

## Tech Stack
- Next.js 16 + React 19 (JavaScript, no TypeScript)
- @ducanh2912/next-pwa for offline support
- CSS Modules + inline styles (no UI library)
- localStorage for persistence
- Vercel for deploy

## State Machine
```
IDLE → PLAYING → WON
         ↕
      DEAD_END (temporary — auto-returns to PLAYING after toast)
```

### Game State (useState)
```js
{
  screen: "start" | "playing" | "won",
  currentArticle: "Pizza",
  path: ["Pizza"],              // breadcrumb of visited articles
  clicks: 0,                    // total clicks (including traps)
  traps: 0,                     // trap clicks only
  feedback: null | "deadend" | "loop",  // for toast display
}
```

## MVP Feature Set (v1 — ~1 hour)
1. **Daily puzzle** — seeded rotation from puzzle pool
2. **Article navigation** — tap links, advance through graph
3. **Trap detection** — dead ends with visual feedback
4. **Loop detection** — "already visited" with visual feedback
5. **Win condition** — reach target, show score vs par
6. **Click counter** — running count during play
7. **Share results** — emoji grid to clipboard
8. **Streak tracking** — consecutive days played
9. **XP system** — simple points (3⭐ = 30xp, 2⭐ = 20xp, 1⭐ = 10xp)
10. **How-to-play modal** — first visit onboarding
11. **PWA** — installable, offline-capable

## Puzzle Content (MVP — 10-15 hand-crafted)
Each puzzle needs:
- Start + target topics (fun, recognizable pairs)
- 8-15 article nodes forming a graph
- 1 optimal path (3-4 hops)
- 2-3 alternative longer paths
- Dead-end traps on each node

### Starter Puzzle Ideas
| # | Start | Target | Theme | Par |
|---|-------|--------|-------|-----|
| 1 | Pizza | Moon Landing | Food → Space | 4 |
| 2 | Soccer | Shakespeare | Sports → Literature | 4 |
| 3 | Dinosaurs | Smartphone | Ancient → Modern | 5 |
| 4 | Chocolate | Mount Everest | Food → Geography | 4 |
| 5 | Jazz | Internet | Music → Technology | 4 |
| 6 | Pyramids | Electric Car | Ancient → Modern | 5 |
| 7 | Penguin | Hollywood | Animal → Entertainment | 4 |
| 8 | Coffee | Mars | Beverage → Space | 4 |
| 9 | Samurai | Bitcoin | History → Tech | 5 |
| 10 | Honey Bee | Eiffel Tower | Nature → Architecture | 4 |
| 11 | Violin | Olympics | Music → Sports | 4 |
| 12 | Volcano | DNA | Earth → Science | 4 |
| 13 | Pirate | Satellite | History → Space | 5 |
| 14 | Sushi | Taj Mahal | Food → Architecture | 4 |
| 15 | Lightning | Video Games | Nature → Tech | 4 |

## Future Features (Post-MVP Polish)

### Phase 2 — Enhanced Gameplay
- **Hint system** — spend XP to highlight one real link
- **Timer mode** — optional speed challenge
- **Article previews** — long-press a link to see a snippet before clicking
- **Difficulty tiers** — Easy (more real links), Medium, Hard (more traps)

### Phase 3 — Social & Content
- **Multiplayer race** — share a link, race to solve same puzzle
- **AI-generated puzzles** — use an LLM to generate article blurbs and plausible fake links
- **User-submitted puzzles** — form to create and share custom chains
- **Weekly challenge** — 5 puzzles, cumulative score leaderboard

### Phase 4 — Depth
- **Branching paths** — multiple valid routes with different scores
- **Category themes** — "Science Week", "History Week" themed puzzles
- **Achievement badges** — perfect scores, streaks, speed records
- **Sound effects** — satisfying click sounds, trap buzzer, win chime

## Development Order (MVP)
1. Scaffold Next.js project + PWA config (~5 min)
2. Create puzzle data file with 3-5 initial puzzles (~15 min)
3. Build WikiChainGame component — start screen + article navigation (~20 min)
4. Add trap/loop detection + visual feedback (~10 min)
5. Build win screen + sharing + localStorage (~10 min)
6. Polish: animations, onboarding modal, responsive (~10 min)
7. Deploy to Vercel (~5 min)
