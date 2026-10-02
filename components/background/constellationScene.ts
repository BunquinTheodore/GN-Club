import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  DynamicDrawUsage,
  LineSegments,
  Mesh,
  OneFactor,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  SrcAlphaFactor,
  WebGLRenderer,
  ZeroFactor,
} from "three";
import { createSim, type PointerState, type Rgb } from "./constellationSim";

type SceneOptions = { still: boolean; coarse: boolean };

type Profile = {
  maxPixelRatio: number;
  activeFrameMs: number; // frame budget while the cursor is near
  idleFrameMs: number; // frame budget once input has gone quiet (slow drift and twinkle only)
  minPoints: number;
  maxPoints: number;
  pixelsPerPoint: number;
  linkDistance: number;
  pointerRadius: number;
};

const IDLE_FRAME_MS = 1000 / 12;
// Full frame rate only for this long after the last input, then the gentle idle rate.
const ACTIVE_WINDOW_MS = 1500;
// With no input at all for this long the loop stops completely until the next input.
const PAUSE_AFTER_MS = 20000;

const DESKTOP: Profile = {
  maxPixelRatio: 1.5,
  activeFrameMs: 1000 / 45,
  idleFrameMs: IDLE_FRAME_MS,
  minPoints: 120,
  maxPoints: 260,
  pixelsPerPoint: 9000,
  linkDistance: 135,
  pointerRadius: 240,
};

// Touch: fewer points and lines, a hard 30 fps cap, and a smaller reach for a fingertip.
const TOUCH: Profile = {
  maxPixelRatio: 1.25,
  activeFrameMs: 1000 / 30,
  idleFrameMs: IDLE_FRAME_MS,
  minPoints: 40,
  maxPoints: 80,
  pixelsPerPoint: 16000,
  linkDistance: 120,
  pointerRadius: 150,
};

const RESIZE_HEIGHT_SLACK = 100;
const POINTER_EASE = 10; // per second, higher is snappier
const PRESENCE_EASE = 4;
const MAX_DT = 0.1; // above the idle frame gap, so the idle rate does not slow the drift
// The idle timer fires slightly early so the rAF it arms lands on the intended frame.
const ARM_SLACK_MS = 8;
const OFFSCREEN = -9999;
const ACTIVE_PRESENCE = 0.02;
const FADE_IN_MS = 600;
const HALO_ALPHA = 0.16;

// The canvas composites normally, so the additive look is made here: colour is added onto the
// page (src * srcAlpha + dst) and the alpha channel is left untouched at 0, which means the
// canvas never darkens or covers anything under it, it can only add light.
const ADDITIVE = {
  transparent: true,
  depthTest: false,
  depthWrite: false,
  blending: CustomBlending,
  blendEquation: AddEquation,
  blendSrc: SrcAlphaFactor,
  blendDst: OneFactor,
  blendSrcAlpha: ZeroFactor,
  blendDstAlpha: OneFactor,
} as const;
// Additive blending stacks overlapping strokes harder than the old screen blend did; this trims
// every layer so the overall brightness matches the previous look (tuned against screenshots).
const ADD_GAIN = 0.8;
const INPUT_EVENTS = ["touchstart", "wheel", "keydown"] as const;

const POINT_VERTEX = /* glsl */ `
  attribute float aGlow;
  attribute float aPhase;
  uniform float uSize;
  uniform float uTime;
  varying float vGlow;
  varying float vTwinkle;
  void main() {
    vGlow = aGlow;
    vTwinkle = 0.78 + 0.22 * sin(uTime * 0.9 + aPhase * 3.0);
    gl_PointSize = uSize * (1.0 + aGlow * 1.2);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vGlow;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.15, d);
    vec3 color = mix(uBase, uAccent, clamp(vGlow * 1.4, 0.0, 1.0));
    gl_FragColor = vec4(color, disc * (0.55 + vGlow * 0.45) * vTwinkle * ${ADD_GAIN.toFixed(2)});
  }
`;

const LINE_VERTEX = /* glsl */ `
  attribute vec4 aColor;
  varying vec4 vColor;
  void main() {
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LINE_FRAGMENT = /* glsl */ `
  varying vec4 vColor;
  void main() { gl_FragColor = vec4(vColor.rgb, vColor.a * ${ADD_GAIN.toFixed(2)}); }
`;

const HALO_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HALO_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float falloff = pow(clamp(1.0 - d, 0.0, 1.0), 2.0);
    gl_FragColor = vec4(uColor, falloff * uStrength * ${ADD_GAIN.toFixed(2)});
  }
`;

function readBrandColor(name: string, fallback: string): Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  try {
    return new Color(raw || fallback);
  } catch {
    return new Color(fallback);
  }
}

function toRgb(color: Color): Rgb {
  return [color.r, color.g, color.b];
}

function dynamicAttribute(array: Float32Array, itemSize: number): BufferAttribute {
  const attribute = new BufferAttribute(array, itemSize);
  attribute.setUsage(DynamicDrawUsage);
  return attribute;
}

/** Starts the constellation inside `host`. Returns a disposer. Throws if WebGL is unavailable. */
export function startConstellation(host: HTMLElement, options: SceneOptions): () => void {
  const profile = options.coarse ? TOUCH : DESKTOP;
  const renderer = new WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, profile.maxPixelRatio));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = false;

  let width = host.clientWidth || window.innerWidth;
  let height = host.clientHeight || window.innerHeight;
  renderer.setSize(width, height, false);
  const canvas = renderer.domElement;
  canvas.style.transition = `opacity ${FADE_IN_MS}ms ease-out`;
  host.appendChild(canvas);

  const lime = readBrandColor("--lime", "#c6f24e");
  const cyan = readBrandColor("--cyan", "#33c7e0");
  const fog = readBrandColor("--fog", "#f3f4f0");
  const nodeTone = cyan.clone().lerp(fog, 0.35);

  const density = Math.round((width * height) / profile.pixelsPerPoint);
  const count = Math.min(profile.maxPoints, Math.max(profile.minPoints, density));
  const sim = createSim(
    {
      count,
      linkDistance: profile.linkDistance,
      pointerRadius: profile.pointerRadius,
      maxSegments: count * 4,
    },
    width,
    height,
    toRgb(nodeTone),
    toRgb(lime),
  );

  const camera = new OrthographicCamera(0, width, 0, height, -1, 1);
  const scene = new Scene();

  // Soft glow under the cursor: the clearest cue that the field is reacting to the pointer.
  const haloGeometry = new PlaneGeometry(1, 1);
  const haloMaterial = new ShaderMaterial({
    vertexShader: HALO_VERTEX,
    fragmentShader: HALO_FRAGMENT,
    uniforms: { uColor: { value: lime }, uStrength: { value: 0 } },
    ...ADDITIVE,
  });
  const halo = new Mesh(haloGeometry, haloMaterial);
  halo.scale.set(profile.pointerRadius * 2, profile.pointerRadius * 2, 1);
  halo.frustumCulled = false;
  halo.visible = false;
  scene.add(halo);

  const pointGeometry = new BufferGeometry();
  const pointPositions = dynamicAttribute(sim.positions, 3);
  const pointGlow = dynamicAttribute(sim.glow, 1);
  pointGeometry.setAttribute("position", pointPositions);
  pointGeometry.setAttribute("aGlow", pointGlow);
  pointGeometry.setAttribute("aPhase", new BufferAttribute(sim.phase, 1));
  const pointMaterial = new ShaderMaterial({
    vertexShader: POINT_VERTEX,
    fragmentShader: POINT_FRAGMENT,
    uniforms: {
      uSize: { value: 3.2 * renderer.getPixelRatio() },
      uTime: { value: 0 },
      uBase: { value: nodeTone },
      uAccent: { value: lime },
    },
    ...ADDITIVE,
  });
  const points = new Points(pointGeometry, pointMaterial);
  points.frustumCulled = false;
  scene.add(points);

  const lineGeometry = new BufferGeometry();
  const linePositions = dynamicAttribute(sim.segmentPositions, 3);
  const lineColors = dynamicAttribute(sim.segmentColors, 4);
  lineGeometry.setAttribute("position", linePositions);
  lineGeometry.setAttribute("aColor", lineColors);
  lineGeometry.setDrawRange(0, 0);
  const lineMaterial = new ShaderMaterial({
    vertexShader: LINE_VERTEX,
    fragmentShader: LINE_FRAGMENT,
    ...ADDITIVE,
  });
  const lines = new LineSegments(lineGeometry, lineMaterial);
  lines.frustumCulled = false;
  scene.add(lines);

  // `target` is raw input; `pointer` is the eased value the simulation reads.
  const target = { x: OFFSCREEN, y: OFFSCREEN, active: false };
  const pointer: PointerState = { x: OFFSCREEN, y: OFFSCREEN, presence: 0 };
  let hasPointer = false;
  let elapsed = 0;
  let lastInputAt = performance.now();
  let touching = false;
  let asleep = false;

  // Any input restarts the full-rate window and wakes a paused loop.
  const markInput = () => {
    lastInputAt = performance.now();
    if (asleep) {
      asleep = false;
      sync();
    } else if (idleTimer) {
      // Mid idle wait: cut it short so the response to input is immediate.
      clearTimeout(idleTimer);
      idleTimer = 0;
      rafId = requestAnimationFrame(frame);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    touching = event.pointerType !== "mouse";
    markInput();
    target.x = event.clientX;
    target.y = event.clientY;
    target.active = true;
    if (!hasPointer) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      hasPointer = true;
    }
  };
  const onPointerOff = () => {
    target.active = false;
    touching = false;
    markInput(); // let the halo fade out at full rate before settling
  };
  // A finger lifts off the screen without a pointerleave, so lift counts as leaving.
  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerType === "mouse") return;
    target.active = false;
    touching = false;
    markInput();
  };

  let resizeFrame = 0;
  const applyResize = () => {
    resizeFrame = 0;
    const nextWidth = host.clientWidth || window.innerWidth;
    const nextHeight = host.clientHeight || window.innerHeight;
    // Ignore small height-only changes (browser chrome showing or hiding): they would only churn the buffer.
    if (nextWidth === width && Math.abs(nextHeight - height) < RESIZE_HEIGHT_SLACK) return;
    width = nextWidth;
    height = nextHeight;
    renderer.setSize(width, height, false);
    camera.right = width;
    camera.bottom = height;
    camera.updateProjectionMatrix();
    sim.resize(width, height);
    if (options.still) drawStill();
  };
  const onResize = () => {
    if (!resizeFrame) resizeFrame = requestAnimationFrame(applyResize);
  };

  const draw = () => {
    const used = sim.segmentCount;
    pointMaterial.uniforms.uTime.value = elapsed;
    pointPositions.needsUpdate = true;
    pointGlow.needsUpdate = true;
    // Upload only the segments in use rather than the whole line buffers.
    linePositions.clearUpdateRanges();
    linePositions.addUpdateRange(0, used * 6);
    linePositions.needsUpdate = true;
    lineColors.clearUpdateRanges();
    lineColors.addUpdateRange(0, used * 8);
    lineColors.needsUpdate = true;
    lineGeometry.setDrawRange(0, used * 2);

    const haloOn = pointer.presence > ACTIVE_PRESENCE;
    halo.visible = haloOn;
    if (haloOn) {
      halo.position.set(pointer.x, pointer.y, 0);
      haloMaterial.uniforms.uStrength.value = pointer.presence * HALO_ALPHA;
    }
    renderer.render(scene, camera);
  };

  const drawStill = () => {
    sim.step(0.016, pointer);
    draw();
  };

  let rafId = 0;
  let idleTimer = 0;
  let running = false;
  let visibleOnScreen = true;
  let lastTime = 0;
  let lastDraw = 0;
  let contextLost = false;

  const frame = (now: number) => {
    const quietMs = now - lastInputAt;
    if (quietMs > PAUSE_AFTER_MS) {
      // Nothing has happened for a long while: stop the loop. The next input wakes it.
      asleep = true;
      running = false;
      return;
    }
    rafId = 0;
    // Full rate only while input is live or recent; otherwise a calm ambient rate.
    const idle = !touching && quietMs >= ACTIVE_WINDOW_MS;
    if (!idle && now - lastDraw < profile.activeFrameMs - 1) {
      rafId = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min(MAX_DT, (now - (lastTime || now)) / 1000);
    lastTime = now;
    lastDraw = now;
    elapsed += dt;

    const ease = 1 - Math.exp(-POINTER_EASE * dt);
    pointer.x += (target.x - pointer.x) * ease;
    pointer.y += (target.y - pointer.y) * ease;
    const presenceTarget = target.active ? 1 : 0;
    pointer.presence += (presenceTarget - pointer.presence) * (1 - Math.exp(-PRESENCE_EASE * dt));

    sim.step(dt, pointer);
    draw();
    scheduleNext(idle);
  };

  // While idle the next frame is armed by a timer, so no rAF callbacks fire between draws.
  const scheduleNext = (idle: boolean) => {
    if (!idle) {
      rafId = requestAnimationFrame(frame);
      return;
    }
    idleTimer = window.setTimeout(() => {
      idleTimer = 0;
      rafId = requestAnimationFrame(frame);
    }, profile.idleFrameMs - ARM_SLACK_MS);
  };

  const cancelLoop = () => {
    cancelAnimationFrame(rafId);
    clearTimeout(idleTimer);
    rafId = 0;
    idleTimer = 0;
  };

  const sync = () => {
    const shouldRun = visibleOnScreen && !document.hidden && !contextLost && !asleep;
    if (shouldRun && !running) {
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    } else if (!shouldRun && running) {
      running = false;
      cancelLoop();
    }
  };

  const disposeGpu = () => {
    haloGeometry.dispose();
    haloMaterial.dispose();
    pointGeometry.dispose();
    pointMaterial.dispose();
    lineGeometry.dispose();
    lineMaterial.dispose();
    renderer.dispose();
    canvas.remove();
  };

  // Fade in only after the first frame has drawn, so there is no flash.
  const fadeIn = () =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!contextLost) canvas.style.opacity = "1";
      }),
    );

  if (options.still) {
    // Reduced motion: one settled frame, no loop and no pointer listeners.
    drawStill();
    const stillFade = fadeIn();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(stillFade);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      disposeGpu();
    };
  }

  const observer = new IntersectionObserver((entries) => {
    visibleOnScreen = entries.some((entry) => entry.isIntersecting);
    sync();
  });
  observer.observe(host);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    canvas.style.opacity = "0";
    sync();
  };
  const onContextRestored = () => {
    contextLost = false;
    canvas.style.opacity = "1";
    sync();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  for (const name of INPUT_EVENTS) window.addEventListener(name, markInput, { passive: true, capture: true });
  window.addEventListener("scroll", markInput, { passive: true, capture: true });
  document.documentElement.addEventListener("pointerleave", onPointerOff);
  window.addEventListener("pointercancel", onPointerOff);
  window.addEventListener("blur", onPointerOff);
  window.addEventListener("resize", onResize, { passive: true });
  document.addEventListener("visibilitychange", sync);
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);

  sync();
  const fadeFrame = fadeIn();

  return () => {
    running = false;
    cancelLoop();
    cancelAnimationFrame(fadeFrame);
    cancelAnimationFrame(resizeFrame);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    for (const name of INPUT_EVENTS) window.removeEventListener(name, markInput, { capture: true });
    window.removeEventListener("scroll", markInput, { capture: true });
    document.documentElement.removeEventListener("pointerleave", onPointerOff);
    window.removeEventListener("pointercancel", onPointerOff);
    window.removeEventListener("blur", onPointerOff);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", sync);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    canvas.removeEventListener("webglcontextrestored", onContextRestored);
    disposeGpu();
  };
}
