"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const words = "I build production systems. I study how they fail. I've operated in environments where both skills matter — with millions on the line.".split(" ");

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(80px, 14vw, 160px) 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="section-divider" style={{ marginBottom: "clamp(60px, 10vw, 120px)" }} />

      <motion.div style={{ y, maxWidth: 1200, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            01 — Manifesto
          </span>
        </div>

        {/* Large word-by-word reveal */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.045 } },
          }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(28px, 4.5vw, 64px)",
            lineHeight: 1.15,
            color: "var(--text-primary)",
            maxWidth: 900,
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </motion.div>

      <div className="section-divider" style={{ marginTop: "clamp(60px, 10vw, 120px)" }} />
    </section>
  );
}
