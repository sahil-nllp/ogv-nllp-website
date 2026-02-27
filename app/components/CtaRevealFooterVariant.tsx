'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function CtaRevealFooterVariant() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  
  const footerWrapRef = useRef<HTMLElement>(null);
  const footerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Toggle header to dark theme because this is a stark white section,
      // and keep it dark through the black footer reveal.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80px",
        end: () => `+=${document.documentElement.scrollHeight}`, // Keep it toggled until the absolute bottom of the page
        toggleClass: { targets: "#main-header", className: "theme-light" }
      });

      // The sequence timeline when the section is pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Pin for 1.5 viewport heights to allow the sequence to play fully
          scrub: 1, // Smooth scrolling locked to mouse wheel
          pin: true,
        }
      });

      // Step 2: While pinned, the massive center text and button physically scroll up from BELOW the screen.
      tl.fromTo(
        centerTextRef.current,
        { y: "100vh", opacity: 1 }, 
        { y: "0vh", opacity: 1, ease: "none", duration: 1.5 }, // Slightly longer duration for the heavier block
        "reveal"
      );

      // Hold the final composition so it's readable before unpinning
      tl.to({}, { duration: 0.5 });
      
      // Step 1: The small text starts splitting horizontally EXACTLY when it becomes visible.
      // We push it out slightly further (35vw instead of 32vw) so it clears the massive center text.
      gsap.to(leftTextRef.current, {
        x: "-35vw",
        ease: "none",
        scrollTrigger: {
           trigger: sectionRef.current,
           start: "top center", // Starts exactly when the text becomes visible at the bottom of the screen
           end: () => `+=${window.innerHeight * 2}`, // Continues splitting while moving up and while pinned
           scrub: 1
        }
      });
      gsap.to(rightTextRef.current, {
        x: "35vw",
        ease: "none",
        scrollTrigger: {
           trigger: sectionRef.current,
           start: "top center",
           end: () => `+=${window.innerHeight * 2}`,
           scrub: 1
        }
      });


      /* 
       * THE FOOTER CURTAIN REVEAL MECHANIC 
       * This runs concurrently with the natural unpinning. It makes the footer content sit
       * fractionally lower than its container and smoothly rise inside it, creating a classic "curtain lift" feel.
       */
      gsap.fromTo(footerInnerRef.current, 
        { y: "-40%" }, // Start it shifted up physically inside its container (looks like it was swallowed by the z-index)
        { 
          y: "0%", 
          ease: "none",
          scrollTrigger: {
            trigger: footerWrapRef.current,
            start: "top bottom", // Start mapping when the top of the footer wrapper enters the bottom of screen
            end: "top top",     // Finish mapping exactly when the footer meets the top of the screen perfectly
            scrub: true,
          }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* CTA CURTAIN SECTION */}
      <section 
        ref={sectionRef} 
        data-cursor-dark
        className="has-light-bg relative w-full h-screen bg-[#e1e3de] text-[#0c0d0c] overflow-hidden z-20"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          
          {/* Main Huge Center Text & Button (Grouped) */}
          <div ref={centerTextRef} className="absolute flex flex-col items-center justify-center gap-12 w-full px-4 top-1/2 -translate-y-1/2 pointer-events-auto">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[7.5rem] font-light tracking-tight leading-[1.1] text-center whitespace-nowrap pointer-events-none">
               <span className="italic opacity-90">Architecting</span> <br />
               the future <br />
               <span className="italic opacity-90">at scale.</span>
            </h2>
            
             <Link href="/contact" className="flex items-center gap-4 px-6 py-3 border border-[#0c0d0c]/30 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#0c0d0c] hover:text-[#e1e3de] transition-all duration-500 pointer-events-auto mt-4">
                Write to us, we reply quickly <span className="text-lg leading-none">→</span>
             </Link>
          </div>

          {/* The Splitting Text */}
          <div className="absolute flex items-center justify-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] w-full text-[#0c0d0c]/70">
            <span ref={leftTextRef} className="will-change-transform whitespace-nowrap">BEYOND THE CONSTRUCT</span>
            <span ref={rightTextRef} className="will-change-transform whitespace-nowrap">TOWARDS THE IMPOSSIBLE</span>
          </div>
          
        </div>
      </section>

      {/* FOOTER REVEAL SECTION */}
      <footer ref={footerWrapRef} className="relative w-full h-[75vh] bg-[#0c0d0c] z-10 overflow-hidden flex flex-col justify-between">
        
        {/* We animate this inner container to create the parallax curtain effect */}
        <div ref={footerInnerRef} className="absolute inset-0 w-full h-full flex flex-col justify-between pt-16 md:pt-20 pb-8 will-change-transform">
           
           {/* Top Grid Area */}
           <div className="relative z-10 w-full px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-4 text-[#e1e3de]">
              
              {/* Let's Talk Section */}
              <div className="md:col-span-6 flex flex-col items-start justify-start">
                 <p className="font-serif text-5xl md:text-7xl mb-6 tracking-tighter">
                   <span className="italic font-light opacity-90">Let's</span> talk.
                 </p>
                 <a href="mailto:hello@ogvnllp.com" className="font-sans text-xs md:text-sm tracking-widest uppercase border-b border-[#e1e3de]/30 pb-1 hover:border-[#e1e3de] transition-colors">
                   hello@ogvnllp.com
                 </a>
              </div>
              
              {/* Socials Column */}
              <div className="md:col-span-3 flex flex-col gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#e1e3de]/50">
                 <h4 className="text-[#e1e3de] mb-4 font-sans tracking-[0.3em] font-bold opacity-100">Socials</h4>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Instagram</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">X (Twitter)</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">LinkedIn</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">YouTube</a>
              </div>

              {/* Company Column */}
              <div className="md:col-span-3 flex flex-col gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#e1e3de]/50">
                 <h4 className="text-[#e1e3de] mb-4 font-sans tracking-[0.3em] font-bold opacity-100">Company</h4>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Expertise</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Projects</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Studio</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Insights</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Careers</a>
              </div>
           </div>

           {/* Enormous Background Text Anchored to Bottom */}
           <div className="absolute bottom-0 left-0 w-full overflow-hidden flex items-end justify-center pointer-events-none select-none translate-y-[28%] z-0">
              <h1 
                className="font-serif text-[#e1e3de] opacity-[0.03] whitespace-nowrap leading-[0.75]"
                style={{ fontSize: "19vw", letterSpacing: "-0.02em" }}
              >
                 OGV/NLLP
              </h1>
           </div>

           {/* Bottom Legal Bar */}
           <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[#e1e3de]/40 font-mono text-[9px] uppercase tracking-widest pt-8 mt-auto border-t border-[#e1e3de]/10">
              <p>© {new Date().getFullYear()} OGV NLLP. All rights reserved.</p>
              <div className="flex gap-8">
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Privacy Policy</a>
                 <a href="#" className="hover:text-[#e1e3de] transition-colors">Terms of Service</a>
              </div>
           </div>

        </div>
      </footer>
    </>
  );
}
