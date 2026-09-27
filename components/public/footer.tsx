import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Github, Twitter, Instagram, Linkedin } from "lucide-react"

export async function Footer() {
  const settings = await prisma.settings.findUnique({
    where: { id: "singleton" },
  })

  const communities = await prisma.community.findMany({
    select: { name: true, slug: true },
    take: 6,
  })

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Communities", href: "/communities" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "Join", href: "/join" },
  ]

  return (
    <footer className="w-full" style={{ background: "#0F2460" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="CIRC Logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="font-display text-white text-xl font-bold">CIRC</span>
          </div>
          <p className="font-body italic text-white/60 text-sm mt-3 leading-relaxed">
            &ldquo;Inspiring Innovation, Driving Progress and Creating a Brighter Future.&rdquo;
          </p>
          <p className="font-body text-white/40 text-xs mt-2 leading-relaxed">
            {settings?.aboutText || "Computing Innovation and Research Club — Mama Ngina University College."}
          </p>
        </div>

        {/* Column 2 — Navigation */}
        <div>
          <p className="font-body text-white/50 text-xs font-semibold uppercase tracking-wide mb-4">
            Navigation
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-white/60 text-sm hover:text-white transition-colors block mb-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5 pt-4 border-t border-white/15">
            <Link href="/privacy" className="font-body text-white/40 text-xs hover:text-white/80 transition-colors">Privacy</Link>
            <Link href="/terms" className="font-body text-white/40 text-xs hover:text-white/80 transition-colors">Terms</Link>
            <Link href="/cookies" className="font-body text-white/40 text-xs hover:text-white/80 transition-colors">Cookies</Link>
          </div>
        </div>

        {/* Column 3 — Communities */}
        <div>
          <p className="font-body text-white/50 text-xs font-semibold uppercase tracking-wide mb-4">
            Our Hubs
          </p>
          {communities.map((c) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="font-body text-white/60 text-sm hover:text-white transition-colors block mb-2"
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Column 4 — Connect */}
        <div>
          <p className="font-body text-white/50 text-xs font-semibold uppercase tracking-wide mb-4">
            Get In Touch
          </p>
          <p className="font-body text-white/60 text-sm mb-4">
            {settings?.contactEmail || "circ@mnu.ac.ke"}
          </p>
          <div className="flex items-center gap-3 mt-3">
            {[
              { href: settings?.github || "#", Icon: Github, label: "GitHub" },
              { href: settings?.twitter || "#", Icon: Twitter, label: "Twitter" },
              { href: settings?.instagram || "#", Icon: Instagram, label: "Instagram" },
              { href: settings?.linkedin || "#", Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1.5rem" }}
      >
        <span className="font-body text-xs text-white/40">
          © {new Date().getFullYear()} CIRC — Mama Ngina University College
        </span>
        <span className="font-body text-xs text-white/40">
          AY 2026/27 · All rights reserved
        </span>
      </div>
    </footer>
  )
}