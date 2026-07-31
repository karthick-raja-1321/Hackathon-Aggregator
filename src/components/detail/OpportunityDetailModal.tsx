import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Download, 
  ExternalLink, 
  Share2, 
  Building2,
  Check
} from 'lucide-react';
import { Opportunity } from '../../types/opportunity';
import { SharingService } from '../../services/SharingService';

interface OpportunityDetailModalProps {
  opportunity: Opportunity;
  onClose: () => void;
  onShare: (op: Opportunity) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Timeline' | 'Rounds' | 'Downloads' | 'Eligibility' | 'Rules' | 'Prize' | 'Contacts' | 'Calendar' | 'Notifications' | 'History' | 'Related'
  >('Overview');

  const [copiedICal, setCopiedICal] = useState<boolean>(false);

  const handleDownloadICal = () => {
    const icalData = SharingService.generateICalendarFile(opportunity);
    const blob = new Blob([icalData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${opportunity.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedICal(true);
    setTimeout(() => setCopiedICal(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header Banner */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-start justify-between relative">
          <div className="flex items-start space-x-4 pr-12">
            {opportunity.organizerLogo ? (
              <img src={opportunity.organizerLogo} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-800 bg-slate-900" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold text-xl">
                <Building2 className="w-7 h-7" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {opportunity.primaryCategory} • {opportunity.secondaryCategory}
                </span>
                <span className="bg-slate-850 text-slate-400 border border-slate-750 text-[10px] font-mono px-2 py-0.5 rounded">
                  {opportunity.mode}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">{opportunity.title}</h2>
              <p className="text-xs text-slate-400 font-medium">{opportunity.tagline}</p>
            </div>
          </div>

          {/* Close & Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShare(opportunity)}
              className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white transition-colors"
              title="Share Opportunity"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 12 Tab Navigation Header Bar */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 flex items-center space-x-1 overflow-x-auto text-xs font-semibold select-none no-scrollbar">
          {[
            'Overview', 'Timeline', 'Rounds', 'Downloads', 'Eligibility', 
            'Rules', 'Prize', 'Contacts', 'Calendar', 'Notifications', 'History', 'Related'
          ].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3.5 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900/50' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modal Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Priority & Smart Recommendation Box */}
              <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm mb-1">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Smart Recommendation Score: {opportunity.priority.totalScore} / 100</span>
                    <span className="bg-cyan-900 text-cyan-200 text-[10px] px-2 py-0.5 rounded-full uppercase">
                      {opportunity.priority.level}
                    </span>
                  </div>
                  <ul className="text-slate-300 text-xs list-disc list-inside space-y-0.5 mt-2">
                    {opportunity.priority.reasoning.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={opportunity.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-950/50 flex items-center space-x-1.5 flex-shrink-0"
                >
                  <span>Apply On Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Department Suitability Breakdown */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="font-bold text-slate-200 mb-3 text-xs uppercase tracking-wider">Department Suitability Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(opportunity.priority.deptSuitability).map(([dept, match]) => (
                    <div key={dept} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{dept}</div>
                      <div className="text-base font-extrabold text-cyan-400 mt-0.5">{match}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Problem Statement */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="font-bold text-slate-200 mb-2 text-xs uppercase tracking-wider">Problem Statement</h3>
                <p className="text-slate-300 leading-relaxed text-xs">{opportunity.problemStatement}</p>
              </div>

              {/* Key Opportunity Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <h4 className="font-bold text-slate-300 mb-2">Organizer & Venue Details</h4>
                  <div className="space-y-1.5 text-slate-400">
                    <div><strong>Organizer:</strong> {opportunity.organizer}</div>
                    <div><strong>Mode:</strong> {opportunity.mode}</div>
                    {opportunity.venue && <div><strong>Venue:</strong> {opportunity.venue}</div>}
                    <div><strong>Official Website:</strong> <a href={opportunity.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{opportunity.officialWebsite}</a></div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <h4 className="font-bold text-slate-300 mb-2">Registration & Deadlines</h4>
                  <div className="space-y-1.5 text-slate-400">
                    <div><strong>Starts:</strong> {new Date(opportunity.registrationStartDate).toLocaleDateString()}</div>
                    <div><strong>Deadline:</strong> <span className="text-rose-400 font-bold">{new Date(opportunity.registrationDeadline).toLocaleDateString()}</span></div>
                    <div><strong>Urgency:</strong> {opportunity.priority.urgencyDays} Days Remaining</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'Timeline' && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Interactive Event Lifecycle Timeline</h3>
              <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 pl-6 py-2">
                {[
                  { title: 'Registration Window Opens', date: opportunity.registrationStartDate, desc: 'Students submit team proposals on portal', status: 'Completed' },
                  ...opportunity.rounds.map(r => ({ title: r.title, date: r.startDate, desc: r.description, status: r.status })),
                  { title: 'Results & Certificates Distribution', date: opportunity.eventEndDate, desc: 'Final winners announced & certified', status: 'Upcoming' }
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-slate-900 ${
                      item.status === 'Completed' ? 'border-emerald-500 bg-emerald-500' :
                      item.status === 'Active' ? 'border-cyan-400 bg-cyan-400 animate-pulse' : 'border-slate-700'
                    }`} />
                    <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white text-sm">{item.title}</span>
                        <span className="font-mono text-cyan-400 text-[11px]">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ROUNDS */}
          {activeTab === 'Rounds' && (
            <div className="space-y-4">
              {opportunity.rounds.map((round) => (
                <div key={round.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-cyan-400 text-sm">Round {round.roundNumber}: {round.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      round.status === 'Active' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-850 text-slate-400'
                    }`}>
                      {round.status}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mb-3">{round.description}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900 p-2 rounded-lg">
                    <span>Dates: {new Date(round.startDate).toLocaleDateString()} - {new Date(round.endDate).toLocaleDateString()}</span>
                    <span>Submission Required: {round.submissionRequired ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DOWNLOADS */}
          {activeTab === 'Downloads' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Official Event Poster Graphic', url: opportunity.posterUrl, type: 'PNG Image' },
                { title: 'Complete Rules & Guidelines PDF', url: opportunity.brochureUrl, type: 'PDF Document' },
                { title: 'Problem Statement Specification', url: opportunity.officialWebsite, type: 'Official Web Document' },
              ].map((doc, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{doc.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{doc.type}</div>
                  </div>
                  {doc.url ? (
                    <a href={doc.url} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 hover:bg-slate-750 text-cyan-400 rounded-lg">
                      <Download className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-slate-500 text-[10px] italic">Not Provided</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: ELIGIBILITY */}
          {activeTab === 'Eligibility' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Official Student Eligibility Rules</h3>
              <p className="text-slate-300 leading-relaxed">{opportunity.eligibility.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Allowed Academic Years</div>
                  <div className="text-slate-200 font-semibold mt-1">{opportunity.eligibility.yearsAllowed.join(', ')}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Team Composition Limits</div>
                  <div className="text-slate-200 font-semibold mt-1">Min: {opportunity.eligibility.minTeamSize} | Max: {opportunity.eligibility.maxTeamSize} Members</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RULES */}
          {activeTab === 'Rules' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-3">Rules and Code Guidelines</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">{opportunity.rulesAndGuidelines}</p>
            </div>
          )}

          {/* TAB 7: PRIZE */}
          {activeTab === 'Prize' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-5 rounded-xl">
                <div className="text-xs text-emerald-400 uppercase font-bold">Total Prize Pool & Funding</div>
                <div className="text-2xl font-extrabold text-white mt-1">{opportunity.prizePoolText}</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-slate-300">Prizes Breakdown</h4>
                {opportunity.prizesBreakdown.first && <div><strong>1st Prize:</strong> {opportunity.prizesBreakdown.first}</div>}
                {opportunity.prizesBreakdown.second && <div><strong>2nd Prize:</strong> {opportunity.prizesBreakdown.second}</div>}
                {opportunity.prizesBreakdown.third && <div><strong>3rd Prize:</strong> {opportunity.prizesBreakdown.third}</div>}
                <div className="flex gap-4 pt-2 font-semibold">
                  <span>Hiring Offers: {opportunity.prizesBreakdown.hiringOffers ? 'YES' : 'NO'}</span>
                  <span>Internship Offers: {opportunity.prizesBreakdown.internshipOffers ? 'YES' : 'NO'}</span>
                  <span>Incubation Grant: {opportunity.prizesBreakdown.incubationGrant ? 'YES' : 'NO'}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CONTACTS */}
          {activeTab === 'Contacts' && (
            <div className="space-y-3">
              {opportunity.contacts.map((c, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-slate-400 text-xs">{c.role} {c.designation ? `(${c.designation})` : ''}</div>
                  </div>
                  <a href={`mailto:${c.email}`} className="text-cyan-400 underline font-mono text-xs">
                    {c.email}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* TAB 9: CALENDAR */}
          {activeTab === 'Calendar' && (
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Google Calendar Integration</h3>
              <p className="text-slate-300 text-xs">
                Export event dates directly to your institution's Google Calendar or download standard `.ics` calendar invitation files.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={handleDownloadICal}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg flex items-center space-x-2 text-xs"
                >
                  {copiedICal ? <Check className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
                  <span>{copiedICal ? 'Downloaded .ics File' : 'Download iCal (.ics)'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 10: NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-3">Opportunity Change Alerts</h3>
              <p className="text-slate-400 text-xs italic">
                Automated continuous monitoring is active for this opportunity. Any date or rule changes emit instant alerts.
              </p>
            </div>
          )}

          {/* TAB 11: HISTORY (CHANGE DIFFS) */}
          {activeTab === 'History' && (
            <div className="space-y-3">
              {opportunity.changeHistory && opportunity.changeHistory.length > 0 ? (
                opportunity.changeHistory.map((chg) => (
                  <div key={chg.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                    <div className="flex justify-between text-[10px] text-cyan-400 font-mono mb-1">
                      <span>{chg.fieldType} MODIFICATION</span>
                      <span>{new Date(chg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-slate-200 font-medium">{chg.summary}</div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl text-slate-400 text-center italic">
                  Ingested cleanly with no subsequent deadline or rule modifications.
                </div>
              )}
            </div>
          )}

          {/* TAB 12: RELATED */}
          {activeTab === 'Related' && (
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl text-slate-300">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-2">Related Opportunities in {opportunity.primaryCategory}</h3>
              <p className="text-xs text-slate-400">Discover complementary hackathons and national grants matching this student profile.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
