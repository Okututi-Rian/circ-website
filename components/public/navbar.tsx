'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Communities", href: "/communities" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Join", href: "/join" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-primary/10 backdrop-blur-xl transition-colors" style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 8px 28px rgba(15,36,96,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="CIRC Logo"
              fill
              className="object-contain rounded-lg"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none text-primary">CIRC</span>
            <span className="mt-0.5 hidden font-body text-[10px] leading-none sm:block text-muted">
              Mama Ngina University College
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm transition-colors duration-200"
              style={
                isActive(link.href)
                  ? { color: "#1E3A8A", borderBottom: "2px solid #F97316", paddingBottom: "2px" }
                  : { color: "rgba(30,58,138,0.72)" }
              }
              onMouseEnter={(e) => {
                if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.color = "#1E3A8A"
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.color = "rgba(30,58,138,0.72)"
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/join"
            className="hidden md:inline-flex btn-primary text-xs px-4 py-2"
          >
            Apply Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 transition-colors md:hidden text-primary/80 hover:text-primary"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "#FFFFFF",
            borderBottom: "1px solid rgba(30,58,138,0.1)",
            boxShadow: "0 8px 32px rgba(15,36,96,0.12)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-6 py-4 font-body text-sm border-b transition-colors"
              style={{
                borderBottomColor: "rgba(30,58,138,0.08)",
                color: isActive(link.href) ? "#1E3A8A" : "rgba(31,41,55,0.76)",
                background: isActive(link.href) ? "rgba(30,58,138,0.05)" : "transparent",
              }}
            >
              {link.name}
            </Link>
          ))}
          <div className="p-4">
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
