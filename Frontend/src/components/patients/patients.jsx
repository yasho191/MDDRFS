import React, { useState } from "react";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Row, Col, Form, Button, Table, Modal } from "react-bootstrap";
import "./patients.css"

function Patients() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // array to define the input elements
  const [patientData, setPatientData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
    phone_number: "",
    allergies: "",
    history: "",
    weight: "",
    height: ""
  });

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patientData); // or send the data to a server
    handleClose();
  };

  return (
    <div>
      <NavBar />
      <h1 style={{ margin: "2%" }}>Patient Management Portal</h1>
      <Form onSubmit={handleSubmit} style={{ margin: "2%" }}>
        <h3 className="d-flex">Search Patients</h3>
        <Row>
          <Col>
            <Form.Label className="d-flex">First Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button type="submit" variant="primary" style={{ margin: "2%" }}>
              Search
            </Button>

          </Col>
          <Col>
            <Form.Label className="d-flex">Patient ID</Form.Label>

            <Form.Control
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <Button type="submit" variant="primary" style={{ margin: "2%" }}>
              Search
            </Button>

          </Col>
        </Row>
        <Row>
          <Col>
          
            <h4 >Add New Patient</h4>
            <Button size="lg" variant="primary" onClick={handleShow} style={{"width": "20%"}}>
              +
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Patient</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>

                  <Form.Group controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstname"
                      value={patientData.firstname}
                      onChange={handleChange}
                    />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastname"
                      value={patientData.lastname}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter age"
                      name="age"
                      value={patientData.age}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={patientData.gender}
                      onChange={handleChange}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      name="phone"
                      value={patientData.phone_number}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@email.com"
                      name="email"
                      value={patientData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicHistory">
                    <Form.Label>Patient History</Form.Label>
                    <Form.Control
                      type="text"
                      // increases the height of input field
                      as="textarea" rows="10"
                      placeholder="Enter History"
                      name="history"
                      value={patientData.history}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  
                  <Form.Group controlId="formBasicAllergies">
                    <Form.Label>Enter Allergies</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea" rows="10"
                      placeholder="Enter Allegies"
                      name="allergies"
                      value={patientData.allergies}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" style={{marginTop: "2%"}}>
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>


          </Col>
        </Row>
      </Form>

      <div className="patients-table">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {Array.from({ length: 5 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 5 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 5 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              {Array.from({ length: 5 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
}

export default Patients;
