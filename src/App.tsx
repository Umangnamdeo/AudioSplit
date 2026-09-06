import React, { useState, useEffect } from 'react';
import ConverterTab from './components/ConverterTab';
import StemSplitterTab from './components/StemSplitterTab';
import BackgroundDoodles from './components/BackgroundDoodles';
import ThemeSelectionModal from './components/ThemeSelectionModal';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'converter' | 'splitter'>('converter');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Apply saved theme on initial load if it exists
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1320] text-slate-800 dark:text-slate-200 font-sans selection:bg-amber-500/30 relative flex flex-col">
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <BackgroundDoodles />
      
      {/* Navbar */}
      <nav className="w-full bg-white/90 dark:bg-[#0B1320]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#1E293B] sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Left: Logo & Nav Links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 120 100" className="w-8 h-auto shrink-0" fill="none" strokeWidth="9" strokeLinecap="butt">
                {/* Left Side */}
                <g className="text-slate-900 dark:text-white" stroke="currentColor">
                  <path d="M 5 50 C 35 50, 45 10, 57 10" />
                  <path d="M 5 64 C 35 64, 45 24, 57 24" />
                  <path d="M 5 78 C 35 78, 45 38, 57 38" />
                  <path d="M 5 92 C 35 92, 45 52, 57 52" />
                </g>
                {/* Right Side */}
                <path d="M 63 10 C 75 10, 85 50, 115 50" className="stroke-[#33373C] dark:stroke-[#646e7b]" />
                <path d="M 63 24 C 75 24, 85 64, 115 64" className="stroke-[#9D8570]" />
                <path d="M 63 38 C 75 38, 85 78, 115 78" className="stroke-[#303B53] dark:stroke-[#6d82b3]" />
                <path d="M 63 52 C 75 52, 85 92, 115 92" className="stroke-[#C69E58]" />
              </svg>
              <span className="font-extrabold text-lg tracking-[0.15em] text-slate-900 dark:text-white uppercase mt-0.5">
                AUDIOSPLIT
              </span>
            </div>
            
            <div className="hidden md:flex items-center h-16 pt-1">
              <button
                onClick={() => setActiveTab('converter')}
                className={`h-full px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'converter' ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                MP4 to MP3 Converter
              </button>
              <button
                onClick={() => setActiveTab('splitter')}
                className={`h-full px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'splitter' ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                AI Stem Splitter
              </button>
            </div>
          </div>

          {/* Right: Badge & Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Free & No Sign-In Needed</span>
            </div>
            <div className="w-px h-5 bg-slate-200 dark:bg-[#1E293B]"></div>
            <button 
              onClick={toggleTheme}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-2"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-12 relative z-10 flex-grow">
        
        {/* Hero Section */}
        <div className="text-center flex flex-col items-center">
          <svg viewBox="0 0 120 100" className="w-32 h-auto mb-6" fill="none" strokeWidth="9" strokeLinecap="butt">
            {/* Left Side */}
            <g className="text-slate-900 dark:text-white" stroke="currentColor">
              <path d="M 5 50 C 35 50, 45 10, 57 10" />
              <path d="M 5 64 C 35 64, 45 24, 57 24" />
              <path d="M 5 78 C 35 78, 45 38, 57 38" />
              <path d="M 5 92 C 35 92, 45 52, 57 52" />
            </g>
            {/* Right Side */}
            <path d="M 63 10 C 75 10, 85 50, 115 50" className="stroke-[#33373C] dark:stroke-[#646e7b]" />
            <path d="M 63 24 C 75 24, 85 64, 115 64" className="stroke-[#9D8570]" />
            <path d="M 63 38 C 75 38, 85 78, 115 78" className="stroke-[#303B53] dark:stroke-[#6d82b3]" />
            <path d="M 63 52 C 75 52, 85 92, 115 92" className="stroke-[#C69E58]" />
          </svg>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.2em] text-slate-900 dark:text-white uppercase mb-4">
            AUDIOSPLIT
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-2">
            Audio Extraction & Stem Separator
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            High-fidelity audio extraction and AI-powered stem separation in your browser.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#151E2E] rounded-2xl border border-slate-200 dark:border-[#1E293B] shadow-2xl overflow-hidden min-h-[500px]">
          {/* Card Header Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200 dark:border-[#1E293B]">
            <button
              onClick={() => setActiveTab('converter')}
              className={`py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'converter' 
                  ? 'text-amber-600 dark:text-amber-500 border-b-2 border-amber-600 dark:border-amber-500 bg-slate-50 dark:bg-white/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              MP4 to MP3
            </button>
            <button
              onClick={() => setActiveTab('splitter')}
              className={`py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 border-l border-slate-200 dark:border-[#1E293B] ${
                activeTab === 'splitter' 
                  ? 'text-amber-600 dark:text-amber-500 border-b-2 border-amber-600 dark:border-amber-500 bg-slate-50 dark:bg-white/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5v14M7 9v6M22 10v4M2 12h.01" />
              </svg>
              AI Stem Separator
            </button>
          </div>
          
          {/* Active Tab Content Container */}
          <div className="p-8">
            {activeTab === 'converter' && <ConverterTab />}
            {activeTab === 'splitter' && <StemSplitterTab />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-slate-200 dark:border-[#1E293B] bg-white/50 dark:bg-[#0B1320]/50 backdrop-blur-sm relative z-10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} AudioSplit. All rights reserved.
        </p>
      </footer>
      
      <ThemeSelectionModal />
    </div>
  );
}
