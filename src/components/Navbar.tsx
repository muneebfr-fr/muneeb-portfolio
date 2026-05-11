"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Work", "Security", "Experience", "Stack", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-60px 0px 0px 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        animate={{
          background: scrolled ? "rgba(9,9,12,0.80)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.3)" : "none",
          borderBottomColor: scrolled ? "rgba(240,238,232,0.06)" : "transparent",
        }}
        transition={{ duration: 0.35 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid transparent",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
              padding: "6px 10px",
              border: "1px solid transparent",
              borderRadius: 2,
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,168,0.3)";
              (e.currentTarget as HTMLElement).style.background = "rgba(0,194,168,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            MMK
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ gap: 40, alignItems: "center" }}
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:
                    active === link.toLowerCase()
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  position: "relative",
                }}
              >
                {link}
                {active === link.toLowerCase() && (
                  <motion.div
                    layoutId="nav-dot"
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: "var(--accent)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              padding: 8,
              cursor: "pointer",
            }}
          >
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                style={{ display: "block", height: 1, background: "currentColor", transformOrigin: "center" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ display: "block", height: 1, background: "currentColor" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                style={{ display: "block", height: 1, background: "currentColor", transformOrigin: "center" }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--bg-base)",
              zIndex: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(2rem, 8vw, 3.5rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
