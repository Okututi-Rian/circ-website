import { PageHero } from "@/components/public/page-hero"

export const metadata = {
  title: "Cookie Policy | CIRC",
  description: "How CIRC uses cookies and similar technologies on this website.",
}

export default function CookiesPage() {
  return (
    <div>
      <PageHero badge="LEGAL // COOKIES" title="Cookie Policy" subtitle="A short explanation of the technologies used to keep this website useful and measurable." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: September 15, 2026.</strong> This website uses limited cookies and similar technologies to support functionality and understand how visitors use CIRC pages.</p>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Analytics</h2><p>Google Analytics may set cookies or use similar identifiers to measure visits, navigation, and general audience trends. This helps us improve content and performance. Google may process this information according to its own policies.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Essential technologies</h2><p>Authentication and security providers may use necessary cookies or storage to keep sign-in and protected areas working. These technologies are not used to sell your information.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Managing cookies</h2><p>You can restrict or delete cookies through your browser settings. Blocking essential cookies may affect sign-in or other features. For privacy questions, contact <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>.</p></section>
      </article>
    </div>
  )
}