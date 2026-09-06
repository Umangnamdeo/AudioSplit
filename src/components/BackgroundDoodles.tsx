import React from 'react';

export default function BackgroundDoodles() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* --- Top Left: Retro Cassette Tape & Sound Wave Doodles --- */}
      <div className="absolute -top-4 left-6 lg:left-16 animate-float-slow opacity-25 dark:opacity-20 text-amber-500/80 dark:text-amber-400/70">
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Cassette Body */}
          <rect x="10" y="10" width="100" height="65" rx="8" />
          <rect x="22" y="22" width="76" height="35" rx="4" strokeDasharray="3 3" />
          {/* Spools */}
          <circle cx="42" cy="39" r="9" />
          <circle cx="42" cy="39" r="4" fill="currentColor" fillOpacity="0.4" />
          <circle cx="78" cy="39" r="9" />
          <circle cx="78" cy="39" r="4" fill="currentColor" fillOpacity="0.4" />
          {/* Tape bridge */}
          <path d="M42 48 L78 48" />
          <path d="M28 75 L38 62 L82 62 L92 75" />
          {/* Decorative doodle scribbles */}
          <path d="M12 4 L22 0" />
          <path d="M98 4 L108 0" />
        </svg>
      </div>

      {/* Top Left Floating Musical Notes */}
      <div className="absolute top-28 left-2 sm:left-8 animate-float-reverse opacity-30 dark:opacity-25 text-slate-600 dark:text-amber-500/60">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Double beam musical note */}
          <ellipse cx="18" cy="46" rx="6" ry="4" transform="rotate(-20 18 46)" fill="currentColor" />
          <ellipse cx="44" cy="38" rx="6" ry="4" transform="rotate(-20 44 38)" fill="currentColor" />
          <path d="M23 44 L23 16 L49 10 L49 36" />
          <path d="M23 23 L49 17" />
        </svg>
      </div>

      {/* --- Top Right: Studio Headphones Doodle & Audio Sparkles --- */}
      <div className="absolute top-10 right-8 lg:right-20 animate-float-slow opacity-25 dark:opacity-20 text-amber-600/80 dark:text-amber-400/70">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Headband arch */}
          <path d="M22 65 C20 30, 90 30, 88 65" />
          <path d="M30 65 C28 38, 82 38, 80 65" strokeDasharray="4 3" />
          {/* Left Earcup */}
          <rect x="14" y="62" width="16" height="28" rx="8" />
          <path d="M10 70 C8 72, 8 82, 10 84" />
          {/* Right Earcup */}
          <rect x="80" y="62" width="16" height="28" rx="8" />
          <path d="M100 70 C102 72, 102 82, 100 84" />
          {/* Sound waves emitted */}
          <path d="M102 55 C108 62, 108 78, 102 85" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M8 55 C2 62, 2 78, 8 85" strokeWidth="1.8" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Top Right Sparkles & Star doodle */}
      <div className="absolute top-36 right-4 sm:right-12 animate-float-reverse opacity-35 dark:opacity-30 text-amber-500">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {/* 4-point sparkle star */}
          <path d="M22 4 C22 14, 31 22, 41 22 C31 22, 22 30, 22 40 C22 30, 13 22, 3 22 C13 22, 22 14, 22 4 Z" fill="currentColor" fillOpacity="0.25" />
          {/* Mini accent dots */}
          <circle cx="36" cy="10" r="1.5" fill="currentColor" />
          <circle cx="8" cy="34" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* --- Mid-Left: Spinning Vinyl Record Doodle --- */}
      <div className="absolute top-1/3 -left-10 lg:left-4 animate-spin-very-slow opacity-20 dark:opacity-15 text-slate-700 dark:text-amber-500/50 hidden sm:block">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {/* Outer Vinyl ring */}
          <circle cx="75" cy="75" r="70" />
          {/* Grooves */}
          <circle cx="75" cy="75" r="60" strokeDasharray="7 5" />
          <circle cx="75" cy="75" r="50" strokeDasharray="12 6" />
          <circle cx="75" cy="75" r="40" strokeDasharray="8 4" />
          {/* Center Label */}
          <circle cx="75" cy="75" r="26" fill="currentColor" fillOpacity="0.2" />
          <circle cx="75" cy="75" r="24" strokeWidth="2" />
          <circle cx="75" cy="75" r="5" fill="currentColor" />
        </svg>
      </div>

      {/* --- Mid-Left Sound Wave Doodle --- */}
      <div className="absolute top-1/2 left-2 sm:left-12 animate-float-slow opacity-30 dark:opacity-25 text-amber-600/70 dark:text-amber-400/60 hidden md:block">
        <svg width="90" height="50" viewBox="0 0 90 50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Sine waveform */}
          <path d="M5 25 Q15 2 25 25 T45 25 T65 25 T85 25" />
          {/* Accent frequency bars */}
          <line x1="18" y1="36" x2="18" y2="44" strokeWidth="2.5" />
          <line x1="30" y1="33" x2="30" y2="47" strokeWidth="2.5" />
          <line x1="42" y1="30" x2="42" y2="50" strokeWidth="2.5" />
          <line x1="54" y1="35" x2="54" y2="45" strokeWidth="2.5" />
          <line x1="66" y1="38" x2="66" y2="42" strokeWidth="2.5" />
        </svg>
      </div>

      {/* --- Mid-Right: Studio Mic & Sound Ripple Doodle --- */}
      <div className="absolute top-1/3 -right-6 lg:right-8 animate-float-reverse opacity-25 dark:opacity-20 text-slate-700 dark:text-amber-400/60 hidden sm:block">
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Vintage Capsule Microphone */}
          <rect x="42" y="15" width="34" height="52" rx="17" />
          {/* Grille mesh */}
          <line x1="42" y1="32" x2="76" y2="32" />
          <line x1="42" y1="42" x2="76" y2="42" />
          <line x1="52" y1="15" x2="52" y2="50" strokeDasharray="3 2" />
          <line x1="66" y1="15" x2="66" y2="50" strokeDasharray="3 2" />
          {/* U-Shape Cradle */}
          <path d="M32 40 C32 72, 86 72, 86 40" strokeWidth="2.5" />
          {/* Stem & Stand */}
          <line x1="59" y1="72" x2="59" y2="105" strokeWidth="3" />
          <path d="M36 112 C44 105, 74 105, 82 112" strokeWidth="3" />
          {/* Sound waves emitted */}
          <path d="M88 20 C96 26, 96 46, 88 52" strokeWidth="1.8" />
          <path d="M96 14 C108 24, 108 54, 96 64" strokeWidth="1.8" strokeDasharray="4 3" />
        </svg>
      </div>

      {/* --- Mid-Right Equalizer Sliders Doodle --- */}
      <div className="absolute top-2/3 right-4 lg:right-16 animate-float-slow opacity-25 dark:opacity-20 text-amber-500/70 dark:text-amber-400/60 hidden md:block">
        <svg width="80" height="90" viewBox="0 0 80 90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {/* Fader tracks */}
          <line x1="20" y1="12" x2="20" y2="78" />
          <line x1="42" y1="12" x2="42" y2="78" />
          <line x1="64" y1="12" x2="64" y2="78" />
          {/* Fader Knobs */}
          <rect x="13" y="30" width="14" height="10" rx="3" fill="currentColor" fillOpacity="0.4" />
          <rect x="35" y="48" width="14" height="10" rx="3" fill="currentColor" fillOpacity="0.4" />
          <rect x="57" y="24" width="14" height="10" rx="3" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      {/* --- Bottom Left: Treble Clef & Eighth Note Doodles --- */}
      <div className="absolute bottom-20 left-4 sm:left-14 animate-float-slow opacity-30 dark:opacity-25 text-amber-600/70 dark:text-amber-500/60">
        <svg width="70" height="90" viewBox="0 0 70 90" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Stylized Treble Clef Doodle */}
          <path d="M35 10 C35 3, 27 5, 27 15 C27 25, 48 30, 48 45 C48 60, 22 68, 22 52 C22 38, 42 38, 42 54 C42 62, 33 64, 30 58 C28 54, 31 50, 35 50" />
          <line x1="35" y1="6" x2="35" y2="78" />
          <circle cx="31" cy="78" r="4" fill="currentColor" />
          {/* Sparkle mark */}
          <path d="M52 18 L56 22 M56 18 L52 22" strokeWidth="1.8" />
        </svg>
      </div>

      {/* --- Bottom Center-Left: Speaker Cone Pulse Doodle --- */}
      <div className="absolute bottom-6 left-1/4 animate-float-reverse opacity-20 dark:opacity-15 text-slate-700 dark:text-amber-400/50 hidden lg:block">
        <svg width="85" height="65" viewBox="0 0 85 65" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Megaphone / acoustic speaker cone */}
          <path d="M12 25 L24 25 L46 12 L46 52 L24 39 L12 39 Z" />
          <circle cx="46" cy="32" r="6" />
          {/* Sound wave arcs */}
          <path d="M54 22 C59 27, 59 37, 54 42" strokeWidth="2.2" />
          <path d="M63 15 C72 23, 72 41, 63 49" strokeWidth="2.2" strokeDasharray="3 3" />
          <path d="M72 8 C84 20, 84 44, 72 56" strokeWidth="2" />
        </svg>
      </div>

      {/* --- Bottom Right: Dial Knob & Single Quarter Note --- */}
      <div className="absolute bottom-16 right-6 sm:right-16 animate-float-reverse opacity-25 dark:opacity-20 text-amber-500/70 dark:text-amber-400/60">
        <svg width="90" height="85" viewBox="0 0 90 85" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Rotary Volume Dial */}
          <circle cx="34" cy="48" r="22" />
          <circle cx="34" cy="48" r="16" strokeDasharray="4 3" />
          <line x1="34" y1="48" x2="44" y2="38" strokeWidth="3" />
          {/* Dial indicator ticks */}
          <line x1="16" y1="62" x2="12" y2="66" />
          <line x1="12" y1="48" x2="6" y2="48" />
          <line x1="16" y1="34" x2="12" y2="30" />
          <line x1="34" y1="26" x2="34" y2="20" />
          <line x1="52" y1="34" x2="56" y2="30" />
          <line x1="56" y1="48" x2="62" y2="48" />
          
          {/* Upright Quarter note floating off knob */}
          <ellipse cx="70" cy="30" rx="5" ry="3.5" transform="rotate(-25 70 30)" fill="currentColor" />
          <line x1="74" y1="28" x2="74" y2="8" strokeWidth="2.2" />
          <path d="M74 8 C78 12, 82 13, 84 15" strokeWidth="2" />
        </svg>
      </div>

      {/* Subtle Dot Grid Texture Overlay for ambient depth */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(currentColor 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
