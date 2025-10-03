import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
};

const prisma = new PrismaClient();

async function main() {
  // Create test class
  const class10 = await prisma.class.create({
    data: {
      name: 'Class 10-A'
    }
  });

  // Create test subjects
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: 'Mathematics' } }),
    prisma.subject.create({ data: { name: 'Physics' } }),
    prisma.subject.create({ data: { name: 'Chemistry' } }),
    prisma.subject.create({ data: { name: 'English' } })
  ]);

  // Create test admin
  const admin = await prisma.admin.create({
    data: {
      name: 'Admin User',
      cnic: '1234512345670',
      passwordHash: await hashPassword('admin123')
    }
  });

  // Create test teachers
  const teacher = await prisma.teacher.create({
    data: {
      name: 'John Doe',
      cnic: '1234512345675',
      passwordHash: await hashPassword('teacher123')
    }
  });

  // Create class subjects
  const classSubjects = await Promise.all(
    subjects.map(subject =>
      prisma.classSubject.create({
        data: {
          classId: class10.id,
          subjectId: subject.id,
          teacherId: teacher.id
        }
      })
    )
  );

  // Create test students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        name: 'Ali Ahmed',
        cnic: '1234512345671',
        passwordHash: await hashPassword('student123'),
        classId: class10.id
      }
    }),
    prisma.student.create({
      data: {
        name: 'Sara Khan',
        cnic: '1234512345672',
        passwordHash: await hashPassword('student123'),
        classId: class10.id
      }
    }),
    prisma.student.create({
      data: {
        name: 'Muhammad Hassan',
        cnic: '1234512345673',
        passwordHash: await hashPassword('student123'),
        classId: class10.id
      }
    }),
    prisma.student.create({
      data: {
        name: 'Fatima Zahra',
        cnic: '1234512345674',
        passwordHash: await hashPassword('student123'),
        classId: class10.id
      }
    })
  ]);

  // Create student subjects
  await Promise.all(
    students.flatMap(student =>
      classSubjects.map(classSubject =>
        prisma.studentSubject.create({
          data: {
            studentId: student.id,
            classSubjectId: classSubject.id
          }
        })
      )
    )
  );

  // Create some attendance records
  const today = new Date();
  await Promise.all(
    students.map(student =>
      prisma.attendance.create({
        data: {
          studentId: student.id,
          classId: class10.id,
          date: today,
          status: 'Present',
          markedById: teacher.id
        }
      })
    )
  );

  // Create some test marks
  await Promise.all(
    students.flatMap(student =>
      classSubjects.map(classSubject =>
        prisma.mark.create({
          data: {
            studentId: student.id,
            classSubjectId: classSubject.id,
            examType: 'Mid Term',
            marksObtained: Math.floor(Math.random() * 41) + 60, // Random marks between 60-100
            totalMarks: 100
          }
        })
      )
    )
  );

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });