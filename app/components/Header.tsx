'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation drops the pill from top
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-auto">
      <header
        ref={headerRef}
        id="main-header"
        className="group/header flex items-center justify-between md:justify-center gap-8 md:gap-12 px-2 py-2 md:px-4 md:py-2.5 transition-colors duration-700 bg-[#e1e3de]/5 [&.theme-light]:bg-[#0c0d0c]/5 backdrop-blur-2xl border border-[#e1e3de]/10 [&.theme-light]:border-[#0c0d0c]/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] [&.theme-light]:shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      >
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="text-[#e1e3de] group-[.theme-light]/header:text-[#0c0d0c] font-serif tracking-tight text-xl hover:opacity-70 transition-colors duration-700 pl-4 md:pl-6"
        >
          OGV<span className="font-sans font-light text-stone-500 group-[.theme-light]/header:text-stone-400 opacity-50 mx-[2px] transition-colors duration-700">/</span>NLLP
        </Link>

        {/* Center Navigation Links - Hidden on Mobile */}
        <nav ref={linksRef} className="hidden md:flex items-center gap-10">
          {['Expertise', 'Projects', 'Studio', 'Insights'].map((link) => (
            <Link
              key={link}
              href={link === 'Insights' ? '/insights' : `/#${link.toLowerCase()}`}
              className="group relative flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-stone-400 group-[.theme-light]/header:text-stone-600 font-medium transition-colors hover:text-[#e1e3de] group-[.theme-light]/header:hover:text-[#0c0d0c] duration-700"
            >
              {/* Glass Droplet Hover Background */}
              {/* Expanded outwards from the text using negative insets to make the pill larger */}
              <span className="absolute -inset-x-6 -inset-y-3 z-0 bg-[#e1e3de]/10 group-[.theme-light]/header:bg-[#0c0d0c]/5 border border-[#e1e3de]/20 group-[.theme-light]/header:border-[#0c0d0c]/10 backdrop-blur-xl rounded-full opacity-0 scale-50 origin-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 shadow-[0_8px_16px_rgba(0,0,0,0.2)] group-[.theme-light]/header:shadow-none" />
              
              {/* Text */}
              <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[1px]">
                {link}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right Action */}
        <div className="flex-shrink-0 z-20">
          <Link 
            href="/contact"
            className="flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-[#0c0d0c] group-[.theme-light]/header:text-[#e1e3de] bg-[#e1e3de] group-[.theme-light]/header:bg-[#0c0d0c] font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-700 px-6 py-2.5 md:px-8 md:py-3.5"
            style={{ letterSpacing: '0.2em' }} // letter spacing forces right gap
          >
            <span style={{ transform: 'translateX(2px)' }}>ENGAGE</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
