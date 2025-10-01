'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { PageLoading, ButtonLoading } from '@/components/ui/loading/page-loading';
import { Eye, EyeOff, LogIn } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  cnic: string;
  attendance: number;
  marks: number;
}

const StudentPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const stored = localStorage.getItem('studentUser');
      if (stored) {
        setUser(JSON.parse(stored) as Student);
      }
      setLoading(false);
    };

    setTimeout(checkSession, 800);
  }, []);

  const handleLogin = async () => {
    if (cnic === '' || password === '') {
      toast.error('Fields cannot be empty');
      return;
    }

    if (!/^\d{13}$/.test(cnic)) {
      toast.error('CNIC must be exactly 13 digits (no dashes)');
      return;
    }

    try {
      setLoading(true);
      setCnic(cnic.trim());
      const response = await fetch('/api/auth/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnic, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to login');
      }

      const { student } = await response.json();
      
      // Safely handle attendance calculation
      const totalAttendance = student?.attendance?.length ?? 0;
      const presentCount = student?.attendance?.filter((a: any) => a.status === 'Present')?.length ?? 0;
      const attendancePercentage = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;

      let averageMarks = 0;
      if (student?.marks?.length > 0) {
        const totalMarks = student.marks.reduce((sum: number, mark: any) => {
          const obtained = Number(mark?.marksObtained) || 0;
          const total = Number(mark?.totalMarks) || 1; // prevent division by zero
          return sum + (obtained / total) * 100;
        }, 0);
        averageMarks = totalMarks / student.marks.length;
      }

      const userData: Student = {
        id: student.id,
        name: student.name,
        cnic: student.cnic,
        attendance: Math.round(attendancePercentage),
        marks: Math.round(averageMarks),
      };

      localStorage.setItem('studentUser', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentUser');
    setUser(null);
    setCnic('');
    setPassword('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white fixed inset-0 z-50 transition-opacity duration-300">
        <PageLoading message="Checking session..." />
      </div>
    );
  }

  const assignments = [
    { subject: 'English', lesson: 'Lesson 2', progress: 0, date: '25th Jan 2024' },
    { subject: 'Mathematics', lesson: 'Integration', progress: 35, date: '26th Jan 2024' },
    { subject: 'History', lesson: 'Medieval Era', progress: 80, date: '27th Jan 2024' }
  ];

  const tasks = [
    { text: 'Upload Assignment', colorClass: 'bg-orange-500' },
    { text: 'Study for Quiz', colorClass: 'bg-green-500' },
    { text: 'Paragraph Corrections', colorClass: 'bg-purple-500' },
    { text: 'Spell Check English', colorClass: 'bg-red-500' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <header className="flex justify-between items-center pb-3 mb-4">
        {user && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-sm sm:text-base">Hi, {user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </header>

      {user ? (
        <div className="min-h-screen bg-white p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="w-full py-3 px-5 pr-12 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center">
                  2
                </span>
                <button className="text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </button>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Hi {user.name}</h1>
                <p className="text-gray-600">
                  You have completed <span className="text-blue-600 font-medium">{user.attendance}%</span> of your weekly targets
                </p>
                <button className="mt-4 px-6 py-2 bg-[#ffd700] rounded-xl text-gray-800 font-medium hover:bg-[#ffd700]/90 transition-colors">
                  Set Goals
                </button>
              </div>
              <div className="hidden md:block">
                <Image
                  src="/st_login_img.png"
                  alt="Student studying"
                  width={200}
                  height={200}
                  className="animate-float"
                />
              </div>
            </div>
          </div>

          {/* Assignments Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Assignments</h2>
              <button className="text-blue-600 text-sm hover:underline">View More</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assignments.map((assignment, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium mb-1">{assignment.subject}</h3>
                      <p className="text-sm text-gray-500">{assignment.lesson}</p>
                    </div>
                    <span className="text-xs text-gray-400">{assignment.date}</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2 bg-gray-100 [&>div]:bg-blue-500" />
                  <p className="text-xs text-gray-500 mt-2">{assignment.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Lessons */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Lessons for you</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#fff4d9] p-6 rounded-xl">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                    </svg>
                  </div>
                  <h3 className="font-bold mb-1">Focus Words</h3>
                  <p className="text-sm text-gray-600">English</p>
                </div>
                <div className="bg-[#ffe8e8] p-6 rounded-xl">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3 className="font-bold mb-1">Workshops</h3>
                  <p className="text-sm text-gray-600">Extra Curricular</p>
                </div>
              </div>
            </div>

            {/* Right: Tasks */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Your Tasks Today</h3>
                <button className="text-blue-600 text-sm hover:underline">+ Create New</button>
              </div>
              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${task.colorClass}`} />
                    <span className="text-sm text-gray-600">{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
                <div className="min-h-screen login-container flex items-start justify-center -pt-5  p-4 animate-fadeIn transition-all duration-300 bg-white">
          <div className="w-full max-w-[1000px] h-[600px] login-card rounded-[30px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden animate-slideIn bg-white shadow-2xl relative">
            <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-green-50/30 to-white p-12 relative overflow-hidden">
              <div className="absolute top-10 right-10 w-32 h-32 bg-green-100/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-100/20 rounded-full blur-3xl"></div>
              <div className="relative w-64 h-64 mb-8 z-10">
                <Image
                  src="/School_Logo.png"
                  alt="School Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="animate-float"
                  priority
                />
              </div>
              <div className="text-center z-10">
                <h1 className="text-4xl font-bold text-green-500 mb-2 tracking-tight">Student Login</h1>
                <p className="text-gray-500 text-base">Welcome back! Please enter your details</p>
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gray-200"></div>

            <div className="p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden bg-white">

              
              <div className="space-y-3 mx-auto relative w-full">
                <div className="mb-4">
                  <div className="lg:hidden text-center mb-6">
                    <div className="mb-4 flex flex-col items-center">
                      <div className="relative w-20 h-20 mb-4">
                        <Image
                          src="/School_Logo.png"
                          alt="School Logo"
                          fill
                          style={{ objectFit: 'contain' }}
                          className="animate-float"
                          priority
                        />
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-green-500 mb-2">Student Login</h1>
                      <p className="text-gray-500 text-sm">Welcome back! Please enter your details</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                      </svg>
                      CNIC Number
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Enter 13-digit CNIC"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-green-500 hover:border-gray-200 transition-all duration-200 bg-white outline-none text-gray-700 relative shadow-sm"
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Enter without dashes (e.g., 1234512345671)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-green-500 hover:border-gray-200 transition-all duration-200 bg-white outline-none text-gray-700 pr-12 shadow-sm"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >

                    <div className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <ButtonLoading />
                      ) : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15C16.1046 21 17 20.1046 17 19V5C17 3.89543 16.1046 3 15 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 12H12M12 12L15 9M12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Sign In</span>
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;