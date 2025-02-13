"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // To get dynamic id from URL
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentDetail() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams(); // Get student ID from URL
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student/${id}`);
      const data = await res.json();
      
      if (res.ok) {
        setStudent(data);
      } else {
        setError(data);
      }
    } catch (err) {
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div className="student-detail-page mt-4">
        <div style={{border:'1px solid #e5e7eb',padding:'20px'}}>
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {student?.studentName}</p>
      <p><strong>Mobile:</strong> {student?.mobile}</p>
      <p><strong>Address:</strong> {student?.address}</p>
      <p><strong>Father Name:</strong> {student.fatherName}</p>
      <p><strong>Mother Name:</strong> {student?.motherName}</p>
      <p><strong>City :</strong> {student?.city}</p>
      <p><strong>District :</strong> {student?.district}</p>
      <p><strong>Roll No:</strong> {student?.rollNo}</p>
      <button className="btn btn-primary" onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
}
