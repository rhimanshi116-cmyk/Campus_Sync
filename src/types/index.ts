export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  studentIdOrEmpId: string;
  year?: string;
  joinedClubIds: string[];
  password?: string;
}

export type EventCategory = 
  | 'Technical' 
  | 'Workshop' 
  | 'Cultural' 
  | 'Hackathon' 
  | 'Sports' 
  | 'Academic' 
  | 'Guest Lecture' 
  | 'Entrepreneurship';

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface EventAgendaItem {
  time: string;
  activity: string;
  speaker?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  category: EventCategory;
  description: string;
  longDescription?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. 10:00 AM - 01:00 PM
  venue: string;
  capacity: number;
  registeredCount: number;
  attendedCount: number;
  bannerUrl: string;
  status: EventStatus;
  eligibility: string; // e.g. 'All Students', 'CSE & ECE Only', etc.
  facultyCoordinator: {
    name: string;
    email: string;
    department: string;
  };
  studentCoordinator: {
    name: string;
    contact: string;
  };
  prerequisites?: string[];
  agenda?: EventAgendaItem[];
  isFeatured?: boolean;
  registrationDeadline: string;
  feedbackAllowed?: boolean;
  averageRating?: number;
  tags: string[];
}

export interface ClubMember {
  name: string;
  role: 'President' | 'Vice President' | 'Secretary' | 'Technical Head' | 'Member';
  avatar: string;
}

export interface CampusClub {
  id: string;
  name: string;
  code: string;
  category: 'Technology' | 'Culture & Arts' | 'Social & Leadership' | 'Sports' | 'Science & Innovation';
  description: string;
  logo: string;
  coverImage: string;
  facultyAdvisor: string;
  studentLead: string;
  email: string;
  memberCount: number;
  foundedYear: number;
  meetingSchedule: string;
  roomNumber: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  leadership: ClubMember[];
  achievements: string[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  userId: string;
  userName: string;
  userEmail: string;
  studentId: string;
  department: string;
  registeredAt: string;
  ticketCode: string;
  status: 'confirmed' | 'cancelled' | 'attended';
  attendedAt?: string;
}

export interface EventFeedback {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  studentId: string;
  rating: number; // 1-5
  categoryRatings?: {
    organization: number;
    content: number;
    venue: number;
  };
  comments: string;
  submittedAt: string;
}

export interface CampusAnnouncement {
  id: string;
  title: string;
  message: string;
  priority: 'normal' | 'important' | 'urgent';
  date: string;
  author: string;
  authorRole: string;
  targetRole?: 'all' | 'students' | 'faculty';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'event' | 'registration' | 'club' | 'alert';
  linkId?: string;
}
