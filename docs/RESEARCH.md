# WikiChain — Research

## Genre Analysis
- **Six Degrees of Wikipedia** is a well-known internet game — find the path between two articles using only links
- **Weaver** (letter chain puzzles) and **Pokedoku** (grid trivia) proved that constrained trivia-style games work on mobile
- **The Wiki Game** (thewikigame.com) is the direct ancestor — but it's full Wikipedia which is overwhelming and not mobile-friendly
- Opportunity: a **simplified, curated, mobile-first** version with a twist — fake links as traps

## Key Insights from Similar Games
| Game | What Works | What to Steal |
|------|-----------|---------------|
| The Wiki Game | Real Wikipedia navigation is fun | Core "connect A to B" mechanic |
| Weaver | Chain-based solving, daily puzzle | Daily pair, move counter |
| Wordle | Streak tracking, emoji sharing | Share results, daily cadence |
| Pokedoku | Grid knowledge-testing | Knowledge-based deduction |
| Connections | Process of elimination | Fake links = red herrings to eliminate |

## Core Mechanic: WikiChain
- Player is given a **start topic** and an **end topic** (e.g., "Pizza" → "Moon Landing")
- Each screen shows a simplified "article" with 6-8 clickable links
- Some links are **real** (move you closer to the goal) and some are **traps** (dead ends or loops)
- Goal: reach the target in the **fewest clicks**
- Each "article" is a short 1-2 sentence blurb + link list (not real Wikipedia — curated/authored content)

## The Trap Mechanic (Key Differentiator)
- Fake links look plausible but lead nowhere useful
- Traps could: lead to a dead-end page, loop back to a previous page, or add +1 penalty
- This turns it from pure trivia into a **deduction game** — "which links are real connections?"
- Simpler than real Wikipedia: no need to read full articles, just evaluate link plausibility

## MVP Scope (Ship in ~1 hour)
- Pre-authored puzzle chains (no AI generation at MVP — just hand-craft 10-15 puzzles)
- Each puzzle = a graph of 8-15 "articles" with links between them
- One optimal path (3-4 clicks), several longer paths, and dead ends
- Daily puzzle rotation (seeded, same as Spectrum)
- Click counter + par score + share results

## Target Audience
- Casual trivia fans, Wikipedia rabbit-hole enjoyers
- Mobile-first, play during commute/break
- Friends & family comparing click counts

## Technical Constraints (Matching Spectrum Pattern)
- Next.js 16 + React 19 (JavaScript)
- PWA via @ducanh2912/next-pwa
- Client-side only, no backend
- localStorage for state persistence
- Mobile-first (max-width 430px, 100dvh)
- Vercel deploy → wikichain.mattatencio.com
