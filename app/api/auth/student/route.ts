import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '@/lib/auth/password';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { cnic, password } = await request.json();

    if (!cnic || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find student by CNIC
    // Normalize CNIC by removing any spaces
    const normalizedCnic = cnic.trim();

    const student = await prisma.student.findUnique({
      where: { cnic: normalizedCnic },
      include: {
        class: true,
        marks: {
          include: {
            classSubject: {
              include: {
                subject: true
              }
            }
          }
        },
        attendance: true
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, student.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Remove sensitive data before sending response
    const { passwordHash, ...studentData } = student;

    return NextResponse.json({
      student: studentData
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}