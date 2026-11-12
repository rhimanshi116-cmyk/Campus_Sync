import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Building2, 
  Megaphone, 
  BarChart2, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Star,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusClub, CampusEvent } from '../types';

interface AdminPortalProps {
  onSelectEvent: (event: CampusEvent) => void;
  onSelectClub: (club: CampusClub) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onSelectEvent, onSelectClub }) => {
  const { 
    currentUser, 
    allUsers, 
    events, 
    clubs, 
    registrations, 
    feedbackList, 
    announcements, 
    createAnnouncement, 
    deleteAnnouncement,
    createClub,
    updateEvent,
    deleteEvent 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'events' | 'clubs' | 'users' | 'broadcast'>('overview');
  
  // Announcement form state
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeMsg, setNewNoticeMsg] = useState('');
  const [newNoticePriority, setNewNoticePriority] = useState<'normal' | 'important' | 'urgent'>('important');

  // New Club modal form state
  const [isNewClubOpen, setIsNewClubOpen] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newClubCode, setNewClubCode] = useState('');
  const [newClubCategory, setNewClubCategory] = useState<'Technology' | 'Culture & Arts' | 'Social & Leadership' | 'Sports' | 'Science & Innovation'>('Technology');
  const [newClubAdvisor, setNewClubAdvisor] = useState('');
  const [newClubLead, setNewClubLead] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');

  // Overall calculations
  const totalRegistrations = registrations.filter(r => r.status !== 'cancelled').length;
  const totalAttended = registrations.filter(r => r.status === 'attended').length;
  const overallTurnout = totalRegistrations > 0 ? Math.round((totalAttended / totalRegistrations) * 100) : 0;
  const avgSatisfaction = feedbackList.length > 0 
    ? (feedbackList.reduce((acc, f) => acc + f.rating, 0) / feedbackList.length).toFixed(1)
    : '4.8';

  // Department distribution
  const deptCounts: Record<string, number> = {};
  registrations.forEach(r => {
    deptCounts[r.department] = (deptCounts[r.department] || 0) + 1;
  });

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeMsg.trim()) return;

    createAnnouncement({
      title: newNoticeTitle,
      message: newNoticeMsg,
      priority: newNoticePriority,
      author: currentUser.name,
      authorRole: 'Office of Dean Student Affairs',
      targetRole: 'all'
    });

    setNewNoticeTitle('');
    setNewNoticeMsg('');
    alert('Campus announcement broadcasted live to all students & faculty!');
  };

  const handleCreateNewClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClubName.trim()) return;

    createClub({
      name: newClubName,
      code: newClubCode || `${newClubName.slice(0, 3).toUpperCase()}-AIT`,
      category: newClubCategory,
      description: newClubDesc || 'Student-led club dedicated to excellence and campus engagement.',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
      facultyAdvisor: newClubAdvisor || 'Prof. Faculty Coordinator',
      studentLead: newClubLead || 'Student Representative',
      email: `${newClubCode.toLowerCase()}@apex.edu.in`,
      foundedYear: 2026,
      meetingSchedule: 'Weekly Thursdays 4:00 PM',
      roomNumber: 'Student Activity Centre Room 102',
      leadership: [
        { name: newClubLead || 'Lead', role: 'President', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }
      ],
      achievements: ['Charter approved by Dean Student Affairs 2026']
    });

    setIsNewClubOpen(false);
    setNewClubName('');
    alert(`New club charter for "${newClubName}" approved and published!`);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Executive Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-purple-300 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              University Central Administration &bull; Office of the Dean
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Executive Dean Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Logged in as {currentUser.name} ({currentUser.department}) &bull; Apex Institute
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveAdminTab('broadcast')}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Megaphone className="w-4 h-4" />
              <span>Broadcast Announcement</span>
            </button>
            <button
              onClick={() => setIsNewClubOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition border border-white/20"
            >
              <Building2 className="w-4 h-4" />
              <span>Approve Club Charter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 overflow-x-auto pb-1">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === 'overview'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Campus Analytics &amp; KPIs
          </button>

          <button
            onClick={() => setActiveAdminTab('events')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === 'events'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Event Moderation ({events.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('clubs')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === 'clubs'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Club Charters ({clubs.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('users')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === 'users'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            User Registry ({allUsers.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('broadcast')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === 'broadcast'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Announcements &amp; Notices
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Key metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Total Campus Events</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{events.length}</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                {events.filter(e => e.status === 'upcoming').length} upcoming &bull; {events.filter(e => e.status === 'completed').length} completed
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Total Registrations</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">{totalRegistrations}</p>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                Across all branch years
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Chartered Clubs</span>
              <p className="text-2xl font-black text-purple-600 mt-1">{clubs.length}</p>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                Active student societies
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Average Satisfaction</span>
              <p className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-500" />
                <span>{avgSatisfaction}</span>
              </p>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                Based on {feedbackList.length} student reviews
              </span>
            </div>
          </div>

          {/* Department Breakdown & Registration Leaderboard */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Registration Distribution by Department
              </h4>
              <div className="space-y-3">
                {Object.entries(deptCounts).map(([dept, count]) => {
                  const pct = totalRegistrations > 0 ? Math.round((count / totalRegistrations) * 100) : 0;
                  return (
                    <div key={dept} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{dept}</span>
                        <span className="text-indigo-600">{count} passes ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Top Performing Campus Clubs
              </h4>
              <div className="space-y-3">
                {clubs.slice(0, 4).map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">{c.name}</h5>
                        <p className="text-[11px] text-slate-500">{c.category} &bull; {c.memberCount} members</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectClub(c)}
                      className="text-xs text-indigo-600 font-bold hover:underline"
                    >
                      Inspect &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVENT MODERATION */}
      {activeAdminTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">
              Campus Event Moderation &amp; Status Controls
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Event Title</th>
                    <th className="px-4 py-3">Host Club</th>
                    <th className="px-4 py-3">Date &amp; Venue</th>
                    <th className="px-4 py-3">Seats</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {evt.title}
                        {evt.isFeatured && (
                          <span className="ml-2 text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">{evt.clubName}</td>
                      <td className="px-4 py-3 text-slate-500">{evt.date} &bull; {evt.venue}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{evt.registeredCount}/{evt.capacity}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          evt.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1.5">
                        <button
                          onClick={() => updateEvent(evt.id, { isFeatured: !evt.isFeatured })}
                          className="px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-50 rounded"
                        >
                          {evt.isFeatured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete event "${evt.title}"?`)) {
                              deleteEvent(evt.id);
                            }
                          }}
                          className="px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLUBS GOVERNANCE */}
      {activeAdminTab === 'clubs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">
              Approved Student Club Charters
            </h3>
            <button
              onClick={() => setIsNewClubOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Charter New Club</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubs.map(c => (
              <div key={c.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <img src={c.logo} alt={c.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      Advisor: {c.facultyAdvisor} &bull; Lead: {c.studentLead}
                    </p>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded mt-1 inline-block">
                      Room: {c.roomNumber}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectClub(c)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
                >
                  Charter
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USER REGISTRY */}
      {activeAdminTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">
              Campus User Registry &amp; Roles
            </h3>
            <span className="text-xs text-slate-500">
              Campus Registry &bull; Role-Based Access Control
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">User Profile</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">ID / Emp No</th>
                    <th className="px-4 py-3">Affiliations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 flex items-center space-x-2.5">
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-[10px] text-slate-400">{u.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold uppercase text-[10px]">
                        <span className={`px-2 py-0.5 rounded ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          u.role === 'faculty' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{u.department}</td>
                      <td className="px-4 py-3 font-mono">{u.studentIdOrEmpId}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {u.joinedClubIds.length} Clubs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BROADCAST ANNOUNCEMENTS */}
      {activeAdminTab === 'broadcast' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-black text-slate-900 text-base">Broadcast Campus Announcement</h3>
              <p className="text-xs text-slate-500">
                Pushes live alert banners to all logged-in students and faculty across the portal.
              </p>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Sports Meet 2026: Schedule Released"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Full bulletin message..."
                  value={newNoticeMsg}
                  onChange={(e) => setNewNoticeMsg(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Priority
                </label>
                <select
                  value={newNoticePriority}
                  onChange={(e) => setNewNoticePriority(e.target.value as any)}
                  className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  <option value="normal">Normal Bulletin</option>
                  <option value="important">Important (Highlighted)</option>
                  <option value="urgent">Urgent Campus Alert</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Publish Campus Notice
              </button>
            </form>
          </div>

          {/* Active announcements */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider">
              Currently Live Bulletins
            </h4>
            {announcements.map((anc) => (
              <div key={anc.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold uppercase text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {anc.priority}
                    </span>
                    <h5 className="font-bold text-slate-900">{anc.title}</h5>
                  </div>
                  <p className="text-slate-600 mt-1">{anc.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Posted by {anc.author} ({anc.authorRole}) &bull; {anc.date}
                  </p>
                </div>

                <button
                  onClick={() => deleteAnnouncement(anc.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Remove bulletin"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approve / Create Club Modal */}
      {isNewClubOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-black text-slate-900 text-base">Grant New Club Charter</h3>
            
            <form onSubmit={handleCreateNewClub} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Club / Society Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Astronomy &amp; Space Club"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Club Code</label>
                <input
                  type="text"
                  placeholder="e.g. AASC-AIT"
                  value={newClubCode}
                  onChange={(e) => setNewClubCode(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl uppercase font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newClubCategory}
                  onChange={(e) => setNewClubCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Technology">Technology</option>
                  <option value="Science & Innovation">Science & Innovation</option>
                  <option value="Culture & Arts">Culture & Arts</option>
                  <option value="Social & Leadership">Social & Leadership</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Faculty Advisor Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. K. Ramanathan"
                  value={newClubAdvisor}
                  onChange={(e) => setNewClubAdvisor(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student President / Lead</label>
                <input
                  type="text"
                  placeholder="e.g. Rhea Sen"
                  value={newClubLead}
                  onChange={(e) => setNewClubLead(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewClubOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl"
                >
                  Approve Charter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
