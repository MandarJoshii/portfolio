const COS30 = Math.cos(Math.PI / 6);

export type Point = readonly [number, number];

/** Projects a 3D point onto the screen using an isometric (3D) view. */
export function iso(x: number, y: number, z = 0): Point {
  return [(x - y) * COS30, (x + y) / 2 - z];
}

export function toPoints(points: readonly Point[]): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

/** A CSS translate that moves something by (dx, dy, dz) in 3D space. */
export function isoShift(dx: number, dy: number, dz = 0): string {
  const [sx, sy] = iso(dx, dy, dz);
  return `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
}

export interface Box {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
}

/** The three faces of a box that face the viewer. */
export function boxFaces({ x, y, z = 0, w, d, h }: Box) {
  return {
    top: toPoints([
      iso(x, y, z + h),
      iso(x + w, y, z + h),
      iso(x + w, y + d, z + h),
      iso(x, y + d, z + h),
    ]),
    left: toPoints([
      iso(x, y + d, z),
      iso(x + w, y + d, z),
      iso(x + w, y + d, z + h),
      iso(x, y + d, z + h),
    ]),
    right: toPoints([
      iso(x + w, y, z),
      iso(x + w, y + d, z),
      iso(x + w, y + d, z + h),
      iso(x + w, y, z + h),
    ]),
  };
}

export function IsoBox({
  box,
  className,
  topClassName,
  strokeWidth = 1.2,
}: {
  box: Box;
  className?: string;
  topClassName?: string;
  strokeWidth?: number;
}) {
  const faces = boxFaces(box);
  return (
    <>
      <polygon
        points={faces.left}
        className={className}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <polygon
        points={faces.right}
        className={className}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <polygon
        points={faces.top}
        className={topClassName ?? className}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </>
  );
}
