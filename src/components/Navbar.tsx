import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import AudioSplitLogo from './AudioSplitLogo';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  activeTab: 'converter' | 'splitter';
  setActiveTab: (tab: 'converter' | 'splitter') => void;
}

export default function Navbar({ darkMode, setDarkMode, activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-8">
            {/* Logo & Brand */}
            <div 
              onClick={() => setActiveTab('converter')} 
              className="flex items-center gap-3 select-none cursor-pointer"
              title="AudioSplit Studio"
            >
              <AudioSplitLogo variant="mark" size="md" darkTheme={darkMode} />
              <span className="font-extrabold text-xl tracking-wider text-slate-900 dark:text-slate-50 font-sans">
                AUDIOSPLIT
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              <button
                onClick={() => setActiveTab('converter')}
                className={`transition-colors py-1 cursor-pointer font-semibold ${
                  activeTab === 'converter'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                MP4 to MP3 Converter
              </button>
              <button
                onClick={() => setActiveTab('splitter')}
                className={`transition-colors py-1 cursor-pointer font-semibold ${
                  activeTab === 'splitter'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                AI Stem Splitter
              </button>
            </div>
          </div>

          {/* Right Actions: 100% Login-Free Indicator & Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Sparkles size={13} className="text-emerald-500" />
              <span>Free & No Sign-In Needed</span>
            </div>
            
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700"></div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Tabs */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 flex">
        <button
          onClick={() => setActiveTab('converter')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'converter'
              ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-500/5'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          MP4 to MP3
        </button>
        <button
          onClick={() => setActiveTab('splitter')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'splitter'
              ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-500/5'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Stem Splitter
        </button>
      </div>
    </nav>
  );
}
