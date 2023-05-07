import React, { useContext, useState, useEffect } from "react";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Row, Col, Form, Button, Table, Modal } from "react-bootstrap";
import "./patients.css"
import { UserContext } from "../../context/UserContext";
import ErrorMessage from '../error_message/ErrorMessage';


function Patients() {
  /*
    const [token, ] is used when token has been initialized
    i.e Doctor has successfully logged in the portal.

    const [, setToken] is used when token has to be initialized
    Done using Signing Up/Loging In to the portal. 
  */
  const [token,] = useContext(UserContext);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [showhistory, setShowHistory] = useState(false);
  // variables initialized to load patients: used for `View` operation
  const [loaded, setLoaded] = useState(false);
  // variables initialized to load patient history
  const [loadedhistory, setLoadedHistory] = useState(false);
  const [patients, setPatients] = useState(null);
  const [patienthistory, setPatientHistory] = useState(null);
  const [patientdetails, setPatientDetails] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseHistory = () => setShowHistory(false);
  

  // array to define the input elements (patient data)
  const [patientData, setPatientData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    alergies: "",
    history: "",
    gender: "",
    weight: "",
    height: ""
  });

  /*
    handleXYZ = () = {}
    handle functions in the script have been used to trigger 
    functions on the event of clicking the corresponding buttons.
  */
  
  useEffect(() => {
    getPatients();
  }, []);

  // on the event of `Search` button click, the function `handleSearchById` will be called
  /*
    handleSearchById() function searches the patient by the `id` parameter as input,
    from the database and displays the data via `setLoaded`
  */
  const handleSearchById = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    // specifying API endpoint to fetch all the patient details
    const response = await fetch(`/api/doctors/get_patients/${id}`, requestOptions);
    if (!response.ok) {
      // setErrorMessage("Couldn't Find any patient with given id!");
      // setLoaded(false);
      setPatients([]);
      setId("");
    } else {
      const data = await response.json();
      setPatients([data]);
      setLoaded(true);
      setId("");
    }
  };

  const handleSearchByFirstName = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    // specifying API endpoint to fetch all the patient details
    const response = await fetch(`/api/doctors/get_patients_by_name/${name}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't Find any patient!");
      setLoaded(false);
    } else {
      const data = await response.json();
      setPatients(data);
      setLoaded(true);
      setName("");
    }
  };

  const handleShowHistory = async (id) => {
    setShowHistory(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/doctors/get_patients/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Failed to load Patient Details!");
    } else {
      const data = await response.json();
      setPatientDetails(data);
    }

    const responsehistory = await fetch(`/api/doctors/get_complete_patient_history/${id}`, requestOptions);
    if (!responsehistory.ok) {
      setErrorMessage("Failed to load Patient History!");
    } else {
      const historydata = await responsehistory.json();
      setPatientHistory(historydata);
      setLoadedHistory(true);
    }

  };
    
  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  // on the event of `Submit` button click, the function `handleSubmit` will be called
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(patientData)

    };

    const response = await fetch("/api/doctors/create_patient", requestOptions);
    if (!response.ok) {
      setErrorMessage("Email ID already in use! Couldn't Add new patient!");
    } else {
       // handleClose() is used to decide whether to display Modal or not
      handleClose();
      getPatients();
    }
    
  };

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/doctors/delete_patients/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Failed to delete lead");
    }

    getPatients();
  };

  const handleDownloadScan = async (patient_id, history_id) => {

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    
    const response = await fetch(`/api/doctors/download_scan/patient/${patient_id}/patient_history/${history_id}`,
                                  requestOptions);

    if (!response.ok) {
      setErrorMessage("Something went wrong while downloading the file!");
      
    } else {
      // Create a Blob object from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `patient_${patient_id}_history_${history_id}_scan.png`);
      document.body.appendChild(link);

      // Click the download link
      link.click();

      // Clean up the download link
      document.body.removeChild(link);
    }
  };

  const handleDownloadReport = async (patient_id, history_id) => {

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    
    const response = await fetch(`/api/doctors/download_report/patient/${patient_id}/patient_history/${history_id}`,
                                  requestOptions);

    if (!response.ok) {
      setErrorMessage("Something went wrong while downloading the file!");
      
    } else {
      // Create a Blob object from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `patient_${patient_id}_history_${history_id}_report.pdf`);
      document.body.appendChild(link);

      // Click the download link
      link.click();

      // Clean up the download link
      document.body.removeChild(link);
    }
  };
  // async function to display patient list
  const getPatients = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch("/api/doctors/get_patients", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't display the patients!");
    } else {
      const data = await response.json();
      setPatients(data);
      setLoaded(true);
    }
  };

  return (
    <div>
      <NavBar />
      <h1 style={{ margin: "2%" }}>Patient Management Portal</h1>
      <Form style={{ margin: "2%" }}>
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

            <Button 
              type="submit" 
              variant="primary" 
              style={{ margin: "2%" }}
              onClick={handleSearchByFirstName}>
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

            <Button 
              type="submit" 
              variant="primary" 
              style={{ margin: "2%" }} 
              onClick={handleSearchById}>
              Search
            </Button>

          </Col>
        </Row>
        <Row>
          <Col>

            <h4 >Add New Patient</h4>
            <Button 
              size="lg" 
              variant="primary" 
              onClick={handleShow} 
              style={{ "width": "20%" }}>
              +
            </Button>

            <Modal scrollable={true} show={show} onHide={handleClose}>
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
                      name="first_name"
                      value={patientData.first_name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="last_name"
                      value={patientData.last_name}
                      onChange={handleChange}
                      required
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
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicHeight">
                    <Form.Label>Height in cm.</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter height"
                      name="height"
                      value={patientData.height}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicWeight">
                    <Form.Label>Weight in kg.</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter weight"
                      name="weight"
                      value={patientData.weight}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Gender"
                      name="gender"
                      value={patientData.gender}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      name="phone_number"
                      value={patientData.phone_number}
                      onChange={handleChange}
                      required
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
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicHistory">
                    <Form.Label>Patient History</Form.Label>
                    <Form.Control
                      type="text"
                      // increases the height of input field
                      as="textarea" rows="4"
                      placeholder="Enter History"
                      name="history"
                      value={patientData.history}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>


                  <Form.Group controlId="formBasicAllergies">
                    <Form.Label>Enter Allergies</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea" rows="4"
                      placeholder="Enter Allergies"
                      name="alergies"
                      value={patientData.alergies}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <ErrorMessage message={errormessage}/>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ marginTop: "2%" }}>
                    Submit  
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>


          </Col>
        </Row>
      </Form>

      <div className="patients-table">
        
        {loaded && patients ? (
          <Table responsive bordered hover={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.email}</td>
                  <td>
                    <Button variant="success"
                      onClick={() => handleShowHistory(patient.id)} 
                    >
                      View
                    </Button>{' '}
                    <Modal backdropClassName="custom-modal-backdrop" scrollable={true} size="lg" show={showhistory} onHide={handleCloseHistory}>
                      <Modal.Header closeButton>
                        <Modal.Title>Patient History</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h4>Patient Details</h4>
                        <hr/>
                        <Row>
                          <Col>
                            <h5>First Name: {patientdetails.first_name}</h5>
                            <h5>Age: {patientdetails.age}</h5>
                            <h5>Height: {patientdetails.height}</h5>
                            <h5>Phone Number: {patientdetails.phone_number}</h5>
                          </Col>
                          <Col>
                            <h5>Last Name: {patientdetails.last_name}</h5>
                            <h5>Gender: {patientdetails.gender}</h5>
                            <h5>Weight: {patientdetails.weight}</h5>
                            <h5>Email: {patientdetails.email}</h5>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <h5>Patient History: </h5>
                          <span style={{whiteSpace: "pre-wrap",}}>{patientdetails.history}</span>
                        </Row>
                        <hr/>
                        <Row>
                          <h5>Patient Allergies: </h5>
                          <span style={{whiteSpace: "pre-wrap",}}>{patientdetails.alergies}</span>
                        </Row>
                        <hr/>
                        <Row>
                          <h5>Patient History: </h5>
                          {loadedhistory && patienthistory ? (
                            <Table responsive bordered>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Test Type</th>
                                  <th>Description</th>
                                  <th>Date</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>                             
                                {patienthistory.map((history) => (
                                  <tr key={history.id}>
                                    <td>{history.id}</td>
                                    <td>{history.test_type}</td>
                                    <td>{history.description}</td>
                                    <td>{history.date}</td>
                                    <td>
                                      <Button variant="success" onClick={() => handleDownloadScan(history.patient_id, history.id)} >
                                          Scan
                                      </Button>{' '}
                                      <Button variant="danger" onClick={() => handleDownloadReport(history.patient_id, history.id)} >
                                          Report
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          ):(
                            <p>No Tests Found!</p>
                          )}
                        </Row>
                      </Modal.Body>
                    </Modal>
                    <Button variant="danger"
                      // className="button mr-2 is-danger is-light"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !errormessage ? (
            <p>Loading...</p>
          ):(
            <p>
              <ErrorMessage message={errormessage} />
              Failed!
            </p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Patients;
