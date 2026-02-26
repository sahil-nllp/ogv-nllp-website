'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

// Dynamically import react-globe.gl to prevent SSR issues with WebGL/Three.js
// By casting the default export to any, we bypass IntrinsicAttributes TypeScript errors for missing types
const Globe = dynamic(() => import('react-globe.gl').then((mod) => mod.default as any), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

interface MapNode {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [Longitude, Latitude]
  metricTitle: string;
  metricValue: string;
}

// OGV NLLP "HQ" - Central Hub
const HQ_COORDINATES: [number, number] = [151.2093, -33.8688]; // Sydney

const nodes: MapNode[] = [
  { id: "nz", city: "Auckland", country: "New Zealand", coordinates: [174.7633, -36.8485], metricTitle: "Data Processed", metricValue: "42 PB/s" },
  { id: "in", city: "Mumbai", country: "India", coordinates: [72.8777, 19.0760], metricTitle: "Latency", metricValue: "<4ms" },
  { id: "ae", city: "Dubai", country: "UAE", coordinates: [55.2708, 25.2048], metricTitle: "Uptime", metricValue: "99.999%" },
  { id: "uk", city: "London", country: "UK", coordinates: [-0.1276, 51.5072], metricTitle: "Redundancy", metricValue: "Tier IV" }
];

const hqNode: MapNode = { 
  id: 'hq', 
  city: 'Sydney', 
  country: 'Australia', 
  coordinates: HQ_COORDINATES, 
  metricTitle: "Core Routing", 
  metricValue: "Active" 
};

const allPoints = [...nodes, hqNode];

export default function GlobalImpactMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle responsive resize for the WebGL Canvas
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Set initial camera rotation to focus on Sydney
  useEffect(() => {
    if (globeRef.current) {
      // Point camera roughly at the Indian Ocean to center the arcs (Sydney to London)
      globeRef.current.pointOfView({ lat: 10, lng: 85, altitude: 1.5 }, 0);
      
      // Setup auto-rotate and clamp zoom distances
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.controls().minDistance = 220; // Prevent over-zooming into the planet surface
      globeRef.current.controls().maxDistance = 350; // Cannot zoom further out than this
    }
  }, [globeRef.current]);

  // Section intro animation
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 bg-[#0c0d0c] overflow-hidden flex flex-col items-center z-10"
      id="global-impact"
    >
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#e1e3de]/[0.02] blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-20 w-full px-8 md:px-16 mb-8 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#e1e3de]/60 flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-[#e1e3de]/60" />
            Active Infrastructure
          </span>
          <h3 className="font-serif text-4xl md:text-6xl text-[#e1e3de] tracking-tighter leading-[1.1]">
            <span className="italic font-light opacity-90">Deployed</span> <br />
            ecosystems.
          </h3>
        </div>
        <div className="max-w-xs text-right">
          <p className="font-sans text-xs md:text-sm text-[#e1e3de]/60 leading-relaxed mb-4">
            Our autonomous network nodes operate at the edge, ensuring zero-latency communication across continents.
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#fdf5cc]/60 animate-pulse">
            [ Interactive: Rotate to inspect nodes ]
          </p>
        </div>
      </div>

      {/* Interactive 3D Map Container */}
      <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center">
        
        {/* Fixed Telemetry Overlay (Displays hovered node data) */}
        <div 
          className={clsx(
            "absolute z-30 pointer-events-none transition-all duration-300 ease-out",
            "bottom-8 left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-16",
            "bg-[#1a1b1a]/80 backdrop-blur-xl border border-[#e1e3de]/10 rounded-xl p-6 w-56",
            "shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-start",
            hoveredNode ? "opacity-100 translate-y-0 md:translate-x-0" : "opacity-0 translate-y-4 md:translate-y-0 md:-translate-x-4"
          )}
        >
          {hoveredNode && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#fdf5cc] animate-pulse shadow-[0_0_10px_#fdf5cc]" />
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#e1e3de]/60">
                   {hoveredNode.city}, {hoveredNode.country}
                </p>
              </div>
              <h4 className="font-serif italic text-2xl text-[#e1e3de] mb-4 leading-none">
                {hoveredNode.id === 'hq' ? 'Central Hub' : 'Node Active'}
              </h4>
              
              <div className="w-full h-[1px] bg-gradient-to-r from-[#e1e3de]/20 to-transparent mb-4" />
              
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#e1e3de]/40 block mb-1">
                {hoveredNode.metricTitle}
              </p>
              <p className="font-sans text-xl text-[#e1e3de] font-light tracking-tight">
                {hoveredNode.metricValue}
              </p>
            </>
          )}
        </div>

        {/* The 3D WebGL Globe Container */}
        <div ref={containerRef} className="relative w-full aspect-square md:aspect-[2/1] cursor-grab active:cursor-grabbing">
          {dimensions.width > 0 && typeof window !== 'undefined' && (
            <Globe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              
              // Base Globe Styling
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)" // Transparent background
              showAtmosphere={false}
              atmosphereColor="#e1e3de"
              atmosphereAltitude={0.15}
              
              // Pulsing Rings (Nodes)
              ringsData={allPoints}
              ringLat={(d: any) => d.coordinates[1]}
              ringLng={(d: any) => d.coordinates[0]}
              ringColor={() => (t: number) => `rgba(225,227,222,${1-t})`}
              ringMaxRadius={(d: any) => d.id === 'hq' ? 8 : 4}
              ringPropagationSpeed={2}
              ringRepeatPeriod={800}

              // Connected Arcs (from HQ to everywhere else)
              arcsData={nodes}
              arcStartLat={HQ_COORDINATES[1]}
              arcStartLng={HQ_COORDINATES[0]}
              arcEndLat={(d: any) => d.coordinates[1]}
              arcEndLng={(d: any) => d.coordinates[0]}
              arcColor={() => '#e1e3de'}
              arcAltitudeAutoScale={0.4}
              arcStroke={0.5}
              arcDashLength={0.4}
              arcDashGap={0.2}
              arcDashAnimateTime={2000} // Flowing particles along lines!

              // Interactivity
              onGlobeClick={() => {
                // Resume rotation if clicked
                if (globeRef.current) {
                  globeRef.current.controls().autoRotate = true;
                }
              }}
              // Interaction Points (invisible larger radius for easier hovering)
              pointsData={allPoints}
              pointLat={(d: any) => d.coordinates[1]}
              pointLng={(d: any) => d.coordinates[0]}
              pointColor={() => 'rgba(255,255,255,0)'} // Transparent, only for hit detection
              pointRadius={1.5}
              onPointHover={(point: any) => {
                setHoveredNode(point as MapNode || null);
                // Pause rotation on hover
                if (globeRef.current) {
                  globeRef.current.controls().autoRotate = !point;
                }
              }}
            />
          )}
        </div>

      </div>
    </section>
  );
}
