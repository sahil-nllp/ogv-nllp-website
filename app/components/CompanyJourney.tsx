'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// FLORA SEED: deterministic pseudo-random flora
// placed on both sides of the S-curve road
// ─────────────────────────────────────────────
type FloraItem = {
  id: number;
  type: 'grass' | 'flower' | 'tallgrass';
  top: number;
  left: number;
  yPct: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
  windDuration: number;  // CSS animation duration
  windDelay: number;     // CSS animation delay (negative = staggered)
};

// Deterministic seeded RNG
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// The S-curve road passes through roughly these X points at each Y:
// Y=0%  → X=50%, Y=18% → X=75%, Y=38% → X=25%, Y=58% → X=75%, Y=78% → X=25%, Y=100% → X=50%
// For each flora item, pick a Y%, then determine the road X% at that Y, 
// then place it slightly off to one side
function getRoadXAtY(yPct: number): number {
  // Interpolate through our bezier control points
  const segments = [
    { y0: 0, y1: 18, x0: 50, x1: 75 },
    { y0: 18, y1: 38, x0: 75, x1: 25 },
    { y0: 38, y1: 58, x0: 25, x1: 75 },
    { y0: 58, y1: 78, x0: 75, x1: 25 },
    { y0: 78, y1: 100, x0: 25, x1: 50 },
  ];
  for (const seg of segments) {
    if (yPct >= seg.y0 && yPct <= seg.y1) {
      const t = (yPct - seg.y0) / (seg.y1 - seg.y0);
      return seg.x0 + (seg.x1 - seg.x0) * t;
    }
  }
  return 50;
}

const GRASS_COLORS = [
  '#3a6b2f', '#4a7c3f', '#5c9147', '#6aab52',
  '#3d6b34', '#7db86b', '#8dc97a', '#2e5e28',
  '#517a42', '#638f4e',
];
const FLOWER_COLORS = [
  '#e8906a', '#f5c842', '#e87fa0', '#c9e87a',
  '#ffe4b5', '#d4b4e8', '#ff9eb5', '#f7e05c',
  '#fa7268', '#b5e8a0',
];
const TALLGRASS_COLORS = [
  '#2e5e28', '#3d6b34', '#4a7c3f', '#557a48', '#3f6e35',
];

// Milestone positions — keep flora away from these
const MILESTONE_ZONES = [
  { top: 18, left: 75 },
  { top: 38, left: 25 },
  { top: 58, left: 75 },
  { top: 78, left: 25 },
  { top: 95, left: 50 },
];

function generateFlora(count: number): FloraItem[] {
  const items: FloraItem[] = [];
  let seed = 0;
  while (items.length < count) {
    const i = seed++;
    const r = (n: number) => seededRandom(i * 17 + n);
    const yPct = r(0) * 95 + 2;
    const roadX = getRoadXAtY(yPct);

    let left: number;
    let attempts = 0;
    do {
      left = r(1 + attempts) * 96 + 2;
      attempts++;
    } while (Math.abs(left - roadX) < 11 && attempts < 8);

    // Skip if too close to any milestone (within ±6% Y and ±24% X)
    const nearMilestone = MILESTONE_ZONES.some(
      m => Math.abs(yPct - m.top) < 6 && Math.abs(left - m.left) < 24
    );
    if (nearMilestone) continue;

    const typeRoll = r(8);
    const type: FloraItem['type'] = typeRoll < 0.50 ? 'grass' : typeRoll < 0.76 ? 'tallgrass' : 'flower';
    const colorArr = type === 'flower' ? FLOWER_COLORS : type === 'tallgrass' ? TALLGRASS_COLORS : GRASS_COLORS;
    const colorIdx = Math.floor(r(9) * colorArr.length);

    items.push({
      id: items.length,
      type,
      top: yPct,
      left: Math.max(1, Math.min(99, left)),
      yPct: yPct / 100,
      size: 0.4 + r(10) * 1.5,
      color: colorArr[colorIdx],
      rotation: (r(11) - 0.5) * 44,
      delay: r(12) * 0.25,
      windDuration: 2.2 + r(13) * 2.0,
      windDelay: -(r(14) * 4.0),
    });
  }
  return items;
}


const FLORA = generateFlora(320);


// ─────────────────────────────────────────────
// SVG SHAPES  (filled gradient, not stroke-only)
// ─────────────────────────────────────────────
function GrassBlade({ color, size, windDuration, windDelay }: {
  color: string; size: number; windDuration: number; windDelay: number;
}) {
  const h = 26 * size;
  const w = 4.5 * size;
  const gId = `gb${color.replace('#', '')}${Math.round(size * 8)}`;
  const blades = [
    { lean: -0.75, hf: 0.80, op: 0.78 },
    { lean:  0.0,  hf: 1.00, op: 1.00 },
    { lean:  0.72, hf: 0.78, op: 0.78 },
  ];
  const bw = w * 0.4;
  const svgH = h * 1.25;
  return (
    <svg
      viewBox={`0 0 ${w * 3} ${svgH}`}
      width={w * 3} height={svgH}
      style={{
        overflow: 'visible',
        transformOrigin: 'bottom center',
        animation: `grassWind ${windDuration}s ease-in-out infinite ${windDelay}s`,
      }}
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor={color} stopOpacity="1" />
          <stop offset="55%"  stopColor={color} stopOpacity="0.82" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {blades.map((b, i) => {
        const bh = h * b.hf;
        const baseX = w * 1.5;
        const tipX = baseX + b.lean * w;
        const baseY = svgH;
        const tipY = baseY - bh;
        return (
          <path key={i}
            d={`M ${baseX - bw},${baseY}
              C ${baseX - bw * 0.3 + b.lean * w * 0.35},${baseY - bh * 0.52}
                ${tipX - bw * 0.1},${tipY + bh * 0.28}
                ${tipX},${tipY}
              C ${tipX + bw * 0.1},${tipY + bh * 0.28}
                ${baseX + bw * 0.3 + b.lean * w * 0.35},${baseY - bh * 0.52}
                ${baseX + bw},${baseY} Z`}
            fill={`url(#${gId})`}
            opacity={b.op}
            style={i === 1 ? { filter: 'brightness(1.18)' } : undefined}
          />
        );
      })}
    </svg>
  );
}

function TallGrass({ color, size, windDuration, windDelay }: {
  color: string; size: number; windDuration: number; windDelay: number;
}) {
  const h = 44 * size;
  const w = 3.2 * size;
  const gId = `tg${color.replace('#', '')}${Math.round(size * 8)}`;
  const blades = [
    { cx: 0.5, lean: -1.3, hf: 0.70, op: 0.65 },
    { cx: 1.5, lean: -0.4, hf: 0.88, op: 0.82 },
    { cx: 2.5, lean:  0.0, hf: 1.00, op: 1.00 },
    { cx: 3.5, lean:  0.4, hf: 0.86, op: 0.82 },
    { cx: 4.5, lean:  1.3, hf: 0.68, op: 0.65 },
  ];
  const svgW = w * 5;
  const svgH = h * 1.1;
  const bw = w * 0.25;
  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      width={svgW} height={svgH}
      style={{
        overflow: 'visible',
        transformOrigin: 'bottom center',
        animation: `grassWind ${windDuration * 1.12}s ease-in-out infinite ${windDelay * 0.85}s`,
      }}
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor={color} stopOpacity="1" />
          <stop offset="65%"  stopColor={color} stopOpacity="0.72" />
          <stop offset="100%" stopColor={color} stopOpacity="0.28" />
        </linearGradient>
      </defs>
      {blades.map((b, i) => {
        const bh = h * b.hf;
        const baseX = b.cx * w;
        const tipX = baseX + b.lean * w;
        const baseY = svgH;
        const tipY = baseY - bh;
        return (
          <path key={i}
            d={`M ${baseX - bw},${baseY}
              C ${baseX - bw * 0.2 + b.lean * w * 0.38},${baseY - bh * 0.55}
                ${tipX - bw * 0.05},${tipY + bh * 0.22}
                ${tipX},${tipY}
              C ${tipX + bw * 0.05},${tipY + bh * 0.22}
                ${baseX + bw * 0.2 + b.lean * w * 0.38},${baseY - bh * 0.55}
                ${baseX + bw},${baseY} Z`}
            fill={`url(#${gId})`}
            opacity={b.op}
          />
        );
      })}
    </svg>
  );
}

function Flower({ color, size }: { color: string; size: number }) {
  const r = 5 * size;
  const stemH = 14 * size;
  return (
    <svg viewBox={`-${r * 2} -${r * 2} ${r * 4} ${stemH + r * 4}`} width={r * 4} height={stemH + r * 4} style={{ overflow: 'visible' }}>
      <line x1={0} y1={stemH + r} x2={0} y2={r} stroke={GRASS_COLORS[1]} strokeWidth={size * 1.2} strokeLinecap="round" />
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.cos(rad) * r * 1.5;
        const py = Math.sin(rad) * r * 1.5;
        return <ellipse key={i} cx={px} cy={py} rx={r * 0.75} ry={r * 0.5}
          fill={color} opacity={0.9}
          transform={`rotate(${deg}, ${px}, ${py})`}
        />;
      })}
      <circle cx={0} cy={0} r={r * 0.55} fill="#2a1a0a" />
      <circle cx={0} cy={0} r={r * 0.3} fill="#f5c842" opacity={0.8} />
    </svg>
  );
}

// ─────────────────────────────────────────────
// MILESTONES
// ─────────────────────────────────────────────
const milestones = [
  {
    year: "Year 01", dataPoint: "HYPOTHESIS_FORMED_01",
    title: "The Genesis Node",
    description: "OGV/NLLP was established with a singular hypothesis: the architecture of care dictates its efficacy.",
    top: 18, left: 75, align: "left",
    graphic: null
  },
  {
    year: "Year 04", dataPoint: "MODELS_INTEGRATED: 14",
    title: "Systems Integration",
    description: "As our footprint expanded, we recognized the need for true digital-physical synthesis.",
    top: 38, left: 25, align: "right",
    graphic: null
  },
  {
    year: "Year 07", dataPoint: "NODES_DEPLOYED: 42+",
    title: "Scale & Replication",
    description: "The 'Operational Vanguard' methodology was perfected. What took years to design could now be deployed in months.",
    top: 58, left: 75, align: "left",
    graphic: null
  },
  {
    year: "Year 10", dataPoint: "REGIONAL_ECOSYSTEMS: 05",
    title: "Ecosystem Mastery",
    description: "We transitioned from building clinics to architecting entire regional health ecosystems.",
    top: 78, left: 25, align: "right",
    graphic: null
  },
  {
    year: "Year 12", dataPoint: "STATUS: OPTIMIZING",
    title: "Present Day",
    description: "Over a decade of relentless optimization. Today, we engineer the environments where the future of care is actually possible.",
    top: 95, left: 50, align: "center",
    graphic: null
  }
];


// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function CompanyJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const flamingoRef = useRef<SVGSVGElement>(null);
  const legARef = useRef<SVGGElement>(null);
  const legBRef = useRef<SVGGElement>(null);
  const legPhase = useRef<number>(0);
  const lastProgress = useRef<number>(0);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const graphicRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Flora refs array — parallel to FLORA array
  const floraRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Track which flora items have bloomed
  const bloomed = useRef<boolean[]>(new Array(FLORA.length).fill(false));
  // Background tint overlay ref
  const tintRef = useRef<HTMLDivElement>(null);

  const bezierPath = `
    M 50,0 
    C 50,8 75,8 75,18
    C 75,28 25,28 25,38
    C 25,48 75,48 75,58
    C 75,68 25,68 25,78
    C 25,88 50,88 50,95
    L 50,100
  `;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!travelerRef.current) return;

      const buildPathMath = () => {
        const points: {x: number, y: number}[] = [];
        const beziers = [
          [{x: 50, y: 0}, {x: 50, y: 8}, {x: 75, y: 8}, {x: 75, y: 18}],
          [{x: 75, y: 18}, {x: 75, y: 28}, {x: 25, y: 28}, {x: 25, y: 38}],
          [{x: 25, y: 38}, {x: 25, y: 48}, {x: 75, y: 48}, {x: 75, y: 58}],
          [{x: 75, y: 58}, {x: 75, y: 68}, {x: 25, y: 68}, {x: 25, y: 78}],
          [{x: 25, y: 78}, {x: 25, y: 88}, {x: 50, y: 88}, {x: 50, y: 95}]
        ];
        for (const [p0, p1, p2, p3] of beziers) {
          for (let i = 0; i <= 1000; i++) {
            const t = i / 1000;
            const u = 1 - t;
            const x = (u*u*u)*p0.x + 3*(u*u)*t*p1.x + 3*u*(t*t)*p2.x + (t*t*t)*p3.x;
            const y = (u*u*u)*p0.y + 3*(u*u)*t*p1.y + 3*u*(t*t)*p2.y + (t*t*t)*p3.y;
            points.push({ x, y });
          }
        }
        for(let i = 0; i <= 1000; i++) {
          points.push({ x: 50, y: 95 + (i/1000)*5 });
        }
        return points;
      };

      const pathData = buildPathMath();

      const getExactPoint = (targetY: number) => {
        let bestPt = pathData[0];
        let minDiff = 999;
        const estIndex = Math.floor((targetY / 100) * pathData.length);
        const searchWindow = 500;
        const start = Math.max(0, estIndex - searchWindow);
        const end = Math.min(pathData.length, estIndex + searchWindow);
        for (let i = start; i < end; i++) {
          const diff = Math.abs(targetY - pathData[i].y);
          if (diff < minDiff) {
            minDiff = diff;
            bestPt = pathData[i];
          }
        }
        return bestPt;
      };

      // Helper: update flamingo color and scale
      const updateFlamingo = (p: number) => {
        if (!flamingoRef.current) return;
        const scale = 0.5 + p * 0.6;
        gsap.set(flamingoRef.current, { scale, transformOrigin: 'bottom center' });
        const r = Math.round(136 + p * (232 - 136));
        const g = Math.round(136 + p * (144 - 136));
        const b = Math.round(136 + p * (106 - 136));
        const colour = `rgb(${r},${g},${b})`;
        const paths = flamingoRef.current.querySelectorAll('[data-flamingo-body]');
        paths.forEach((el) => (el as SVGElement).setAttribute('fill', colour));
      };

      // Set initial state
      updateFlamingo(0);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          if (!travelerRef.current || !containerRef.current) return;

          const y1 = self.progress * 100;
          const pt1 = getExactPoint(y1);
          const y2 = Math.min((self.progress + 0.001) * 100, 100);
          const pt2 = getExactPoint(y2);

          const w = containerRef.current.getBoundingClientRect().width;
          const h = containerRef.current.getBoundingClientRect().height;

          const dxPixel = ((pt2.x - pt1.x) / 100) * w;
          const dyPixel = ((pt2.y - pt1.y) / 100) * h;
          let rotation = Math.atan2(dyPixel, dxPixel) * (180 / Math.PI) - 90;
          if (self.progress >= 0.999) rotation = 0;

          gsap.set(travelerRef.current, {
            left: `${pt1.x}%`,
            top: `${pt1.y}%`,
            rotation,
            transformOrigin: 'bottom center'
          });

          updateFlamingo(self.progress);

          // ── Leg animation ──
          const delta = self.progress - lastProgress.current;
          lastProgress.current = self.progress;
          legPhase.current += delta * 200;
          const liftA = Math.max(0, Math.sin(legPhase.current)) * 14;
          const liftB = Math.max(0, Math.sin(legPhase.current + Math.PI)) * 14;
          if (legARef.current) legARef.current.setAttribute('transform', `translate(0, ${-liftA})`);
          if (legBRef.current) legBRef.current.setAttribute('transform', `translate(0, ${-liftB})`);

          // ── Flora bloom: trigger items the flamingo has passed ──
          FLORA.forEach((flora, idx) => {
            if (!bloomed.current[idx] && self.progress >= flora.yPct) {
              bloomed.current[idx] = true;
              const el = floraRefs.current[idx];
              if (el) {
                gsap.fromTo(el,
                  { scaleY: 0, scaleX: 0.4, opacity: 0, transformOrigin: 'bottom center' },
                  {
                    scaleY: 1, scaleX: 1, opacity: 1,
                    duration: 0.5 + flora.delay,
                    ease: 'back.out(2.5)',
                    delay: flora.delay * 0.5,
                    transformOrigin: 'bottom center'
                  }
                );
              }
            }
            // Fade OUT flora that is ahead of the flamingo (un-bloom on scroll up)
            if (bloomed.current[idx] && self.progress < flora.yPct - 0.005) {
              bloomed.current[idx] = false;
              const el = floraRefs.current[idx];
              if (el) {
                gsap.to(el, { scaleY: 0, scaleX: 0.4, opacity: 0, duration: 0.2, transformOrigin: 'bottom center' });
              }
            }
          });

              // ── Background tint: use a feathered mask-image gradient so the
              // 'alive' zone blends organically without a hard visible border ──
              if (tintRef.current) {
                const revealPct = self.progress * 100;
                const fadeStart = Math.max(0, revealPct - 10);
                const fadeEnd   = Math.min(100, revealPct + 4);
                const mask = `linear-gradient(to bottom, black 0%, black ${fadeStart}%, rgba(0,0,0,0.3) ${fadeEnd}%, transparent ${Math.min(100, fadeEnd + 6)}%)`;
                tintRef.current.style.webkitMaskImage = mask;
                tintRef.current.style.maskImage = mask;
              }
        }
      });

      // Hard-reset everything when user scrolls back above the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        onLeaveBack: () => {
          // Reset tint to fully hidden
          if (tintRef.current) {
            const hidden = 'linear-gradient(to bottom, black 0%, transparent 0%)';
            tintRef.current.style.webkitMaskImage = hidden;
            tintRef.current.style.maskImage = hidden;
          }
          // Collapse all flora instantly
          bloomed.current.fill(false);
          floraRefs.current.forEach(el => {
            if (el) gsap.set(el, { scaleY: 0, scaleX: 0.4, opacity: 0 });
          });
        },
      });

      // Milestone reveal
      milestones.forEach((m, index) => {
        const el = milestoneRefs.current[index];
        const gEl = graphicRefs.current[index];
        const animProps = {
          opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(2)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${m.top}% center`,
            toggleActions: 'play none none reverse',
          } as gsap.DOMTarget | gsap.plugins.ScrollTriggerStaticVars | undefined
        };
        if (el) gsap.fromTo(el, { opacity: 0, scale: 0.9, filter: 'blur(4px)' }, animProps);
        if (gEl) gsap.fromTo(gEl, { opacity: 0, scale: 0.9, filter: 'blur(4px)' }, animProps);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#0c0d0c] border-t border-stone-800 overflow-hidden"
    >
      {/* Grass wind CSS animation */}
      <style>{`
        @keyframes grassWind {
          0%, 100% { transform: rotate(0deg); }
          35%       { transform: rotate(2.5deg); }
          70%       { transform: rotate(-1.5deg); }
        }
      `}</style>
      {/* ── BACKGROUND TINT OVERLAY ──
          Soft feathered gradient mask—no hard border lines */}
      <div
        ref={tintRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0d1f09 0%, #0e1f0a 30%, #111f0d 60%, #0d1a09 80%, #0c1408 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 0%)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 0%)',
        }}
      />

      {/* ── FLORA LAYER ── Grass blades and flowers that bloom when the flamingo passes */}
      <div className="absolute top-0 left-0 w-full h-[400vh] z-5 pointer-events-none">
        {FLORA.map((flora, i) => (
          <div
            key={flora.id}
            ref={el => { floraRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              top: `${flora.top}%`,
              left: `${flora.left}%`,
              transform: `translateX(-50%) rotate(${flora.rotation}deg) scaleY(0) scaleX(0.4)`,
              opacity: 0,
              transformOrigin: 'bottom center',
            }}
          >
            {flora.type === 'grass' && <GrassBlade color={flora.color} size={flora.size} windDuration={flora.windDuration} windDelay={flora.windDelay} />}
            {flora.type === 'tallgrass' && <TallGrass color={flora.color} size={flora.size} windDuration={flora.windDuration} windDelay={flora.windDelay} />}
            {flora.type === 'flower' && <Flower color={flora.color} size={flora.size} />}
          </div>
        ))}
      </div>

      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 w-full pt-20 md:pt-32 pb-8 px-6 text-center z-30 pointer-events-none">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 md:w-12 h-[1px] bg-stone-700" />
            <span className="text-[10px] md:text-xs font-mono text-stone-500 tracking-[0.2em] uppercase">12 Years of Evolution</span>
            <div className="w-8 md:w-12 h-[1px] bg-stone-700" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-[#e1e3de] tracking-tight drop-shadow-2xl">
            The Journey.
          </h2>
        </div>
      </div>

      {/* ── ROAD + FLAMINGO + MILESTONES ── */}
      <div className="absolute top-0 left-0 w-full h-[400vh] z-10">
        {/* Road SVG */}
        <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={bezierPath} fill="none" stroke="#2a2a2a" strokeWidth="24"
            vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          <path d={bezierPath} fill="none" stroke="#121312" strokeWidth="22"
            vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          <path d={bezierPath} fill="none" stroke="#e1e3de" strokeWidth="1.5"
            strokeDasharray="16 24" vectorEffect="non-scaling-stroke" className="opacity-20" />
        </svg>

        {/* ── THE FLAMINGO TRAVELER ── */}
        <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none z-30">
          <div
            ref={travelerRef}
            className="traveler-car absolute transform -translate-x-1/2 -translate-y-full flex items-end justify-center"
            style={{ left: '50%', top: '0%' }}
          >
            {/* The Flamingo SVG — viewBox clipped exactly at foot tips (y=124)
                 so -translate-y-full on parent places feet exactly on the road center */}
            <svg
              ref={flamingoRef}
              viewBox="0 0 80 124"
              width="46"
              height="92"
              style={{
                display: 'block',
                transformOrigin: 'bottom center',
                transform: 'scale(0.5)'
              }}
            >
              {/* === BODY === */}
              <ellipse cx="40" cy="62" rx="18" ry="14" data-flamingo-body fill="#888888" />
              <path d="M 28,60 Q 40,72 52,60" fill="none" stroke="#0c0d0c" strokeWidth="1.2" opacity="0.4" />

              {/* === NECK & HEAD === */}
              <path
                d="M 40,50 C 40,40 52,36 50,26 C 48,18 38,14 38,10"
                fill="none" stroke="#888888" strokeWidth="5" strokeLinecap="round"
                data-flamingo-body
              />
              <ellipse cx="38" cy="8" rx="5.5" ry="4.5" data-flamingo-body fill="#888888" />
              <path d="M 33,7 Q 27,8 26,11 Q 28,13 33,10 Z" fill="#e8c46a" />
              <path d="M 33,10 Q 28,13 26,11" fill="none" stroke="#0c0d0c" strokeWidth="0.8" opacity="0.5"/>
              <circle cx="35.5" cy="6" r="1.2" fill="#0c0d0c" />
              <circle cx="35.1" cy="5.7" r="0.4" fill="white" opacity="0.7" />

              {/* === LEGS — scroll-driven stride === */}
              <g ref={legARef}>
                <line x1="38" y1="74" x2="34" y2="116" stroke="#e8906a" strokeWidth="2.5" strokeLinecap="round" data-flamingo-body />
                <path d="M 34,116 L 27,120 M 34,116 L 34,123" stroke="#e8906a" strokeWidth="1.8" strokeLinecap="round" data-flamingo-body />
              </g>
              <g ref={legBRef}>
                <line x1="42" y1="74" x2="46" y2="116" stroke="#e8906a" strokeWidth="2.5" strokeLinecap="round" data-flamingo-body />
                <path d="M 46,116 L 53,120 M 46,116 L 46,123" stroke="#e8906a" strokeWidth="1.8" strokeLinecap="round" data-flamingo-body />
              </g>

              {/* Feather highlight */}
              <ellipse cx="40" cy="58" rx="10" ry="6" fill="white" opacity="0.06" />
            </svg>
          </div>
        </div>

        {/* ── MILESTONES ── */}
        {milestones.map((m, i) => (
          <div key={i}>
            <div
              ref={el => { milestoneRefs.current[i] = el; }}
              className="absolute z-20 w-px h-px pointer-events-auto"
              style={{ top: `${m.top}%`, left: `${m.left}%` }}
            >
              <div className="absolute w-[8px] h-[8px] bg-[#0c0d0c] border-[2px] border-[#e1e3de] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner" />
              <div className={`absolute w-[240px] md:w-[350px]
                ${m.align === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-6 md:mr-10 text-right' :
                  m.align === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-6 md:ml-10 text-left' :
                  'top-full left-1/2 -translate-x-1/2 mt-8 md:mt-12 text-center'}
              `}>
                <div className={`flex flex-col gap-2 md:gap-3 ${m.align === 'left' ? 'items-end' : m.align === 'right' ? 'items-start' : 'items-center'}`}>
                  <div className="flex flex-col gap-1 items-inherit">
                    <span className="font-mono text-[10px] md:text-xs text-stone-500 tracking-[0.2em] uppercase">{m.year}</span>
                    <div className="bg-[#e1e3de]/5 border border-[#e1e3de]/10 px-2 md:px-3 py-1 md:py-1.5 rounded text-[8px] md:text-[9px] font-mono tracking-widest text-[#e1e3de]/80 shadow-2xl backdrop-blur-md">
                      [{m.dataPoint}]
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl text-[#e1e3de] leading-tight drop-shadow-xl mt-1 md:mt-2">{m.title}</h3>
                  <p className="text-stone-400 text-xs md:text-sm leading-relaxed text-balance drop-shadow-md">{m.description}</p>
                </div>
              </div>
            </div>

            {m.graphic && (
              <div
                ref={el => { graphicRefs.current[i] = el; }}
                className="absolute hidden md:flex items-center justify-center pointer-events-auto z-10"
                style={{ top: `${m.top}%`, left: `${100 - m.left}%` }}
              >
                <div className="transform -translate-x-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity duration-700 ease-out cursor-default">
                  {m.graphic}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
