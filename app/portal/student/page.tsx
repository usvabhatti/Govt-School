
"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react";
import Image from "next/image";

export default function StudentPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // check session
  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!cnic || !password) {
      alert("Fields can't be empty");
      return;
    }

    try {
      const res = await fetch("/api/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnic, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("student", JSON.stringify(data));
      setStudent(data);
      setLoggedIn(true);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("student");
    setStudent(null);
    setLoggedIn(false);
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
        {student ? (
          <div className="flex items-center gap-3">
            <span className="font-medium text-sm sm:text-base">
              Hi, {student.name || "Student"}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded-md text-sm flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        ) : null}
      </header>

      {/* Login Form → same as Faculty */}
      {!student ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-yellow-50 p-6 sm:p-8 rounded-3xl shadow-xl w-[600px] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left Side: Form */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 text-center md:text-left">
                Student Login
              </h2>

              {/* Username Field */}
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

              {/* Error Msg */}
              {error && (
                <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
              )}

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className={`w-full py-2 rounded-md font-semibold transition-colors bg-green-500 text-white hover:bg-green-600`}
              >
                Login
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/st_login_img.png"
                alt="Student"
                width={240}
                height={240}
                className="rounded-full shadow-md object-cover"
              />
            </div>

          </div>
        </div>
      ) : (
        // Student Dashboard
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Attendance</h2>
              <p>Your attendance data will appear here.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Marks</h2>
              <p>Your marks will appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

