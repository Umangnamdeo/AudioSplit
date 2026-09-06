import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeSelectionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't selected a theme before
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      setIsOpen(true);
    }
  }, []);

  const handleSelectTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-500">
                <Sparkles size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Choose Your Vibe
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                How would you like to experience AudioSplit? You can change this later.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectTheme('light')}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-slate-50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-slate-600 group-hover:text-amber-600 transition-colors">
                    <Sun size={24} />
                  </div>
                  <span className="font-semibold text-slate-800">Light Mode</span>
                </button>
                <button
                  onClick={() => handleSelectTheme('dark')}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-slate-800 bg-slate-950 hover:border-amber-500 hover:bg-slate-900 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-amber-900/50 flex items-center justify-center text-slate-300 group-hover:text-amber-400 transition-colors">
                    <Moon size={24} />
                  </div>
                  <span className="font-semibold text-white">Dark Mode</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
