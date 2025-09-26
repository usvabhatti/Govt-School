"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye, EyeOff } from "lucide-react";

// ✅ Define proper type for Student
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

  // loading + login form states
  const [loading, setLoading] = useState(true);
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // simulate loading screen
    setTimeout(() => {
      const stored = localStorage.getItem("studentUser");
      if (stored) {
        setUser(JSON.parse(stored) as Student);
      }
      setLoading(false);
    }, 1200);
  }, []);

  // handle login
  const handleLogin = () => {
    if (cnic === "" || password === "") {
      alert("Fields can't be empty");
      return;
    }
    if (!/^\d{13}$/.test(cnic)) {
      alert("CNIC must be exactly 13 digits (no dashes).");
      return;
    }

    const fakeUser: Student = {
      id: 1,
      name: "Ali",
      cnic,
      attendance: 82,
      marks: 74,
    };

    localStorage.setItem("studentUser", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentUser");
    setUser(null);
    setCnic("");
    setPassword("");
  };

  const marksData = [
    { subject: "Math", score: 75 },
    { subject: "Science", score: 85 },
    { subject: "English", score: 65 },
    { subject: "History", score: 90 },
  ];

  // If still loading → show loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-sm">
          <Progress value={70} className="h-2 bg-gray-200" />
          <p className="text-center mt-3 text-green-600 font-semibold text-sm sm:text-base">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pb-3 mb-4">
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-sm sm:text-base">Hi, {user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : null}
      </header>

      {/* If not logged in → show login form */}
      {!user ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Side: Form */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 text-center md:text-left">
                Student Login
              </h2>

              {/* CNIC Field */}
              <div className="mb-4 text-left">
                <label className="block mb-1 font-semibold">CNIC</label>
                <input
                  type="text"
                  placeholder="Enter 13 digit CNIC"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">
                  CNIC must be exactly 13 digits (without dashes)
                </p>
              </div>

              {/* Password Field */}
              <div className="mb-6 relative text-left">
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-green-400 pr-10 text-sm sm:text-base"
                />
                <span
                  className="absolute right-3 top-9 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>

              {/* Login Button */}
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>

            {/* Right Side: Optimized Next.js Image */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="https://i.postimg.cc/Kj79G72P/student-Login.png"
                alt="Student"
                width={240}
                height={240}
                className="rounded-full shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        // Dashboard
        <div className="space-y-6">
          {/* Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={user.attendance} className="w-full" />
                <p className="text-xs sm:text-sm mt-2">
                  {user.attendance}% Present
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Overall Marks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={user.marks} className="w-full" />
                <p className="text-xs sm:text-sm mt-2">
                  {user.marks}% Average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full text-sm sm:text-base">
                  View Grades
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => router.push("/portal/student/attendance")}
            >
              Go to Attendance
            </Button>
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => router.push("/portal/student/marks")}
            >
              Go to Marks
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="assignments" className="flex-1 sm:flex-none">
                Assignments
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex-1 sm:flex-none">
                Exams
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assignments">
              <p className="text-sm">Assignment list goes here...</p>
            </TabsContent>
            <TabsContent value="exams">
              <p className="text-sm">Exam results will show here...</p>
            </TabsContent>
          </Tabs>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Marks by Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 sm:h-72 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marksData}>
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="score"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
