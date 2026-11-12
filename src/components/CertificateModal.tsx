import React from 'react';
import { X, Award, Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { EventRegistration } from '../types';

interface CertificateModalProps {
  registration: EventRegistration | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ registration, onClose }) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = `CERT-APEX-${registration.studentId}-${registration.eventId.slice(4, 9).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300">
        
        {/* Modal Controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 text-white">
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Official Event Participation Certificate</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 md:p-12 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 text-slate-900 relative">
          
          {/* Ornate Double Border */}
          <div className="border-4 border-double border-amber-700/60 p-6 md:p-8 rounded-xl relative">
            
            {/* Background Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <Award className="w-96 h-96 text-amber-900" />
            </div>

            {/* University Header */}
            <div className="text-center space-y-1 mb-6 relative">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-bold">
                Apex Institute of Technology &bull; Student Affairs Council
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-black tracking-wide text-slate-900 uppercase">
                Certificate of Participation
              </h2>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-4 my-6 relative">
              <p className="text-xs md:text-sm text-slate-600 italic font-serif">
                This is proudly presented to certify that
              </p>

              <div className="py-2">
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-indigo-950 underline decoration-amber-500/50 decoration-2 underline-offset-8">
                  {registration.userName}
                </h3>
                <p className="text-xs text-slate-500 mt-2 font-mono">
                  Roll No: {registration.studentId} &bull; {registration.department}
                </p>
              </div>

              <p className="text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                has actively participated in and successfully completed the university session on
              </p>

              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-300/40 max-w-xl mx-auto">
                <p className="font-bold text-sm md:text-base text-slate-900">
                  {registration.eventTitle}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Held on {registration.eventDate} at {registration.eventVenue}
                </p>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="grid grid-cols-3 items-end pt-8 mt-6 border-t border-amber-200/80">
              
              {/* Coordinator Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-lg text-indigo-900 border-b border-slate-300 pb-1 mx-4">
                  Dr. Sunita Rao
                </div>
                <p className="text-[11px] font-semibold text-slate-800">Faculty Coordinator</p>
                <p className="text-[10px] text-slate-500">Dept. of Computer Science</p>
              </div>

              {/* Official Gold Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500 bg-amber-100 flex flex-col items-center justify-center shadow-md relative">
                  <ShieldCheck className="w-8 h-8 text-amber-700" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-amber-900 mt-0.5">
                    Verified
                  </span>
                </div>
              </div>

              {/* Dean Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-lg text-indigo-900 border-b border-slate-300 pb-1 mx-4">
                  Prof. R. K. Verma
                </div>
                <p className="text-[11px] font-semibold text-slate-800">Dean, Student Welfare</p>
                <p className="text-[10px] text-slate-500">Apex Institute of Technology</p>
              </div>

            </div>

            {/* Verification Footer */}
            <div className="mt-8 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Certificate ID: {certificateId}</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Tamper-evident Digital Credential
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
