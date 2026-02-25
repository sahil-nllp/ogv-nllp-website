'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project Alpha",
    subtitle: "GENESIS NODE",
    description: "The foundational deployment of the OGV architecture. A completely self-contained ecosystem designed for maximum redundancy and data integrity.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop", 
  },
  {
    title: "Project Delta",
    subtitle: "SYSTEMS HUB",
    description: "Centralized processing node. Delta handles the massive influx of clinical data, routing it intelligently across the global network in real-time.",
    image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1816&auto=format&fit=crop", 
  },
  {
    title: "Project Nexus",
    subtitle: "GLOBAL MASTER",
    description: "The crown jewel of the NLLP deployment. Nexus sits at the intersection of architecture and pure data flow, serving as the master control unit.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", 
  },
];

export default function ProjectsShowcaseVariant() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // The total width we need to slide (number of projects minus 1, times viewport width)
      const slideDistance = (projects.length - 1) * window.innerWidth;
      const totalScrollDuration = slideDistance + window.innerHeight * 2;

      // Toggle the global header to a dark theme while inside this specific section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80px", // When the section reaches the header
        end: `+=${totalScrollDuration}`, // Stay dark for the entire duration of the pinned scroll
        toggleClass: { targets: "#main-header", className: "theme-light" }
      });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin immediately upon hitting the top of the section
          end: `+=${totalScrollDuration}`, // Extend scroll distance: 1 raw scroll for expansion + raw scrolls per slide + 1 raw scroll for compression
          scrub: 1, // Smooth, buttery scrub
          pin: true,
        }
      });

      /* 
       * SCENE 1: THE EXPANSION 
       * Starts as a tiny pill on the lower-left side of the screen.
       * Expands horizontally and vertically until it perfectly fills the viewport.
       */
      tl.to(containerRef.current, {
        width: "100vw", // Full screen again
        height: "100vh",
        bottom: "0vh",
        right: "0",    // Snaps against the right edge
        x: 0,          
        borderRadius: "0px", 
        ease: "power2.inOut",
        duration: 1, 
      });

      /* 
       * SCENE 2: THE CONTENT FADES IN
       * Once the container is full screen, fade in the content for Project 1
       */
      tl.to(contentRefs.current[0], {
         opacity: 1,
         y: 0,
         duration: 0.2, // Quick fade
      }, "-=0.2"); // Overlap slightly with the end of the expansion

      /* 
       * SCENE 3: THE HORIZONTAL SWIPES 
       * We now physically pull the internal track to the left, 
       * "swiping" to the subsequent projects by the exact width of our half-screen container (50vw).
       */
      tl.to(trackRef.current, {
        x: -slideDistance,
        ease: "none",
        duration: projects.length - 1, 
      });
      
      // Fade in the content for all subsequent projects identically as they slide into view
      projects.forEach((_, index) => {
         if (index === 0) return; // Handled above
         
         // Calculate the exact time point in the timeline when this slide enters the screen perfectly
         // Expansion (1) + (index - 1 units of sliding)
         const exactStartTime = 1 + (index - 1);
         
         // As it enters, fade it in and slide it up slightly for polish
         tl.fromTo(contentRefs.current[index], 
           { opacity: 0, y: 50 },
           { 
             opacity: 1, 
             y: 0, 
             ease: "power2.out",
             duration: 0.4
           }, 
           // Trigger this fade shortly after this specific slide starts getting pulled into view
           exactStartTime + 0.3 
         );
      });

      /* 
       * SCENE 4: THE COMPRESSION 
       * After the final sweep finishes, compress the container back down into a tiny pill
       * that floats up towards the top of the screen as you scroll away.
       */
      
      // First, quickly fade out the very last project's text before we crush the box
      tl.to(contentRefs.current[projects.length - 1], {
        opacity: 0,
        duration: 0.1,
      });

      // Crush the box back down into a tiny oval, floating mid-right
      tl.to(containerRef.current, {
        width: "300px",
        height: "150px",
        bottom: "calc(100vh - 250px)", 
        right: "15vw",                 // Anchor right side
        x: "50%",                      // Translate to center it around the anchor
        borderRadius: "100px",         
        ease: "power2.inOut",
        duration: 1, 
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#e1e3de] overflow-hidden" 
      // Reversed bg color to pure white so the dark pill expanding is extremely stark and noticeable!
    >
      
      {/* Background Section Title (Visible behind the small pill) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#0c0d0c] px-4 text-center pb-32">
         <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-50 mb-4">Selected Works</span>
         <h2 className="font-serif text-5xl md:text-7xl font-medium tracking-tighter">Featured Projects</h2>
         {/* <p className="font-sans text-sm md:text-base opacity-70 mt-6 max-w-lg mx-auto">
            Scroll down to unpack the high-performance architectural networks built by NLLP worldwide.
         </p> */}
      </div>

      {/* 
        THE ANIMATED MASK CONTAINER 
        This is the box that starts tiny, expands to 50vw/100vh on the left, and shrinks down.
      */}
      <div 
        ref={containerRef}
        className="absolute bottom-[10vh] overflow-hidden bg-[#0c0d0c] will-change-transform shadow-[30px_0_50px_rgba(0,0,0,0.5)] border-l border-[#0c0d0c]/10 z-10"
        // Starts as a tiny pill bottom-right
        style={{
          width: "250px", 
          height: "100px", 
          borderRadius: "100px",
          right: "25%", 
          transform: "translateX(50%)" 
        }}
      >
          {/* THE INTERNAL TRACK */}
          {/* 100vw wide panels */}
          <div 
            ref={trackRef}
            className="flex h-full w-[300vw] will-change-transform" // 100vw * 3 projects = 300vw
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="relative w-[100vw] h-full flex shrink-0 items-center justify-center p-8 md:p-24"
              >
                 {/* The Actual Project Background Image */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url(${project.image})` }}
                 />
                 
                 {/* Heavy Dark Overlay for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                 {/* The Project Details overlay */}
                 {/* This physically fades in *after* the box expands or slides over it */}
                 <div 
                   ref={el => { contentRefs.current[index] = el; }}
                   className="relative z-10 w-full max-w-5xl flex flex-col items-start gap-4 mt-auto opacity-0 translate-y-12 will-change-transform"
                 >
                    <span className="font-mono text-[10px] md:text-xs text-[#e1e3de] tracking-[0.4em] uppercase border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md bg-black/50">
                       Project 0{index + 1} // {project.subtitle}
                    </span>
                    <h3 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none mb-2 drop-shadow-lg">
                       {project.title}
                    </h3>
                    <p className="font-sans text-sm md:text-lg text-[#e1e3de]/80 max-w-2xl font-light leading-relaxed drop-shadow-md">
                       {project.description}
                    </p>
                 </div>
              </div>
            ))}
          </div>
      </div>

    </section>
  );
}
