import React, { useState } from 'react';
import { X, Mail, Lock, User, Building, CheckCircle2, Sparkles } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface AuthModalProps {
  onClose: () => void;
  titlePrompt?: string;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, titlePrompt, onSuccess }) => {
  const { loginUser, registerUser } = usePlatform();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all required credentials.');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
      registerUser({
        name,
        email,
        department,
        provider: 'email'
      });
    } else {
      loginUser({
        name: email.split('@')[0],
        email,
        department: 'CSE',
        provider: 'email'
      });
    }

    if (onSuccess) onSuccess();
    onClose();
  };

  const handleGoogleAuth = () => {
    loginUser({
      name: 'M. Karthick Raja',
      email: 'karthickraja@sece.ac.in',
      department: 'CSE',
      provider: 'google',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isCalendarSynced: true
    });
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 text-slate-100 relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1 bg-cyan-950 text-cyan-400 border border-cyan-800/80 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google & Mail Identity Sync</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {mode === 'signin' ? 'Sign In to Your Workspace' : 'Create New Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {titlePrompt || 'Sign in to map opportunities directly into your Google Calendar & receive custom digest alerts.'}
          </p>
        </div>

        {/* Google OAuth Quick Button */}
        <button
          onClick={handleGoogleAuth}
          type="button"
          className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[10px] text-slate-500 font-mono uppercase">or email authentication</span>
        </div>

        {error && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-300 text-xs p-2.5 rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. M. Karthick Raja"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Institutional Email ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                placeholder="name@sece.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Department</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="AIDS">AI & Data Science (AIDS)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="MECH">Mechanical Engineering (MECH)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="BME">Biomedical Engineering (BME)</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-cyan-950/50 transition-colors flex items-center justify-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Complete Account Registration'}</span>
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center text-xs text-slate-400">
          {mode === 'signin' ? (
            <span>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-cyan-400 hover:underline font-bold">
                Sign Up for Free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button onClick={() => setMode('signin')} className="text-cyan-400 hover:underline font-bold">
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
