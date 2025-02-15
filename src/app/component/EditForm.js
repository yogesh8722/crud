"use client"
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const EditForm = ({ updateStudent, handleChange,refreshList,handleClose}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updateStudent._id) {
      console.error("Student ID not found");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student/${updateStudent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateStudent),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Student updated successfully!");
        refreshList();
        handleClose()
      } else {
        alert("Update failed: " + data.error);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={updateStudent.studentName} name="studentName" onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Father Name</Form.Label>
              <Form.Control type="text" value={updateStudent.fatherName} name="fatherName" onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Mother Name</Form.Label>
              <Form.Control type="text" value={updateStudent.motherName} name="motherName" onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control type="text" value={updateStudent.mobile} name="mobile" onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={updateStudent.address} name="address" onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={updateStudent.city} name="city" onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Control type="text" value={updateStudent.district} name="district" onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Roll No</Form.Label>
              <Form.Control type="text" value={updateStudent.rollNo} name="rollNo" onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <Button type='submit'>Update</Button>
        </Col>
      </Form>
    </>
  );
};

export default EditForm;
