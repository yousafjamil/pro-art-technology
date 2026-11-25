import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell py-32 sm:py-40">
      <div className="max-w-[640px]">
        <p className="meta text-subtle">404</p>
        <h1 className="mt-5 text-[clamp(36px,4.4vw,56px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">Page not found</h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">
            Go home
          </Link>
          <Link href="/work" className="btn btn-line">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
