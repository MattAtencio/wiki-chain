"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import puzzles from "@/data/puzzles";
import styles from "./WikiChainGame.module.css";

// ─── Helpers ────────────────────────────────────────────

function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function getDailyPuzzle() {
  const seed = getDailySeed();
  const index = seed % puzzles.length;
  return { puzzle: puzzles[index], puzzleNumber: seed - 20260317 + 1 };
}

function getStars(clicks, par) {
  if (clicks <= par) return 3;
  if (clicks <= par + 2) return 2;
  return 1;
}

function getXP(starCount) {
  return starCount * 10;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Seeded shuffle — deterministic per article per day
function seededShuffle(arr, seed) {
  const shuffled = [...arr];
  let s = seed >>> 0;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = ((s * 1664525 + 1013904223) & 0xffffffff) >>> 0;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

// BFS from target backwards — returns distance map
function computeDistances(puzzle) {
  const dist = {};
  dist[puzzle.target] = 0;
  const queue = [puzzle.target];
  while (queue.length > 0) {
    const current = queue.shift();
    for (const [name, article] of Object.entries(puzzle.articles)) {
      if (dist[name] !== undefined) continue;
      if (article.links.includes(current)) {
        dist[name] = dist[current] + 1;
        queue.push(name);
      }
    }
  }
  return dist;
}

const HINT_COST = 15;

const STORAGE_KEYS = {
  xp: "wikichain-xp",
  streak: "wikichain-streak",
  lastPlayed: "wikichain-lastPlayed",
  history: "wikichain-history",
  onboarded: "wikichain-onboarded",
};

function loadState(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function saveState(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Component ──────────────────────────────────────────

export default function WikiChainGame() {
  const { puzzle, puzzleNumber } = getDailyPuzzle();
  const todayKey = String(getDailySeed());
  const dailySeed = getDailySeed();

  // Precompute distances for hints
  const distances = useMemo(() => computeDistances(puzzle), [puzzle]);

  const [screen, setScreen] = useState("start");
  const [currentArticle, setCurrentArticle] = useState(puzzle.start);
  const [path, setPath] = useState([puzzle.start]);
  const [clicks, setClicks] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  // Persistent stats
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Difficulty & timer
  const [difficulty, setDifficulty] = useState("medium");
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // Hints — stores which link is highlighted per article
  const [hintedLinks, setHintedLinks] = useState({});
  const [hintFeedback, setHintFeedback] = useState(null);

  // Load persistent state
  useEffect(() => {
    setXp(loadState(STORAGE_KEYS.xp, 0));
    setStreak(loadState(STORAGE_KEYS.streak, 0));

    const onboarded = loadState(STORAGE_KEYS.onboarded, false);
    if (!onboarded) setShowModal(true);

    const history = loadState(STORAGE_KEYS.history, {});
    if (history[todayKey]) {
      setAlreadyPlayed(true);
      setSavedResult(history[todayKey]);
    }
  }, [todayKey]);

  // Timer tick
  useEffect(() => {
    if (screen === "playing" && (timerEnabled || difficulty === "hard")) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      return () => clearInterval(timerRef.current);
    }
    if (timerRef.current) clearInterval(timerRef.current);
  }, [screen, timerEnabled, difficulty]);

  // Get shuffled links for current article
  const getShuffledLinks = useCallback(
    (articleName) => {
      const article = puzzle.articles[articleName];
      if (!article) return [];
      let links = article.links;
      // Easy mode: trim some links that are farther from target
      if (difficulty === "easy" && links.length > 3) {
        const sorted = [...links].sort(
          (a, b) => (distances[a] ?? 99) - (distances[b] ?? 99)
        );
        // Keep the best half + 1 (at least 3)
        links = sorted.slice(0, Math.max(3, Math.ceil(links.length * 0.6)));
      }
      const seed = (dailySeed + hashString(articleName)) >>> 0;
      return seededShuffle(links, seed);
    },
    [puzzle, difficulty, dailySeed, distances]
  );

  const handleStart = useCallback(() => {
    if (alreadyPlayed) {
      setScreen("won");
    } else {
      setElapsed(0);
      setScreen("playing");
    }
  }, [alreadyPlayed]);

  const handleLinkClick = useCallback(
    (linkName) => {
      if (feedback) return;

      const newClicks = clicks + 1;
      setClicks(newClicks);

      // Navigate to the article
      const newPath = [...path, linkName];
      setPath(newPath);
      setCurrentArticle(linkName);

      // Already visited? Show a notice but still navigate
      if (path.includes(linkName)) {
        setFeedback("loop");
        setTimeout(() => setFeedback(null), 1000);
      }

      // Check win
      if (linkName === puzzle.target) {
        const starCount = getStars(newClicks, puzzle.par);
        const earnedXP = getXP(starCount);

        const lastPlayed = loadState(STORAGE_KEYS.lastPlayed, "");
        const yesterday = getDailySeed() - 1;
        const newStreak = String(yesterday) === lastPlayed ? streak + 1 : 1;
        const newXp = xp + earnedXP;

        saveState(STORAGE_KEYS.xp, newXp);
        saveState(STORAGE_KEYS.streak, newStreak);
        saveState(STORAGE_KEYS.lastPlayed, todayKey);

        const hintsUsed = Object.keys(hintedLinks).length;
        const result = {
          clicks: newClicks,
          par: puzzle.par,
          path: newPath,
          stars: starCount,
          difficulty,
          time: timerEnabled || difficulty === "hard" ? elapsed : null,
          hintsUsed,
        };
        const history = loadState(STORAGE_KEYS.history, {});
        history[todayKey] = result;
        saveState(STORAGE_KEYS.history, history);

        setXp(newXp);
        setStreak(newStreak);
        setSavedResult(result);

        setTimeout(() => setScreen("won"), 400);
      }
    },
    [feedback, clicks, path, puzzle, xp, streak, todayKey, difficulty, timerEnabled, elapsed, hintedLinks]
  );

  const handleBack = useCallback(() => {
    if (path.length <= 1 || difficulty === "hard") return;
    const newPath = path.slice(0, -1);
    setPath(newPath);
    setCurrentArticle(newPath[newPath.length - 1]);
  }, [path, difficulty]);

  // Hint: highlight the link closest to the target
  const handleHint = useCallback(() => {
    if (xp < HINT_COST) {
      setHintFeedback("Not enough XP!");
      setTimeout(() => setHintFeedback(null), 1500);
      return;
    }

    if (hintedLinks[currentArticle]) {
      setHintFeedback("Already hinted!");
      setTimeout(() => setHintFeedback(null), 1500);
      return;
    }

    const links = getShuffledLinks(currentArticle);
    // Find the link closest to target
    let bestLink = links[0];
    let bestDist = distances[links[0]] ?? 99;
    for (const l of links) {
      const d = distances[l] ?? 99;
      if (d < bestDist) {
        bestDist = d;
        bestLink = l;
      }
    }

    setHintedLinks((h) => ({ ...h, [currentArticle]: bestLink }));
    const newXp = xp - HINT_COST;
    setXp(newXp);
    saveState(STORAGE_KEYS.xp, newXp);

    setHintFeedback("Warm link revealed!");
    setTimeout(() => setHintFeedback(null), 1500);
  }, [xp, currentArticle, hintedLinks, getShuffledLinks, distances]);

  const handleShare = useCallback(async () => {
    const result = savedResult;
    if (!result) return;

    const starStr = "\u2B50".repeat(result.stars);
    const diffLabel = result.difficulty !== "medium" ? ` [${result.difficulty.toUpperCase()}]` : "";
    const timeStr = result.time !== null ? ` in ${formatTime(result.time)}` : "";
    const hintStr = result.hintsUsed > 0 ? ` (${result.hintsUsed} hint${result.hintsUsed > 1 ? "s" : ""})` : "";

    const text = [
      `\u{1F517} WikiChain #${puzzleNumber}${diffLabel}`,
      `${puzzle.start} \u2192 ${puzzle.target}`,
      `${result.clicks} clicks (par ${result.par})${timeStr}${hintStr}`,
      starStr,
      `wikichain.mattatencio.com`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [savedResult, puzzleNumber, puzzle]);

  const handleCloseModal = () => {
    setShowModal(false);
    saveState(STORAGE_KEYS.onboarded, true);
  };

  const article = puzzle.articles[currentArticle];
  const shuffledLinks = getShuffledLinks(currentArticle);
  const visitedSet = new Set(path);
  const hintedLink = hintedLinks[currentArticle];
  const hintsUsedTotal = Object.keys(hintedLinks).length;
  const showTimer = timerEnabled || difficulty === "hard";

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>WikiChain</div>
        <div className={styles.stats}>
          <span className={styles.statItem}>{xp} XP</span>
          <span className={styles.statItem}>{streak} streak</span>
          <button
            className={styles.howToPlay}
            onClick={() => setShowModal(true)}
            style={{ marginLeft: 4 }}
          >
            ?
          </button>
        </div>
      </div>

      {/* Start Screen */}
      {screen === "start" && (
        <div className={styles.startScreen}>
          <div className={styles.challenge}>
            <div className={styles.challengeLabel}>
              Today&apos;s Challenge #{puzzleNumber}
            </div>
            <div className={styles.challengeTopics}>
              {puzzle.start}
              <span className={styles.arrow}> → </span>
              {puzzle.target}
            </div>
          </div>
          <div className={styles.parInfo}>Par: {puzzle.par} clicks</div>

          {!alreadyPlayed && (
            <>
              <div className={styles.difficultySection}>
                <div className={styles.difficultyLabel}>Difficulty</div>
                <div className={styles.difficultyBtns}>
                  {["easy", "medium", "hard"].map((d) => (
                    <button
                      key={d}
                      className={`${styles.difficultyBtn} ${difficulty === d ? styles.difficultyActive : ""}`}
                      onClick={() => {
                        setDifficulty(d);
                        if (d === "hard") setTimerEnabled(true);
                      }}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
                <div className={styles.difficultyDesc}>
                  {difficulty === "easy" && "Fewer links to choose from"}
                  {difficulty === "medium" && "The standard experience"}
                  {difficulty === "hard" && "Timer on, no back button"}
                </div>
              </div>

              {difficulty !== "hard" && (
                <button
                  className={`${styles.timerToggle} ${timerEnabled ? styles.timerToggleOn : ""}`}
                  onClick={() => setTimerEnabled((t) => !t)}
                >
                  {timerEnabled ? "Timer: ON" : "Timer: OFF"}
                </button>
              )}
            </>
          )}

          <button className={styles.startBtn} onClick={handleStart}>
            {alreadyPlayed ? "View Results" : "Start"}
          </button>
        </div>
      )}

      {/* Playing Screen */}
      {screen === "playing" && (
        <div className={styles.playingScreen}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            {path.slice(-4).map((p, i, arr) => (
              <span key={`${p}-${path.length - arr.length + i}`}>
                {i > 0 && <span className={styles.breadcrumbArrow}> → </span>}
                <span
                  className={
                    i === arr.length - 1
                      ? styles.breadcrumbCurrent
                      : styles.breadcrumbItem
                  }
                >
                  {i === 0 && path.length > 4 ? "..." : ""}{p}
                </span>
              </span>
            ))}
            <span className={styles.targetBadge}>
              Target: {puzzle.target}
            </span>
          </div>

          {/* Article Card */}
          <div className={styles.articleCard} key={`${currentArticle}-${path.length}`}>
            <h2 className={styles.articleTitle}>{currentArticle}</h2>
            <p className={styles.articleBlurb}>{article?.blurb}</p>
          </div>

          {/* Links */}
          <div className={styles.linksSection}>
            <div className={styles.linksLabel}>
              <span>Links</span>
              {xp >= HINT_COST && !hintedLink && (
                <button className={styles.hintBtn} onClick={handleHint}>
                  Hint ({HINT_COST} XP)
                </button>
              )}
            </div>
            <div className={styles.linksList}>
              {shuffledLinks.map((name) => {
                const isVisited = visitedSet.has(name);
                const isHinted = hintedLink === name;
                return (
                  <button
                    key={name}
                    className={`${styles.linkBtn} ${isVisited ? styles.linkVisited : ""} ${isHinted ? styles.linkHinted : ""}`}
                    onClick={() => handleLinkClick(name)}
                    disabled={!!feedback}
                  >
                    {name}
                    {isVisited && <span className={styles.visitedTag}> (visited)</span>}
                    {isHinted && <span className={styles.hintedTag}> ★</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.clickCounter}>
              Clicks: <span className={styles.clickCount}>{clicks}</span>{" "}
              / par {puzzle.par}
              {showTimer && (
                <span className={styles.timer}> | {formatTime(elapsed)}</span>
              )}
            </div>
            <div className={styles.footerRight}>
              {hintsUsedTotal > 0 && (
                <span className={styles.hintCount}>
                  {hintsUsedTotal} hint{hintsUsedTotal > 1 ? "s" : ""}
                </span>
              )}
              <button
                className={styles.backBtn}
                onClick={handleBack}
                disabled={path.length <= 1 || difficulty === "hard"}
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Toasts */}
          {feedback === "loop" && (
            <div className={`${styles.toast} ${styles.toastLoop}`}>
              Going in circles!
            </div>
          )}
          {hintFeedback && (
            <div className={`${styles.toast} ${styles.toastHint}`}>
              {hintFeedback}
            </div>
          )}
        </div>
      )}

      {/* Win Screen */}
      {screen === "won" && savedResult && (
        <div className={styles.winScreen}>
          <div className={styles.winTitle}>You made it!</div>
          <div className={styles.winRoute}>
            {savedResult.path.map((p, i) => (
              <span key={`${p}-${i}`}>
                {i > 0 && " → "}
                <strong>{p}</strong>
              </span>
            ))}
          </div>
          <div className={styles.stars}>
            {"⭐".repeat(savedResult.stars)}
            {"☆".repeat(3 - savedResult.stars)}
          </div>
          <div className={styles.winStats}>
            <div className={styles.winStat}>
              <div className={styles.winStatValue}>{savedResult.clicks}</div>
              <div className={styles.winStatLabel}>Clicks</div>
            </div>
            <div className={styles.winStat}>
              <div className={styles.winStatValue}>{savedResult.par}</div>
              <div className={styles.winStatLabel}>Par</div>
            </div>
            {savedResult.time !== null && (
              <div className={styles.winStat}>
                <div className={styles.winStatValue}>{formatTime(savedResult.time)}</div>
                <div className={styles.winStatLabel}>Time</div>
              </div>
            )}
            <div className={styles.winStat}>
              <div className={styles.winStatValue}>{savedResult.path.length - 1}</div>
              <div className={styles.winStatLabel}>Steps</div>
            </div>
          </div>
          {savedResult.difficulty !== "medium" && (
            <div className={styles.difficultyBadge}>
              {savedResult.difficulty.toUpperCase()} MODE
            </div>
          )}
          {savedResult.hintsUsed > 0 && (
            <div className={styles.hintsBadge}>
              {savedResult.hintsUsed} hint{savedResult.hintsUsed > 1 ? "s" : ""} used
            </div>
          )}
          <button className={styles.shareBtn} onClick={handleShare}>
            Share Results
          </button>
          {copied && <span className={styles.copied}>Copied!</span>}
          <div className={styles.xpGain}>
            +{getXP(savedResult.stars)} XP earned
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>How to Play</h2>
            <p className={styles.modalText}>
              You&apos;re given two topics. Navigate from <strong>start</strong> to{" "}
              <strong>target</strong> by clicking links on each article — like
              clicking through Wikipedia!
            </p>
            <p className={styles.modalText}>
              Every link takes you to a real page. Some paths are short, others
              are long detours. Find the shortest route!
            </p>
            <p className={styles.modalText}>
              🎯 <strong>Par</strong> is the minimum clicks. Beat it for 3 stars.
            </p>
            <p className={styles.modalText}>
              ⭐⭐⭐ At or under par | ⭐⭐ 1-2 over | ⭐ 3+ over
            </p>
            <hr className={styles.modalDivider} />
            <p className={styles.modalText}>
              <strong>Hints:</strong> Spend {HINT_COST} XP to highlight the best
              link on the current page (★ warm).
            </p>
            <p className={styles.modalText}>
              <strong>Difficulty:</strong> Easy shows fewer links. Hard adds a
              timer and disables the back button.
            </p>
            <button className={styles.modalClose} onClick={handleCloseModal}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
