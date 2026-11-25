// The hero's drawing sheet: a mobile app screen and a web platform layout
// drawn as a technical elevation, with dimension lines, numbered item
// balloons and a parts list, like a page from a spec. Pure SVG in the
// neutral ramp; the only colour is the primary action, item 3, in the accent.
// Two versions: the full sheet from md up, and a cropped sheet (the phone
// alone) on small screens so no label is drawn below 11px.

const LINE = { fill: "none", vectorEffect: "non-scaling-stroke" as const };
const TEXT = "font-mono fill-subtle";

// Phone in its own coordinates: 180 x 390 (a 390 x 844 screen, scaled).
// Item positions (y) used by the balloons: 1 at 54, 2 at 128, 3 at 362.
function Phone({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <rect x="0.5" y="0.5" width="179" height="389" rx="24" {...LINE} className="stroke-muted" strokeWidth="1" />
      <rect x="8" y="8" width="164" height="374" rx="17" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <rect x="66" y="16" width="48" height="8" rx="4" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      {/* 1 Navigation */}
      <rect x="20" y="40" width="140" height="28" rx="4" {...LINE} className="stroke-muted" strokeWidth="1" />
      <rect x="30" y="51" width="36" height="6" className="fill-line-strong" />
      <rect x="128" y="50" width="22" height="8" rx="2" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      {/* 2 Content */}
      <rect x="20" y="80" width="140" height="96" rx="4" {...LINE} className="stroke-muted" strokeWidth="1" />
      <path d="M20 80 L160 176 M160 80 L20 176" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <rect x="20" y="188" width="100" height="6" className="fill-line-strong" />
      <rect x="20" y="200" width="72" height="6" className="fill-line-strong" />
      <rect x="20" y="220" width="140" height="56" rx="4" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <rect x="20" y="288" width="140" height="48" rx="4" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      {/* 3 Primary action, the one accent mark */}
      <rect x="20" y="350" width="140" height="24" rx="4" {...LINE} className="stroke-accent" strokeWidth="1.5" />
    </g>
  );
}

function Balloon({ x, y, n, accent }: { x: number; y: number; n: number; accent?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" {...LINE} className={accent ? "stroke-accent" : "stroke-muted"} strokeWidth="1" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" className={accent ? "font-mono fill-accent" : TEXT}>
        {n}
      </text>
    </g>
  );
}

function Leader({ d, accent }: { d: string; accent?: boolean }) {
  return <path d={d} {...LINE} className={accent ? "stroke-accent" : "stroke-subtle"} strokeWidth="1" />;
}

// A dimension: extension lines, the dimension line with 45 degree ticks, the value.
function DimH({ x1, x2, y, value }: { x1: number; x2: number; y: number; value: string }) {
  return (
    <g>
      <path
        d={`M${x1} ${y - 8} V${y + 12} M${x2} ${y - 8} V${y + 12} M${x1} ${y} H${x2} M${x1 - 4} ${y + 4} L${x1 + 4} ${y - 4} M${x2 - 4} ${y + 4} L${x2 + 4} ${y - 4}`}
        {...LINE}
        className="stroke-subtle"
        strokeWidth="1"
      />
      <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" fontSize="11" className={TEXT}>
        {value}
      </text>
    </g>
  );
}

function DimV({ y1, y2, x, value }: { y1: number; y2: number; x: number; value: string }) {
  const cy = (y1 + y2) / 2;
  return (
    <g>
      <path
        d={`M${x - 12} ${y1} H${x + 8} M${x - 12} ${y2} H${x + 8} M${x} ${y1} V${y2} M${x - 4} ${y1 + 4} L${x + 4} ${y1 - 4} M${x - 4} ${y2 + 4} L${x + 4} ${y2 - 4}`}
        {...LINE}
        className="stroke-subtle"
        strokeWidth="1"
      />
      <text x={x - 6} y={cy} textAnchor="middle" fontSize="11" transform={`rotate(-90 ${x - 6} ${cy})`} className={TEXT}>
        {value}
      </text>
    </g>
  );
}

const parts = ["Navigation", "Content", "Primary action", "Customer portal", "Reports & dashboards"];

function FullSheet() {
  const zonesX = ["A", "B", "C", "D", "E", "F"];
  const zonesY = ["1", "2", "3", "4"];
  const zw = 712 / 6;
  const zh = 552 / 4;
  return (
    <svg viewBox="0 0 760 600" className="block h-auto w-full" aria-hidden="true">
      {/* Sheet border and zone ticks */}
      <rect x="0.5" y="0.5" width="759" height="599" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <rect x="24.5" y="24.5" width="711" height="551" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      {zonesX.map((z, i) => (
        <g key={z}>
          {i > 0 && (
            <path d={`M${24 + i * zw} 0 V24 M${24 + i * zw} 576 V600`} {...LINE} className="stroke-line-strong" strokeWidth="1" />
          )}
          <text x={24 + i * zw + zw / 2} y="16" textAnchor="middle" fontSize="11" className={TEXT}>{z}</text>
          <text x={24 + i * zw + zw / 2} y="592" textAnchor="middle" fontSize="11" className={TEXT}>{z}</text>
        </g>
      ))}
      {zonesY.map((z, i) => (
        <g key={z}>
          {i > 0 && (
            <path d={`M0 ${24 + i * zh} H24 M736 ${24 + i * zh} H760`} {...LINE} className="stroke-line-strong" strokeWidth="1" />
          )}
          <text x="12" y={24 + i * zh + zh / 2 + 4} textAnchor="middle" fontSize="11" className={TEXT}>{z}</text>
          <text x="748" y={24 + i * zh + zh / 2 + 4} textAnchor="middle" fontSize="11" className={TEXT}>{z}</text>
        </g>
      ))}

      {/* Mobile app elevation */}
      <DimH x1={96} x2={276} y={76} value="390" />
      <DimV y1={96} y2={486} x={68} value="844" />
      <Phone transform="translate(96 96)" />
      <Leader d="M256 150 H298" />
      <Leader d="M256 224 H298" />
      <Leader d="M256 458 H298" accent />
      <Balloon x={308} y={150} n={1} />
      <Balloon x={308} y={224} n={2} />
      <Balloon x={308} y={458} n={3} accent />

      {/* Web platform elevation */}
      <DimH x1={344} x2={712} y={76} value="1440" />
      <g>
        <rect x="344.5" y="96.5" width="367" height="229" rx="6" {...LINE} className="stroke-muted" strokeWidth="1" />
        <path d="M344 116 H712" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        {[356, 368, 380].map((cx) => (
          <circle key={cx} cx={cx} cy="106" r="3" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        ))}
        <rect x="360" y="130" width="40" height="8" className="fill-line-strong" />
        {[560, 592, 624].map((x) => (
          <rect key={x} x={x} y="131" width="24" height="6" className="fill-line-strong" />
        ))}
        <rect x="664" y="127" width="36" height="14" rx="3" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        <rect x="360" y="160" width="168" height="10" className="fill-line-strong" />
        <rect x="360" y="178" width="124" height="10" className="fill-line-strong" />
        <rect x="360" y="198" width="180" height="5" className="fill-line-strong" />
        <rect x="560" y="156" width="140" height="58" rx="4" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        <path d="M560 156 L700 214 M700 156 L560 214" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        {[360, 476, 592].map((x) => (
          <g key={x}>
            <rect x={x} y="232" width="108" height="64" rx="4" {...LINE} className="stroke-muted" strokeWidth="1" />
            {x !== 592 && (
              <>
                <rect x={x + 12} y="246" width="48" height="6" className="fill-line-strong" />
                <rect x={x + 12} y="258" width="72" height="5" className="fill-line-strong" />
                <rect x={x + 12} y="268" width="60" height="5" className="fill-line-strong" />
              </>
            )}
          </g>
        ))}
        {/* Card 3: a small bar chart, the reports view */}
        {[14, 26, 20, 34, 28, 40].map((h, i) => (
          <rect key={i} x={604 + i * 14} y={286 - h} width="8" height={h} {...LINE} className="stroke-muted" strokeWidth="1" />
        ))}
        <path d="M360 310 H700" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      </g>
      <Leader d="M414 296 V338" />
      <Leader d="M646 296 V338" />
      <Balloon x={414} y={348} n={4} />
      <Balloon x={646} y={348} n={5} />

      {/* Parts list and title block */}
      <g>
        <rect x="344.5" y="376.5" width="367" height="191" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        <path d="M396 376 V520" {...LINE} className="stroke-line-strong" strokeWidth="1" />
        {[400, 424, 448, 472, 496, 520].map((y) => (
          <path key={y} d={`M344 ${y} H712`} {...LINE} className="stroke-line-strong" strokeWidth="1" />
        ))}
        <text x="356" y="392" fontSize="11" className={TEXT}>Item</text>
        <text x="408" y="392" fontSize="11" className={TEXT}>Part</text>
        {parts.map((p, i) => (
          <g key={p}>
            <text x="356" y={416 + i * 24} fontSize="12" className={TEXT}>{i + 1}</text>
            <text x="408" y={416 + i * 24} fontSize="12" className="font-mono fill-muted">{p}</text>
          </g>
        ))}
        <text x="356" y="541" fontSize="12" className="font-mono fill-muted">Fig. 1 — Mobile app and web platform</text>
        <text x="356" y="559" fontSize="11" className={TEXT}>ProArt Technology · Abu Dhabi</text>
        <text x="700" y="559" fontSize="11" textAnchor="end" className={TEXT}>Rev. 2026</text>
      </g>
    </svg>
  );
}

function CroppedSheet() {
  // 340 wide so the 12px labels still draw at 11px or more on a 375px phone.
  return (
    <svg viewBox="0 0 340 440" className="block h-auto w-full" aria-hidden="true">
      <rect x="0.5" y="0.5" width="339" height="439" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <rect x="12.5" y="12.5" width="315" height="415" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <DimH x1={40} x2={184} y={46} value="390" />
      <DimV y1={64} y2={376} x={26} value="844" />
      <Phone transform="translate(40 64) scale(0.8)" />
      <Leader d="M168 107 H193" />
      <Leader d="M168 166 H193" />
      <Leader d="M168 354 H193" accent />
      <Balloon x={202} y={107} n={1} />
      <Balloon x={202} y={166} n={2} />
      <Balloon x={202} y={354} n={3} accent />
      <text x="218" y="111" fontSize="12" className="font-mono fill-muted">{parts[0]}</text>
      <text x="218" y="170" fontSize="12" className="font-mono fill-muted">{parts[1]}</text>
      <text x="218" y="358" fontSize="12" className="font-mono fill-muted">{parts[2]}</text>
      <path d="M12 392 H328" {...LINE} className="stroke-line-strong" strokeWidth="1" />
      <text x="24" y="414" fontSize="12" className="font-mono fill-muted">Fig. 1 — Mobile app</text>
      <text x="316" y="414" fontSize="12" textAnchor="end" className={TEXT}>Rev. 2026</text>
    </svg>
  );
}

export function HeroVisual() {
  return (
    <figure
      className="grid-field m-0 bg-bg-raised"
      role="img"
      aria-label="A mobile app screen and a web platform layout drawn as a technical sheet, with numbered parts: navigation, content, primary action, customer portal, reports and dashboards"
    >
      <div className="hidden md:block">
        <FullSheet />
      </div>
      <div className="md:hidden">
        <CroppedSheet />
      </div>
    </figure>
  );
}
