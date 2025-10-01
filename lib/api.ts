export async function loginStudent(cnic: string, password: string) {
  const response = await fetch('/api/auth/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cnic, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to login');
  }

  return response.json();
}

export async function fetchStudentData(studentId: number) {
  const response = await fetch(`/api/student/${studentId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch student data');
  }

  return response.json();
}