import React from 'react';

interface AudioSplitLogoProps {
  className?: string;
  variant?: 'mark' | 'horizontal' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkTheme?: boolean;
}

export default function AudioSplitLogo({
  className = '',
  variant = 'horizontal',
  size = 'md',
  darkTheme = true
}: AudioSplitLogoProps) {
  // Color configuration
  // On dark mode: Left bands are crisp white/slate-100 so they pop on dark backgrounds
  // In light mode: Left bands are deep black/charcoal as in the original logo
  const leftColor = darkTheme ? 'currentColor' : '#111827';
  const stem1Color = darkTheme ? '#94a3b8' : '#33373F'; // Charcoal / light slate
  const stem2Color = '#948375'; // Warm Sand / Taupe
  const stem3Color = darkTheme ? '#4f6d9c' : '#2A3A54'; // Navy / Cobalt stem
  const stem4Color = '#C59B4C'; // Golden Ochre stem

  // Dimension presets for the emblem
  const dimensions = {
    sm: { width: 32, height: 20 },
    md: { width: 44, height: 26 },
    lg: { width: 64, height: 38 },
    xl: { width: 180, height: 104 }
  }[size];

  const renderEmblem = (w: number, h: number) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
    >
      {/* LEFT SIDE: 3 Ascending Wave Stems */}
      {/* Left Top Band */}
      <path
        d="M 120 138 C 170 138, 192 88, 206 18 L 206 38 C 194 98, 172 150, 120 150 Z"
        fill={leftColor}
      />
      {/* Left Middle Band */}
      <path
        d="M 90 158 C 150 158, 180 118, 206 58 L 206 78 C 182 128, 152 170, 90 170 Z"
        fill={leftColor}
      />
      {/* Left Bottom Band */}
      <path
        d="M 60 178 C 130 178, 170 148, 206 98 L 206 118 C 172 158, 132 190, 60 190 Z"
        fill={leftColor}
      />

      {/* RIGHT SIDE: 4 Descending Separated Stems */}
      {/* Stem 1: Charcoal / Slate (Vocals) */}
      <path
        d="M 214 18 C 228 88, 250 138, 300 138 L 300 150 C 248 150, 226 98, 214 38 Z"
        fill={stem1Color}
      />
      {/* Stem 2: Warm Sand / Taupe (Guitar) */}
      <path
        d="M 214 58 C 240 118, 270 158, 330 158 L 330 170 C 268 170, 238 128, 214 78 Z"
        fill={stem2Color}
      />
      {/* Stem 3: Navy Slate (Drums) */}
      <path
        d="M 214 98 C 250 148, 290 178, 360 178 L 360 190 C 288 190, 248 158, 214 118 Z"
        fill={stem3Color}
      />
      {/* Stem 4: Warm Gold / Amber (Bass) */}
      <path
        d="M 214 138 C 260 178, 300 198, 390 198 L 390 210 C 298 210, 258 188, 214 158 Z"
        fill={stem4Color}
      />
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem(dimensions.width, dimensions.height)}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {renderEmblem(dimensions.width, dimensions.height)}
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-900 dark:text-slate-50 font-sans">
            AUDIOSPLIT
          </span>
        </div>
      </div>
    );
  }

  // Full variant: Centered emblem with large title & subtitle
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="mb-4">
        {renderEmblem(dimensions.width, dimensions.height)}
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[0.18em] uppercase text-slate-900 dark:text-slate-50 font-sans mb-1.5">
        AUDIOSPLIT
      </h2>
      <p className="text-xs sm:text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
        Audio Extraction & Stem Separator
      </p>
    </div>
  );
}
