'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project Alpha",
    subtitle: "Genesis Node",
    year: "2024",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop", 
  },
  {
    title: "Project Delta",
    subtitle: "Systems Hub",
    year: "2025",
    image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1816&auto=format&fit=crop", 
  },
  {
    title: "Project Nexus",
    subtitle: "Global Master",
    year: "2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", 
  }
];

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftBracketRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rightBracketRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Custom Cursor Logic
  useEffect(() => {
    if (!cursorRef.current) return;
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main Scroll Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Setup MatchMedia for responsive recalculations
      const mm = gsap.matchMedia();

      mm.add("(min-width: 300px)", () => {
        projectRefs.current.forEach((project, index) => {
          if (!project) return;
          
          const titleContainer = titleContainerRefs.current[index];
          const leftBracket = leftBracketRefs.current[index];
          const rightBracket = rightBracketRefs.current[index];
          const imgContainer = imageContainerRefs.current[index];
          const innerImg = innerImageRefs.current[index];
          
          // 1. Bracket Separator Animation
          if (titleContainer && leftBracket && rightBracket) {
            const calculateDistance = (element: HTMLElement) => {
              const viewportWidth = window.innerWidth;
              const titleRect = titleContainer.getBoundingClientRect();
              const elRect = element.getBoundingClientRect();
              // Calculate horizontal distance to edge, minus 32px padding
              return (viewportWidth / 2) - (titleRect.width / 2) + (elRect.width / 2) - 32;
            };

            // Brackets open as you scroll down towards them
            gsap.fromTo(leftBracket, { x: 0 }, {
              x: () => -calculateDistance(leftBracket),
              ease: "none",
              scrollTrigger: {
                trigger: titleContainer,
                start: "top 95%",
                end: "top 25%", // Finishes opening by the time it reaches top 25% of screen
                scrub: 1,
                invalidateOnRefresh: true,
              }
            });

            gsap.fromTo(rightBracket, { x: 0 }, {
              x: () => calculateDistance(rightBracket),
              ease: "none",
              scrollTrigger: {
                trigger: titleContainer,
                start: "top 95%",
                end: "top 25%",
                scrub: 1,
                invalidateOnRefresh: true,
              }
            });
          }

          // 2. Image Peak Animation (Scale up / Unclip on enter, Scale down / Clip on leave)
          if (imgContainer && innerImg) {
            
            // Set initial squash state (starts from a nearly microscopic thumbnail)
            gsap.set(imgContainer, { 
              scale: 0.25, 
              clipPath: "inset(25% 25% 25% 25%)",
              filter: "brightness(0.3)" 
            });
            // Set initial Inner Image zoom state (creates heavy parallax scale effect when uncrushing)
            gsap.set(innerImg, { scale: 1.8 }); 

            // Create a scrub timeline perfectly bounding the image container's journey across the screen
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: imgContainer, 
                start: "top bottom",   // Animation starts the moment the top edge enters the bottom of screen
                end: "bottom top",     // Animation ends the moment the bottom edge leaves the top of screen
                scrub: true,
              }
            });

            // SCENE 1 (Entering -> Center of Screen): Un-squash container, zoom out image inside
            tl.to(imgContainer, {
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              filter: "brightness(1)",
              ease: "power2.inOut"
            }, 0); // Start at 0 of timeline
            
            tl.to(innerImg, {
              scale: 1,
              ease: "power2.inOut"
            }, 0);

            // SCENE 2 (Center of Screen -> Leaving): Squash container back down, zoom image back in
            tl.to(imgContainer, {
              scale: 0.25,
              clipPath: "inset(25% 25% 25% 25%)",
              filter: "brightness(0.3)",
              ease: "power2.inOut"
            }, ">"); // Start immediately after previous animation peaks (at exactly 50% scroll)

            tl.to(innerImg, {
              scale: 1.8,
              ease: "power2.inOut"
            }, "<"); // Sync with container squash
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0c0d0c] text-[#e1e3de] py-40 overflow-x-hidden cursor-default font-sans">
      
      {/* Title Header */}
      <div className="w-full text-center z-50 pointer-events-none mb-32">
        <h2 className="font-serif text-2xl md:text-3xl text-[#e1e3de]/50 tracking-tight uppercase">
          Deployed Architectures.
        </h2>
      </div>

      {/* Custom Hover Cursor Pill */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center h-10 px-6 bg-[#e1e3de] text-[#0c0d0c] text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap shadow-2xl ${hoveredProject ? 'opacity-100' : 'opacity-0'}`}
      >
        {hoveredProject} Discover +
      </div>

      <div className="flex flex-col gap-64 w-full">
        {projects.map((project, index) => (
          <div key={index} ref={el => { projectRefs.current[index] = el; }} className="flex flex-col items-center justify-center w-full relative min-h-screen">
            
            {/* Title Block */}
            <div 
              ref={el => { titleContainerRefs.current[index] = el; }}
              className="flex justify-center items-center w-full mb-[4vh] relative z-10"
            >
              <span ref={el => { leftBracketRefs.current[index] = el; }} className="text-5xl md:text-7xl lg:text-[7vw] font-medium tracking-tighter mr-2 md:mr-6 will-change-transform leading-none whitespace-nowrap">
                [
              </span>
              <h3 className="text-4xl md:text-6xl lg:text-[7vw] font-medium tracking-tighter whitespace-nowrap leading-none px-2 relative top-0 md:top-[0.2vw]">
                {project.title}
              </h3>
              <span ref={el => { rightBracketRefs.current[index] = el; }} className="text-5xl md:text-7xl lg:text-[7vw] font-medium tracking-tighter ml-2 md:ml-6 will-change-transform leading-none whitespace-nowrap">
                ]
              </span>
            </div>

            {/* Image Block */}
            <div className="w-full max-w-[85vw] md:max-w-5xl mx-auto z-0 relative">
              <div 
                ref={el => { imageContainerRefs.current[index] = el; }}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                className="relative w-full aspect-[4/3] overflow-hidden bg-stone-900 border border-stone-800 transform-gpu cursor-none will-change-transform"
              >
                <div 
                  ref={el => { innerImageRefs.current[index] = el; }}
                  className="absolute inset-0 bg-cover bg-center will-change-transform transform-gpu"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              {/* Data / Subtitles below Image */}
              <div className="flex justify-between items-center mt-8 uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#e1e3de]/60 mx-auto px-4">
                <span>{project.subtitle}</span>
                <span>{project.year}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
