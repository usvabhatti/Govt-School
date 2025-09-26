"use client";

import { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const COLORS = ["#22c55e", "#ef4444"]; // green = present, red = absent

// ✅ Dummy Attendance Data
const attendanceDetails = [
  { date: "2025-09-01", class: "Mathematics", status: "Present" },
  { date: "2025-09-02", class: "Physics", status: "Absent" },
  { date: "2025-09-03", class: "Chemistry", status: "Present" },
  { date: "2025-09-04", class: "English", status: "Present" },
  { date: "2025-09-05", class: "Computer Science", status: "Present" },
];

export default function AttendancePage() {
  const router = useRouter();

  // ✅ Redirect to login if no session
  useEffect(() => {
    const stored = localStorage.getItem("studentUser");
    if (!stored) {
      router.push("/portal/student");
    }
  }, [router]);

  // Count totals
  const present = attendanceDetails.filter((d) => d.status === "Present").length;
  const absent = attendanceDetails.filter((d) => d.status === "Absent").length;
  const total = present + absent;
  const percentage = ((present / total) * 100).toFixed(1);

  const chartData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  function handleLogout() {
    localStorage.removeItem("studentUser"); // ✅ unified key
    router.push("/portal/student");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Attendance Dashboard
        </h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white shadow hover:bg-gray-100 transition"
            onClick={() => router.push("/portal/student/grades")}
          >
            View Grades
          </Button>
          <Button
            variant="outline"
            className="bg-white shadow hover:bg-gray-100 transition flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Attendance Card */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Overall Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            {/* Pie Chart */}
            <div className="relative w-64 h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Percentage in center */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">
                {percentage}%
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-center md:text-left">
              <p className="text-gray-600">
                Total Classes: <span className="font-semibold">{total}</span>
              </p>
              <p className="text-green-600">
                Present: <span className="font-semibold">{present}</span>
              </p>
              <p className="text-red-600">
                Absent: <span className="font-semibold">{absent}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Detailed Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 border-b text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 border-b text-gray-700">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 border-b text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceDetails.map((record, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 border-b text-gray-700">
                      {record.date}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700">
                      {record.class}
                    </td>
                    <td
                      className={`py-3 px-4 border-b font-medium ${
                        record.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}