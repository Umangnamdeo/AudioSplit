import React from 'react';
import AudioSplitLogo from './AudioSplitLogo';

interface HeroProps {
  darkMode?: boolean;
}

export default function Hero({ darkMode = true }: HeroProps) {
  return (
    <div className="text-center mb-8 pt-2 flex flex-col items-center">
      {/* Featured Brand Logo */}
      <div className="mb-4">
        <AudioSplitLogo variant="mark" size="xl" darkTheme={darkMode} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.14em] uppercase mb-2 text-slate-900 dark:text-slate-50 font-sans transition-colors">
        AUDIOSPLIT
      </h1>
      
      <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 tracking-wide max-w-xl mx-auto mb-1 transition-colors">
        Audio Extraction & Stem Separator
      </p>

      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto transition-colors">
        High-fidelity audio extraction and AI-powered stem separation in your browser.
      </p>
    </div>
  );
}
