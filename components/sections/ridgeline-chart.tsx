"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const WIDTH = 600;
const HEIGHT = 480;
const LINE_COUNT = 30;
const POINT_COUNT = 96;
const TOP = 72;
const BOTTOM = 452;

const LINE_CLASS = "fill-paper stroke-ink";
const INCIDENT_CLASS = "fill-paper stroke-signal";

// Seeded random numbers: the chart looks organic but starts identical on every render.
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

interface LineShape {
  baseY: number;
  depth: number; // 1 = front row, smaller = further back
  opacity: number;
  center: number;
  spread: number;
  amplitude: number;
  p1: number;
  p2: number;
  p3: number;
}

interface Incident {
  line: number;
  x: number;
  strength: number;
}

const SHAPES: LineShape[] = (() => {
  const random = createRandom(7);
  return Array.from({ length: LINE_COUNT }, (_, i) => {
    const u = i / (LINE_COUNT - 1);
    // Perspective: rows spread out and grow taller toward the front, and fade toward the back.
    const depth = 0.7 + 0.5 * u;
    return {
      baseY: TOP + (BOTTOM - TOP) * (0.6 * u + 0.4 * u * u),
      depth,
      opacity: 0.35 + 0.65 * u,
      center: 0.5 + (random() - 0.5) * 0.16,
      spread: 0.12 + random() * 0.06,
      amplitude: (34 + random() * 24) * depth,
      p1: random() * Math.PI * 2,
      p2: random() * Math.PI * 2,
      p3: random() * Math.PI * 2,
    };
  });
})();

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// Height of one row at horizontal position t (0 to 1).
function lineY(shape: LineShape, index: number, time: number, incident: Incident, t: number) {
  const distance = index - incident.line;
  const weight = Math.exp(-(distance * distance) / 2.4) * incident.strength * shape.depth;
  const envelope = Math.exp(-((t - shape.center) ** 2) / (2 * shape.spread * shape.spread));
  const noise =
    0.5 +
    0.5 *
      (Math.sin(t * 11 + shape.p1 + time * 0.9) * 0.55 +
        Math.sin(t * 23 + shape.p2 - time * 1.3) * 0.3 +
        Math.sin(t * 47 + shape.p3 + time * 2.1) * 0.15);
  const spike = 64 * weight * Math.exp(-((t - incident.x) ** 2) / (2 * 0.03 * 0.03));
  return shape.baseY - envelope * shape.amplitude * noise - spike;
}

// Builds one line. The path closes below and outside the chart, so each line's
// paper-coloured fill hides the lines behind it and the closing edges stay hidden.
function linePath(shape: LineShape, index: number, time: number, incident: Incident): string {
  let points = "";
  let firstY = shape.baseY;
  let lastY = shape.baseY;

  for (let j = 0; j < POINT_COUNT; j++) {
    const t = j / (POINT_COUNT - 1);
    const y = lineY(shape, index, time, incident, t);
    if (j === 0) firstY = y;
    if (j === POINT_COUNT - 1) lastY = y;
    points += ` L ${(t * WIDTH).toFixed(1)} ${y.toFixed(1)}`;
  }

  return `M -8 ${HEIGHT + 8} L -8 ${firstY.toFixed(1)}${points} L ${WIDTH + 8} ${lastY.toFixed(1)} L ${WIDTH + 8} ${HEIGHT + 8} Z`;
}

// The row that visibly forms the spike: whichever reaches highest at the spike's position.
function peakLine(time: number, incident: Incident): number {
  const around = Math.round(incident.line);
  let best = clamp(around, 0, LINE_COUNT - 1);
  let bestY = Infinity;
  for (let i = Math.max(0, around - 3); i <= Math.min(LINE_COUNT - 1, around + 3); i++) {
    const shape = SHAPES[i];
    if (!shape) continue;
    const y = lineY(shape, i, time, incident, incident.x);
    if (y < bestY) {
      bestY = y;
      best = i;
    }
  }
  return best;
}

// Which row sits under a given vertical position (in chart units).
function nearestLine(y: number): number {
  let best = 0;
  let bestDistance = Infinity;
  SHAPES.forEach((shape, i) => {
    const distance = Math.abs(shape.baseY - 20 - y);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  });
  return best;
}

const INITIAL_INCIDENT: Incident = { line: 20, x: 0.64, strength: 1 };
const INITIAL_RED = peakLine(0, INITIAL_INCIDENT);
const INITIAL_PATHS = SHAPES.map((shape, i) => linePath(shape, i, 0, INITIAL_INCIDENT));

function styleLine(
  path: SVGPathElement | null | undefined,
  shape: LineShape | undefined,
  incident: boolean,
) {
  if (!path || !shape) return;
  path.setAttribute("class", incident ? INCIDENT_CLASS : LINE_CLASS);
  path.setAttribute("stroke-width", incident ? "2" : "1.1");
  path.setAttribute("stroke-opacity", incident ? "1" : String(shape.opacity));
}

export function RidgelineChart({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const element = svgRef.current;
    if (!element) return;
    const svg: SVGSVGElement = element;

    // Respect visitors who asked their device for less motion: keep the still chart.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const incident: Incident = { ...INITIAL_INCIDENT };
    const pointer = { active: false, line: 0, x: 0 };
    let redIndex = INITIAL_RED;
    let visible = false;
    let frame = 0;
    let last = 0;
    let time = 0;

    function onPointerMove(event: PointerEvent) {
      const rect = svg.getBoundingClientRect();
      const y = ((event.clientY - rect.top) / rect.height) * HEIGHT;
      pointer.x = clamp((event.clientX - rect.left) / rect.width, 0.05, 0.95);
      pointer.line = nearestLine(y);
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function tick(now: number) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += dt;

      // Without a pointer, the incident drifts slowly on its own.
      const targetLine = pointer.active ? pointer.line : 20 + Math.sin(time * 0.23) * 6;
      const targetX = pointer.active ? pointer.x : 0.64 + Math.sin(time * 0.37) * 0.18;
      const targetStrength = pointer.active ? 1.35 : 1;
      const ease = Math.min(1, dt * 4);
      incident.line += (targetLine - incident.line) * ease;
      incident.x += (targetX - incident.x) * ease;
      incident.strength += (targetStrength - incident.strength) * ease;

      SHAPES.forEach((shape, i) => {
        pathRefs.current[i]?.setAttribute("d", linePath(shape, i, time, incident));
      });

      const nextRed = peakLine(time, incident);
      if (nextRed !== redIndex) {
        styleLine(pathRefs.current[redIndex], SHAPES[redIndex], false);
        styleLine(pathRefs.current[nextRed], SHAPES[nextRed], true);
        redIndex = nextRed;
      }

      frame = visible ? requestAnimationFrame(tick) : 0;
    }

    // Only animate while the chart is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible && frame === 0) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(svg);
    svg.addEventListener("pointermove", onPointerMove);
    svg.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      svg.removeEventListener("pointermove", onPointerMove);
      svg.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("block h-auto w-full touch-pan-y", className)}
      role="img"
      aria-labelledby="ridgeline-title"
    >
      <title id="ridgeline-title">
        A live signal chart of stacked lines, with one incident spike in red that moves across it
      </title>
      {INITIAL_PATHS.map((d, i) => (
        <path
          key={`line-${i}`}
          ref={(path) => {
            pathRefs.current[i] = path;
          }}
          d={d}
          className={i === INITIAL_RED ? INCIDENT_CLASS : LINE_CLASS}
          strokeWidth={i === INITIAL_RED ? 2 : 1.1}
          strokeOpacity={i === INITIAL_RED ? 1 : SHAPES[i]?.opacity}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
