import React from 'react';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  History,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Opportunity } from '../../types/opportunity';

interface RightSidebarProps {
  onSelectOpportunity: (op: Opportunity) => void;
  onOpenAuth?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onSelectOpportunity, onOpenAuth }) => {
  const { opportunities, currentUser } = usePlatform();

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
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 font-bold text-slate-200 uppercase tracking-wider text-xs">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Urgent Deadline Radar</span>
          </div>
          <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-mono px-2 py-0.5 rounded-full font-bold">
            {closingToday.length + closingTomorrow.length} URGENT
          </span>
        </div>

        {/* Closing Today */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
            <span className="text-rose-400 font-extrabold flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3 inline" />
              <span>Closing Today ({closingToday.length})</span>
            </span>
          </div>
          {closingToday.map(op => (
            <div
              key={op.id}
              onClick={() => onSelectOpportunity(op)}
              className="bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900/60 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="font-bold text-white line-clamp-1">{op.title}</div>
              <div className="text-[10px] text-rose-300 flex items-center justify-between mt-1 font-mono">
                <span>{op.organizer}</span>
                <span className="font-bold uppercase">TODAY</span>
              </div>
            </div>
          ))}
          {closingToday.length === 0 && (
            <div className="text-[11px] text-slate-500 italic p-1">No deadlines closing today.</div>
          )}
        </div>

        {/* Closing Tomorrow */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-amber-400 uppercase">Closing Tomorrow ({closingTomorrow.length})</div>
          {closingTomorrow.map(op => (
            <div
              key={op.id}
              onClick={() => onSelectOpportunity(op)}
              className="bg-amber-950/30 hover:bg-amber-950/60 border border-amber-900/50 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="font-bold text-slate-200 line-clamp-1">{op.title}</div>
              <div className="text-[10px] text-amber-300 flex items-center justify-between mt-1 font-mono">
                <span>{op.organizer}</span>
                <span>1 DAY LEFT</span>
              </div>
            </div>
          ))}
          {closingTomorrow.length === 0 && (
            <div className="text-[11px] text-slate-500 italic p-1">No deadlines closing tomorrow.</div>
          )}
        </div>

        {/* Closing This Week */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-cyan-400 uppercase">Closing This Week ({closingThisWeek.length})</div>
          {closingThisWeek.slice(0, 3).map(op => (
            <div
              key={op.id}
              onClick={() => onSelectOpportunity(op)}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="font-medium text-slate-300 line-clamp-1">{op.title}</div>
              <div className="text-[10px] text-cyan-400 flex items-center justify-between mt-1 font-mono">
                <span>{op.organizer}</span>
                <span>{op.priority.urgencyDays}d left</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Change Audit Stream */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 font-bold text-slate-200 uppercase tracking-wider text-xs">
            <History className="w-4 h-4 text-cyan-400" />
            <span>Live Audit Stream</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>VERIFIED</span>
          </span>
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
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase tracking-wider">
          <span className="flex items-center space-x-1.5">
            <CalendarIcon className="w-4 h-4 text-purple-400" />
            <span>Google Calendar Sync</span>
          </span>
          <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-1.5 py-0.5 rounded font-mono">
            {currentUser ? 'SYNCED' : 'AUTH REQUIRED'}
          </span>
        </div>

        {currentUser ? (
          <div className="space-y-2">
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-[11px]">
              <div className="text-slate-300 font-bold">Account Synced:</div>
              <div className="text-purple-300 font-mono text-[10px] truncate">{currentUser.name} ({currentUser.email})</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2 rounded text-[11px] font-mono text-purple-300 flex items-center justify-between">
              <span>Synced Events</span>
              <span className="font-bold text-white">
                {opportunities.reduce((acc, o) => acc + (o.rounds ? o.rounds.length + 1 : 1), 0)}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-400">
              Sign in with Google / Mail services to map all opportunity deadlines to your Google Calendar.
            </p>
            <button
              onClick={onOpenAuth}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1 shadow-md shadow-purple-950/50"
            >
              <span>Sign In to Sync Google Calendar</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
