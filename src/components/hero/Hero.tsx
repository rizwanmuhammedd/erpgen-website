import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sliders, CheckCircle2, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HeroProductVisual } from './HeroProductVisual';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          highlightsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          '.hero-floating-card',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-16 lg:py-20 overflow-hidden bg-radial-brand-hero"
      aria-label="Hero Section"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs (approx 55% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-left z-10">
            {/* Small Eyebrow Badge */}
            <div ref={eyebrowRef} className="inline-flex items-start">
              <Badge variant="brand" icon={<Sparkles className="w-3.5 h-3.5 text-[#17B681]" />}>
                Modular Business Management
              </Badge>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1B2D] tracking-tight leading-[1.12] font-heading"
            >
              ERP that{' '}
              <span className="text-gradient-brand block sm:inline">
                fits the way you work.
              </span>
            </h1>

            {/* Supporting Concise Marketing Copy */}
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg lg:text-xl text-[#625D6B] font-normal leading-relaxed max-w-2xl"
            >
              ERPGen brings the tools your business needs into one flexible platform. Choose standalone Invoice, high-speed POS, or configure a combined solution around your exact business requirements.
            </p>

            {/* Primary & Secondary CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a href="#modules">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Explore ERPGen
                </Button>
              </a>
              <a href="#custom-config">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Sliders className="w-5 h-5 text-[#17B681]" />}
                  className="w-full sm:w-auto"
                >
                  See how it works
                </Button>
              </a>
            </div>

            {/* Supporting Visual Cues / Highlights */}
            <div
              ref={highlightsRef}
              className="pt-4 border-t border-[#E9E4F1] flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#625D6B] font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>Invoice & POS Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>Custom Subscription Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>Restaurant, Barbershop, Supermarket & Laundry Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Visual Frame (approx 45% / 5 cols) */}
          <div ref={visualRef} className="lg:col-span-5 z-10 w-full">
            <HeroProductVisual imageSrc="/images/erpgen-app-preview.jpg" />
          </div>
        </div>
      </Container>
    </section>
  );
};
