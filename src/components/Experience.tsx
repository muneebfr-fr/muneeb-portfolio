"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

const roles = [
  {
    company: "MK Properties Ajman",
    period: "Aug 2024 to Mar 2026",
    roles: [
      {
        title: "Software Developer",
        type: "Part-time",
        bullets: [
          "Built full-stack inventory management system from scratch, digitizing property and asset tracking and eliminating manual processes",
          "Automated lead farming pipeline aggregating from forums, web enquiries, emails, and CRM databases",
          "Stack: Next.js, Supabase, PostgreSQL, Python, Laravel",
        ],
      },
      {
        title: "Accounts, Investments & Fund Manager",
        type: "Simultaneous",
        bullets: [
          "Managed AED 4,000,000+ in company funds: financial analysis, reconciliation, investment portfolio tracking",
          "Prepared executive-level reporting and performance dashboards",
          "Handled investment portfolio monitoring and strategic recommendations",
        ],
      },
      {
        title: "Sales Executive",
        type: "Simultaneous",
        bullets: [
          "Closed AED 9,000,000+ in cumulative real estate transactions",
          "Full client lifecycle management from acquisition to close",
          "B2B and B2C deal negotiation across residential and commercial segments",
        ],
      },
    ],
    highlight: "3 simultaneous roles at peak",
  },
  {
    company: "MK Motors",
    period: "May 2024 to Aug 2024",
    roles: [
      {
        title: "Sales Executive",
        type: "B2C Vehicle Sales",
        bullets: [
          "B2C vehicle sales with full client lifecycle ownership",
          "Negotiation and objection handling across high-value automotive transactions",
          "Developed consultative sales methodology and deal closing frameworks",
        ],
      },
    ],
    highlight: null,
  },
  {
    company: "Freelance",
    period: "Jan 2026 to Mar 2026",
    roles: [
      {
        title: "UI/UX Designer & Web Developer",
        type: "3 Clients",
        bullets: [
          "End-to-end delivery for 3 clients: from discovery and wireframes to production deployment",
          "Design systems, component libraries, and responsive interfaces",
          "Full client ownership: requirements, design, development, QA, handoff",
        ],
      },
    ],
    highlight: "3 clients delivered end-to-end",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vw, 140px) 2rem",
        position: "relative",
        background: "linear-gradient(to bottom, var(--bg-base) 0%, var(--bg-surface) 40%, var(--bg-base) 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div style={{ y, marginBottom: "clamp(48px, 8vw, 80px)" }}>
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
            04 · Experience
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
            Real Stakes.{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Real Scale.</em>
          </h2>
        </motion.div>

        {/* Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
            marginBottom: 64,
            paddingBottom: 40,
            borderBottom: "1px solid var(--border)",
          }}
        >
          {[
            { value: 4000000, prefix: "AED ", suffix: "+", label: "Company Funds Managed" },
            { value: 9000000, prefix: "AED ", suffix: "+", label: "Real Estate Closed" },
            { value: 3, suffix: "", label: "Freelance Clients Delivered" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 3.5vw, 40px)",
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.prefix}
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {roles.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grad-border-wrap"
              style={{ borderRadius: 12 }}
            >
              <div className="grad-border-glow" />
              <div
                className="metallic-card shimmer-top"
                style={{ borderRadius: 12, padding: "clamp(24px, 4vw, 36px)" }}
              >
                {/* Company header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 28,
                    paddingBottom: 20,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontWeight: 600,
                        fontSize: "clamp(20px, 2.5vw, 28px)",
                        color: "var(--text-primary)",
                        marginBottom: 4,
                      }}
                    >
                      {item.company}
                    </h3>
                    {item.highlight && (
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: 9,
                          letterSpacing: "0.16em",
                          color: "var(--accent)",
                          opacity: 0.75,
                          border: "1px solid rgba(0,194,168,0.25)",
                          padding: "3px 10px",
                          borderRadius: 3,
                        }}
                      >
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Roles */}
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {item.roles.map((role, ri) => (
                    <div key={role.title} style={{ display: "flex", gap: 20 }}>
                      {/* Left dot */}
                      <div style={{ flexShrink: 0, paddingTop: 4 }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            boxShadow: "0 0 8px rgba(0,194,168,0.4)",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 12,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontWeight: 500,
                              fontSize: 15,
                              color: "var(--text-primary)",
                            }}
                          >
                            {role.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-dm-mono)",
                              fontSize: 9,
                              letterSpacing: "0.14em",
                              color: "var(--text-muted)",
                              border: "1px solid var(--border)",
                              padding: "2px 8px",
                              borderRadius: 3,
                            }}
                          >
                            {role.type}
                          </span>
                        </div>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                          {role.bullets.map((bullet, bi) => (
                            <li
                              key={bi}
                              style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontSize: 14,
                                fontWeight: 300,
                                color: "var(--text-secondary)",
                                lineHeight: 1.75,
                                paddingLeft: 16,
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "0.6em",
                                  width: 4,
                                  height: 1,
                                  background: "var(--accent)",
                                  opacity: 0.5,
                                }}
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            marginTop: 40,
            padding: "20px 28px",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "rgba(9,9,12,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          >
            Academic
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              fontWeight: 300,
              color: "var(--text-secondary)",
            }}
          >
            BSc Computer Science, Cybersecurity · University of Wollongong Dubai · 2nd Year ·{" "}
            <span style={{ color: "var(--accent)" }}>Distinction standing</span> under Australian curriculum
          </div>
        </motion.div>
      </div>
    </section>
  );
}
