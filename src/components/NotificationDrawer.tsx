import React from 'react';
import { X, Bell, Check, Ticket, Calendar, Users, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent?: (eventId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectEvent
}) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-500/20 rounded-xl">
              <Bell className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Campus Notifications</h3>
              <p className="text-xs text-slate-400">Updates, ticket passes, and alerts</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-indigo-300 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition"
              title="Mark all as read"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No notifications at the moment</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.linkId && onSelectEvent) {
                    onSelectEvent(notif.linkId);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition ${
                  notif.read
                    ? 'bg-slate-50 border-slate-200 text-slate-700 opacity-80'
                    : 'bg-indigo-50/60 border-indigo-200 text-slate-900 font-medium shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {notif.type === 'registration' && <Ticket className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {notif.type === 'event' && <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />}
                    {notif.type === 'club' && <Users className="w-4 h-4 text-purple-600 shrink-0" />}
                    {notif.type === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                    <h4 className="font-bold text-xs">{notif.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                </div>
                <p className="mt-1.5 text-slate-600 pl-6 text-[11px] leading-relaxed">
                  {notif.message}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
