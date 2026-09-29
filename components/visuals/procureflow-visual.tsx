import { IsoBox, iso, isoShift, toPoints } from "@/components/visuals/iso";

const W = 84;
const D = 84;
const H = 56;
const ROOMS = [
  { x: 0, label: "Org A" },
  { x: 124, label: "Org B" },
  { x: 248, label: "Org C" },
];
const PROBE_ROOM_X = 124;

interface Dot {
  roomX: number;
  at: [number, number, number];
  move: [number, number, number];
  duration: number;
  delay: number;
}

// Requests moving around inside each organization's room.
const DOTS: Dot[] = [
  { roomX: 0, at: [30, 30, 20], move: [24, 0, 0], duration: 5, delay: 0 },
  { roomX: 0, at: [50, 55, 34], move: [0, -22, 0], duration: 6.5, delay: -2 },
  { roomX: 0, at: [40, 40, 14], move: [0, 0, 18], duration: 4.5, delay: -1 },
  { roomX: 124, at: [55, 30, 36], move: [0, 24, 0], duration: 5.5, delay: -3 },
  { roomX: 124, at: [60, 60, 18], move: [-20, 0, 0], duration: 6, delay: -1.5 },
  { roomX: 248, at: [30, 50, 26], move: [26, 0, 0], duration: 6, delay: -2.5 },
  { roomX: 248, at: [55, 25, 16], move: [0, 26, 0], duration: 5, delay: -0.5 },
  { roomX: 248, at: [45, 60, 38], move: [0, 0, -16], duration: 4.8, delay: -3.5 },
];

export function ProcureFlowVisual() {
  const [probeX, probeY] = iso(PROBE_ROOM_X + 42, 42, 28);
  const wall = toPoints([
    iso(PROBE_ROOM_X, 0, 0),
    iso(PROBE_ROOM_X, D, 0),
    iso(PROBE_ROOM_X, D, H),
    iso(PROBE_ROOM_X, 0, H),
  ]);

  return (
    <svg viewBox="0 0 480 310" className="block h-auto w-full" aria-hidden="true">
      <g transform="translate(132.7 81.5)">
        {ROOMS.map((room) => {
          const [ox, oy] = iso(room.x, 0, 0);
          const [ax, ay] = iso(room.x + W, 0, 0);
          const [bx, by] = iso(room.x, D, 0);
          const [cx, cy] = iso(room.x, 0, H);
          const [lx, ly] = iso(room.x + W / 2, 0, H);

          return (
            <g key={room.label}>
              <line x1={ox} y1={oy} x2={ax} y2={ay} className="stroke-rule" />
              <line x1={ox} y1={oy} x2={bx} y2={by} className="stroke-rule" />
              <line x1={ox} y1={oy} x2={cx} y2={cy} className="stroke-rule" />

              {room.x === PROBE_ROOM_X && (
                <polygon
                  points={wall}
                  className="iso-wall fill-signal stroke-signal"
                  strokeWidth={1.5}
                  strokeOpacity={0}
                  fillOpacity={0}
                />
              )}

              {DOTS.filter((dot) => dot.roomX === room.x).map((dot) => {
                const [dx, dy] = iso(room.x + dot.at[0], dot.at[1], dot.at[2]);
                return (
                  <circle
                    key={`${dot.at.join("-")}`}
                    cx={dx}
                    cy={dy}
                    r={3.2}
                    className="iso-drift fill-ink"
                    style={{
                      "--to": isoShift(...dot.move),
                      "--duration": `${dot.duration}s`,
                      "--delay": `${dot.delay}s`,
                    }}
                  />
                );
              })}

              {room.x === PROBE_ROOM_X && (
                <circle
                  cx={probeX}
                  cy={probeY}
                  r={3.8}
                  className="iso-probe fill-signal"
                  style={{ "--to": isoShift(-34, 0, 0) }}
                />
              )}

              <IsoBox
                box={{ x: room.x, y: 0, w: W, d: D, h: H }}
                className="fill-ink/5 stroke-ink"
              />
              <text
                x={lx}
                y={ly - 12}
                textAnchor="middle"
                className="fill-muted font-mono text-[11px]"
              >
                {room.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
