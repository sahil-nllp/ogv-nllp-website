'use client';

import { useEffect, useState, useRef } from 'react';

const SMOOTHING = 0.15;
const POINTER_SCALE = 1.1;

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const isPointerRef = useRef(false);
  const isDarkRef = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasFinePointer && !hasHover) return;

    setActive(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], input, select, textarea, [data-cursor-pointer]');
      isPointerRef.current = !!interactive;
      isDarkRef.current = !!el.closest('[data-cursor-dark]');
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);

    const rafId = requestAnimationFrame(function tick() {
      const dot = dotRef.current;
      if (dot) {
        pos.current.x += (target.current.x - pos.current.x) * SMOOTHING;
        pos.current.y += (target.current.y - pos.current.y) * SMOOTHING;
        const scale = isPointerRef.current ? POINTER_SCALE : 1;
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${scale})`;
        dot.setAttribute('data-theme', isDarkRef.current ? 'dark' : 'light');
        dot.setAttribute('data-pointer', isPointerRef.current ? 'true' : 'false');
      }
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.classList.remove('custom-cursor-active');
      setActive(false);
    };
  }, []);

  // Pixel-art arrow: blocky NW-pointing arrow (each rect = 1 unit in 16x16 viewBox)
  const arrowPixels = [
    [0, 0], [1, 0], [0, 1], [1, 1], // tip
    [2, 2], [3, 3], [4, 4], [5, 5], // diagonal
    [6, 5], [7, 5], [8, 5], [9, 5], // base
    [5, 6], [6, 6], [7, 6], [8, 6],
  ];

  // Pixel-art hand: index finger up, rest of hand below (pointer cursor), fits 16x16
  const handPixels = [
    [5, 0], [6, 0], [7, 0],
    [5, 1], [6, 1], [7, 1],
    [6, 2], [7, 2],
    [5, 3], [6, 3], [7, 3], [8, 3],
    [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
    [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
  ];

  const renderPixels = (pixels: number[][], outline: boolean) =>
    pixels.map(([x, y], i) => (
      <rect
        key={i}
        x={x}
        y={y}
        width={1}
        height={1}
        className={outline ? 'cursor-pixel-outline' : 'cursor-pixel-fill'}
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={0.35}
      />
    ));

  return (
    <div
      ref={dotRef}
      className="custom-cursor-dot fixed left-0 top-0 z-9999 pointer-events-none will-change-transform"
      aria-hidden
      data-theme="light"
      data-pointer="false"
      style={{
        visibility: active ? 'visible' : 'hidden',
        opacity: active ? 1 : 0,
      }}
    >
      <div className="custom-cursor-inner relative w-6 h-6">
        {/* Arrow cursor (default) */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          shapeRendering="crispEdges"
          className="absolute inset-0 w-full h-full custom-cursor-arrow transition-opacity duration-100"
        >
          {renderPixels(arrowPixels, true)}
          {renderPixels(arrowPixels, false)}
        </svg>
        {/* Hand pointer (over links/buttons) */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          shapeRendering="crispEdges"
          className="absolute inset-0 w-full h-full custom-cursor-pointer transition-opacity duration-100"
        >
          {renderPixels(handPixels, true)}
          {renderPixels(handPixels, false)}
        </svg>
      </div>
    </div>
  );
}
