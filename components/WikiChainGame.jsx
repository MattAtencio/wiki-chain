"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import puzzles from "@/data/puzzles";
import styles from "./WikiChainGame.module.css";

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

// Generate a plausible-sounding preview for trap links
function generateTrapPreview(linkName) {
  const templates = [
    `${linkName} encompasses a broad range of topics within its field, with connections to numerous disciplines and areas of study.`,
    `${linkName} has played a significant role throughout history, influencing culture, science, and society in various ways.`,
    `${linkName} is a subject of ongoing interest among researchers and enthusiasts, with roots tracing back centuries.`,
    `The study of ${linkName} reveals fascinating connections between seemingly unrelated fields of human knowledge.`,
    `${linkName} represents an important concept that has shaped developments across multiple domains.`,
  ];
  // Deterministic pick based on link name length
  return templates[linkName.length % templates.length];
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

// Filter links based on difficulty
function getLinksForDifficulty(article, difficulty) {
  if (!article) return {};
  const links = { ...article.links };
  const entries = Object.entries(links);
  const traps = entries.filter(([, v]) => !v);
  const real = entries.filter(([, v]) => v);

  if (difficulty === "easy") {
    // Remove 2 traps (fewer choices = easier)
    const trapsToKeep = traps.slice(0, Math.max(1, traps.length - 2));
    return Object.fromEntries([...real, ...trapsToKeep]);
  }
  if (difficulty === "hard") {
    // All links shown (same as medium, but back button disabled + timer forced)
    return links;
  }
  return links; // medium = default
}

export default function WikiChainGame() {
  const { puzzle, puzzleNumber } = getDailyPuzzle();
  const todayKey = String(getDailySeed());

  const [screen, setScreen] = useState("start");
  const [currentArticle, setCurrentArticle] = useState(puzzle.start);
  const [path, setPath] = useState([puzzle.start]);
  const [clicks, setClicks] = useState(0);
  const [trapClicks, setTrapClicks] = useState(0);
  const [clickHistory, setClickHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [cardAnim, setCardAnim] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  // Persistent stats
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Phase 2: Difficulty
  const [difficulty, setDifficulty] = useState("medium");

  // Phase 2: Timer
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // Phase 2: Hints
  const [revealedTraps, setRevealedTraps] = useState({}); // { "ArticleName": ["TrapLink1"] }
  const [hintFeedback, setHintFeedback] = useState(null);

  // Phase 2: Preview
  const [previewLink, setPreviewLink] = useState(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef(null);

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
    if (screen === "playing" && timerEnabled) {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    if (screen !== "playing" && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [screen, timerEnabled]);

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

      const article = puzzle.articles[currentArticle];
      const isReal = article.links[linkName];

      setClicks((c) => c + 1);

      if (!isReal) {
        setTrapClicks((t) => t + 1);
        setClickHistory((h) => [...h, "trap"]);
        setFeedback("trap");
        setCardAnim("shake");
        setTimeout(() => {
          setFeedback(null);
          setCardAnim("");
        }, 1200);
        return;
      }

      if (path.includes(linkName)) {
        setClickHistory((h) => [...h, "loop"]);
        setFeedback("loop");
        setCardAnim("wobble");
        setTimeout(() => {
          setFeedback(null);
          setCardAnim("");
          const loopIndex = path.indexOf(linkName);
          setPath((p) => p.slice(0, loopIndex + 1));
          setCurrentArticle(linkName);
        }, 1200);
        return;
      }

      setClickHistory((h) => [...h, "good"]);
      const newPath = [...path, linkName];
      setPath(newPath);
      setCurrentArticle(linkName);

      if (linkName === puzzle.target) {
        const totalClicks = clicks + 1;
        const starCount = getStars(totalClicks, puzzle.par);
        const earnedXP = getXP(starCount);

        const lastPlayed = loadState(STORAGE_KEYS.lastPlayed, "");
        const yesterday = getDailySeed() - 1;
        const newStreak =
          String(yesterday) === lastPlayed ? streak + 1 : 1;

        const newXp = xp + earnedXP;

        saveState(STORAGE_KEYS.xp, newXp);
        saveState(STORAGE_KEYS.streak, newStreak);
        saveState(STORAGE_KEYS.lastPlayed, todayKey);

        const result = {
          clicks: totalClicks,
          par: puzzle.par,
          path: newPath,
          traps: trapClicks,
          stars: starCount,
          difficulty,
          time: timerEnabled ? elapsed : null,
          hintsUsed: Object.values(revealedTraps).flat().length,
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
    [feedback, puzzle, currentArticle, path, clicks, trapClicks, xp, streak, todayKey, difficulty, timerEnabled, elapsed, revealedTraps]
  );

  const handleBack = useCallback(() => {
    if (path.length <= 1 || difficulty === "hard") return;
    const newPath = path.slice(0, -1);
    setPath(newPath);
    setCurrentArticle(newPath[newPath.length - 1]);
  }, [path, difficulty]);

  // Hint handler
  const handleHint = useCallback(() => {
    if (xp < HINT_COST) {
      setHintFeedback("Not enough XP!");
      setTimeout(() => setHintFeedback(null), 1500);
      return;
    }

    const article = puzzle.articles[currentArticle];
    const currentRevealed = revealedTraps[currentArticle] || [];
    const filteredLinks = getLinksForDifficulty(article, difficulty);
    const unrevealed = Object.entries(filteredLinks)
      .filter(([name, isReal]) => !isReal && !currentRevealed.includes(name))
      .map(([name]) => name);

    if (unrevealed.length === 0) {
      setHintFeedback("No traps left!");
      setTimeout(() => setHintFeedback(null), 1500);
      return;
    }

    // Pick a random unrevealed trap
    const trapToReveal = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    const newRevealed = {
      ...revealedTraps,
      [currentArticle]: [...currentRevealed, trapToReveal],
    };
    setRevealedTraps(newRevealed);

    const newXp = xp - HINT_COST;
    setXp(newXp);
    saveState(STORAGE_KEYS.xp, newXp);

    setHintFeedback("Trap revealed!");
    setTimeout(() => setHintFeedback(null), 1500);
  }, [xp, puzzle, currentArticle, revealedTraps, difficulty]);

  // Long press handlers for preview
  const handleLinkPointerDown = useCallback(
    (linkName, e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      longPressTimer.current = setTimeout(() => {
        const article = puzzle.articles[currentArticle];
        const isReal = article.links[linkName];
        let preview;
        if (isReal && puzzle.articles[linkName]) {
          const blurb = puzzle.articles[linkName].blurb;
          preview = blurb.split(".")[0] + ".";
        } else {
          preview = generateTrapPreview(linkName);
        }
        setPreviewLink({ name: linkName, text: preview });
        setPreviewPos({ x: rect.left, y: rect.top - 8 });
      }, 500);
    },
    [puzzle, currentArticle]
  );

  const handleLinkPointerUp = useCallback(() => {
    clearTimeout(longPressTimer.current);
    // Dismiss preview after short delay to allow reading
    setTimeout(() => setPreviewLink(null), 100);
  }, []);

  const handleShare = useCallback(async () => {
    const result = savedResult;
    if (!result) return;

    const emojiPath = clickHistory.length > 0
      ? clickHistory.map((t) => (t === "good" ? "\u{1F7E9}" : t === "trap" ? "\u{1F7E5}" : "\u{1F7E8}")).join("")
      : result.path.map(() => "\u{1F7E9}").join("");

    const starStr = "\u2B50".repeat(result.stars);
    const diffLabel = result.difficulty !== "medium" ? ` [${result.difficulty.toUpperCase()}]` : "";
    const timeStr = result.time !== null ? ` in ${formatTime(result.time)}` : "";
    const hintStr = result.hintsUsed > 0 ? ` (${result.hintsUsed} hint${result.hintsUsed > 1 ? "s" : ""})` : "";

    const text = [
      `\u{1F517} WikiChain #${puzzleNumber}${diffLabel}`,
      `${puzzle.start} \u2192 ${puzzle.target}`,
      `${emojiPath} (${result.clicks} clicks, par ${result.par})${timeStr}${hintStr}`,
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
  }, [savedResult, clickHistory, puzzleNumber, puzzle]);

  const handleCloseModal = () => {
    setShowModal(false);
    saveState(STORAGE_KEYS.onboarded, true);
  };

  const article = puzzle.articles[currentArticle];
  const filteredLinks = getLinksForDifficulty(article, difficulty);
  const linkNames = Object.keys(filteredLinks);
  const currentRevealed = revealedTraps[currentArticle] || [];
  const hintsUsedTotal = Object.values(revealedTraps).flat().length;

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

          {/* Difficulty Selector */}
          {!alreadyPlayed && (
            <div className={styles.difficultySection}>
              <div className={styles.difficultyLabel}>Difficulty</div>
              <div className={styles.difficultyBtns}>
                {["easy", "medium", "hard"].map((d) => (
                  <button
                    key={d}
                    className={`${styles.difficultyBtn} ${difficulty === d ? styles.difficultyActive : ""}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard"}
                  </button>
                ))}
              </div>
              <div className={styles.difficultyDesc}>
                {difficulty === "easy" && "Fewer trap links to choose from"}
                {difficulty === "medium" && "The standard experience"}
                {difficulty === "hard" && "Timer on, no back button"}
              </div>
            </div>
          )}

          {/* Timer Toggle */}
          {!alreadyPlayed && difficulty !== "hard" && (
            <button
              className={`${styles.timerToggle} ${timerEnabled ? styles.timerToggleOn : ""}`}
              onClick={() => setTimerEnabled((t) => !t)}
            >
              {timerEnabled ? "Timer: ON" : "Timer: OFF"}
            </button>
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
            {path.map((p, i) => (
              <span key={`${p}-${i}`}>
                {i > 0 && (
                  <span className={styles.breadcrumbArrow}> → </span>
                )}
                <span
                  className={
                    i === path.length - 1
                      ? styles.breadcrumbCurrent
                      : styles.breadcrumbItem
                  }
                >
                  {p}
                </span>
              </span>
            ))}
            <span className={styles.targetBadge}>
              Target: {puzzle.target}
            </span>
          </div>

          {/* Article Card */}
          <div
            className={`${styles.articleCard} ${
              cardAnim === "shake" ? styles.shake : ""
            } ${cardAnim === "wobble" ? styles.wobble : ""}`}
            key={currentArticle}
          >
            <h2 className={styles.articleTitle}>{currentArticle}</h2>
            <p className={styles.articleBlurb}>{article?.blurb}</p>
          </div>

          {/* Links */}
          <div className={styles.linksSection}>
            <div className={styles.linksLabel}>
              Links
              {xp >= HINT_COST && (
                <button className={styles.hintBtn} onClick={handleHint}>
                  Hint ({HINT_COST} XP)
                </button>
              )}
            </div>
            <div className={styles.linksList}>
              {linkNames.map((name) => {
                const isRevealed = currentRevealed.includes(name);
                return (
                  <button
                    key={name}
                    className={`${styles.linkBtn} ${isRevealed ? styles.linkRevealed : ""}`}
                    onClick={() => !isRevealed && handleLinkClick(name)}
                    onPointerDown={(e) => handleLinkPointerDown(name, e)}
                    onPointerUp={handleLinkPointerUp}
                    onPointerLeave={handleLinkPointerUp}
                    disabled={!!feedback || isRevealed}
                  >
                    {name}
                    {isRevealed && <span className={styles.revealedTag}> (trap)</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview Tooltip */}
          {previewLink && (
            <div
              className={styles.previewTooltip}
              style={{ top: previewPos.y, left: previewPos.x }}
            >
              <strong>{previewLink.name}</strong>
              <p>{previewLink.text}</p>
            </div>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.clickCounter}>
              Clicks: <span className={styles.clickCount}>{clicks}</span>{" "}
              / par {puzzle.par}
              {(timerEnabled || difficulty === "hard") && (
                <span className={styles.timer}> | {formatTime(elapsed)}</span>
              )}
            </div>
            <div className={styles.footerRight}>
              {hintsUsedTotal > 0 && (
                <span className={styles.hintCount}>{hintsUsedTotal} hint{hintsUsedTotal > 1 ? "s" : ""}</span>
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
          {feedback === "trap" && (
            <div className={`${styles.toast} ${styles.toastTrap}`}>
              Dead End!
            </div>
          )}
          {feedback === "loop" && (
            <div className={`${styles.toast} ${styles.toastLoop}`}>
              Already Visited!
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
              <span key={p}>
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
            <div className={styles.winStat}>
              <div className={styles.winStatValue}>{savedResult.traps}</div>
              <div className={styles.winStatLabel}>Traps</div>
            </div>
            {savedResult.time !== null && (
              <div className={styles.winStat}>
                <div className={styles.winStatValue}>{formatTime(savedResult.time)}</div>
                <div className={styles.winStatLabel}>Time</div>
              </div>
            )}
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
              You&apos;re given two topics. Navigate from the <strong>start</strong> to
              the <strong>target</strong> by clicking links on each article page.
            </p>
            <p className={styles.modalText}>
              ⚠️ Watch out — some links are <strong>traps</strong>! They lead
              to dead ends and cost you a click.
            </p>
            <p className={styles.modalText}>
              🎯 Try to reach the target in as few clicks as possible. The
              <strong> par</strong> score is the optimal number of clicks.
            </p>
            <p className={styles.modalText}>
              ⭐⭐⭐ At or under par | ⭐⭐ 1-2 over | ⭐ 3+ over
            </p>
            <hr className={styles.modalDivider} />
            <p className={styles.modalText}>
              <strong>Hints:</strong> Spend {HINT_COST} XP to reveal a trap link on the current page.
            </p>
            <p className={styles.modalText}>
              <strong>Preview:</strong> Long-press any link to peek at a preview.
            </p>
            <p className={styles.modalText}>
              <strong>Difficulty:</strong> Easy removes some traps. Hard adds a timer and disables the back button.
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
