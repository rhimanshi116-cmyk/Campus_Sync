import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Bell, 
  ChevronDown, 
  LogOut, 
  Sun, 
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  activeTab,
  setActiveTab
}) => {
  const { currentUser, allUsers, switchUser, setUserRole, notifications, logout } = useApp();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Theme toggle state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const rolesConfig: Record<UserRole, { label: string; badge: string; color: string }> = {
    student: {
      label: 'Student Portal',
      badge: 'Student',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    faculty: {
      label: 'Faculty / Coordinator Portal',
      badge: 'Faculty Member',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    },
    admin: {
      label: 'Admin Control Center',
      badge: 'University Admin',
      color: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  };

  const handleSelectRole = (userId: string) => {
    switchUser(userId);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top collegiate identity bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-[11px] px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold tracking-wide text-indigo-200">
            Apex Institute of Technology &bull; Office of Student Affairs &amp; Campus Life
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-300">Academic Session 2026-27</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight">CampusSync</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AIT Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Campus &amp; Club Event Management System
              </p>
            </div>
          </div>

          {/* Actions & Role Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Global Theme Toggle (Light / Dark Mode) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 pr-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl transition cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="text-left hidden md:block">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{currentUser.name}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${rolesConfig[currentUser.role].color}`}>
                      {rolesConfig[currentUser.role].badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{currentUser.studentIdOrEmpId}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Switch Active User / Role
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Apex Role-Based Campus Portal
                      </p>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    {allUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleSelectRole(user.id)}
                        className={`w-full flex items-center space-x-2.5 p-2 rounded-xl text-left transition cursor-pointer ${
                          user.id === currentUser.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</span>
                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${rolesConfig[user.role].color}`}>
                              {user.role}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.department}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-2 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                      onClick={() => {
                        setRoleDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out to Login Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Logout Button */}
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
              title="Log Out to Login Portal"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
