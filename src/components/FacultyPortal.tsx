import React, { useState } from 'react';
import { 
  PlusCircle, 
  Users, 
  Calendar, 
  QrCode, 
  Download, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Star, 
  AlertCircle, 
  Sparkles,
  BarChart3,
  Search,
  Trash2,
  Edit3,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusEvent, EventCategory } from '../types';
import { QRScannerModal } from './QRScannerModal';

interface FacultyPortalProps {
  onSelectEvent: (event: CampusEvent) => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({ onSelectEvent }) => {
  const { 
    currentUser, 
    events, 
    clubs, 
    registrations, 
    feedbackList, 
    createEvent, 
    deleteEvent, 
    markAttendance 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'events' | 'create' | 'attendees' | 'feedback'>('events');
  const [selectedEventIdForAttendees, setSelectedEventIdForAttendees] = useState<string>(events[0]?.id || '');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [attendeeSearch, setAttendeeSearch] = useState('');

  // Form State for Create Event Wizard
  const [formData, setFormData] = useState({
    title: '',
    clubId: clubs[0]?.id || '',
    category: 'Technical' as EventCategory,
    description: '',
    longDescription: '',
    date: '2026-11-28',
    time: '10:00 AM - 01:00 PM',
    venue: 'Seminar Hall A, Science & Tech Block',
    capacity: 100,
    eligibility: 'All Departments (B.Tech / MCA / M.Tech)',
    bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-11-26',
    prerequisitesText: 'Laptop with charger, College ID card',
    studentCoordinatorName: 'Rishi Patel',
    studentCoordinatorContact: '+91 98765 43210',
    tagsText: 'Workshop, Hands-on, Certificate'
  });

  // Events coordinated by this faculty (or all events if admin/coordinator view)
  const myFacultyEvents = events.filter(
    e => e.facultyCoordinator.name.includes(currentUser.name) || 
         currentUser.role === 'admin' ||
         e.clubId === 'club-acm' ||
         e.clubId === 'club-gdg'
  );

  const selectedEvent = events.find(e => e.id === selectedEventIdForAttendees) || events[0];

  // Registrations for the selected event
  const eventAttendees = registrations.filter(
    r => r.eventId === selectedEvent?.id && r.status !== 'cancelled'
  );

  const filteredAttendees = eventAttendees.filter(
    a => a.userName.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
         a.studentId.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
         a.department.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
         a.ticketCode.toLowerCase().includes(attendeeSearch.toLowerCase())
  );

  // Feedbacks for faculty's events
  const facultyFeedbacks = feedbackList.filter(f => 
    myFacultyEvents.some(e => e.id === f.eventId)
  );

  // Quick stats
  const totalRegistrations = myFacultyEvents.reduce((acc, e) => acc + e.registeredCount, 0);
  const totalAttended = registrations.filter(r => 
    myFacultyEvents.some(e => e.id === r.eventId) && r.status === 'attended'
  ).length;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide an event title');
      return;
    }

    const hostClub = clubs.find(c => c.id === formData.clubId) || clubs[0];

    const newEvt = createEvent({
      title: formData.title,
      clubId: hostClub.id,
      clubName: hostClub.name,
      category: formData.category,
      description: formData.description || 'Join us for this exciting campus event organized by ' + hostClub.name,
      longDescription: formData.longDescription,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      capacity: Number(formData.capacity),
      bannerUrl: formData.bannerUrl,
      eligibility: formData.eligibility,
      registrationDeadline: formData.registrationDeadline,
      facultyCoordinator: {
        name: currentUser.name,
        email: currentUser.email,
        department: currentUser.department
      },
      studentCoordinator: {
        name: formData.studentCoordinatorName,
        contact: formData.studentCoordinatorContact
      },
      prerequisites: formData.prerequisitesText.split(',').map(s => s.trim()).filter(Boolean),
      tags: formData.tagsText.split(',').map(s => s.trim()).filter(Boolean),
      isFeatured: false
    });

    alert(`Event "${newEvt.title}" created successfully!`);
    setActiveTab('events');
  };

  const handleExportCSV = () => {
    if (!selectedEvent) return;
    const headers = 'Student Name,Roll ID,Department,Email,Ticket Code,Registration Date,Attendance Status\n';
    const rows = eventAttendees.map(a => 
      `"${a.userName}","${a.studentId}","${a.department}","${a.userEmail}","${a.ticketCode}","${a.registeredAt}","${a.status}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedEvent.title.slice(0, 20)}_Attendance_Roster.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Faculty Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">
              Faculty &amp; Club Coordinator Portal &bull; Academic Affairs
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentUser.department} &bull; Emp ID: {currentUser.studentIdOrEmpId} &bull; Faculty Advisor
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 rounded-2xl p-3.5 text-center min-w-[90px] border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white">{myFacultyEvents.length}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Events</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 text-center min-w-[90px] border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white">{totalRegistrations}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Students</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 text-center min-w-[90px] border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">{totalAttended}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Attended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 overflow-x-auto pb-1">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manage Events ({myFacultyEvents.length})
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center space-x-1.5 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'create'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            <span>Create New Event</span>
          </button>

          <button
            onClick={() => setActiveTab('attendees')}
            className={`flex items-center space-x-1.5 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'attendees'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Attendance Roster &amp; QR Check-in</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center space-x-1.5 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Student Feedback ({facultyFeedbacks.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FACULTY EVENTS LIST */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">
              Coordinated Campus Events &amp; Workshops
            </h3>
            <button
              onClick={() => setActiveTab('create')}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Event Wizard</span>
            </button>
          </div>

          <div className="grid gap-4">
            {myFacultyEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {evt.category}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{evt.clubName}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base leading-snug">
                      {evt.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-indigo-600" /> {evt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-600" /> {evt.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> {evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="text-left sm:text-right pr-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      {evt.registeredCount} / {evt.capacity} Registered
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      {evt.attendedCount || 0} Attended
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEventIdForAttendees(evt.id);
                      setActiveTab('attendees');
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition border border-indigo-200"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>View Roster</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEventIdForAttendees(evt.id);
                      setIsScannerOpen(true);
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-xs"
                  >
                    <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Scan Passes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CREATE EVENT WIZARD */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Event Coordination &bull; Publishing Center
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Create New Campus Event / Workshop
            </h3>
            <p className="text-xs text-slate-500">
              Schedule a university session, invite student registrations, and automatically generate digital passes.
            </p>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NextGen Web & Cloud Summit 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Host Club / Society
                </label>
                <select
                  value={formData.clubId}
                  onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  {clubs.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Event Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  <option value="Technical">Technical</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                  <option value="Entrepreneurship">Entrepreneurship</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM - 01:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Max Capacity
                </label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Venue / Hall
                </label>
                <input
                  type="text"
                  placeholder="e.g. Central Auditorium / Lab 3"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Brief Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary displayed on the event card..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Coordinator Name
                </label>
                <input
                  type="text"
                  value={formData.studentCoordinatorName}
                  onChange={(e) => setFormData({ ...formData, studentCoordinatorName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Coordinator Contact
                </label>
                <input
                  type="text"
                  value={formData.studentCoordinatorContact}
                  onChange={(e) => setFormData({ ...formData, studentCoordinatorContact: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Prerequisites (comma-separated)
              </label>
              <input
                type="text"
                value={formData.prerequisitesText}
                onChange={(e) => setFormData({ ...formData, prerequisitesText: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
              >
                Publish Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: ATTENDANCE ROSTER & CHECK-IN */}
      {activeTab === 'attendees' && (
        <div className="space-y-6">
          
          {/* Selector & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0">
                Select Event:
              </span>
              <select
                value={selectedEvent?.id}
                onChange={(e) => setSelectedEventIdForAttendees(e.target.value)}
                className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-indigo-950 focus:ring-2 focus:ring-indigo-500"
              >
                {myFacultyEvents.map(evt => (
                  <option key={evt.id} value={evt.id}>{evt.title}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Launch QR Scanner</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Attendee Summary stats */}
          {selectedEvent && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Registered</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5">{eventAttendees.length} Students</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Checked In</span>
                <span className="text-base font-extrabold text-emerald-600 mt-0.5">
                  {eventAttendees.filter(a => a.status === 'attended').length}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Pending</span>
                <span className="text-base font-extrabold text-amber-600 mt-0.5">
                  {eventAttendees.filter(a => a.status === 'confirmed').length}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Turnout Rate</span>
                <span className="text-base font-extrabold text-indigo-600 mt-0.5">
                  {eventAttendees.length > 0 
                    ? Math.round((eventAttendees.filter(a => a.status === 'attended').length / eventAttendees.length) * 100) 
                    : 0}%
                </span>
              </div>
            </div>
          )}

          {/* Search Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student by name, roll, or ticket code..."
                  value={attendeeSearch}
                  onChange={(e) => setAttendeeSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <span className="text-xs text-slate-400">
                Showing {filteredAttendees.length} of {eventAttendees.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Roll ID</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Ticket Pass</th>
                    <th className="px-4 py-3">Registered At</th>
                    <th className="px-4 py-3 text-right">Attendance Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredAttendees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400 italic">
                        No students found matching search.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendees.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-900">{att.userName}</td>
                        <td className="px-4 py-3 font-mono text-slate-700">{att.studentId}</td>
                        <td className="px-4 py-3">{att.department}</td>
                        <td className="px-4 py-3 font-mono text-indigo-600">{att.ticketCode}</td>
                        <td className="px-4 py-3 text-slate-400 text-[11px]">
                          {new Date(att.registeredAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {att.status === 'attended' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Attended
                            </span>
                          ) : (
                            <button
                              onClick={() => markAttendance(att.ticketCode)}
                              className="px-2.5 py-1 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                            >
                              Check In
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Student Feedback &amp; Session Quality Ratings
              </h3>
              <p className="text-xs text-slate-500">Attendee Feedback &bull; Direct evaluations and ratings from attendees</p>
            </div>
          </div>

          {facultyFeedbacks.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 text-slate-400 text-xs">
              No feedback submitted for your events yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {facultyFeedbacks.map((fb) => (
                <div key={fb.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{fb.eventTitle}</h4>
                      <p className="text-[11px] text-slate-500">
                        By {fb.userName} ({fb.studentId}) &bull; {new Date(fb.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{fb.rating} / 5</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{fb.comments}"
                  </p>

                  {fb.categoryRatings && (
                    <div className="flex items-center space-x-4 text-[11px] text-slate-500 pt-1">
                      <span>Org: <strong>{fb.categoryRatings.organization}/5</strong></span>
                      <span>Content: <strong>{fb.categoryRatings.content}/5</strong></span>
                      <span>Venue: <strong>{fb.categoryRatings.venue}/5</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        targetEventId={selectedEvent?.id}
      />

    </div>
  );
};
