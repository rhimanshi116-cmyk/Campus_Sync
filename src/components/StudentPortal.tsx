import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Ticket, 
  Users, 
  Star, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Grid, 
  CalendarDays,
  BookmarkCheck,
  Megaphone,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusEvent, CampusClub, EventCategory } from '../types';
import { EventCard } from './EventCard';

interface StudentPortalProps {
  onSelectEvent: (event: CampusEvent) => void;
  onSelectClub: (club: CampusClub) => void;
  onOpenPass: (eventId: string) => void;
  onOpenFeedback: (event: CampusEvent) => void;
  onOpenCertificate: (registration: any) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  onSelectEvent,
  onSelectClub,
  onOpenPass,
  onOpenFeedback,
  onOpenCertificate
}) => {
  const { currentUser, events, clubs, registrations, announcements } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'events' | 'passes' | 'clubs' | 'calendar'>('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClubFilter, setSelectedClubFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Technical',
    'Workshop',
    'Cultural',
    'Hackathon',
    'Sports',
    'Academic',
    'Entrepreneurship'
  ];

  // User's active registrations
  const myRegistrations = useMemo(() => {
    return registrations.filter(r => r.userId === currentUser.id && r.status !== 'cancelled');
  }, [registrations, currentUser.id]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = 
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
      const matchesClub = selectedClubFilter === 'All' || evt.clubId === selectedClubFilter;
      const matchesStatus = 
        statusFilter === 'all' 
          ? true 
          : statusFilter === 'upcoming' 
          ? evt.status === 'upcoming' 
          : evt.status === 'completed';

      return matchesSearch && matchesCategory && matchesClub && matchesStatus;
    });
  }, [events, searchQuery, selectedCategory, selectedClubFilter, statusFilter]);

  // Featured Event for Hero Banner
  const featuredEvent = events.find(e => e.isFeatured && e.status === 'upcoming') || events[0];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Priority Campus Announcement Banner */}
      {announcements.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-indigo-50 border border-amber-200/80 rounded-2xl p-4 flex items-start space-x-3 text-xs shadow-xs">
          <Megaphone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-amber-950 uppercase tracking-wider text-[10px] bg-amber-200/80 px-2 py-0.5 rounded mr-2">
              Campus Notice &bull; {announcements[0].priority.toUpperCase()}
            </span>
            <span className="font-bold text-slate-900">{announcements[0].title}</span>
            <p className="text-slate-600 mt-1">{announcements[0].message}</p>
          </div>
        </div>
      )}

      {/* Student Welcome & Hero Bar */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Welcome Back, {currentUser.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Discover Campus Life, Hackathons &amp; Societies
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Department of {currentUser.department} &bull; Roll: {currentUser.studentIdOrEmpId} &bull; {currentUser.year}
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex items-center space-x-3 shrink-0">
            <div 
              onClick={() => setActiveSubTab('passes')}
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition backdrop-blur-xs min-w-[100px]"
            >
              <Ticket className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <span className="text-xl sm:text-2xl font-black text-white">{myRegistrations.length}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">My Passes</p>
            </div>

            <div 
              onClick={() => setActiveSubTab('clubs')}
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition backdrop-blur-xs min-w-[100px]"
            >
              <Users className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <span className="text-xl sm:text-2xl font-black text-white">{currentUser.joinedClubIds.length}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">My Clubs</p>
            </div>

            <div 
              onClick={() => setActiveSubTab('passes')}
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition backdrop-blur-xs min-w-[100px]"
            >
              <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <span className="text-xl sm:text-2xl font-black text-white">
                {myRegistrations.filter(r => r.status === 'attended').length}
              </span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 overflow-x-auto pb-1">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveSubTab('events')}
            className={`flex items-center space-x-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeSubTab === 'events'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Explore Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('passes')}
            className={`flex items-center space-x-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeSubTab === 'passes'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>My Registered Passes &amp; Certificates</span>
            {myRegistrations.length > 0 && (
              <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-extrabold">
                {myRegistrations.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('clubs')}
            className={`flex items-center space-x-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeSubTab === 'clubs'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Campus Clubs &amp; Societies ({clubs.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('calendar')}
            className={`flex items-center space-x-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeSubTab === 'calendar'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Calendar Schedule</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXPLORE EVENTS */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">

          {/* Featured Spotlight Card */}
          {featuredEvent && (
            <div 
              onClick={() => onSelectEvent(featuredEvent)}
              className="relative rounded-3xl bg-slate-900 overflow-hidden cursor-pointer group shadow-lg border border-slate-200"
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={featuredEvent.bannerUrl}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
              </div>

              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="px-3 py-1 bg-amber-400 text-amber-950 text-xs font-black rounded-full shadow-md uppercase tracking-wider">
                  ★ Flagship Spotlight
                </span>
                <span className="px-3 py-1 bg-indigo-600/90 text-white text-xs font-bold rounded-full backdrop-blur-xs">
                  {featuredEvent.category}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
                  Hosted by {featuredEvent.clubName}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                  {featuredEvent.title}
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl line-clamp-2">
                  {featuredEvent.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-slate-200">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-indigo-400" /> {featuredEvent.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" /> {featuredEvent.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {featuredEvent.venue}</span>
                  <span className="text-indigo-300 font-bold underline ml-auto">Click for Details &amp; Registration &rarr;</span>
                </div>
              </div>
            </div>
          )}

          {/* Search & Filters Controls */}
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events by title, keyword, topic, or venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                />
              </div>

              {/* Status Filter */}
              <div className="flex rounded-xl bg-white dark:bg-slate-800 p-1 border border-slate-300 dark:border-slate-700 shrink-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    statusFilter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setStatusFilter('upcoming')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    statusFilter === 'upcoming' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    statusFilter === 'completed' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Past &amp; Reviews
                </button>
              </div>

              {/* Club Dropdown Filter */}
              <select
                value={selectedClubFilter}
                onChange={(e) => setSelectedClubFilter(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shrink-0"
              >
                <option value="All">All Clubs &amp; Societies</option>
                {clubs.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Category Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-semibold text-[11px] shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition text-xs ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Campus Activities</span>
                <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredEvents.length}
                </span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Click any card to register or inspect event schedule
              </span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-3">
                <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">No Events Matched Your Filters</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing the search query or changing category and club filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedClubFilter('All');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSelect={onSelectEvent}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: MY PASSES & CERTIFICATES */}
      {activeSubTab === 'passes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">My Registered Passes &amp; Credentials</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Digital Event Passes &bull; Show ticket QR code at the event venue to verify attendance and unlock your certificate
              </p>
            </div>
          </div>

          {myRegistrations.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-3">
              <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800 text-base">No Event Registrations Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore the upcoming workshops, competitions, and guest lectures to secure your spot.
              </p>
              <button
                onClick={() => setActiveSubTab('events')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
              >
                Browse Upcoming Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {myRegistrations.map((reg) => {
                const event = events.find(e => e.id === reg.eventId);
                const isAttended = reg.status === 'attended';

                return (
                  <div
                    key={reg.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-extrabold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200">
                          {reg.ticketCode}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isAttended
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        }`}>
                          {isAttended ? 'Attended & Verified' : 'Confirmed Pass'}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base leading-snug">
                        {reg.eventTitle}
                      </h4>

                      <div className="space-y-1 text-xs text-slate-600 pt-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{reg.eventDate} &bull; {reg.eventTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="truncate">{reg.eventVenue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenPass(reg.eventId)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition border border-indigo-200"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View QR Pass</span>
                      </button>

                      {isAttended ? (
                        <div className="flex items-center space-x-2">
                          {event && (
                            <button
                              onClick={() => onOpenFeedback(event)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl text-xs transition border border-amber-200"
                            >
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>Feedback</span>
                            </button>
                          )}
                          <button
                            onClick={() => onOpenCertificate(reg)}
                            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-xs"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            <span>Certificate</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Certificate unlocks upon venue check-in
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CLUBS DIRECTORY */}
      {activeSubTab === 'clubs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Campus Clubs &amp; Student Societies</h3>
              <p className="text-xs text-slate-500">
                Explore student organizations, join communities, connect with leads, and attend weekly meetings
              </p>
            </div>
            <div className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 self-start sm:self-auto">
              You are a member of {currentUser.joinedClubIds.length} societies
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clubs.map((club) => {
              const isJoined = currentUser.joinedClubIds.includes(club.id);
              const hostedEventsCount = events.filter(e => e.clubId === club.id).length;

              return (
                <div
                  key={club.id}
                  onClick={() => onSelectClub(club)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-300 transition duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="relative h-32 bg-slate-900 overflow-hidden">
                    <img
                      src={club.coverImage}
                      alt={club.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs">
                      {club.category}
                    </span>
                    {isJoined && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
                        Member
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md bg-white -mt-8 relative z-10 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition truncate">
                          {club.name}
                        </h4>
                        <span className="font-mono text-[10px] text-slate-400">{club.code}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {club.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{club.memberCount} Members</span>
                      </span>
                      <span>{hostedEventsCount} Events</span>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:underline">
                      <span>View Charter &amp; Leadership</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CALENDAR TIMELINE VIEW */}
      {activeSubTab === 'calendar' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Campus Event Calendar &amp; Timeline</h3>
              <p className="text-xs text-slate-500">Chronological schedule of events across all campus grounds</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs divide-y divide-slate-100">
            {events.slice().sort((a, b) => a.date.localeCompare(b.date)).map((evt) => (
              <div 
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 p-3 rounded-2xl cursor-pointer transition"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col items-center justify-center shrink-0 text-indigo-950">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {new Date(evt.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-lg font-black leading-none">
                      {evt.date.split('-')[2]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {evt.category}
                      </span>
                      <span className="text-xs text-indigo-600 font-semibold">{evt.clubName}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{evt.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>{evt.time}</span>
                      <span>&bull;</span>
                      <span>{evt.venue}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <span className="text-xs font-semibold text-slate-600">
                    {evt.registeredCount}/{evt.capacity} seats
                  </span>
                  <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
