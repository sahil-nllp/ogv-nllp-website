'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: "01",
    title: "Strategic Advisory",
    description: "Aligning vision with executable frameworks. We evaluate market feasibility, regulatory landscapes, and financial viability to lay the groundwork for sustainable healthcare ecosystems.",
    size: "col-span-1 md:col-span-2 row-span-1 min-h-[300px] md:min-h-[350px]",
    icon: (
      <div className="w-8 h-8 relative flex items-center justify-center">
        <div className="absolute w-full h-[1px] bg-[#e1e3de]/40" />
        <div className="absolute h-full w-[1px] bg-[#e1e3de]/40" />
        <div className="w-2 h-2 border border-[#e1e3de] rounded-full rotate-45" />
      </div>
    ),
    ambientGraphic: (
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-64 h-48 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none hidden md:block">
        {/* Abstract Topographic/Framework Blueprint */}
        <div className="absolute inset-0 border border-[#e1e3de] rounded-xl" />
        <div className="absolute top-8 left-0 w-full h-[1px] bg-[#e1e3de]" />
        <div className="absolute bottom-12 left-0 w-full h-[1px] bg-[#e1e3de]" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-[#e1e3de]" />
        
        {/* Nodes and Connectors */}
        <div className="absolute top-8 right-16 w-3 h-3 bg-[#e1e3de] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#e1e3de]" />
        <div className="absolute bottom-12 right-16 w-2 h-2 border border-[#e1e3de] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-12 w-2 h-2 border border-[#e1e3de] rounded-full" />
        
        {/* Decorative Data Lines */}
        <div className="absolute top-[40%] left-4 w-24 h-[1px] bg-[#e1e3de] border-dashed border-t border-[#e1e3de]" />
        <div className="absolute bottom-6 right-6 w-12 h-6 border-t border-l border-[#e1e3de]" />
      </div>
    )
  },
  {
    id: "02",
    title: "Infrastructure Development",
    description: "From blank blueprints to fully operational physical and digital medical environments.",
    size: "col-span-1 md:col-span-1 row-span-1 min-h-[300px] md:min-h-[350px]",
    icon: (
      <div className="w-8 h-8 border border-[#e1e3de]/40 flex flex-col justify-between p-1">
        <div className="w-full h-[1px] bg-[#e1e3de]/60" />
        <div className="w-full h-[1px] bg-[#e1e3de]/60" />
        <div className="w-full h-[1px] bg-[#e1e3de]/60" />
      </div>
    )
  },
  {
    id: "03",
    title: "Operational Integration",
    description: "Embedding precision workflows and scalable technology stacks into the facility's DNA.",
    size: "col-span-1 md:col-span-1 row-span-1 min-h-[300px] md:min-h-[350px]",
    icon: (
      <div className="w-8 h-8 relative">
        <div className="absolute inset-2 border border-[#e1e3de]/50 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#e1e3de] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1 left-4 w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </div>
    )
  },
  {
    id: "04",
    title: "Project Delivery",
    description: "Going live. We manage the delicate transition from construction and staging to active patient care, ensuring zero downtime and immediate regulatory compliance.",
    size: "col-span-1 md:col-span-2 row-span-1 min-h-[300px] md:min-h-[350px]",
    icon: (
      <div className="flex gap-1 h-8 items-end">
        <div className="w-1.5 h-[40%] bg-[#e1e3de]/30" />
        <div className="w-1.5 h-[70%] bg-[#e1e3de]/60" />
        <div className="w-1.5 h-full bg-[#e1e3de]" />
      </div>
    ),
    ambientGraphic: (
      <div className="absolute bottom-0 right-12 w-64 h-48 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none hidden md:flex items-end justify-between gap-4">
        {/* Abstract Audio/Data Visualizer Bars */}
        {[40, 70, 45, 90, 60, 85, 30].map((height, i) => (
          <div 
            key={`bar-${i}`}
            className="w-full bg-gradient-to-t from-[#e1e3de] to-transparent rounded-t-sm origin-bottom transition-transform duration-1000 group-hover:scale-y-110"
            style={{ 
              height: `${height}%`,
              transitionDelay: `${i * 50}ms`,
              opacity: height > 60 ? 1 : 0.5
            }} 
          />
        ))}
      </div>
    )
  }
];

export default function OperationalNodes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Bento box stagger animation
      if (gridRef.current) {
        const boxes = gsap.utils.toArray(gridRef.current.children);
        gsap.fromTo(boxes,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#0c0d0c] px-[4vw] py-24 md:py-32 xl:py-40 border-t border-stone-800"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col gap-4">
            {/* <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-stone-500 tracking-[0.2em] uppercase">Phase 02</span>
              <div className="w-12 h-[1px] bg-stone-700" />
            </div> */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#e1e3de] tracking-tight">
              Core Capabilities
            </h2>
          </div>
          
          <p className="max-w-md text-stone-400 text-sm md:text-base leading-relaxed text-balance">
            We don't just draft blueprints; we build the facility. Our core competencies span the entire lifecycle of healthcare infrastructure development.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {nodes.map((node) => (
            <div 
              key={node.id}
              className={`group relative rounded-3xl border border-stone-800 bg-[#121312] hover:bg-[#161816] transition-colors duration-500 overflow-hidden ${node.size}`}
            >
              {/* Inner wrapper for padding and flex layout so it doesn't conflict with root size classes */}
              <div className="flex flex-col h-full w-full p-8 md:p-12 z-10 relative">
                
                {/* Top Row: Icon & ID */}
                <div className="flex justify-between items-start w-full">
                  <div className="text-stone-300 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {node.icon}
                  </div>
                  <span className="font-mono text-[10px] text-stone-600 tracking-widest">{node.id}</span>
                </div>

                {/* Bottom Row: Text content */}
                <div className="flex flex-col gap-3 mt-auto pt-16">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#e1e3de] leading-tight">
                    {node.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                    {node.description}
                  </p>
                </div>
              </div>

              {/* Ambient Graphic (if provided by node data) */}
              {node.ambientGraphic && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  {node.ambientGraphic}
                </div>
              )}

              {/* Background Layer: Abstract hover gradient */}
              <div className="absolute -bottom-[50%] -right-[20%] w-[100%] aspect-square bg-stone-800/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
