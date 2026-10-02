/** Pure CPU simulation for the constellation: drifting points, cursor magnet, link lists. */

export type SimConfig = {
  count: number;
  linkDistance: number;
  pointerRadius: number;
  maxSegments: number;
};

export type Sim = {
  positions: Float32Array; // x,y,z per point (z stays 0)
  glow: Float32Array; // 0..1 per point, how strongly it is lit by the cursor
  phase: Float32Array; // 0..2pi per point, drives the twinkle in the shader
  segmentPositions: Float32Array; // 2 vertices * 3 per segment
  segmentColors: Float32Array; // 2 vertices * 4 per segment (rgba)
  segmentCount: number;
  resize: (width: number, height: number) => void;
  step: (dt: number, pointer: PointerState) => void;
};

export type PointerState = { x: number; y: number; presence: number };
export type Rgb = readonly [number, number, number];

const DRIFT_MIN = 5;
const DRIFT_MAX = 16;
const PULL_ACCEL = 1100;
const PULL_DAMPING = 3;
const PULL_SOFT_CORE = 40;
const PULL_VELOCITY_CAP = 220;
const EDGE_MARGIN = 20;
const NODE_LINK_ALPHA = 0.3;
const POINTER_LINK_ALPHA = 0.8;
const SWIRL = 0.45; // sideways share of the cursor pull, so points orbit instead of collapsing
const WOBBLE_SPEED = 0.35; // rad/s, the slow undulation that keeps an idle field alive
const WOBBLE_AMPLITUDE = 7; // px/s of extra velocity

export function createSim(
  config: SimConfig,
  width: number,
  height: number,
  nodeColor: Rgb,
  pointerColor: Rgb,
): Sim {
  const { count, linkDistance, pointerRadius, maxSegments } = config;
  const positions = new Float32Array(count * 3);
  const glow = new Float32Array(count);
  const phase = new Float32Array(count);
  const drift = new Float32Array(count * 2);
  const pull = new Float32Array(count * 2);
  const segmentPositions = new Float32Array(maxSegments * 6);
  const segmentColors = new Float32Array(maxSegments * 8);
  let w = width;
  let h = height;

  for (let i = 0; i < count; i++) {
    positions[i * 3] = Math.random() * w;
    positions[i * 3 + 1] = Math.random() * h;
    phase[i] = Math.random() * Math.PI * 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = DRIFT_MIN + Math.random() * (DRIFT_MAX - DRIFT_MIN);
    drift[i * 2] = Math.cos(angle) * speed;
    drift[i * 2 + 1] = Math.sin(angle) * speed;
  }

  const sim: Sim = {
    positions,
    glow,
    phase,
    segmentPositions,
    segmentColors,
    segmentCount: 0,
    resize(nextWidth, nextHeight) {
      const sx = nextWidth / w;
      const sy = nextHeight / h;
      for (let i = 0; i < count; i++) {
        positions[i * 3] *= sx;
        positions[i * 3 + 1] *= sy;
      }
      w = nextWidth;
      h = nextHeight;
    },
    step(dt, pointer) {
      clock += dt;
      advancePoints(dt, pointer);
      sim.segmentCount = buildSegments(pointer);
    },
  };

  let clock = 0;

  function advancePoints(dt: number, pointer: PointerState) {
    const damp = Math.exp(-PULL_DAMPING * dt);
    const radius2 = pointerRadius * pointerRadius;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const px = positions[ix];
      const py = positions[ix + 1];
      const dx = pointer.x - px;
      const dy = pointer.y - py;
      const d2 = dx * dx + dy * dy;
      let lit = 0;

      pull[i * 2] *= damp;
      pull[i * 2 + 1] *= damp;
      if (pointer.presence > 0.01 && d2 < radius2) {
        const d = Math.sqrt(d2) || 1;
        lit = (1 - d / pointerRadius) * pointer.presence;
        const core = Math.min(1, d / PULL_SOFT_CORE);
        const accel = PULL_ACCEL * lit * core * dt;
        const nx = dx / d;
        const ny = dy / d;
        pull[i * 2] = clamp(pull[i * 2] + (nx - ny * SWIRL) * accel, PULL_VELOCITY_CAP);
        pull[i * 2 + 1] = clamp(pull[i * 2 + 1] + (ny + nx * SWIRL) * accel, PULL_VELOCITY_CAP);
      }
      glow[i] = lit;

      const wobbleAngle = clock * WOBBLE_SPEED + phase[i];
      const wobbleX = Math.cos(wobbleAngle) * WOBBLE_AMPLITUDE;
      const wobbleY = Math.sin(wobbleAngle * 1.3) * WOBBLE_AMPLITUDE;
      positions[ix] = wrap(px + (drift[i * 2] + wobbleX + pull[i * 2]) * dt, w);
      positions[ix + 1] = wrap(py + (drift[i * 2 + 1] + wobbleY + pull[i * 2 + 1]) * dt, h);
    }
  }

  // Spatial hash: cell size equals the link distance, so a point only checks its 3x3 cells.
  const cellSize = linkDistance;
  const nextInCell = new Int32Array(count);
  let cols = 1;
  let rows = 1;
  let cellHead = new Int32Array(1);

  function bucketPoints() {
    cols = Math.ceil((w + 2 * EDGE_MARGIN) / cellSize) + 1;
    rows = Math.ceil((h + 2 * EDGE_MARGIN) / cellSize) + 1;
    if (cellHead.length < cols * rows) cellHead = new Int32Array(cols * rows);
    cellHead.fill(-1, 0, cols * rows);
    for (let i = 0; i < count; i++) {
      const cx = Math.max(0, Math.min(cols - 1, Math.floor((positions[i * 3] + EDGE_MARGIN) / cellSize)));
      const cy = Math.max(0, Math.min(rows - 1, Math.floor((positions[i * 3 + 1] + EDGE_MARGIN) / cellSize)));
      const cell = cy * cols + cx;
      nextInCell[i] = cellHead[cell];
      cellHead[cell] = i;
    }
  }

  function buildSegments(pointer: PointerState): number {
    let n = 0;
    const link2 = linkDistance * linkDistance;
    const pr2 = pointerRadius * pointerRadius;
    bucketPoints();

    for (let i = 0; i < count && n < maxSegments; i++) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const cx = Math.max(0, Math.min(cols - 1, Math.floor((ax + EDGE_MARGIN) / cellSize)));
      const cy = Math.max(0, Math.min(rows - 1, Math.floor((ay + EDGE_MARGIN) / cellSize)));
      for (let gy = Math.max(0, cy - 1); gy <= Math.min(rows - 1, cy + 1); gy++) {
        for (let gx = Math.max(0, cx - 1); gx <= Math.min(cols - 1, cx + 1); gx++) {
          for (let j = cellHead[gy * cols + gx]; j !== -1 && n < maxSegments; j = nextInCell[j]) {
            if (j <= i) continue;
            const dx = positions[j * 3] - ax;
            const dy = positions[j * 3 + 1] - ay;
            const d2 = dx * dx + dy * dy;
            if (d2 >= link2) continue;
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * NODE_LINK_ALPHA;
            writeSegment(n++, ax, ay, positions[j * 3], positions[j * 3 + 1], nodeColor, alpha, alpha);
          }
        }
      }
      if (pointer.presence <= 0.01) continue;
      const pdx = pointer.x - ax;
      const pdy = pointer.y - ay;
      const pd2 = pdx * pdx + pdy * pdy;
      if (pd2 >= pr2 || n >= maxSegments) continue;
      const strength = (1 - Math.sqrt(pd2) / pointerRadius) * pointer.presence;
      writeSegment(n++, ax, ay, pointer.x, pointer.y, pointerColor, strength * POINTER_LINK_ALPHA * 0.5, strength * POINTER_LINK_ALPHA);
    }
    return n;
  }

  function writeSegment(
    index: number,
    ax: number,
    ay: number,
    bx: number,
    by: number,
    color: Rgb,
    alphaA: number,
    alphaB: number,
  ) {
    const p = index * 6;
    segmentPositions[p] = ax;
    segmentPositions[p + 1] = ay;
    segmentPositions[p + 2] = 0;
    segmentPositions[p + 3] = bx;
    segmentPositions[p + 4] = by;
    segmentPositions[p + 5] = 0;
    const c = index * 8;
    segmentColors[c] = color[0];
    segmentColors[c + 1] = color[1];
    segmentColors[c + 2] = color[2];
    segmentColors[c + 3] = alphaA;
    segmentColors[c + 4] = color[0];
    segmentColors[c + 5] = color[1];
    segmentColors[c + 6] = color[2];
    segmentColors[c + 7] = alphaB;
  }

  return sim;
}

function clamp(value: number, limit: number): number {
  return Math.max(-limit, Math.min(limit, value));
}

function wrap(value: number, size: number): number {
  if (value < -EDGE_MARGIN) return size + EDGE_MARGIN;
  if (value > size + EDGE_MARGIN) return -EDGE_MARGIN;
  return value;
}
