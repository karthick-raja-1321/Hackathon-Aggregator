import React, { useState } from 'react';
import { X, Bell, Trash2 } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ensureAbsoluteUrl, getEffectiveActionUrl } from '../../utils/urlUtils';

interface NotificationModalProps {
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const { notifications, opportunities, markNotificationAsRead, clearAllNotifications } = usePlatform();
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

  const filtered = notifications.filter(n => filter === 'ALL' || !n.read);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Innovation Alert & Notification Center</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-md font-medium ${filter === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
            >
              All Alerts ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('UNREAD')}
              className={`px-3 py-1 rounded-md font-medium ${filter === 'UNREAD' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'text-slate-400'}`}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
          </div>

          <button
            onClick={clearAllNotifications}
            className="text-slate-400 hover:text-rose-400 text-xs flex items-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 text-xs">
          {filtered.length > 0 ? (
            filtered.map(n => {
              const handleNotificationClick = () => {
                markNotificationAsRead(n.id);

                if (n.opportunityId) {
                  const targetOp = opportunities.find(o => o.id === n.opportunityId);
                  if (targetOp) {
                    window.open(getEffectiveActionUrl(targetOp), '_blank');
                    return;
                  }
                }

                if (n.actionUrl) {
                  window.open(ensureAbsoluteUrl(n.actionUrl), '_blank');
                  return;
                }

                // Default fallback: open official SIH portal in new tab
                window.open('https://sih.gov.in', '_blank');
              };

              return (
                <div
                  key={n.id}
                  onClick={handleNotificationClick}
                  className={`p-3 rounded-xl border transition-all cursor-pointer hover:border-cyan-500 ${
                    !n.read ? 'bg-slate-950 border-cyan-500/40' : 'bg-slate-900/50 border-slate-800 text-slate-400'
                  }`}
                  title="Click to view details in a new tab"
                >
                  <div className="flex items-start justify-between">
                    <div className="font-bold text-slate-200 flex items-center space-x-1.5">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-cyan-400 font-mono font-normal underline">Open in new tab ↗</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1">{n.message}</p>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 italic">No notifications matching criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
};
