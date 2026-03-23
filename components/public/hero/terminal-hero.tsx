"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function TerminalHero() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)
  const [transitioning, setTransitioning] = useState(false)

  const SLIDES = [
    "/hero/hero-bg-1.jpg",
    "/hero/hero-bg-2.jpg",
    "/hero/hero-bg-3.jpg",
    "/hero/hero-bg-4.jpg",
    "/hero/hero-bg-5.jpg",
  ]

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const terminal = terminalRef.current
    if (!terminal) return

    // Clear any existing content first
    terminal.innerHTML = ""

    const lines = [
      "> Initializing CIRC...",
      "> Computing Innovation & Research Club",
      "> Mama Ngina University College",
      "> Communities: Web Dev / AI-ML / Web3 / IoT / Data Science / Programming",
      "> Status: ACTIVE — Join the Movement",
    ]

    let lineIndex = 0
    let charIndex = 0
    let currentP: HTMLParagraphElement | null = null
    let cursorSpan: HTMLSpanElement | null = null

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        // All lines done — leave final cursor blinking
        if (cursorSpan) {
          cursorSpan.className = "inline-block w-2 h-4 bg-accent-green ml-0.5 animate-pulse align-middle"
        }
        return
      }

      const line = lines[lineIndex]

      if (charIndex === 0) {
        // Start a new line
        if (cursorSpan) cursorSpan.remove()
        currentP = document.createElement("p")
        currentP.className = "font-mono text-sm text-accent-green leading-relaxed mb-1"
        cursorSpan = document.createElement("span")
        cursorSpan.className = "inline-block w-2 h-4 bg-accent-green ml-0.5 animate-pulse align-middle"
        terminal!.appendChild(currentP)
        currentP.appendChild(cursorSpan)
      }

      if (charIndex < line.length) {
        if (currentP && cursorSpan) {
          currentP.insertBefore(document.createTextNode(line[charIndex]), cursorSpan)
        }
        charIndex++
        setTimeout(typeNextChar, 38)
      } else {
        // Line done
        charIndex = 0
        lineIndex++
        const pause = lineIndex === 1 ? 600 : 400
        setTimeout(typeNextChar, pause)
      }
    }

    const startDelay = setTimeout(typeNextChar, 500)

    return () => {
      clearTimeout(startDelay)
      hasAnimated.current = false
    }
  }, [])

  useEffect(() => {
    SLIDES.forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % SLIDES.length)
        setNextSlide(prev => (prev + 1) % SLIDES.length)
        setTransitioning(false)
      }, 1500)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden" style={{ background: "#020818" }}>

      {/* ── LAYER 0: Background photo slideshow — sits below ALL other layers ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Current photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url(${SLIDES[currentSlide]})`,
            opacity: transitioning ? 0 : 1,
          }}
        />
        {/* Next photo — fades in while current fades out */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url(${SLIDES[nextSlide]})`,
            opacity: transitioning ? 1 : 0,
          }}
        />
        {/* Dark overlay — this is what makes Mission Control readable over any photo */}
        {/* It has THREE layers to ensure perfect readability at all times */}
        {/* Layer A: base dark tint */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(2, 8, 24, 0.72)" }}
        />
        {/* Layer B: gradient from bottom (where metrics bar is) to ensure metrics always readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(2,8,24,0.95) 0%, rgba(2,8,24,0.3) 40%, rgba(2,8,24,0.5) 100%)"
          }}
        />
        {/* Layer C: subtle vignette on edges */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(2,8,24,0.6) 100%)"
          }}
        />
      </div>

      {/* === LAYER 1: Precision dot grid === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* === LAYER 2: Scan line === */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none animate-scan-line"
        style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)" }}
      />

      {/* === LAYER 3: Corner bracket markers === */}
      {/* Top Left */}
      <div
        className="absolute top-6 left-6 w-16 h-16 pointer-events-none animate-[corner-pulse_3s_ease-in-out_infinite]"
        style={{ borderTop: "1.5px solid rgba(56,189,248,0.5)", borderLeft: "1.5px solid rgba(56,189,248,0.5)" }}
      >
        <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-accent-sky" />
      </div>
      {/* Top Right */}
      <div
        className="absolute top-6 right-6 w-16 h-16 pointer-events-none animate-[corner-pulse_3s_ease-in-out_infinite_0.75s]"
        style={{ borderTop: "1.5px solid rgba(56,189,248,0.5)", borderRight: "1.5px solid rgba(56,189,248,0.5)" }}
      >
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-sky" />
      </div>
      {/* Bottom Left */}
      <div
        className="absolute bottom-6 left-6 w-16 h-16 pointer-events-none animate-[corner-pulse_3s_ease-in-out_infinite_1.5s]"
        style={{ borderBottom: "1.5px solid rgba(56,189,248,0.5)", borderLeft: "1.5px solid rgba(56,189,248,0.5)" }}
      >
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-accent-sky" />
      </div>
      {/* Bottom Right */}
      <div
        className="absolute bottom-6 right-6 w-16 h-16 pointer-events-none animate-[corner-pulse_3s_ease-in-out_infinite_2.25s]"
        style={{ borderBottom: "1.5px solid rgba(56,189,248,0.5)", borderRight: "1.5px solid rgba(56,189,248,0.5)" }}
      >
        <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-accent-sky" />
      </div>

      {/* === LAYER 4: Ambient node dots === */}
      {[
        { top: "15%", left: "7%" },  { top: "72%", left: "12%" },
        { top: "28%", right: "9%" }, { top: "61%", right: "7%" },
        { top: "44%", left: "4%" },  { top: "83%", right: "22%" },
        { top: "18%", right: "28%" },{ top: "55%", left: "22%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            ...pos,
            background: "rgba(56,189,248,0.35)",
            animation: `status-pulse ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 animate-hero-fade"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            borderRadius: "20px",
            padding: "6px 16px",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-accent-green animate-status-pulse flex-shrink-0" />
          <span className="font-mono text-accent-sky text-xs tracking-widest">
            SYS_STATUS: ACTIVE — AY 2025/26
          </span>
        </div>

        {/* Terminal window */}
        <div
          className="w-full rounded-xl overflow-hidden mb-10 animate-hero-fade"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(56,189,248,0.15)",
            backdropFilter: "blur(8px)",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(56,189,248,0.1)", background: "rgba(0,0,0,0.3)" }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
            <span className="font-mono text-xs ml-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              circ@mnu:~$ terminal
            </span>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-status-pulse" />
              <span className="font-mono text-[10px] text-accent-green">CONNECTED</span>
            </div>
          </div>

          {/* Terminal body — typed text appears here */}
          <div ref={terminalRef} className="p-6 min-h-[160px] text-left" />
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-hero-fade"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <Link href="/join" className="btn-primary-lg flex items-center gap-2 group">
            Join CIRC
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/communities" className="btn-outline-white flex items-center gap-2">
            Explore Communities
          </Link>
        </div>
      </div>

      {/* === METRICS BAR — pinned to bottom === */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          borderTop: "1px solid rgba(56,189,248,0.1)",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center gap-0">
          {[
            { value: "120+", label: "Members" },
            { value: "6",    label: "Communities" },
            { value: "24+",  label: "Events Run" },
            { value: "30+",  label: "Projects Built" },
          ].map((metric, i) => (
            <div key={i} className="flex items-center">
              <div
                className="text-center px-8 animate-metric"
                style={{ animationDelay: `${0.8 + i * 0.15}s`, opacity: 0 }}
              >
                <div className="font-mono font-bold text-white text-2xl">{metric.value}</div>
                <div
                  className="font-body text-[10px] uppercase tracking-widest mt-1"
                  style={{ color: "rgba(56,189,248,0.7)" }}
                >
                  {metric.label}
                </div>
              </div>
              {i < 3 && (
                <div
                  className="h-8 w-px flex-shrink-0"
                  style={{ background: "rgba(56,189,248,0.15)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={20} style={{ color: "rgba(255,255,255,0.2)" }} />
      </div>

    </section>
  )
}
