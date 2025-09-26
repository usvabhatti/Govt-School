"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, School, BookOpen, LogOut } from "lucide-react";

// Types
interface TeachingCourse {
  course: string;
  section: string;
}

interface InChargeClass {
  name: string;
  section: string;
}

interface Faculty {
  id: number;
  name: string;
  cnic: string;
  designation: string;
  inCharge: InChargeClass[];
  teaching: TeachingCourse[];
}

const FacultyPage = () => {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  // login form states
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem("facultyUser");
      if (stored) {
        setFaculty(JSON.parse(stored) as Faculty);
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

    const fakeFaculty: Faculty = {
      id: 101,
      name: "Dr. Ahmed Khan",
      cnic,
      designation: "Assistant Professor",
      inCharge: [
        { name: "BSCS 5th Semester", section: "A" },
        { name: "BSCS 3rd Semester", section: "B" },
      ],
      teaching: [
        { course: "Data Structures", section: "BSCS-5A" },
        { course: "Database Systems", section: "BSCS-3B" },
        { course: "Operating Systems", section: "BSCS-5A" },
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

      {/* Login Form */}
      {!faculty ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
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
              <p className="text-sm">
                <strong>In-Charge Classes:</strong> {faculty.inCharge.map(c => `${c.name} - ${c.section}`).join(", ")}
              </p>
            </CardContent>
          </Card>

          {/* In-Charge Classes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faculty.inCharge.map((cls, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    {cls.name} - Section {cls.section}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    Upload Attendance
                  </Button>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {faculty.teaching
                      .filter(t => t.section === cls.section)
                      .map((t, i) => (
                        <li key={i}>
                          {t.course} - <Button size="sm" className="ml-2">Upload Marks</Button>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;
