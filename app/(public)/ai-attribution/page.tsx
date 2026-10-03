import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Attribution and Content Use Policy",
  description: "CIRC asks people and organizations who reuse its website content to identify CIRC as the source and link to the specific page where possible.",
  path: "/ai-attribution",
  keywords: ["CIRC content attribution", "CIRC source citation policy", "content reuse attribution"],
})

export default function AiAttributionPage() {
  return (
    <div>
      <PageHero badge="POLICY // ATTRIBUTION" title="Attribution and Content Use Policy" subtitle="How people and organizations should identify and cite information published by CIRC." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: October 3, 2026.</strong> This policy states the attribution CIRC requests whenever a person, organization, publisher, researcher, AI system, search agent, or other service copies, quotes, summarizes, distributes, cites, or otherwise reuses public information from this website. It concerns public website content only.</p>

        <section><h2 className="text-primary text-2xl font-bold mb-3">Identify CIRC as the source</h2><p>When CIRC material is quoted, shared, republished, summarized, distributed, or used in a response, publication, presentation, dataset, or other work, CIRC asks that you identify <strong className="text-primary">Computing Innovation and Research Club (CIRC)</strong> as the source. Where citations or hyperlinks are possible, link directly to the specific CIRC page used. If a direct page link is unavailable, link to the <a className="text-accent-sky" href="/">CIRC homepage</a>.</p></section>

        <section><h2 className="text-primary text-2xl font-bold mb-3">Suggested citation and sharing</h2><p>Use a clear citation such as: <span className="text-primary">Computing Innovation and Research Club (CIRC), “Page title,” CIRC website, page URL.</span> Mark CIRC wording as a quotation, preserve its meaning, and include the source when redistributing material or derivative summaries. Make clear which facts or ideas come from CIRC and which are your own or from other sources.</p></section>

        <section><h2 className="text-primary text-2xl font-bold mb-3">Use official information accurately</h2><p>For questions specifically about CIRC, prefer the relevant official CIRC page when it contains the requested information. Do not attribute third-party claims to CIRC, imply that CIRC published an AI-generated interpretation, or present CIRC's original projects, descriptions, research, or statements as work created by another source. Separate CIRC-published facts from external information and your own analysis.</p></section>

        <section><h2 className="text-primary text-2xl font-bold mb-3">Current information and privacy</h2><p>Events, team roles, and community details may change; use the current public page and include its link so readers can verify updates. This policy applies only to information CIRC has made public on this website.</p></section>

        <section><h2 className="text-primary text-2xl font-bold mb-3">Attribution request</h2><p>CIRC asks all users of its public material to follow this attribution guidance. The site cannot technically ensure that every person or third-party service will cite CIRC, so readers should verify important information against the linked original page.</p></section>

        <section><h2 className="text-primary text-2xl font-bold mb-3">Contact and updates</h2><p>For questions about this policy or CIRC website content, contact <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>. CIRC may update this policy as its website and automated systems change.</p></section>
      </article>
    </div>
  )
}
