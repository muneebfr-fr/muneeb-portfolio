"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const row1 = [
  "JavaScript", "Python", "SQL", "Next.js", "React Native", "Node.js",
  "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion", "TypeScript",
];
const row2 = [
  "Ethical Hacking", "Linux", "NIST", "Network Security", "Figma",
  "shadcn/ui", "Expo", "Laravel", "REST APIs", "Git", "Cybersecurity",
];

function Pill({ text }: { text: string }) {
  return (
    <span
      style={{
        flexShrink: 0,
        fontFamily: "var(--font-dm-mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        color: "var(--text-secondary)",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        padding: "8px 20px",
        borderRadius: 4,
        whiteSpace: "nowrap",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,168,0.3)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {text}
    </span>
  );
}

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="stack"
      ref={ref}
      style={{ padding: "clamp(80px, 12vw, 140px) 0", position: "relative", overflow: "hidden" }}
    >
      {/* Header — padded */}
      <motion.div style={{ y, padding: "0 2rem", marginBottom: "clamp(40px, 6vw, 64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: 16,
            }}
          >
            05 · Stack
          </span>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--text-primary)",
              lineHeight: 1.05,
            }}
          >
            Tools of the{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Trade</em>
          </h2>
        </div>
      </motion.div>

      {/* Marquee row 1 */}
      <div style={{ position: "relative", marginBottom: 16, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
            background: "linear-gradient(to right, var(--bg-base), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
            background: "linear-gradient(to left, var(--bg-base), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          className="animate-marquee"
          style={{ display: "flex", gap: 12, width: "max-content" }}
        >
          {[...row1, ...row1].map((text, i) => <Pill key={i} text={text} />)}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
            background: "linear-gradient(to right, var(--bg-base), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
            background: "linear-gradient(to left, var(--bg-base), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          className="animate-marquee-reverse"
          style={{ display: "flex", gap: 12, width: "max-content" }}
        >
          {[...row2, ...row2].map((text, i) => <Pill key={i} text={text} />)}
        </div>
      </div>
    </section>
  );
}
