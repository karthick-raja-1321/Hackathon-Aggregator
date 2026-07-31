import React, { useState } from 'react';
import { X, ShieldAlert, Lock, User, KeyRound } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess }) => {
  const { loginAdmin } = usePlatform();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = loginAdmin(username, password);
    if (success) {
      onSuccess();
      onClose();
    } else {
      setError('Invalid Admin Credentials. Please enter the correct Username and Password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-5 text-slate-100 relative">
        
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1 bg-amber-950 text-amber-400 border border-amber-800/80 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Restricted Administrator Access</span>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Admin System Authentication</h2>
          <p className="text-xs text-slate-400">Enter your official admin credentials to open settings & source scheduler.</p>
        </div>

        {error && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-300 text-xs p-2.5 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Admin Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Username (e.g. Karthickraja38)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-cyan-950/50 transition-colors flex items-center justify-center space-x-1.5"
          >
            <KeyRound className="w-4 h-4" />
            <span>Authenticate Admin Studio</span>
          </button>
        </form>
      </div>
    </div>
  );
};
