'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  {
    id: "01",
    phase: "Genesis",
    title: "Strategic Blueprinting",
    description: "Every ecosystem begins as a conceptual node. We map out clinical pathways, financial viability, and regulatory topography long before ground is broken.",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Mapping Grid */}
        <div className="absolute w-48 h-48 border border-[#e1e3de]/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e1e3de_1px,transparent_1px),linear-gradient(to_bottom,#e1e3de_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
        </div>
        
        {/* Clinical Pathway Logic */}
        <svg className="w-48 h-48 relative z-10">
          <path d="M 20,100 L 60,100 L 90,60 L 140,60" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-[draw-path_3s_ease-in-out_infinite]" strokeDasharray="200" strokeDashoffset="200" />
          <path d="M 60,100 L 90,140 L 140,140" fill="none" stroke="#e1e3de" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="20" cy="100" r="3" fill="#10b981" />
          <circle cx="140" cy="60" r="3" fill="#10b981" />
        </svg>
        {/* <div className="absolute top-[20%] left-[20%] font-mono text-[8px] text-[#e1e3de]/40 uppercase tracking-[0.2em]">Pathway_Alpha</div> */}
        <style>{`
          @keyframes draw-path { to { stroke-dashoffset: 0; } }
        `}</style>
      </div>
    )
  },
  {
    id: "02",
    phase: "Architecture",
    title: "Digital & Physical Synthesis",
    description: "The intersection of mortar and data. We design facilities that are organically bound to their technological lifelines.",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* The "Building-Server" Hybrid */}
        <div className="w-32 h-40 border-2 border-[#e1e3de]/20 relative flex flex-col justify-end p-2 bg-[#e1e3de]/5">
          {/* Internal 'Bandwidth' lines representing the tech backbone */}
          <div className="flex justify-between w-full h-full absolute top-0 left-0 px-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-[1px] h-full bg-emerald-500/20 relative">
                 <div className="absolute top-0 left-0 w-full h-4 bg-emerald-500 animate-[flow-down_2s_linear_infinite]" style={{ animationDelay: `${i*0.4}s` }} />
               </div>
             ))}
          </div>
          <div className="relative z-10 w-full h-12 border-t border-[#e1e3de]/40 pt-1">
             <div className="font-mono text-[7px] text-[#e1e3de]/60">STRUCTURAL_CORE_INTEGRATION</div>
          </div>
        </div>
        <style>{`
          @keyframes flow-down { 0% { top: -10%; opacity:0; } 50% { opacity:1; } 100% { top: 100%; opacity:0; } }
        `}</style>
      </div>
    )
  },
  {
    id: "03",
    phase: "Deployment",
    title: "Operational Vanguard",
    description: "The theoretical blueprint transitions into a pulsing, breathing medical environment under our direct oversight.",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Vital Sign Monitoring / System Health */}
        <div className="w-56 h-32 relative -translate-y-0">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              points="0,50 40,50 50,20 60,80 70,50 110,50 120,30 130,70 140,50 200,50"
              strokeDasharray="400"
              strokeDashoffset="400"
              className="animate-[draw-path_4s_linear_infinite]"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0c] via-transparent to-[#0c0d0c] pointer-events-none" />
          <div className="absolute bottom-0 left-0 flex gap-4 w-full justify-center">
             <div className="flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="font-mono text-[8px] text-[#e1e3de]/40 uppercase">Live_Systems</span>
             </div>
             <div className="flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
               <span className="font-mono text-[8px] text-[#e1e3de]/40 uppercase">Staging_Active</span>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "04",
    phase: "Sustenance",
    title: "The Living Ecosystem",
    description: "We ensure continuous compliance, scaling efficiency, and lifecycle management for the modern care institution.",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Recursive Loop / Scaling Nodes */}
        <div className="relative w-40 h-40">
           {/* Rotating Ring of Nodes */}
           <div className="absolute inset-0 border border-dashed border-[#e1e3de]/20 rounded-full animate-[spin_20s_linear_infinite]" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-emerald-500/40 flex items-center justify-center bg-emerald-500/5 backdrop-blur-xl">
                 <div className="w-2 h-2 bg-[#e1e3de] rounded-full shadow-[0_0_15px_white]" />
              </div>
           </div>
           {/* Satellite Data Points */}
           {[0, 72, 144, 216, 288].map((angle, i) => (
             <div 
               key={i}
               className="absolute w-2 h-2 border border-emerald-500 bg-[#0c0d0c]"
               style={{ 
                 top: '50%', left: '50%',
                 transform: `rotate(${angle}deg) translate(60px) rotate(-${angle}deg)`
               }}
             />
           ))}
        </div>
        {/* <div className="absolute bottom-4 font-mono text-[8px] text-[#e1e3de]/30 uppercase tracking-[0.3em]">Lifecycle_Scale_Module</div> */}
      </div>
    )
  }
];

export default function EcosystemTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scroll the container horizontally
      if (scrollContainerRef.current && sectionRef.current) {
        
        // Use a timeline to scrub the x translation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,           // Pin the section
            scrub: 1,            // Smooth scrubbing
            start: 'top top',    // Start when top of section hits top of viewport
            end: '+=3000',       // Amount of vertical scroll to complete the horizontal scroll (3000px feels like a good journey)
          }
        });

        // Calculate how far to move left: 
        // We move the container's scrollWidth minus the viewport width (100vw).
        // Since xPercent is relative to the element's width, it's easier to use raw viewport/element calculations.
        tl.to(scrollContainerRef.current, {
          x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[#0c0d0c] overflow-hidden border-t border-stone-800 flex items-center"
    >
      {/* Sticky Section Header (Matches Operational Nodes style) */}
      <div className="absolute top-24 md:top-32 left-0 w-full px-[4vw] z-40 pointer-events-none">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col gap-4">
            {/* <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-stone-500 tracking-[0.2em] uppercase">Phase 03</span>
              <div className="w-12 h-[1px] bg-stone-700" />
            </div> */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#e1e3de] tracking-tight">
              Ecosystem Lifecycle
            </h2>
          </div>
          
          <p className="max-w-md text-stone-400 text-sm md:text-base leading-relaxed text-balance">
            Watch the progression from abstract strategy to breathing infrastructure. Our methodology ensures zero loss of fidelity between the blueprint and the build.
          </p>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex h-full py-32 pt-48 md:py-0 md:pt-48 md:items-center w-max relative"
      >
        {/* Initial spacer to push the first item off the extreme left edge slightly */}
        <div className="w-[10vw]" />

        {/* The Single Master Timeline Line */}
        <div className="absolute top-[60.6%%] left-0 w-full h-[1px] bg-[#e1e3de]/20 hidden md:block z-0" />

        {timelineSteps.map((step, index) => (
          <div 
            key={step.id} 
            className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 h-[70vh] md:h-[60vh] flex flex-col md:flex-row relative"
          >
            {/* Left Content Half */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-10">
              {/* Title Block (Anchored above the 50% centerline) */}
              <div className="absolute top-0 left-0 w-full h-[50%] flex flex-col justify-end pb-6 md:pb-8 px-8 md:pr-12 md:pl-0">
                <span className="font-mono text-[10px] md:text-xs text-stone-500 mb-3 md:mb-4 tracking-widest uppercase">{step.id} / {step.phase}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#e1e3de] leading-tight">
                  {step.title}
                </h3>
              </div>
              
              {/* Description Block (Anchored below the 50% centerline) */}
              <div className="absolute top-[50%] left-0 w-full h-[50%] flex flex-col justify-start pt-6 md:pt-8 px-8 md:pr-12 md:pl-0">
                <p className="text-stone-400 text-sm md:text-base leading-relaxed text-balance">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Right Graphic Half */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-0">
               {step.graphic}
            </div>
            
            {/* Timeline Node marker (hidden on mobile, visible on desktop overlapping the center timeline) */}
            <div className="absolute top-[50%] left-0 w-4 h-4 bg-[#0c0d0c] border-2 border-[#e1e3de] rounded-full -translate-y-1/2 -translate-x-1/2 hidden md:block z-20" />
          </div>
        ))}

        {/* Ending spacer to allow scrolling past the final item */}
        <div className="w-[20vw] h-full flex flex-col justify-center px-12 relative">
          <div className="absolute top-[50%] left-0 w-4 h-4 bg-[#0c0d0c] border-2 border-stone-700 rounded-full -translate-y-1/2 -translate-x-1/2 hidden md:block z-20" />
          <h2 className="font-serif text-4xl text-[#e1e3de] tracking-tight">
            The Result.
          </h2>
        </div>
      </div>
    </section>
  );
}
