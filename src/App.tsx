/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StudentPortal } from './components/StudentPortal';
import { FacultyPortal } from './components/FacultyPortal';
import { AdminPortal } from './components/AdminPortal';
import { EventDetailModal } from './components/EventDetailModal';
import { ClubDetailModal } from './components/ClubDetailModal';
import { TicketPassModal } from './components/TicketPassModal';
import { CertificateModal } from './components/CertificateModal';
import { FeedbackModal } from './components/FeedbackModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LoginPage } from './components/LoginPage';
import { CampusEvent, CampusClub, EventRegistration } from './types';
import { 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';

function CampusSyncApp() {
  const { currentUser, setUserRole, events, clubs, registrations, isAuthenticated } = useApp();

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [selectedClub, setSelectedClub] = useState<CampusClub | null>(null);
  const [ticketRegistration, setTicketRegistration] = useState<EventRegistration | null>(null);
  const [certificateRegistration, setCertificateRegistration] = useState<EventRegistration | null>(null);
  const [feedbackEvent, setFeedbackEvent] = useState<CampusEvent | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Helper to open pass modal by eventId
  const handleOpenPass = (eventId: string) => {
    const reg = registrations.find(
      r => r.eventId === eventId && r.userId === currentUser.id && r.status !== 'cancelled'
    ) || registrations.find(r => r.eventId === eventId);
    
    if (reg) {
      setTicketRegistration(reg);
    }
  };

  // If user is not authenticated, show the Login / Registration Portal Page
  if (!isAuthenticated) {
    return <LoginPage onOpenProposal={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      
      {/* Navigation */}
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        activeTab={currentUser.role}
        setActiveTab={(tab) => setUserRole(tab as any)}
      />

      {/* Role Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 overflow-x-auto">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2 hidden sm:inline">
                Active Portal View:
              </span>
              
              <button
                onClick={() => setUserRole('student')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentUser.role === 'student'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Hub</span>
              </button>

              <button
                onClick={() => setUserRole('faculty')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentUser.role === 'faculty'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Faculty Coordinator</span>
              </button>

              <button
                onClick={() => setUserRole('admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Office</span>
              </button>
            </div>

            {/* Official Status Indicator */}
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Academic Session 2026-27 &bull; Live Campus Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentUser.role === 'student' && (
          <StudentPortal
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            onSelectClub={(c) => setSelectedClub(c)}
            onOpenPass={handleOpenPass}
            onOpenFeedback={(evt) => setFeedbackEvent(evt)}
            onOpenCertificate={(reg) => setCertificateRegistration(reg)}
          />
        )}

        {currentUser.role === 'faculty' && (
          <FacultyPortal
            onSelectEvent={(evt) => setSelectedEvent(evt)}
          />
        )}

        {currentUser.role === 'admin' && (
          <AdminPortal
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            onSelectClub={(c) => setSelectedClub(c)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              CS
            </div>
            <div>
              <p className="font-bold text-slate-200">CampusSync &bull; Campus &amp; Club Event Management System</p>
              <p className="text-[11px] text-slate-400">Apex Institute of Technology &bull; Office of Student Affairs &amp; Campus Life</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Official University System</span>
            <span>&bull;</span>
            <span>Role-Based Access Control</span>
            <span>&bull;</span>
            <span>Digital Passes &amp; Certificates</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenPass={(eventId) => {
          setSelectedEvent(null);
          handleOpenPass(eventId);
        }}
        onOpenFeedback={(evt) => {
          setSelectedEvent(null);
          setFeedbackEvent(evt);
        }}
      />

      {/* Club Details Modal */}
      <ClubDetailModal
        club={selectedClub}
        onClose={() => setSelectedClub(null)}
        onSelectEvent={(eventId) => {
          setSelectedClub(null);
          const found = events.find(e => e.id === eventId);
          if (found) setSelectedEvent(found);
        }}
      />

      {/* Boarding Pass / QR Ticket Modal */}
      <TicketPassModal
        registration={ticketRegistration}
        onClose={() => setTicketRegistration(null)}
      />

      {/* Verifiable Participation Certificate Modal */}
      <CertificateModal
        registration={certificateRegistration}
        onClose={() => setCertificateRegistration(null)}
      />

      {/* Feedback & Review Modal */}
      <FeedbackModal
        event={feedbackEvent}
        onClose={() => setFeedbackEvent(null)}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectEvent={(eventId) => {
          const found = events.find(e => e.id === eventId);
          if (found) setSelectedEvent(found);
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CampusSyncApp />
    </AppProvider>
  );
}
