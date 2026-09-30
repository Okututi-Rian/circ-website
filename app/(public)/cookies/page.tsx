import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CIRC Cookie Policy",
  description: "Learn how the CIRC website at Mama Ngina University College uses essential storage and optional analytics cookies and how to manage your choices.",
  path: "/cookies",
  keywords: ["CIRC cookie policy", "website analytics cookies", "cookie preferences", "MNUC website cookies"],
})

export default function CookiesPage() {
  return (
    <div>
      <PageHero badge="LEGAL // COOKIES" title="Cookie Policy" subtitle="How this website uses essential storage and optional analytics." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: October 1, 2026.</strong> Cookies and similar technologies are small pieces of information stored on or accessed from your device. Essential storage supports sign-in, security, and core website functions. Optional analytics are off until you choose to allow them.</p>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Optional analytics</h2><p>With your permission, Google Analytics measures page visits and website usage, and Microsoft Clarity helps us understand interactions and usability. These services may use cookies, identifiers, scripts, and similar technologies and may receive technical information such as pages visited, browser and device details, and interactions. Google and Microsoft process data under their own privacy terms. We do not enable advertising features in this configuration. Analytics choices are stored in your browser for up to 180 days, after which we ask you again.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Your choices</h2><p>On your first visit, choose Allow analytics, Reject optional, or Manage. You can change your choice at any time with Cookie preferences in the footer. Rejecting optional analytics does not disable essential authentication or security storage. You can also delete or block cookies in your browser; doing so may affect sign-in and other essential features. If you withdraw a previous choice, analytics scripts stop loading on the next page load and consented analytics cookies are cleared or disabled where the provider supports it.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Contact</h2><p>For questions about cookies or your privacy choices, contact <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>. See our <a className="text-accent-sky" href="/privacy">Privacy Policy</a> for more information.</p></section>
      </article>
    </div>
  )
}
