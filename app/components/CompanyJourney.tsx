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
  },
  {
    year: "Year 04",
    dataPoint: "MODELS_INTEGRATED: 14",
    title: "Systems Integration",
    description: "As our footprint expanded, we recognized the need for true digital-physical synthesis.",
    top: 38,
    left: 25,
    align: "right",
  },
  {
    year: "Year 07",
    dataPoint: "NODES_DEPLOYED: 42+",
    title: "Scale & Replication",
    description: "The 'Operational Vanguard' methodology was perfected. What took years to design could now be deployed in months.",
    top: 58,
    left: 75,
    align: "left",
  },
  {
    year: "Year 10",
    dataPoint: "REGIONAL_ECOSYSTEMS: 05",
    title: "Ecosystem Mastery",
    description: "We transitioned from building clinics to architecting entire regional health ecosystems.",
    top: 78,
    left: 25,
    align: "right",
  },
  {
    year: "Year 12",
    dataPoint: "STATUS: OPTIMIZING",
    title: "Present Day",
    description: "Over a decade of relentless optimization. Today, we engineer the environments where the future of care is actually possible.",
    top: 95,
    left: 50,
    align: "center",
  }
];

export default function CompanyJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",   // Start exactly when top of section hits middle of screen
          end: "bottom center",  // End exactly when bottom of section hits middle of screen
          scrub: true,
        }
      });

      // Animate the X position left and right to flawlessly mimic the SVG Cubic Bezier
      // The curve bends at Y=18, Y=38, Y=58, Y=78, Y=95.
      // So durations (Y-distances) are: 18, 20, 20, 20, 17, 5.
      tl.to(travelerRef.current, { left: "75%", ease: "sine.inOut", duration: 18 })
        .to(travelerRef.current, { left: "25%", ease: "sine.inOut", duration: 20 })
        .to(travelerRef.current, { left: "75%", ease: "sine.inOut", duration: 20 })
        .to(travelerRef.current, { left: "25%", ease: "sine.inOut", duration: 20 })
        .to(travelerRef.current, { left: "50%", ease: "sine.inOut", duration: 17 })
        .to(travelerRef.current, { left: "50%", ease: "none", duration: 5 });

      // Reveal the checkpoints precisely as the sticky center hits their Y coordinate!
      milestones.forEach((m, index) => {
        const el = milestoneRefs.current[index];
        if (!el) return;

        gsap.fromTo(el,
          { opacity: 0, scale: 0.9, filter: "blur(4px)" },
          { 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)", 
            duration: 0.6, 
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${m.top}% center`, // animate right as this percentage of the container hits the middle of the screen!
              toggleActions: "play none none reverse",
            }
          }
        );
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

         {/* 3. The Physical Traveler Object (The "Car") */}
         <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none z-30">
           <div className="sticky top-[50vh] w-full">
             <div 
               ref={travelerRef}
               className="traveler-car absolute w-6 h-6 bg-[#e1e3de] rounded-full shadow-[0_0_20px_4px_rgba(225,227,222,0.6)] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
               style={{ left: '50%' }}
             >
               <div className="w-2 h-2 bg-[#0c0d0c] rounded-full" />
             </div>
           </div>
         </div>

         {/* 4. Checkpoints Overlay */}
         {milestones.map((m, i) => (
           <div 
            key={i}
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
         ))}
      </div>

    </section>
  );
}
