import React from 'react';
import { SixAreasStorytellingSection } from './SixAreasStorytellingSection';

/**
 * WhatIsERPGenSection now delegates to the cinematic pinned SixAreasStorytellingSection.
 * Maintained for backward compatibility and clean modular imports.
 */
export const WhatIsERPGenSection: React.FC = () => {
  return <SixAreasStorytellingSection />;
};

export { SixAreasStorytellingSection };
