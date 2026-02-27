'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArticleVisualizerProps {
  children: ReactNode;
}

export default function ArticleVisualizer({ children }: ArticleVisualizerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. Image Entrance Animation
      const coverImage = wrapperRef.current?.querySelector('.image-parallax-target');
      if (coverImage) {
         gsap.fromTo(coverImage.parentElement,
           { opacity: 0, x: -40 },
           { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' }
         );

      }

      // 3. Headline and Excerpt Entrance
      const headline = wrapperRef.current?.querySelector('.split-headline');
      const excerpt = wrapperRef.current?.querySelector('.split-excerpt');
      
      if (headline && excerpt) {
         gsap.fromTo([headline, excerpt],
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
         );
      }

      // 4. Content Body Fade up
      const contentBody = wrapperRef.current?.querySelector('.article-content');
      if (contentBody) {
         gsap.fromTo(contentBody,
           { opacity: 0, y: 40 },
           { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
             scrollTrigger: {
               trigger: contentBody,
               start: "top 85%",
               toggleActions: "play none none reverse",
             }
           }
         );
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef} className="w-full">{children}</div>;
}
