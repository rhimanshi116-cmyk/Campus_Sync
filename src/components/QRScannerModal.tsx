import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, AlertCircle, Search, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetEventId?: string;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, targetEventId }) => {
  const { registrations, markAttendance, events } = useApp();
  const [ticketInput, setTicketInput] = useState('');
  const [result, setResult] = useState<{
    success?: boolean;
    studentName?: string;
    eventTitle?: string;
    message?: string;
  } | null>(null);

  if (!isOpen) return null;

  // Filter registrations for the selected event or all active
  const relevantRegistrations = targetEventId 
    ? registrations.filter(r => r.eventId === targetEventId && r.status !== 'cancelled')
    : registrations.filter(r => r.status !== 'cancelled');

  const pendingAttendees = relevantRegistrations.filter(r => r.status === 'confirmed');
  const checkedInAttendees = relevantRegistrations.filter(r => r.status === 'attended');

  const handleVerify = (codeToVerify?: string) => {
    const code = (codeToVerify || ticketInput).trim();
    if (!code) return;

    const res = markAttendance(code);
    setResult(res);
    setTicketInput('');

    if (res.success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-400/30">
              <QrCode className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">QR Attendance Check-in Scanner</h3>
              <p className="text-xs text-slate-400">Live Pass Verification &bull; Attendance Terminal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Simulated Scanner Viewport with moving laser line */}
          <div className="relative h-48 bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-2 border-indigo-500/30 shadow-inner">
            {/* Animated Laser line */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-400 shadow-[0_0_15px_#10b981] animate-pulse"></div>
            
            {/* Corner viewfinder brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-400"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-400"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-400"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-400"></div>

            <QrCode className="w-16 h-16 text-slate-700/60" />
            <p className="text-xs text-indigo-300 font-medium mt-2 z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Optical Scanner Ready &bull; Aim QR code or enter code below
            </p>
          </div>

          {/* Manual / Quick Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Verify Ticket Code / Student ID
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. APEX-HACK-7492 or reg ID"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => handleVerify()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center space-x-1"
              >
                <UserCheck className="w-4 h-4" />
                <span>Verify</span>
              </button>
            </div>
          </div>

          {/* Verification Status Result */}
          {result && (
            <div className={`p-4 rounded-xl border flex items-start space-x-3 text-xs ${
              result.success 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              {result.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {result.success ? 'Attendance Verified!' : 'Check-in Notice'}
                </p>
                <p className="mt-0.5">{result.message}</p>
                {result.studentName && (
                  <p className="mt-1 font-semibold text-slate-800">
                    Student: {result.studentName} &bull; {result.eventTitle}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Quick Click Simulation for Registered Students */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Quick Test: Registered Attendees</span>
              <span className="text-slate-500">
                {checkedInAttendees.length} checked in &bull; {pendingAttendees.length} pending
              </span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              {relevantRegistrations.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No registrations found for this filter.</p>
              ) : (
                relevantRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs hover:bg-indigo-50/50 transition"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{reg.userName}</span>
                      <span className="text-slate-500 ml-2 font-mono text-[11px]">{reg.ticketCode}</span>
                      <p className="text-[10px] text-slate-500">{reg.department}</p>
                    </div>

                    {reg.status === 'attended' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Checked In
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerify(reg.ticketCode)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
                      >
                        Scan Pass
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
