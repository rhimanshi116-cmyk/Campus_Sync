# CampusSync - Campus & Club Event Management System
## Academic Project Documentation & Local Setup Guide

---

### 1. Project Overview
**CampusSync** is a full-stack, enterprise-grade collegiate event and student society management portal designed to streamline campus activities, student registrations, attendance tracking, and certificate distribution.

### 2. Key Modules
- **Institutional Single Sign-On (SSO)** with password-protected role authorization.
- **Student Hub**: Event directory, category filters, calendar view, digital QR boarding pass generator with `.ics` calendar sync, club memberships, and verifiable participation certificates.
- **Faculty Coordinator Portal**: 3-step event publishing wizard, QR optical scanner check-in, real-time student attendance roster, CSV roster export, and multi-criteria feedback reviews.
- **Admin Office / Dean Control Center**: University analytics KPI cards, department registration distributions, student society charter approvals, and broadcast announcements.
- **Global Theme Engine**: Complete dark/light mode toggle with persistent session state.

---

### 3. Technologies Used
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, Motion animations, Canvas Confetti.
- **Backend / Server**: Node.js 22, Express 4.x, TypeScript compiler (`tsx`).
- **Database**:
  - Web Runtime: Client state persistence with `localStorage`.
  - Relational Schema: `database.sql` (MySQL 8 / MariaDB / PostgreSQL / phpMyAdmin compatible).

---

### 4. Default Login Credentials

| Role | Account Name | ID / Email | Passcode |
| :--- | :--- | :--- | :--- |
| **Student** | Aarav Sharma | `22BCSE104` / `aarav.sharma@apex.edu.in` | `student@123` |
| **Faculty Coordinator** | Dr. Sunita Rao | `EMP-FAC-042` / `sunita.rao@apex.edu.in` | `faculty@123` |
| **University Admin / Dean** | Prof. R. K. Verma | `EMP-ADM-001` / `dean.studentaffairs@apex.edu.in` | `admin@123` |

---

### 5. How to Run Locally

#### Prerequisites
- Node.js version 18+ or 20+ installed ([Download Node.js](https://nodejs.org/)).
- Optional for database: XAMPP, WAMP, or MySQL Workbench.

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

#### Step 3: Build & Run Production Server
```bash
# Build production bundle
npm run build

# Run production Express server
npm start
```

---

### 6. Importing the SQL Database (XAMPP / phpMyAdmin / MySQL)
1. Open **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Open your browser and navigate to `http://localhost/phpmyadmin`.
3. Click on the **"Import"** tab in the top navigation bar.
4. Click **"Choose File"** and select `database.sql` included in this folder.
5. Click **"Import"** at the bottom.
6. The database `campus_event_management` with all 6 tables and pre-loaded seed data will be created instantly.
