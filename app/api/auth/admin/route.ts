import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { cnic, password } = body;

        if (!cnic || !password) {
            return NextResponse.json(
                { error: "CNIC and password are required" },
                { status: 400 }
            );
        }

        // Validate CNIC format
        if (!/^\d{13}$/.test(cnic)) {
            return NextResponse.json(
                { error: "CNIC must be exactly 13 digits" },
                { status: 400 }
            );
        }

        const admin = await prisma.admin.findUnique({
            where: {
                cnic: cnic,
            },
        });

        if (!admin) {
            return NextResponse.json(
                { error: "Admin not found" },
                { status: 404 }
            );
        }

        const isPasswordValid = await verifyPassword(password, admin.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: "Login successful",
                admin: {
                    id: admin.id,
                    name: admin.name,
                    cnic: admin.cnic,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}