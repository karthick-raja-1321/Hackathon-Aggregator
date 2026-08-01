import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Printer, 
  MessageSquare, 
  Users, 
  GraduationCap
} from 'lucide-react';
import { Opportunity } from '../../types/opportunity';
import { SharingService } from '../../services/SharingService';

import { usePlatform } from '../../context/PlatformContext';

interface ShareModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ opportunity, onClose }) => {
  const { opportunities, setToastMessage } = usePlatform();
  const [shareScope, setShareScope] = useState<'Single' | 'BulkList'>('Single');
  const [audience, setAudience] = useState<'Student' | 'Faculty'>('Student');
  const [length, setLength] = useState<'Short' | 'Detailed'>('Detailed');
  const [copied, setCopied] = useState<boolean>(false);
  const [targetPhone, setTargetPhone] = useState<string>('');

  const messageText = shareScope === 'BulkList'
    ? SharingService.generateWhatsAppBulkDigestMessage(opportunities)
    : SharingService.generateWhatsAppMessage(opportunity, audience, length);

  const handleSendCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPhone.trim()) return;
    try {
      navigator.clipboard.writeText(messageText);
      setToastMessage('Copied full detailed bulletin to clipboard! Press Ctrl+V in WhatsApp to paste.');
    } catch (err) {
      // fallback
    }
    const url = shareScope === 'BulkList'
      ? SharingService.generateWhatsAppBulkDigestUrl(opportunities, targetPhone.trim())
      : SharingService.generateCustomWhatsAppUrl(opportunity, targetPhone.trim());
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setToastMessage('Full detailed announcement text copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareMail = () => {
    const subject = encodeURIComponent(shareScope === 'BulkList' ? '[Innovation Digest] Hackathon & Internship Opportunities Bulletin' : `[Innovation Alert] ${opportunity.title}`);
    const body = encodeURIComponent(messageText);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  const handleOpenWhatsAppWeb = () => {
    try {
      navigator.clipboard.writeText(messageText);
      setToastMessage('Copied full detailed bulletin to clipboard! Press Ctrl+V in WhatsApp to paste.');
    } catch (err) {
      // fallback
    }
    const url = shareScope === 'BulkList'
      ? SharingService.generateWhatsAppBulkDigestUrl(opportunities)
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  const handlePrintSummary = () => {
    const html = SharingService.generatePrintableSummary(opportunity);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Direct Mail & WhatsApp Sharing Studio</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Share Scope Selector Bar */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sharing Scope</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setShareScope('Single')}
                className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                  shareScope === 'Single'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Single Event Share</span>
              </button>

              <button
                onClick={() => setShareScope('BulkList')}
                className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                  shareScope === 'BulkList'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Full Bulletin List ({opportunities.length} Events)</span>
              </button>
            </div>
          </div>

          {/* Target Audience & Format Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Audience</label>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setAudience('Student')}
                  className={`py-1.5 rounded-md font-semibold text-xs transition-colors flex items-center justify-center space-x-1 ${
                    audience === 'Student' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student</span>
                </button>
                <button
                  onClick={() => setAudience('Faculty')}
                  className={`py-1.5 rounded-md font-semibold text-xs transition-colors flex items-center justify-center space-x-1 ${
                    audience === 'Faculty' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Faculty</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message Length</label>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setLength('Short')}
                  className={`py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    length === 'Short' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Short Digest
                </button>
                <button
                  onClick={() => setLength('Detailed')}
                  className={`py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    length === 'Detailed' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Detailed View
                </button>
              </div>
            </div>
          </div>

          {/* Formatted Text Preview Box */}
          <div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold mb-1">
              <span>Formatted Opportunity Announcement</span>
              <span className="font-mono text-emerald-400 font-normal">Ready to Dispatch</span>
            </div>
            <textarea
              readOnly
              value={messageText}
              rows={7}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-sans text-xs text-slate-200 focus:outline-none select-all"
            />
          </div>

          {/* Send Direct WhatsApp to Given Number Input */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <label className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Send WhatsApp Alert to Given Phone Number</label>
              </div>
              <span className="text-[10px] text-slate-400">Direct WhatsApp API</span>
            </div>
            <form onSubmit={handleSendCustomWhatsApp} className="flex items-center space-x-2">
              <input
                type="tel"
                placeholder="Enter mobile number with country code (e.g. +91 98765 43210)"
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                className="flex-1 bg-slate-950 border border-emerald-500/40 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
              <button
                type="submit"
                disabled={!targetPhone.trim()}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center space-x-1 shadow-md transition-all"
              >
                <span>Send WhatsApp Alert</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={handlePrintSummary}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold rounded-lg flex items-center space-x-1 border border-slate-700"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Summary</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-white font-semibold rounded-lg flex items-center space-x-1 border border-slate-700"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleShareMail}
                className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-md shadow-cyan-950/40"
              >
                <span>Share via Mail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleOpenWhatsAppWeb}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-md shadow-emerald-950/40"
              >
                <span>Share via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
