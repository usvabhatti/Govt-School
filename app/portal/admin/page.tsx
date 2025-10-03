"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoading } from "@/components/ui/loading/page-loading";
import Image from "next/image";

export default function AdminLogin() {
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            router.push("/dashboard/admin");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <PageLoading />;
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="bg-yellow-50 p-6 sm:p-8 rounded-3xl shadow-xl w-[600px] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Side: Form */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 text-center md:text-left">
                            Admin Login
                        </h2>

                        {/* CNIC Field */}
                        <div className="mb-4 text-left">
                            <label className="block mb-1 font-semibold">CNIC</label>
                            <input
                                type="text"
                                placeholder="Enter 13 digit CNIC"
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                                maxLength={13}
                                minLength={13}
                                pattern="[0-9]{13}"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                CNIC must be exactly 13 digits (without dashes)
                            </p>
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 text-left">
                            <label className="block mb-1 font-semibold">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center mb-4">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="w-full py-2 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                            Login
                        </button>
                    </div>

                    {/* Right Side: Image */}
                    <div className="flex justify-center md:justify-end">
                        <Image
                            src="/blackAcc.png"
                            alt="Admin"
                            width={240}
                            height={240}
                            className="rounded-full shadow-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}