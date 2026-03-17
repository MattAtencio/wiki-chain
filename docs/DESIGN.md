# WikiChain — Design

## Game Flow

### MVP Flow (3 screens)
```
[Start Screen] → [Article Screen] → [Win Screen]
     │                  │                  │
  Daily puzzle    Navigate links      Score + Share
  Start/Target    Click to move       Emoji results
  How to play     Back button         Streak + XP
```

### Start Screen
- Game title + today's challenge: **"Pizza → Moon Landing"**
- Par score shown (e.g., "Par: 4 clicks")
- "Start" button
- Streak counter + XP in header
- How-to-play modal (first visit)

### Article Screen (Core Gameplay)
- **Header**: Start → Current → Target breadcrumb trail
- **Article card**: Topic name + 1-2 sentence description
- **Link list**: 6-8 tappable link buttons
  - Real links: advance toward target
  - Trap links: dead end (shows "Dead End!" toast, +1 to click count)
  - Loop links: return to a previously visited article (shows "Already visited!" toast)
- **Footer**: Click counter, back button, target reminder
- Visual feedback on tap: green flash (good), red flash (trap), yellow flash (loop)

### Win Screen
- "You reached [Target] in X clicks!" (vs par)
- Star rating: ⭐⭐⭐ (at par), ⭐⭐ (par+1-2), ⭐ (par+3+)
- Path taken visualization (breadcrumb of your route)
- Share button → emoji grid
- XP earned + streak updated

## Share Format
```
🔗 WikiChain #42
Pizza → Moon Landing
🟩🟩🟩🟥🟩🟩 (6 clicks, par 4)
⭐⭐
wikichain.mattatencio.com
```
- 🟩 = good link click, 🟥 = trap/dead end, 🟨 = loop/backtrack

## Visual Design
- **Theme**: Wikipedia-inspired but stylized — cream/paper background, serif headers
- **Color palette**:
  - Background: #faf8f5 (warm paper)
  - Primary: #3366cc (Wikipedia blue)
  - Accent: #228B22 (success green)
  - Danger: #cc3333 (trap red)
  - Text: #222222
- **Fonts**: DM Serif Display (headers) + Outfit (body) — matching Spectrum
- **Cards**: Subtle shadow, rounded corners, paper-like texture
- **Links**: Styled as Wikipedia-esque blue underlined links inside article cards

## Data Model

### Puzzle Definition
```js
{
  id: 42,
  start: "Pizza",
  target: "Moon Landing",
  par: 4,
  articles: {
    "Pizza": {
      blurb: "A savory dish of Italian origin consisting of a round, flat base of dough topped with tomatoes, cheese, and various toppings.",
      links: {
        "Italy": true,          // real — advances
        "Tomato": true,         // real — advances
        "Fast Food": false,     // trap — dead end
        "Cheese": false,        // trap — dead end
        "Restaurant": false,    // trap — dead end
        "Naples": true          // real — advances
      }
    },
    "Italy": {
      blurb: "A country in southern Europe, known for art, architecture, and its space agency partnership with NASA.",
      links: {
        "Rome": false,
        "Renaissance": false,
        "NASA": true,
        "European Union": false,
        "Mediterranean": false,
        "Space Race": true
      }
    },
    // ... more articles forming the graph
  }
}
```

### localStorage Schema
```js
{
  "wikichain-xp": 150,
  "wikichain-streak": 3,
  "wikichain-lastPlayed": "2026-03-17",
  "wikichain-history": {
    "2026-03-17": { clicks: 6, par: 4, path: ["Pizza","Italy","NASA","Space Race","Moon Landing"], traps: 2 }
  },
  "wikichain-onboarded": true
}
```

## Interaction Details
- Tapping a real link: smooth slide transition to next article
- Tapping a trap: card shakes + red flash + "Dead End!" toast (1.5s)
- Tapping a loop: card wobbles + yellow flash + "Already visited!" toast
- Back button: returns to previous article (doesn't reduce click count — clicks are permanent)
- All transitions ~300ms for snappy feel
