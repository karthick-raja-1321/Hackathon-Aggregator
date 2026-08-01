import React from 'react';
import { 
  Building2, 
  Clock, 
  Bookmark, 
  Eye, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Opportunity } from '../../types/opportunity';
import { getEffectiveActionUrl, hasRegistrationBegun } from '../../utils/urlUtils';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: () => void;
  onShare: (op: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onSelect, onShare }) => {
  const { toggleBookmark, toggleWatch } = usePlatform();

  const isHighlyRec = opportunity.priority.level === 'Highly Recommended';
  const isGovt = opportunity.primaryCategory === 'Government';
  const daysLeft = opportunity.priority.urgencyDays;

  return (
    <div className={`bg-slate-900 border transition-all duration-200 rounded-xl p-4 relative group hover:shadow-xl hover:shadow-cyan-950/20 ${
      isHighlyRec ? 'border-cyan-500/50 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/20' : 'border-slate-800 hover:border-slate-700'
    }`}>
      
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {/* Primary Category Badge */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
            isGovt ? 'bg-amber-950 text-amber-400 border border-amber-800/60' :
            opportunity.primaryCategory === 'Industry' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60' :
            opportunity.primaryCategory === 'Startup' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' :
            'bg-purple-950 text-purple-400 border border-purple-800/60'
          }`}>
            {opportunity.primaryCategory} • {opportunity.secondaryCategory}
          </span>

          {/* Mode */}
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {opportunity.mode}
          </span>
        </div>

        {/* Priority Rating Badge */}
        <div className="flex items-center space-x-2">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 border ${
            isHighlyRec ? 'bg-cyan-950 text-cyan-300 border-cyan-700/80' :
            opportunity.priority.level === 'Recommended' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
            'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{opportunity.priority.level} ({opportunity.priority.totalScore})</span>
          </span>

          {/* Urgency Badge */}
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 ${
            daysLeft < 0 || opportunity.status === 'Closed' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
            daysLeft === 0 ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse' :
            daysLeft <= 3 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
            'bg-slate-950 text-slate-400 border border-slate-800'
          }`}>
            <Clock className="w-3 h-3" />
            <span>
              {daysLeft < 0 || opportunity.status === 'Closed' ? 'REGISTRATION CLOSED' :
               daysLeft === 0 ? 'CLOSING TODAY' : 
               daysLeft === 1 ? 'CLOSING TOMORROW' : `${daysLeft}D LEFT`}
            </span>
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex items-start space-x-4 cursor-pointer" onClick={onSelect}>
        {/* Organizer Logo / Graphic */}
        {opportunity.organizerLogo ? (
          <img
            src={opportunity.organizerLogo}
            alt={opportunity.organizer}
            className="w-12 h-12 rounded-lg object-cover border border-slate-800 flex-shrink-0 bg-slate-950 mt-1"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold text-lg flex-shrink-0 mt-1">
            <Building2 className="w-6 h-6" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {opportunity.title}
          </h2>
          <div className="text-xs text-slate-400 font-medium mb-2 flex items-center space-x-2">
            <span>By <strong className="text-slate-300">{opportunity.organizer}</strong></span>
            {isGovt && <span title="Verified Government Portal"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /></span>}
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {opportunity.problemStatement}
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950/70 border border-slate-800/80 rounded-lg p-2 text-xs mb-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Prize Pool / Funding</span>
              <span className="font-bold text-emerald-400 text-xs truncate block">{opportunity.prizePoolText}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Target Departments</span>
              <span className="font-medium text-slate-300 text-xs truncate block">
                {Object.keys(opportunity.priority.deptSuitability).join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Registration Deadline</span>
              <span className="font-semibold text-amber-400 text-xs block">
                {new Date(opportunity.registrationDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {opportunity.technologies.map(tech => (
              <span key={tech} className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer Bar */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleBookmark(opportunity.id); }}
            className={`p-1.5 rounded-md border transition-colors ${
              opportunity.isBookmarked 
                ? 'bg-amber-950 text-amber-400 border-amber-800' 
                : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
            }`}
            title={opportunity.isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          {/* Watch Alert Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWatch(opportunity.id); }}
            className={`p-1.5 rounded-md border transition-colors ${
              opportunity.isWatched 
                ? 'bg-indigo-950 text-indigo-400 border-indigo-800' 
                : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
            }`}
            title={opportunity.isWatched ? 'Stop Watching' : 'Watch for Live Change Diffs'}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Share WhatsApp & Email Generator */}
          <button
            onClick={(e) => { e.stopPropagation(); onShare(opportunity); }}
            className="p-1.5 rounded-md bg-slate-950 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors flex items-center space-x-1"
            title="Generate WhatsApp & Faculty Circular Messages"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Share</span>
          </button>
        </div>

        {/* View Details & Apply CTA */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSelect}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 font-medium text-xs border border-slate-700 flex items-center space-x-1 transition-all"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={getEffectiveActionUrl(opportunity)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center space-x-1 shadow-md shadow-cyan-950/40 transition-all"
            title={hasRegistrationBegun(opportunity) ? 'Register on Official Portal' : 'Registration not started yet - View Hackathon Info Page'}
          >
            <span>{hasRegistrationBegun(opportunity) ? 'Register Now' : 'Hackathon Info'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
