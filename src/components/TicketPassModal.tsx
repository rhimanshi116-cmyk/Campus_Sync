import React from 'react';
import { X, Calendar, MapPin, Clock, Download, Printer, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { EventRegistration } from '../types';

interface TicketPassModalProps {
  registration: EventRegistration | null;
  onClose: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({ registration, onClose }) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    // Generate .ics calendar download
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apex Institute//CampusSync Events//EN
BEGIN:VEVENT
SUMMARY:${registration.eventTitle}
DESCRIPTION:Campus Event pass for ${registration.userName} (Ticket #${registration.ticketCode})
LOCATION:${registration.eventVenue}
DTSTART:${registration.eventDate.replace(/-/g, '')}T090000Z
DTEND:${registration.eventDate.replace(/-/g, '')}T170000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${registration.ticketCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition backdrop-blur-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Boarding Pass Header */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 text-white p-6 pt-7 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
          
          <div className="flex items-center space-x-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Apex Institute &bull; Digital Event Pass</span>
          </div>

          <h3 className="text-xl font-extrabold leading-snug text-white mb-3">
            {registration.eventTitle}
          </h3>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{registration.status === 'attended' ? 'Attendance Verified' : 'Confirmed Registration'}</span>
          </div>
        </div>

        {/* Cutout notch effect */}
        <div className="relative bg-white py-1">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800/80 rounded-full"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800/80 rounded-full"></div>
          <div className="border-b-2 border-dashed border-slate-200 mx-5 my-2"></div>
        </div>

        {/* Pass Details */}
        <div className="p-6 bg-white space-y-5">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">Attendee Name</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{registration.userName}</p>
              <p className="text-slate-500 text-[11px]">{registration.studentId}</p>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">Department</span>
              <p className="font-bold text-slate-800 text-xs mt-0.5 truncate">{registration.department}</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2.5 text-slate-700">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-medium">{registration.eventDate}</span>
            </div>
            <div className="flex items-center space-x-2.5 text-slate-700">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{registration.eventTime}</span>
            </div>
            <div className="flex items-center space-x-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="truncate">{registration.eventVenue}</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="pt-2 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            {/* High visual fidelity simulated QR code */}
            <div className="relative p-2 bg-white rounded-xl shadow-xs border border-slate-200">
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                {/* 3 Corner Anchor Squares */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="#1e1b4b" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" rx="1" fill="#4338ca" />

                <rect x="69" y="5" width="26" height="26" rx="4" fill="#1e1b4b" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" rx="1" fill="#4338ca" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="#1e1b4b" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" rx="1" fill="#4338ca" />

                {/* Simulated Data Grid */}
                <rect x="36" y="8" width="6" height="6" fill="#1e1b4b" />
                <rect x="46" y="8" width="6" height="6" fill="#1e1b4b" />
                <rect x="56" y="8" width="6" height="6" fill="#4338ca" />
                <rect x="36" y="18" width="6" height="6" fill="#4338ca" />
                <rect x="50" y="18" width="6" height="6" fill="#1e1b4b" />
                <rect x="60" y="18" width="6" height="6" fill="#1e1b4b" />
                
                <rect x="8" y="38" width="6" height="6" fill="#1e1b4b" />
                <rect x="18" y="38" width="6" height="6" fill="#4338ca" />
                <rect x="28" y="38" width="6" height="6" fill="#1e1b4b" />
                <rect x="38" y="38" width="8" height="8" rx="1" fill="#6366f1" />
                <rect x="50" y="38" width="6" height="6" fill="#1e1b4b" />
                <rect x="62" y="38" width="6" height="6" fill="#4338ca" />
                <rect x="72" y="38" width="6" height="6" fill="#1e1b4b" />
                <rect x="84" y="38" width="6" height="6" fill="#1e1b4b" />

                <rect x="38" y="50" width="6" height="6" fill="#1e1b4b" />
                <rect x="48" y="50" width="8" height="8" rx="1" fill="#6366f1" />
                <rect x="60" y="50" width="6" height="6" fill="#1e1b4b" />
                <rect x="70" y="50" width="6" height="6" fill="#4338ca" />

                <rect x="36" y="68" width="6" height="6" fill="#4338ca" />
                <rect x="46" y="68" width="6" height="6" fill="#1e1b4b" />
                <rect x="58" y="68" width="6" height="6" fill="#1e1b4b" />
                <rect x="70" y="68" width="6" height="6" fill="#1e1b4b" />
                <rect x="82" y="68" width="6" height="6" fill="#4338ca" />

                <rect x="36" y="80" width="6" height="6" fill="#1e1b4b" />
                <rect x="50" y="80" width="6" height="6" fill="#4338ca" />
                <rect x="64" y="80" width="6" height="6" fill="#1e1b4b" />
                <rect x="76" y="80" width="8" height="8" rx="1" fill="#1e1b4b" />
              </svg>
            </div>

            <div className="mt-3 text-center">
              <span className="font-mono font-bold tracking-widest text-indigo-950 text-sm bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200">
                {registration.ticketCode}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Scan this code at the registration desk for instant check-in
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition border border-indigo-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
