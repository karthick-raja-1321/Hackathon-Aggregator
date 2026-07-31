import React from 'react';
import { Sparkles, GraduationCap, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/90 text-slate-400 py-3 px-6 text-xs flex flex-col md:flex-row items-center justify-between gap-2 z-20 font-sans select-none">
      {/* Platform & Mission */}
      <div className="flex items-center space-x-2">
        <div className="bg-cyan-950 text-cyan-400 border border-cyan-800/60 p-1 rounded">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-bold text-slate-200">Innovation Opportunity Intelligence Platform</span>
          <span className="hidden sm:inline text-slate-500 font-medium"> • NO STUDENT SHOULD MISS ANY INNOVATION OPPORTUNITY</span>
        </div>
      </div>

      {/* Creator Credits & Designation */}
      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800/80 px-3 py-1 rounded-full text-[11px]">
        <span className="text-slate-400 font-medium">Created by</span>
        <span className="font-bold text-white tracking-tight flex items-center space-x-1">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400 inline" />
          <span className="text-cyan-300">M. Karthick Raja</span>
          <span className="text-slate-300 font-normal">M.E., (Ph.D.,)</span>
        </span>
        <span className="bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.2 rounded-full font-mono text-[10px] font-semibold">
          AP/CSE, SECE
        </span>
      </div>

      {/* Copyright & Institution Info */}
      <div className="text-[11px] text-slate-500 flex items-center space-x-1">
        <Building2 className="w-3 h-3 text-slate-400" />
        <span>Sri Eshwar College of Engineering (SECE)</span>
      </div>
    </footer>
  );
};
