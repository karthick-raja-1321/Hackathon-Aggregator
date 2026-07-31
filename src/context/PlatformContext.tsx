import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Opportunity, SourceConfig, RecipientGroup, PlatformNotification, UserProfile } from '../types/opportunity';
import { OpportunityRepository } from '../repositories/OpportunityRepository';
import { SchedulerEngine, SyncCycleReport } from '../engine/scheduler/SchedulerEngine';
import { SearchFilterState, SearchEngine } from '../services/SearchEngine';

interface PlatformContextType {
  // User & Admin Authentication
  currentUser: UserProfile | null;
  loginUser: (profile: UserProfile) => void;
  registerUser: (profile: Omit<UserProfile, 'id'>) => void;
  logoutUser: () => void;
  
  isAdminAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Opportunities & Filtering
  opportunities: Opportunity[];
  filteredOpportunities: Opportunity[];
  filterState: SearchFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (op: Opportunity | null) => void;

  // Real-time Actions
  toggleBookmark: (id: string) => void;
  toggleWatch: (id: string) => void;
  addOpportunity: (op: Opportunity) => void;
  updateOpportunity: (op: Opportunity) => void;

  // Auto Discovery & Scheduler Engine
  scheduler: SchedulerEngine;
  sources: SourceConfig[];
  syncReports: SyncCycleReport[];
  isSyncing: boolean;
  triggerManualSync: (sourceId?: string) => Promise<void>;
  updateSourceConfig: (source: SourceConfig) => void;

  // Notifications
  notifications: PlatformNotification[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Recipient Management
  recipients: RecipientGroup[];
  addRecipientGroup: (group: RecipientGroup) => void;
  updateRecipientGroup: (group: RecipientGroup) => void;
  deleteRecipientGroup: (id: string) => void;

  // Theme & Live Simulation
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  liveSimulationActive: boolean;
  toggleLiveSimulation: () => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const schedulerEngineInstance = new SchedulerEngine();

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => OpportunityRepository.loadOpportunities());
  const [filterState, setFilterState] = useState<SearchFilterState>({ query: '', primaryCategory: 'ALL' });
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const [sources, setSources] = useState<SourceConfig[]>(() => schedulerEngineInstance.getSources());
  const [syncReports, setSyncReports] = useState<SyncCycleReport[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<PlatformNotification[]>(() => OpportunityRepository.loadNotifications());
  const [recipients, setRecipients] = useState<RecipientGroup[]>(() => OpportunityRepository.loadRecipients());

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('iop_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('iop_admin_auth') === 'true';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [liveSimulationActive, setLiveSimulationActive] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    OpportunityRepository.saveOpportunities(opportunities);
  }, [opportunities]);

  useEffect(() => {
    OpportunityRepository.saveNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    OpportunityRepository.saveRecipients(recipients);
  }, [recipients]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('iop_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('iop_user');
    }
  }, [currentUser]);

  // Sync Theme to HTML Element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // User Auth Actions
  const loginUser = (profile: UserProfile) => {
    const fullProfile = { ...profile, id: profile.id || `user-${Date.now()}` };
    setCurrentUser(fullProfile);
    setToastMessage(`Welcome back, ${fullProfile.name}!`);
  };

  const registerUser = (profile: Omit<UserProfile, 'id'>) => {
    const fullProfile: UserProfile = { ...profile, id: `user-${Date.now()}` };
    setCurrentUser(fullProfile);
    setToastMessage(`Account created successfully! Welcome ${fullProfile.name}`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setToastMessage('Signed out of workspace.');
  };

  // Admin Auth Actions (Username: Karthickraja38, Password: Inno@sece)
  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === 'Karthickraja38' && pass.trim() === 'Inno@sece') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('iop_admin_auth', 'true');
      setToastMessage('Authenticated as Admin (Karthickraja38)');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('iop_admin_auth');
    setToastMessage('Logged out of Admin Studio.');
  };

  // Derived Filtered Opportunities
  const filteredOpportunities = React.useMemo(() => {
    return SearchEngine.filterOpportunities(opportunities, filterState);
  }, [opportunities, filterState]);

  const unreadCount = React.useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Actions
  const toggleBookmark = (id: string) => {
    setOpportunities(prev => prev.map(op => {
      if (op.id === id) {
        const isBookmarked = !op.isBookmarked;
        setToastMessage(isBookmarked ? `Bookmarked "${op.title}"` : `Removed bookmark from "${op.title}"`);
        return { ...op, isBookmarked };
      }
      return op;
    }));
  };

  const toggleWatch = (id: string) => {
    setOpportunities(prev => prev.map(op => {
      if (op.id === id) {
        const isWatched = !op.isWatched;
        setToastMessage(isWatched ? `Watching for live change alerts on "${op.title}"` : `Stopped watching "${op.title}"`);
        return { ...op, isWatched };
      }
      return op;
    }));
  };

  const addOpportunity = (newOp: Opportunity) => {
    setOpportunities(prev => [newOp, ...prev]);
    setToastMessage(`New Opportunity Added: ${newOp.title}`);
  };

  const updateOpportunity = (updatedOp: Opportunity) => {
    setOpportunities(prev => prev.map(o => o.id === updatedOp.id ? updatedOp : o));
    setToastMessage(`Updated: ${updatedOp.title}`);
  };

  // Scheduler Actions
  const triggerManualSync = useCallback(async (sourceId?: string) => {
    setIsSyncing(true);
    setToastMessage(sourceId ? 'Syncing source adapter...' : 'Syncing all auto-discovery sources...');
    try {
      const res = await schedulerEngineInstance.executeSync(sourceId, opportunities);
      setSyncReports(prev => [...res.reports, ...prev]);
      setSources(schedulerEngineInstance.getSources());

      if (res.newOps.length > 0) {
        setOpportunities(prev => [...res.newOps, ...prev]);
      }

      if (res.notifications.length > 0) {
        setNotifications(prev => [...res.notifications, ...prev]);
      }

      const totalNew = res.reports.reduce((acc, r) => acc + r.newDiscovered, 0);
      const totalUpdated = res.reports.reduce((acc, r) => acc + r.updatedCount, 0);
      setToastMessage(`Sync Complete: ${totalNew} New, ${totalUpdated} Updated opportunities found.`);
    } catch (err: any) {
      setToastMessage(`Sync Error: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  }, [opportunities]);

  const updateSourceConfig = (src: SourceConfig) => {
    schedulerEngineInstance.updateSourceConfig(src);
    setSources(schedulerEngineInstance.getSources());
    setToastMessage(`Updated schedule configuration for ${src.name}`);
  };

  // Notification Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setToastMessage('Notifications cleared');
  };

  // Recipient Actions
  const addRecipientGroup = (group: RecipientGroup) => {
    setRecipients(prev => [...prev, group]);
    setToastMessage(`Added recipient group: ${group.name}`);
  };

  const updateRecipientGroup = (group: RecipientGroup) => {
    setRecipients(prev => prev.map(g => g.id === group.id ? group : g));
    setToastMessage(`Updated group: ${group.name}`);
  };

  const deleteRecipientGroup = (id: string) => {
    setRecipients(prev => prev.filter(g => g.id !== id));
    setToastMessage(`Deleted group`);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLiveSimulation = () => {
    setLiveSimulationActive(prev => !prev);
    setToastMessage(!liveSimulationActive ? 'Live Real-time Auto Discovery Enabled' : 'Live Discovery Simulation Paused');
  };

  // Live Auto-Discovery Background Tick Simulation (every 25 seconds)
  useEffect(() => {
    if (!liveSimulationActive) return;

    const interval = setInterval(() => {
      // Simulate live change detection tick
      const randomOp = opportunities[Math.floor(Math.random() * opportunities.length)];
      if (randomOp && Math.random() > 0.6) {
        const notifTypes = [
          `Live Discovery: Round 2 schedule updated for "${randomOp.title.slice(0, 25)}..."`,
          `Reminder: "${randomOp.title.slice(0, 25)}..." closing in ${randomOp.priority.urgencyDays} days`,
          `Auto-Discovery: Verified official brochure for ${randomOp.organizer}`
        ];
        const msg = notifTypes[Math.floor(Math.random() * notifTypes.length)];
        setToastMessage(msg);
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [liveSimulationActive, opportunities]);

  return (
    <PlatformContext.Provider value={{
      currentUser,
      loginUser,
      registerUser,
      logoutUser,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      opportunities,
      filteredOpportunities,
      filterState,
      setFilterState,
      selectedOpportunity,
      setSelectedOpportunity,
      toggleBookmark,
      toggleWatch,
      addOpportunity,
      updateOpportunity,
      scheduler: schedulerEngineInstance,
      sources,
      syncReports,
      isSyncing,
      triggerManualSync,
      updateSourceConfig,
      notifications,
      unreadCount,
      markNotificationAsRead,
      clearAllNotifications,
      recipients,
      addRecipientGroup,
      updateRecipientGroup,
      deleteRecipientGroup,
      theme,
      toggleTheme,
      liveSimulationActive,
      toggleLiveSimulation,
      toastMessage,
      setToastMessage
    }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
