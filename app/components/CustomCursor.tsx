'use client';

import { useEffect, useState, useRef } from 'react';

const SMOOTHING = 0.15; // lower = smoother, higher = snappier (Figma-like)
const POINTER_SCALE = 1.4; // scale up over clickable elements

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const isPointerRef = useRef(false);
  const isDarkRef = useRef(false); // dark cursor over light-background sections
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
      // Sections with data-cursor-dark have light backgrounds → use dark cursor for contrast
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

  return (
    <div
      ref={dotRef}
      className="custom-cursor-dot fixed left-0 top-0 z-9999 pointer-events-none will-change-transform"
      aria-hidden
      data-theme="light"
      style={{
        visibility: active ? 'visible' : 'hidden',
        opacity: active ? 1 : 0,
      }}
    >
      {/* Light by default (for dark site bg); data-theme="dark" on light sections */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="custom-cursor-svg transition-colors duration-200"
      >
        <path
          d="M10 2v16M2 10h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
