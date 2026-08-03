import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  GraduationCap, 
  Lightbulb, 
  Rocket, 
  Microscope, 
  Code, 
  Cpu, 
  ShieldAlert, 
  Cloud, 
  Zap, 
  Bot, 
  HeartPulse, 
  Clock, 
  Bookmark, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { PrimaryCategory, SecondaryCategory, TechnologyTag } from '../../types/opportunity';

export const Sidebar: React.FC = () => {
  const { filterState, setFilterState, opportunities } = usePlatform();
  
  const [expandCategory, setExpandCategory] = useState<boolean>(true);
  const [expandType, setExpandType] = useState<boolean>(true);
  const [expandTech, setExpandTech] = useState<boolean>(true);

  const activeOpportunities = opportunities.filter(o => o.priority.urgencyDays >= 0 && o.status !== 'Closed');
  const pastOpportunities = opportunities.filter(o => new Date(o.registrationDeadline).getTime() < Date.now() || o.status === 'Closed' || o.priority.urgencyDays < 0);

  // Category Counters
  const countPrimary = (cat: PrimaryCategory) => activeOpportunities.filter(o => o.primaryCategory === cat).length;
  const countSecondary = (cat: SecondaryCategory) => activeOpportunities.filter(o => o.secondaryCategory === cat).length;
  const countTech = (tech: TechnologyTag) => activeOpportunities.filter(o => o.technologies.includes(tech)).length;

  const countClosingToday = activeOpportunities.filter(o => o.priority.urgencyDays === 0).length;
  const countClosingTomorrow = activeOpportunities.filter(o => o.priority.urgencyDays === 1).length;
  const countClosingWeek = activeOpportunities.filter(o => o.priority.urgencyDays <= 7).length;

  const countBookmarks = activeOpportunities.filter(o => o.isBookmarked).length;
  const countWatched = activeOpportunities.filter(o => o.isWatched).length;

  const setPrimary = (cat: PrimaryCategory | 'ALL') => {
    setFilterState(prev => ({
      ...prev,
      primaryCategory: prev.primaryCategory === cat ? 'ALL' : cat
    }));
  };

  const setSecondary = (cat: SecondaryCategory | 'ALL') => {
    setFilterState(prev => ({
      ...prev,
      secondaryCategory: prev.secondaryCategory === cat ? 'ALL' : cat
    }));
  };

  const setTech = (tech: TechnologyTag | 'ALL') => {
    setFilterState(prev => ({
      ...prev,
      technology: prev.technology === tech ? 'ALL' : tech
    }));
  };

  const setDeadlineRange = (range: 'ALL' | 'TODAY' | 'TOMORROW' | 'THIS_WEEK') => {
    setFilterState(prev => ({
      ...prev,
      deadlineRange: prev.deadlineRange === range ? 'ALL' : range
    }));
  };

  const resetAllFilters = () => {
    setFilterState({ query: '', primaryCategory: 'ALL', secondaryCategory: 'ALL', technology: 'ALL', deadlineRange: 'ALL' });
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-53px)] overflow-y-auto text-slate-300 select-none text-xs">
      
      {/* Quick Filters / User Bookmarks */}
      <div className="p-3 border-b border-slate-800/80">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">My Saved Workspace</div>
        <div className="space-y-1">
          <button
            onClick={() => setFilterState(prev => ({ ...prev, priorityLevel: prev.priorityLevel === 'Highly Recommended' ? 'ALL' : 'Highly Recommended' }))}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.priorityLevel === 'Highly Recommended' ? 'bg-cyan-950/80 text-cyan-400 font-semibold border border-cyan-800/50' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Highly Recommended</span>
            </div>
            <span className="bg-slate-800 text-cyan-400 font-mono text-[10px] px-1.5 py-0.5 rounded">
              {opportunities.filter(o => o.priority.level === 'Highly Recommended').length}
            </span>
          </button>

          <button
            onClick={() => setFilterState(prev => ({ ...prev, query: prev.query === '#bookmarked' ? '' : '#bookmarked' }))}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.query === '#bookmarked' ? 'bg-amber-950/60 text-amber-400 font-semibold border border-amber-800/50' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Bookmarked Items</span>
            </div>
            <span className="bg-slate-800 text-amber-400 font-mono text-[10px] px-1.5 py-0.5 rounded">
              {countBookmarks}
            </span>
          </button>

          <button
            onClick={() => setFilterState(prev => ({ ...prev, query: prev.query === '#watched' ? '' : '#watched' }))}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.query === '#watched' ? 'bg-indigo-950/60 text-indigo-400 font-semibold border border-indigo-800/50' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Watched Alerts</span>
            </div>
            <span className="bg-slate-800 text-indigo-400 font-mono text-[10px] px-1.5 py-0.5 rounded">
              {countWatched}
            </span>
          </button>

          <button
            onClick={() => setFilterState(prev => ({ ...prev, viewTab: prev.viewTab === 'PAST_EVENTS' ? 'ACTIVE' : 'PAST_EVENTS', includeClosed: false }))}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.viewTab === 'PAST_EVENTS' ? 'bg-rose-950/80 text-rose-300 font-semibold border border-rose-800/60' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>Past Events (Closed)</span>
            </div>
            <span className="bg-slate-800 text-rose-400 font-mono text-[10px] px-1.5 py-0.5 rounded">
              {pastOpportunities.length}
            </span>
          </button>
        </div>
      </div>

      {/* Deadlines Nav */}
      <div className="p-3 border-b border-slate-800/80">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Urgent Deadlines</span>
          <Clock className="w-3 h-3 text-slate-500" />
        </div>
        <div className="space-y-1">
          <button
            onClick={() => setDeadlineRange('TODAY')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.deadlineRange === 'TODAY' ? 'bg-rose-950/80 text-rose-300 font-semibold border border-rose-800/60' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Closing Today</span>
            </span>
            <span className="bg-rose-900/60 text-rose-300 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
              {countClosingToday}
            </span>
          </button>

          <button
            onClick={() => setDeadlineRange('TOMORROW')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.deadlineRange === 'TOMORROW' ? 'bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/60' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Closing Tomorrow</span>
            </span>
            <span className="bg-amber-900/60 text-amber-300 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
              {countClosingTomorrow}
            </span>
          </button>

          <button
            onClick={() => setDeadlineRange('THIS_WEEK')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              filterState.deadlineRange === 'THIS_WEEK' ? 'bg-blue-950/80 text-blue-300 font-semibold border border-blue-800/60' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Closing This Week</span>
            </span>
            <span className="bg-blue-900/60 text-blue-300 font-mono text-[10px] px-1.5 py-0.5 rounded">
              {countClosingWeek}
            </span>
          </button>
        </div>
      </div>

      {/* Primary Category Section */}
      <div className="p-3 border-b border-slate-800/80">
        <button
          onClick={() => setExpandCategory(!expandCategory)}
          className="w-full flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 hover:text-slate-300"
        >
          <span>Primary Category</span>
          {expandCategory ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {expandCategory && (
          <div className="space-y-1">
            {[
              { id: 'Government', label: 'Government', icon: Building2, color: 'text-amber-400' },
              { id: 'Industry', label: 'Industry Giant', icon: Rocket, color: 'text-cyan-400' },
              { id: 'Startup', label: 'Startup Cell', icon: Lightbulb, color: 'text-emerald-400' },
              { id: 'Academic', label: 'Academic / IITs', icon: GraduationCap, color: 'text-purple-400' },
              { id: 'Research', label: 'Research Grants', icon: Microscope, color: 'text-pink-400' },
              { id: 'International', label: 'International', icon: Globe, color: 'text-blue-400' },
            ].map(cat => {
              const Icon = cat.icon;
              const active = filterState.primaryCategory === cat.id;
              const count = countPrimary(cat.id as PrimaryCategory);
              return (
                <button
                  key={cat.id}
                  onClick={() => setPrimary(cat.id as PrimaryCategory)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    active ? 'bg-slate-800 text-white font-semibold border-l-2 border-cyan-400' : 'hover:bg-slate-850 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                    <span>{cat.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Secondary Opportunity Type */}
      <div className="p-3 border-b border-slate-800/80">
        <button
          onClick={() => setExpandType(!expandType)}
          className="w-full flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 hover:text-slate-300"
        >
          <span>Opportunity Type</span>
          {expandType ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {expandType && (
          <div className="space-y-1">
            {[
              'Hackathon',
              'Ideathon',
              'Innovation Challenge',
              'Coding Contest',
              'Grant',
              'Internship',
              'Workshop',
              'Bootcamp'
            ].map(type => {
              const active = filterState.secondaryCategory === type;
              const count = countSecondary(type as SecondaryCategory);
              return (
                <button
                  key={type}
                  onClick={() => setSecondary(type as SecondaryCategory)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    active ? 'bg-slate-800 text-cyan-300 font-semibold' : 'hover:bg-slate-850 text-slate-300'
                  }`}
                >
                  <span>{type}</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Technology Tags */}
      <div className="p-3 border-b border-slate-800/80">
        <button
          onClick={() => setExpandTech(!expandTech)}
          className="w-full flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 hover:text-slate-300"
        >
          <span>Emerging Tech</span>
          {expandTech ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {expandTech && (
          <div className="space-y-1">
            {[
              { name: 'Artificial Intelligence', icon: Bot },
              { name: 'Machine Learning', icon: Cpu },
              { name: 'Cyber Security', icon: ShieldAlert },
              { name: 'Cloud Computing', icon: Cloud },
              { name: 'Internet of Things', icon: Zap },
              { name: 'Robotics', icon: Code },
              { name: 'Healthcare Tech', icon: HeartPulse }
            ].map(t => {
              const Icon = t.icon;
              const active = filterState.technology === t.name;
              const count = countTech(t.name as TechnologyTag);
              return (
                <button
                  key={t.name}
                  onClick={() => setTech(t.name as TechnologyTag)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    active ? 'bg-slate-800 text-cyan-300 font-semibold' : 'hover:bg-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[130px]">{t.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Reset Filter Button */}
      <div className="p-3 mt-auto">
        <button
          onClick={resetAllFilters}
          className="w-full text-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 py-1.5 rounded-md text-xs font-medium transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    </aside>
  );
};
