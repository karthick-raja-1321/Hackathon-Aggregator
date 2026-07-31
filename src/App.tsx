import { useState, useEffect } from 'react';
import { usePlatform } from './context/PlatformContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { Footer } from './components/layout/Footer';
import { OpportunityFeed } from './components/feed/OpportunityFeed';
import { OpportunityDetailModal } from './components/detail/OpportunityDetailModal';
import { ShareModal } from './components/sharing/ShareModal';
import { DailyDigestModal } from './components/digest/DailyDigestModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { NotificationModal } from './components/notifications/NotificationModal';
import { SearchModal } from './components/search/SearchModal';
import { Opportunity } from './types/opportunity';

export default function App() {
  const { selectedOpportunity, setSelectedOpportunity } = usePlatform();

  const [shareOpportunity, setShareOpportunity] = useState<Opportunity | null>(null);
  const [showDigestModal, setShowDigestModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) && !showSearchModal) {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearchModal]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
      
      {/* Top Enterprise Header */}
      <Header
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenNotifications={() => setShowNotificationModal(true)}
        onOpenDigest={() => setShowDigestModal(true)}
      />

      {/* Main Operational Workspace Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Category & Filter Sidebar */}
        <Sidebar />

        {/* Center Opportunity Feed */}
        <OpportunityFeed
          onSelectOpportunity={(op) => setSelectedOpportunity(op)}
          onShareOpportunity={(op) => setShareOpportunity(op)}
        />

        {/* Right Urgent Deadlines & Audit Log Sidebar */}
        <RightSidebar
          onSelectOpportunity={(op) => setSelectedOpportunity(op)}
        />
      </div>

      {/* Footer with Creator Credits */}
      <Footer />

      {/* Overlays & Modals */}
      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onShare={(op) => setShareOpportunity(op)}
        />
      )}

      {shareOpportunity && (
        <ShareModal
          opportunity={shareOpportunity}
          onClose={() => setShareOpportunity(null)}
        />
      )}

      {showDigestModal && (
        <DailyDigestModal
          onClose={() => setShowDigestModal(false)}
        />
      )}

      {showAdminModal && (
        <AdminPanel
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {showNotificationModal && (
        <NotificationModal
          onClose={() => setShowNotificationModal(false)}
        />
      )}

      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );
}
