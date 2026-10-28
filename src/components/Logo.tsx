import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[19px] font-semibold tracking-tight text-ink hover:text-ink">
      <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand text-[14px] font-bold text-white">
        PA
      </span>
      {site.name}
    </Link>
  );
}
