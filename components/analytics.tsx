"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "circ-analytics-consent-v1"
const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000
const GA_MEASUREMENT_ID = "G-G0PTNXCJ2Y"
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

type Consent = {
  googleAnalytics: boolean
  clarity: boolean
  savedAt: number
}

type GoogleTag = ((...args: unknown[]) => void) & { loaded?: boolean }
type ClarityTag = ((...args: unknown[]) => void) & { q?: unknown[][] }

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GoogleTag
    clarity?: ClarityTag
  }
}

function clearAnalyticsCookies() {
  const analyticsCookies = /^(?:_ga(?:_.+)?|_gid|_gat(?:_.+)?|_gac_.+|_clck|_clsk)$/
  const host = window.location.hostname
  const parentDomain = host.split(".").slice(-2).join(".")
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim()
    if (!name || !analyticsCookies.test(name)) continue
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
    if (host.includes(".")) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}; SameSite=Lax`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parentDomain}; SameSite=Lax`
    }
  }
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as Consent
    if (Date.now() - value.savedAt > CONSENT_MAX_AGE) {
      clearAnalyticsCookies()
      return null
    }
    if (typeof value.googleAnalytics !== "boolean" || typeof value.clarity !== "boolean") return null
    return value
  } catch {
    return null
  }
}

function loadGoogleAnalytics() {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || []
    const gtag: GoogleTag = (...args) => { window.dataLayer?.push(args) }
    window.gtag = gtag
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
    gtag("js", new Date())
    gtag("config", GA_MEASUREMENT_ID, { send_page_view: false })
  }
  window.gtag("consent", "update", { analytics_storage: "granted" })
  if (!document.getElementById("circ-google-analytics")) {
    const script = document.createElement("script")
    script.id = "circ-google-analytics"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)
  }
}

function loadClarity() {
  if (!CLARITY_PROJECT_ID) return
  if (!window.clarity) {
    const clarity: ClarityTag = (...args) => {
      clarity.q = clarity.q || []
      clarity.q.push(args)
    }
    window.clarity = clarity
  }
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" })
  if (!document.getElementById("circ-microsoft-clarity")) {
    const script = document.createElement("script")
    script.id = "circ-microsoft-clarity"
    script.async = true
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
    document.head.appendChild(script)
  }
}

export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("circ:open-cookie-settings"))}
      className="font-body text-white/40 text-xs hover:text-white/80 transition-colors"
    >
      Cookie preferences
    </button>
  )
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [manage, setManage] = useState(false)
  const [googleAnalytics, setGoogleAnalytics] = useState(false)
  const [clarity, setClarity] = useState(false)

  useEffect(() => {
    const saved = readConsent()
    if (saved) {
      setConsent(saved)
      setGoogleAnalytics(saved.googleAnalytics)
      setClarity(saved.clarity)
      setOpen(false)
    } else {
      setOpen(true)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    const openSettings = () => {
      setManage(true)
      setOpen(true)
    }
    window.addEventListener("circ:open-cookie-settings", openSettings)
    return () => window.removeEventListener("circ:open-cookie-settings", openSettings)
  }, [])

  useEffect(() => {
    if (!consent) return
    const restrictedPath = pathname.startsWith("/admin") || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")
    if (restrictedPath) {
      const trackersLoaded = Boolean(
        document.getElementById("circ-google-analytics") || document.getElementById("circ-microsoft-clarity"),
      )
      if (trackersLoaded) {
        window.gtag?.("consent", "update", { analytics_storage: "denied" })
        window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" })
        window.clarity?.("consent", false)
        window.setTimeout(() => window.location.reload(), 50)
      }
      return
    }
    if (consent.googleAnalytics) loadGoogleAnalytics()
    if (consent.clarity) loadClarity()
    if (!consent.googleAnalytics && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" })
    }
    if (!consent.clarity && window.clarity) {
      window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" })
      window.clarity("consent", false)
    }
  }, [consent, pathname])

  useEffect(() => {
    const restrictedPath = pathname.startsWith("/admin") || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")
    if (restrictedPath || !consent?.googleAnalytics || typeof window.gtag !== "function") return
    const query = searchParams.toString()
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_title: document.title,
    })
  }, [consent?.googleAnalytics, pathname, searchParams])

  const save = useCallback((ga: boolean, clarityEnabled: boolean) => {
    const next: Consent = { googleAnalytics: ga, clarity: clarityEnabled, savedAt: Date.now() }
    const hadEnabledAnalytics = Boolean(consent?.googleAnalytics || consent?.clarity)
    const isDisablingAnalytics = Boolean(
      (consent?.googleAnalytics && !ga) || (consent?.clarity && !clarityEnabled),
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setConsent(next)
    setGoogleAnalytics(ga)
    setClarity(clarityEnabled)
    setOpen(false)
    setManage(false)
    if (hadEnabledAnalytics && isDisablingAnalytics) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" })
      if (window.clarity) {
        window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" })
        window.clarity("consent", false)
      }
      clearAnalyticsCookies()
      window.setTimeout(() => window.location.reload(), 50)
    }
  }, [consent])

  if (!ready || !open) return null

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <h2 id="cookie-consent-title" className="font-display text-lg font-bold text-primary">Cookie and analytics choices</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Essential site storage is always active. Google Analytics and Microsoft Clarity are optional and will only run if you allow them. You can change your choice at any time.
        {" "}<a className="text-blue-700 underline" href="/cookies">Cookie policy</a> · <a className="text-blue-700 underline" href="/privacy">Privacy policy</a>
      </p>

      {manage && (
        <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm">
          <label className="flex items-start gap-3">
            <input className="mt-1 accent-blue-800" type="checkbox" checked={googleAnalytics} onChange={(event) => setGoogleAnalytics(event.target.checked)} />
            <span><strong>Google Analytics</strong><span className="block text-slate-500">Measures page visits and site usage to help us improve the website.</span></span>
          </label>
          <label className="flex items-start gap-3">
            <input className="mt-1 accent-blue-800" type="checkbox" checked={clarity} onChange={(event) => setClarity(event.target.checked)} />
            <span><strong>Microsoft Clarity</strong><span className="block text-slate-500">Provides aggregated interaction insights and session playback to help us find usability issues.</span></span>
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap justify-end gap-2">
        {!manage ? (
          <>
            <button type="button" onClick={() => { setGoogleAnalytics(false); setClarity(false); save(false, false) }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">Reject optional</button>
            <button type="button" onClick={() => setManage(true)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">Manage</button>
            <button type="button" onClick={() => save(true, Boolean(CLARITY_PROJECT_ID))} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90">Allow analytics</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => { setGoogleAnalytics(false); setClarity(false); save(false, false) }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">Reject optional</button>
            <button type="button" onClick={() => save(googleAnalytics, clarity)} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90">Save choices</button>
          </>
        )}
      </div>
    </aside>
  )
}
