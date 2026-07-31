import React, { useEffect, useState } from 'react';
import { Zap, X } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage, setToastMessage } = usePlatform();
  const [progressWidth, setProgressWidth] = useState<number>(100);

  useEffect(() => {
    if (!toastMessage) return;

    // Reset progress bar
    setProgressWidth(100);

    // Start progress countdown timer
    const progressInterval = setTimeout(() => {
      setProgressWidth(0);
    }, 50);

    // Auto dismiss after 5000ms (5 seconds)
    const dismissTimer = setTimeout(() => {
      setToastMessage(null);
    }, 5000);

    return () => {
      clearTimeout(progressInterval);
      clearTimeout(dismissTimer);
    };
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full sm:w-auto bg-slate-900/95 border border-cyan-500/60 shadow-2xl shadow-cyan-950/60 text-slate-100 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 select-none">
      <div className="p-3.5 flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-2.5 flex-1 min-w-0">
          <div className="bg-cyan-950 p-1.5 rounded-lg border border-cyan-800/80 text-cyan-400 flex-shrink-0">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <p className="text-xs font-medium text-slate-200 leading-snug truncate">
            {toastMessage}
          </p>
        </div>

        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 5-Second Timeline Animation Bar */}
      <div className="w-full bg-slate-950 h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all ease-linear"
          style={{
            width: `${progressWidth}%`,
            transitionDuration: progressWidth === 0 ? '5000ms' : '0ms'
          }}
        />
      </div>
    </div>
  );
};
