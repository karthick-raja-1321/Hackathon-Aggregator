import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { SearchEngine } from '../../services/SearchEngine';

interface SearchModalProps {
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const { filterState, setFilterState, filteredOpportunities, setSelectedOpportunity } = usePlatform();
  const [searchTerm, setSearchTerm] = useState(filterState.query || '');

  const handleApplySearch = (queryText: string) => {
    const parsed = SearchEngine.parseNaturalLanguageQuery(queryText);
    setFilterState(parsed);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplySearch(searchTerm);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col">
        
        {/* Input Header */}
        <div className="bg-slate-950 p-3.5 border-b border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type natural language query (e.g., 'AI Hackathons closing this week', 'Govt grants')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-slate-500 font-medium"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 text-xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Sample Natural Language Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'AI Hackathons closing this week',
              'Government Hackathons',
              'Closing tomorrow',
              'Defense Grants',
              'Google Gemini AI'
            ].map(q => (
              <button
                key={q}
                onClick={() => {
                  setSearchTerm(q);
                  handleApplySearch(q);
                }}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs px-2.5 py-1 rounded-lg transition-all"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

        {/* Instant Search Live Results */}
        <div className="p-4 max-h-[350px] overflow-y-auto space-y-2 text-xs">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.slice(0, 5).map(op => (
              <div
                key={op.id}
                onClick={() => {
                  setSelectedOpportunity(op);
                  onClose();
                }}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 p-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-cyan-400">{op.title}</div>
                  <div className="text-slate-400 text-[11px]">{op.organizer} • {op.primaryCategory} • {op.prizePoolText}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </div>
            ))
          ) : (
            <div className="text-slate-500 text-center py-6">No matching opportunities found.</div>
          )}
        </div>

        <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 text-center flex items-center justify-center space-x-2 font-mono">
          <span>Press Enter to Apply Search</span>
          <CornerDownLeft className="w-3 h-3 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
