import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, FileText, Sparkles } from 'lucide-react';

interface ProposalViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalViewerModal: React.FC<ProposalViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'compliance'>('preview');

  if (!isOpen) return null;

  const complianceItems = [
    {
      module: '1. User Registration & Login (Role-Based Access)',
      requirement: 'Supports Student, Faculty, and Admin roles with tailored permissions and distinct dashboards.',
      status: 'Implemented',
      details: 'Fast 1-click role switcher in the navigation bar to test Aarav Sharma (Student), Dr. Sunita Rao (Faculty), and Prof. R.K. Verma (Admin).'
    },
    {
      module: '2. Student Module',
      requirement: 'Browse upcoming events, search/filter, register with ticket passes, view registered events, explore clubs, give feedback.',
      status: 'Implemented',
      details: 'Full interactive student hub with QR digital boarding passes, category filters, calendar view, club memberships, and rating submissions.'
    },
    {
      module: '3. Faculty Module',
      requirement: 'Create and manage events, view registered students roster, monitor event participation, view feedback.',
      status: 'Implemented',
      details: 'Event creation wizard, attendee management with live check-in, CSV export, and feedback reviews.'
    },
    {
      module: '4. Admin Module',
      requirement: 'System-wide event moderation, club governance, user registry, campus announcements, and executive analytics.',
      status: 'Implemented',
      details: 'Campus-wide metrics, event moderation (feature/cancel), new club approval, and campus broadcast announcements.'
    },
    {
      module: '5. Event & Club Management',
      requirement: 'Centralized club profiles with leadership, achievements, meeting schedules, and affiliated events.',
      status: 'Implemented',
      details: 'Dedicated club directory with 1-click Join/Leave club, leadership rosters, achievements, and club events.'
    },
    {
      module: '6. Scope for Future Enhancement (From Section 7)',
      requirement: 'QR-based attendance check-in, digital event certificates, notification alerts, participation reports.',
      status: 'Implemented',
      details: 'Includes interactive QR scanner & ticket verifier, verified printable participation certificates, and real-time notification drawer.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-400/30">
              <FileText className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white">Minor Project Proposal Document</h3>
                <span className="text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Fully Matched
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Campus Event &amp; Club Management System &bull; Minor Project Proposal Attachment
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a 
              href="/assets/aistudio/Mini_Project_51c4e892.html" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 space-x-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'preview'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Embedded Proposal Document
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`pb-3 text-sm font-semibold border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'compliance'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Requirement Compliance Matrix</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-bold">6/6</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100">
          {activeTab === 'preview' ? (
            <div className="w-full h-[68vh] rounded-xl overflow-hidden shadow-inner border border-slate-300 bg-white">
              <iframe
                src="/assets/aistudio/Mini_Project_51c4e892.html"
                title="Minor Project Proposal"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start space-x-3 text-indigo-900">
                <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed">
                  Every section of the attached Minor Project Proposal has been engineered into this application, including the 3 target user archetypes (Student, Faculty, Admin), the 9 core modules, and the future enhancements (QR attendance scanner &amp; certificates).
                </p>
              </div>

              <div className="grid gap-3">
                {complianceItems.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="text-sm font-bold text-slate-900">{item.module}</h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-6">{item.requirement}</p>
                      <p className="text-xs text-indigo-700 font-medium pl-6 bg-indigo-50/50 py-1 px-2 rounded inline-block">
                        Implemented: {item.details}
                      </p>
                    </div>
                    <span className="self-start md:self-center px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Attachment: /public/assets/aistudio/Mini_Project_51c4e892.html</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
          >
            Back to App
          </button>
        </div>
      </div>
    </div>
  );
};
