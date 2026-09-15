import { PageHero } from "@/components/public/page-hero"

export const metadata = {
  title: "Privacy Policy | CIRC",
  description: "How CIRC collects, uses, and protects personal information.",
}

export default function PrivacyPage() {
  return (
    <div>
      <PageHero badge="LEGAL // PRIVACY" title="Privacy Policy" subtitle="How CIRC handles information shared through this website and our club activities." size="sm" />
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-muted leading-relaxed">
        <p><strong className="text-primary">Last updated: September 15, 2026.</strong> This policy explains how the Computing Innovation &amp; Research Club (CIRC) at Mama Ngina University College handles information provided through this website.</p>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Information we collect</h2><p>We may collect details you submit in membership applications, event registrations, or messages, such as your name, contact details, course information, and responses. We also receive standard technical information, including pages visited and browser details, through Google Analytics.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">How we use information</h2><p>We use submitted information to process applications, communicate about club activities, organize events, improve our website, and maintain secure operations. We do not sell personal information.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Sharing and retention</h2><p>Information may be shared with authorized club administrators, university staff where appropriate, and service providers that help us operate the website. We retain information only as long as reasonably needed for these purposes or as required by applicable law.</p></section>
        <section><h2 className="text-primary text-2xl font-bold mb-3">Your choices</h2><p>You may ask to access, correct, or delete information you have provided, subject to applicable requirements. Contact us at <a className="text-accent-sky" href="mailto:circ@mnu.ac.ke">circ@mnu.ac.ke</a>.</p></section>
      </article>
    </div>
  )
}