import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <span className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-medium text-primary">
          Now in Beta
        </span>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Payments made <span className="text-primary">simple</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          EasePay makes it effortless to send, receive, and manage payments. Built for speed,
          security, and simplicity.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="cursor-pointer rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="cursor-pointer rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-surface px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-foreground">Why EasePay?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Everything you need to handle payments, in one place.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Lightning Fast"
              description="Transactions complete in seconds, not days. Real-time processing with instant confirmations."
            />
            <FeatureCard
              title="Bank-Level Security"
              description="End-to-end encryption, fraud detection, and PCI DSS compliance to keep your money safe."
            />
            <FeatureCard
              title="Simple Integration"
              description="Clean APIs and SDKs that integrate with your stack in minutes, not weeks."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
