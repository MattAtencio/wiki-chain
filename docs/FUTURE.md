# WikiChain — Future Ideas

## Phase 3 — Social & Content
- **Multiplayer race** — share a link, race friends to solve the same puzzle in real-time
- **AI-generated puzzles** — use an LLM to generate article blurbs and full graph connections from any two Wikipedia topics
- **User-submitted puzzles** — form to create custom chains, shareable via URL
- **Weekly challenge** — 5 puzzles, cumulative score leaderboard
- **Friends list** — compare daily scores with friends (could use simple share codes, no auth needed)

## Phase 4 — Depth & Polish
- **Branching paths scoring** — bonus XP for finding the optimal path vs just finishing
- **Category themes** — "Science Week", "History Week", "Food Week" themed puzzle sets
- **Achievement badges** — perfect par scores, streak milestones (7, 30, 100), speed records
- **Sound effects** — satisfying click sounds on navigation, subtle chime on win
- **Haptic feedback** — vibrate on mobile for navigation, loops, and wins
- **Animated transitions** — slide/fade between articles instead of instant swap
- **Article images** — small thumbnail per article for visual interest
- **Dark mode** — toggle or auto-detect system preference

## Phase 5 — Scale & Backend (if warranted)
- **Server-side scoring** — prevent localStorage tampering if competitive features added
- **Puzzle API** — serve puzzles from a backend, enabling unlimited content
- **Global leaderboard** — daily/weekly rankings (would need simple auth)
- **Analytics** — track which puzzles are hardest, average click counts, popular wrong paths
- **CSP headers** — add Content-Security-Policy and X-Frame-Options per security review

## Content Ideas
- **Real Wikipedia integration** — fetch actual article summaries via Wikipedia API for blurbs
- **Dynamic graph generation** — given start/target, auto-build a graph using Wikipedia's link structure
- **Themed packs** — downloadable puzzle packs (Sports, Music, Science, Geography)
- **"Impossible" mode** — much larger graphs (30+ nodes) with par 8+
