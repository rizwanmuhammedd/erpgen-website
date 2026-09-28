import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sliders, CheckCircle2, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HeroVideoPlayer } from './HeroVideoPlayer';
import { Magnetic } from '../ui/motion/Magnetic';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const environmentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion()) {
      // Under reduced motion, guarantee all layers are immediately at resting coordinates
      gsap.set(
        [
          eyebrowRef.current,
          headlineRef.current,
          paragraphRef.current,
          ctaRef.current,
          visualRef.current,
          highlightsRef.current,
          '.hero-line-inner',
        ],
        { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, rotateY: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // ========================================================
      // 1. MASTER TIMELINE — CINEMATIC 6-LAYER OPENING SEQUENCE
      // ========================================================
      const masterTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Layer 1: Environment Activation (0.00s)
      masterTl.fromTo(
        environmentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
      )
        // Layer 2: Brand Eyebrow Badge (0.15s)
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -14, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          '-=0.85'
        )
        // Layer 3: Main Headline Line Masking (0.30s -> 0.55s)
        .fromTo(
          '.hero-line-inner',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
          '-=0.45'
        )
        // Layer 4: Supporting Copy (0.65s)
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' },
          '-=0.55'
        )
        // Layer 5: Action CTAs (0.85s)
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.3)' },
          '-=0.45'
        )
        // Layer 5b: Highlights Indicators (0.95s)
        .fromTo(
          highlightsRef.current?.children ? Array.from(highlightsRef.current.children) : [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        )
        // Layer 6: Video Player Settles into Position (1.05s)
        .fromTo(
          visualRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 28,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.75'
        );

      // ========================================================
      // 2. SCROLL-DRIVEN SPATIAL CONTINUITY (REVERSIBLE SCRUB)
      // ========================================================
      const scrollTriggerDefaults = {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      };

      // Subtle dimensional depth recession toward ERP Lite / Pro
      gsap.to(visualRef.current, {
        y: 35,
        scale: 0.98,
        opacity: 0.85,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerDefaults,
      });

      // Coordinated spatial recession for typography and CTAs
      gsap.to(headlineRef.current, {
        y: -35,
        opacity: 0.7,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerDefaults,
      });

      gsap.to(paragraphRef.current, {
        y: -22,
        opacity: 0.6,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerDefaults,
      });

      gsap.to(ctaRef.current, {
        y: -15,
        opacity: 0.75,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerDefaults,
      });

      // Spatial environment gradient glide
      gsap.to(environmentRef.current, {
        y: 50,
        opacity: 0.4,
        ease: 'power1.out',
        scrollTrigger: scrollTriggerDefaults,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100svh-5.5rem)] flex items-center pt-4 sm:pt-6 pb-12 sm:pb-16 lg:py-20 overflow-hidden bg-radial-brand-hero"
      aria-label="Hero Section"
    >
      {/* Layer 1: Ambient Spatial Environment */}
      <div
        ref={environmentRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform select-none"
        aria-hidden="true"
      >
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[450px] bg-[#6D57A5]/[0.045] blur-[140px] rounded-full" />
        <div className="absolute top-[40%] -right-[12%] w-[550px] h-[550px] bg-[#17B681]/[0.035] blur-[150px] rounded-full" />
        <div className="absolute bottom-[5%] -left-[10%] w-[500px] h-[500px] bg-[#6D57A5]/[0.03] blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      <Container size="xl" className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Copy & CTAs (approx 55% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6 text-start z-10">
            {/* Layer 2: Small Eyebrow Badge */}
            <div ref={eyebrowRef} className="inline-flex items-start will-change-transform">
              <Badge variant="brand" icon={<Sparkles className="w-3.5 h-3.5 text-[#17B681]" />}>
                {t('hero.eyebrow')}
              </Badge>
            </div>

            {/* Layer 3: Main Headline with Line Masking */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1B2D] tracking-tight leading-[1.1] font-heading will-change-transform"
            >
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line-inner inline-block will-change-transform">
                  {t('hero.titleLine1')}
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line-inner inline-block will-change-transform">
                  <span className="text-gradient-brand">{t('hero.titleLine2')}</span>
                </span>
              </span>
            </h1>

            {/* Layer 4: Supporting Copy */}
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg text-[#625D6B] font-normal leading-relaxed max-w-xl text-start will-change-transform"
            >
              {t('hero.subheadline')}
            </p>

            {/* Layer 5: Action CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1 will-change-transform"
            >
              <Magnetic pullFactor={0.12} maxDistancePx={5}>
                <a href="#erp-tiers" className="inline-block w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform" />}
                    className="w-full sm:w-auto shadow-md shadow-[#6D57A5]/20 hover:shadow-lg hover:shadow-[#6D57A5]/25"
                  >
                    {t('hero.ctaPrimary')}
                  </Button>
                </a>
              </Magnetic>

              <a href="#contact" className="inline-block w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Sliders className="w-4 h-4 text-[#17B681]" />}
                  className="w-full sm:w-auto"
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </a>
            </div>

            {/* Layer 5b: Supporting Operational Cues */}
            <div
              ref={highlightsRef}
              className="pt-4 border-t border-[#E9E4F1] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-[#625D6B] font-medium will-change-transform"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>{t('hero.highlight1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>{t('hero.highlight2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span>{t('hero.highlight3')}</span>
              </div>
            </div>
          </div>

          {/* Layer 6: Right Column Video Player Stage */}
          <div ref={visualRef} className="lg:col-span-5 z-10 w-full will-change-transform">
            <HeroVideoPlayer />
          </div>
        </div>
      </Container>
    </section>
  );
};
