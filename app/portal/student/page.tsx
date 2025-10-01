'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { PageLoading, ButtonLoading } from '@/components/ui/loading/page-loading';
import { Eye, EyeOff, Calendar, BookOpen, TrendingUp, Award } from 'lucide-react';

interface AttendanceRecord {
  id: number;
  date: string;
  status: string;
}

interface Mark {
  id: number;
  examType: string;
  marksObtained: number;
  totalMarks: number;
  classSubject: {
    subject: {
      id: number;
      name: string;
    };
  };
}

interface Student {
  id: number;
  name: string;
  cnic: string;
  class: {
    name: string;
  };
  attendance: AttendanceRecord[];
  marks: Mark[];
}

interface SubjectData {
  id: number;
  name: string;
  marks: Mark[];
  average: number;
}

const StudentPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // New states for the dashboard
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  const [showAttendance, setShowAttendance] = useState(false);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    const checkSession = () => {
      const stored = localStorage.getItem('studentUser');
      if (stored) {
        const student = JSON.parse(stored) as Student;
        setUser(student);
        
        // Process stored data
        const subjectsMap = new Map<number, SubjectData>();
        
        student.marks?.forEach((mark: Mark) => {
          const subjectId = mark.classSubject.subject.id;
          const subjectName = mark.classSubject.subject.name;
          
          if (!subjectsMap.has(subjectId)) {
            subjectsMap.set(subjectId, {
              id: subjectId,
              name: subjectName,
              marks: [],
              average: 0
            });
          }
          
          subjectsMap.get(subjectId)!.marks.push(mark);
        });
        
        const processedSubjects = Array.from(subjectsMap.values()).map(subject => {
          const totalPercentage = subject.marks.reduce((sum, mark) => {
            return sum + (mark.marksObtained / mark.totalMarks) * 100;
          }, 0);
          subject.average = subject.marks.length > 0 ? totalPercentage / subject.marks.length : 0;
          return subject;
        });
        
        const totalAttendance = student.attendance?.length ?? 0;
        const presentCount = student.attendance?.filter((a: AttendanceRecord) => a.status === 'Present')?.length ?? 0;
        const attendancePerc = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;
        
        setSubjects(processedSubjects);
        setAttendancePercentage(Math.round(attendancePerc));
        
        if (processedSubjects.length > 0) {
          setSelectedSubject(processedSubjects[0]);
        }
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
      
      // Process subjects and marks
      const subjectsMap = new Map<number, SubjectData>();
      
      student.marks.forEach((mark: Mark) => {
        const subjectId = mark.classSubject.subject.id;
        const subjectName = mark.classSubject.subject.name;
        
        if (!subjectsMap.has(subjectId)) {
          subjectsMap.set(subjectId, {
            id: subjectId,
            name: subjectName,
            marks: [],
            average: 0
          });
        }
        
        subjectsMap.get(subjectId)!.marks.push(mark);
      });
      
      // Calculate averages for each subject
      const processedSubjects = Array.from(subjectsMap.values()).map(subject => {
        const totalPercentage = subject.marks.reduce((sum, mark) => {
          return sum + (mark.marksObtained / mark.totalMarks) * 100;
        }, 0);
        subject.average = subject.marks.length > 0 ? totalPercentage / subject.marks.length : 0;
        return subject;
      });
      
      // Calculate attendance percentage
      const totalAttendance = student.attendance?.length ?? 0;
      const presentCount = student.attendance?.filter((a: AttendanceRecord) => a.status === 'Present')?.length ?? 0;
      const attendancePerc = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;
      
      setSubjects(processedSubjects);
      setAttendancePercentage(Math.round(attendancePerc));
      
      // Set default selected subject (first one)
      if (processedSubjects.length > 0) {
        setSelectedSubject(processedSubjects[0]);
      }

      localStorage.setItem('studentUser', JSON.stringify(student));
      setUser(student);
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
    setSubjects([]);
    setSelectedSubject(null);
    setShowAttendance(false);
    setAttendancePercentage(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white fixed inset-0 z-50 transition-opacity duration-300">
        <PageLoading message="Checking session..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {user ? (
        <div className="p-4 sm:p-6">
          {/* Header with Logout */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Portal</h1>
              <p className="text-sm text-gray-500">{user.class.name}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="shadow-sm">
              Logout
            </Button>
          </div>

          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
                <p className="text-green-50">Here's your academic overview</p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Attendance Card */}
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="text-2xl font-bold text-gray-800">{attendancePercentage}%</p>
                </div>
              </div>
              <Progress value={attendancePercentage} className="h-2 bg-gray-100 [&>div]:bg-blue-500" />
            </div>

            {/* Subjects Count Card */}
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subjects</p>
                  <p className="text-2xl font-bold text-gray-800">{subjects.length}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total enrolled subjects</p>
            </div>

            {/* Average Performance Card */}
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Performance</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {subjects.length > 0 
                      ? Math.round(subjects.reduce((sum, s) => sum + s.average, 0) / subjects.length) 
                      : 0}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Across all subjects</p>
            </div>
          </div>

          {/* Main Content - Attendance or Grades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Subject Buttons */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">My Subjects</h3>
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowAttendance(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedSubject?.id === subject.id && !showAttendance
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm font-semibold">{Math.round(subject.average)}%</span>
                      </div>
                    </button>
                  ))}
                  
                  {/* Attendance Button */}
                  <button
                    onClick={() => setShowAttendance(true)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      showAttendance
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">View Attendance</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Details View */}
            <div className="lg:col-span-2">
              {showAttendance ? (
                /* Attendance Details */
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800">Attendance Record</h3>
                  </div>
                  
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Overall Attendance</span>
                      <span className="text-2xl font-bold text-blue-600">{attendancePercentage}%</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Present: {user.attendance.filter(a => a.status === 'Present').length} | 
                      Absent: {user.attendance.filter(a => a.status === 'Absent').length} | 
                      Total: {user.attendance.length} days
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {user.attendance.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No attendance records yet</p>
                    ) : (
                      user.attendance
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((record) => (
                          <div
                            key={record.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                record.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                              <span className="font-medium text-gray-700">
                                {new Date(record.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              record.status === 'Present' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {record.status}
                            </span>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              ) : selectedSubject ? (
                /* Subject Marks Details */
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800">{selectedSubject.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Average Score</p>
                      <p className="text-3xl font-bold text-green-600">{Math.round(selectedSubject.average)}%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedSubject.marks.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No marks recorded yet</p>
                    ) : (
                      selectedSubject.marks.map((mark) => (
                        <div
                          key={mark.id}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{mark.examType}</span>
                            <span className="text-lg font-bold text-gray-800">
                              {mark.marksObtained} / {mark.totalMarks}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress 
                              value={(mark.marksObtained / mark.totalMarks) * 100} 
                              className="flex-1 h-2 bg-gray-200 [&>div]:bg-green-500" 
                            />
                            <span className="text-sm font-semibold text-green-600">
                              {Math.round((mark.marksObtained / mark.totalMarks) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                /* No Subject Selected */
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a subject to view marks</p>
                  </div>
                </div>
              )}
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