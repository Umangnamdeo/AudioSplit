import React from 'react';

export default function AdBanner() {
  return (
    <div className="w-full flex flex-col items-center mt-8 gap-2">
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Advertisement</span>
      
      {/* Container scales based on breakpoint: 320x50 on mobile, 728x90 on desktop */}
      <div className="w-[320px] h-[50px] md:w-[728px] md:h-[90px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-center justify-center relative overflow-hidden group text-slate-500 dark:text-slate-400 italic text-sm transition-colors">
        <svg className="mr-2 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
        Premium Processing Partner - 10% Off Annual Subscriptions
      </div>
    </div>
  );
}
