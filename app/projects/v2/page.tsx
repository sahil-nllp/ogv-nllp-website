'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../lib/projects-data';
import Footer from '../../components/Footer';

export default function ProjectsV2Page() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Force the document body to a light theme for this page specifically to override globals
    document.documentElement.classList.add('theme-light');
    
    // Simple fade in
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
    
    return () => document.documentElement.classList.remove('theme-light');
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#f4f5f0] text-[#0c0d0c] pt-32 pb-24 selection:bg-emerald-400/30 selection:text-[#0c0d0c]">
      
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-24 max-w-5xl">
        <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] text-[#0c0d0c] mb-8">
          Deployed<br/>Ventures
        </h1>
        <p className="text-lg md:text-xl text-[#0c0d0c]/60 font-light max-w-2xl leading-relaxed">
          An interactive archive of products, platforms, and deep-tech scaling partnerships engineered by Ocean Green Ventures.
        </p>
      </div>

      {/* The Minimalist Accordion Archive */}
      <div className="w-full border-t border-[#0c0d0c]/10">
        {projectsData.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <article key={project.id} className="w-full border-b border-[#0c0d0c]/10 group">
              
              {/* Accordion Header (Clickable Row) */}
              <button 
                onClick={() => toggleExpand(project.id)}
                className="w-full flex items-center justify-between px-6 md:px-12 lg:px-24 py-8 md:py-12 hover:bg-[#0c0d0c]/[0.02] transition-colors text-left"
              >
                <div className="flex items-baseline gap-8 md:gap-16">
                  <span className="font-mono text-xs md:text-sm text-[#0c0d0c]/40 uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#0c0d0c] group-hover:pl-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {project.name}
                  </h2>
                </div>
                
                <div className="flex items-center gap-8">
                  <span className="hidden md:block font-mono text-xs text-[#0c0d0c]/50 uppercase tracking-[0.2em] w-32 text-right">
                    {project.industry}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#0c0d0c]/20 flex items-center justify-center transition-transform duration-500 ${isExpanded ? 'rotate-45 bg-[#0c0d0c] text-[#f4f5f0]' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </button>

              {/* Accordion Body (Expanded Content) */}
              <div 
                className={`w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 md:px-12 lg:px-24 pb-16 pt-4 flex flex-col lg:flex-row gap-12 lg:gap-24">
                  
                  {/* Left: Image Box */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-square bg-[#0c0d0c]/5 border border-[#0c0d0c]/10 rounded-2xl overflow-hidden">
                      <Image 
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right: Clean Metadata */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    
                    <p className="text-xl md:text-3xl text-[#0c0d0c]/80 font-light leading-relaxed mb-12">
                      {project.outcome}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                      
                      {/* Scope List */}
                      <div>
                        <h4 className="font-mono text-[10px] text-[#0c0d0c]/40 uppercase tracking-[0.2em] mb-6 border-b border-[#0c0d0c]/10 pb-4">
                          Scope of Work
                        </h4>
                        <ul className="space-y-3">
                          {project.scope.map((item, i) => (
                            <li key={i} className="text-sm text-[#0c0d0c]/70">
                              <span className="text-[#0c0d0c]/30 mr-3">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech & Data */}
                      <div>
                        <h4 className="font-mono text-[10px] text-[#0c0d0c]/40 uppercase tracking-[0.2em] mb-6 border-b border-[#0c0d0c]/10 pb-4">
                          Parameters
                        </h4>
                        <div className="mb-6">
                          <span className="block font-mono text-[10px] text-[#0c0d0c]/40 uppercase mb-2">Duration</span>
                          <span className="text-sm text-[#0c0d0c]/80">{project.duration}</span>
                        </div>
                        
                        {project.tools && project.tools.length > 0 && (
                          <div>
                            <span className="block font-mono text-[10px] text-[#0c0d0c]/40 uppercase mb-3">Technologies</span>
                            <div className="flex flex-wrap gap-2">
                              {project.tools.map((tool, i) => (
                                <span key={i} className="px-3 py-1 bg-[#0c0d0c]/5 rounded-sm font-mono text-[9px] uppercase tracking-wider text-[#0c0d0c]/60">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            </article>
          );
        })}
      </div>

      <Footer />

    </main>
  );
}
