import React from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Activity, 
  Settings, 
  RefreshCw, 
  Sparkles,
  User,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onOpenNotifications: () => void;
  onOpenDigest: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAdmin,
  onOpenNotifications,
  onOpenDigest,
  onOpenAuth
}) => {
  const { 
    unreadCount, 
    theme, 
    toggleTheme, 
    liveSimulationActive, 
    toggleLiveSimulation, 
    isSyncing, 
    triggerManualSync,
    sources,
    currentUser,
    logoutUser,
    isAdminAuthenticated
  } = usePlatform();

  const healthySources = sources.filter(s => s.health.status === 'healthy').length;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-slate-100 select-none">
      {/* Brand Title & Mission */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-tr from-cyan-600 to-blue-600 p-2 rounded-lg text-white shadow-md shadow-cyan-900/30 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center space-x-2">
              <span>INNOVATION INTELLIGENCE</span>
              <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono font-semibold">
                ENTERPRISE
              </span>
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
            Autonomous Discovery Engine • <span className="text-cyan-400">NO STUDENT MISSES ANY OPPORTUNITY</span>
          </p>
        </div>
      </div>

      {/* Global Quick Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-lg px-3 py-1.5 flex items-center justify-between text-sm text-slate-400 transition-all group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span>Search opportunities, AI hackathons, grants...</span>
          </div>
          <kbd className="hidden sm:inline-block bg-slate-850 text-slate-400 font-mono text-[10px] px-1.5 py-0.5 rounded border border-slate-700">
            Press / or Cmd+K
          </kbd>
        </button>
      </div>

      {/* Real-time System Status & Actions */}
      <div className="flex items-center space-x-2">
        {/* Live Auto Sync Toggle */}
        <button
          onClick={toggleLiveSimulation}
          title={liveSimulationActive ? 'Auto Discovery Active' : 'Auto Discovery Paused'}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
            liveSimulationActive 
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300' 
              : 'bg-slate-850 border-slate-750 text-slate-400'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${liveSimulationActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          <span className="hidden lg:inline">{liveSimulationActive ? 'LIVE DISCOVERY' : 'PAUSED'}</span>
        </button>

        {/* Source Health Badge */}
        <div className="hidden xl:flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-xs text-slate-400 font-mono">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>{healthySources}/{sources.length} SOURCES ONLINE</span>
        </div>

        {/* Manual Sync Trigger */}
        <button
          onClick={() => triggerManualSync()}
          disabled={isSyncing}
          title="Run Immediate Sync Cycle Across All Adapters"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
        </button>

        {/* Daily Email Digest Button */}
        <button
          onClick={onOpenDigest}
          title="Generate Daily Innovation Email Digest"
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/80 text-cyan-300 text-xs font-semibold transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>DAILY DIGEST</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white transition-all"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Auth Profile Button */}
        {currentUser ? (
          <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-5 h-5 rounded-full" />
            ) : (
              <User className="w-4 h-4 text-cyan-400" />
            )}
            <span className="text-xs font-bold text-slate-200 hidden lg:inline max-w-[100px] truncate">{currentUser.name}</span>
            <button onClick={logoutUser} title="Sign Out" className="text-slate-400 hover:text-rose-400 p-0.5">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950/50"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}

        {/* Admin Settings Button */}
        <button
          onClick={onOpenAdmin}
          title="Platform Control Studio & Source Scheduler"
          className={`p-2 rounded-lg border transition-all ${
            isAdminAuthenticated ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          {isAdminAuthenticated ? <ShieldCheck className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          title="Toggle Light / Dark Mode"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
    </header>
  );
};
