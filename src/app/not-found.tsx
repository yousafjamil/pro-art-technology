import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[720px] px-5 py-[160px] text-center">
      <h1 className="text-[clamp(40px,5vw,64px)] font-medium tracking-[-0.03em]">Page not found</h1>
      <p className="mt-4 text-lg text-muted">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white hover:text-white">
          Go home
        </Link>
        <Link href="/work" className="rounded-full border border-outline px-7 py-3.5 font-semibold text-brand">
          See our work
        </Link>
      </div>
    </section>
  );
}
