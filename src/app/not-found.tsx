import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-base)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(24px, 5vw, 80px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(240,238,232,0.055) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Teal glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, pointerEvents: "none",
        width: "40vw", height: "40vw",
        background: "radial-gradient(ellipse at top right, rgba(0,194,168,0.06) 0%, transparent 65%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 560 }}>
        <div style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 10,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "var(--text-muted)", marginBottom: 24,
        }}>
          404 · Page Not Found
        </div>

        <h1 style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(64px, 12vw, 160px)",
          color: "var(--text-primary)", letterSpacing: "-0.04em",
          lineHeight: 0.9, margin: "0 0 32px",
        }}>
          Lost<span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        <p style={{
          fontFamily: "var(--font-dm-sans)", fontWeight: 300,
          fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--text-secondary)",
          lineHeight: 1.8, marginBottom: 48,
        }}>
          This page doesn&apos;t exist. The rest of the portfolio does.
        </p>

        <Link
          href="/"
          style={{
            fontFamily: "var(--font-dm-mono)", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--bg-base)", background: "var(--accent)",
            padding: "14px 32px", borderRadius: 2, textDecoration: "none",
            display: "inline-block",
          }}
        >
          Back to Portfolio
        </Link>
      </div>

      {/* Bottom monogram */}
      <div style={{
        position: "absolute", bottom: "clamp(28px, 4vw, 48px)", left: "clamp(28px, 4vw, 48px)",
        fontFamily: "var(--font-dm-mono)", fontSize: 10,
        letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,194,168,0.4)",
      }}>
        MMK
      </div>
    </div>
  );
}
