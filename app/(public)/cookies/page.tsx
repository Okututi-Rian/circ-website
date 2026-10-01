import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CIRC Cookie Policy",
  description: "Learn how the CIRC website at Mama Ngina University College uses essential storage and analytics technologies.",
  path: "/cookies",
  keywords: ["CIRC cookie policy", "website analytics cookies", "MNUC website cookies"],
})

export default function CookiesPage() {
  return (
    <div>
      <PageHero badge="LEGAL // COOKIES" title="Cookie Policy" subtitle="How this website uses essential storage and analytics." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: October 1, 2026.</strong> Cookies and similar technologies are small pieces of information stored on or accessed from your device. Essential storage supports sign-in, security, and core website functions. Google Analytics and Microsoft Clarity are enabled by default on public pages to measure site usage and improve usability.</p>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Analytics technologies</h2><p>Google Analytics measures page visits and website usage, and Microsoft Clarity helps us understand interactions and usability. They run by default on public pages; the website does not provide a cookie preference or opt-out control. These services may use cookies, identifiers, scripts, and similar technologies and may receive technical information such as pages visited, browser and device details, and interactions. Google and Microsoft process data under their own privacy terms. We do not enable advertising features in this configuration. You can use your browser settings to block or clear cookies, though this may affect site functionality.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Your choices</h2><p>The site has no in-page control to turn analytics off. You may contact CIRC at circ@mnu.ac.ke to exercise rights that apply to you, including the right to object where provided by law. Browser settings can block or clear cookies, though that does not disable all forms of analytics and may affect site functionality.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Contact</h2><p>For questions about cookies or your privacy choices, contact <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>. See our <a className="text-accent-sky" href="/privacy">Privacy Policy</a> for more information.</p></section>
      </article>
    </div>
  )
}
