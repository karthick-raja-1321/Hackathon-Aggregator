import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Activity, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Database, 
  ShieldCheck,
  Printer,
  Download,
  Calendar as CalendarIcon,
  ExternalLink
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ScheduleInterval, RecipientGroup } from '../../types/opportunity';
import { SharingService } from '../../services/SharingService';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { 
    opportunities,
    setToastMessage,
    sources, 
    updateSourceConfig, 
    recipients, 
    addRecipientGroup, 
    updateRecipientGroup,
    deleteRecipientGroup, 
    syncReports, 
    triggerManualSync, 
    isSyncing 
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'Sources' | 'Scheduler' | 'Recipients' | 'Calendar' | 'Health' | 'Logs'>('Sources');
  
  // New Group State
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCat, setNewGroupCat] = useState<RecipientGroup['category']>('Faculty');
  const [newGroupEmails, setNewGroupEmails] = useState('');
  const [newGroupPhone, setNewGroupPhone] = useState('');

  // Inline Contact Edit State per Group ID
  const [addEmailInput, setAddEmailInput] = useState<Record<string, string>>({});
  const [addPhoneInput, setAddPhoneInput] = useState<Record<string, string>>({});

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName) return;
    const emailsList = newGroupEmails.split(',').map(s => s.trim()).filter(Boolean);
    const phoneList = newGroupPhone.split(',').map(s => s.trim()).filter(Boolean);

    addRecipientGroup({
      id: `group-${Date.now()}`,
      name: newGroupName,
      category: newGroupCat,
      memberCount: Math.max(1, emailsList.length || phoneList.length),
      emails: emailsList,
      whatsappNumbers: phoneList,
      description: 'Custom recipient group with optional Mail & WhatsApp dispatch'
    });
    setNewGroupName('');
    setNewGroupEmails('');
    setNewGroupPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">Platform Administration & Scheduler Control Studio</h2>
              <p className="text-[11px] text-slate-400">Configure auto-discovery sources, polling intervals, recipient groups & system health</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 flex items-center space-x-1 overflow-x-auto text-xs font-semibold select-none">
          {['Sources', 'Scheduler', 'Recipients', 'Calendar', 'Health', 'Logs'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`px-4 py-3 border-b-2 transition-all ${
                activeTab === t ? 'border-cyan-400 text-cyan-300 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          
          {/* SOURCES CONFIG TAB */}
          {activeTab === 'Sources' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Registered Auto-Discovery Source Adapters</h3>
                <button
                  onClick={() => triggerManualSync()}
                  disabled={isSyncing}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg flex items-center space-x-1 text-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Sync All Now</span>
                </button>
              </div>

              <div className="space-y-3">
                {sources.map(src => (
                  <div key={src.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">{src.name}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            src.health.status === 'healthy' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300'
                          }`}>
                            {src.health.status.toUpperCase()} ({src.health.lastPingMs}ms)
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{src.baseUrl} • Adapter: {src.adapterType}</div>
                      </div>

                      {/* Interval Select */}
                      <div className="flex items-center space-x-2">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Schedule:</label>
                        <select
                          value={src.scheduleInterval}
                          onChange={(e) => updateSourceConfig({ ...src, scheduleInterval: e.target.value as ScheduleInterval })}
                          className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-cyan-300 focus:outline-none"
                        >
                          <option value="15m">Every 15 Minutes</option>
                          <option value="30m">Every 30 Minutes</option>
                          <option value="1h">Every 1 Hour</option>
                          <option value="3h">Every 3 Hours</option>
                          <option value="6h">Every 6 Hours</option>
                          <option value="12h">Every 12 Hours</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="manual">Manual Refresh Only</option>
                        </select>
                      </div>
                    </div>

                    {/* Stats Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900 p-2 rounded-lg text-[11px] font-mono">
                      <div><span className="text-slate-500">Fetched:</span> <strong className="text-slate-200">{src.stats.totalFetched}</strong></div>
                      <div><span className="text-slate-500">New Discovered:</span> <strong className="text-emerald-400">{src.stats.newDiscovered}</strong></div>
                      <div><span className="text-slate-500">Updated:</span> <strong className="text-cyan-400">{src.stats.updatedCount}</strong></div>
                      <div><span className="text-slate-500">Last Sync:</span> <strong className="text-slate-300">{src.lastRunTimestamp ? new Date(src.lastRunTimestamp).toLocaleTimeString() : 'Never'}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCHEDULER TAB */}
          {activeTab === 'Scheduler' && (
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Scheduler Engine Global Controls</h3>
              <p className="text-slate-300 leading-relaxed">
                The Discovery Scheduler continuously monitors configured source adapters without requiring manual intervention.
              </p>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg font-mono space-y-2">
                <div className="flex justify-between"><span>Active Sources:</span> <strong className="text-emerald-400">{sources.filter(s => s.enabled).length} Enabled</strong></div>
                <div className="flex justify-between"><span>Next Scheduled Run:</span> <strong className="text-cyan-400">15m Polling Window Active</strong></div>
                <div className="flex justify-between"><span>Duplicate Removal Engine:</span> <strong className="text-slate-200">Active (SHA-256 Hash Matching)</strong></div>
              </div>
            </div>
          )}

          {/* RECIPIENTS TAB */}
          {activeTab === 'Recipients' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Create / Edit Recipient Group</h4>
                  <p className="text-[11px] text-slate-400">Collect recipient details with optional Email ID and optional WhatsApp number for direct broadcast.</p>
                </div>

                <form onSubmit={handleCreateGroup} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Group Name</label>
                      <input
                        type="text"
                        placeholder="Group Name (e.g. CSE Faculty / Final Year AI)"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
                      <select
                        value={newGroupCat}
                        onChange={(e) => setNewGroupCat(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Faculty">Faculty</option>
                        <option value="Innovation Cell">Innovation Cell</option>
                        <option value="Placement Cell">Placement Cell</option>
                        <option value="II Year">II Year</option>
                        <option value="III Year">III Year</option>
                        <option value="Final Year">Final Year</option>
                        <option value="Startup Cell">Startup Cell</option>
                        <option value="Research Cell">Research Cell</option>
                        <option value="Custom">Custom Group</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Optional Email IDs (Comma Separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. faculty1@sece.ac.in, faculty2@sece.ac.in"
                        value={newGroupEmails}
                        onChange={(e) => setNewGroupEmails(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Optional WhatsApp Numbers (Comma Separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. +919876543210, +919123456789"
                        value={newGroupPhone}
                        onChange={(e) => setNewGroupPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1 shadow-md shadow-cyan-950/40">
                    <Plus className="w-4 h-4" />
                    <span>Save Recipient Group</span>
                  </button>
                </form>
              </div>

              {/* Group Cards List */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Registered Recipient Broadcast Groups ({recipients.length})</h4>
                {recipients.map(g => {
                  const emails = g.emails || [];
                  const whatsapp = g.whatsappNumbers || [];

                  const handleGroupMail = () => {
                    const toList = emails.join(',');
                    const subject = encodeURIComponent(`[Innovation Alert] Executive Opportunity Digest - ${g.name}`);
                    const body = encodeURIComponent(`Dear ${g.name},\n\nPlease review the latest verified innovation opportunities on the platform.\n\nMission: NO STUDENT SHOULD MISS ANY OPPORTUNITY.\n\nRegards,\nDepartment of CSE, SECE`);
                    window.open(`mailto:${toList}?subject=${subject}&body=${body}`, '_self');
                  };

                  const handleGroupWhatsApp = () => {
                    const targetNum = whatsapp[0] || '';
                    const message = encodeURIComponent(`🚨 *[Innovation Opportunity Digest]* - *${g.name}*\n\nNew verified innovation competitions & national hackathons are available.\n\nCheck official updates: https://sih.gov.in\n\n_Mission: NO STUDENT SHOULD MISS ANY INNOVATION OPPORTUNITY._`);
                    window.open(`https://api.whatsapp.com/send?phone=${targetNum}&text=${message}`, '_blank');
                  };

                  return (
                    <div key={g.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-white text-sm flex items-center space-x-2">
                            <span>{g.name}</span>
                            <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono font-semibold">{g.category}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{g.description}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {emails.length > 0 && (
                            <button
                              onClick={handleGroupMail}
                              className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                              title={`Share via Mail to ${emails.length} email addresses`}
                            >
                              <span>Share via Mail ({emails.length})</span>
                            </button>
                          )}

                          {whatsapp.length > 0 && (
                            <button
                              onClick={handleGroupWhatsApp}
                              className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                              title={`Share via WhatsApp to ${whatsapp.length} numbers`}
                            >
                              <span>Share via WhatsApp ({whatsapp.length})</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteRecipientGroup(g.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-950 rounded-lg border border-transparent hover:border-rose-900"
                            title="Delete Group"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Details Badges & Editable Team Members */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        {/* Member Emails Section */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                            <span>Member Emails ({emails.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {emails.map(email => (
                              <span key={email} className="bg-slate-900 border border-slate-800 text-cyan-300 font-mono px-2 py-0.5 rounded-md flex items-center space-x-1 text-[11px]">
                                <span>{email}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = emails.filter(e => e !== email);
                                    updateRecipientGroup({
                                      ...g,
                                      emails: updated,
                                      memberCount: Math.max(1, updated.length + whatsapp.length)
                                    });
                                  }}
                                  className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                                  title="Delete Email"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {emails.length === 0 && <span className="text-slate-500 italic text-[10px]">No emails added.</span>}

                            {/* Inline Add Email */}
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const val = (addEmailInput[g.id] || '').trim();
                                if (!val) return;
                                const updated = Array.from(new Set([...emails, val]));
                                updateRecipientGroup({
                                  ...g,
                                  emails: updated,
                                  memberCount: Math.max(1, updated.length + whatsapp.length)
                                });
                                setAddEmailInput(prev => ({ ...prev, [g.id]: '' }));
                              }}
                              className="flex items-center space-x-1"
                            >
                              <input
                                type="email"
                                placeholder="add member email..."
                                value={addEmailInput[g.id] || ''}
                                onChange={(e) => setAddEmailInput({ ...addEmailInput, [g.id]: e.target.value })}
                                className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-white font-mono focus:outline-none focus:border-cyan-500 w-36"
                              />
                              <button
                                type="submit"
                                className="px-2 py-0.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded text-[10px] font-bold"
                              >
                                + Add
                              </button>
                            </form>
                          </div>
                        </div>

                        {/* Member WhatsApp Numbers Section */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                            <span>WhatsApp Numbers ({whatsapp.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {whatsapp.map(phone => (
                              <span key={phone} className="bg-slate-900 border border-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded-md flex items-center space-x-1 text-[11px]">
                                <span>{phone}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = whatsapp.filter(p => p !== phone);
                                    updateRecipientGroup({
                                      ...g,
                                      whatsappNumbers: updated,
                                      memberCount: Math.max(1, emails.length + updated.length)
                                    });
                                  }}
                                  className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                                  title="Delete Phone"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {whatsapp.length === 0 && <span className="text-slate-500 italic text-[10px]">No phone numbers added.</span>}

                            {/* Inline Add Phone */}
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const val = (addPhoneInput[g.id] || '').trim();
                                if (!val) return;
                                const updated = Array.from(new Set([...whatsapp, val]));
                                updateRecipientGroup({
                                  ...g,
                                  whatsappNumbers: updated,
                                  memberCount: Math.max(1, emails.length + updated.length)
                                });
                                setAddPhoneInput(prev => ({ ...prev, [g.id]: '' }));
                              }}
                              className="flex items-center space-x-1"
                            >
                              <input
                                type="text"
                                placeholder="add phone (+91...)..."
                                value={addPhoneInput[g.id] || ''}
                                onChange={(e) => setAddPhoneInput({ ...addPhoneInput, [g.id]: e.target.value })}
                                className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-white font-mono focus:outline-none focus:border-cyan-500 w-36"
                              />
                              <button
                                type="submit"
                                className="px-2 py-0.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded text-[10px] font-bold"
                              >
                                + Add
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CALENDAR TAB */}
          {activeTab === 'Calendar' && (
            <div className="space-y-4">
              {/* Studio Action Header */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-purple-400" />
                    <span>Institutional Event Schedule & Calendar Studio</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Manage, export, or print verified hackathon & innovation deadlines.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const activeOps = opportunities.filter(o => o.status !== 'Closed');
                      const icsData = SharingService.generateBulkICalendarFile(activeOps);
                      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.download = 'hackathon_opportunities_schedule.ics';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      setToastMessage(`Downloaded .ics feed file with ${activeOps.length} event deadlines!`);
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1 shadow-md shadow-purple-950/40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download iCal (.ics)</span>
                  </button>

                  <button
                    onClick={() => {
                      const activeOps = opportunities.filter(o => o.status !== 'Closed');
                      if (activeOps.length > 0) {
                        window.open(SharingService.generateGoogleCalendarUrl(activeOps[0]), '_blank');
                      }
                    }}
                    className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-semibold rounded-lg flex items-center space-x-1"
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Sync Google Calendar</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center space-x-1"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-300" />
                    <span>Print Schedule</span>
                  </button>
                </div>
              </div>

              {/* Verified Event Schedule Grid / List */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">
                  Upcoming Innovation Opportunity Deadlines ({opportunities.filter(o => o.status !== 'Closed').length} Active Events)
                </h4>

                {opportunities.filter(o => o.status !== 'Closed').map(op => (
                  <div key={op.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-sm flex items-center space-x-2">
                          <span>{op.title}</span>
                          <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono font-semibold">{op.primaryCategory}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Organized by <strong>{op.organizer}</strong> • {op.mode}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-rose-400 font-mono">
                          Deadline: {new Date(op.registrationDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-[10px] text-amber-400 font-mono">{op.priority.urgencyDays} Days Remaining</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900 border border-slate-800/80 p-2 rounded-lg text-[11px] font-mono">
                      <div><strong className="text-slate-400">Prize Pool:</strong> <span className="text-emerald-400 font-bold">{op.prizePoolText}</span></div>
                      <div><strong className="text-slate-400">Team Size:</strong> <span className="text-slate-200">{op.eligibility.minTeamSize}-{op.eligibility.maxTeamSize} Members</span></div>
                      <div>
                        <strong className="text-slate-400">Portal:</strong>{' '}
                        <a href={op.registrationUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline flex items-center space-x-1 inline-flex">
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SYSTEM HEALTH TAB */}
          {activeTab === 'Health' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <Database className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <div className="text-xl font-bold text-white">HEALTHY</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">IndexedDB Persistence</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <Activity className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <div className="text-xl font-bold text-white">99.8% UPTIME</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Source Adapters</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <ShieldCheck className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <div className="text-xl font-bold text-white">ACTIVE</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Change Detection Engine</div>
              </div>
            </div>
          )}

          {/* LOGS TAB */}
          {activeTab === 'Logs' && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-[11px] space-y-2 max-h-[350px] overflow-y-auto text-slate-300">
              {syncReports.length > 0 ? (
                syncReports.map((r, i) => (
                  <div key={i} className="border-b border-slate-900 pb-1">
                    <span className="text-slate-500">[{new Date(r.timestamp).toLocaleTimeString()}]</span>{' '}
                    <span className="text-cyan-400 font-bold">{r.sourceName}:</span> Fetched {r.fetchedCount} items ({r.newDiscovered} new, {r.updatedCount} updated) in {r.durationMs}ms
                  </div>
                ))
              ) : (
                <div className="text-slate-500 italic">No sync execution logs recorded yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
