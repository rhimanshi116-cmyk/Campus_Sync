import React from 'react';
import { 
  X, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  Mail, 
  CheckCircle2, 
  ExternalLink,
  UserPlus,
  UserMinus,
  Sparkles
} from 'lucide-react';
import { CampusClub } from '../types';
import { useApp } from '../context/AppContext';

interface ClubDetailModalProps {
  club: CampusClub | null;
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
}

export const ClubDetailModal: React.FC<ClubDetailModalProps> = ({ club, onClose, onSelectEvent }) => {
  const { currentUser, joinClub, leaveClub, events } = useApp();

  if (!club) return null;

  const isMember = currentUser.joinedClubIds.includes(club.id);
  const clubEvents = events.filter(e => e.clubId === club.id);

  const handleToggleMembership = () => {
    if (isMember) {
      if (window.confirm(`Leave ${club.name}?`)) {
        leaveClub(club.id);
      }
    } else {
      joinClub(club.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Cover & Header */}
        <div className="relative h-48 w-full bg-slate-900 shrink-0">
          <img
            src={club.coverImage}
            alt={club.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Club Logo & Title */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end space-x-4">
            <img
              src={club.logo}
              alt={club.name}
              className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-lg bg-white shrink-0"
            />
            <div className="text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                {club.category} &bull; Est. {club.foundedYear}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {club.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Members</span>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">{club.memberCount}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Club Code</span>
              <p className="text-base font-extrabold text-indigo-600 mt-0.5 font-mono">{club.code}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Events Hosted</span>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">{clubEvents.length}</p>
            </div>
          </div>

          {/* About Club */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">About the Club</h4>
            <p className="text-xs text-slate-700 leading-relaxed">{club.description}</p>
          </div>

          {/* Logistics & Meetings */}
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
              <div className="flex items-center space-x-1.5 text-indigo-700 font-bold">
                <Clock className="w-4 h-4" />
                <span>Regular Meetings</span>
              </div>
              <p className="text-slate-700 font-medium">{club.meetingSchedule}</p>
            </div>

            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
              <div className="flex items-center space-x-1.5 text-indigo-700 font-bold">
                <MapPin className="w-4 h-4" />
                <span>Club Headquarters / Room</span>
              </div>
              <p className="text-slate-700 font-medium">{club.roomNumber}</p>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Executive Leadership
            </h4>
            
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400">Faculty Advisor</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{club.facultyAdvisor}</p>
                <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-400" /> {club.email}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400">Student President</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{club.studentLead}</p>
                <span className="inline-block mt-1 text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                  Elected 2026 Term
                </span>
              </div>
            </div>

            {club.leadership && club.leadership.length > 0 && (
              <div className="flex items-center space-x-3 pt-2">
                <span className="text-xs text-slate-500 font-semibold">Core Committee:</span>
                <div className="flex items-center space-x-2">
                  {club.leadership.map((member, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-[11px]">
                      <img src={member.avatar} alt={member.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="font-semibold text-slate-700">{member.name}</span>
                      <span className="text-slate-400">({member.role})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Achievements */}
          {club.achievements && club.achievements.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Recent Accolades &amp; Milestones</span>
              </h4>
              <div className="space-y-1.5">
                {club.achievements.map((ach, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs text-slate-700 flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events by this club */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Events Hosted by {club.name}
            </h4>
            {clubEvents.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No scheduled events at this time.</p>
            ) : (
              <div className="space-y-2">
                {clubEvents.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onClose();
                      onSelectEvent(evt.id);
                    }}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{evt.title}</p>
                      <p className="text-slate-500 text-[11px]">{evt.date} &bull; {evt.venue}</p>
                    </div>
                    <span className="text-indigo-600 font-bold hover:underline">
                      View &rarr;
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isMember && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Member
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleMembership}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                isMember
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isMember ? (
                <>
                  <UserMinus className="w-4 h-4" />
                  <span>Leave Club</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Join Club Community</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
