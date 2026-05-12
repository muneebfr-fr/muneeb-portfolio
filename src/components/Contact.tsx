"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const EMAIL = "muneebkashif267@gmail.com";
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789@._";

function ScrambleEmail() {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(() => EMAIL.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!isInView || revealed) return;
    let frame: number;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const lockedCount = Math.floor(progress * EMAIL.length);
      const next = EMAIL.split("").map((char, i) => {
        if (i < lockedCount) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");
      setDisplay(next);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(EMAIL);
        setRevealed(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, revealed]);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <motion.span
        ref={ref}
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 300,
          fontSize: "clamp(20px, 3.5vw, 40px)",
          color: copied ? "var(--accent)" : "var(--text-primary)",
          borderBottom: `1px solid ${copied ? "var(--accent)" : "rgba(0,194,168,0.3)"}`,
          paddingBottom: 4,
          cursor: "pointer",
          letterSpacing: copied ? "0.04em" : "0",
          transition: "color 0.3s ease, border-color 0.3s ease, letter-spacing 0.3s ease",
          display: "inline-block",
          userSelect: "none",
        }}
      >
        {copied ? "copied ✓" : display}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        click to copy
      </motion.span>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "clamp(80px, 14vw, 160px) 2rem",
        position: "relative",
        textAlign: "center",
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,194,168,0.04) 0%, transparent 70%)",
      }}
    >
      <div className="section-divider" style={{ marginBottom: "clamp(60px, 10vw, 100px)" }} />

      <motion.div style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: 24,
            }}
          >
            06 · Contact
          </span>

          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 300,
              fontSize: "clamp(36px, 6vw, 80px)",
              color: "var(--text-primary)",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            Let&apos;s Build Something
          </h2>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(15px, 2vw, 17px)",
              fontWeight: 300,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 480,
              margin: "0 auto 56px",
            }}
          >
            Open to developer roles, security research opportunities, and
            interesting freelance projects.
          </p>

          {/* Email CTA */}
          <div style={{ marginBottom: 48 }}>
            <ScrambleEmail />
          </div>

          {/* Social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/muneeb-kashif-443050331/" },
              { label: "GitHub", href: "https://github.com/muneebfr-fr" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div
        style={{
          marginTop: "clamp(60px, 10vw, 100px)",
          paddingTop: 32,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
          }}
        >
          © 2026 Muhammad Muneeb Kashif
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
          }}
        >
          Ajman, UAE · Built with Next.js
        </span>
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); smoothScrollTo("#hero"); }}
          style={{
            fontFamily: "var(--font-dm-mono)", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--bg-base)", background: "var(--accent)",
            textDecoration: "none",
            padding: "12px 24px", borderRadius: 2,
            transition: "opacity 0.2s",
            display: "flex", alignItems: "center", gap: 8,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.opacity = "0.85";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          ↑ Back to Top
        </a>
      </div>
    </section>
  );
}
