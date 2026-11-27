import Link from "next/link";
import { site } from "@/config/site";

// The mark is a solid orange square with the initials; the wordmark sits
// beside it. Colour of the wordmark follows the block it sits on.
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex min-h-11 items-center gap-3" aria-label={`${site.name}, home`}>
      <span className="flex size-9 shrink-0 items-center justify-center bg-signal text-[15px] font-bold tracking-[-0.04em] text-ink">
        PA
      </span>
      <span className="text-[20px] font-bold leading-none tracking-[-0.03em]">
        {site.shortName}
        <span className="font-normal"> Technology</span>
      </span>
    </Link>
  );
}
