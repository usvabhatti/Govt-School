"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Eye, EyeOff } from "lucide-react";

const StudentPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
        setUser(JSON.parse(stored));
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

    const fakeUser = {
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
    localStorage.removeItem("studentUser"); // ✅ unified key
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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-1/2">
          <Progress value={70} className="h-2 bg-gray-200" />
          <p className="text-center mt-3 text-green-600 font-semibold">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pb-3 mb-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm">Hi, {user.name}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : null}
      </header>

      {/* If not logged in → show login form */}
      {!user ? (
        <div className="min-h-[70vh] flex items-center justify-center ">
          <div className="bg-white p-8 rounded-3xl shadow-xl w-[600px] grid grid-cols-2 gap-6 items-center">
            {/* Left Side: Form */}
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
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
                             focus:outline-none focus:ring-2 focus:ring-green-400"
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
                             focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
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

            {/* Right Side: Image */}
            <div className="flex justify-center">
              <img
                src="https://i.postimg.cc/Kj79G72P/student-Login.png"
                alt="Student"
                width={230}
                height={230}
                className="rounded-full shadow-md"
              />
            </div>
          </div>
        </div>
      ) : (
        // Dashboard
        <div className="space-y-6">
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={user.attendance} className="w-full" />
                <p className="text-sm mt-2">{user.attendance}% Present</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Marks</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={user.marks} className="w-full" />
                <p className="text-sm mt-2">{user.marks}% Average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Grades</Button>
              </CardContent>
            </Card>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <Button onClick={() => router.push("/portal/student/attendance")}>
              Go to Attendance
            </Button>
            <Button onClick={() => router.push("/portal/student/marks")}>
              Go to Marks
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
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
              <CardTitle>Marks by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marksData}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
