import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import './nerve_segmentation.css';

function NerveSegmentation() {
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
          <h1>Nerve Segmentation Model</h1>
          <p style={{ "text-align": "justify", fontSize: "20px" }}>
            The nerve segmentation of retinal fundus images refers to the process of segmenting the optic nerve head (ONH) or optic disc from retinal fundus images. This process is an important step in the analysis of retinal images for the diagnosis and monitoring of various eye diseases, such as glaucoma, macular degeneration, and diabetic retinopathy.
          <br/><br/>
            The optic nerve head is a circular region in the retina where the optic nerve fibers converge and exit the eye. It is a critical structure in the eye that is responsible for transmitting visual signals from the retina to the brain. The segmentation of the optic nerve head is a challenging task due to its variable size, shape, and color, as well as the presence of blood vessels and other retinal structures that can interfere with its segmentation.
          <br/><br/>
            Various image processing and machine learning techniques have been developed for the segmentation of the optic nerve head from retinal fundus images. These techniques typically involve preprocessing the image to enhance the contrast and remove noise, followed by feature extraction and segmentation using methods such as thresholding, region growing, active contours, or deep learning.
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
                <Image src={"/images/retinal_image.jpeg"} alt="Your Image" fluid style={{ "max-width": "100%", "height": "auto", "marginLeft": "50%" }} />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default NerveSegmentation;
