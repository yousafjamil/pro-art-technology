import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 font-display text-[18px] font-semibold tracking-tight text-ink hover:text-ink"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[6px] border border-line-strong bg-bg-raised text-[12px] font-bold text-accent transition-colors group-hover:border-accent-line">
        PA
      </span>
      <span className="hidden sm:inline">{site.shortName}</span>
      <span className="hidden text-subtle sm:inline">Technology</span>
    </Link>
  );
}
