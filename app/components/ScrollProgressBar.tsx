'use client';

import { useEffect, useRef } from 'react';

const SMOOTHING = 0.12; // lower = smoother/slower, higher = snappier

export default function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const updateTarget = () => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current =
        scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
    };

    const tick = () => {
      const target = targetRef.current;
      let current = currentRef.current;
      current += (target - current) * SMOOTHING;
      currentRef.current = current;

      const fill = fillRef.current;
      if (fill) fill.style.width = `${current}%`;

      rafRef.current = requestAnimationFrame(tick);
    };

    updateTarget();
    currentRef.current = targetRef.current;
    if (fillRef.current) fillRef.current.style.width = `${targetRef.current}%`;

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-100 h-0.5 w-full bg-[#e1e3de]/10"
      aria-hidden
      role="presentation"
    >
      <div
        ref={fillRef}
        className="h-full bg-emerald-500/90 will-change-[width]"
        style={{ width: 0 }}
      />
    </div>
  );
}
