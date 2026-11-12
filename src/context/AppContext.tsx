import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  CampusEvent, 
  CampusClub, 
  EventRegistration, 
  EventFeedback, 
  CampusAnnouncement, 
  SystemNotification,
  UserRole
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_CLUBS, 
  INITIAL_EVENTS, 
  INITIAL_REGISTRATIONS, 
  INITIAL_FEEDBACK, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  allUsers: User[];
  isAuthenticated: boolean;
  login: (identifier: string, password?: string, role?: UserRole) => { success: boolean; message: string };
  loginAsPreset: (role: UserRole, passwordEntered?: string) => { success: boolean; message: string };
  verifyAndLoginDemo: (role: UserRole, passwordEntered: string) => { success: boolean; message: string };
  logout: () => void;
  registerUser: (userData: {
    name: string;
    email: string;
    department: string;
    studentIdOrEmpId: string;
    year?: string;
    role: UserRole;
    password?: string;
  }) => { success: boolean; message: string; user?: User };
  switchUser: (userId: string) => void;
  setUserRole: (role: UserRole) => void;
  
  events: CampusEvent[];
  clubs: CampusClub[];
  registrations: EventRegistration[];
  feedbackList: EventFeedback[];
  announcements: CampusAnnouncement[];
  notifications: SystemNotification[];

  // Event methods
  registerForEvent: (eventId: string) => { success: boolean; message: string; ticketCode?: string };
  cancelRegistration: (registrationId: string) => void;
  markAttendance: (ticketCodeOrId: string) => { success: boolean; studentName?: string; eventTitle?: string; message: string };
  createEvent: (eventData: Omit<CampusEvent, 'id' | 'registeredCount' | 'attendedCount' | 'status'>) => CampusEvent;
  updateEvent: (eventId: string, updates: Partial<CampusEvent>) => void;
  deleteEvent: (eventId: string) => void;

  // Feedback methods
  submitFeedback: (data: Omit<EventFeedback, 'id' | 'submittedAt' | 'userName' | 'studentId' | 'userId'>) => void;

  // Club methods
  joinClub: (clubId: string) => void;
  leaveClub: (clubId: string) => void;
  createClub: (clubData: Omit<CampusClub, 'id' | 'memberCount'>) => CampusClub;

  // Admin & Announcements
  createAnnouncement: (announcement: Omit<CampusAnnouncement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Reset
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'campussync_curr_user_id',
  IS_AUTH: 'campussync_is_auth_v1',
  USERS: 'campussync_users_v1',
  EVENTS: 'campussync_events_v1',
  CLUBS: 'campussync_clubs_v1',
  REGISTRATIONS: 'campussync_registrations_v1',
  FEEDBACK: 'campussync_feedback_v1',
  ANNOUNCEMENTS: 'campussync_announcements_v1',
  NOTIFICATIONS: 'campussync_notifications_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved || INITIAL_USERS[0].id;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Default to false so any user opening the link fresh is directed to the Login Page first!
    const saved = localStorage.getItem(STORAGE_KEYS.IS_AUTH);
    return saved === 'true';
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [clubs, setClubs] = useState<CampusClub[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLUBS);
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [registrations, setRegistrations] = useState<EventRegistration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [feedbackList, setFeedbackList] = useState<EventFeedback[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
  });

  const [announcements, setAnnouncements] = useState<CampusAnnouncement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLUBS, JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  const currentUser = allUsers.find(u => u.id === currentUserId) || allUsers[0];

  const DEMO_PASSWORDS: Record<UserRole, string> = {
    student: 'student@123',
    faculty: 'faculty@123',
    admin: 'admin@123'
  };

  const login = (identifier: string, _password?: string, role?: UserRole) => {
    const clean = identifier.trim().toLowerCase();
    
    // Find matching user by email, student/emp ID, or name
    let user = allUsers.find(u => 
      u.email.toLowerCase() === clean || 
      u.studentIdOrEmpId.toLowerCase() === clean ||
      u.name.toLowerCase() === clean
    );

    // If identifier empty but role passed, find preset role user
    if (!user && role) {
      user = allUsers.find(u => u.role === role);
    }

    if (!user) {
      return { success: false, message: 'Account not found. Please check your Email/Roll ID or create an account.' };
    }

    setCurrentUserId(user.id);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
    return { success: true, message: `Welcome back, ${user.name}!` };
  };

  const verifyAndLoginDemo = (role: UserRole, _passwordEntered?: string) => {
    const target = allUsers.find(u => u.role === role);
    if (!target) {
      return { success: false, message: 'Target role account not found.' };
    }

    setCurrentUserId(target.id);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
    return { success: true, message: `Authorized as ${target.name} (${role.toUpperCase()})` };
  };

  const loginAsPreset = (role: UserRole, _passwordEntered?: string) => {
    const target = allUsers.find(u => u.role === role) || allUsers[0];

    setCurrentUserId(target.id);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
    return { success: true, message: `Welcome, ${target.name}!` };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'false');
  };

  const registerUser = (userData: {
    name: string;
    email: string;
    department: string;
    studentIdOrEmpId: string;
    year?: string;
    role: UserRole;
    password?: string;
  }) => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const cleanId = userData.studentIdOrEmpId.trim().toUpperCase();

    const existing = allUsers.find(u => 
      u.email.toLowerCase() === cleanEmail ||
      u.studentIdOrEmpId.toUpperCase() === cleanId
    );
    if (existing) {
      return { success: false, message: 'An account with this email or Roll/Employee ID already exists.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      department: userData.department,
      studentIdOrEmpId: cleanId,
      year: userData.year || '1st Year',
      role: userData.role,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80`,
      joinedClubIds: [],
      password: userData.password || 'student@123'
    };

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');

    // System welcome notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Welcome to CampusSync!',
        message: `Hello ${newUser.name}, your ${newUser.role} account has been created. Explore events and clubs!`,
        timestamp: 'Just now',
        read: false,
        type: 'alert'
      },
      ...prev
    ]);

    return { success: true, message: `Account created successfully! Welcome, ${newUser.name}.`, user: newUser };
  };

  const switchUser = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUserId(found.id);
    }
  };

  const setUserRole = (role: UserRole) => {
    const match = allUsers.find(u => u.role === role);
    if (match) {
      setCurrentUserId(match.id);
    }
  };

  const registerForEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event not found.' };
    }

    // Check if already registered
    const existing = registrations.find(
      r => r.eventId === eventId && r.userId === currentUser.id && r.status !== 'cancelled'
    );
    if (existing) {
      return { success: false, message: 'You have already registered for this event!' };
    }

    if (event.registeredCount >= event.capacity) {
      return { success: false, message: 'This event has reached full capacity.' };
    }

    const ticketNumber = Math.floor(1000 + Math.random() * 9000);
    const codePrefix = event.title.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, 'APEX');
    const ticketCode = `APEX-${codePrefix}-${ticketNumber}`;

    const newRegistration: EventRegistration = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      studentId: currentUser.studentIdOrEmpId,
      department: currentUser.department,
      registeredAt: new Date().toISOString(),
      ticketCode,
      status: 'confirmed'
    };

    setRegistrations(prev => [newRegistration, ...prev]);

    // Update event registered count
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return { ...e, registeredCount: e.registeredCount + 1 };
      }
      return e;
    }));

    // Add notification
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: 'Pass Issued: ' + event.title.slice(0, 24) + '...',
      message: `Your ticket #${ticketCode} is confirmed. Show this QR pass at ${event.venue}.`,
      timestamp: 'Just now',
      read: false,
      type: 'registration',
      linkId: event.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return { success: true, message: 'Registration confirmed successfully!', ticketCode };
  };

  const cancelRegistration = (registrationId: string) => {
    const reg = registrations.find(r => r.id === registrationId);
    if (!reg) return;

    setRegistrations(prev => prev.map(r => {
      if (r.id === registrationId) {
        return { ...r, status: 'cancelled' };
      }
      return r;
    }));

    setEvents(prev => prev.map(e => {
      if (e.id === reg.eventId && e.registeredCount > 0) {
        return { ...e, registeredCount: e.registeredCount - 1 };
      }
      return e;
    }));
  };

  const markAttendance = (ticketCodeOrId: string) => {
    const cleanInput = ticketCodeOrId.trim().toUpperCase();
    const reg = registrations.find(
      r => (r.ticketCode.toUpperCase() === cleanInput || r.id.toUpperCase() === cleanInput) && r.status !== 'cancelled'
    );

    if (!reg) {
      return { success: false, message: 'Invalid ticket code or student not registered.' };
    }

    if (reg.status === 'attended') {
      return {
        success: false,
        studentName: reg.userName,
        eventTitle: reg.eventTitle,
        message: `Already checked in at ${reg.attendedAt ? new Date(reg.attendedAt).toLocaleTimeString() : 'earlier'}.`
      };
    }

    const now = new Date().toISOString();
    setRegistrations(prev => prev.map(r => {
      if (r.id === reg.id) {
        return { ...r, status: 'attended', attendedAt: now };
      }
      return r;
    }));

    setEvents(prev => prev.map(e => {
      if (e.id === reg.eventId) {
        return { ...e, attendedCount: (e.attendedCount || 0) + 1 };
      }
      return e;
    }));

    return {
      success: true,
      studentName: reg.userName,
      eventTitle: reg.eventTitle,
      message: `Attendance confirmed for ${reg.userName} (${reg.studentId})!`
    };
  };

  const createEvent = (eventData: Omit<CampusEvent, 'id' | 'registeredCount' | 'attendedCount' | 'status'>) => {
    const newEvent: CampusEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      attendedCount: 0,
      status: 'upcoming',
      tags: eventData.tags && eventData.tags.length > 0 ? eventData.tags : [eventData.category, 'Campus Event']
    };

    setEvents(prev => [newEvent, ...prev]);

    // Campus notification
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Campus Event Created',
      message: `${newEvent.title} has been scheduled for ${newEvent.date} at ${newEvent.venue}.`,
      timestamp: 'Just now',
      read: false,
      type: 'event',
      linkId: newEvent.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newEvent;
  };

  const updateEvent = (eventId: string, updates: Partial<CampusEvent>) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, ...updates } : e));
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const submitFeedback = (data: Omit<EventFeedback, 'id' | 'submittedAt' | 'userName' | 'studentId' | 'userId'>) => {
    const newFeedback: EventFeedback = {
      ...data,
      id: `fb-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      studentId: currentUser.studentIdOrEmpId,
      submittedAt: new Date().toISOString()
    };

    setFeedbackList(prev => [newFeedback, ...prev]);

    // Recalculate event average rating
    const eventFeedbacks = [...feedbackList.filter(f => f.eventId === data.eventId), newFeedback];
    const avg = eventFeedbacks.reduce((acc, f) => acc + f.rating, 0) / eventFeedbacks.length;

    setEvents(prev => prev.map(e => {
      if (e.id === data.eventId) {
        return { ...e, averageRating: parseFloat(avg.toFixed(1)) };
      }
      return e;
    }));
  };

  const joinClub = (clubId: string) => {
    if (currentUser.joinedClubIds.includes(clubId)) return;

    const updatedUser = {
      ...currentUser,
      joinedClubIds: [...currentUser.joinedClubIds, clubId]
    };

    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        return { ...c, memberCount: c.memberCount + 1 };
      }
      return c;
    }));

    const club = clubs.find(c => c.id === clubId);
    if (club) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `Welcome to ${club.name}`,
          message: `You are now a registered member of ${club.name}. Weekly meetings: ${club.meetingSchedule}.`,
          timestamp: 'Just now',
          read: false,
          type: 'club',
          linkId: club.id
        },
        ...prev
      ]);
    }
  };

  const leaveClub = (clubId: string) => {
    const updatedUser = {
      ...currentUser,
      joinedClubIds: currentUser.joinedClubIds.filter(id => id !== clubId)
    };
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setClubs(prev => prev.map(c => {
      if (c.id === clubId && c.memberCount > 0) {
        return { ...c, memberCount: c.memberCount - 1 };
      }
      return c;
    }));
  };

  const createClub = (clubData: Omit<CampusClub, 'id' | 'memberCount'>) => {
    const newClub: CampusClub = {
      ...clubData,
      id: `club-${Date.now()}`,
      memberCount: 1
    };
    setClubs(prev => [...prev, newClub]);
    return newClub;
  };

  const createAnnouncement = (announcementData: Omit<CampusAnnouncement, 'id' | 'date'>) => {
    const newAnc: CampusAnnouncement = {
      ...announcementData,
      id: `anc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnc, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setAllUsers(INITIAL_USERS);
    setCurrentUserId(INITIAL_USERS[0].id);
    setEvents(INITIAL_EVENTS);
    setClubs(INITIAL_CLUBS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setFeedbackList(INITIAL_FEEDBACK);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        isAuthenticated,
        login,
        loginAsPreset,
        verifyAndLoginDemo,
        logout,
        registerUser,
        switchUser,
        setUserRole,
        events,
        clubs,
        registrations,
        feedbackList,
        announcements,
        notifications,
        registerForEvent,
        cancelRegistration,
        markAttendance,
        createEvent,
        updateEvent,
        deleteEvent,
        submitFeedback,
        joinClub,
        leaveClub,
        createClub,
        createAnnouncement,
        deleteAnnouncement,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
