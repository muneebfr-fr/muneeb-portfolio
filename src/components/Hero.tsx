"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";

const credentials = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "Cybersecurity Major",
  "CS · UOWD Dubai",
  "Google Certified",
  "AED 13M+ Deployed",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const nameY = useTransform(smooth, [0, 1], [0, 80]);
  const credY = useTransform(smooth, [0, 1], [0, 40]);
  const gridOpacity = useTransform(smooth, [0, 0.8], [1, 0]);

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
          Portfolio · 2025
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
            Developer · Designer · Security Researcher
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
                whiteSpace: "nowrap",
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
                <a href="#work" style={{
                  fontFamily: "var(--font-dm-mono)", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--bg-base)", background: "var(--accent)",
                  padding: "12px 24px", borderRadius: 2, textDecoration: "none",
                }}>
                  View Work
                </a>
                <a href="#contact" style={{
                  fontFamily: "var(--font-dm-mono)", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-secondary)", border: "1px solid var(--border)",
                  padding: "12px 24px", borderRadius: 2, textDecoration: "none",
                }}>
                  Contact
                </a>
              </div>
            </div>

            {/* Right — credential tags */}
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 7, flex: "0 1 auto" }}>
              {credentials.map((c, i) => (
                <motion.span
                  key={c}
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
                    padding: "4px 12px", borderRadius: 2, whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </motion.span>
              ))}
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
          fontFamily: "var(--font-dm-mono)", fontSize: 9,
          letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-muted)",
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 24, height: 1, background: "var(--accent)", opacity: 0.5 }}
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
