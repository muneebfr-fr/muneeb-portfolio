"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
          <a
            href="mailto:muneebkashif267@gmail.com"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 300,
              fontSize: "clamp(20px, 3.5vw, 40px)",
              color: "var(--text-primary)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(0,194,168,0.3)",
              paddingBottom: 4,
              transition: "color 0.2s ease, border-color 0.2s ease",
              display: "inline-block",
              marginBottom: 48,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,168,0.3)";
            }}
          >
            muneebkashif267@gmail.com
          </a>

          {/* Social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/muneeb-kashif-443050331/" },
              { label: "GitHub", href: "https://github.com/muneebkashif" },
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
      </div>
    </section>
  );
}
