import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConverterTab from './components/ConverterTab';
import StemSplitterTab from './components/StemSplitterTab';
import AdBanner from './components/AdBanner';
import BackgroundDoodles from './components/BackgroundDoodles';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('audiosplit_theme');
    return saved ? saved === 'dark' : true;
  });
  const [activeTab, setActiveTab] = useState<'converter' | 'splitter'>('converter');

  // Handle dark mode class on document element and body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('audiosplit_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('audiosplit_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`${darkMode ? 'dark' : ''} relative min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-200 flex flex-col overflow-x-hidden`}>
      {/* Interactive Studio Audio Doodles in Background */}
      <BackgroundDoodles />

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className="flex-grow flex flex-col items-center w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <Hero darkMode={darkMode} />
          
          <div className="w-full bg-white dark:bg-slate-800/95 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm transition-colors duration-200">
            {/* Card Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('converter')}
                className={`flex-1 py-4 text-sm font-medium transition-colors border-r border-slate-200 dark:border-slate-700 cursor-pointer ${
                  activeTab === 'converter'
                    ? 'text-amber-600 dark:text-amber-500 bg-white dark:bg-slate-800 font-bold border-b-2 border-amber-600 dark:border-amber-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-50/70 dark:bg-slate-900/40'
                }`}
              >
                MP4 to MP3
              </button>
              <button
                onClick={() => setActiveTab('splitter')}
                className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'splitter'
                    ? 'text-amber-600 dark:text-amber-500 bg-white dark:bg-slate-800 font-bold border-b-2 border-amber-600 dark:border-amber-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-50/70 dark:bg-slate-900/40'
                }`}
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M12 2v10'/><path d='M18.4 15.6a9 9 0 1 1-12.8 0'/>
                </svg>
                AI Stem Separator
              </button>
            </div>
            
            <div className="flex-1 p-6">
              {activeTab === 'converter' && <ConverterTab />}
              {activeTab === 'splitter' && <StemSplitterTab />}
            </div>
          </div>

          <AdBanner />
        </main>
        
        {/* Footer */}
        <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 py-4 px-8 bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-auto gap-2 transition-colors">
          <div>&copy; {new Date().getFullYear()} AudioSplit Engine. Standard license applied.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">API Docs</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
