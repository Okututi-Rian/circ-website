import { PageHero } from "@/components/public/page-hero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CIRC Website Terms and Conditions",
  description: "Terms for using the Computing Innovation & Research Club website and participating in club activities at Mama Ngina University College.",
  path: "/terms",
  keywords: ["CIRC website terms", "club participation terms", "MNUC website terms"],
})

export default function TermsPage() {
  return (
    <div>
      <PageHero badge="LEGAL // TERMS" title="Terms and Conditions" subtitle="The basic terms for using the CIRC website and participating in club activities." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: October 1, 2026.</strong> These terms cover use of the Computing Innovation &amp; Research Club (CIRC) website at Mama Ngina University College. By using the site, you agree to follow these terms and applicable law. If you do not agree, do not use the site.</p>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Acceptable use</h2><p>Do not misuse the website, attempt unauthorized access, interfere with its operation, submit false or unlawful material, infringe another person’s rights, or use club resources to harm others. Membership and event participation may be subject to additional university or club rules.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Applications and accounts</h2><p>Provide accurate information when applying or using an account, and protect your sign-in credentials. An application does not guarantee membership, event admission, or access to club resources. CIRC may review, approve, or decline applications under its membership process and applicable university rules.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Content and availability</h2><p>Website information is provided for general club and community purposes. Schedules, availability, and program details may change. We make reasonable efforts to keep information current but do not guarantee that every item is complete or error-free. Content you submit must be yours or used with permission. You allow CIRC to use submitted content as needed to review your application or provide the service you requested; this does not transfer your ownership of it.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Third-party services and privacy</h2><p>The website relies on third-party providers for some services. Their services may have separate terms and privacy practices. Our collection and use of personal information are described in the <a className="text-accent-sky" href="/privacy">Privacy Policy</a> and <a className="text-accent-sky" href="/cookies">Cookie Policy</a>.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Changes and contact</h2><p>We may change the website or these terms as club operations evolve. The updated date above identifies the latest revision. Questions can be sent to <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>.</p></section>
      </article>
    </div>
  )
}
