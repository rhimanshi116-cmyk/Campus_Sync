-- =====================================================================
-- CAMPUSSYNC - CAMPUS & CLUB EVENT MANAGEMENT SYSTEM
-- Relational Database Schema & Seed Data (MySQL / MariaDB / PostgreSQL)
-- Suitable for phpMyAdmin, XAMPP, WAMP, MySQL Workbench, PostgreSQL
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `campus_event_management` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `campus_event_management`;

-- ---------------------------------------------------------------------
-- Table: users (Students, Faculty Coordinators, Deans / Admins)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `event_feedback`;
DROP TABLE IF EXISTS `event_registrations`;
DROP TABLE IF EXISTS `club_memberships`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `clubs`;
DROP TABLE IF EXISTS `announcements`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'faculty', 'admin') NOT NULL DEFAULT 'student',
  `department` VARCHAR(120) NOT NULL,
  `student_emp_id` VARCHAR(50) NOT NULL UNIQUE,
  `academic_year` VARCHAR(50) DEFAULT '1st Year',
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Users
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `department`, `student_emp_id`, `academic_year`, `avatar_url`) VALUES
('user-std-1', 'Aarav Sharma', 'aarav.sharma@apex.edu.in', 'student@123', 'student', 'Computer Science & Engineering', '22BCSE104', '3rd Year (B.Tech)', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=256'),
('user-fac-1', 'Dr. Sunita Rao', 'sunita.rao@apex.edu.in', 'faculty@123', 'faculty', 'Computer Science & Engineering', 'EMP-FAC-042', NULL, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256'),
('user-adm-1', 'Prof. R. K. Verma', 'dean.studentaffairs@apex.edu.in', 'admin@123', 'admin', 'Office of Dean Student Welfare', 'EMP-ADM-001', NULL, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256');

-- ---------------------------------------------------------------------
-- Table: clubs (Student Societies, Technical & Cultural Clubs)
-- ---------------------------------------------------------------------
CREATE TABLE `clubs` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `faculty_advisor` VARCHAR(150) NOT NULL,
  `student_lead` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `member_count` INT DEFAULT 0,
  `founded_year` INT DEFAULT 2020,
  `meeting_schedule` VARCHAR(150) DEFAULT 'Wednesdays 4:30 PM',
  `room_number` VARCHAR(100) DEFAULT 'Student Activity Center',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Clubs
INSERT INTO `clubs` (`id`, `name`, `code`, `category`, `description`, `faculty_advisor`, `student_lead`, `email`, `member_count`, `founded_year`, `meeting_schedule`, `room_number`) VALUES
('club-acm', 'ACM Student Chapter', 'ACM-AIT', 'Technology', 'Premier computing society advancing technical innovation, algorithmic problem solving, open source, and research excellence.', 'Dr. Sunita Rao (Associate Prof, CSE)', 'Devansh Kulkarni (Final Year CSE)', 'acm@apex.edu.in', 340, 2017, 'Every Wednesday 4:30 PM', 'Turing Hall, CS Block 3rd Floor'),
('club-gdg', 'Google Developer Group On Campus', 'GDG-AIT', 'Technology', 'Official Google Developer community building cloud, mobile, Android, Web, and AI projects with global industry mentors.', 'Prof. Amit Mehra (IT Dept)', 'Ananya Iyer (3rd Year CSE)', 'gdg@apex.edu.in', 285, 2019, 'Bi-weekly Fridays 5:00 PM', 'Google Innovation Lab, Block B'),
('club-robotics', 'RoboTech Society', 'ROBO-AIT', 'Technology', 'Interdisciplinary robotics, IoT, drone tech, embedded systems, and autonomous combat robotics engineering team.', 'Dr. V. K. Nambiar (Mechanical)', 'Rohan Singhania (Final Year ECE)', 'robotics@apex.edu.in', 190, 2018, 'Tuesdays & Thursdays 4:00 PM', 'Mechatronics Lab, Workshop Wing'),
('club-kalakriti', 'Kalakriti Cultural Society', 'KALA-AIT', 'Culture & Arts', 'The artistic heartbeat of campus featuring classical and contemporary dance, dramatic theatre, choral music, and art exhibitions.', 'Dr. Malini Sen (Humanities)', 'Priya Nair (3rd Year Biotechnology)', 'kalakriti@apex.edu.in', 410, 2015, 'Mondays & Thursdays 5:30 PM', 'Main Auditorium & Amphitheatre'),
('club-ecell', 'E-Cell & Innovation Hub', 'ECell-AIT', 'Social & Leadership', 'Nurturing student startup incubation, seed venture capital pitches, startup weekends, and entrepreneurial leadership.', 'Prof. Arvind Khurana (Management)', 'Siddharth Goyal (Final Year Mech)', 'ecell@apex.edu.in', 230, 2018, 'Saturdays 11:00 AM', 'Incubation Center, Tech Park 1st Floor'),
('club-sports', 'Apex Sports Council', 'SPORTS-AIT', 'Sports', 'Organizing inter-university athletic meets, badminton tournaments, cricket championships, football leagues, and physical wellness.', 'Coach Baljeet Singh (Physical Education)', 'Harpreet Singh (4th Year Civil)', 'sports@apex.edu.in', 520, 2014, 'Daily 6:00 AM & 5:00 PM', 'University Stadium & Sports Complex');

-- ---------------------------------------------------------------------
-- Table: events (Campus Events, Workshops, Hackathons, Fests)
-- ---------------------------------------------------------------------
CREATE TABLE `events` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `club_id` VARCHAR(64) NOT NULL,
  `club_name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(80) NOT NULL,
  `description` TEXT NOT NULL,
  `long_description` TEXT DEFAULT NULL,
  `event_date` DATE NOT NULL,
  `event_time` VARCHAR(80) NOT NULL,
  `venue` VARCHAR(150) NOT NULL,
  `capacity` INT NOT NULL DEFAULT 100,
  `registered_count` INT NOT NULL DEFAULT 0,
  `attended_count` INT NOT NULL DEFAULT 0,
  `banner_url` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('upcoming', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  `eligibility` VARCHAR(100) DEFAULT 'All Students',
  `faculty_coordinator_name` VARCHAR(150) DEFAULT NULL,
  `faculty_coordinator_email` VARCHAR(150) DEFAULT NULL,
  `student_coordinator_name` VARCHAR(150) DEFAULT NULL,
  `student_coordinator_contact` VARCHAR(80) DEFAULT NULL,
  `registration_deadline` DATE DEFAULT NULL,
  `average_rating` DECIMAL(3,1) DEFAULT 4.5,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`club_id`) REFERENCES `clubs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Events
INSERT INTO `events` (`id`, `title`, `club_id`, `club_name`, `category`, `description`, `event_date`, `event_time`, `venue`, `capacity`, `registered_count`, `attended_count`, `banner_url`, `status`, `eligibility`, `faculty_coordinator_name`, `faculty_coordinator_email`, `student_coordinator_name`, `student_coordinator_contact`, `registration_deadline`, `average_rating`) VALUES
('evt-1', 'ApexHack 2026: 36-Hour National Hackathon', 'club-acm', 'ACM Student Chapter', 'Hackathon', 'Flagship collegiate hackathon tackling real-world problems in AI, ClimateTech, Web3, and Healthcare with INR 2,50,000 in cash prizes.', '2026-11-20', '09:00 AM - 09:00 PM (36 Hrs)', 'Auditorium Complex & Central Labs', 300, 248, 192, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000', 'upcoming', 'All Engineering & Technology Students', 'Dr. Sunita Rao', 'sunita.rao@apex.edu.in', 'Devansh Kulkarni', '+91 98765 43210', '2026-11-18', 4.9),
('evt-2', 'Hands-On GenAI & LLM Fine-Tuning Bootcamp', 'club-gdg', 'Google Developer Group On Campus', 'Workshop', 'Intensive practical session on training open-source LLMs, building RAG architectures, and deploying serverless inference pipelines.', '2026-11-16', '10:00 AM - 04:00 PM', 'Computer Center Lab 4, CS Block', 120, 115, 88, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000', 'upcoming', 'Open to 2nd, 3rd & Final Year Students', 'Prof. Amit Mehra', 'amit.mehra@apex.edu.in', 'Ananya Iyer', '+91 98112 34567', '2026-11-15', 4.8),
('evt-3', 'RoboWars & Drone Obstacle Grand Prix', 'club-robotics', 'RoboTech Society', 'Technical', 'High-adrenaline combat robotics arena (15kg & 30kg category) along with an autonomous FPV drone obstacle racing track.', '2026-11-24', '11:00 AM - 06:00 PM', 'Campus Open Amphitheatre', 400, 310, 240, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000', 'upcoming', 'All College & University Teams', 'Dr. V. K. Nambiar', 'nambiar@apex.edu.in', 'Rohan Singhania', '+91 97654 32109', '2026-11-22', 4.7),
('evt-4', 'Aura 2026: Annual Inter-College Cultural Fest', 'club-kalakriti', 'Kalakriti Cultural Society', 'Cultural', 'A 3-day cultural fest featuring battle of the bands, classical fusion night, celebrity performance, theatre, and fashion showcase.', '2026-11-28', '05:00 PM - 10:30 PM', 'University Main Stadium Grounds', 1500, 1120, 850, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000', 'upcoming', 'All Students & Registered Alumni', 'Dr. Malini Sen', 'malini.sen@apex.edu.in', 'Priya Nair', '+91 99887 76655', '2026-11-26', 4.9),
('evt-5', 'Campus Pitch-A-Thon & Angel Investor Summit', 'club-ecell', 'E-Cell & Innovation Hub', 'Entrepreneurship', 'Present your startup idea to top venture capitalists and angel networks. Top 3 selected teams receive instant seed funding and incubator workspace.', '2026-12-02', '09:30 AM - 04:30 PM', 'Management Block Auditorium', 150, 94, 65, 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1000', 'upcoming', 'All Students with Startup MVP', 'Prof. Arvind Khurana', 'khurana@apex.edu.in', 'Siddharth Goyal', '+91 91234 56789', '2026-11-30', 4.6),
('evt-6', 'Inter-Department Cricket & Football Trophy', 'club-sports', 'Apex Sports Council', 'Sports', 'Annual collegiate sports championship featuring 16 department teams competing for the Vice Chancellor Rolling Trophy.', '2026-12-05', '08:00 AM - 05:00 PM', 'Sports Ground & Cricket Pavilion', 600, 480, 360, 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000', 'upcoming', 'Department Teams & General Spectators', 'Coach Baljeet Singh', 'sports@apex.edu.in', 'Harpreet Singh', '+91 98450 12345', '2026-12-03', 4.8);

-- ---------------------------------------------------------------------
-- Table: event_registrations (Passes, QR Code Tokens, Attendance)
-- ---------------------------------------------------------------------
CREATE TABLE `event_registrations` (
  `id` VARCHAR(64) PRIMARY KEY,
  `event_id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `user_email` VARCHAR(150) NOT NULL,
  `student_id` VARCHAR(50) NOT NULL,
  `department` VARCHAR(120) NOT NULL,
  `ticket_code` VARCHAR(50) NOT NULL UNIQUE,
  `status` ENUM('confirmed', 'cancelled', 'attended') NOT NULL DEFAULT 'confirmed',
  `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `attended_at` TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Registrations
INSERT INTO `event_registrations` (`id`, `event_id`, `user_id`, `user_name`, `user_email`, `student_id`, `department`, `ticket_code`, `status`, `registered_at`, `attended_at`) VALUES
('reg-1', 'evt-1', 'user-std-1', 'Aarav Sharma', 'aarav.sharma@apex.edu.in', '22BCSE104', 'Computer Science & Engineering', 'APEX-HACK-4821', 'attended', '2026-11-01 10:15:00', '2026-11-05 09:30:00'),
('reg-2', 'evt-2', 'user-std-1', 'Aarav Sharma', 'aarav.sharma@apex.edu.in', '22BCSE104', 'Computer Science & Engineering', 'APEX-BOOT-9142', 'confirmed', '2026-11-02 14:20:00', NULL),
('reg-3', 'evt-4', 'user-std-1', 'Aarav Sharma', 'aarav.sharma@apex.edu.in', '22BCSE104', 'Computer Science & Engineering', 'APEX-AURA-6320', 'confirmed', '2026-11-03 16:45:00', NULL);

-- ---------------------------------------------------------------------
-- Table: event_feedback (Student Reviews & Star Ratings)
-- ---------------------------------------------------------------------
CREATE TABLE `event_feedback` (
  `id` VARCHAR(64) PRIMARY KEY,
  `event_id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `student_id` VARCHAR(50) NOT NULL,
  `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `organization_rating` INT DEFAULT 5,
  `content_rating` INT DEFAULT 5,
  `venue_rating` INT DEFAULT 5,
  `comments` TEXT NOT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Feedback
INSERT INTO `event_feedback` (`id`, `event_id`, `user_id`, `user_name`, `student_id`, `rating`, `organization_rating`, `content_rating`, `venue_rating`, `comments`, `submitted_at`) VALUES
('fb-1', 'evt-1', 'user-std-1', 'Aarav Sharma', '22BCSE104', 5, 5, 5, 4, 'Outstanding organization! High-speed network, mentoring support, and seamless food logistics throughout 36 hours.', '2026-11-06 11:00:00');

-- ---------------------------------------------------------------------
-- Table: announcements (Campus Broadcasts & Alerts)
-- ---------------------------------------------------------------------
CREATE TABLE `announcements` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `priority` ENUM('normal', 'important', 'urgent') NOT NULL DEFAULT 'normal',
  `announcement_date` DATE NOT NULL,
  `author` VARCHAR(150) NOT NULL,
  `author_role` VARCHAR(100) NOT NULL,
  `target_role` VARCHAR(50) DEFAULT 'all',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Announcements
INSERT INTO `announcements` (`id`, `title`, `message`, `priority`, `announcement_date`, `author`, `author_role`, `target_role`) VALUES
('anc-1', 'ApexHack 2026 Shortlisted Teams Announced', 'Preliminary rounds completed. Top 60 teams have been assigned lab benches and hardware kits for the final 36-hour sprint.', 'important', '2026-11-04', 'Dr. Sunita Rao', 'Faculty Convener, Hackathons', 'all'),
('anc-2', 'Digital QR Ticket Verification Mandatory', 'All attendees must bring the digital QR boarding pass on their phones for venue gate entry. Certificates unlock automatically upon attendance verification.', 'urgent', '2026-11-03', 'Office of Dean Student Welfare', 'Dean Student Affairs', 'all');

-- =====================================================================
-- End of Database Schema
-- =====================================================================
