"use client";

export function ClientMarquee({ names }: { names: string[] }) {
  return (
    <div className="no-scrollbar relative mt-7 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max gap-14 motion-safe:animate-[marquee_32s_linear_infinite]">
        {[...names, ...names].map((n, i) => (
          <span key={`${n}-${i}`} className="shrink-0 font-display text-[19px] font-medium text-subtle">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
