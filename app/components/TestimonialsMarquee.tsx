'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: "OGV/NLLP completely transformed our healthcare infrastructure. Their strategic planning led to unprecedented operational efficiency.",
    author: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    company: "Global Health Initiative",
  },
  {
    quote: "OGV/NLLP didn't just design a facility; they created an environment that truly supports proactive patient care and scales effortlessly.",
    author: "Marcus Vance",
    role: "Director of Infrastructure",
    company: "Vance Healthcare Systems",
  },
  {
    quote: "Their approach to healthcare consulting is years ahead of the industry standard. Flawless execution from planning to completion.",
    author: "Elena Rostova",
    role: "Lead Operations Director",
    company: "Stark Medical Group",
  },
  {
    quote: "The new facility design allowed us to manage patient flow and clinical integration at a volume we previously thought impossible.",
    author: "James Holden",
    role: "VP of Facility Planning",
    company: "Tycho Regional Hospital",
  },
  {
    quote: "Masterful planning. Every strategic decision they made anticipated our future capacity needs before they became issues.",
    author: "Aida Turing",
    role: "Chief Operating Officer",
    company: "Aether Health",
  }
];

export default function TestimonialsMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    // We clone the inner container so we have two identical tracks of testimonials side-by-side
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      // Add aria-hidden to the clones so screen readers don't read the same quotes twice!
      duplicatedItem.setAttribute('aria-hidden', 'true');
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    // We animate the track sliding infinitely to the left
    const ctx = gsap.context(() => {
      gsap.to(scrollerRef.current, {
        x: "-50%", // Slide exactly half the massive width (which equals one full loop of the original items)
        ease: "none",
        duration: 40, // Very slow, ambient glide
        repeat: -1,   // Infinite loop
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full py-32 overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-50 text-[#e1e3de] mb-4 block">
                 Partner Intelligence
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-[#e1e3de] tracking-tighter">
                 Field Reports.
              </h2>
           </div>
           <p className="font-sans text-sm text-[#e1e3de]/60 max-w-sm font-light">
              Direct feedback from the architects and engineers operating our deployed ecosystems worldwide.
           </p>
        </div>
      </div>

      {/* 
        The Continuous Marquee Track 
        It has a subtle fade on the left and right edges so cards appear and disappear cleanly
      */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        
        {/* The Flex track that holds all the cards and slides infinitely */}
        <div 
          ref={scrollerRef}
          className="flex w-max gap-8 md:gap-12 py-8 hover:[animation-play-state:paused] will-change-transform" // Optional: Pause on hover logic could go here, but GSAP is handling it now
        >
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="relative flex flex-col justify-between w-[85vw] md:w-[600px] h-[350px] shrink-0 p-8 md:p-12 border border-[#e1e3de]/20 bg-[#e1e3de]/5 bg-gradient-to-br from-white/10 to-transparent rounded-3xl backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:bg-[#e1e3de]/10 transition-colors duration-500 overflow-hidden"
            >
               {/* 
                 A cool technical detail: a subtle glowing grid background that appears when you hover over a card.
               */}
               <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none" />

               {/* Heavy iOS specular highlight on the top edge */}
               <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

               {/* Quote Section */}
               <div className="relative z-10 text-[#e1e3de]">
                 <span className="text-4xl text-[#e1e3de]/20 font-serif leading-none absolute -top-4 -left-4">"</span>
                 <p className="font-serif text-2xl md:text-3xl leading-relaxed tracking-tight opacity-90">
                    {item.quote}
                 </p>
               </div>

               {/* Author Metadata Section */}
               <div className="relative z-10 flex items-center justify-between mt-8 pt-8 border-t border-[#e1e3de]/10">
                 <div>
                    <p className="font-mono text-xs text-[#e1e3de] uppercase tracking-wider mb-1">
                      {item.author}
                    </p>
                    <p className="font-sans text-[10px] text-[#e1e3de]/50 uppercase tracking-widest">
                      {item.role}
                    </p>
                 </div>
                 
                 {/* A sleek, abstract ID badge/company indicator */}
                 <div className="flex items-center gap-3 opacity-30">
                    <span className="font-mono text-[10px] uppercase tracking-widest">{item.company}</span>
                    <div className="w-8 h-[1px] bg-[#e1e3de]" />
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
