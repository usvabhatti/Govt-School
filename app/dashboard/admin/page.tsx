"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PageLoading } from "@/components/ui/loading/page-loading";

// Mock data (replace with real data fetching)
const mockStats = {
    totalStudents: 450,
    totalTeachers: 35,
    totalClasses: 12,
    activeAttendance: "85%",
};

const mockRecentActivities = [
    { id: 1, action: "New student registered", time: "2 minutes ago" },
    { id: 2, action: "Teacher marked attendance for Class 10", time: "5 minutes ago" },
    { id: 3, action: "Updated Class 8 timetable", time: "10 minutes ago" },
    { id: 4, action: "New exam schedule published", time: "1 hour ago" },
];

export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    if (loading) return <PageLoading />;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/School_Logo.png"
                        alt="School Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500">Welcome back, Administrator</p>
                    </div>
                </div>
                <Button variant="outline" onClick={() => console.log("logout")}>
                    Logout
                </Button>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 gap-4 bg-transparent">
                    <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="students"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Students
                    </TabsTrigger>
                    <TabsTrigger
                        value="teachers"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Teachers
                    </TabsTrigger>
                    <TabsTrigger
                        value="classes"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Classes
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <StatsCard
                            title="Total Students"
                            value={mockStats.totalStudents}
                            icon="👥"
                        />
                        <StatsCard
                            title="Total Teachers"
                            value={mockStats.totalTeachers}
                            icon="👨‍🏫"
                        />
                        <StatsCard
                            title="Total Classes"
                            value={mockStats.totalClasses}
                            icon="🏫"
                        />
                        <StatsCard
                            title="Attendance Rate"
                            value={mockStats.activeAttendance}
                            icon="📊"
                        />
                    </div>

                    {/* Recent Activities */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                        <div className="space-y-4">
                            {mockRecentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <span>{activity.action}</span>
                                    <span className="text-sm text-gray-500">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <QuickActionCard
                            title="Add New Student"
                            description="Register a new student in the system"
                            icon="➕"
                            onClick={() => console.log("add student")}
                        />
                        <QuickActionCard
                            title="Manage Attendance"
                            description="View and update attendance records"
                            icon="📝"
                            onClick={() => console.log("manage attendance")}
                        />
                        <QuickActionCard
                            title="Generate Reports"
                            description="Create detailed academic reports"
                            icon="📊"
                            onClick={() => console.log("generate reports")}
                        />
                    </div>
                </TabsContent>

                {/* Other Tabs Content */}
                <TabsContent value="students">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Student Management</h2>
                        {/* Add student management content here */}
                    </Card>
                </TabsContent>

                <TabsContent value="teachers">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Teacher Management</h2>
                        {/* Add teacher management content here */}
                    </Card>
                </TabsContent>

                <TabsContent value="classes">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Class Management</h2>
                        {/* Add class management content here */}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Component for statistics cards
function StatsCard({ title, value, icon }: { title: string; value: number | string; icon: string }) {
    return (
        <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-2">{icon}</span>
            <h3 className="text-xl font-semibold">{value}</h3>
            <p className="text-gray-500">{title}</p>
        </Card>
    );
}

// Component for quick action cards
function QuickActionCard({
    title,
    description,
    icon,
    onClick,
}: {
    title: string;
    description: string;
    icon: string;
    onClick: () => void;
}) {
    return (
        <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center space-x-4">
                <span className="text-3xl">{icon}</span>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </Card>
    );
}