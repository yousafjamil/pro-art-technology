// The site's one signature detail: a registration mark and a sheet index in
// monospace, like the corner of an engineering drawing ("02 / 06").
// Used in exactly three places and always the same way: the hero, the
// section headings, and the project cards. Do not add it anywhere else.
export function SpecMark({ index, total, children }: { index: number; total: number; children?: React.ReactNode }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="meta inline-flex items-center gap-2 text-subtle">
      <svg aria-hidden="true" viewBox="0 0 12 12" width="12" height="12" fill="none" className="shrink-0">
        <circle cx="6" cy="6" r="3.25" stroke="currentColor" strokeWidth="1" />
        <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span>
        {pad(index)} / {pad(total)}
      </span>
      {children && <span className="text-muted">{children}</span>}
    </span>
  );
}
