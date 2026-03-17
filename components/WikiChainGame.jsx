"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function WikiChainGame() {
  const { puzzle, puzzleNumber } = getDailyPuzzle();
  const todayKey = String(getDailySeed());

  const [screen, setScreen] = useState("start");
  const [currentArticle, setCurrentArticle] = useState(puzzle.start);
  const [path, setPath] = useState([puzzle.start]);
  const [clicks, setClicks] = useState(0);
  const [trapClicks, setTrapClicks] = useState(0);
  const [clickHistory, setClickHistory] = useState([]); // "good" | "trap" | "loop"
  const [feedback, setFeedback] = useState(null);
  const [cardAnim, setCardAnim] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  // Persistent stats
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

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

  const handleStart = useCallback(() => {
    if (alreadyPlayed) {
      setScreen("won");
    } else {
      setScreen("playing");
    }
  }, [alreadyPlayed]);

  const handleLinkClick = useCallback(
    (linkName) => {
      if (feedback) return; // debounce during feedback

      const article = puzzle.articles[currentArticle];
      const isReal = article.links[linkName];

      setClicks((c) => c + 1);

      if (!isReal) {
        // Trap — dead end
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

      // Check if already visited (loop)
      if (path.includes(linkName)) {
        setClickHistory((h) => [...h, "loop"]);
        setFeedback("loop");
        setCardAnim("wobble");
        setTimeout(() => {
          setFeedback(null);
          setCardAnim("");
          // Still navigate back to that article
          const loopIndex = path.indexOf(linkName);
          setPath((p) => p.slice(0, loopIndex + 1));
          setCurrentArticle(linkName);
        }, 1200);
        return;
      }

      // Good link
      setClickHistory((h) => [...h, "good"]);
      const newPath = [...path, linkName];
      setPath(newPath);
      setCurrentArticle(linkName);

      // Check win
      if (linkName === puzzle.target) {
        const totalClicks = clicks + 1;
        const starCount = getStars(totalClicks, puzzle.par);
        const earnedXP = getXP(starCount);

        // Update streak
        const lastPlayed = loadState(STORAGE_KEYS.lastPlayed, "");
        const yesterday = getDailySeed() - 1;
        const newStreak =
          String(yesterday) === lastPlayed ? streak + 1 : 1;

        const newXp = xp + earnedXP;

        // Save
        saveState(STORAGE_KEYS.xp, newXp);
        saveState(STORAGE_KEYS.streak, newStreak);
        saveState(STORAGE_KEYS.lastPlayed, todayKey);

        const result = {
          clicks: totalClicks,
          par: puzzle.par,
          path: newPath,
          traps: trapClicks,
          stars: starCount,
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
    [feedback, puzzle, currentArticle, path, clicks, trapClicks, xp, streak, todayKey]
  );

  const handleBack = useCallback(() => {
    if (path.length <= 1) return;
    const newPath = path.slice(0, -1);
    setPath(newPath);
    setCurrentArticle(newPath[newPath.length - 1]);
  }, [path]);

  const handleShare = useCallback(async () => {
    const result = savedResult;
    if (!result) return;

    const emojiPath = clickHistory.length > 0
      ? clickHistory.map((t) => (t === "good" ? "\u{1F7E9}" : t === "trap" ? "\u{1F7E5}" : "\u{1F7E8}")).join("")
      : result.path.map(() => "\u{1F7E9}").join("");

    const starStr = "\u2B50".repeat(result.stars);

    const text = [
      `\u{1F517} WikiChain #${puzzleNumber}`,
      `${puzzle.start} \u2192 ${puzzle.target}`,
      `${emojiPath} (${result.clicks} clicks, par ${result.par})`,
      starStr,
      `wikichain.mattatencio.com`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
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
  const linkNames = article ? Object.keys(article.links) : [];

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
            <div className={styles.linksLabel}>Links</div>
            <div className={styles.linksList}>
              {linkNames.map((name) => (
                <button
                  key={name}
                  className={styles.linkBtn}
                  onClick={() => handleLinkClick(name)}
                  disabled={!!feedback}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.clickCounter}>
              Clicks: <span className={styles.clickCount}>{clicks}</span>{" "}
              / par {puzzle.par}
            </div>
            <button
              className={styles.backBtn}
              onClick={handleBack}
              disabled={path.length <= 1}
            >
              ← Back
            </button>
          </div>

          {/* Toast */}
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
              <div className={styles.winStatLabel}>Traps Hit</div>
            </div>
          </div>
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
              ⭐⭐⭐ At or under par<br />
              ⭐⭐ 1-2 over par<br />
              ⭐ 3+ over par
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
