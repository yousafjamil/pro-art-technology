import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[720px] px-5 py-[160px] text-center">
      <p className="label text-accent">404</p>
      <h1 className="mt-5 font-display text-[clamp(40px,5vw,64px)] font-medium tracking-[-0.02em] text-ink">Page not found</h1>
      <p className="mt-4 text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="label rounded-[8px] bg-accent px-7 py-3.5 text-accent-ink hover:bg-ink">
          Go home
        </Link>
        <Link href="/work" className="label rounded-[8px] border border-line-strong px-7 py-3.5 text-ink hover:border-accent-line hover:text-accent">
          See our work
        </Link>
      </div>
    </section>
  );
}
