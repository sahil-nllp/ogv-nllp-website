'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const engageTextRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !engageTextRef.current) return;

    const ctx = gsap.context(() => {
      // The Massive "ENGAGE" Scaling Animation
      // As you scroll down into the footer, the word starts large and grows to fill the entire physical screen width
      gsap.fromTo(
        engageTextRef.current,
        { 
          scale: 0.8,
          y: 100,
          opacity: 0,
        },
        {
          scale: 1, // Will scale up to exactly fit the container width based on CSS
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom", // Starts when the top of the footer hits the bottom of the screen
            end: "center center", // Ends when the footer is nicely centered
            scrub: 1, // Ties perfectly to scroll speed
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full min-h-screen bg-[#0c0d0c] flex flex-col justify-end pt-32 pb-0 overflow-hidden z-20"
    >
      {/* 
        TOP SECTION: The Massive CTA 
      */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 mb-20 pointer-events-none">
         <p className="font-mono text-xs md:text-sm text-[#e1e3de]/50 tracking-[0.5em] uppercase mb-8">
            Ready to talk?
         </p>
         
         <div className="w-full flex justify-center items-center overflow-hidden leading-none">
            {/* 
              This text is styled to grow dramatically. 
              vw units ensure it tries to take up maximum horizontal space 
            */}
            <h2 
              ref={engageTextRef}
              className="font-serif font-medium tracking-tighter text-[#e1e3de] whitespace-nowrap will-change-transform"
              style={{ fontSize: "clamp(4rem, 20vw, 25rem)" }} 
            >
               ENGAGE
            </h2>
         </div>
      </div>

      {/* 
        BOTTOM SECTION: The Architectural Utility Grid 
      */}
      <div className="w-full px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pt-12 border-t border-[#e1e3de]/10">
          
          {/* Column 1: Newsletter / Comms */}
          <div className="md:col-span-2 flex flex-col justify-between">
             <div>
               <h3 className="font-serif text-2xl text-[#e1e3de] mb-4">Stay updated.</h3>
               <p className="font-sans text-sm text-[#e1e3de]/50 max-w-sm mb-12 font-light">
                 Receive updates on healthcare infrastructure strategy and global facility deployments.
               </p>
               
               <div ref={formRef} className="relative max-w-md flex items-center group">
                 <input 
                   type="email" 
                   placeholder="ENTER EMAIL ADDRESS" 
                   className="w-full bg-transparent border-b border-[#e1e3de]/20 pb-4 text-sm text-[#e1e3de] font-mono tracking-widest placeholder:text-[#e1e3de]/20 focus:outline-none focus:border-[#e1e3de] transition-colors"
                 />
                 <button className="absolute right-0 bottom-4 text-[#e1e3de]/50 hover:text-[#e1e3de] transition-colors pointer-events-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                 </button>
               </div>
             </div>
          </div>

          {/* Column 2: Global Nodes (Locations) */}
          <div className="flex flex-col gap-8">
             <div>
                <h4 className="font-mono text-[10px] text-[#e1e3de]/50 uppercase tracking-[0.2em] mb-4">Global Headquarters</h4>
                <p className="font-sans text-sm text-[#e1e3de] font-light leading-relaxed">
                  Level 32, 1 Farrer Place<br />
                  Sydney NSW 2000<br />
                  Australia
                </p>
             </div>
             <div>
                <h4 className="font-mono text-[10px] text-[#e1e3de]/50 uppercase tracking-[0.2em] mb-4">European Office</h4>
                <p className="font-sans text-sm text-[#e1e3de] font-light leading-relaxed">
                  42 Healthcare Way<br />
                  London, UK E1 6AN
                </p>
             </div>
          </div>

          {/* Column 3: Navigation / Legal */}
          <div className="flex flex-col gap-12 justify-between">
             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <a href="#expertise" className="font-mono text-[10px] text-[#e1e3de]/70 hover:text-[#e1e3de] uppercase tracking-[0.2em] transition-colors">Expertise</a>
                  <a href="#projects" className="font-mono text-[10px] text-[#e1e3de]/70 hover:text-[#e1e3de] uppercase tracking-[0.2em] transition-colors">Projects</a>
                  <a href="#studio" className="font-mono text-[10px] text-[#e1e3de]/70 hover:text-[#e1e3de] uppercase tracking-[0.2em] transition-colors">Studio</a>
                </div>
                <div className="flex flex-col gap-4">
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="font-mono text-[10px] text-[#e1e3de]/70 hover:text-[#e1e3de] uppercase tracking-[0.2em] transition-colors">Twitter (X)</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="font-mono text-[10px] text-[#e1e3de]/70 hover:text-[#e1e3de] uppercase tracking-[0.2em] transition-colors">LinkedIn</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="font-mono text-[10px] text-[#e1e3de]/70 hover:text-[#e1e3de] uppercase tracking-[0.2em] transition-colors">GitHub</a>
                </div>
             </div>
             
             {/* Copyright */}
             <div className="flex justify-between items-end border-t border-[#e1e3de]/10 pt-4 mt-8 md:mt-0">
               <span className="font-mono text-[10px] text-[#e1e3de]/30 tracking-widest uppercase">
                 © 2026 OGV/NLLP
               </span>
               <span className="font-mono text-[10px] text-[#e1e3de]/30 tracking-widest uppercase text-right">
                 Healthcare Infrastructure<br className="md:hidden" /> & Operations
               </span>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
