"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

type HistoryEntry = { input: string; output: string[] };

const COMMANDS: Record<string, string[]> = {
  help: [
    "available commands:",
    "  whoami      → who is this guy",
    "  skills      → full tech stack",
    "  projects    → shipped work",
    "  experience  → career timeline",
    "  status      → availability",
    "  contact     → get in touch",
    "  clear       → clear terminal",
  ],
  whoami: [
    "Muhammad Muneeb Kashif, 20.",
    "Full-stack dev · UI/UX designer · security major.",
    "Built production software, managed AED 13M+,",
    "closed AED 9M in real estate. All before 21.",
    "Currently: UOWD Dubai, BSc CS · Cybersecurity.",
  ],
  skills: [
    "frontend:  next.js · react · typescript · tailwind",
    "backend:   python · supabase · laravel · postgresql",
    "design:    figma · ui/ux · design systems",
    "security:  network security · ethical hacking",
    "tools:     git · vercel · rest apis · crm systems",
  ],
  projects: [
    "01 · MK Properties Inventory System",
    "     next.js · supabase · postgresql · python",
    "02 · Where Art Meets Glow (e-commerce)",
    "     next.js · tailwind · framer motion",
    "03 · Luxus Glass USA (e-commerce)",
    "     next.js · design system · us market",
    "04 · Lead Farming Pipeline",
    "     python · web scraping · crm integration",
    "05 · Transport Management System",
    "     react · node.js · real-time · maps api",
  ],
  experience: [
    "MK Properties Ajman  [Aug 2024 – Mar 2026]",
    "  · Software Developer (full-stack, solo)",
    "  · Accounts & Fund Manager (AED 4M+)",
    "  · Sales Executive (AED 9M+ closed)",
    "",
    "MK Motors            [May 2024 – Aug 2024]",
    "  · Sales Executive, B2C vehicle sales",
    "",
    "Freelance            [Jan 2026 – Mar 2026]",
    "  · UI/UX Designer & Developer, 3 clients",
  ],
  status: [
    "availability:   open to work ✓",
    "roles:          developer · designer · freelance",
    "location:       Ajman, UAE · remote OK",
    "response time:  < 24 hours",
    "email:          muneebkashif267@gmail.com",
  ],
  contact: [
    "email:    muneebkashif267@gmail.com",
    "linkedin: linkedin.com/in/muneeb-kashif-443050331",
    "github:   github.com/muneebfr-fr",
    "",
    "or just scroll up and click the email ↑",
  ],
};

const COMMAND_CHIPS = ["help", "whoami", "skills", "projects", "experience", "status", "contact"];

const WELCOME = [
  "muneeb.sh — interactive terminal",
  "type a command or click one below ↓",
];

function TerminalBlock() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true, margin: "-60px" });
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);

  // Scroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory(prev => [cmd, ...prev]);
    setCmdIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const output = COMMANDS[cmd] ?? [
      `command not found: ${cmd}`,
      "type 'help' to see available commands.",
    ];

    setHistory(prev => [...prev, { input: cmd, output }]);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    }
  }

  function handleChip(cmd: string) {
    runCommand(cmd);
    inputRef.current?.focus();
  }

  return (
    <div ref={wrapperRef} style={{ width: "100%", maxWidth: 440, minWidth: 280, flexShrink: 0 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {/* Terminal window */}
        <div
          onClick={() => inputRef.current?.focus()}
          style={{
            background: "rgba(9,9,12,0.85)",
            border: "1px solid rgba(0,194,168,0.2)",
            borderRadius: 6,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            cursor: "text",
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
            }}>muneeb.sh</span>
          </div>

          {/* Output body */}
          <div
            ref={bodyRef}
            style={{
              padding: "14px 16px",
              height: 240,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              scrollbarWidth: "none",
            }}
          >
            {/* Welcome */}
            {WELCOME.map((line, i) => (
              <div key={i} style={{
                fontFamily: "var(--font-dm-mono)", fontSize: 11, lineHeight: 1.6,
                color: i === 0 ? "var(--accent)" : "rgba(240,238,232,0.35)",
              }}>{line}</div>
            ))}

            {/* History */}
            {history.map((entry, i) => (
              <div key={i} style={{ marginTop: 6 }}>
                <div style={{ display: "flex", fontFamily: "var(--font-dm-mono)", fontSize: 11, lineHeight: 1.6 }}>
                  <span style={{ color: "rgba(0,194,168,0.6)", marginRight: 6, flexShrink: 0 }}>$</span>
                  <span style={{ color: "var(--text-primary)" }}>{entry.input}</span>
                </div>
                {entry.output.map((line, j) => (
                  <div key={j} style={{
                    fontFamily: "var(--font-dm-mono)", fontSize: 11, lineHeight: 1.7,
                    color: line === "" ? undefined : line.includes("✓") ? "#00C2A8" : "rgba(240,238,232,0.65)",
                    paddingLeft: 14,
                  }}>{line}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Input row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px",
            borderTop: "1px solid rgba(240,238,232,0.06)",
          }}>
            <span style={{ color: "rgba(0,194,168,0.7)", fontFamily: "var(--font-dm-mono)", fontSize: 11, flexShrink: 0 }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              spellCheck={false}
              autoComplete="off"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-dm-mono)",
                fontSize: 11,
                color: "var(--text-primary)",
                caretColor: "var(--accent)",
              }}
            />
          </div>
        </div>

        {/* Command chips legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {COMMAND_CHIPS.map(cmd => (
            <button
              key={cmd}
              onClick={() => handleChip(cmd)}
              style={{
                fontFamily: "var(--font-dm-mono)", fontSize: 10,
                letterSpacing: "0.14em", textTransform: "lowercase",
                color: "var(--text-muted)",
                background: "transparent",
                border: "1px solid var(--border)",
                padding: "4px 12px", borderRadius: 3,
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,168,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
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

          {/* Email + Terminal row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(32px, 5vw, 64px)",
            flexWrap: "wrap",
            marginBottom: 48,
            textAlign: "left",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <ScrambleEmail />
              {/* Social links */}
              <div style={{ display: "flex", gap: 32 }}>
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
            </div>
            <TerminalBlock />
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
