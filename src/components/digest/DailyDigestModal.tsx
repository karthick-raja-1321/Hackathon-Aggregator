import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { DigestService } from '../../services/DigestService';
import { ensureAbsoluteUrl } from '../../utils/urlUtils';

interface DailyDigestModalProps {
  onClose: () => void;
}

export const DailyDigestModal: React.FC<DailyDigestModalProps> = ({ onClose }) => {
  const { opportunities, recipients, setToastMessage } = usePlatform();
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>(recipients.map(r => r.id));
  const [copied, setCopied] = useState<boolean>(false);
  const [broadcasted, setBroadcasted] = useState<boolean>(false);

  const selectedRecipients = recipients.filter(r => selectedGroupIds.includes(r.id));
  const totalRecipientsCount = selectedRecipients.reduce((acc, r) => acc + (r.memberCount || r.emails?.length || 0), 0);

  const htmlContent = DigestService.generateHtmlDigest(opportunities, selectedRecipients);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateBroadcast = () => {
    setBroadcasted(true);

    const emailList = selectedRecipients.flatMap(g => g.emails || []).filter(Boolean);
    const phoneList = selectedRecipients.flatMap(g => g.whatsappNumbers || []).filter(Boolean);

    const activeOps = opportunities.filter(o => o.status !== 'Closed');

    // 1. Trigger Mail Broadcast via mailto:
    if (emailList.length > 0) {
      const toList = emailList.join(',');
      const subject = encodeURIComponent(`[Innovation Digest] Verified Opportunity Digest (${activeOps.length} Active Competitions)`);
      const bodySummary = activeOps.slice(0, 5).map(o => `• ${o.title} | Deadline: ${new Date(o.registrationDeadline).toLocaleDateString()} | Register: ${ensureAbsoluteUrl(o.registrationUrl)}`).join('\n\n');
      const body = encodeURIComponent(`Dear Innovation Recipient,\n\nPlease find the latest verified innovation opportunities from the platform:\n\n${bodySummary}\n\nMission: NO STUDENT SHOULD MISS ANY INNOVATION OPPORTUNITY.\n\nRegards,\nDepartment of CSE, SECE`);
      window.open(`mailto:${toList}?subject=${subject}&body=${body}`, '_self');
    }

    // 2. Trigger WhatsApp Broadcast if phones are present
    if (phoneList.length > 0) {
      const primaryPhone = phoneList[0];
      const message = encodeURIComponent(`🚨 *[Innovation Opportunity Digest]*\n\n${activeOps.length} Active Verified Hackathons & Innovation Competitions are available.\n\nCheck official updates: https://sih.gov.in\n\n_Department of CSE, SECE_`);
      window.open(`https://api.whatsapp.com/send?phone=${primaryPhone}&text=${message}`, '_blank');
    }

    setToastMessage(`Broadcast triggered! Dispatched to ${totalRecipientsCount} recipients across ${selectedGroupIds.length} groups.`);
    setTimeout(() => setBroadcasted(false), 4000);
  };

  const toggleGroup = (id: string) => {
    setSelectedGroupIds(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">Innovation Opportunity Digest</h2>
              <p className="text-[11px] text-slate-400">Automated scheduled broadcast to Faculty, Innovation Cell, and Student batches</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Controls */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="w-full">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Target Recipient Broadcast Groups ({totalRecipientsCount} Total Recipients)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {recipients.map(group => {
                const active = selectedGroupIds.includes(group.id);
                return (
                  <button
                    key={group.id}
                    onClick={() => toggleGroup(group.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors ${
                      active ? 'bg-cyan-950 text-cyan-300 border-cyan-800 font-bold' : 'bg-slate-950 text-slate-500 border-slate-850'
                    }`}
                  >
                    {group.name} ({group.memberCount})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HTML Email Live Preview */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-950">
          <div className="border border-slate-800 rounded-xl overflow-hidden shadow-inner">
            <iframe
              title="Digest Preview"
              srcDoc={htmlContent}
              className="w-full h-[380px] bg-white border-0"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400 text-[11px] flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Configured Schedule: <strong>Daily at 8:00 PM IST</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyHtml}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white font-semibold rounded-lg flex items-center space-x-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span>{copied ? 'Copied HTML Code' : 'Copy HTML Email'}</span>
            </button>

            <button
              onClick={handleSimulateBroadcast}
              disabled={broadcasted}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-lg shadow-cyan-950/40"
            >
              {broadcasted ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Send className="w-4 h-4" />}
              <span>{broadcasted ? 'Broadcast Sent!' : 'Broadcast Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
