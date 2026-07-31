import React from 'react';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  History
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Opportunity } from '../../types/opportunity';

interface RightSidebarProps {
  onSelectOpportunity: (op: Opportunity) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onSelectOpportunity }) => {
  const { opportunities } = usePlatform();

  const closingToday = opportunities.filter(o => o.priority.urgencyDays === 0 && o.status !== 'Closed');
  const closingTomorrow = opportunities.filter(o => o.priority.urgencyDays === 1 && o.status !== 'Closed');
  const closingThisWeek = opportunities.filter(o => o.priority.urgencyDays > 1 && o.priority.urgencyDays <= 7 && o.status !== 'Closed');

  // Flatten recent changes
  const recentChanges = opportunities
    .flatMap(o => (o.changeHistory || []).map(c => ({ change: c, opportunity: o })))
    .sort((a, b) => new Date(b.change.timestamp).getTime() - new Date(a.change.timestamp).getTime())
    .slice(0, 4);

  return (
    <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-[calc(100vh-53px)] overflow-y-auto p-3 text-slate-300 select-none text-xs space-y-4">
      
      {/* Urgent Deadline Radar */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          <span className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Deadline Tracker</span>
          </span>
          <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded font-mono">
            {closingToday.length + closingTomorrow.length + closingThisWeek.length} ACTIONABLE
          </span>
        </div>

        {/* Closing Today */}
        {closingToday.length > 0 && (
          <div className="mb-3">
            <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>CLOSING TODAY</span>
            </div>
            <div className="space-y-1.5">
              {closingToday.map(op => (
                <div
                  key={op.id}
                  onClick={() => onSelectOpportunity(op)}
                  className="bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/50 p-2 rounded-md cursor-pointer transition-all group"
                >
                  <div className="font-semibold text-rose-200 group-hover:text-white truncate">{op.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-rose-300 mt-1">
                    <span>{op.organizer}</span>
                    <span className="font-mono text-rose-400 font-bold">TODAY</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing Tomorrow */}
        {closingTomorrow.length > 0 && (
          <div className="mb-3">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">CLOSING TOMORROW</div>
            <div className="space-y-1.5">
              {closingTomorrow.map(op => (
                <div
                  key={op.id}
                  onClick={() => onSelectOpportunity(op)}
                  className="bg-amber-950/30 hover:bg-amber-900/40 border border-amber-800/40 p-2 rounded-md cursor-pointer transition-all group"
                >
                  <div className="font-semibold text-amber-200 group-hover:text-white truncate">{op.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-amber-300/80 mt-1">
                    <span className="truncate max-w-[140px]">{op.organizer}</span>
                    <span className="font-mono text-amber-400 font-bold">1 DAY LEFT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing This Week */}
        {closingThisWeek.length > 0 && (
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">CLOSING THIS WEEK</div>
            <div className="space-y-1.5">
              {closingThisWeek.map(op => (
                <div
                  key={op.id}
                  onClick={() => onSelectOpportunity(op)}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2 rounded-md cursor-pointer transition-all group"
                >
                  <div className="font-semibold text-slate-200 group-hover:text-cyan-300 truncate">{op.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="truncate max-w-[140px]">{op.organizer}</span>
                    <span className="font-mono text-blue-400">{op.priority.urgencyDays} DAYS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live Change Detection Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          <span className="flex items-center space-x-1.5">
            <History className="w-4 h-4 text-cyan-400" />
            <span>Live Change Audit</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">REAL-TIME</span>
        </div>

        {recentChanges.length > 0 ? (
          <div className="space-y-2">
            {recentChanges.map(({ change, opportunity }) => (
              <div
                key={change.id}
                onClick={() => onSelectOpportunity(opportunity)}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2 rounded-md cursor-pointer transition-all text-[11px]"
              >
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-0.5">
                  <span className="font-bold">{change.fieldType}</span>
                  <span>{new Date(change.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-slate-300 font-medium line-clamp-1">{opportunity.title}</div>
                <div className="text-slate-400 text-[10px] mt-1 italic">{change.summary}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-500 text-center py-4 italic text-[11px]">
            No recent event modifications detected. Adapter continuous monitoring active.
          </div>
        )}
      </div>

      {/* Calendar Quick Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          <span className="flex items-center space-x-1.5">
            <CalendarIcon className="w-4 h-4 text-purple-400" />
            <span>Google Calendar Sync</span>
          </span>
          <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded font-mono">AUTO SYNC</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-2">
          All opportunity rounds and deadlines are formatted for automatic calendar syncing.
        </p>
        <div className="bg-slate-900 border border-slate-800 p-2 rounded text-[11px] font-mono text-purple-300 flex items-center justify-between">
          <span>Synced Events Count</span>
          <span className="font-bold text-white">
            {opportunities.reduce((acc, o) => acc + (o.rounds ? o.rounds.length + 1 : 1), 0)}
          </span>
        </div>
      </div>
    </aside>
  );
};
