import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-[17px] font-medium text-ink">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border border-line-strong font-mono text-[12px] font-medium text-ink">
        PA
      </span>
      <span className="hidden sm:inline">
        {site.shortName} <span className="text-muted">Technology</span>
      </span>
    </Link>
  );
}
