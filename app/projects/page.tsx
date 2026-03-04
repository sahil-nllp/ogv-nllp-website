'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import { projectsData } from '../lib/projects-data';
import Footer from '../components/Footer';

/**
 * Since react-pageflip requires standard DOM elements as children, 
 * we must forward refs to custom Page components.
 */
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; number: number; className?: string }>(
  (props, ref) => {
    return (
      <div className="demoPage bg-[#0c0d0c] h-full w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#e1e3de]/5" ref={ref}>
        <div className={`w-full h-full relative ${props.className || ''}`}>
          {props.children}
          
          {/* Subtle Page Numbering at bottom outside edges */}
          <div className={`absolute bottom-6 font-mono text-[10px] text-[#e1e3de]/30 ${props.number % 2 === 0 ? 'left-6' : 'right-6'}`}>
            {String(props.number).padStart(2, '0')}
          </div>
        </div>
      </div>
    );
  }
);
Page.displayName = 'Page';

export default function MagazinePortfolio() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<any>(null);

  const onPageFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const onBookInit = (e: any) => {
    // Sync initial state
    const pageFlip = bookRef.current?.pageFlip();
    if (pageFlip) {
      setCurrentPage(pageFlip.getCurrentPageIndex());
    }
  };

  // Handle client-side resizing for the flipbook
  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Header Theme Toggle
  useEffect(() => {
    const header = document.getElementById('main-header');
    if (header) {
      header.classList.add('theme-light');
    }
    return () => {
      if (header) {
        header.classList.remove('theme-light');
      }
    };
  }, []);

  // Wait for client mount to avoid hydration mismatch with dimensions
  if (windowDimensions.width === 0) return <div className="min-h-screen bg-[#f4f5f0]" />;

  // Calculate book dimensions based on screen size (Max width 1400px, aspect ratio ~1:1.3 per page)
  const isMobile = windowDimensions.width < 768;
  const bookWidth = isMobile ? windowDimensions.width : Math.min(windowDimensions.width * 0.45, 700);
  const bookHeight = isMobile ? windowDimensions.height - 100 : Math.min(windowDimensions.height * 0.85, 900);

  return (
    <main className="relative bg-[#f4f5f0] min-h-screen text-[#0c0d0c] overflow-hidden flex flex-col justify-between">
      
      {/* Absolute Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#0c0d0c]/[0.015] blur-[150px] pointer-events-none" />

      {/* Navigation Hint */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Drag to Turn</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#0c0d0c] to-transparent" />
      </div>

      {/* Magazine Container */}
      <div className="flex-grow flex items-center justify-center w-full px-0 md:px-8 pt-40 pb-20 relative z-20">
        
        {/* Transition wrapper to center the cover/back-cover (shifting by 25% of the total 2-page width) */}
        <div 
          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform"
          style={{ 
            width: isMobile ? '100%' : `${bookWidth * 2}px`,
            transform: !isMobile 
              ? (currentPage === 0 
                  ? 'translateX(-25%)' 
                  : (currentPage === projectsData.length * 2 + 1 
                      ? 'translateX(25%)' 
                      : 'translateX(0px)')
                ) 
              : 'translateX(0px)'
          }}
        >
          {/* @ts-ignore - The types for react-pageflip are famously incomplete but the library works flawlessly */}
          <HTMLFlipBook 
            width={bookWidth} 
            height={bookHeight} 
            size="fixed"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1200}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onPageFlip}
            onInit={onBookInit}
            className="mx-auto"
            ref={bookRef}
          >
          {/* COVER PAGE */}
          <Page number={1}>
            <div className="w-full h-full flex flex-col justify-between p-12 md:p-24 bg-gradient-to-br from-[#111211] to-[#0c0d0c]">
               <div>
                 <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Ocean Green Ventures</span>
                 <div className="w-12 h-[1px] bg-[#e1e3de]/20 mt-6" />
               </div>
               
               <div>
                 <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-[0.9] text-[#e1e3de] mb-6">
                   Deployed <br/> <span className="italic font-light text-[#e1e3de]/70">Ventures.</span>
                 </h1>
                 <p className="text-sm md:text-base text-[#e1e3de]/50 font-light max-w-sm">
                   A portfolio of products, telehealth platforms, and deep-tech scaling partnerships.
                 </p>
               </div>
               
               <div className="flex justify-between items-end">
                 <span className="font-mono text-[10px] text-[#e1e3de]/40 uppercase tracking-widest">Vol. 01</span>
                 <span className="font-mono text-[10px] text-[#e1e3de]/40 uppercase tracking-widest">2026</span>
               </div>
            </div>
          </Page>

          {/* INNER PAGES (The 14 Projects = 28 Pages total) */}
          {projectsData.map((project, index) => {
            const pageNumBase = (index * 2) + 2; 
            
            return [
              // LEFT SIDE: The Massive Visual
              <Page key={`${project.id}-visual`} number={pageNumBase}>
                <div className="w-full h-full relative group bg-black">
                  <Image 
                    src={project.coverImage} 
                    alt={project.name}
                    fill
                    className="object-cover opacity-80"
                  />
                  {/* Subtle vignette for print feel */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
                  
                  {/* Massive Editorial Number Overlay */}
                  <div className="absolute bottom-12 left-12 mix-blend-overlay opacity-30 pointer-events-none">
                    <span className="font-serif text-[12rem] leading-none text-white select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </Page>,

              // RIGHT SIDE: The Technical Data
              <Page key={`${project.id}-data`} number={pageNumBase + 1}>
                <div className="w-full h-full bg-[#111211] p-10 md:p-16 flex flex-col justify-center overflow-y-auto">
                  
                  {/* Header Meta */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="inline-block px-3 py-1 bg-[#e1e3de]/10 text-[#e1e3de] font-mono text-[9px] uppercase tracking-widest rounded-full">
                      {project.industry}
                    </span>
                    <span className="font-mono text-[9px] text-[#e1e3de]/40 uppercase tracking-widest">
                      {project.duration}
                    </span>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] text-[#e1e3de] mb-6">
                    {project.name}
                  </h2>

                  <p className="text-lg md:text-xl text-[#e1e3de]/80 font-light leading-relaxed mb-12 pb-10 border-b border-[#e1e3de]/10">
                    {project.outcome}
                  </p>

                  {/* Execution Scope */}
                  <div className="mb-12">
                    <h3 className="flex items-center gap-3 font-mono text-[9px] text-emerald-400 uppercase tracking-[0.2em] mb-6">
                      <span className="w-4 h-[1px] bg-emerald-400/50" />
                      Scope of Work
                    </h3>
                    <ul className="space-y-3">
                      {project.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm md:text-[15px] text-[#e1e3de]/60 font-light">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#e1e3de]/20 flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack */}
                  {project.tools && project.tools.length > 0 && (
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, i) => (
                          <span 
                            key={i} 
                            className="font-mono text-[9px] text-[#e1e3de]/40 tracking-widest uppercase"
                          >
                            {tool}{i !== project.tools.length - 1 ? ' , ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </Page>
            ];
          })}

          {/* BACK COVER */}
          <Page number={30}>
            <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#0c0d0c]">
               <div className="w-px h-16 bg-emerald-400/50 mb-8" />
               <h3 className="font-serif text-2xl text-[#e1e3de] mb-4">Ready to build?</h3>
               <a 
                 href="/contact"
                 className="px-6 py-3 bg-[#e1e3de] text-[#0c0d0c] font-mono text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-emerald-400 transition-colors"
               >
                 Initiate Sprint
               </a>
            </div>
          </Page>

        </HTMLFlipBook>
        </div>
      </div>

    </main>
  );
}
