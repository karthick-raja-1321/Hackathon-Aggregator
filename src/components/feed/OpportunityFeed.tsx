import React, { useState } from 'react';
import { 
  Filter, 
  Grid, 
  List, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { OpportunityCard } from './OpportunityCard';
import { Opportunity } from '../../types/opportunity';

interface OpportunityFeedProps {
  onSelectOpportunity: (op: Opportunity) => void;
  onShareOpportunity: (op: Opportunity) => void;
}

export const OpportunityFeed: React.FC<OpportunityFeedProps> = ({
  onSelectOpportunity,
  onShareOpportunity
}) => {
  const { filteredOpportunities, filterState, setFilterState, isSyncing, triggerManualSync } = usePlatform();
  const [viewMode, setViewMode] = useState<'cards' | 'dense'>('cards');

  const activeFilterCount = [
    filterState.primaryCategory !== 'ALL',
    filterState.secondaryCategory !== 'ALL',
    filterState.technology !== 'ALL',
    filterState.deadlineRange !== 'ALL',
    filterState.priorityLevel !== 'ALL',
    Boolean(filterState.query)
  ].filter(Boolean).length;

  return (
    <main className="flex-1 h-[calc(100vh-53px)] overflow-y-auto p-4 md:p-6 bg-slate-950 text-slate-100">
      
      {/* Workspace Header & Live Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-white">Innovation Opportunities Feed</h2>
            <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
              {filteredOpportunities.length} OPEN
            </span>
            <span className="hidden sm:inline-block bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-mono">
              OPEN DEADLINES ONLY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated discovery & active deadline tracking across verified national & global sources.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterState(prev => ({ ...prev, includeClosed: !prev.includeClosed }))}
            className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
              filterState.includeClosed ? 'bg-amber-950 text-amber-300 border-amber-800 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle visibility of past / closed registration deadlines"
          >
            {filterState.includeClosed ? 'Showing Closed Events' : 'Show Closed Events'}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={() => setFilterState({ query: '', primaryCategory: 'ALL', secondaryCategory: 'ALL', technology: 'ALL', deadlineRange: 'ALL', includeClosed: false })}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium px-2 py-1 bg-cyan-950/50 border border-cyan-800/60 rounded-md transition-colors"
            >
              Clear {activeFilterCount} Active Filters
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-lg flex items-center space-x-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md text-xs transition-colors ${viewMode === 'cards' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Expanded Card View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('dense')}
              className={`p-1.5 rounded-md text-xs transition-colors ${viewMode === 'dense' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Compact Dense List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => triggerManualSync()}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Sync Adapters</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Active Filters:</span>
          </span>
          {filterState.primaryCategory && filterState.primaryCategory !== 'ALL' && (
            <span className="bg-slate-900 border border-slate-800 text-cyan-300 text-xs px-2.5 py-0.5 rounded-md font-mono">
              Category: {filterState.primaryCategory}
            </span>
          )}
          {filterState.secondaryCategory && filterState.secondaryCategory !== 'ALL' && (
            <span className="bg-slate-900 border border-slate-800 text-amber-300 text-xs px-2.5 py-0.5 rounded-md font-mono">
              Type: {filterState.secondaryCategory}
            </span>
          )}
          {filterState.technology && filterState.technology !== 'ALL' && (
            <span className="bg-slate-900 border border-slate-800 text-purple-300 text-xs px-2.5 py-0.5 rounded-md font-mono">
              Tech: {filterState.technology}
            </span>
          )}
          {filterState.deadlineRange && filterState.deadlineRange !== 'ALL' && (
            <span className="bg-slate-900 border border-slate-800 text-rose-300 text-xs px-2.5 py-0.5 rounded-md font-mono">
              Deadline: {filterState.deadlineRange}
            </span>
          )}
          {filterState.query && (
            <span className="bg-slate-900 border border-slate-800 text-emerald-300 text-xs px-2.5 py-0.5 rounded-md font-mono">
              Query: "{filterState.query}"
            </span>
          )}
        </div>
      )}

      {/* Main Feed Container */}
      {filteredOpportunities.length > 0 ? (
        <div className={viewMode === 'cards' ? 'space-y-4' : 'space-y-2'}>
          {filteredOpportunities.map(op => (
            <OpportunityCard
              key={op.id}
              opportunity={op}
              onSelect={() => onSelectOpportunity(op)}
              onShare={onShareOpportunity}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto my-12">
          <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No Opportunities Match Current Filter</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Try adjusting your search criteria or triggering a manual sync across registered source adapters.
          </p>
          <button
            onClick={() => setFilterState({ query: '', primaryCategory: 'ALL', secondaryCategory: 'ALL', technology: 'ALL', deadlineRange: 'ALL' })}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg shadow-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
};
