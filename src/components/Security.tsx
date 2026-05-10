"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const capabilities = [
  {
    area: "Reconnaissance & OSINT",
    tools: ["Shodan", "Censys", "Maltego", "WHOIS", "theHarvester"],
    description: "Passive and active information gathering. Network footprinting, asset discovery, exposure mapping.",
    level: 75,
  },
  {
    area: "Network Security",
    tools: ["Wireshark", "Nmap", "Netcat", "tcpdump", "ARP analysis"],
    description: "Protocol analysis, port scanning, traffic inspection. ARP spoofing, VLAN hopping, packet crafting.",
    level: 72,
  },
  {
    area: "Vulnerability Assessment",
    tools: ["Burp Suite", "Nessus", "Nikto", "OpenVAS", "Metasploit"],
    description: "Web application testing, CVE analysis, exploit research. Default credential auditing, OWASP Top 10.",
    level: 68,
  },
  {
    area: "Threat Intelligence",
    tools: ["MITRE ATT&CK", "NIST", "VirusTotal", "OTX", "STIX/TAXII"],
    description: "Threat actor profiling, TTPs mapping, IOC analysis. ICS/OT threat landscape research.",
    level: 70,
  },
  {
    area: "Linux & Systems",
    tools: ["Kali Linux", "Bash", "Cron", "iptables", "SSH hardening"],
    description: "Intermediate Linux administration. Security hardening, service enumeration, privilege escalation concepts.",
    level: 73,
  },
  {
    area: "Secure Development",
    tools: ["OWASP", "JWT", "Supabase RLS", "SQL injection defense", "Auth flows"],
    description: "Building with security from the start. Row-level security, auth architecture, input validation, rate limiting.",
    level: 80,
  },
];

const frameworks = [
  "NIST Cybersecurity Framework",
  "MITRE ATT&CK for ICS",
  "OWASP Top 10",
  "CIA Triad",
  "Kill Chain Methodology",
  "Google Cybersecurity Certificate",
];

function AttackGraph({ inView }: { inView: boolean }) {
  const nodes = [
    { id: "actor", x: 50,  y: 90,  label: "IRGC",       color: "#ef4444" },
    { id: "recon", x: 170, y: 50,  label: "Shodan\nRecon", color: "#f97316" },
    { id: "creds", x: 170, y: 130, label: "Default\nCreds", color: "#f97316" },
    { id: "plc",   x: 300, y: 90,  label: "Unitronics\nPLC", color: "#00C2A8" },
    { id: "hmi",   x: 420, y: 90,  label: "HMI\nDefaced",   color: "#ef4444" },
  ];
  const edgePairs: [number,number][] = [[0,1],[0,2],[1,3],[2,3],[3,4]];

  return (
    <svg viewBox="0 0 490 180" style={{ width: "100%", height: 160 }}>
      <defs>
        <marker id="arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(239,68,68,0.45)" />
        </marker>
      </defs>
      {edgePairs.map(([a,b],i) => (
        <motion.path key={i}
          d={`M${nodes[a].x+30},${nodes[a].y} L${nodes[b].x-30},${nodes[b].y}`}
          stroke="rgba(239,68,68,0.25)" strokeWidth={1} fill="none"
          markerEnd="url(#arr)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
        />
      ))}
      {nodes.map((n,i) => (
        <motion.g key={n.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.05 + i * 0.1, type: "spring", stiffness: 220 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <rect x={n.x-30} y={n.y-20} width={60} height={40} rx={3}
            fill={`${n.color}10`} stroke={`${n.color}50`} strokeWidth={1} />
          {n.label.split("\n").map((line, li) => (
            <text key={li} x={n.x} y={n.y - 5 + li * 14} textAnchor="middle"
              fill={n.color} fontSize={9} fontFamily="monospace">{line}</text>
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

export default function Security() {
  const ref = useRef<HTMLElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const graphInView = useInView(graphRef, { once: true, margin: "0px" });

  return (
    <section
      id="security"
      ref={ref}
      style={{
        padding: "clamp(64px, 12vw, 140px) clamp(20px, 5vw, 80px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <motion.div style={{ y: headerY, marginBottom: "clamp(40px, 7vw, 80px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 10,
              letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)",
            }}>
              03 · Cybersecurity
            </span>
            <div style={{ height: 1, flex: 1, minWidth: 40, background: "var(--border)" }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-syne)", fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 60px)", color: "var(--text-primary)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
          }}>
            Security <span style={{ color: "var(--accent)" }}>Arsenal</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans)", fontWeight: 300,
            fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--text-secondary)",
            lineHeight: 1.8, maxWidth: 560, marginTop: 16,
          }}>
            Active practice in offensive and defensive security. Google certified.
            Ethical hacking curriculum in progress. Below is where I actually operate.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 1,
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 48,
        }}>
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.area}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{
                padding: "clamp(20px, 3vw, 28px)",
                background: "var(--bg-surface)",
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{ background: "rgba(17,17,21,0.98)" }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                style={{
                  position: "absolute", top: 0, left: 0,
                  height: 2, width: `${cap.level}%`,
                  background: "var(--accent)", opacity: 0.6, transformOrigin: "left",
                }}
              />
              <div style={{
                fontFamily: "var(--font-syne)", fontWeight: 600,
                fontSize: "clamp(13px, 1.5vw, 14px)", color: "var(--text-primary)",
                marginBottom: 10, letterSpacing: "-0.01em",
              }}>
                {cap.area}
              </div>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontWeight: 300,
                fontSize: 13, color: "var(--text-secondary)",
                lineHeight: 1.7, marginBottom: 16,
              }}>
                {cap.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cap.tools.map(t => (
                  <span key={t} style={{
                    fontFamily: "var(--font-dm-mono)", fontSize: 9,
                    letterSpacing: "0.12em", color: "var(--accent)", opacity: 0.65,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Frameworks strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 64,
            padding: "20px 0", borderTop: "1px solid var(--border)",
          }}
        >
          <span style={{
            fontFamily: "var(--font-dm-mono)", fontSize: 9,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--text-muted)", marginRight: 8, alignSelf: "center",
          }}>
            Frameworks:
          </span>
          {frameworks.map(f => (
            <span key={f} style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 9,
              letterSpacing: "0.12em", color: "var(--text-secondary)",
              border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 2,
            }}>
              {f}
            </span>
          ))}
        </motion.div>

        {/* Case study */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: 8, overflow: "hidden",
          }}
        >
          <div style={{
            padding: "14px clamp(16px, 3vw, 28px)",
            borderBottom: "1px solid rgba(239,68,68,0.1)",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 12,
            background: "rgba(239,68,68,0.03)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#ef4444", animation: "pulse-glow 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-dm-mono)", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#ef4444", opacity: 0.8,
              }}>
                Research Case · CyberAv3ngers · TLP:WHITE
              </span>
            </div>
            <span style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 9,
              color: "var(--text-muted)", letterSpacing: "0.12em",
            }}>
              IRGC-affiliated · Critical Infrastructure · Dec 2023
            </span>
          </div>

          <div style={{
            padding: "clamp(20px, 4vw, 40px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--font-syne)", fontWeight: 700,
                fontSize: "clamp(17px, 2.5vw, 26px)", color: "var(--text-primary)",
                marginBottom: 12, letterSpacing: "-0.01em",
              }}>
                IRGC-Affiliated Attack on US Water Infrastructure
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontWeight: 300,
                fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20,
              }}>
                Analyzed CyberAv3ngers campaign targeting Unitronics Vision PLCs across US
                water treatment facilities. Mapped full attack chain from Shodan reconnaissance
                through default-credential exploitation to HMI defacement. Assessed MITRE
                ATT&CK for ICS mapping and defensive hardening recommendations.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["T0855 Unauthorized Command", "T0869 Default Credentials", "ICS/OT", "PCOM Protocol"].map(t => (
                  <span key={t} style={{
                    fontFamily: "var(--font-dm-mono)", fontSize: 9,
                    letterSpacing: "0.1em", color: "var(--text-muted)",
                    border: "1px solid rgba(239,68,68,0.15)", padding: "3px 10px", borderRadius: 2,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              ref={graphRef}
              style={{
                background: "rgba(9,9,12,0.6)",
                border: "1px solid rgba(239,68,68,0.1)",
                borderRadius: 6, padding: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: 160,
              }}
            >
              <AttackGraph inView={graphInView} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
