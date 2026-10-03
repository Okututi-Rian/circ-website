'use client'

import { ReactNode } from "react"
import { MapPin } from "lucide-react"
import Image from "next/image"

interface PageHeroProps {
  badge: string
  title: string | ReactNode
  subtitle?: string
  size?: "lg" | "md" | "sm"
  children?: ReactNode
  /** Optional image src to show as a full-width photo strip beneath the hero */
  image?: string
  /** Alt text for the image */
  imageAlt?: string
}

export function PageHero({ badge, title, subtitle, size = "md", children, image, imageAlt }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-surface-2 text-main border-b border-primary/10"
      style={{
        paddingTop: size === "lg" ? "5.5rem" : size === "sm" ? "3.5rem" : "4.5rem",
        paddingBottom: image ? "0" : size === "lg" ? "6rem" : size === "sm" ? "4rem" : "5rem",
      }}
    >
      {/* Background ambient lighting blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-2 to-transparent" />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Modern landing-style pill badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/85 px-4 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-accent-green" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-orange">
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-primary font-bold leading-[0.94] tracking-[-0.05em]"
          style={{
            fontSize:
              size === "lg"
                ? "clamp(2.5rem, 5.5vw, 4.2rem)"
                : size === "sm"
                ? "clamp(1.9rem, 3.8vw, 2.7rem)"
                : "clamp(2.2rem, 4.5vw, 3.4rem)",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-body text-muted text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Optional interactive children slot */}
        {children && (
          <div className="mt-7">
            {children}
          </div>
        )}
      </div>

      {/* Subtle bottom breadcrumb/location footer */}
      <div className={`flex items-center justify-center gap-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-primary/60 sm:text-xs ${image ? "mt-6 pb-6" : "mt-8"}`}>
        <MapPin size={13} className="text-accent-orange" />
        CIRC · Mama Ngina University College
      </div>

      {/* Optional photo strip */}
      {image && (
        <div className="relative w-full overflow-hidden" style={{ height: "340px" }}>
          <Image
            src={image}
            alt={imageAlt ?? "CIRC community photo"}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlays for smooth blend */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface-2 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-2 to-transparent" />
        </div>
      )}
    </section>
  )
}
