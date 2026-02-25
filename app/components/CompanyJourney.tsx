'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "Year 01",
    dataPoint: "HYPOTHESIS_FORMED_01",
    title: "The Genesis Node",
    description: "OGV/NLLP was established with a singular hypothesis: the architecture of care dictates its efficacy.",
    top: 18,
    left: 75,
    align: "left",
    graphic: (
      <div className="relative w-40 lg:w-56 h-40 lg:h-56 border border-stone-800 rounded-full flex items-center justify-center bg-[#0c0d0c] shadow-2xl">
        <div className="absolute w-32 lg:w-48 h-32 lg:h-48 border border-stone-800 rounded-full animate-[spin_10s_linear_infinite] border-t-stone-500 border-b-stone-500" />
        <div className="w-16 lg:w-20 h-16 lg:h-20 border border-stone-700 rounded-full flex items-center justify-center bg-stone-900 overflow-hidden">
          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-[#e1e3de]/10 rounded-full blur-md animate-pulse" />
        </div>
        <div className="absolute w-full h-[1px] bg-stone-800/50" />
        <div className="absolute h-full w-[1px] bg-stone-800/50" />
      </div>
    )
  },
  {
    year: "Year 04",
    dataPoint: "MODELS_INTEGRATED: 14",
    title: "Systems Integration",
    description: "As our footprint expanded, we recognized the need for true digital-physical synthesis.",
    top: 38,
    left: 25,
    align: "right",
    graphic: (
      <div className="w-40 lg:w-56 h-40 lg:h-56 grid grid-cols-3 grid-rows-3 gap-2 lg:gap-3 p-4 bg-[#e1e3de]/5 border border-[#e1e3de]/10 backdrop-blur-sm rounded-lg shadow-2xl -skew-y-6 transform hover:skew-y-0 transition-transform duration-700 ease-out">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`rounded-sm border border-stone-700/50 ${i === 4 ? 'bg-[#e1e3de]/20 border-[#e1e3de]/50 animate-pulse shadow-[0_0_15px_rgba(225,227,222,0.2)]' : 'bg-stone-900/50'}`} />
        ))}
      </div>
    )
  },
  {
    year: "Year 07",
    dataPoint: "NODES_DEPLOYED: 42+",
    title: "Scale & Replication",
    description: "The 'Operational Vanguard' methodology was perfected. What took years to design could now be deployed in months.",
    top: 58,
    left: 75,
    align: "left",
    graphic: (
      <div className="w-40 lg:w-56 h-40 lg:h-56 relative flex items-center justify-center">
        <div className="absolute w-28 lg:w-40 h-28 lg:h-40 border border-[#e1e3de]/20 bg-stone-900 rounded-lg transform -rotate-12 transition-transform duration-1000 hover:rotate-0" />
        <div className="absolute w-28 lg:w-40 h-28 lg:h-40 border border-[#e1e3de]/30 bg-[#121312] rounded-lg transform -rotate-6 transition-transform duration-1000 hover:rotate-6 shadow-xl" />
        <div className="absolute w-28 lg:w-40 h-28 lg:h-40 border border-[#e1e3de]/40 bg-[#1a1b1a] rounded-lg shadow-2xl z-10 flex items-center justify-center transition-transform duration-1000 hover:rotate-12 hover:scale-105">
           <div className="w-8 h-8 rounded-full border-2 border-[#e1e3de]/30 animate-ping" />
        </div>
      </div>
    )
  },
  {
    year: "Year 10",
    dataPoint: "REGIONAL_ECOSYSTEMS: 05",
    title: "Ecosystem Mastery",
    description: "We transitioned from building clinics to architecting entire regional health ecosystems.",
    top: 78,
    left: 25,
    align: "right",
    graphic: (
      <div className="w-48 lg:w-64 h-32 lg:h-40 relative flex items-center justify-center bg-transparent">
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(225,227,222,0.2)]">
          <path d="M 0,50 Q 25,0 50,50 T 100,50 T 150,50 T 200,50" fill="none" stroke="#e1e3de" strokeWidth="1" strokeDasharray="2 4" className="opacity-40 animate-[dash_20s_linear_infinite]" />
          <path d="M 0,50 Q 25,100 50,50 T 100,50 T 150,50 T 200,50" fill="none" stroke="#e1e3de" strokeWidth="1.5" className="opacity-80" />
          <circle cx="50" cy="50" r="3" fill="#e1e3de" className="animate-pulse" />
          <circle cx="150" cy="50" r="3" fill="#e1e3de" className="animate-pulse" />
        </svg>
      </div>
    )
  },
  {
    year: "Year 12",
    dataPoint: "STATUS: OPTIMIZING",
    title: "Present Day",
    description: "Over a decade of relentless optimization. Today, we engineer the environments where the future of care is actually possible.",
    top: 95,
    left: 50,
    align: "center",
    graphic: null
  }
];

export default function CompanyJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const graphicRefs = useRef<(HTMLDivElement | null)[]>([]);

  // A calculated mathematical S-Curve wrapping down the screen 
  // Works identically across mobile and desktop because coordinates are perfectly mapped
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
      
      // Exact mathematical parser for the true SVG Beziers
      const buildPathMath = () => {
        const points: {x: number, y: number}[] = [];
        const beziers = [
          // Segment 1
          [{x: 50, y: 0}, {x: 50, y: 8}, {x: 75, y: 8}, {x: 75, y: 18}],
          // Segment 2
          [{x: 75, y: 18}, {x: 75, y: 28}, {x: 25, y: 28}, {x: 25, y: 38}],
          // Segment 3
          [{x: 25, y: 38}, {x: 25, y: 48}, {x: 75, y: 48}, {x: 75, y: 58}],
          // Segment 4
          [{x: 75, y: 58}, {x: 75, y: 68}, {x: 25, y: 68}, {x: 25, y: 78}],
          // Segment 5
          [{x: 25, y: 78}, {x: 25, y: 88}, {x: 50, y: 88}, {x: 50, y: 95}]
        ];
        
        // 1000 samples per segment is highly precise (5000 points total)
        for (const [p0, p1, p2, p3] of beziers) {
          for (let i = 0; i <= 1000; i++) {
            const t = i / 1000;
            const u = 1 - t;
            const x = (u*u*u)*p0.x + 3*(u*u)*t*p1.x + 3*u*(t*t)*p2.x + (t*t*t)*p3.x;
            const y = (u*u*u)*p0.y + 3*(u*u)*t*p1.y + 3*u*(t*t)*p2.y + (t*t*t)*p3.y;
            points.push({ x, y });
          }
        }
        
        // Final line segment
        for(let i = 0; i <= 1000; i++) {
           points.push({ x: 50, y: 95 + (i/1000)*5 });
        }
        
        return points;
      };

      const pathData = buildPathMath();

      // Find exactly where you are mathematically on the bezier curves based on Y scroll!
      const getExactPoint = (targetY: number) => {
         let bestPt = pathData[0];
         let minDiff = 999;
         
         // Start searching near a fast heuristic index to save CPU cycles 
         // Since the points array is highly ordered by Y visually
         const estIndex = Math.floor((targetY / 100) * pathData.length);
         const searchWindow = 500; // Search locally around the estimate
         
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

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          if (!travelerRef.current || !containerRef.current) return;
          
          const y1 = self.progress * 100;
          const pt1 = getExactPoint(y1);

          // Sample slightly ahead to compute the exact screen-space tangent
          const y2 = Math.min((self.progress + 0.001) * 100, 100);
          const pt2 = getExactPoint(y2);

          const w = containerRef.current.getBoundingClientRect().width;
          const h = containerRef.current.getBoundingClientRect().height;

          const dxPixel = ((pt2.x - pt1.x) / 100) * w;
          const dyPixel = ((pt2.y - pt1.y) / 100) * h;

          let rotation = Math.atan2(dyPixel, dxPixel) * (180 / Math.PI) - 90;

          if (self.progress >= 0.999) {
            rotation = 0;
          }

          gsap.set(travelerRef.current, { 
            left: `${pt1.x}%`, 
            top: `${pt1.y}%`,
            rotation: rotation
          });
        }
      });

      // Reveal the checkpoints precisely as the sticky center hits their Y coordinate!
      milestones.forEach((m, index) => {
        const el = milestoneRefs.current[index];
        const gEl = graphicRefs.current[index];

        const animProps = { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)", 
          duration: 0.6, 
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${m.top}% center`,
            toggleActions: "play none none reverse",
          } as gsap.DOMTarget | gsap.plugins.ScrollTriggerStaticVars | undefined
        };

        if (el) {
          gsap.fromTo(el, { opacity: 0, scale: 0.9, filter: "blur(4px)" }, animProps);
        }
        
        if (gEl) {
          gsap.fromTo(gEl, { opacity: 0, scale: 0.9, filter: "blur(4px)" }, animProps);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[400vh] bg-[#0c0d0c] border-t border-stone-800"
    >
      {/* Sticky Header that floats down as the user scrolls */}
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

      <div className="absolute top-0 left-0 w-full h-[400vh] z-10">
         <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
           {/* 1. Road Outer Edges (Base Map) */}
           <path
             d={bezierPath}
             fill="none"
             stroke="#2a2a2a" 
             strokeWidth="24" 
             vectorEffect="non-scaling-stroke"
             strokeLinecap="round"
             strokeLinejoin="round"
           />

           {/* 2. Road Asphalt (Dark core) */}
           <path
             d={bezierPath}
             fill="none"
             stroke="#121312" 
             strokeWidth="22" 
             vectorEffect="non-scaling-stroke"
             strokeLinecap="round"
             strokeLinejoin="round"
           />

           {/* 3. Dashed Center Line */}
           <path
             d={bezierPath}
             fill="none"
             stroke="#e1e3de"
             strokeWidth="1.5"
             strokeDasharray="16 24"
             vectorEffect="non-scaling-stroke"
             className="opacity-20"
           />
         </svg>

         {/* 3. The Physical Traveler Object (The "Ambulance") */}
         <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none z-30">
           <div 
             ref={travelerRef}
             className="traveler-car absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
             style={{ left: '50%', top: '0%' }}
           >
             {/* The physical Ambulance top-down chassis */}
             <div className="relative w-8 h-16 bg-stone-100 border-[1.5px] border-[#0c0d0c] rounded-[3px] shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden z-20">
               {/* Hood / Cabin split */}
               <div className="absolute top-[32px] w-full h-[1px] bg-stone-300" />
               {/* Windshield (Facing down, since we are moving down) */}
               <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[70%] h-4 bg-stone-900 border-[1.5px] border-stone-700 rounded-sm" />
               {/* Rear Window */}
               <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[60%] h-2 bg-stone-800 rounded-[1px]" />
               
               {/* Medical Red Cross on Roof */}
               <div className="absolute top-[16px] left-1/2 -translate-x-1/2">
                 <div className="w-3.5 h-[3.5px] bg-red-600 rounded-[1px]" />
                 <div className="w-[3.5px] h-3.5 bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1px]" />
               </div>

               {/* Headlights */}
               <div className="absolute bottom-0 left-[2px] w-[5px] h-[3px] bg-yellow-100 shadow-[0_4px_12px_rgba(254,240,138,0.9)] rounded-t-[1px]" />
               <div className="absolute bottom-0 right-[2px] w-[5px] h-[3px] bg-yellow-100 shadow-[0_4px_12px_rgba(254,240,138,0.9)] rounded-t-[1px]" />
               {/* Tail lights */}
               <div className="absolute top-0 left-[2px] w-[5px] h-[2px] bg-red-500 rounded-b-[1px]" />
               <div className="absolute top-0 right-[2px] w-[5px] h-[2px] bg-red-500 rounded-b-[1px]" />
             </div>

             {/* The Siren Lightbar (Roof mounted, sitting over everything) */}
             <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex items-center justify-center z-30 w-7 h-1.5 bg-[#0c0d0c] rounded-[1px] border-[0.5px] border-stone-600 overflow-hidden shadow-2xl">
                 <div className="w-1/2 h-full animate-pulse bg-blue-500" style={{ animationDuration: '0.2s' }} />
                 <div className="w-1/2 h-full animate-pulse bg-red-500" style={{ animationDuration: '0.2s', animationDelay: '0.1s' }} />
             </div>

             {/* Rotating Beacons (Casting Light radially on the Road via Conic Gradients) */}
             <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 pointer-events-none z-10 w-0 h-0 flex items-center justify-center">
               <div 
                 className="absolute w-24 h-24 rounded-full mix-blend-screen animate-spin opacity-[0.15]"
                 style={{
                   background: 'conic-gradient(from 0deg, transparent 0deg, rgba(239, 68, 68, 0.4) 40deg, transparent 80deg, transparent 180deg, rgba(59, 130, 246, 0.4) 220deg, transparent 260deg)',
                   animationDuration: '1.2s'
                 }}
               />
               <div 
                 className="absolute w-20 h-20 rounded-full mix-blend-screen animate-spin opacity-[0.15]"
                 style={{
                   background: 'conic-gradient(from 90deg, transparent 0deg, rgba(59, 130, 246, 0.3) 40deg, transparent 80deg, transparent 180deg, rgba(239, 68, 68, 0.3) 220deg, transparent 260deg)',
                   animationDuration: '1.5s',
                   animationDirection: 'reverse'
                 }}
               />
               
               {/* Central Core Glow to illuminate the ambulance itself in the dark */}
               <div className="absolute w-12 h-12 bg-stone-300/10 rounded-full blur-md animate-pulse" />
             </div>
           </div>
         </div>

         {/* 4. Checkpoints Overlay */}
         {milestones.map((m, i) => (
           <div key={i}>
              <div 
               ref={el => { milestoneRefs.current[i] = el; }}
               className="absolute z-20 w-px h-px pointer-events-auto"
               style={{ 
                 top: `${m.top}%`, 
                 left: `${m.left}%`,
               }}
              >
                 {/* Stationary Sub-Node embedded in the road */}
                 <div className="absolute w-[8px] h-[8px] bg-[#0c0d0c] border-[2px] border-[#e1e3de] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner" />
                 
                 {/* Interactive Data Block */}
                 <div className={`absolute w-[240px] md:w-[350px]
                   ${m.align === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-6 md:mr-10 text-right' : 
                     m.align === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-6 md:ml-10 text-left' : 
                     'top-full left-1/2 -translate-x-1/2 mt-8 md:mt-12 text-center'}
                 `}>
                   <div className={`flex flex-col gap-2 md:gap-3 ${m.align === 'left' ? 'items-end' : m.align === 'right' ? 'items-start' : 'items-center'}`}>
                     
                     {/* Digital Checkpoint Data Badge */}
                     <div className="flex flex-col gap-1 items-inherit">
                       <span className="font-mono text-[10px] md:text-xs text-stone-500 tracking-[0.2em] uppercase">{m.year}</span>
                       <div className="bg-[#e1e3de]/5 border border-[#e1e3de]/10 px-2 md:px-3 py-1 md:py-1.5 rounded text-[8px] md:text-[9px] font-mono tracking-widest text-[#e1e3de]/80 shadow-2xl backdrop-blur-md">
                         [{m.dataPoint}]
                       </div>
                     </div>

                     <h3 className="font-serif text-2xl md:text-4xl text-[#e1e3de] leading-tight drop-shadow-xl mt-1 md:mt-2">
                       {m.title}
                     </h3>
                     
                     <p className="text-stone-400 text-xs md:text-sm leading-relaxed text-balance drop-shadow-md">
                       {m.description}
                     </p>
                   </div>
                 </div>
              </div>

              {/* Graphical Counter-Balance (Opposite Side of the Road entirely) */}
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
