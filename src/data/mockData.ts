import { CampusClub, CampusEvent, EventFeedback, EventRegistration, CampusAnnouncement, SystemNotification, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-std-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@apex.edu.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    department: 'Computer Science & Engineering',
    studentIdOrEmpId: '22BCSE104',
    year: '3rd Year (B.Tech)',
    joinedClubIds: ['club-acm', 'club-gdg', 'club-ecell'],
    password: 'student@123'
  },
  {
    id: 'user-fac-1',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@apex.edu.in',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    department: 'Computer Science & Engineering',
    studentIdOrEmpId: 'EMP-FAC-042',
    joinedClubIds: ['club-acm', 'club-gdg'],
    password: 'faculty@123'
  },
  {
    id: 'user-adm-1',
    name: 'Prof. R. K. Verma',
    email: 'dean.studentaffairs@apex.edu.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    department: 'Office of Dean Student Welfare',
    studentIdOrEmpId: 'EMP-ADM-001',
    joinedClubIds: [],
    password: 'admin@123'
  }
];

export const INITIAL_CLUBS: CampusClub[] = [
  {
    id: 'club-acm',
    name: 'ACM Student Chapter',
    code: 'ACM-AIT',
    category: 'Technology',
    description: 'Premier computing society advancing technical innovation, algorithmic problem solving, open source, and research excellence.',
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    facultyAdvisor: 'Dr. Sunita Rao (Associate Prof, CSE)',
    studentLead: 'Devansh Kulkarni (Final Year CSE)',
    email: 'acm@apex.edu.in',
    memberCount: 340,
    foundedYear: 2017,
    meetingSchedule: 'Every Wednesday 4:30 PM',
    roomNumber: 'Turing Hall, CS Block 3rd Floor',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    leadership: [
      { name: 'Devansh Kulkarni', role: 'President', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Pooja Hegde', role: 'Vice President', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { name: 'Rishi Patel', role: 'Technical Head', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80' }
    ],
    achievements: [
      'National Finalist at Smart India Hackathon 2025',
      'Hosted 12 campus workshops with over 1500 attendees',
      'Published 5 student research papers in IEEE conferences'
    ]
  },
  {
    id: 'club-gdg',
    name: 'Google Developer Group on Campus',
    code: 'GDG-AIT',
    category: 'Technology',
    description: 'University developer community exploring Google technologies, Android, Cloud, AI, and building community-centric solutions.',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    facultyAdvisor: 'Prof. Anita Deshmukh',
    studentLead: 'Meera Sengupta',
    email: 'gdg@apex.edu.in',
    memberCount: 420,
    foundedYear: 2019,
    meetingSchedule: 'Alternate Fridays 5:00 PM',
    roomNumber: 'Innovation Lab 2, Tech Park',
    leadership: [
      { name: 'Meera Sengupta', role: 'President', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { name: 'Arjun Nambiar', role: 'Technical Head', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' }
    ],
    achievements: [
      'Google Solution Challenge Global Top 50 in 2025',
      'Cloud Study Jam completion certificate for 300+ students'
    ]
  },
  {
    id: 'club-robotics',
    name: 'Apex Robotics & Mechatronics Society',
    code: 'ARMS-AIT',
    category: 'Science & Innovation',
    description: 'Hands-on hardware enthusiasts building autonomous drones, combat rovers, IoT sensors, and industrial automation prototypes.',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    facultyAdvisor: 'Dr. Vikram Chandra (Mech Dept)',
    studentLead: 'Kunal Joshi',
    email: 'robotics@apex.edu.in',
    memberCount: 185,
    foundedYear: 2016,
    meetingSchedule: 'Saturdays 2:00 PM',
    roomNumber: 'FabLab & Mechatronics Bay 1',
    leadership: [
      { name: 'Kunal Joshi', role: 'President', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' }
    ],
    achievements: [
      '1st Place at Robowars IIT Bombay Techfest',
      'Autonomous campus delivery cart prototype demonstrated to VC'
    ]
  },
  {
    id: 'club-ecell',
    name: 'Apex Entrepreneurship Cell (E-Cell)',
    code: 'ECELL-AIT',
    category: 'Social & Leadership',
    description: 'Fostering collegiate startups, incubator mentorship, pitch competitions, and angel investor networking sessions.',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    facultyAdvisor: 'Prof. Sanjeev Kapoor (Management Studies)',
    studentLead: 'Tanvi Singhania',
    email: 'ecell@apex.edu.in',
    memberCount: 260,
    foundedYear: 2018,
    meetingSchedule: 'Thursdays 5:15 PM',
    roomNumber: 'Incubation Centre, Ground Floor',
    leadership: [
      { name: 'Tanvi Singhania', role: 'President', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' }
    ],
    achievements: [
      'Incubated 8 student-led startups with seed funding',
      'Organized annual E-Summit with 2000+ delegates from 25 universities'
    ]
  },
  {
    id: 'club-kalakriti',
    name: 'Kalakriti - Drama & Cultural Society',
    code: 'KALA-AIT',
    category: 'Culture & Arts',
    description: 'The creative heartbeat of college organizing street plays (nukkad natak), theatre productions, music concerts, and annual fest.',
    logo: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    facultyAdvisor: 'Dr. Shalini Mukhopadhyay',
    studentLead: 'Kabir Oberoi',
    email: 'kalakriti@apex.edu.in',
    memberCount: 310,
    foundedYear: 2014,
    meetingSchedule: 'Every Tuesday & Thursday 5:30 PM',
    roomNumber: 'Main Stage & Music Room 204',
    leadership: [
      { name: 'Kabir Oberoi', role: 'President', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
    ],
    achievements: [
      'Inter-University Gold Trophy for Best Street Play 2025',
      'Headline stage production of Hamlet adaptation'
    ]
  },
  {
    id: 'club-sports',
    name: 'Apex Sports & Athletics Council',
    code: 'ASAC-AIT',
    category: 'Sports',
    description: 'Promoting physical fitness, inter-college athletic meets, football, basketball, cricket, badminton, and chess championships.',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    facultyAdvisor: 'Coach Rajesh Rana (Physical Education Director)',
    studentLead: 'Rohit Balakrishnan',
    email: 'sports@apex.edu.in',
    memberCount: 450,
    foundedYear: 2012,
    meetingSchedule: 'Daily 6:30 AM & 5:00 PM Practices',
    roomNumber: 'Sports Complex Office & Gymnasium',
    leadership: [
      { name: 'Rohit Balakrishnan', role: 'President', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80' }
    ],
    achievements: [
      'State Champions in University Basketball League 2025',
      'Annual intra-college tournament "Spardha" with 1200 participants'
    ]
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-hack-2026',
    title: 'HackApex 2026: 36-Hour National Collegiate Hackathon',
    clubId: 'club-acm',
    clubName: 'ACM Student Chapter',
    category: 'Hackathon',
    description: 'Flagship university hackathon challenging students to build AI, GreenTech, Web3, and EdTech solutions with ₹2,50,000 cash prizes.',
    longDescription: 'HackApex brings together over 400 passionate hackers, designers, and innovators from across the country for a non-stop 36-hour sprint. Mentorship by industry engineers, food, swag kits, and fast fiber internet provided.',
    date: '2026-11-20',
    time: '09:00 AM - Next Day 09:00 PM',
    venue: 'Dr. APJ Abdul Kalam Central Auditorium & Tech Labs',
    capacity: 250,
    registeredCount: 198,
    attendedCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    eligibility: 'All Departments (B.Tech / MCA / M.Tech)',
    facultyCoordinator: {
      name: 'Dr. Sunita Rao',
      email: 'sunita.rao@apex.edu.in',
      department: 'Computer Science'
    },
    studentCoordinator: {
      name: 'Rishi Patel',
      contact: '+91 98765 43210'
    },
    prerequisites: ['Laptop with charger', 'GitHub account', 'Student ID Card'],
    agenda: [
      { time: '09:00 AM', activity: 'Registration check-in & Swag Distribution' },
      { time: '10:30 AM', activity: 'Keynote & Problem Statements Unveiling' },
      { time: '12:00 PM', activity: 'Hacking Commences!' },
      { time: '08:00 PM', activity: 'Mentorship Checkpoint 1 & Dinner' },
      { time: '03:00 AM', activity: 'Midnight Gaming & Pizza Break' },
      { time: '12:00 PM (D2)', activity: 'Final Pitching to Jury' },
      { time: '05:00 PM (D2)', activity: 'Awards Ceremony & Cash Prizes' }
    ],
    isFeatured: true,
    registrationDeadline: '2026-11-18',
    feedbackAllowed: false,
    tags: ['AI/ML', 'Hackathon', 'Coding', 'Prizes', 'Team Event']
  },
  {
    id: 'evt-genai-bootcamp',
    title: 'Generative AI & LLM Systems Hands-on Bootcamp',
    clubId: 'club-gdg',
    clubName: 'Google Developer Group on Campus',
    category: 'Workshop',
    description: 'Learn to build multimodal generative AI workflows, RAG pipelines, and agentic workflows using Google Gemini SDK.',
    longDescription: 'A practical, code-along workshop where participants will architect real-world generative AI microservices, fine-tune prompts, and integrate live vector retrieval systems on Google Cloud.',
    date: '2026-11-12',
    time: '02:00 PM - 05:30 PM',
    venue: 'Seminar Hall A, Science & Tech Block',
    capacity: 120,
    registeredCount: 114,
    attendedCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    eligibility: 'Open to All Students & Research Scholars',
    facultyCoordinator: {
      name: 'Prof. Anita Deshmukh',
      email: 'anita.d@apex.edu.in',
      department: 'CSE'
    },
    studentCoordinator: {
      name: 'Meera Sengupta',
      contact: '+91 98111 22334'
    },
    prerequisites: ['Basic Python knowledge', 'Google account for Colab'],
    agenda: [
      { time: '02:00 PM', activity: 'Introduction to Multimodal Foundation Models', speaker: 'Prof. Anita' },
      { time: '03:15 PM', activity: 'Live Code-along: Agentic Tool Use & Structured Outputs', speaker: 'Dev Lead Meera' },
      { time: '04:30 PM', activity: 'Mini Project Showcase & Q&A' }
    ],
    isFeatured: true,
    registrationDeadline: '2026-11-11',
    feedbackAllowed: false,
    tags: ['Gemini', 'Python', 'AI Workshop', 'Hands-on', 'Certificate']
  },
  {
    id: 'evt-drone-expo',
    title: 'Autonomous Robotics & Drone Flight Exhibition',
    clubId: 'club-robotics',
    clubName: 'Apex Robotics & Mechatronics Society',
    category: 'Technical',
    description: 'Live field demonstration of custom autonomous quadcopters, obstacle-avoidance rovers, and computer vision tracking.',
    longDescription: 'Witness high-speed drone racing trials on the sports turf, autonomous parcel landing demos, and explore interactive hardware kiosks.',
    date: '2026-11-15',
    time: '11:00 AM - 02:00 PM',
    venue: 'North Pavilion Grounds & FabLab',
    capacity: 180,
    registeredCount: 92,
    attendedCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    eligibility: 'Open to All Students',
    facultyCoordinator: {
      name: 'Dr. Vikram Chandra',
      email: 'vikram.c@apex.edu.in',
      department: 'Mechanical'
    },
    studentCoordinator: {
      name: 'Kunal Joshi',
      contact: '+91 97222 33445'
    },
    prerequisites: ['None - Spectator and interactive demo'],
    agenda: [
      { time: '11:00 AM', activity: 'Autonomous Drone Swarm Demonstration' },
      { time: '12:15 PM', activity: 'Robowars Demonstration & Hardware Walkthrough' },
      { time: '01:15 PM', activity: 'Hands-on FPV Goggles Experience Booth' }
    ],
    isFeatured: false,
    registrationDeadline: '2026-11-14',
    feedbackAllowed: false,
    tags: ['Robotics', 'Hardware', 'Drones', 'Live Demo']
  },
  {
    id: 'evt-pitch-tank',
    title: 'Campus Pitch Tank 2026: Student Venture Funding',
    clubId: 'club-ecell',
    clubName: 'Apex Entrepreneurship Cell (E-Cell)',
    category: 'Entrepreneurship',
    description: '10 shortlisted student founders pitch to angel investors and venture capitalists for ₹10 Lakhs pool funding.',
    longDescription: 'Modeled after Shark Tank, top collegiate innovators pitch their business models with 5 minutes of pitching followed by intense investor grilling.',
    date: '2026-11-25',
    time: '03:00 PM - 07:00 PM',
    venue: 'Convention Hall B, Management Wing',
    capacity: 200,
    registeredCount: 165,
    attendedCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    eligibility: 'All Students & Alumni',
    facultyCoordinator: {
      name: 'Prof. Sanjeev Kapoor',
      email: 'sanjeev.k@apex.edu.in',
      department: 'Management'
    },
    studentCoordinator: {
      name: 'Tanvi Singhania',
      contact: '+91 99000 11223'
    },
    agenda: [
      { time: '03:00 PM', activity: 'Opening Remarks by Chief Guest (VC Partner)' },
      { time: '03:30 PM', activity: 'Pitch Sessions 1 to 5' },
      { time: '05:00 PM', activity: 'Networking High Tea' },
      { time: '05:45 PM', activity: 'Pitch Sessions 6 to 10 & Verdict' }
    ],
    isFeatured: true,
    registrationDeadline: '2026-11-23',
    feedbackAllowed: false,
    tags: ['Startups', 'Pitching', 'Investors', 'Funding']
  },
  {
    id: 'evt-cultural-tarang',
    title: 'Tarang 2026: Annual Inter-College Drama Festival',
    clubId: 'club-kalakriti',
    clubName: 'Kalakriti - Drama & Cultural Society',
    category: 'Cultural',
    description: 'Two days of dramatic theatre, street plays (Nukkad Natak), musical solos, and mono-act competitions.',
    longDescription: 'Experience the electric buzz of campus theatre with 18 university teams competing across stages. Food stalls, music bands, and celebrity judges.',
    date: '2026-12-05',
    time: '10:00 AM - 08:30 PM',
    venue: 'Open Air Amphitheatre',
    capacity: 600,
    registeredCount: 420,
    attendedCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    eligibility: 'Open to All',
    facultyCoordinator: {
      name: 'Dr. Shalini Mukhopadhyay',
      email: 'shalini.m@apex.edu.in',
      department: 'Humanities'
    },
    studentCoordinator: {
      name: 'Kabir Oberoi',
      contact: '+91 98888 77665'
    },
    agenda: [
      { time: '10:00 AM', activity: 'Nukkad Natak (Street Play) Championship' },
      { time: '02:00 PM', activity: 'Stage Drama Finals' },
      { time: '06:00 PM', activity: 'Band Night & Awards' }
    ],
    isFeatured: true,
    registrationDeadline: '2026-12-03',
    feedbackAllowed: false,
    tags: ['Theatre', 'Drama', 'Cultural', 'Fest', 'Music']
  },
  {
    id: 'evt-spardha-badminton',
    title: 'Inter-Department Badminton & Table Tennis Clash',
    clubId: 'club-sports',
    clubName: 'Apex Sports & Athletics Council',
    category: 'Sports',
    description: 'Knockout matches for singles and doubles across all branch years. Trophies, medals, and points for Annual Athletic Cup.',
    longDescription: 'Annual indoor tournament under floodlights. Live scoreboards, refreshments, and athletic medical desk on standby.',
    date: '2026-11-18',
    time: '04:00 PM - 09:00 PM',
    venue: 'Indoor Sports Arena & Court 1-4',
    capacity: 100,
    registeredCount: 88,
    attendedCount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    eligibility: 'All Enrolled Students (Valid Sports Shoes Required)',
    facultyCoordinator: {
      name: 'Coach Rajesh Rana',
      email: 'sports@apex.edu.in',
      department: 'Physical Education'
    },
    studentCoordinator: {
      name: 'Rohit Balakrishnan',
      contact: '+91 97777 66554'
    },
    agenda: [
      { time: '04:00 PM', activity: 'Warmup & Fixture Draw Announcements' },
      { time: '04:30 PM', activity: 'Singles Knockouts' },
      { time: '07:30 PM', activity: 'Doubles Championship & Medals' }
    ],
    isFeatured: false,
    registrationDeadline: '2026-11-16',
    feedbackAllowed: false,
    tags: ['Sports', 'Badminton', 'Fitness', 'Medals']
  },
  // Past events for instant Feedback & Certificate testing
  {
    id: 'evt-web3-symposium',
    title: 'Symposium on Decentralized Systems & Smart Contracts',
    clubId: 'club-acm',
    clubName: 'ACM Student Chapter',
    category: 'Academic',
    description: 'Technical deep-dive on blockchain consensus mechanisms, zero-knowledge proofs, and Ethereum smart contract security.',
    longDescription: 'An academic symposium with visiting researchers from IIT and industry security auditors.',
    date: '2026-10-24',
    time: '10:00 AM - 01:00 PM',
    venue: 'Auditorium Hall 2',
    capacity: 150,
    registeredCount: 145,
    attendedCount: 138,
    bannerUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    status: 'completed',
    eligibility: 'Open to All',
    facultyCoordinator: {
      name: 'Dr. Sunita Rao',
      email: 'sunita.rao@apex.edu.in',
      department: 'Computer Science'
    },
    studentCoordinator: {
      name: 'Devansh Kulkarni',
      contact: '+91 98765 43210'
    },
    isFeatured: false,
    registrationDeadline: '2026-10-22',
    feedbackAllowed: true,
    averageRating: 4.8,
    tags: ['Blockchain', 'Security', 'Research', 'Completed']
  },
  {
    id: 'evt-resume-masterclass',
    title: 'Placement Prep: Tech Resume & DSA Mock Interviews',
    clubId: 'club-gdg',
    clubName: 'Google Developer Group on Campus',
    category: 'Workshop',
    description: 'Alumni working at Google, Microsoft, and Amazon conduct resume reviews and live technical mock interview sessions.',
    longDescription: 'Crucial career accelerator for pre-final and final year students looking to crack top product company internships and placements.',
    date: '2026-10-15',
    time: '04:00 PM - 07:00 PM',
    venue: 'Virtual Hall & Seminar Hall B',
    capacity: 200,
    registeredCount: 195,
    attendedCount: 182,
    bannerUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    status: 'completed',
    eligibility: '2nd, 3rd, and Final Year Students',
    facultyCoordinator: {
      name: 'Prof. Anita Deshmukh',
      email: 'anita.d@apex.edu.in',
      department: 'CSE'
    },
    studentCoordinator: {
      name: 'Meera Sengupta',
      contact: '+91 98111 22334'
    },
    isFeatured: false,
    registrationDeadline: '2026-10-14',
    feedbackAllowed: true,
    averageRating: 4.9,
    tags: ['Placement', 'Career', 'Interviews', 'Completed']
  }
];

export const INITIAL_REGISTRATIONS: EventRegistration[] = [
  {
    id: 'reg-001',
    eventId: 'evt-hack-2026',
    eventTitle: 'HackApex 2026: 36-Hour National Collegiate Hackathon',
    eventDate: '2026-11-20',
    eventTime: '09:00 AM - Next Day 09:00 PM',
    eventVenue: 'Dr. APJ Abdul Kalam Central Auditorium & Tech Labs',
    userId: 'user-std-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@apex.edu.in',
    studentId: '22BCSE104',
    department: 'Computer Science & Engineering',
    registeredAt: '2026-11-01T14:20:00Z',
    ticketCode: 'APEX-HACK-7492',
    status: 'confirmed'
  },
  {
    id: 'reg-002',
    eventId: 'evt-genai-bootcamp',
    eventTitle: 'Generative AI & LLM Systems Hands-on Bootcamp',
    eventDate: '2026-11-12',
    eventTime: '02:00 PM - 05:30 PM',
    eventVenue: 'Seminar Hall A, Science & Tech Block',
    userId: 'user-std-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@apex.edu.in',
    studentId: '22BCSE104',
    department: 'Computer Science & Engineering',
    registeredAt: '2026-11-02T10:15:00Z',
    ticketCode: 'APEX-GENAI-3810',
    status: 'confirmed'
  },
  {
    id: 'reg-003',
    eventId: 'evt-web3-symposium',
    eventTitle: 'Symposium on Decentralized Systems & Smart Contracts',
    eventDate: '2026-10-24',
    eventTime: '10:00 AM - 01:00 PM',
    eventVenue: 'Auditorium Hall 2',
    userId: 'user-std-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@apex.edu.in',
    studentId: '22BCSE104',
    department: 'Computer Science & Engineering',
    registeredAt: '2026-10-18T11:00:00Z',
    ticketCode: 'APEX-WEB3-9941',
    status: 'attended',
    attendedAt: '2026-10-24T09:50:00Z'
  },
  {
    id: 'reg-004',
    eventId: 'evt-resume-masterclass',
    eventTitle: 'Placement Prep: Tech Resume & DSA Mock Interviews',
    eventDate: '2026-10-15',
    eventTime: '04:00 PM - 07:00 PM',
    eventVenue: 'Virtual Hall & Seminar Hall B',
    userId: 'user-std-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@apex.edu.in',
    studentId: '22BCSE104',
    department: 'Computer Science & Engineering',
    registeredAt: '2026-10-10T16:30:00Z',
    ticketCode: 'APEX-PREP-1284',
    status: 'attended',
    attendedAt: '2026-10-15T15:55:00Z'
  },
  // Sample registrations for other students to populate faculty views
  {
    id: 'reg-005',
    eventId: 'evt-hack-2026',
    eventTitle: 'HackApex 2026: 36-Hour National Collegiate Hackathon',
    eventDate: '2026-11-20',
    eventTime: '09:00 AM - Next Day 09:00 PM',
    eventVenue: 'Dr. APJ Abdul Kalam Central Auditorium & Tech Labs',
    userId: 'user-std-2',
    userName: 'Priya Iyer',
    userEmail: 'priya.i@apex.edu.in',
    studentId: '22BECE045',
    department: 'Electronics & Communication',
    registeredAt: '2026-11-01T15:10:00Z',
    ticketCode: 'APEX-HACK-8193',
    status: 'confirmed'
  },
  {
    id: 'reg-006',
    eventId: 'evt-hack-2026',
    eventTitle: 'HackApex 2026: 36-Hour National Collegiate Hackathon',
    eventDate: '2026-11-20',
    eventTime: '09:00 AM - Next Day 09:00 PM',
    eventVenue: 'Dr. APJ Abdul Kalam Central Auditorium & Tech Labs',
    userId: 'user-std-3',
    userName: 'Siddharth Mehra',
    userEmail: 'sid.m@apex.edu.in',
    studentId: '23BIT089',
    department: 'Information Technology',
    registeredAt: '2026-11-02T11:45:00Z',
    ticketCode: 'APEX-HACK-4421',
    status: 'confirmed'
  },
  {
    id: 'reg-007',
    eventId: 'evt-hack-2026',
    eventTitle: 'HackApex 2026: 36-Hour National Collegiate Hackathon',
    eventDate: '2026-11-20',
    eventTime: '09:00 AM - Next Day 09:00 PM',
    eventVenue: 'Dr. APJ Abdul Kalam Central Auditorium & Tech Labs',
    userId: 'user-std-4',
    userName: 'Ananya Roy',
    userEmail: 'ananya.roy@apex.edu.in',
    studentId: '21BMECH012',
    department: 'Mechanical Engineering',
    registeredAt: '2026-11-03T09:20:00Z',
    ticketCode: 'APEX-HACK-3309',
    status: 'confirmed'
  }
];

export const INITIAL_FEEDBACK: EventFeedback[] = [
  {
    id: 'fb-001',
    eventId: 'evt-web3-symposium',
    eventTitle: 'Symposium on Decentralized Systems & Smart Contracts',
    userId: 'user-std-1',
    userName: 'Aarav Sharma',
    studentId: '22BCSE104',
    rating: 5,
    categoryRatings: {
      organization: 5,
      content: 5,
      venue: 4
    },
    comments: 'Superb guest lectures! The live dissection of smart contract security vulnerabilities was eye-opening. Looking forward to more technical symposia.',
    submittedAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'fb-002',
    eventId: 'evt-resume-masterclass',
    eventTitle: 'Placement Prep: Tech Resume & DSA Mock Interviews',
    userId: 'user-std-1',
    userName: 'Aarav Sharma',
    studentId: '22BCSE104',
    rating: 5,
    categoryRatings: {
      organization: 5,
      content: 5,
      venue: 5
    },
    comments: 'Direct feedback from working Google and Microsoft alumni helped me revamp my project descriptions completely. Truly high ROI event.',
    submittedAt: '2026-10-16T18:10:00Z'
  },
  {
    id: 'fb-003',
    eventId: 'evt-web3-symposium',
    eventTitle: 'Symposium on Decentralized Systems & Smart Contracts',
    userId: 'user-std-5',
    userName: 'Rohan Gupta',
    studentId: '22BCSE088',
    rating: 4,
    categoryRatings: {
      organization: 4,
      content: 5,
      venue: 4
    },
    comments: 'Great speakers and depth. Would love hands-on code labs in the next edition alongside theory talks.',
    submittedAt: '2026-10-25T16:00:00Z'
  }
];

export const INITIAL_ANNOUNCEMENTS: CampusAnnouncement[] = [
  {
    id: 'anc-001',
    title: 'HackApex 2026 Team Registrations Open - Free T-shirts & Swag Kits',
    message: 'Registrations are flying fast for HackApex 2026 hosted by ACM! Teams can register up to 4 members. Hardware lab stations will also be provided.',
    priority: 'important',
    date: '2026-11-03',
    author: 'Dr. Sunita Rao',
    authorRole: 'Faculty Coordinator - ACM',
    targetRole: 'all'
  },
  {
    id: 'anc-002',
    title: 'Dr. APJ Abdul Kalam Auditorium Audio System Upgrade Complete',
    message: 'Auditorium A is now fitted with high-fidelity line array speakers and dual multi-directional laser projectors. Event organizers may request technical sound checks 2 hours prior.',
    priority: 'normal',
    date: '2026-11-01',
    author: 'Prof. R. K. Verma',
    authorRole: 'Dean of Student Affairs',
    targetRole: 'faculty'
  },
  {
    id: 'anc-003',
    title: 'New Student Club Charter Window Open for Spring Semester',
    message: 'Students wishing to establish new specialized academic or cultural clubs can submit draft charter proposals to the Dean Student Affairs Office before Nov 30.',
    priority: 'normal',
    date: '2026-10-28',
    author: 'Admin Office',
    authorRole: 'Central Campus Administration',
    targetRole: 'students'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Pass Confirmed: HackApex 2026',
    message: 'Your registration ticket #APEX-HACK-7492 is ready. Check your digital badge in My Passes.',
    timestamp: '2 hours ago',
    read: false,
    type: 'registration',
    linkId: 'evt-hack-2026'
  },
  {
    id: 'notif-2',
    title: 'New Event Published',
    message: 'GDG on Campus announced: Generative AI & LLM Systems Hands-on Bootcamp.',
    timestamp: '1 day ago',
    read: false,
    type: 'event',
    linkId: 'evt-genai-bootcamp'
  },
  {
    id: 'notif-3',
    title: 'Certificate Available',
    message: 'Your participation certificate for "Placement Prep: Tech Resume & DSA Mock Interviews" is generated.',
    timestamp: '3 days ago',
    read: true,
    type: 'club',
    linkId: 'evt-resume-masterclass'
  }
];
