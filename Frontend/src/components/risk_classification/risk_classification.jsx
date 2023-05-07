import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { UserContext } from "../../context/UserContext";
import Spinner from 'react-bootstrap/Spinner';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import './risk_classification.css';
import ErrorMessage from '../error_message/ErrorMessage';
import SuccessMessage from '../success_message/SuccessMessage';

function RiskClassification() {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [token,] = useContext(UserContext);

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("patient_id", id);
    formData.append("test_type", "risk classification");
    formData.append("description", description);
    formData.append("file", image);
  
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      // body contains all the input values to the API
      body: formData
    };

    const response = await fetch("/api/doctors/upload_scan/risk_classification", requestOptions);
    setLoading(false);
    if (!response.ok) {
      setErrorMessage("Failed to perform test!")
    } else {
      setSuccessMessage("The report has been generated successfully. Navigate to the Patient Portal to download the report.")
    }
    setId("");
    setDescription("");
    
    await delay(5000); 
    setErrorMessage("");
    setSuccessMessage("");
  }

  return (
    <div>
      <NavBar />
      <div>
        <section style={{margin: "1% 5% 2% 5%"}}>
          <h1>Risk Classification Model</h1>
          <p style={{ "text-align": "justify", fontSize: "20px" }}>
          This diagnosis model explores the use of convolutional neural network (CNNs) to classify whether a patient has a risk of any eye disease or not. Eye diseases such as glaucoma, diabetic retinopathy, and macular degeneration are a major cause of blindness and visual impairment worldwide. Early detection and intervention are critical in preventing vision loss and improving patient outcomes. We have developed and tested a neural network model using a large dataset of eye images to predict the risk of eye diseases.
          <br/><br/>
          Our results show that the CNNs achieved high accuracy in detecting the presence of eye disease, with potential to aid in early diagnosis and intervention. The findings of this study suggest that neural network models have great potential in improving eye disease screening and diagnosis, which could lead to better patient outcomes and reduced healthcare costs.
          <br/><br/>
          The development of accurate and reliable automated methods for the detection of eye diseases from retinal fundus images has the potential to improve the diagnosis and management of these conditions, particularly in settings where access to trained ophthalmologists may be limited. However, it is important to note that automated methods should not replace clinical examination by a trained healthcare professional, but rather serve as a complementary tool for disease screening and detection.
          </p>
          <Container className="d-flex" style={{ minHeight: "80vh"}}>
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="text-center mb-4">Enter Patient Details</h2>

                <Form onSubmit={handleSubmit}>

                  
                  <Form.Group className="mb-3" controlId="formId">
                    <Form.Label className="d-flex">Patient ID</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter Patient ID" 
                      value={id} 
                      onChange={(e) => setId(e.target.value)} 
                      className="form-input" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label className="d-flex">Description</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter Patient Description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      className="form-input" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label className="d-flex">Scan</Form.Label>
                    <Form.Control 
                      type="file" 
                      onChange={(e) => setImage(e.target.files[0])} 
                      className="form-input" />
                  </Form.Group>
                  <ErrorMessage message={errormessage}/>
                  <SuccessMessage message={successmessage}/> 
                  <Button variant="primary" type="submit" className="submit-btn" style={{ "marginTop": "2%" }}>
                  {loading ? <Spinner animation="border" size="xl" /> : "Submit"}
                  </Button>
                </Form>
                
              </Col>
              <Col md={6}>
                <Image src={"/images/risk_classification_model.jpeg"} alt="Your Image" fluid style={{ "max-width": "auto", "height": "auto"}} />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default RiskClassification;
