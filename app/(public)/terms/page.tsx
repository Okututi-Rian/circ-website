import { PageHero } from "@/components/public/page-hero"

export const metadata = {
  title: "Terms and Conditions | CIRC",
  description: "Terms governing use of the CIRC website and club services.",
}

export default function TermsPage() {
  return (
    <div>
      <PageHero badge="LEGAL // TERMS" title="Terms and Conditions" subtitle="The basic terms for using the CIRC website and participating in club activities." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: September 15, 2026.</strong> By using this website or submitting a CIRC application, you agree to use the service lawfully and respectfully.</p>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Acceptable use</h2><p>Do not misuse the website, attempt unauthorized access, interfere with its operation, submit misleading information, or use club resources to harm others. Membership and event participation may be subject to additional university or club rules.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Content</h2><p>Information is provided for general club and community purposes. We work to keep it accurate, but schedules, availability, and program details may change without notice. Content submitted by members must be original or appropriately authorized.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Accounts and applications</h2><p>You are responsible for accurate information submitted through the site and for keeping any account credentials confidential. An application does not guarantee membership, event admission, or access to club resources.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Contact</h2><p>Questions about these terms can be sent to <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>. We may update these terms when the website or club operations change.</p></section>
      </article>
    </div>
  )
}