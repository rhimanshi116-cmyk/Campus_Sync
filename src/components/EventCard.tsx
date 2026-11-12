import React from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { CampusEvent } from '../types';
import { useApp } from '../context/AppContext';

interface EventCardProps {
  event: CampusEvent;
  onSelect: (event: CampusEvent) => void;
  onQuickRegister?: (eventId: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Technical: 'bg-blue-100 text-blue-800 border-blue-200',
  Workshop: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Cultural: 'bg-purple-100 text-purple-800 border-purple-200',
  Hackathon: 'bg-rose-100 text-rose-800 border-rose-200',
  Sports: 'bg-amber-100 text-amber-800 border-amber-200',
  Academic: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  Entrepreneurship: 'bg-violet-100 text-violet-800 border-violet-200',
};

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect, onQuickRegister }) => {
  const { currentUser, registrations } = useApp();

  const isRegistered = registrations.some(
    r => r.eventId === event.id && r.userId === currentUser.id && r.status !== 'cancelled'
  );

  const isFull = event.registeredCount >= event.capacity;
  const isCompleted = event.status === 'completed';
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  return (
    <div 
      onClick={() => onSelect(event)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-xs shadow-xs ${
            CATEGORY_COLORS[event.category] || 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
          }`}>
            {event.category}
          </span>
          {event.isFeatured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 shadow-xs">
              ★ Featured
            </span>
          )}
        </div>

        {/* Registered status indicator */}
        {isRegistered && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pass Booked</span>
          </div>
        )}

        {/* Club Label */}
        <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold drop-shadow-sm flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          <span className="truncate max-w-[240px] text-indigo-100">{event.clubName}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2 leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Meta Pills */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-medium text-slate-700 dark:text-slate-300">{event.date}</span>
            <span className="text-slate-300 dark:text-slate-600">&bull;</span>
            <span className="text-slate-500 dark:text-slate-400 truncate">{event.time}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate text-slate-600 dark:text-slate-300">{event.venue}</span>
          </div>
        </div>

        {/* Seats progress */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{event.registeredCount} / {event.capacity} registered</span>
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-300">{percentFilled}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${isFull ? 'bg-rose-500' : 'bg-indigo-600'}`}
              style={{ width: `${percentFilled}%` }}
            ></div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-2 flex items-center justify-between">
          {event.averageRating ? (
            <div className="flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{event.averageRating}</span>
              <span className="text-slate-400 font-normal text-[10px]">(reviews)</span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-400">{event.eligibility}</span>
          )}

          <span className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>
      </div>
    </div>
  );
};
