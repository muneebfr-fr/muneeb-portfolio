"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const TERMINAL_LINES = [
  { prompt: "$", text: " muneeb.init()", color: "var(--accent)" },
  { prompt: ">", text: " loading profile...", color: "rgba(240,238,232,0.45)" },
  { prompt: ">", text: " frontend: next.js · react · typescript · tailwind", color: "rgba(240,238,232,0.65)" },
  { prompt: ">", text: " backend:  python · supabase · laravel · postgresql", color: "rgba(240,238,232,0.65)" },
  { prompt: ">", text: " deployed: 5 projects, 3 clients", color: "rgba(240,238,232,0.65)" },
  { prompt: ">", text: " managed: AED 13M+", color: "rgba(240,238,232,0.65)" },
  { prompt: ">", text: " status: open to work ✓", color: "#00C2A8" },
];

function TerminalBlock() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
      if (cancelled) return;
      if (lineIndex >= TERMINAL_LINES.length) { setDone(true); return; }

      const line = TERMINAL_LINES[lineIndex];
      if (charIndex <= line.text.length) {
        setCurrentText(line.text.slice(0, charIndex));
        charIndex++;
        setTimeout(typeNext, charIndex === 1 ? 300 : 28);
      } else {
        setVisibleLines(lineIndex + 1);
        setCurrentText("");
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNext, 180);
      }
    };

    const start = setTimeout(typeNext, 1400);
    return () => { cancelled = true; clearTimeout(start); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{
        background: "rgba(9,9,12,0.75)",
        border: "1px solid rgba(0,194,168,0.18)",
        borderRadius: 6,
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        width: "100%",
        maxWidth: 340,
        minWidth: 260,
      }}
    >
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 12px",
        borderBottom: "1px solid rgba(240,238,232,0.06)",
        background: "rgba(240,238,232,0.03)",
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 10,
          color: "rgba(240,238,232,0.3)", letterSpacing: "0.12em",
          marginLeft: "auto",
        }}>
          muneeb.sh
        </span>
      </div>

      {/* Lines */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: "flex", fontFamily: "var(--font-dm-mono)", fontSize: 11, lineHeight: 1.6 }}>
            <span style={{ color: "rgba(0,194,168,0.6)", marginRight: 6, flexShrink: 0 }}>{line.prompt}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}

        {/* Currently typing line */}
        {visibleLines < TERMINAL_LINES.length && (
          <div style={{ display: "flex", fontFamily: "var(--font-dm-mono)", fontSize: 11, lineHeight: 1.6 }}>
            <span style={{ color: "rgba(0,194,168,0.6)", marginRight: 6, flexShrink: 0 }}>
              {TERMINAL_LINES[visibleLines].prompt}
            </span>
            <span style={{ color: TERMINAL_LINES[visibleLines].color }}>{currentText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ display: "inline-block", width: 7, height: 13, background: "var(--accent)", marginLeft: 1, verticalAlign: "middle" }}
            />
          </div>
        )}

        {/* Idle cursor after done */}
        {done && (
          <div style={{ display: "flex", fontFamily: "var(--font-dm-mono)", fontSize: 11, lineHeight: 1.6 }}>
            <span style={{ color: "rgba(0,194,168,0.6)", marginRight: 6 }}>$</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ display: "inline-block", width: 7, height: 13, background: "var(--accent)", verticalAlign: "middle" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

const credentials = [
  { label: "Full-Stack Developer", href: "#work" },
  { label: "UI/UX Designer",       href: "#work" },
  { label: "Cybersecurity Major",  href: "#security" },
  { label: "CS · UOWD Dubai",      href: "#education" },
  { label: "Google Certified",     href: "#security" },
  { label: "AED 13M+ Deployed",    href: "#experience" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const credY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const wordVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflowX: "hidden",
        overflowY: "visible",
        padding: "0 clamp(20px, 5vw, 72px)",
        paddingBottom: "clamp(48px, 7vw, 80px)",
      }}
    >
      {/* Dot grid */}
      <motion.div
        style={{
          opacity: gridOpacity,
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(240,238,232,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "35vw", height: "35vw",
        background: "radial-gradient(ellipse at top right, rgba(0,194,168,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{
          position: "absolute",
          top: 80,
          left: "clamp(20px, 5vw, 72px)",
          right: "clamp(20px, 5vw, 72px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 10,
          letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)",
        }}>
          Portfolio · 2026
        </span>
        <span style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 10,
          letterSpacing: "0.2em", color: "var(--text-muted)",
        }}>
          Ajman, UAE
        </span>
      </motion.div>

      {/* Vertical accent line — hidden on mobile */}
      <div className="hero-accent-line" style={{
        position: "absolute",
        left: "clamp(20px, 5vw, 72px)",
        top: "14%",
        bottom: "clamp(48px, 7vw, 80px)",
        width: 1,
        background: "linear-gradient(to bottom, var(--accent), rgba(0,194,168,0.08))",
      }} />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, paddingLeft: "clamp(16px, 3.5vw, 44px)" }}>

        {/* Role eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          style={{ marginBottom: 12 }}
        >
          <span style={{
            fontFamily: "var(--font-dm-mono)", fontSize: "clamp(9px, 1.5vw, 11px)",
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-muted)",
          }}>
            Developer · Designer · Security Specialist · Sales · Entrepreneur
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          style={{ y: nameY }}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { word: "Muhammad", accent: false },
            { word: "Muneeb", accent: true },
            { word: "Kashif", accent: false },
          ].map(({ word, accent }) => (
            <motion.div key={word} variants={lineVariants}>
              <span style={{
                display: "block",
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(36px, 7.5vw, 108px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
                color: accent ? "var(--accent)" : "var(--text-primary)",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}>
                {word}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <motion.div
          style={{ y: credY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <div style={{
            height: 1,
            background: "var(--border)",
            margin: "clamp(24px, 4vw, 48px) 0 clamp(20px, 3vw, 32px)",
            maxWidth: "90vw",
          }} />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "clamp(24px, 4vw, 40px)",
          }}>
            {/* Left — bio + CTAs */}
            <div style={{ maxWidth: 440, minWidth: 0, flex: "1 1 280px" }}>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontWeight: 300,
                fontSize: "clamp(13px, 1.7vw, 16px)", color: "var(--text-secondary)",
                lineHeight: 1.85, marginBottom: 24,
              }}>
                Full-stack developer and UI/UX designer, cybersecurity major at UOWD Dubai.
                Ships production software, secures systems, and has operated with AED 13M+
                on the line. 20 years old.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#work" onClick={e => { e.preventDefault(); smoothScrollTo("#work"); }} style={{
                  fontFamily: "var(--font-dm-mono)", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--bg-base)", background: "var(--accent)",
                  padding: "12px 24px", borderRadius: 2, textDecoration: "none",
                }}>
                  View Work
                </a>
                <a href="#contact" onClick={e => { e.preventDefault(); smoothScrollTo("#contact"); }} style={{
                  fontFamily: "var(--font-dm-mono)", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-secondary)", border: "1px solid var(--border)",
                  padding: "12px 24px", borderRadius: 2, textDecoration: "none",
                }}>
                  Contact
                </a>
              </div>
            </div>

            {/* Right — terminal + credential tags */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: "0 1 auto" }}>
              <TerminalBlock />
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 7 }}>
              {credentials.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  onClick={e => { e.preventDefault(); smoothScrollTo(c.href); }}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 1.0 + i * 0.07, duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  style={{
                    fontFamily: "var(--font-dm-mono)", fontSize: 10,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: i < 2 ? "var(--accent)" : "var(--text-muted)",
                    border: `1px solid ${i < 2 ? "rgba(0,194,168,0.3)" : "var(--border)"}`,
                    padding: "6px 14px", borderRadius: 2, whiteSpace: "nowrap",
                    textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0,194,168,0.55)";
                    el.style.color = "var(--accent)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = i < 2 ? "rgba(0,194,168,0.3)" : "var(--border)";
                    el.style.color = i < 2 ? "var(--accent)" : "var(--text-muted)";
                  }}
                >
                  {c.label}
                </motion.a>
              ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="hero-scroll-hint"
        style={{
          position: "absolute",
          bottom: "clamp(48px, 7vw, 80px)",
          right: "clamp(20px, 5vw, 72px)",
          display: "flex", alignItems: "center", gap: 12,
        }}
      >
        <span style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 11,
          letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-secondary)",
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 32, height: 1, background: "var(--accent)", opacity: 0.9 }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 480px) {
          .hero-accent-line { display: none; }
          .hero-scroll-hint { display: none; }
        }
      `}</style>
    </section>
  );
}
