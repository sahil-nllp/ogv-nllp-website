'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Footer from '../components/Footer';
import { teamData } from '../lib/team-data';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const [activeService, setActiveService] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
        );
      }

      // 2. Philosophy Grid Scroll Animation
      if (philosophyRef.current) {
        const cards = philosophyRef.current.querySelectorAll('.philosophy-card');
        gsap.fromTo(cards, 
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: 'top 80%', // Triggers when top of section hits 80% down the viewport
            }
          }
        );
      }

      // 3. Services Section Horizontal Slide-In
      if (servicesRef.current) {
        const title = servicesRef.current.querySelector('.services-title');
        const listItems = servicesRef.current.querySelectorAll('.service-item');
        
        gsap.fromTo(title,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: servicesRef.current, start: 'top 75%' } }
        );

        gsap.fromTo(listItems,
          { opacity: 0, x: 50 },
          { 
            opacity: 1, x: 0, 
            duration: 1, 
            stagger: 0.15, 
            ease: 'power3.out', 
            scrollTrigger: { trigger: servicesRef.current, start: 'top 75%' }
          }
        );
      }

      // 4. Team Roster Stagger
      if (teamRef.current) {
        const members = teamRef.current.querySelectorAll('.team-member');
        gsap.fromTo(members,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 85%',
            }
          }
        );

        // Header Theme Inversion via ScrollTrigger (replicating ProjectsShowcaseVariant)
        ScrollTrigger.create({
          trigger: teamRef.current,
          start: 'top 80px', // When the section reaches the header
          end: 'bottom top', // Stop when the section scrolls off the top
          toggleClass: { targets: '#main-header', className: 'theme-dark-pill' },
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: "product",
      title: "Product Development",
      desc: "Full product design and engineering services. We build digital platforms, mobile applications, and data systems.",
      tools: ["Software Design", "Application Building", "Infrastructure Setup"]
    },
    {
      id: "teams",
      title: "Dedicated Teams",
      desc: "We place dedicated, scalable product teams directly into your venture to help you move faster.",
      tools: ["Team Building", "Project Management", "Quality Assurance"]
    },
    {
      id: "talent",
      title: "Specialist Talent",
      desc: "We find the exact right experts and researchers you need for highly specific technical projects.",
      tools: ["Research Collaboration", "Targeted Recruitment", "Talent Sourcing"]
    }
  ];

  return (
    <main ref={containerRef} className="bg-[#0c0d0c] min-h-screen text-[#e1e3de] pt-32 selection:bg-emerald-400/30 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-24 pb-32 max-w-7xl mx-auto">
        <div ref={heroRef}>
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-[1px] bg-emerald-400" />
            <h4 className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.3em]">About OGV/NLLP</h4>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] tracking-tighter text-[#e1e3de] mb-12">
            Venture <br/>
            <span className="italic font-light opacity-80">Studio.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <p className="font-sans text-xl md:text-2xl font-light text-[#e1e3de]/80 leading-relaxed max-w-2xl">
              OGV/NLLP is a private, independent product development partner. We focus on building and scaling new ventures through clear, simple, and reliable processes.
            </p>
            <p className="font-sans text-base md:text-lg text-[#e1e3de]/50 font-light leading-relaxed max-w-xl">
              By working in focused, 30-day blocks, we offer predictable costs and transparent work, making sure our partners around the world always know what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY GRID */}
      <section ref={philosophyRef} className="w-full bg-[#111211] border-y border-[#e1e3de]/10 py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-3xl md:text-5xl text-[#e1e3de] mb-16 overflow-hidden">
            <span className="block inline-block">Our Approach</span>
          </h3>
          
          <div className="grid grid-cols-1 select-none md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="philosophy-card p-10 border border-[#e1e3de]/10 rounded-3xl bg-[#0c0d0c]/50 hover:bg-[#e1e3de]/[0.02] transition-colors group">
              <span className="font-mono text-emerald-400 text-sm mb-6 block">01</span>
              <h4 className="font-serif text-2xl text-white mb-4 group-hover:-translate-y-1 transition-transform">Clear Options</h4>
              <p className="font-sans text-[#e1e3de]/60 font-light leading-relaxed">
                Everything we do is itemized for you. You select only the exact help you need, keeping the whole process totally transparent.
              </p>
            </div>
            
            {/* Box 2 */}
            <div className="philosophy-card p-10 border border-[#e1e3de]/10 rounded-3xl bg-[#0c0d0c]/50 hover:bg-[#e1e3de]/[0.02] transition-colors group">
              <span className="font-mono text-emerald-400 text-sm mb-6 block">02</span>
              <h4 className="font-serif text-2xl text-white mb-4 group-hover:-translate-y-1 transition-transform">Focused Cycles</h4>
              <p className="font-sans text-[#e1e3de]/60 font-light leading-relaxed">
                We work in clear, 30-day blocks of focused time. You can adjust your needs or stop at any point without being locked into long contracts.
              </p>
            </div>
            
            {/* Box 3 */}
            <div className="philosophy-card p-10 border border-[#e1e3de]/10 rounded-3xl bg-[#0c0d0c]/50 hover:bg-[#e1e3de]/[0.02] transition-colors group">
              <span className="font-mono text-emerald-400 text-sm mb-6 block">03</span>
              <h4 className="font-serif text-2xl text-white mb-4 group-hover:-translate-y-1 transition-transform">Full Ownership</h4>
              <p className="font-sans text-[#e1e3de]/60 font-light leading-relaxed">
                The product belongs to you. You receive 100% of all the code, designs, and intellectual property we build for your venture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE OFFERINGS (Interactive Accordion) */}
      <section ref={servicesRef} className="w-full py-32 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Sticky Meta Header */}
          <div className="lg:w-1/3 services-title">
            <div className="sticky top-32">
              <h3 className="font-serif text-4xl md:text-5xl text-[#e1e3de] mb-6 tracking-tight">What We<br/>Do.</h3>
              <p className="font-sans text-[#e1e3de]/50 font-light leading-relaxed mb-8">
                We combine deep expertise with steady, reliable work to help bring complex products to life.
              </p>
            </div>
          </div>

          {/* Service Accordion */}
          <div className="lg:w-2/3 border-t border-[#e1e3de]/20">
            {services.map((svc, index) => {
              const isActive = activeService === index;
              return (
                <div key={svc.id} className="service-item border-b border-[#e1e3de]/10">
                  <button 
                    onClick={() => setActiveService(isActive ? null : index)}
                    className="w-full flex items-center justify-between py-10 text-left group"
                  >
                    <h4 className="font-serif text-2xl md:text-3xl text-white group-hover:text-emerald-400 transition-colors">
                      {svc.title}
                    </h4>
                    <span className="relative w-6 h-6 flex items-center justify-center">
                      <span className="absolute w-full h-[2px] bg-[#e1e3de]/50" />
                      <span className={`absolute w-[2px] h-full bg-[#e1e3de]/50 transition-transform duration-500 origin-center ${isActive ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                    </span>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
                    <p className="font-sans text-lg text-[#e1e3de]/70 font-light leading-relaxed max-w-2xl mb-8">
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {svc.tools.map(tool => (
                        <span key={tool} className="px-4 py-2 bg-[#e1e3de]/5 rounded-sm font-mono text-[9px] uppercase tracking-widest text-[#e1e3de]/50">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. THE TEAM ROSTER */}
      <section ref={teamRef} className="w-full bg-[#e1e3de] text-[#0c0d0c] py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto border-t border-[#0c0d0c]/10 pt-32">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 overflow-hidden">
            <div>
               <h3 className="font-serif text-5xl md:text-6xl text-[#0c0d0c] tracking-tight mb-4">The Team</h3>
               <p className="font-sans text-xl text-[#0c0d0c]/60 font-light">Our leadership.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
            {teamData.map((member) => (
              <div key={member.id} className="team-member group w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
                {/* Image Handle */}
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-[#0c0d0c]/5 rounded-sm">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                {/* Meta */}
                <div>
                  <h4 className="font-serif text-2xl text-[#0c0d0c] mb-1">{member.name}</h4>
                  <span className="block font-mono text-[10px] text-emerald-600 uppercase tracking-widest mb-4">
                    {member.role}
                  </span>
                  <p className="font-sans text-sm text-[#0c0d0c]/70 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}
