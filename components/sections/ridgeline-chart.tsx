import { cn } from "@/lib/cn";

const WIDTH = 600;
const HEIGHT = 480;
const LINE_COUNT = 30;
const POINT_COUNT = 96;
const TOP = 72;
const BOTTOM = 452;
const INCIDENT_LINE = 20;
const INCIDENT_X = 0.64;

// Seeded random numbers: the chart looks organic but is identical on every render.
function createRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface RidgeLine {
  id: string;
  d: string;
  incident: boolean;
}

function buildLines(): RidgeLine[] {
  const random = createRandom(7);
  const spacing = (BOTTOM - TOP) / (LINE_COUNT - 1);
  const lines: RidgeLine[] = [];

  for (let i = 0; i < LINE_COUNT; i++) {
    const baseY = TOP + i * spacing;
    const center = 0.5 + (random() - 0.5) * 0.16;
    const spread = 0.12 + random() * 0.06;
    const amplitude = 34 + random() * 24;
    const p1 = random() * Math.PI * 2;
    const p2 = random() * Math.PI * 2;
    const p3 = random() * Math.PI * 2;
    const distance = i - INCIDENT_LINE;
    const incidentWeight = Math.exp(-(distance * distance) / 2.4);

    const ys: number[] = [];
    for (let j = 0; j < POINT_COUNT; j++) {
      const t = j / (POINT_COUNT - 1);
      const envelope = Math.exp(-((t - center) ** 2) / (2 * spread * spread));
      const noise =
        0.5 +
        0.5 *
          (Math.sin(t * 11 + p1) * 0.55 +
            Math.sin(t * 23 + p2) * 0.3 +
            Math.sin(t * 47 + p3) * 0.15);
      const spike = 64 * incidentWeight * Math.exp(-((t - INCIDENT_X) ** 2) / (2 * 0.03 * 0.03));
      ys.push(baseY - envelope * amplitude * noise - spike);
    }

    const points = ys.map(
      (y, j) => `${((j / (POINT_COUNT - 1)) * WIDTH).toFixed(1)} ${y.toFixed(1)}`,
    );
    const firstY = (ys[0] ?? baseY).toFixed(1);
    const lastY = (ys[ys.length - 1] ?? baseY).toFixed(1);

    // The path closes below and outside the chart, so each line's paper-coloured
    // fill hides the lines behind it, and the closing edges are never visible.
    const d = `M -8 ${HEIGHT + 8} L -8 ${firstY} L ${points.join(" L ")} L ${WIDTH + 8} ${lastY} L ${WIDTH + 8} ${HEIGHT + 8} Z`;

    lines.push({ id: `line-${i}`, d, incident: i === INCIDENT_LINE });
  }

  return lines;
}

const RIDGE_LINES = buildLines();

export function RidgelineChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("block h-auto w-full", className)}
      role="img"
      aria-labelledby="ridgeline-title"
    >
      <title id="ridgeline-title">
        A signal chart of stacked lines, with one incident spike highlighted in red
      </title>
      {RIDGE_LINES.map((line) => (
        <path
          key={line.id}
          d={line.d}
          className={line.incident ? "fill-paper stroke-signal" : "fill-paper stroke-ink"}
          strokeWidth={line.incident ? 2 : 1.1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
