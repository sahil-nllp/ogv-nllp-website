'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); // This is now the outer wrapper
  const textRef = useRef<HTMLHeadingElement>(null);
  const hospitalRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the image container for the 200vh scroll distance
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: imageContainerRef.current,
        pinSpacing: false, // Don't add spacing, it's absolute
      });

      // Scale the outer wrapper of the image so the whole block gets bigger
      gsap.to([imageRef.current, ctaRef.current], {
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Fade in the CTA over the lower part of the image as you scroll down
      // Initial scale is 0.95 so it "pops" in slightly as it fades 
      // (The above uniform scaling timeline handles its base 1 to 1.5 trajectory)
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top -5%',      // Wait until scrolled down 5%
            end: 'top -20%',       // Fully visible quickly
            scrub: true,
          }
        }
      );

      // Scrubbed scroll animation - text physically slides in from the right based on scroll depth
      gsap.fromTo(topTextRef.current,
        { opacity: 0, x: 200 },
        {
          opacity: 1,
          x: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: topTextRef.current,
            start: 'top 95%', // Starts sliding as soon as it enters the bottom of the screen
            end: 'top 50%',   // Finishes sliding perfectly into place when it hits the middle of the screen
            scrub: 1,         // Binds the animation exactly to the scrollbar movement (with 1s smoothing)
          }
        }
      );

      // Animate bottom large text when it enters the viewport
      gsap.fromTo(bottomTextRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Animate the hospital drawing itself in line-by-line
      if (hospitalRef.current) {
        const structuralElements = gsap.utils.toArray(hospitalRef.current.querySelectorAll('.draw-anim'));
        
        // Initial state - hidden via clipping/scaling
        // Expand the clipping region past the edges using negative insets so that
        // absolutely positioned children (like the Helipad that sits at -top-4)
        // are not permanently hidden by the parent's clip-path boundary when it finishes animating.
        gsap.set(structuralElements, {
          clipPath: 'inset(150% -50% -50% -50%)', 
          opacity: 0
        });
        
        gsap.to(structuralElements, {
          clipPath: 'inset(-50% -50% -50% -50%)',
          opacity: 1,
          duration: 1.5,
          stagger: 0.15, // Draw elements sequentially
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: hospitalRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[200vh] bg-[#0c0d0c] overflow-hidden" // The entire scrollable area
    >
      
      {/* Pinned Left Image Container */}
      <div 
        ref={imageContainerRef}
        className="absolute top-0 left-0 h-screen w-full md:w-1/2 flex items-center z-0 pointer-events-none"
        style={{ paddingLeft: 'clamp(2.5rem, 15vw, 12rem)' }}
      >
        <div className="relative flex items-center justify-center pointer-events-auto">
          {/* Main Image Base */}
          <div 
            ref={imageRef} 
            className="w-[28vw] h-[58vh] flex-shrink-0 origin-center"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/assets/hero-ogv.jpg"
                  alt="Healthcare infrastructure"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          {/* New Overlay CTA Button Wrapper (Isolates GSAP animation from CSS hover delays) */}
          <div ref={ctaRef} className="absolute bottom-[10%] z-20 opacity-0 pointer-events-none origin-center" style={{ willChange: 'transform' }}>
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-500 hover:bg-black/60 hover:border-white/40 hover:scale-[1.05] group pointer-events-auto"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <span className="relative z-10 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]">
                Connect with us
              </span>
              
              <svg 
                className="relative z-10 w-3 md:w-4 h-3 md:h-4 text-[#e1e3de] -rotate-45 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Metallic Text Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes customMetallicShine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .custom-metallic-text {
          background: linear-gradient(
            110deg,
            #1e1f1e 0%,
            #ffffff 15%,
            #8a8d86 30%,
            #3a3c39 50%,
            #ffffff 70%,
            #8a8d86 85%,
            #1e1f1e 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: customMetallicShine 7s linear infinite;
        }
      `}} />

      {/* Main Huge Text Overlay - Scrolls Naturally */}
      {/* Positioned at the top of the 200vh container, so it leaves the screen as you scroll down */}
      <div className="absolute top-[50vh] xl:top-[70vh] -translate-y-[40%] left-0 w-full pointer-events-none z-10 flex justify-center overflow-visible">
        <h1 ref={textRef} className="select-none flex justify-center w-full px-[4vw]">
          <span className="block font-serif text-[19vw] leading-none tracking-[-0.04em] font-bold custom-metallic-text whitespace-nowrap scale-y-110 md:scale-y-100">
            OGV/NLLP
          </span>
        </h1>
      </div>

      {/* Scroll indicator - absolute positioned within the top 100vh */}
      <div className="absolute top-[85vh] right-8 flex flex-col items-center gap-2 z-20 opacity-35">
        <div className="w-[1px] h-16 bg-stone-400" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium rotate-90 origin-center translate-x-7">
          Scroll
        </span>
      </div>

      {/* Right Column "About Context" - Scrolls naturally from the bottom half */}
      <div 
        className="absolute top-0 right-0 w-full md:w-1/2 h-[200vh] flex flex-col z-10 pointer-events-auto px-[6vw] md:pl-[4vw] md:pr-[8vw]"
        style={{ paddingTop: '110vh', justifyContent: 'space-between', paddingBottom: '10vh' }}
      >
        
        {/* Hospital Building CSS Line Art at top right */}
        <div ref={hospitalRef} className="absolute top-[20vh] right-[8vw] z-0 opacity-20 hidden md:flex items-end justify-center w-64 h-64">
          
          {/* Base structure - Left Wing */}
          <div className="draw-anim absolute bottom-0 left-[10%] w-[30%] h-[40%] border-t border-l border-[#e1e3de] flex flex-col justify-end p-2 gap-2">
            {[1, 2, 3].map(i => (
              <div key={`left-win-${i}`} className="draw-anim w-full h-4 border border-[#e1e3de]/40 flex gap-1 p-0.5">
                <div className="w-1/2 h-full bg-[#e1e3de]/10 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                <div className="w-1/2 h-full bg-[#e1e3de]/10" />
              </div>
            ))}
          </div>

          {/* Main Central Tower */}
          <div className="draw-anim absolute bottom-0 left-[35%] w-[40%] h-[80%] border-t border-l border-r border-[#e1e3de] flex flex-col items-center justify-end pb-2 gap-2 z-10 bg-[#0c0d0c]">
            {/* Helipad / Roof structure - Moved down slightly to not rely entirely on negative top */}
            <div className="draw-anim absolute top-0 -translate-y-[120%] w-[110%] h-5 border border-[#e1e3de] flex items-center justify-center bg-[#0c0d0c]">
              <span className="draw-anim text-[10px] font-mono text-[#e1e3de] leading-none select-none">H</span>
            </div>
            
            {/* Tower Windows */}
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={`tower-win-${i}`} className="draw-anim w-[80%] h-4 flex gap-1">
                <div className="w-1/3 h-full border border-[#e1e3de]/30" />
                <div className="w-1/3 h-full border border-[#e1e3de]/30 bg-[#e1e3de]/20" />
                <div className="w-1/3 h-full border border-[#e1e3de]/30" />
              </div>
            ))}

            {/* Entrance Canopy */}
            <div className="draw-anim w-[120%] h-6 border-t border-[#e1e3de] mt-2 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[#e1e3de] shadow-[0_4px_12px_rgba(225,227,222,0.8)]" />
              {/* Medical Cross above entrance - completely revamped container */}
              <div className="draw-anim absolute top-[-12px] left-1/2 -translate-x-1/2 w-3 h-3 bg-transparent z-20">
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1.5px] bg-[#e1e3de]" />
                {/* Vertical line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[1.5px] bg-[#e1e3de]" />
              </div>
            </div>
          </div>

          {/* Base structure - Right Wing */}
          <div className="draw-anim absolute bottom-0 right-[5%] w-[25%] h-[55%] border-t border-r border-[#e1e3de] flex flex-col justify-end p-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={`right-win-${i}`} className="draw-anim w-full h-3 border border-[#e1e3de]/40 flex gap-0.5" />
            ))}
          </div>

          {/* Ground Line */}
          <div className="draw-anim absolute bottom-0 left-0 w-full h-[1px] bg-[#e1e3de]" />

          {/* Decorative scanner line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-[scan_6s_ease-in-out_infinite]" />
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scan {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
          `}} />
        </div>

        {/* Top smaller text - Enters as soon as you start scrolling */}
        <div ref={topTextRef} className="flex flex-col gap-10 w-full max-w-2xl">
          {/* Abstract Healthcare Cross Symbol */}
          <div className="w-10 h-10 relative flex items-center justify-center opacity-70 animate-[spin_10s_linear_infinite]">
            <div className="absolute w-full h-[1.5px] bg-[#e1e3de] rounded-full" />
            <div className="absolute h-full w-[1.5px] bg-[#e1e3de] rounded-full" />
            <div className="absolute w-2 h-2 bg-[#0c0d0c] border-[1.5px] border-[#e1e3de] rounded-full z-10" />
          </div>

          <div className="flex gap-8 md:gap-16">
            <span className="text-sm md:text-base lg:text-lg font-medium text-[#e1e3de] whitespace-nowrap pt-1">
              Mack & Nilu
            </span>
            <p className="text-sm md:text-base lg:text-lg leading-[1.6] text-stone-400 max-w-sm md:max-w-md lg:max-w-xl text-balance">
              We turn strategies into tangible operational ecosystems.
            </p>
          </div>
        </div>

        {/* Bottom larger text - Reaches the bottom of the screen at the end of the scroll */}
        <div ref={bottomTextRef} className="max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[35px] leading-[1.2] text-[#e1e3de] font-britney tracking-wide text-balance">
            At OGV/NLLP, we believe every environment deserves to come to life with precision and care. We turn what you're imagining into infrastructure and operations that resonate, creating ecosystems that both perform and inspire.
          </p>
        </div>
      </div>

    </section>
  );
}
