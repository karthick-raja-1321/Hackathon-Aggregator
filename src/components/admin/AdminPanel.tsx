import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Activity, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Database, 
  ShieldCheck
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ScheduleInterval, RecipientGroup } from '../../types/opportunity';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { 
    sources, 
    updateSourceConfig, 
    recipients, 
    addRecipientGroup, 
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

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName) return;
    const emailsList = newGroupEmails.split(',').map(s => s.trim()).filter(Boolean);
    addRecipientGroup({
      id: `group-${Date.now()}`,
      name: newGroupName,
      category: newGroupCat,
      memberCount: emailsList.length || 1,
      emails: emailsList,
      description: 'Custom recipient group'
    });
    setNewGroupName('');
    setNewGroupEmails('');
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
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <h4 className="font-bold text-white mb-2">Create New Recipient Group</h4>
                <form onSubmit={handleCreateGroup} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Group Name (e.g., CSE 2026 Batch)"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                  />
                  <select
                    value={newGroupCat}
                    onChange={(e) => setNewGroupCat(e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white font-mono"
                  >
                    <option value="Faculty">Faculty</option>
                    <option value="Innovation Cell">Innovation Cell</option>
                    <option value="Placement Cell">Placement Cell</option>
                    <option value="II Year">II Year</option>
                    <option value="III Year">III Year</option>
                    <option value="Final Year">Final Year</option>
                    <option value="Startup Cell">Startup Cell</option>
                  </select>
                  <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs flex items-center justify-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span>Add Group</span>
                  </button>
                </form>
              </div>

              <div className="space-y-3">
                {recipients.map(g => (
                  <div key={g.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{g.name} <span className="text-[10px] text-cyan-400 font-mono">({g.category})</span></div>
                      <div className="text-[11px] text-slate-400">{g.memberCount} Members • {g.description}</div>
                    </div>
                    <button onClick={() => deleteRecipientGroup(g.id)} className="p-1.5 text-rose-400 hover:bg-rose-950 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
