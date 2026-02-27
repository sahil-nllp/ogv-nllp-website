'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import { insightsData } from '../lib/insights-data';

export default function InsightsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter the articles based on the search input
  const filteredArticles = insightsData.filter((article) => {
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the huge header and search
      if (headerRef.current) {
        gsap.fromTo([headerRef.current.children, searchRef.current],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // 2. Staggered fade up for the list items
      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out', delay: 0.5 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#0c0d0c] min-h-screen text-[#e1e3de] overflow-hidden pt-32 pb-4 flex flex-col items-center">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[60vw] h-[60vw] -translate-y-1/2 rounded-full bg-[#fdf5cc]/[0.02] blur-[120px] pointer-events-none" />

      <section className="flex-grow w-full px-6 md:px-12 lg:px-24 py-12 md:py-16 relative z-10 flex flex-col">
        
        {/* Page Header & Search Wrapper */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
          
          {/* Page Header */}
          <div ref={headerRef} className="max-w-3xl">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[1] pb-8">
              Our <span className="italic font-light opacity-90">Blog.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#e1e3de]/60 font-light leading-relaxed max-w-xl">
              Thoughts, methodologies, and updates on the future of healthcare infrastructure.
            </p>
          </div>

          {/* Search Input */}
          <div ref={searchRef} className="lg:max-w-xs w-full pb-4 ">
             <div className="relative group flex items-center">
               <svg 
                 className="absolute left-4 w-5 h-5 text-[#e1e3de]/40 group-focus-within:text-[#e1e3de]/80 transition-colors" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor"
               >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               <input 
                 type="text"
                 placeholder="Search articles..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-[#e1e3de]/[0.03] border border-[#e1e3de]/10 focus:border-[#e1e3de]/30 rounded-full py-4 pl-12 pr-6 text-sm text-[#e1e3de] placeholder:text-[#e1e3de]/30 hover:bg-[#e1e3de]/[0.05] transition-all outline-none"
               />
             </div>
          </div>

        </div>

        {/* Editorial Article List */}
        <div ref={listRef} className="w-full mt-8 md:mt-12 border-t border-[#e1e3de]/20">
          
          {filteredArticles.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-[#e1e3de]/40">No entries found for "{searchQuery}"</p>
            </div>
          )}

          {filteredArticles.map((article) => (
            <Link 
              key={article.slug}
              href={`/insights/${article.slug}`} 
              className="group block w-full py-12 px-4 md:py-20 border-b border-[#e1e3de]/10 hover:bg-[#e1e3de]/[0.02] transition-colors duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                
                {/* Meta */}
                <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 font-mono text-[10px] uppercase tracking-widest text-[#e1e3de]/50 group-hover:text-[#e1e3de]/80 transition-colors">
                   <span>{article.date}</span>
                   <span className="hidden lg:block w-4 h-[1px] bg-[#e1e3de]/30" />
                   <span className="text-emerald-400/70">{article.category}</span>
                </div>

                {/* Title & Excerpt */}
                <div className="lg:col-span-5 pr-0 lg:pr-12">
                   <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] mb-6 tracking-tight text-[#e1e3de] group-hover:text-white transition-colors duration-300">
                     {article.title}
                   </h2>
                   <p className="font-sans text-base md:text-lg text-[#e1e3de]/60 leading-relaxed max-w-lg">
                     {article.excerpt}
                   </p>
                </div>

                {/* Image */}
                <div className="lg:col-span-4 lg:col-start-9 relative aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden mt-8 lg:mt-0">
                   <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                   <Image 
                     src={article.coverImage} 
                     alt={article.title}
                     fill
                     className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                   />
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Footer */}
      <div className="relative z-20 w-full mt-auto">
         <Footer />
      </div>

    </main>
  );
}
