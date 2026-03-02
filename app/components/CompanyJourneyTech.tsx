'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// ERA CARDS — 5 curated cards, one per milestone zone
// Each positioned on the opposite side from its milestone text
// ─────────────────────────────────────────────
type EraCard = {
  yPct: number;    // scroll progress trigger (0–1)
  top: number;     // % of section height
  left: number;    // % of section width
  side: 'left' | 'right';
  era: string;
  ventures: string[];
  tags: string[];
  metric: string;
  accent: string;
  iconType: number;
};

const ERA_CARDS: EraCard[] = [
  {
    yPct: 0.13, top: 9, left: 3, side: 'left',
    era: 'Year 01 – 03',
    ventures: ['COVIU', 'Helfie'],
    tags: ['Telehealth', 'AI Healthcare'],
    metric: '12 sprints · 360 days',
    accent: '#6aab82',
    iconType: 1,
  },
  {
    yPct: 0.32, top: 28, left: 71, side: 'right',
    era: 'Year 04 – 06',
    ventures: ['Phenix Health', 'iSCOPE Systems'],
    tags: ['Telehealth', 'Pandemic Tech'],
    metric: '16 sprints · 480 days',
    accent: '#6a90c0',
    iconType: 7,
  },
  {
    yPct: 0.50, top: 46, left: 3, side: 'left',
    era: 'Year 07 – 09',
    ventures: ['ROGR', 'Meaxure Health'],
    tags: ['Security Ops', 'PPG Platform'],
    metric: '32 sprints · 960 days',
    accent: '#c08080',
    iconType: 0,
  },
  {
    yPct: 0.70, top: 66, left: 71, side: 'right',
    era: 'Year 10 – 11',
    ventures: ['Efficiency Works', 'Canopy Plus'],
    tags: ['Workflow SaaS', 'InsureTech'],
    metric: '28 sprints · 840 days',
    accent: '#b09050',
    iconType: 4,
  },
  {
    yPct: 0.88, top: 84, left: 3, side: 'left',
    era: 'Year 12',
    ventures: ['NZIMMR', 'Quadsafe'],
    tags: ['Research & Minerals', 'Gov Safety Tech'],
    metric: '35 sprints · 1,038 days',
    accent: '#9878c8',
    iconType: 3,
  },
];

// ─────────────────────────────────────────────
// TINY ICON DECORATORS in card footer
// ─────────────────────────────────────────────
function ECGMini({ color }: { color: string }) {
  return (
    <svg width="28" height="12" viewBox="0 0 68 32" fill="none" style={{ flexShrink: 0 }}>
      <polyline points="0,16 10,16 17,4 22,28 27,2 32,30 37,16 52,16 58,10 62,22 68,16"
        stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CircuitMini({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
      <polyline points="8,24 18,24 18,10 30,10 30,18" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="30,18 38,18 38,32 26,32" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="24" r="3" fill={color}/><circle cx="30" cy="18" r="3" fill={color}/><circle cx="26" cy="32" r="3" fill={color}/>
    </svg>
  );
}
function BarMini({ color }: { color: string }) {
  return (
    <svg width="20" height="12" viewBox="0 0 57 44" fill="none" style={{ flexShrink: 0 }}>
      {[{ x: 5, h: 18 }, { x: 18, h: 30 }, { x: 31, h: 22 }, { x: 44, h: 38 }].map((b, i) => (
        <rect key={i} x={b.x} y={44 - b.h} width="9" height={b.h} rx="2" fill={color} opacity={0.5 + i * 0.12}/>
      ))}
    </svg>
  );
}
function NetworkMini({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
      {[{ cx: 8, cy: 10 }, { cx: 40, cy: 10 }, { cx: 8, cy: 38 }, { cx: 40, cy: 38 }].map((n, i) => (
        <line key={i} x1="24" y1="24" x2={n.cx} y2={n.cy} stroke={color} strokeWidth="2" opacity="0.5"/>
      ))}
      <circle cx="24" cy="24" r="5" fill={color}/>
    </svg>
  );
}
function SensorMini({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r="4" fill={color}/>
      <circle cx="24" cy="24" r="11" stroke={color} strokeWidth="2" opacity="0.5"/>
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5" opacity="0.25"/>
    </svg>
  );
}

const ICON_MAP: Record<number, React.FC<{ color: string }>> = {
  0: CircuitMini, 1: ECGMini, 3: NetworkMini, 4: BarMini, 7: SensorMini,
};

const MONO = '"SF Mono","Fira Code","Consolas",monospace';

function EraCard({ card }: { card: EraCard }) {
  const Icon = ICON_MAP[card.iconType];
  return (
    <div style={{
      width: '204px',
      background: 'rgba(7, 9, 13, 0.92)',
      border: '1px solid rgba(225,227,222,0.07)',
      borderTop: `2px solid ${card.accent}`,
      borderRadius: '0 0 10px 10px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)',
    }}>
      <div style={{ padding: '14px 16px 14px' }}>

        {/* Era label */}
        <span style={{
          fontFamily: MONO, fontSize: '9px', color: card.accent, opacity: 0.85,
          letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '14px',
        }}>
          {card.era}
        </span>

        {/* Ventures */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
          {card.ventures.map((v, i) => (
            <div key={i}>
              <div style={{
                color: '#dce0d8', fontSize: '14px', fontWeight: 600,
                letterSpacing: '-0.01em', lineHeight: 1.15,
              }}>
                {v}
              </div>
              <div style={{
                color: '#485850', fontFamily: MONO, fontSize: '9px',
                letterSpacing: '0.09em', textTransform: 'uppercase', marginTop: '3px',
              }}>
                {card.tags[i]}
              </div>
            </div>
          ))}
        </div>

        {/* Divider + metric */}
        <div style={{
          borderTop: '1px solid rgba(225,227,222,0.06)',
          paddingTop: '10px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {Icon && <Icon color={card.accent} />}
          <span style={{
            fontFamily: MONO, fontSize: '9px',
            color: '#485850', letterSpacing: '0.08em',
          }}>
            {card.metric}
          </span>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MILESTONES
// ─────────────────────────────────────────────
const milestones = [
  { year: 'Year 01', dataPoint: 'HYPOTHESIS_FORMED_01', title: 'The Genesis Node',
    description: 'OGV/NLLP was established with a singular hypothesis: the architecture of care dictates its efficacy.',
    top: 18, left: 75, align: 'left' },
  { year: 'Year 04', dataPoint: 'MODELS_INTEGRATED: 14', title: 'Systems Integration',
    description: 'As our footprint expanded, we recognised the need for true digital-physical synthesis.',
    top: 38, left: 25, align: 'right' },
  { year: 'Year 07', dataPoint: 'NODES_DEPLOYED: 42+', title: 'Scale & Replication',
    description: "The 'Operational Vanguard' methodology was perfected. What took years to design could now be deployed in months.",
    top: 58, left: 75, align: 'left' },
  { year: 'Year 10', dataPoint: 'REGIONAL_ECOSYSTEMS: 05', title: 'Ecosystem Mastery',
    description: 'We transitioned from building clinics to architecting entire regional health ecosystems.',
    top: 78, left: 25, align: 'right' },
  { year: 'Year 12', dataPoint: 'STATUS: OPTIMIZING', title: 'Present Day',
    description: 'Over a decade of relentless optimisation. Today, we engineer the environments where the future of care is actually possible.',
    top: 95, left: 50, align: 'center' },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function CompanyJourneyTech() {
  const containerRef  = useRef<HTMLElement>(null);
  const travelerRef   = useRef<HTMLDivElement>(null);
  const flamingoRef   = useRef<SVGSVGElement>(null);
  const legARef       = useRef<SVGGElement>(null);
  const legBRef       = useRef<SVGGElement>(null);
  const legPhase      = useRef<number>(0);
  const lastProgress  = useRef<number>(0);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const cardShown     = useRef<boolean[]>(new Array(ERA_CARDS.length).fill(false));

  const bezierPath = `
    M 50,0
    C 50,8  75,8   75,18
    C 75,28 25,28  25,38
    C 25,48 75,48  75,58
    C 75,68 25,68  25,78
    C 25,88 50,88  50,95
    L 50,100
  `;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!travelerRef.current) return;

      const buildPathMath = () => {
        const points: { x: number; y: number }[] = [];
        const beziers = [
          [{ x: 50, y: 0 }, { x: 50, y: 8 }, { x: 75, y: 8 }, { x: 75, y: 18 }],
          [{ x: 75, y: 18 }, { x: 75, y: 28 }, { x: 25, y: 28 }, { x: 25, y: 38 }],
          [{ x: 25, y: 38 }, { x: 25, y: 48 }, { x: 75, y: 48 }, { x: 75, y: 58 }],
          [{ x: 75, y: 58 }, { x: 75, y: 68 }, { x: 25, y: 68 }, { x: 25, y: 78 }],
          [{ x: 25, y: 78 }, { x: 25, y: 88 }, { x: 50, y: 88 }, { x: 50, y: 95 }],
        ];
        for (const [p0, p1, p2, p3] of beziers) {
          for (let i = 0; i <= 1000; i++) {
            const t = i / 1000, u = 1 - t;
            points.push({
              x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
              y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
            });
          }
        }
        for (let i = 0; i <= 1000; i++) points.push({ x: 50, y: 95 + (i / 1000) * 5 });
        return points;
      };

      const pathData = buildPathMath();
      const getExactPoint = (targetY: number) => {
        let bestPt = pathData[0], minDiff = 999;
        const estIndex = Math.floor((targetY / 100) * pathData.length);
        for (let i = Math.max(0, estIndex - 500); i < Math.min(pathData.length, estIndex + 500); i++) {
          const diff = Math.abs(targetY - pathData[i].y);
          if (diff < minDiff) { minDiff = diff; bestPt = pathData[i]; }
        }
        return bestPt;
      };

      const updateFlamingo = (p: number) => {
        if (!flamingoRef.current) return;
        gsap.set(flamingoRef.current, { scale: 0.5 + p * 0.6, transformOrigin: 'bottom center' });
        const r = Math.round(136 + p * (232 - 136));
        const g = Math.round(136 + p * (144 - 136));
        const b = Math.round(136 + p * (106 - 136));
        flamingoRef.current.querySelectorAll('[data-flamingo-body]').forEach(
          el => (el as SVGElement).setAttribute('fill', `rgb(${r},${g},${b})`)
        );
      };

      updateFlamingo(0);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          if (!travelerRef.current || !containerRef.current) return;

          const pt1 = getExactPoint(self.progress * 100);
          const pt2 = getExactPoint(Math.min((self.progress + 0.001) * 100, 100));
          const w = containerRef.current.getBoundingClientRect().width;
          const h = containerRef.current.getBoundingClientRect().height;
          const dx = ((pt2.x - pt1.x) / 100) * w;
          const dy = ((pt2.y - pt1.y) / 100) * h;
          let rotation = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
          if (self.progress >= 0.999) rotation = 0;

          gsap.set(travelerRef.current, { left: `${pt1.x}%`, top: `${pt1.y}%`, rotation, transformOrigin: 'bottom center' });
          updateFlamingo(self.progress);

          const delta = self.progress - lastProgress.current;
          lastProgress.current = self.progress;
          legPhase.current += delta * 200;
          const liftA = Math.max(0, Math.sin(legPhase.current)) * 14;
          const liftB = Math.max(0, Math.sin(legPhase.current + Math.PI)) * 14;
          if (legARef.current) legARef.current.setAttribute('transform', `translate(0, ${-liftA})`);
          if (legBRef.current) legBRef.current.setAttribute('transform', `translate(0, ${-liftB})`);

          // ERA CARD reveal
          ERA_CARDS.forEach((card, idx) => {
            const el = cardRefs.current[idx];
            if (!cardShown.current[idx] && self.progress >= card.yPct) {
              cardShown.current[idx] = true;
              if (el) {
                const xFrom = card.side === 'left' ? -40 : 40;
                gsap.fromTo(el,
                  { opacity: 0, x: xFrom, y: 10, scale: 0.96, filter: 'blur(6px)' },
                  { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }
                );
              }
            }
            if (cardShown.current[idx] && self.progress < card.yPct - 0.005) {
              cardShown.current[idx] = false;
              const xTo = card.side === 'left' ? -20 : 20;
              if (el) gsap.to(el, { opacity: 0, x: xTo, y: -5, scale: 0.96, filter: 'blur(4px)', duration: 0.3 });
            }
          });
        },
      });

      // Reset on scroll-back out of section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        onLeaveBack: () => {
          cardShown.current.fill(false);
          cardRefs.current.forEach(el => {
            if (el) gsap.set(el, { opacity: 0, x: 0, y: 8, scale: 0.96 });
          });
        },
      });

      // Milestone reveal
      milestones.forEach((m, index) => {
        const el = milestoneRefs.current[index];
        if (el) gsap.fromTo(el,
          { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
          {
            opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(2)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${m.top}% center`,
              toggleActions: 'play none none reverse',
            } as gsap.DOMTarget | gsap.plugins.ScrollTriggerStaticVars | undefined
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#07090c] border-t border-stone-800 overflow-hidden"
    >
      {/* ── ERA CARDS LAYER ── */}
      <div className="absolute top-0 left-0 w-full h-[400vh] z-[5] pointer-events-none">
        {ERA_CARDS.map((card, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              top: `${card.top}%`,
              left: `${card.left}%`,
              opacity: 0,
              // Anchor to the correct edge
              transform: card.side === 'right' ? 'translateX(-100%)' : 'none',
            }}
          >
            <EraCard card={card} />
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
        <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={bezierPath} fill="none" stroke="#222426" strokeWidth="24" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={bezierPath} fill="none" stroke="#0c0e11" strokeWidth="22" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={bezierPath} fill="none" stroke="#e1e3de" strokeWidth="1.5" strokeDasharray="16 24" vectorEffect="non-scaling-stroke" className="opacity-20"/>
        </svg>

        {/* Flamingo */}
        <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none z-30">
          <div
            ref={travelerRef}
            className="traveler-car absolute transform -translate-x-1/2 -translate-y-full"
            style={{ left: '50%', top: '0%' }}
          >
            <svg ref={flamingoRef} viewBox="0 0 80 124" width="46" height="92"
              style={{ display: 'block', transformOrigin: 'bottom center', transform: 'scale(0.5)' }}
            >
              <ellipse cx="40" cy="62" rx="18" ry="14" data-flamingo-body fill="#888888" />
              <path d="M 28,60 Q 40,72 52,60" fill="none" stroke="#07090c" strokeWidth="1.2" opacity="0.4" />
              <path d="M 40,50 C 40,40 52,36 50,26 C 48,18 38,14 38,10" fill="none" stroke="#888888" strokeWidth="5" strokeLinecap="round" data-flamingo-body />
              <ellipse cx="38" cy="8" rx="5.5" ry="4.5" data-flamingo-body fill="#888888" />
              <path d="M 33,7 Q 27,8 26,11 Q 28,13 33,10 Z" fill="#e8c46a" />
              <path d="M 33,10 Q 28,13 26,11" fill="none" stroke="#07090c" strokeWidth="0.8" opacity="0.5" />
              <circle cx="35.5" cy="6" r="1.2" fill="#07090c" />
              <circle cx="35.1" cy="5.7" r="0.4" fill="white" opacity="0.7" />
              <g ref={legARef}>
                <line x1="38" y1="74" x2="34" y2="116" stroke="#e8906a" strokeWidth="2.5" strokeLinecap="round" data-flamingo-body />
                <path d="M 34,116 L 27,120 M 34,116 L 34,123" stroke="#e8906a" strokeWidth="1.8" strokeLinecap="round" data-flamingo-body />
              </g>
              <g ref={legBRef}>
                <line x1="42" y1="74" x2="46" y2="116" stroke="#e8906a" strokeWidth="2.5" strokeLinecap="round" data-flamingo-body />
                <path d="M 46,116 L 53,120 M 46,116 L 46,123" stroke="#e8906a" strokeWidth="1.8" strokeLinecap="round" data-flamingo-body />
              </g>
              <ellipse cx="40" cy="58" rx="10" ry="6" fill="white" opacity="0.06" />
            </svg>
          </div>
        </div>

        {/* Milestones */}
        {milestones.map((m, i) => (
          <div key={i}>
            <div
              ref={el => { milestoneRefs.current[i] = el; }}
              className="absolute z-20 w-px h-px pointer-events-auto"
              style={{ top: `${m.top}%`, left: `${m.left}%` }}
            >
              <div className="absolute w-[8px] h-[8px] bg-[#07090c] border-[2px] border-[#e1e3de] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner" />
              <div className={`absolute w-[240px] md:w-[340px]
                ${m.align === 'left'  ? 'right-full top-1/2 -translate-y-1/2 mr-6 md:mr-10 text-right' :
                  m.align === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-6 md:ml-10 text-left' :
                  'top-full left-1/2 -translate-x-1/2 mt-8 md:mt-12 text-center'}
              `}>
                <div className={`flex flex-col gap-2 md:gap-3 ${m.align === 'left' ? 'items-end' : m.align === 'right' ? 'items-start' : 'items-center'}`}>
                  <div className="flex flex-col gap-1">
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
          </div>
        ))}
      </div>
    </section>
  );
}
