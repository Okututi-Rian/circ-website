import Link from "next/link"

const STEPS = [
  {
    number: "01",
    title: "Apply",
    description: "Submit a short application telling us which community fits you best.",
  },
  {
    number: "02",
    title: "Chat With Us",
    description: "A quick, informal conversation with a community lead — no pressure.",
  },
  {
    number: "03",
    title: "Onboard",
    description: "Get matched with your community, tools, and a starter project.",
  },
  {
    number: "04",
    title: "Build",
    description: "Start shipping — workshops, hackathons, and real projects await.",
  },
]

export function HowToJoin() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-accent-orange text-xs font-semibold tracking-wide uppercase mb-3">
            Our Process
          </p>
          <h2 className="section-heading">How to Join</h2>
          <p className="section-subheading max-w-xl mx-auto">
            From application to your first project — here's what to expect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <div className="font-display text-accent-orange/30 text-5xl font-bold mb-3">
                {step.number}
              </div>
              <h3 className="font-display text-primary text-lg font-bold mb-2">
                {step.title}
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/join" className="btn-primary-lg inline-flex items-center gap-2">
            Start Your Application
          </Link>
        </div>
      </div>
    </section>
  )
}