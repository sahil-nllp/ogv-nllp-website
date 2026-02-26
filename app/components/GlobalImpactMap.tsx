'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ComposableMap, Geographies, Geography, Marker, Line, Sphere } from 'react-simple-maps';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

// Free, highly detailed Topology JSON hosted by react-simple-maps creator
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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

export default function GlobalImpactMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(SVGPathElement | null)[]>([]);
  const dotsRef = useRef<(SVGGElement | null)[]>([]);
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !mapContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Setup timeline for when section enters
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", // Start drawing when the section is halfway up the screen
          end: "bottom center",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave back
        }
      });

      // 1. Initial Map Fade & Scale
      tl.fromTo(mapContainerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );

      // 2. Pulse Dots In
      tl.fromTo(dotsRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8, 
          stagger: { each: 0.05, from: "random" }, 
          ease: "back.out(1.7)" 
        },
        "-=0.5" // Overlap with map fade
      );

      // 3. Draw Connecting Lines (using stroke-dashoffset trick)
      linesRef.current.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        
        tl.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut"
        }, "-=0.2"); // Start drawing slightly after dots appear
      });

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
      <div className="relative z-20 w-full px-8 md:px-16 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          {/* <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#e1e3de]/60 group relative inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-[#e1e3de]/60" />
            Active Infrastructure
          </h2> */}
          <h3 className="font-serif text-4xl md:text-6xl text-[#e1e3de] tracking-tighter leading-[1.1]">
            <span className="italic font-light opacity-90">Deployed</span> <br />
            ecosystems.
          </h3>
        </div>
        <div className="max-w-xs text-right">
          <p className="font-sans text-xs md:text-sm text-[#e1e3de]/60 leading-relaxed">
            Our autonomous network nodes operate at the edge, ensuring zero-latency communication and unbreakable redundancy across continents.
          </p>
        </div>
      </div>

      {/* Interactive Map Container */}
      <div ref={mapContainerRef} className="relative w-full max-w-7xl mx-auto px-4 md:px-16 aspect-[2/1] md:aspect-[2.5/1]">
        
        {/* Hover Data Card (Absolutely Positioned Overlay) */}
        <div 
          className={clsx(
            "absolute z-30 pointer-events-none transition-all duration-300 ease-out",
            "bg-[#1a1b1a]/80 backdrop-blur-xl border border-[#e1e3de]/10 rounded-xl p-4 md:p-6 w-48 mx-auto left-0 right-0 top-1/2 -translate-y-1/2",
            "shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center text-center",
            hoveredNode ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          {hoveredNode && (
            <>
              <div className="w-2 h-2 rounded-full bg-[#fdf5cc] animate-pulse mb-3 shadow-[0_0_10px_#fdf5cc]" />
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#e1e3de]/60 mb-1">{hoveredNode.city}, {hoveredNode.country}</p>
              <h4 className="font-serif italic text-2xl text-[#e1e3de] mb-4">{hoveredNode.id === 'hq' ? 'Central Hub' : 'Node Active'}</h4>
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#e1e3de]/20 to-transparent mb-4" />
              
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#e1e3de]/40">{hoveredNode.metricTitle}</p>
              <p className="font-sans text-lg text-[#e1e3de]">{hoveredNode.metricValue}</p>
            </>
          )}
        </div>

        {/* The D3/Composable Map */}
        <ComposableMap
          projection="geoEqualEarth" // A beautiful oval globe projection that bounds the lines
          projectionConfig={{
            scale: 170,
            rotate: [-85, 0, 0], // Centered between the UK and New Zealand/Australia
            center: [0, 0] // Keep center 0,0 when using rotate for longitude shifting
          }}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Subtle Background Ocean Sphere to define the "World" boundary */}
          <Sphere 
            id="ocean-sphere"
            fill="#e1e3de" 
            fillOpacity={0.01} 
            stroke="#e1e3de" 
            strokeOpacity={0.05} 
            strokeWidth={1} 
          />

          {/* Base Countries */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a1b1a" // Dark charcoal land
                  stroke="#e1e3de" // Light oyster borders
                  strokeWidth={0.5}
                  strokeOpacity={0.15}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#212221" }, // Subtle lighter on hover
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Lines connecting HQ to Nodes */}
          {nodes.map((node, i) => (
            <Line
              key={`line-${node.id}`}
              from={HQ_COORDINATES}
              to={node.coordinates}
              stroke="#e1e3de"
              strokeWidth={1}
              strokeOpacity={0.3}
              /* 
                Creates a natural curved arc between coordinates instead of straight lines 
                using SVG path commands generated by react-simple-maps 
              */
              strokeLinecap="round"
              className="map-line drop-shadow-[0_0_8px_rgba(225,227,222,0.5)]"
              ref={(el) => { linesRef.current[i] = el; }}
            />
          ))}

          {/* The Glowing Nodes (Markers) */}
          {[...nodes, { id: 'hq', city: 'Sydney', country: 'Australia', coordinates: HQ_COORDINATES, metricTitle: "Core Routing", metricValue: "Active" }].map((node, i) => (
            <Marker 
              key={`marker-${node.id}`} 
              coordinates={node.coordinates}
              onMouseEnter={() => setHoveredNode(node as MapNode)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer group"
            >
              <g ref={(el) => { dotsRef.current[i] = el; }}>
                {/* Outer Glow Halo (Only visible on hover or if HQ) */}
                <circle 
                  cx={0} 
                  cy={0} 
                  r={8} 
                  fill={node.id === 'hq' ? "#fdf5cc" : "#e1e3de"} 
                  opacity={node.id === 'hq' ? 0.3 : 0} 
                  className={clsx(
                    "transition-opacity duration-300 pointer-events-none",
                    node.id !== 'hq' && "group-hover:opacity-40"
                  )}
                  style={{ filter: "blur(4px)" }}
                />
                {/* Inner Solid Dot */}
                <circle 
                  cx={0} 
                  cy={0} 
                  r={3} 
                  fill={node.id === 'hq' ? "#fdf5cc" : "#e1e3de"} 
                  stroke="#0c0d0c"
                  strokeWidth={1}
                />
              </g>
            </Marker>
          ))}
        </ComposableMap>

      </div>
    </section>
  );
}
