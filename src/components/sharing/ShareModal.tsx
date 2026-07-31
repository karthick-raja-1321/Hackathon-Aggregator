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

interface ShareModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ opportunity, onClose }) => {
  const [audience, setAudience] = useState<'Student' | 'Faculty'>('Student');
  const [length, setLength] = useState<'Short' | 'Detailed'>('Detailed');
  const [copied, setCopied] = useState<boolean>(false);

  const messageText = SharingService.generateWhatsAppMessage(opportunity, audience, length);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsAppWeb = () => {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://web.whatsapp.com/send?text=${encoded}`, '_blank');
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
            <h2 className="text-base font-bold text-white">WhatsApp & Circular Sharing Generator</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
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
              <span>WhatsApp Ready Formatted Message</span>
              <span className="font-mono text-emerald-400 font-normal">Ready to Copy & Paste</span>
            </div>
            <textarea
              readOnly
              value={messageText}
              rows={10}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-sans text-xs text-slate-200 focus:outline-none select-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={handlePrintSummary}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold rounded-lg flex items-center space-x-1.5 border border-slate-700"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Poster Summary</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white font-semibold rounded-lg flex items-center space-x-1.5 border border-slate-700"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
              </button>

              <button
                onClick={handleOpenWhatsAppWeb}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-lg shadow-emerald-950/40"
              >
                <span>Launch WhatsApp Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
