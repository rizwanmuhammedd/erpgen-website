import React from 'react';
import { HeroVideoPlayer } from './HeroVideoPlayer';

/**
 * HeroProductVisual now renders the official ERPGen Hero Video Player.
 * Replaced the old static photo/DOM visual per Stage 3 specification.
 */
export const HeroProductVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <HeroVideoPlayer className={className} />;
};

export { HeroVideoPlayer };
