"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  },
  {
    id: "03",
    title: "Studentopia",
    type: "Campus Super-App",
    role: "Full-Stack Developer",
    tags: ["Next.js 16", "Supabase", "React", "Tailwind CSS", "ATS"],
    description:
      "Campus community marketplace for Pakistani university students. Dark mode elevation system, 3-panel ATS for job seekers, mentor hub, student courses, and recruiter subscription model. Real-time presence, multi-role auth, full e-commerce layer.",
    outcome: "In development · Pakistan university market",
    visual: "platform",
    accent: "#6366F1",
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
  },
];

function DBViz() {
  const nodes = [
    { x: 40, y: 70, w: 90, label: "properties" },
    { x: 180, y: 30, w: 70, label: "units" },
    { x: 180, y: 110, w: 70, label: "owners" },
    { x: 310, y: 70, w: 110, label: "transactions" },
    { x: 480, y: 50, w: 80, label: "reports" },
    { x: 480, y: 110, w: 70, label: "users" },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5]];
  return (
    <svg viewBox="0 0 580 180" style={{ width: "100%", height: "100%" }}>
      {edges.map(([a,b],i) => (
        <motion.line key={i} x1={nodes[a].x+nodes[a].w} y1={nodes[a].y+16}
          x2={nodes[b].x} y2={nodes[b].y+16}
          stroke="rgba(0,194,168,0.3)" strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          viewport={{ once: true }} />
      ))}
      {nodes.map((n,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          viewport={{ once: true }}
        >
          <rect x={n.x} y={n.y} width={n.w} height={32} rx={3}
            fill="rgba(26,26,32,0.9)" stroke="rgba(0,194,168,0.3)" strokeWidth={1} />
          <text x={n.x + n.w/2} y={n.y+21} textAnchor="middle"
            fill="var(--text-secondary)" fontSize={9} fontFamily="var(--font-dm-mono)">{n.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function EcomViz() {
  // Bloom Glass abstract — warm palette, product cards
  const products = [
    { x: 30, y: 20, w: 100, h: 130, color: "#D4637A", label: "Candle" },
    { x: 150, y: 40, w: 100, h: 110, color: "#C4965A", label: "Resin Art" },
    { x: 270, y: 20, w: 100, h: 130, color: "#8BAF8A", label: "Crochet" },
    { x: 390, y: 40, w: 100, h: 110, color: "#B49BC8", label: "Flowers" },
  ];
  return (
    <svg viewBox="0 0 520 180" style={{ width: "100%", height: "100%" }}>
      {products.map((p,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          viewport={{ once: true }}
        >
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={6}
            fill={`${p.color}14`} stroke={`${p.color}45`} strokeWidth={1} />
          <circle cx={p.x + p.w/2} cy={p.y + p.h/2 - 15} r={22}
            fill={`${p.color}20`} stroke={`${p.color}40`} strokeWidth={1} />
          <text x={p.x + p.w/2} y={p.y + p.h - 12} textAnchor="middle"
            fill={p.color} fontSize={9} fontFamily="var(--font-dm-mono)" opacity={0.8}>{p.label}</text>
        </motion.g>
      ))}
      {/* Cart indicator */}
      <motion.rect x={170} y={155} width={160} height={18} rx={9}
        fill="rgba(212,99,122,0.15)" stroke="rgba(212,99,122,0.4)" strokeWidth={1}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "250px 164px" }}
      />
      <text x={250} y={167} textAnchor="middle"
        fill="rgba(212,99,122,0.7)" fontSize={8} fontFamily="var(--font-dm-mono)">
        Add to Cart
      </text>
    </svg>
  );
}

function PlatformViz() {
  const panels = [
    { x: 10, y: 10, w: 140, h: 160, label: "Jobs / ATS" },
    { x: 165, y: 10, w: 160, h: 160, label: "Marketplace" },
    { x: 340, y: 10, w: 160, h: 160, label: "Mentor Hub" },
  ];
  return (
    <svg viewBox="0 0 520 180" style={{ width: "100%", height: "100%" }}>
      {panels.map((p,i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4}
            fill="rgba(26,26,32,0.9)" stroke="rgba(99,102,241,0.25)" strokeWidth={1} />
          <rect x={p.x} y={p.y} width={p.w} height={28} rx={4}
            fill="rgba(99,102,241,0.1)" stroke="none" />
          <text x={p.x + p.w/2} y={p.y + 18} textAnchor="middle"
            fill="rgba(99,102,241,0.8)" fontSize={9} fontFamily="var(--font-dm-mono)">{p.label}</text>
          {[40, 60, 80, 100, 120].map((y, j) => (
            <motion.rect key={j} x={p.x+10} y={p.y+y} width={p.w-20} height={8} rx={2}
              fill="rgba(240,238,232,0.04)"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.1 + j * 0.04 }}
              viewport={{ once: true }}
              style={{ transformOrigin: `${p.x+10}px ${p.y+y}px` }}
            />
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

function PipelineViz() {
  const stages = ["Sources", "Scrape", "Dedupe", "Score", "Route", "CRM"];
  return (
    <svg viewBox="0 0 560 100" style={{ width: "100%", height: "100%" }}>
      {stages.map((s,i) => (
        <motion.g key={s}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <rect x={10 + i*90} y={30} width={76} height={36} rx={3}
            fill="rgba(26,26,32,0.9)" stroke="rgba(0,194,168,0.28)" strokeWidth={1} />
          <text x={10 + i*90 + 38} y={53} textAnchor="middle"
            fill="var(--text-secondary)" fontSize={9} fontFamily="var(--font-dm-mono)">{s}</text>
          {i < stages.length - 1 && (
            <motion.line x1={86+i*90} y1={48} x2={100+i*90} y2={48}
              stroke="rgba(0,194,168,0.4)" strokeWidth={1}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: `${86+i*90}px 48px` }}
            />
          )}
        </motion.g>
      ))}
      {[0,1,2].map(i => (
        <motion.circle key={i} cx={10} cy={48} r={3} fill="var(--accent)"
          animate={{ cx: [10, 540, 10] }}
          transition={{ duration: 4, delay: i * 1.4, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}

function NetworkViz() {
  const hubs = [
    {x:60,y:90,r:9,label:"HQ"},{x:180,y:50,r:6,label:"WH-A"},
    {x:180,y:130,r:6,label:"WH-B"},{x:310,y:40,r:5,label:"D-1"},
    {x:310,y:90,r:5,label:"D-2"},{x:310,y:140,r:5,label:"D-3"},
    {x:430,y:65,r:4,label:"CLI"},{x:430,y:120,r:4,label:"CLI"},
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7]];
  return (
    <svg viewBox="0 0 500 180" style={{ width: "100%", height: "100%" }}>
      {edges.map(([a,b],i) => (
        <motion.line key={i} x1={hubs[a].x} y1={hubs[a].y} x2={hubs[b].x} y2={hubs[b].y}
          stroke="rgba(0,194,168,0.18)" strokeWidth={1} strokeDasharray="3 3"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ delay: i * 0.07, duration: 0.6 }}
          viewport={{ once: true }}
        />
      ))}
      {hubs.map((h,i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 220 }}
          viewport={{ once: true }}
          style={{ transformOrigin: `${h.x}px ${h.y}px` }}
        >
          <circle cx={h.x} cy={h.y} r={h.r}
            fill="rgba(0,194,168,0.12)" stroke="rgba(0,194,168,0.55)" strokeWidth={1} />
          <text x={h.x} y={h.y + h.r + 11} textAnchor="middle"
            fill="var(--text-muted)" fontSize={8} fontFamily="var(--font-dm-mono)">{h.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

const vizMap: Record<string, React.ReactNode> = {
  db: <DBViz />,
  ecom: <EcomViz />,
  platform: <PlatformViz />,
  pipeline: <PipelineViz />,
  network: <NetworkViz />,
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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
      {/* Viz area */}
      <div style={{
        height: 160,
        borderBottom: "1px solid var(--border)",
        background: "rgba(9,9,12,0.6)",
        padding: 16,
        overflow: "hidden",
        transition: "border-color 0.25s ease",
        borderBottomColor: hovered ? "rgba(0,194,168,0.15)" : "rgba(240,238,232,0.06)",
      }}>
        {vizMap[project.visual]}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px" }}>
        {/* Meta row */}
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
          fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-primary)",
          lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 6,
        }}>
          {project.title}
        </h3>

        <div style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 9,
          letterSpacing: "0.14em", color: "var(--text-muted)",
          marginBottom: 14,
        }}>
          {project.type}
        </div>

        <p style={{
          fontFamily: "var(--font-dm-sans)", fontWeight: 300,
          fontSize: 13, color: "var(--text-secondary)",
          lineHeight: 1.75, marginBottom: 18,
        }}>
          {project.description}
        </p>

        {/* Tags */}
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

        {/* Outcome */}
        <div style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 9,
          letterSpacing: "0.14em", color: "var(--accent)", opacity: 0.65,
          paddingTop: 14, borderTop: "1px solid var(--border)",
        }}>
          {project.outcome}
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
      style={{ padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <motion.div style={{ y: headerY, marginBottom: "clamp(48px, 7vw, 72px)" }}>
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
            fontSize: "clamp(32px, 5vw, 60px)", color: "var(--text-primary)",
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

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 440px), 1fr))",
          gap: 20,
        }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
