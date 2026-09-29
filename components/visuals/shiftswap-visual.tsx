import { IsoBox, iso, isoShift, toPoints, type Box } from "@/components/visuals/iso";

const LANE_GAP = 40;
const LANE_DEPTH = 32;
const LENGTH = 300;
const HOURS = [0, 50, 100, 150, 200, 250, 300];

function shiftBox(lane: number, from: number, to: number): Box {
  return { x: from, y: lane * LANE_GAP + 4, w: to - from, d: 24, h: 16 };
}

// Existing shifts. The one in lane 1 overlaps the shift being swapped.
const EXISTING = [
  { lane: 0, from: 20, to: 100, conflict: false },
  { lane: 1, from: 150, to: 250, conflict: true },
  { lane: 2, from: 20, to: 100, conflict: false },
];

export function ShiftSwapVisual() {
  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full" aria-hidden="true">
      <g transform="translate(158.5 55)">
        {[0, 1, 2].map((lane) => (
          <polygon
            key={lane}
            points={toPoints([
              iso(0, lane * LANE_GAP),
              iso(LENGTH, lane * LANE_GAP),
              iso(LENGTH, lane * LANE_GAP + LANE_DEPTH),
              iso(0, lane * LANE_GAP + LANE_DEPTH),
            ])}
            className="fill-ink/5 stroke-rule"
          />
        ))}

        {HOURS.map((hour) => {
          const [x1, y1] = iso(hour, 0);
          const [x2, y2] = iso(hour, LANE_GAP * 2 + LANE_DEPTH);
          return (
            <line
              key={hour}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-rule"
              strokeDasharray="2 4"
            />
          );
        })}

        {EXISTING.map((shift) => (
          <IsoBox
            key={`${shift.lane}-${shift.from}`}
            box={shiftBox(shift.lane, shift.from, shift.to)}
            className={
              shift.conflict ? "swap-conflict fill-ink/5 stroke-ink" : "fill-ink/5 stroke-ink"
            }
          />
        ))}

        <g
          className="swap-move"
          style={{
            "--lane-conflict": isoShift(0, LANE_GAP),
            "--lane-free": isoShift(0, LANE_GAP * 2),
          }}
        >
          <IsoBox
            box={shiftBox(0, 140, 220)}
            className="swap-conflict fill-ink/5 stroke-ink"
            topClassName="swap-conflict fill-ink/15 stroke-ink"
            strokeWidth={1.6}
          />
        </g>
      </g>
    </svg>
  );
}
