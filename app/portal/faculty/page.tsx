"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, School, BookOpen, LogOut } from "lucide-react";

const FacultyPage = () => {
  const [faculty, setFaculty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // login form states
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem("facultyUser");
      if (stored) {
        setFaculty(JSON.parse(stored));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogin = () => {
    if (cnic === "" || password === "") {
      alert("Fields can't be empty");
      return;
    }
    if (!/^\d{13}$/.test(cnic)) {
      alert("CNIC must be exactly 13 digits (no dashes).");
      return;
    }

    const fakeFaculty = {
      id: 101,
      name: "Dr. Ahmed Khan",
      cnic,
      designation: "Assistant Professor",
      inChargeClass: "BSCS 5th Semester - Section A",
      teaching: [
        { course: "Data Structures", section: "BSCS-5A" },
        { course: "Database Systems", section: "BSCS-3B" },
      ],
    };

    localStorage.setItem("facultyUser", JSON.stringify(fakeFaculty));
    setFaculty(fakeFaculty);
  };

  const handleLogout = () => {
    localStorage.removeItem("facultyUser");
    setFaculty(null);
    setCnic("");
    setPassword("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-green-600 font-semibold">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pb-3 mb-4">
        {faculty ? (
          <div className="flex items-center gap-3">
            <span className="font-medium text-sm sm:text-base">
              Hi, {faculty.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        ) : null}
      </header>

      {/* Login form */}
      {!faculty ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Side: Form */}
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-6 text-center md:text-left">
                Faculty Login
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

              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>

            {/* Right Side: Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="https://i.postimg.cc/1zMnbNcv/teacher-Login.png"
                alt="Faculty"
                className="rounded-full shadow-md w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        // Faculty Dashboard
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <School className="w-5 h-5 text-green-600" />
                Faculty Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm"><strong>Name:</strong> {faculty.name}</p>
              <p className="text-sm"><strong>Designation:</strong> {faculty.designation}</p>
              <p className="text-sm"><strong>In-Charge Class:</strong> {faculty.inChargeClass}</p>
            </CardContent>
          </Card>

          {/* Teaching Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Teaching Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {faculty.teaching.map((course: any, index: number) => (
                  <li key={index} className="text-sm">
                    {course.course} - <span className="text-gray-600">{course.section}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Attendance Button */}
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Mark Attendance for {faculty.inChargeClass}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;