import Link from "next/link";

export default function NotFound() {
  return (
    <section className="on-night">
      <div className="shell py-28 sm:py-40">
        <div className="max-w-[760px]">
          <div className="flex items-center gap-4">
            <span className="dash" aria-hidden="true" />
            <p className="eyebrow text-on-night-muted">Error 404</p>
          </div>
          <h1 className="display mt-8">Page not found</h1>
          <p className="lede mt-8 text-on-night-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Go home
            </Link>
            <Link href="/work" className="btn btn-outline">
              See our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
