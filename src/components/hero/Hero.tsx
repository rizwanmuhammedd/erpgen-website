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

      // Staggered masked reveal for headline lines
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.hero-line-inner',
          { y: '105%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          highlightsRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.97, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo(
          '.hero-floating-card',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        );

      // Scroll-driven visual transition into subsequent section with multi-speed parallax
      gsap.to(visualRef.current, {
        y: 70,
        scale: 1.03,
        transformPerspective: 1200,
        rotateX: -3,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Floating chips lateral and vertical drift
      gsap.to('.hero-floating-card-left', {
        y: -60,
        x: -20,
        opacity: 0.25,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-floating-card-right', {
        y: -80,
        x: 20,
        opacity: 0.25,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Multi-speed editorial parallax on scroll: headline, paragraph, CTA
      gsap.to(headlineRef.current, {
        y: -45,
        opacity: 0.7,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(paragraphRef.current, {
        y: -25,
        opacity: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(ctaRef.current, {
        y: -15,
        opacity: 0.75,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] flex items-center pt-6 pb-16 lg:py-20 overflow-hidden bg-radial-brand-hero"
      aria-label="Hero Section"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs (approx 55% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7 text-left z-10">
            {/* Small Eyebrow Badge */}
            <div ref={eyebrowRef} className="inline-flex items-start">
              <Badge variant="brand" icon={<Sparkles className="w-3.5 h-3.5 text-[#17B681]" />}>
                ONE CONNECTED BUSINESS PLATFORM
              </Badge>
            </div>

            {/* Main Headline with Masked Staggered Reveals */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1B2D] tracking-tight leading-[1.1] font-heading"
            >
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line-inner inline-block">The modular ERP platform</span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line-inner inline-block">
                  for <span className="text-gradient-brand">modern business.</span>
                </span>
              </span>
            </h1>

            {/* Supporting Concise Marketing Copy */}
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg text-[#625D6B] font-normal leading-relaxed max-w-xl"
            >
              Unify your point of sale, customer billing, live inventory, and financial reporting into one synchronized workspace. Deploy standalone modules or combine them into a full enterprise suite.
            </p>

            {/* Primary & Secondary CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a href="#modules">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-md shadow-[#6D57A5]/20 hover:shadow-lg hover:shadow-[#6D57A5]/25"
                >
                  Explore Platform
                </Button>
              </a>
              <a href="#custom-config">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Sliders className="w-4 h-4 text-[#17B681]" />}
                  className="w-full sm:w-auto"
                >
                  Configure Solution
                </Button>
              </a>
            </div>

            {/* Supporting Visual Cues / Highlights */}
            <div
              ref={highlightsRef}
              className="pt-4 border-t border-[#E9E4F1] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-[#625D6B] font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>Invoice & POS Core Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>Zero Bloat — Modular by Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>Restaurant, Retail, Barbershop & Laundry Workflows</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Visual Frame (approx 45% / 5 cols) */}
          <div ref={visualRef} className="lg:col-span-5 z-10 w-full">
            <HeroProductVisual />
          </div>
        </div>
      </Container>
    </section>
  );
};

