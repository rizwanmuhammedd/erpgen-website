import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { gsap, prefersReducedMotion, isTouchDevice } from '../../lib/gsap';
import { useLanguage } from '../../context/LanguageContext';

interface HeroVideoPlayerProps {
  className?: string;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { t } = useLanguage();

  // Handle video autoplay safely across all browser policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted and playsInline for automated playback policies
    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback; will play on first user interaction
      });
    }
  }, []);

  // Subtle interactive 3D perspective depth on desktop hover
  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    if (!container || !frame || typeof window === 'undefined') return;

    if (prefersReducedMotion() || isTouchDevice() || window.innerWidth < 1024) {
      return;
    }

    const rotateXTo = gsap.quickTo(frame, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    const rotateYTo = gsap.quickTo(frame, 'rotateY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(frame, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Ultra-subtle +/- 1.8 degree pitch and yaw for refined elegance
      const rotX = ((y - centerY) / centerY) * -1.8;
      const rotY = ((x - centerX) / centerX) * 1.8;

      rotateXTo(rotX);
      rotateYTo(rotY);
      yTo(-2);
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      yTo(0);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(frame, { rotateX: 0, rotateY: 0, y: 0 });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto lg:max-w-none group select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Layer 1: Ambient Spatial Glow Behind Frame */}
      <div
        className="hero-ambient-glow absolute -inset-3 bg-gradient-to-r from-[#6D57A5]/15 via-[#6D57A5]/5 to-[#17B681]/15 rounded-[32px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Layer 2: Main Application Window & Video Canvas Frame */}
      <div
        ref={frameRef}
        className="hero-frame-card relative rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-2xl shadow-[#6D57A5]/12 overflow-hidden will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* macOS Style Window Titlebar */}
        <div className="relative z-10 flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/35 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/45 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/25 inline-block" />
            </div>
            <div className="h-3.5 w-px bg-[#E9E4F1] mx-1 hidden sm:block" />
            <span className="text-[#625D6B] font-mono text-[11px] hidden sm:inline-block">
              erpgen.cloud / platform-overview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              {t('heroVisual.syncActive') || 'Live Overview'}
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#6D57A5]" />
          </div>
        </div>

        {/* Video Canvas Container (Guarantees exact 16:9 aspect ratio with zero layout shift) */}
        <div className="relative w-full aspect-video bg-[#FAF8FC] overflow-hidden flex items-center justify-center">
          {/* Shimmer loading placeholder before first frame renders */}
          {!isVideoLoaded && (
            <div
              className="absolute inset-0 bg-[#FAF8FC] flex items-center justify-center transition-opacity duration-300 z-0"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#6D57A5] animate-pulse">
                <Sparkles className="w-4 h-4 text-[#17B681]" />
                <span>Loading ERPGen Video...</span>
              </div>
            </div>
          )}

          {/* Primary HTML5 Video Asset */}
          <video
            ref={videoRef}
            src="/videos/ERPGen.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover block relative z-10 transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="ERPGen Platform Overview Video"
          />
        </div>
      </div>
    </div>
  );
};
