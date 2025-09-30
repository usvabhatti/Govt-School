import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { cnic, password } = await req.json();

        // Validate input
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

        // Find teacher by CNIC
        const teacher = await prisma.teacher.findUnique({
            where: { cnic },
            select: {
                id: true,
                name: true,
                cnic: true,
                passwordHash: true,
                inchargeClasses: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                teaches: {
                    select: {
                        id: true,
                        class: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        subject: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!teacher) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, teacher.passwordHash);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Return teacher data without sensitive information
        return NextResponse.json({
            success: true,
            data: {
                id: teacher.id,
                name: teacher.name,
                cnic: teacher.cnic,
                inchargeClasses: teacher.inchargeClasses,
                teaches: teacher.teaches
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}