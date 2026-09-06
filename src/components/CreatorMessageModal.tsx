import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CreatorMessageModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup once per session when stem splitter is opened
    const hasSeenPopup = sessionStorage.getItem('audiosplit_creator_msg');
    if (!hasSeenPopup) {
      // Small delay to make it feel like a gentle pop-in after loading
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('audiosplit_creator_msg', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative w-full max-w-md mt-24"
          >
            {/* Panda SVG Doodle */}
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-48 pointer-events-none drop-shadow-xl z-20">
              <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                {/* Speech Bubble */}
                <path d="M 120 40 Q 120 10 150 10 L 170 10 Q 190 10 190 30 L 190 50 Q 190 70 170 70 L 160 70 L 140 85 L 145 70 Q 120 65 120 40 Z" fill="#ffffff" />
                <text x="157" y="46" fontFamily="sans-serif" fontWeight="900" fill="#a855f7" fontSize="18" textAnchor="middle">Hi!</text>
                
                {/* Ears */}
                <circle cx="50" cy="70" r="22" fill="#1e293b" />
                <circle cx="150" cy="70" r="22" fill="#1e293b" />
                
                {/* Head */}
                <ellipse cx="100" cy="110" rx="70" ry="55" fill="#ffffff" />
                
                {/* Eye patches */}
                <ellipse cx="68" cy="105" rx="18" ry="24" fill="#1e293b" transform="rotate(-15 68 105)" />
                <ellipse cx="132" cy="105" rx="18" ry="24" fill="#1e293b" transform="rotate(15 132 105)" />
                
                {/* Eyes */}
                <circle cx="70" cy="100" r="5" fill="#ffffff" />
                <circle cx="130" cy="100" r="5" fill="#ffffff" />
                
                {/* Blush */}
                <ellipse cx="50" cy="125" rx="12" ry="6" fill="#fbcfe8" opacity="0.8" />
                <ellipse cx="150" cy="125" rx="12" ry="6" fill="#fbcfe8" opacity="0.8" />
                
                {/* Nose */}
                <ellipse cx="100" cy="122" rx="7" ry="4" fill="#1e293b" />
                
                {/* Mouth */}
                <path d="M 92 132 Q 100 140 108 132" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
                
                {/* Paws holding the box */}
                <circle cx="45" cy="160" r="16" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                <circle cx="155" cy="160" r="16" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              </svg>
            </div>

            {/* Modal Box */}
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 pt-10 shadow-2xl border-4 border-slate-900 dark:border-slate-700 z-10 text-center">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                A note from the creator
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                Since all separation happens straight in your browser (keeping your files completely private), results can vary depending on the track and your system's hardware. I've tuned it for the best balance of speed and clarity, but feedback and improvements are always appreciated!
              </p>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-bold text-fuchsia-500 dark:text-fuchsia-400">
                  -Love and msg from Umang (Creator of AudioSplit )
                </span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                  Thanks
                </span>
              </div>
              
              <button 
                onClick={handleClose}
                className="mt-8 px-6 py-2.5 bg-slate-900 dark:bg-fuchsia-600 text-white rounded-full font-semibold shadow-lg hover:shadow-fuchsia-500/25 hover:bg-slate-800 dark:hover:bg-fuchsia-500 transition-all active:scale-95"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
