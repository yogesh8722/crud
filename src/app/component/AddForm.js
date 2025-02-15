"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa6";
const AddForm = ({refreshList}) => {
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });


      const data = await response.json();



      if (response.ok) {
        alert("Student added successfully!");
        setShow(false)
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
        refreshList();
      } else {
        alert(data.error || "Failed to add student");
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleShow} style={{ display: 'flex', background: 'green', padding: '0px 5px', borderRadius: '5px', lineHeight: "35px", gap: '5px' }}><FaPlus style={{ marginTop: '10px' }} />Add Student</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="col-md-6">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="studentName" value={student.studentName} onChange={handleChange} placeholder="Enter Your Name" required />
                </Form.Group>
              </Col>
              <Col className="col-md-6">
                <Form.Group>
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control type="text" name="fatherName" value={student.fatherName} onChange={handleChange} placeholder="Enter Father Name" required />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="col-md-6">
              <Form.Group >
                <Form.Label>Mother Name</Form.Label>
                <Form.Control type="text" name="motherName" value={student.motherName} onChange={handleChange} placeholder="Enter Mother Name" required />
              </Form.Group></Col>
              <Col className="col-md-6">
              <Form.Group >
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="number" name="mobile" value={student.mobile} onChange={handleChange} placeholder="Enter Mobile Number" required />
              </Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col className="col-md-6">
              <Form.Group >
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={student.address} onChange={handleChange} placeholder="Enter Address" required />
              </Form.Group></Col>
              <Col className="col-md-6">
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={student.city} onChange={handleChange} placeholder="Enter Your City" required />
              </Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col className="col-md-6">
              <Form.Group>
                <Form.Label>District</Form.Label>
                <Form.Control type="text" name="district" value={student.district} onChange={handleChange} placeholder="Enter Your District" required />
              </Form.Group></Col>
              <Col className="col-md-6"> 
              <Form.Group >
                <Form.Label>Roll No</Form.Label>
                <Form.Control type="number" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="Enter Your Roll No" required />
              </Form.Group></Col>
            </Row>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddForm;
