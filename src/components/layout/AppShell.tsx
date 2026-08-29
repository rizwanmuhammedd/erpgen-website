import React from 'react';
import { Navbar } from '../navigation/Navbar';
import { DesktopCursor } from '../ui/DesktopCursor';
import { SmoothScrollProvider } from './SmoothScrollProvider';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-white text-[#1F1B2D] relative selection:bg-[#6D57A5]/15 selection:text-[#6D57A5] overflow-hidden flex flex-col">
        {/* Refined Desktop Custom Pointer Treatment */}
        <DesktopCursor />

        {/* Subtle light ambient atmosphere (ERPGen Purple & Emerald subtle accents) */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#6D57A5]/[0.03] blur-[140px] rounded-full" />
          <div className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] bg-[#17B681]/[0.02] blur-[160px] rounded-full" />
          <div className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-[#6D57A5]/[0.025] blur-[130px] rounded-full" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        {/* Global Navbar */}
        <Navbar />

        {/* Main Page Area */}
        <main className="relative z-10 flex-grow pt-24 pb-16">
          {children}
        </main>
      </div>
    </SmoothScrollProvider>
  );
};
