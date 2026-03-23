'use client'

import { ReactNode } from "react"

interface PageHeroProps {
  badge: string
  title: string | ReactNode
  subtitle?: string
  size?: "lg" | "md" | "sm"
  children?: ReactNode
}

const STARS = [
  {t:5,l:10,d:0,s:1.5},{t:12,l:25,d:.5,s:1},{t:8,l:45,d:1,s:1},{t:15,l:60,d:1.5,s:1.5},
  {t:6,l:75,d:.8,s:1},{t:20,l:88,d:.3,s:1.5},{t:30,l:5,d:1.2,s:1},{t:25,l:18,d:2,s:1.5},
  {t:35,l:35,d:.7,s:1},{t:28,l:52,d:1.8,s:1},{t:40,l:70,d:.4,s:1.5},{t:32,l:82,d:1.1,s:1},
  {t:50,l:8,d:.9,s:1.5},{t:45,l:22,d:1.6,s:1},{t:55,l:40,d:.2,s:1},{t:48,l:58,d:2.2,s:1.5},
  {t:60,l:75,d:.6,s:1},{t:52,l:92,d:1.4,s:1},{t:70,l:12,d:1.7,s:1},{t:65,l:28,d:.1,s:1.5},
  {t:75,l:48,d:1.3,s:1},{t:68,l:65,d:2.4,s:1},{t:80,l:80,d:.8,s:1.5},{t:72,l:95,d:1.9,s:1},
  {t:88,l:15,d:.5,s:1},{t:82,l:33,d:1.1,s:1.5},{t:90,l:55,d:.3,s:1},{t:85,l:72,d:2.1,s:1},
  {t:92,l:88,d:.7,s:1.5},{t:95,l:42,d:1.5,s:1},{t:3,l:33,d:2.3,s:1},{t:18,l:48,d:.9,s:1.5},
  {t:42,l:14,d:1.8,s:1},{t:58,l:30,d:.4,s:1.5},{t:76,l:62,d:1.2,s:1},{t:22,l:78,d:2,s:1},
  {t:38,l:90,d:.6,s:1.5},{t:62,l:50,d:1.7,s:1},{t:78,l:20,d:.2,s:1},{t:10,l:55,d:1.4,s:1.5},
  {t:26,l:8,d:.8,s:1},{t:44,l:44,d:2.2,s:1},{t:54,l:85,d:1,s:1.5},{t:66,l:38,d:.5,s:1},
  {t:84,l:6,d:1.6,s:1},{t:14,l:92,d:.3,s:1.5},{t:36,l:68,d:2.4,s:1},{t:56,l:16,d:1.1,s:1},
  {t:74,l:78,d:.7,s:1.5},{t:86,l:46,d:1.9,s:1},{t:96,l:28,d:.4,s:1},{t:4,l:66,d:2.1,s:1.5},
  {t:16,l:36,d:.9,s:1},{t:46,l:58,d:1.3,s:1},{t:64,l:24,d:.1,s:1.5},{t:82,l:72,d:1.8,s:1},
  {t:94,l:10,d:.6,s:1},{t:24,l:96,d:2.3,s:1.5},{t:48,l:4,d:1.4,s:1},{t:72,l:88,d:.8,s:1},
]

export function PageHero({ badge, title, subtitle, size = "md", children }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #020818 0%, #0A1628 100%)",
        paddingTop: size === "lg" ? "6rem" : size === "sm" ? "3.5rem" : "5rem",
        paddingBottom: size === "lg" ? "7rem" : size === "sm" ? "3.5rem" : "5.5rem",
      }}
    >
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-mc-pulse"
            style={{
              top: s.t + "%", left: s.l + "%",
              width: s.s + "px", height: s.s + "px",
              background: "rgba(255,255,255,0.7)",
              animationDelay: s.d + "s",
              animationDuration: (2.5 + (i % 4) * 0.5) + "s",
            }}
          />
        ))}
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none animate-mc-scan"
        style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }}
      />

      {/* Corner brackets */}
      <div
        className="absolute top-4 left-4 w-10 h-10 pointer-events-none animate-mc-corner"
        style={{ borderTop: "1.5px solid rgba(56,189,248,0.45)", borderLeft: "1.5px solid rgba(56,189,248,0.45)" }}
      >
        <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
      </div>
      <div
        className="absolute top-4 right-4 w-10 h-10 pointer-events-none animate-mc-corner"
        style={{ animationDelay: "0.75s", borderTop: "1.5px solid rgba(56,189,248,0.45)", borderRight: "1.5px solid rgba(56,189,248,0.45)" }}
      >
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
      </div>
      <div
        className="absolute bottom-7 left-4 w-10 h-10 pointer-events-none animate-mc-corner"
        style={{ animationDelay: "1.5s", borderBottom: "1.5px solid rgba(56,189,248,0.45)", borderLeft: "1.5px solid rgba(56,189,248,0.45)" }}
      >
        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
      </div>
      <div
        className="absolute bottom-7 right-4 w-10 h-10 pointer-events-none animate-mc-corner"
        style={{ animationDelay: "2.25s", borderBottom: "1.5px solid rgba(56,189,248,0.45)", borderRight: "1.5px solid rgba(56,189,248,0.45)" }}
      >
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 animate-mc-fade"
          style={{
            opacity: 0,
            animationDelay: "0.1s",
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.2)",
            borderRadius: "20px",
            padding: "5px 14px",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-mc-pulse flex-shrink-0" />
          <span className="font-mono text-[#38BDF8] text-[10px] tracking-widest">{badge}</span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-white font-bold leading-tight animate-mc-fade"
          style={{
            fontSize:
              size === "lg"
                ? "clamp(2.2rem,5vw,3.5rem)"
                : size === "sm"
                ? "clamp(1.6rem,3vw,2.2rem)"
                : "clamp(1.9rem,4vw,2.8rem)",
            opacity: 0,
            animationDelay: "0.2s",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="font-body leading-relaxed mt-4 animate-mc-fade"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "1rem auto 0",
              opacity: 0,
              animationDelay: "0.35s",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Children slot */}
        {children && (
          <div className="mt-8 animate-mc-fade" style={{ opacity: 0, animationDelay: "0.5s" }}>
            {children}
          </div>
        )}
      </div>

      {/* Telemetry strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2"
        style={{
          borderTop: "1px solid rgba(56,189,248,0.07)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <span
          className="font-mono text-[9px] tracking-widest"
          style={{ color: "rgba(56,189,248,0.3)" }}
        >
          CIRC // MAMA NGINA UNIVERSITY COLLEGE
        </span>
        <span
          className="font-mono text-[9px] tracking-widest"
          style={{ color: "rgba(56,189,248,0.3)" }}
        >
          AY 2025/26 // STATUS: ACTIVE
        </span>
      </div>
    </section>
  )
}
