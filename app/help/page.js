import Link from "next/link";

export const metadata = {
  title: "Help — WikiChain",
  description: "Learn how to play WikiChain, the daily link puzzle.",
};

export default function HelpPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-outfit), sans-serif",
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: 16,
        background: "#faf8f5",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
          borderBottom: "1px solid #e0ddd8",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "1.4rem",
            color: "#3366cc",
          }}
        >
          WikiChain
        </div>
        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            color: "#3366cc",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Back to Game
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 24 }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "1.8rem",
            color: "#222",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Guide
        </h1>

        {/* How to Play */}
        <section style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "1.2rem",
              color: "#222",
              marginBottom: 12,
            }}
          >
            How to Play
          </h2>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
              Each day you get two topics: a <strong>start</strong> and a{" "}
              <strong>target</strong>. Your goal is to navigate from start to
              target by clicking links on each article — just like clicking
              through Wikipedia!
            </p>
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
              Every article has a short description and a set of links to other
              articles. Pick the link you think leads closest to the target.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
              <strong>Par</strong> is the minimum number of clicks needed. Match
              or beat par to earn 3 stars.
            </p>
            <ul
              style={{
                fontSize: "0.9rem",
                color: "#555",
                lineHeight: 1.8,
                paddingLeft: 20,
                marginBottom: 0,
              }}
            >
              <li>At or under par = 3 stars (30 XP)</li>
              <li>1-2 over par = 2 stars (20 XP)</li>
              <li>3+ over par = 1 star (10 XP)</li>
            </ul>
          </div>
        </section>

        {/* Tips */}
        <section style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "1.2rem",
              color: "#222",
              marginBottom: 12,
            }}
          >
            Tips
          </h2>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <ul
              style={{
                fontSize: "0.9rem",
                color: "#555",
                lineHeight: 1.8,
                paddingLeft: 20,
              }}
            >
              <li>
                <strong>Think ahead.</strong> Read the article blurb to
                understand what each topic is about before clicking a link.
              </li>
              <li>
                <strong>Avoid loops.</strong> Visited links are marked — clicking
                them again wastes a click.
              </li>
              <li>
                <strong>Use hints wisely.</strong> Spend 15 XP to reveal the
                best link on the current page. The hinted link is marked with a
                star.
              </li>
              <li>
                <strong>Try Easy mode first.</strong> It shows fewer links,
                making the path clearer while you learn.
              </li>
              <li>
                <strong>Use the back button.</strong> If you take a wrong turn,
                go back (except in Hard mode).
              </li>
              <li>
                <strong>Look for broad topics.</strong> Links to general
                subjects often connect to more articles, getting you closer to
                the target.
              </li>
            </ul>
          </div>
        </section>

        {/* About */}
        <section style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "1.2rem",
              color: "#222",
              marginBottom: 12,
            }}
          >
            About
          </h2>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
              <strong>WikiChain</strong> is a daily link puzzle inspired by the
              Wikipedia game. A new challenge is available every day — build your
              streak and climb the XP ladder!
            </p>
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
              <strong>Difficulty modes:</strong>
            </p>
            <ul
              style={{
                fontSize: "0.9rem",
                color: "#555",
                lineHeight: 1.8,
                paddingLeft: 20,
                marginBottom: 12,
              }}
            >
              <li>
                <strong>Easy</strong> — Fewer links to choose from
              </li>
              <li>
                <strong>Medium</strong> — The standard experience
              </li>
              <li>
                <strong>Hard</strong> — Timer on, no back button
              </li>
            </ul>
            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
              Share your results with friends and see who can find the shortest
              path!
            </p>
          </div>
        </section>

        {/* Back button */}
        <div style={{ textAlign: "center", paddingBottom: 24 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#3366cc",
              color: "white",
              border: "none",
              padding: "14px 48px",
              borderRadius: 12,
              fontSize: "1.1rem",
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
}
