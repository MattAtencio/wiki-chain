# WikiChain — Daily Link Puzzle

A PWA trivia/chain game where players navigate between two topics by clicking links, avoiding traps.

## Tech Stack
- Next.js 16 App Router | React 19 | JavaScript (no TypeScript)
- @ducanh2912/next-pwa for offline/installable support
- Deploy: Vercel (production: wikichain.mattatencio.com)
- Inline styles + CSS Modules for animations
- localStorage for persistence (XP, streak, daily completion, onboarding)
- Fonts: DM Serif Display + Outfit via next/font/google

## Rules
- Every client component must have `"use client"` directive
- Guard all localStorage access with `typeof window !== "undefined"`
- Mobile-first design — viewport-pinned (100dvh, no scroll), max-width 430px
- No backend — everything runs client-side
- Puzzles use seeded daily rotation via `getDailySeed()`
- Build uses `--webpack` flag (next-pwa incompatible with Turbopack)
- Cloudflare DNS must be DNS-only (no proxy) for Vercel SSL

## Structure
```
app/
  layout.js                    — Root layout with PWA meta, fonts, OG tags
  page.js                      — Renders <WikiChainGame />
  globals.css                  — Reset + scroll prevention
components/
  WikiChainGame.jsx            — Core game component (article navigation + trap detection)
  WikiChainGame.module.css     — Animations, card styles, onboarding modal
data/
  puzzles.js                   — 15 puzzle graph definitions
public/
  manifest.json                — PWA manifest
  icon-*.png                   — PWA icons (placeholder)
```

## Running Locally
```bash
npm run dev    # http://localhost:3000 (Turbopack)
npm run build  # Production build (webpack, generates service worker)
```

## Deploying
```bash
npx vercel --prod  # Deploys to wikichain.mattatencio.com
```
