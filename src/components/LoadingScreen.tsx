"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"distort" | "clear" | "hold">("distort");
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const rafRef = useRef<number>(0);

  const skip = () => {
    cancelAnimationFrame(rafRef.current);
    setVisible(false);
    setTimeout(onComplete, 600);
  };

  useEffect(() => {
    const DISTORT_DURATION = 2200;
    let start: number | null = null;

    const animateFilter = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / DISTORT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const scale = 90 - 86 * eased;
      dispRef.current?.setAttribute("scale", String(scale.toFixed(2)));

      const fx = 0.028 - 0.022 * eased;
      const fy = 0.036 - 0.029 * eased;
      turbRef.current?.setAttribute("baseFrequency", `${fx.toFixed(4)} ${fy.toFixed(4)}`);

      if (progress < 0.5) setPhase("distort");
      else setPhase("clear");

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateFilter);
      } else {
        setPhase("hold");
      }
    };

    rafRef.current = requestAnimationFrame(animateFilter);

    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 900);
    }, 4400);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#09090C",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* SVG filter */}
          <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
            <defs>
              <filter id="glass-distort" x="-80%" y="-80%" width="260%" height="260%">
                <feTurbulence ref={turbRef} type="turbulence"
                  baseFrequency="0.028 0.036" numOctaves="5" seed="12" result="noise" />
                <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise"
                  scale="90" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Ambient glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,194,168,0.055) 0%, transparent 70%)",
          }} />

          {/* Glass orb — top left */}
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "8%", left: "6%", pointerEvents: "none",
              width: "clamp(180px, 22vw, 320px)", height: "clamp(180px, 22vw, 320px)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.06) 0%, rgba(0,194,168,0.04) 40%, transparent 70%)",
              border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(1px)",
            }} />

          {/* Glass orb — bottom right */}
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: "5%", right: "4%", pointerEvents: "none",
              width: "clamp(120px, 16vw, 240px)", height: "clamp(120px, 16vw, 240px)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 60% 40%, rgba(0,194,168,0.07) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)",
              border: "1px solid rgba(0,194,168,0.08)", backdropFilter: "blur(2px)",
            }} />

          {/* Caustic streak */}
          <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.0, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "38%", left: "50%",
              transform: "translateX(-50%)", transformOrigin: "center", pointerEvents: "none",
              width: "clamp(200px, 40vw, 560px)", height: 1,
              background: "linear-gradient(to right, transparent, rgba(0,194,168,0.18), rgba(255,255,255,0.12), rgba(0,194,168,0.18), transparent)",
            }} />

          {/* Monogram */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              position: "absolute", top: "clamp(28px, 4vw, 48px)", left: "clamp(28px, 4vw, 48px)",
              fontFamily: "var(--font-dm-mono)", fontSize: 10,
              letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,194,168,0.55)",
            }}>
            MMK
          </motion.div>

          {/* Skip button — appears after 1s */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={skip}
            style={{
              position: "absolute", top: "clamp(28px, 4vw, 48px)", right: "clamp(28px, 4vw, 48px)",
              background: "none", border: "1px solid rgba(240,238,232,0.1)",
              color: "rgba(240,238,232,0.35)", fontFamily: "var(--font-dm-mono)",
              fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
              padding: "6px 14px", borderRadius: 2, cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
              zIndex: 10,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,168,0.4)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,238,232,0.1)";
              (e.currentTarget as HTMLElement).style.color = "rgba(240,238,232,0.35)";
            }}
          >
            Skip
          </motion.button>

          {/* Main distorted text */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", filter: "url(#glass-distort)" }}>
            <h1 style={{
              fontFamily: "var(--font-syne)", fontWeight: 800,
              fontSize: "clamp(36px, 7.5vw, 96px)", color: "#F0EEE8",
              letterSpacing: "-0.03em", lineHeight: 1.0, margin: 0, userSelect: "none",
            }}>
              Welcome to<br />
              <span style={{ color: "#00C2A8" }}>my domain</span>
            </h1>
          </div>

          {/* Sub-label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase === "hold" ? 0.45 : 0, y: phase === "hold" ? 0 : 12 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: "28%", left: "50%", transform: "translateX(-50%)",
              fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.32em",
              textTransform: "uppercase", color: "rgba(240,238,232,0.5)", whiteSpace: "nowrap",
            }}>
            Muhammad Muneeb Kashif
          </motion.div>

          {/* Progress bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 1, background: "rgba(240,238,232,0.04)",
          }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 4.2, ease: "linear" }}
              style={{
                height: "100%", transformOrigin: "left",
                background: "linear-gradient(to right, transparent, #00C2A8, rgba(0,194,168,0.4))",
              }} />
          </div>

          {/* Pulse dot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 1] }}
            transition={{ delay: 0.5, duration: 2, repeat: Infinity, repeatType: "mirror" }}
            style={{
              position: "absolute", bottom: "clamp(28px, 4vw, 48px)", right: "clamp(28px, 4vw, 48px)",
              width: 5, height: 5, borderRadius: "50%",
              background: "#00C2A8", boxShadow: "0 0 10px rgba(0,194,168,0.6)",
            }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
