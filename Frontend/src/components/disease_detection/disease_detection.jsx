import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import './disease_detection.css';

function DiseaseDetection() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleIdChange = (event) => {
    setId(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log(`Name: ${name}, ID: ${id}, Image: ${image}`);
  }

  return (
    <div>
      <NavBar />
      <div>
        <section style={{margin: "1% 5% 2% 5%"}}>
          <h1>Disease Detection Model</h1>
          <p style={{ "text-align": "justify", fontSize: "20px" }}>
          This diagnosis model explores the use of convolutional neural network (CNNs) to classify whether a patient has a risk of any eye disease or not. Eye diseases such as glaucoma, diabetic retinopathy, and macular degeneration are a major cause of blindness and visual impairment worldwide. Early detection and intervention are critical in preventing vision loss and improving patient outcomes. We have developed and tested a neural network model using a large dataset of eye images to predict the risk of eye diseases.
          <br/><br/>
          Our results show that the CNNs achieved high accuracy in detecting the presence of eye disease, with potential to aid in early diagnosis and intervention. The findings of this study suggest that neural network models have great potential in improving eye disease screening and diagnosis, which could lead to better patient outcomes and reduced healthcare costs.
          <br/><br/>
          The development of accurate and reliable automated methods for the detection of eye diseases from retinal fundus images has the potential to improve the diagnosis and management of these conditions, particularly in settings where access to trained ophthalmologists may be limited. However, it is important to note that automated methods should not replace clinical examination by a trained healthcare professional, but rather serve as a complementary tool for disease screening and detection.
          </p>
          <Container className="d-flex" style={{ minHeight: "80vh" , marginTop: "-7%"}}>
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="text-center mb-4">Enter Patient Details</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label className="d-flex">Patient ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter Patient ID" value={name} onChange={handleNameChange} className="form-input" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formId">
                    <Form.Label className="d-flex">Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Patient Description" value={id} onChange={handleIdChange} className="form-input" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label className="d-flex">Scan</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} className="form-input" />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="submit-btn" style={{ "marginTop": "2%" }}>
                    Submit
                  </Button>
                </Form>
              </Col>
              <Col md={6}>
                <Image src={"/images/disease_detection_model.png"} alt="Your Image" fluid style={{ "max-width": "700px", "height": "auto"}} roundedCircle/>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default DiseaseDetection;
