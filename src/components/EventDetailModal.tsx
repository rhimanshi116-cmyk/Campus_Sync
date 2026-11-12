import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Mail, 
  Phone, 
  BookOpen, 
  Star,
  Ticket
} from 'lucide-react';
import { CampusEvent } from '../types';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface EventDetailModalProps {
  event: CampusEvent | null;
  onClose: () => void;
  onOpenPass: (eventId: string) => void;
  onOpenFeedback: (event: CampusEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenPass,
  onOpenFeedback
}) => {
  const { currentUser, registrations, registerForEvent, cancelRegistration } = useApp();

  if (!event) return null;

  const userRegistration = registrations.find(
    r => r.eventId === event.id && r.userId === currentUser.id && r.status !== 'cancelled'
  );

  const isFull = event.registeredCount >= event.capacity;
  const isPast = event.status === 'completed';

  const handleRegister = () => {
    const res = registerForEvent(event.id);
    if (res.success) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
      onOpenPass(event.id);
    }
  };

  const handleCancel = () => {
    if (userRegistration && window.confirm('Are you sure you want to cancel your pass for this event?')) {
      cancelRegistration(userRegistration.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Banner with Close & Badges */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Banner */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600/90 text-white backdrop-blur-xs shadow-xs">
              {event.category}
            </span>
            {event.isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 flex items-center gap-1 shadow-xs">
                ★ Featured
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize backdrop-blur-xs ${
              event.status === 'completed'
                ? 'bg-slate-700/90 text-slate-200'
                : isFull
                ? 'bg-rose-600/90 text-white'
                : 'bg-emerald-600/90 text-white'
            }`}>
              {event.status === 'completed' ? 'Completed' : isFull ? 'Capacity Full' : 'Open for Registration'}
            </span>
          </div>

          {/* Title & Host on Bottom of Banner */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <p className="text-xs text-indigo-300 font-semibold tracking-wide uppercase">
              Hosted by {event.clubName}
            </p>
            <h2 className="text-xl sm:text-2xl font-black leading-tight mt-1 text-white drop-shadow-xs">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-indigo-600 text-xs font-semibold mb-1">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{event.date}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-indigo-600 text-xs font-semibold mb-1">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate">{event.time}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-indigo-600 text-xs font-semibold mb-1">
                <MapPin className="w-4 h-4" />
                <span>Venue</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate" title={event.venue}>
                {event.venue}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-indigo-600 text-xs font-semibold mb-1">
                <Users className="w-4 h-4" />
                <span>Seats</span>
              </div>
              <p className="text-xs font-bold text-slate-800">
                {event.registeredCount} / {event.capacity}
              </p>
            </div>
          </div>

          {/* Seat Capacity Bar */}
          <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-700">Seat Reservation Status</span>
              <span className="text-indigo-700 font-bold">
                {Math.min(100, Math.round((event.registeredCount / event.capacity) * 100))}% Filled
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull ? 'bg-rose-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
              Event Overview
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {event.longDescription || event.description}
            </p>
          </div>

          {/* Eligibility & Prerequisites */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Eligibility</span>
              </h5>
              <p className="text-xs text-slate-600">{event.eligibility}</p>
            </div>

            {event.prerequisites && event.prerequisites.length > 0 && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Requirements &amp; Prerequisites</span>
                </h5>
                <ul className="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                  {event.prerequisites.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Agenda Timeline if present */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Event Schedule &amp; Agenda
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between bg-white hover:bg-slate-50">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-indigo-600 w-24 shrink-0">
                        {item.time}
                      </span>
                      <span className="text-slate-800 font-medium">{item.activity}</span>
                    </div>
                    {item.speaker && (
                      <span className="text-[11px] text-slate-500 italic bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.speaker}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-xl bg-indigo-50/40 border border-indigo-100">
              <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                Faculty Coordinator
              </span>
              <p className="font-bold text-slate-900 mt-0.5">{event.facultyCoordinator.name}</p>
              <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3" /> {event.facultyCoordinator.email}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/40 border border-purple-100">
              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                Student Coordinator
              </span>
              <p className="font-bold text-slate-900 mt-0.5">{event.studentCoordinator.name}</p>
              <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3" /> {event.studentCoordinator.contact}
              </p>
            </div>
          </div>

          {/* Average Rating if completed */}
          {event.averageRating && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-800">
                  Attendee Rating: {event.averageRating} / 5.0
                </span>
              </div>
              <button
                onClick={() => onOpenFeedback(event)}
                className="text-xs text-indigo-700 font-bold hover:underline"
              >
                View / Submit Feedback &rarr;
              </button>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 block">Registration Deadline</span>
            <span className="text-xs font-bold text-slate-800">{event.registrationDeadline}</span>
          </div>

          <div className="flex items-center space-x-2">
            {userRegistration ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  Cancel Pass
                </button>
                <button
                  onClick={() => onOpenPass(event.id)}
                  className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  <Ticket className="w-4 h-4" />
                  <span>View My QR Pass</span>
                </button>
              </div>
            ) : isPast ? (
              <button
                onClick={() => onOpenFeedback(event)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center space-x-1.5"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Give Feedback</span>
              </button>
            ) : isFull ? (
              <button
                disabled
                className="px-4 py-2.5 bg-slate-300 text-slate-600 text-xs font-bold rounded-xl cursor-not-allowed"
              >
                Registration Full
              </button>
            ) : (
              <button
                onClick={handleRegister}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center space-x-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>Register Now (Free Pass)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
