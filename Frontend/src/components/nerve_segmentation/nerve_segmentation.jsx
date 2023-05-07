import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { UserContext } from "../../context/UserContext";
import Spinner from 'react-bootstrap/Spinner';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import './nerve_segmentation.css';
import ErrorMessage from '../error_message/ErrorMessage';
import SuccessMessage from '../success_message/SuccessMessage';


function NerveSegmentation() {
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
    formData.append("test_type", "nerve segmentation");
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

    const response = await fetch("/api/doctors/upload_scan/nerve_segmentation", requestOptions);
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
          <h1>Nerve Segmentation Model</h1>
          <p style={{ "text-align": "justify", fontSize: "20px" }}>
            The nerve segmentation of retinal fundus images refers to the process of segmenting the optic nerve head (ONH) or optic disc from retinal fundus images. This process is an important step in the analysis of retinal images for the diagnosis and monitoring of various eye diseases, such as glaucoma, macular degeneration, and diabetic retinopathy.
          <br/><br/>
            The optic nerve head is a circular region in the retina where the optic nerve fibers converge and exit the eye. It is a critical structure in the eye that is responsible for transmitting visual signals from the retina to the brain. The segmentation of the optic nerve head is a challenging task due to its variable size, shape, and color, as well as the presence of blood vessels and other retinal structures that can interfere with its segmentation.
          <br/><br/>
            Various image processing and machine learning techniques have been developed for the segmentation of the optic nerve head from retinal fundus images. These techniques typically involve preprocessing the image to enhance the contrast and remove noise, followed by feature extraction and segmentation using methods such as thresholding, region growing, active contours, or deep learning.
          </p>
          <Container className="d-flex" style={{ minHeight: "80vh" }}>
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
                    <Form.Control type="text" 
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
                <Image src={"/images/retinal_image.jpeg"} alt="Your Image" fluid style={{ "max-width": "auto", "height": "auto", }} />
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
