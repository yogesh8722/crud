"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddForm = () => {
  const [student, setStudent] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    address: "",
    city: "",
    district: "",
    rollNo: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await response.json();

      console.log(data);
      

      if (response.ok) {
        setMessage("Student added successfully!");
        setStudent({
          studentName: "",
          fatherName: "",
          motherName: "",
          mobile: "",
          address: "",
          city: "",
          district: "",
          rollNo: "",
        });
      } else {
        setMessage(data.error || "Failed to add student");
      }
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ justifyItems: "center" }}>
      <div style={{ width: "500px", marginTop: "15px" }}>
        <h1 style={{ textAlign: "center" }}>Student Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="studentName" value={student.studentName} onChange={handleChange} placeholder="Enter Your Name" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Father Name</Form.Label>
            <Form.Control type="text" name="fatherName" value={student.fatherName} onChange={handleChange} placeholder="Enter Father Name" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mother Name</Form.Label>
            <Form.Control type="text" name="motherName" value={student.motherName} onChange={handleChange} placeholder="Enter Mother Name" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="number" name="mobile" value={student.mobile} onChange={handleChange} placeholder="Enter Mobile Number" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={student.address} onChange={handleChange} placeholder="Enter Address" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={student.city} onChange={handleChange} placeholder="Enter Your City" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>District</Form.Label>
            <Form.Control type="text" name="district" value={student.district} onChange={handleChange} placeholder="Enter Your District" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Roll No</Form.Label>
            <Form.Control type="number" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="Enter Your Roll No" required />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </Form>
      </div>
    </div>
  );
};

export default AddForm;
