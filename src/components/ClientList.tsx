// The client names as a plain ruled list, like a schedule on a drawing.
// Static: no marquee, nothing loops.
export function ClientList({ names }: { names: string[] }) {
  return (
    <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
      {names.map((n) => (
        <li key={n} className="flex min-h-16 items-center border-b border-r border-line px-4 py-4 text-[16px] text-muted sm:px-6">
          {n}
        </li>
      ))}
    </ul>
  );
}
