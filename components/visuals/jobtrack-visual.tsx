import { IsoBox, iso, isoShift, toPoints } from "@/components/visuals/iso";

const COL_W = 64;
const COL_STEP = 76;
const COL_D = 150;
const STAGES = ["Saved", "Applied", "Interview", "Offer"];
const CARD = { w: 52, d: 26, h: 6 };
const SLOT_Y = [8, 40, 72];
const STACKS = [2, 3, 2, 1];
const MOVING_Y = 112;

export function JobTrackVisual() {
  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full" aria-hidden="true">
      <g transform="translate(178.5 40.5)">
        {STAGES.map((stage, i) => {
          const x = i * COL_STEP;
          const [tx, ty] = iso(x + COL_W / 2, 0);
          return (
            <g key={stage}>
              <polygon
                points={toPoints([
                  iso(x, 0),
                  iso(x + COL_W, 0),
                  iso(x + COL_W, COL_D),
                  iso(x, COL_D),
                ])}
                className="fill-ink/5 stroke-rule"
              />
              <text
                x={tx}
                y={ty - 12}
                textAnchor="middle"
                className="fill-muted font-mono text-[11px]"
              >
                {stage}
              </text>
              {SLOT_Y.slice(0, STACKS[i]).map((y) => (
                <IsoBox key={y} box={{ x: x + 6, y, ...CARD }} className="fill-paper stroke-ink" />
              ))}
            </g>
          );
        })}

        <g
          className="card-advance"
          style={{
            "--c1-lift": isoShift(38, 0, 16),
            "--c1": isoShift(76, 0),
            "--c2-lift": isoShift(114, 0, 16),
            "--c2": isoShift(152, 0),
            "--c3-lift": isoShift(190, 0, 16),
            "--c3": isoShift(228, 0),
          }}
        >
          <IsoBox
            box={{ x: 6, y: MOVING_Y, ...CARD }}
            className="fill-paper stroke-ink"
            topClassName="fill-ink stroke-ink"
            strokeWidth={1.4}
          />
        </g>
      </g>
    </svg>
  );
}
