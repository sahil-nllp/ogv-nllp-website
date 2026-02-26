'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CtaRevealFooterVariant from '../components/CtaRevealFooterVariant';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic entrance animation for the page
    const ctx = gsap.context(() => {
      
      // Animate Left Column (Typography & Telemetry)
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current.children, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );
      }

      // Animate Right Column (The Form)
      if (rightColRef.current) {
         gsap.fromTo(rightColRef.current.children, 
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.4 }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#0c0d0c] min-h-screen text-[#e1e3de] overflow-hidden pt-32 pb-16 flex flex-col">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#fdf5cc]/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] translate-y-1/2 -translate-x-1/2 rounded-full bg-[#e1e3de]/[0.02] blur-[100px] pointer-events-none" />

      {/* Main Content Grid */}
      <section className="flex-grow container max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Monumental Text & Context */}
          <div ref={leftColRef} className="flex flex-col justify-center mx-auto max-w-lg relative w-full pt-8 lg:pt-0">
            
            {/* Abstract Cross Decorator */}
             <div className="w-10 h-10 relative flex items-center justify-center opacity-40 mb-16 animate-[spin_20s_linear_infinite]">
                 <div className="absolute w-full h-[1px] bg-[#e1e3de] rounded-full" />
                 <div className="absolute h-full w-[1px] bg-[#e1e3de] rounded-full" />
             </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.25] mb-12">
              Get in <br/> <span className="italic font-light opacity-90">Touch.</span>
            </h1>
            
            <p className="font-sans text-lg text-[#e1e3de]/60 font-light leading-relaxed mb-16">
              Start a conversation about healthcare infrastructure, operational strategy, or facility development. 
            </p>

            {/* Telemetry Data Blocks */}
            <div className="flex flex-col gap-6 border-l border-[#e1e3de]/10 pl-6">
               <div>
                 <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]/40 mb-1">Direct Comms</p>
                 <a href="mailto:comms@ogv-nllp.com" className="font-sans text-lg tracking-wide hover:text-white transition-colors duration-300">
                   comms@ogv-nllp.com
                 </a>
               </div>
               <div>
                 <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]/40 mb-1">Global Headquarters</p>
                 <p className="font-sans text-lg tracking-wide">Sydney, Australia</p>
               </div>
               <div>
                 <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]/40 mb-1">Current Status</p>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <p className="font-sans text-sm tracking-wide">Accepting New Projects</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column - The Glassmorphic Form */}
          <div ref={rightColRef} className="flex flex-col justify-center">
            
            {/* Form Container */}
            <div className="relative w-full max-w-lg mx-auto rounded-3xl border border-[#e1e3de]/10 bg-[#e1e3de]/[0.02] backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              
              {/* Subtle inner top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#e1e3de]/20 to-transparent pointer-events-none" />

              <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                 
                 {/* Identity Input */}
                 <div className="relative group">
                    <input 
                      type="text" 
                      id="identity" 
                      required
                      placeholder=" " // Required for peer-placeholder-shown to work
                      className="block w-full bg-transparent border-0 border-b border-[#e1e3de]/20 py-3 text-lg text-[#e1e3de] peer focus:ring-0 focus:border-[#e1e3de]/80 transition-colors duration-300 placeholder-transparent"
                    />
                    <label 
                      htmlFor="identity" 
                      className="absolute top-3 left-0 font-mono text-xs uppercase tracking-[0.1em] text-[#e1e3de]/50 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e1e3de]/80 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#e1e3de]/50"
                    >
                      Full Name
                    </label>
                 </div>

                 {/* Affiliation Input */}
                 <div className="relative group">
                    <input 
                      type="text" 
                      id="affiliation" 
                      required
                      placeholder=" "
                      className="block w-full bg-transparent border-0 border-b border-[#e1e3de]/20 py-3 text-lg text-[#e1e3de] peer focus:ring-0 focus:border-[#e1e3de]/80 transition-colors duration-300 placeholder-transparent"
                    />
                    <label 
                      htmlFor="affiliation" 
                      className="absolute top-3 left-0 font-mono text-xs uppercase tracking-[0.1em] text-[#e1e3de]/50 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e1e3de]/80 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#e1e3de]/50"
                    >
                      Affiliation (Company)
                    </label>
                 </div>

                 {/* Secure Link Input */}
                 <div className="relative group">
                    <input 
                      type="email" 
                      id="email" 
                      required
                      placeholder=" "
                      className="block w-full bg-transparent border-0 border-b border-[#e1e3de]/20 py-3 text-lg text-[#e1e3de] peer focus:ring-0 focus:border-[#e1e3de]/80 transition-colors duration-300 placeholder-transparent"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute top-3 left-0 font-mono text-xs uppercase tracking-[0.1em] text-[#e1e3de]/50 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e1e3de]/80 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#e1e3de]/50"
                    >
                      Email Address
                    </label>
                 </div>

                 {/* Message Textarea */}
                 <div className="relative group mt-4">
                    <textarea 
                      id="message" 
                      rows={4}
                      required
                      placeholder=" "
                      className="block w-full bg-[#1a1c1a]/50 border border-[#e1e3de]/10 rounded-xl px-4 py-4 text-sm text-[#e1e3de] peer focus:ring-0 focus:border-[#e1e3de]/40 transition-colors duration-300 placeholder-transparent resize-none"
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute top-4 left-4 font-mono text-xs uppercase tracking-[0.1em] text-[#e1e3de]/50 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-[#e1e3de]/80 peer-valid:-top-6 peer-valid:left-0 peer-valid:text-[10px] peer-valid:text-[#e1e3de]/50"
                    >
                      Message
                    </label>
                 </div>

                 {/* Submit Button */}
                 <button 
                  type="submit"
                  className="group relative flex items-center justify-between w-full mt-4 px-8 py-4 rounded-xl overflow-hidden border border-[#e1e3de]/20 bg-[#e1e3de]/[0.05] transition-all duration-500 hover:bg-[#e1e3de]/10 hover:border-[#e1e3de]/40"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]">
                      Send Message
                    </span>
                    <svg 
                      className="relative z-10 w-4 h-4 text-[#e1e3de] -rotate-45 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                 </button>

                 <p className="text-center font-mono text-[8px] uppercase tracking-widest text-[#e1e3de]/30 pt-4">
                   Your information is kept secure and confidential
                 </p>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Reusing Global Footer layout */}
      <div className="relative z-20 w-full mt-auto">
         <CtaRevealFooterVariant />
      </div>

    </main>
  );
}
