"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "MK Properties Inventory System",
    type: "Full-Stack Platform",
    role: "Solo Developer",
    tags: ["Next.js", "Supabase", "PostgreSQL", "RLS", "Python"],
    description:
      "Full internal platform replacing manual spreadsheet processes across the company. Property and asset tracking, role-based access control, automated reporting, and executive dashboards. Eliminated manual data reconciliation completely.",
    outcome: "Live in production · MK Properties Ajman",
    visual: "db",
    accent: "#00C2A8",
    link: "https://www.mkpropertiesinventory.com",
  },
  {
    id: "02",
    title: "Where Art Meets Glow",
    type: "E-Commerce Platform",
    role: "UI/UX Designer + Developer",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase", "Bloom Glass Design System"],
    description:
      "Artisan e-commerce for handmade candles, resin art, pipe cleaner flowers, and crochet. Full Bloom Glass design system built from scratch: warm peach palette, Cormorant Garamond editorial headers, glassmorphism testimonials, product variant logic, animated cart feedback. End-to-end UI/UX and development.",
    outcome: "Production deployment · UAE artisan brand",
    visual: "ecom",
    accent: "#D4637A",
    link: "https://whereartmeetsglow.com",
  },
  {
    id: "03",
    title: "Luxus Glass USA",
    type: "E-Commerce Platform",
    role: "UI/UX Designer + Developer",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "E-Commerce", "Design System"],
    description:
      "Premium glass and luxury home decor e-commerce for the US market. High-end editorial design language, product showcase with immersive visual hierarchy, and a seamless shopping experience built for conversion.",
    outcome: "Live in production · US market",
    visual: "luxus",
    accent: "#C4965A",
    link: "https://luxusglassusa.com",
  },
  {
    id: "04",
    title: "Lead Farming Pipeline",
    type: "Data Engineering",
    role: "Solo Developer",
    tags: ["Python", "Web Scraping", "CRM Integration", "PostgreSQL", "Automation"],
    description:
      "Automated multi-source lead aggregation for real estate Dubai. Scrapes forums, web enquiries, emails, and CRM databases. Deduplication, lead scoring, and automatic routing to sales team. Zero manual intervention in the final pipeline.",
    outcome: "Live pipeline · Real estate vertical",
    visual: "pipeline",
    accent: "#00C2A8",
    link: null,
  },
  {
    id: "05",
    title: "Transport Management System",
    type: "Logistics Platform",
    role: "Team Developer",
    tags: ["React", "Node.js", "Real-time", "Dynamic Pricing", "Maps API"],
    description:
      "Bulk and individual delivery logistics platform for Perfumes Plus, USA. Real-time shipment tracking, dynamic rate management, driver assignment engine, and automated dispatch routing across multi-warehouse distribution.",
    outcome: "Team delivery · US logistics client",
    visual: "network",
    accent: "#00C2A8",
    link: null,
  },
];

// All viz components take inView: boolean and use animate instead of whileInView.
// This fixes mobile Safari/Chrome where IntersectionObserver on SVG children is unreliable.

function DBViz({ inView }: { inView: boolean }) {
  const nodes = [
    { x: 20,  y: 70,  w: 90,  label: "properties" },
    { x: 160, y: 24,  w: 70,  label: "units" },
    { x: 160, y: 108, w: 70,  label: "owners" },
    { x: 290, y: 70,  w: 100, label: "transactions" },
    { x: 450, y: 40,  w: 70,  label: "reports" },
    { x: 450, y: 108, w: 65,  label: "users" },
  ];
  const edges = [
    [nodes[0].x+nodes[0].w, nodes[0].y+16, nodes[1].x, nodes[1].y+16],
    [nodes[0].x+nodes[0].w, nodes[0].y+16, nodes[2].x, nodes[2].y+16],
    [nodes[1].x+nodes[1].w, nodes[1].y+16, nodes[3].x, nodes[3].y+16],
    [nodes[2].x+nodes[2].w, nodes[2].y+16, nodes[3].x, nodes[3].y+16],
    [nodes[3].x+nodes[3].w, nodes[3].y+16, nodes[4].x, nodes[4].y+16],
    [nodes[3].x+nodes[3].w, nodes[3].y+16, nodes[5].x, nodes[5].y+16],
  ];
  return (
    <svg viewBox="0 0 560 160" style={{ width: "100%", height: "100%" }}>
      {edges.map(([x1,y1,x2,y2],i) => (
        <motion.path key={i}
          d={`M${x1},${y1} L${x2},${y2}`}
          stroke="rgba(0,194,168,0.3)" strokeWidth={1} fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }} />
      ))}
      {nodes.map((n,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08 }}
        >
          <rect x={n.x} y={n.y} width={n.w} height={32} rx={3}
            fill="rgba(26,26,32,0.9)" stroke="rgba(0,194,168,0.3)" strokeWidth={1} />
          <text x={n.x+n.w/2} y={n.y+21} textAnchor="middle"
            fill="rgba(122,121,117,1)" fontSize={9} fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function EcomViz({ inView }: { inView: boolean }) {
  const products = [
    { x: 20,  y: 15, w: 95, h: 120, color: "#D4637A", label: "Candle" },
    { x: 130, y: 30, w: 95, h: 100, color: "#C4965A", label: "Resin Art" },
    { x: 240, y: 15, w: 95, h: 120, color: "#8BAF8A", label: "Crochet" },
    { x: 350, y: 30, w: 95, h: 100, color: "#B49BC8", label: "Flowers" },
  ];
  return (
    <svg viewBox="0 0 480 160" style={{ width: "100%", height: "100%" }}>
      {products.map((p,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
        >
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={5}
            fill={`${p.color}14`} stroke={`${p.color}45`} strokeWidth={1} />
          <circle cx={p.x+p.w/2} cy={p.y+p.h/2-10} r={20}
            fill={`${p.color}20`} stroke={`${p.color}40`} strokeWidth={1} />
          <text x={p.x+p.w/2} y={p.y+p.h-10} textAnchor="middle"
            fill={p.color} fontSize={9} fontFamily="monospace" opacity={0.9}>{p.label}</text>
        </motion.g>
      ))}
      <motion.rect x={130} y={143} width={160} height={14} rx={7}
        fill="rgba(212,99,122,0.15)" stroke="rgba(212,99,122,0.4)" strokeWidth={1}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ transformOrigin: "210px 150px" }}
      />
      <text x={210} y={153} textAnchor="middle"
        fill="rgba(212,99,122,0.8)" fontSize={8} fontFamily="monospace">Add to Cart</text>
    </svg>
  );
}

function LuxusViz({ inView }: { inView: boolean }) {
  const panels = [
    { x: 20,  y: 20, w: 120, h: 120, color: "#C4965A" },
    { x: 160, y: 40, w: 80,  h: 80,  color: "#C4965A" },
    { x: 260, y: 20, w: 100, h: 120, color: "#C4965A" },
    { x: 380, y: 35, w: 80,  h: 90,  color: "#C4965A" },
  ];
  return (
    <svg viewBox="0 0 490 160" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4965A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#F5D78E" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {panels.map((p,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
        >
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4}
            fill="url(#gold-grad)" stroke={`${p.color}40`} strokeWidth={1} />
          <rect x={p.x+4} y={p.y+4} width={p.w*0.45} height={p.h*0.3} rx={2}
            fill={`${p.color}12`} />
        </motion.g>
      ))}
      <motion.path d="M20,148 L470,148" stroke="rgba(196,150,90,0.25)" strokeWidth={1} fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <text x="245" y="143" textAnchor="middle" fill="rgba(196,150,90,0.5)"
        fontSize={8} fontFamily="monospace" letterSpacing="4">LUXUS GLASS USA</text>
    </svg>
  );
}

function PipelineViz({ inView }: { inView: boolean }) {
  const stages = ["Sources", "Scrape", "Dedupe", "Score", "Route", "CRM"];
  const boxW = 70;
  const gap = 14;
  const total = stages.length * boxW + (stages.length - 1) * gap;
  const startX = (520 - total) / 2;
  return (
    <svg viewBox="0 0 520 100" style={{ width: "100%", height: "100%" }}>
      {stages.map((s,i) => {
        const x = startX + i * (boxW + gap);
        return (
          <motion.g key={s}
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09, duration: 0.4 }}
          >
            <rect x={x} y={30} width={boxW} height={34} rx={3}
              fill="rgba(26,26,32,0.9)" stroke="rgba(0,194,168,0.28)" strokeWidth={1} />
            <text x={x+boxW/2} y={52} textAnchor="middle"
              fill="rgba(122,121,117,1)" fontSize={9} fontFamily="monospace">{s}</text>
            {i < stages.length - 1 && (
              <motion.path
                d={`M${x+boxW},47 L${x+boxW+gap},47`}
                stroke="rgba(0,194,168,0.45)" strokeWidth={1} fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.09 }}
              />
            )}
          </motion.g>
        );
      })}
      {inView && [0, 1, 2].map(i => (
        <motion.circle key={i} r={3} fill="var(--accent)"
          animate={{ cx: [startX, startX + total, startX] }}
          transition={{ duration: 4, delay: i * 1.35, repeat: Infinity, ease: "linear" }}
          style={{ cy: 47 }}
        />
      ))}
    </svg>
  );
}

function NetworkViz({ inView }: { inView: boolean }) {
  const hubs = [
    {x:50, y:80, r:9, label:"HQ"},    {x:160,y:42, r:6, label:"WH-A"},
    {x:160,y:118,r:6, label:"WH-B"}, {x:280,y:32, r:5, label:"D-1"},
    {x:280,y:80, r:5, label:"D-2"},   {x:280,y:128,r:5, label:"D-3"},
    {x:390,y:56, r:4, label:"CLI"},   {x:390,y:110,r:4, label:"CLI"},
  ];
  const edgePairs = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7]];
  return (
    <svg viewBox="0 0 460 160" style={{ width: "100%", height: "100%" }}>
      {edgePairs.map(([a,b],i) => (
        <motion.path key={i}
          d={`M${hubs[a].x},${hubs[a].y} L${hubs[b].x},${hubs[b].y}`}
          stroke="rgba(0,194,168,0.2)" strokeWidth={1} strokeDasharray="3 3" fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: i * 0.07, duration: 0.6 }}
        />
      ))}
      {hubs.map((h,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 220 }}
          style={{ transformOrigin: `${h.x}px ${h.y}px` }}
        >
          <circle cx={h.x} cy={h.y} r={h.r}
            fill="rgba(0,194,168,0.12)" stroke="rgba(0,194,168,0.55)" strokeWidth={1} />
          <text x={h.x} y={h.y+h.r+11} textAnchor="middle"
            fill="rgba(74,73,70,1)" fontSize={8} fontFamily="monospace">{h.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

type VizKey = "db" | "ecom" | "luxus" | "pipeline" | "network";

function VizRenderer({ type, inView }: { type: VizKey; inView: boolean }) {
  if (type === "db")       return <DBViz inView={inView} />;
  if (type === "ecom")     return <EcomViz inView={inView} />;
  if (type === "luxus")    return <LuxusViz inView={inView} />;
  if (type === "pipeline") return <PipelineViz inView={inView} />;
  if (type === "network")  return <NetworkViz inView={inView} />;
  return null;
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const vizRef = useRef<HTMLDivElement>(null);
  // Observe the viz container div — reliable on all browsers including mobile Safari
  const inView = useInView(vizRef, { once: true, margin: "0px" });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 6,
        overflow: "hidden",
        background: "var(--bg-surface)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        borderColor: hovered ? "rgba(0,194,168,0.25)" : "rgba(240,238,232,0.06)",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.35)" : "none",
      }}
    >
      {/* Viz area — this div is what we observe */}
      <div
        ref={vizRef}
        style={{
          height: 160,
          borderBottom: "1px solid var(--border)",
          background: "rgba(9,9,12,0.6)",
          padding: 16,
          overflow: "hidden",
        }}
      >
        <VizRenderer type={project.visual as VizKey} inView={inView} />
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(16px, 3vw, 24px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
          <span style={{
            fontFamily: "var(--font-dm-mono)", fontSize: 9,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--accent)", opacity: 0.7,
          }}>
            {project.id}
          </span>
          <span style={{
            fontFamily: "var(--font-dm-mono)", fontSize: 9,
            letterSpacing: "0.12em", color: "var(--text-muted)",
            border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 2,
          }}>
            {project.role}
          </span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-syne)", fontWeight: 700,
          fontSize: "clamp(15px, 2vw, 19px)", color: "var(--text-primary)",
          lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 6,
        }}>
          {project.title}
        </h3>

        <div style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 9,
          letterSpacing: "0.14em", color: "var(--text-muted)", marginBottom: 14,
        }}>
          {project.type}
        </div>

        <p style={{
          fontFamily: "var(--font-dm-sans)", fontWeight: 400,
          fontSize: 13, color: "var(--text-primary)",
          lineHeight: 1.75, marginBottom: 18, opacity: 0.9,
        }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 9,
              letterSpacing: "0.1em", color: "var(--text-muted)",
              background: "rgba(240,238,232,0.03)",
              border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 2,
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12, paddingTop: 14, borderTop: "1px solid var(--border)", flexWrap: "wrap",
        }}>
          <div style={{
            fontFamily: "var(--font-dm-mono)", fontSize: 9,
            letterSpacing: "0.14em", color: "var(--accent)", opacity: 0.65,
          }}>
            {project.outcome}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-dm-mono)", fontSize: 9,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--accent)", border: "1px solid rgba(0,194,168,0.3)",
                padding: "4px 12px", borderRadius: 2, textDecoration: "none",
                whiteSpace: "nowrap", transition: "background 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,194,168,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Visit Site ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="work"
      ref={ref}
      style={{ padding: "clamp(64px, 12vw, 140px) clamp(20px, 5vw, 80px)", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div style={{ y: headerY, marginBottom: "clamp(40px, 7vw, 72px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 10,
              letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)",
            }}>
              02 · Work
            </span>
            <div style={{ height: 1, flex: 1, minWidth: 40, background: "var(--border)" }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-syne)", fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 60px)", color: "var(--text-primary)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
          }}>
            Shipped in <span style={{ color: "var(--accent)" }}>Production</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans)", fontWeight: 300,
            fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--text-secondary)",
            lineHeight: 1.8, maxWidth: 520, marginTop: 14,
          }}>
            Full-stack platforms, UI/UX design systems, data pipelines. Not tutorials. Real deployments, real users, real stakes.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
          gap: "clamp(14px, 2vw, 20px)",
        }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
