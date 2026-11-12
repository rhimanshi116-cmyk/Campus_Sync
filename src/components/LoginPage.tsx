import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Shield, 
  Fingerprint,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import confetti from 'canvas-confetti';

interface LoginPageProps {
  onOpenProposal?: () => void;
}

interface DemoAccountConfig {
  role: UserRole;
  title: string;
  name: string;
  email: string;
  idNumber: string;
  dept: string;
  badge: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  icon: React.ReactNode;
}

const DEMO_ACCOUNTS: DemoAccountConfig[] = [
  {
    role: 'student',
    title: 'Student Portal',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@apex.edu.in',
    idNumber: '22BCSE104',
    dept: 'Computer Science & Engineering',
    badge: 'Tier 1 Access',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-200 dark:border-emerald-500/40 hover:border-emerald-500',
    bgClass: 'bg-emerald-50/60 dark:bg-emerald-950/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40',
    icon: <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
  },
  {
    role: 'faculty',
    title: 'Faculty Coordinator',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@apex.edu.in',
    idNumber: 'EMP-FAC-042',
    dept: 'CSE Dept & ACM Faculty Advisor',
    badge: 'Tier 2 Access',
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    borderClass: 'border-indigo-200 dark:border-indigo-500/40 hover:border-indigo-500',
    bgClass: 'bg-indigo-50/60 dark:bg-indigo-950/20 hover:bg-indigo-100/50 dark:hover:bg-indigo-950/40',
    icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
  },
  {
    role: 'admin',
    title: 'Dean / University Admin',
    name: 'Prof. R. K. Verma',
    email: 'dean.studentaffairs@apex.edu.in',
    idNumber: 'EMP-ADM-001',
    dept: 'Office of Dean Student Welfare',
    badge: 'Tier 3 Access',
    colorClass: 'text-purple-600 dark:text-purple-400',
    borderClass: 'border-purple-200 dark:border-purple-500/40 hover:border-purple-500',
    bgClass: 'bg-purple-50/60 dark:bg-purple-950/20 hover:bg-purple-100/50 dark:hover:bg-purple-950/40',
    icon: <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
  }
];

export const LoginPage: React.FC<LoginPageProps> = () => {
  const { login, loginAsPreset, registerUser } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  
  // Theme toggle state (mirrors the dashboard theme switcher)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  
  // Login form state (no passwords)
  const [identifier, setIdentifier] = useState('aarav.sharma@apex.edu.in');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Register form state (no passwords)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRollId, setRegRollId] = useState('');
  const [regDept, setRegDept] = useState('Computer Science & Engineering');
  const [regYear, setRegYear] = useState('1st Year (B.Tech)');
  const [regRole, setRegRole] = useState<UserRole>('student');

  const handleRoleTabSelect = (role: UserRole) => {
    setSelectedRole(role);
    setLoginError('');
    if (role === 'student') {
      setIdentifier('aarav.sharma@apex.edu.in');
    } else if (role === 'faculty') {
      setIdentifier('sunita.rao@apex.edu.in');
    } else if (role === 'admin') {
      setIdentifier('dean.studentaffairs@apex.edu.in');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!identifier.trim()) {
      setLoginError('Please enter your Institutional Email or Roll/Employee ID.');
      return;
    }

    const res = login(identifier, undefined, selectedRole);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleDirectDemoAccess = (role: UserRole) => {
    loginAsPreset(role);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!regName.trim() || !regEmail.trim() || !regRollId.trim()) {
      setLoginError('Please fill in all required fields.');
      return;
    }

    const res = registerUser({
      name: regName,
      email: regEmail,
      department: regDept,
      studentIdOrEmpId: regRollId,
      year: regYear,
      role: regRole
    });

    if (!res.success) {
      setLoginError(res.message);
    } else {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans transition-colors duration-200">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner with Theme Toggle */}
      <header className="relative z-10 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* College Crest & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">CampusSync</span>
                <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-400/30 px-2 py-0.5 rounded">
                  AIT Official Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Apex Institute of Technology &bull; Campus &amp; Club Event Management System
              </p>
            </div>
          </div>

          {/* Right Controls: SSL Status & Dark/Light Mode Switcher */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mr-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">Single Sign-On (SSO) Secured</span>
            </div>

            {/* Global Theme Toggle (Same as in Dashboard) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer border border-slate-200 dark:border-slate-800"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Login / Register Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-4xl grid md:grid-cols-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl transition-colors">
          
          {/* Left Column: Quick Role Verification */}
          <div className="md:col-span-5 p-6 sm:p-8 bg-gradient-to-br from-indigo-50/60 via-slate-50 to-slate-100 dark:from-indigo-950/70 dark:via-slate-900 dark:to-slate-950 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 transition-colors">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-400/30">
                <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Single Sign-On (SSO) Portal</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Institutional Sign In
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Centralized gateway for campus events, club societies, digital QR passes, attendance rosters, and verified certificates.
              </p>
            </div>

            {/* Verified Campus Role Accounts List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  Instant Campus Role Access:
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">1-Click Authorized</span>
              </div>

              {DEMO_ACCOUNTS.map((acc) => (
                <div
                  key={acc.role}
                  className={`p-3 rounded-2xl border transition-all ${acc.bgClass} ${acc.borderClass} group relative`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center shrink-0 shadow-2xs">
                        {acc.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{acc.title}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 ${acc.colorClass}`}>
                            {acc.name.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{acc.idNumber} &bull; {acc.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions for this demo account */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole(acc.role);
                        setIdentifier(acc.email);
                        setLoginError('');
                      }}
                      className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                    >
                      Fill into Form
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectDemoAccess(acc.role)}
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg transition shadow-xs cursor-pointer"
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span>Enter as {acc.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Institutional SSL Secured
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Session Sync Active</span>
            </div>
          </div>

          {/* Right Column: SSO Sign-In & Registration Form */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white dark:bg-slate-900/60 transition-colors">
            
            {/* Tab: Login vs Register */}
            <div>
              <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setLoginError('');
                  }}
                  className={`text-sm font-bold pb-2 border-b-2 transition cursor-pointer ${
                    authMode === 'login'
                      ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Portal Sign In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setLoginError('');
                  }}
                  className={`text-sm font-bold pb-2 border-b-2 transition cursor-pointer ${
                    authMode === 'register'
                      ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  New Student Registration
                </button>
              </div>

              {loginError && (
                <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            {/* LOGIN FORM (No Passwords for Security) */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Role Switcher tabs */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Access Role Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRoleTabSelect('student')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border cursor-pointer ${
                        selectedRole === 'student'
                          ? 'bg-emerald-100 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/50 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Student</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleTabSelect('faculty')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border cursor-pointer ${
                        selectedRole === 'faculty'
                          ? 'bg-indigo-100 dark:bg-indigo-600/30 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/50 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Faculty</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleTabSelect('admin')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border cursor-pointer ${
                        selectedRole === 'admin'
                          ? 'bg-purple-100 dark:bg-purple-600/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/50 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin</span>
                    </button>
                  </div>
                </div>

                {/* Identifier input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Institutional Email or Roll/Emp ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. 22BCSE104 or email@apex.edu.in"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Institutional credentials are authenticated directly through campus directory services.
                  </p>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Remember authenticated session</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize &amp; Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* REGISTRATION FORM (No Passwords for Security) */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                      Full Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Sengupta"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                      College Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 23BCSE201"
                      value={regRollId}
                      onChange={(e) => setRegRollId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                    College Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@apex.edu.in"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                      Department
                    </label>
                    <select
                      value={regDept}
                      onChange={(e) => setRegDept(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                      <option value="Electronics & Communication">Electronics (ECE)</option>
                      <option value="Information Technology">Information Tech (IT)</option>
                      <option value="Mechanical Engineering">Mechanical Eng (ME)</option>
                      <option value="Management Studies">Management Studies</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                      Academic Year
                    </label>
                    <select
                      value={regYear}
                      onChange={(e) => setRegYear(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value="1st Year (B.Tech)">1st Year</option>
                      <option value="2nd Year (B.Tech)">2nd Year</option>
                      <option value="3rd Year (B.Tech)">3rd Year</option>
                      <option value="Final Year (B.Tech)">Final Year</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Register &amp; Open Student Portal</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 text-xs py-4 px-4 text-center transition-colors">
        <p>
          CampusSync &bull; Official Student Affairs &amp; Campus Life Portal &bull; Apex Institute of Technology
        </p>
      </footer>

    </div>
  );
};
