import React, { useEffect, useRef } from 'react';
import { revealMaskedLines, prefersReducedMotion } from '../../../lib/gsap';

export interface MaskedTextRevealProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  lineClassName?: string;
  triggerOnScroll?: boolean;
  stagger?: number;
  duration?: number;
  ease?: string;
  delay?: number;
}

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  lines,
  as: Tag = 'h2',
  className = '',
  lineClassName = '',
  triggerOnScroll = true,
  stagger = 0.1,
  duration = 0.85,
  ease = 'power4.out',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    const targets = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (targets.length === 0) return;

    const tween = revealMaskedLines(targets, {
      triggerElement: triggerOnScroll ? (containerRef.current as HTMLElement) : undefined,
      stagger,
      duration,
      ease,
      delay,
    });

    return () => {
      tween?.kill();
    };
  }, [stagger, duration, ease, delay, triggerOnScroll]);

  return (
    <Tag ref={containerRef as any} className={className}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block overflow-hidden leading-tight"
          style={{ paddingBottom: '0.08em' }}
        >
          <span
            ref={(el) => {
              lineRefs.current[idx] = el;
            }}
            className={`inline-block will-change-transform ${lineClassName}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};
