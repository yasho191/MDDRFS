import React from 'react'
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import "./home.css"

function Home() {
  return (
    <div>
      <NavBar />
      <section>
        <Container style={{ "margin-bottom": "2%" }}>
          <Row className="align-items-center" style={{ "margin-bottom": "1%" }}>
            <Col md={6}>
              <h1 class="fw-bold" style={{ "text-align": "left" }}>Early disease detection using retinal scans.</h1>
              <p style={{ "text-align": "justify" }}>DeepEye uses a Deep Convolutional Neural Network built on the lastest State of the Art Architectures like ResNet, Alexnet, Vision Transformer. This ensures consistent performance and accurate results in real-world application. To get more information about our method please refer our Research Paper.</p>
            </Col>
            <Col md={6}>
              <Image src={"/images/hero-herder.jpg_fit=scale"} alt="Your Image" fluid style={{ "height": "50%", "margin": "1%" }} rounded/>
            </Col>
          </Row>
          <Row className="align-items-center" style={{ "margin-bottom": "2%" }}>
            <Col md={6}>
              <Image src={"/images/hero-header.png"} alt="Your Image" fluid style={{ "height": "50%" }} />
            </Col>
            <Col md={6}>
              <h1 class="fw-bold">No Delays No Suspense <br />Get results instantly!</h1>
              <p style={{ "text-align": "justify" }}>DeepEye aims to provide a hassle free user experience use our detection system and get your reports. With DeepEye diagnosis is easier than ever. Every user will get a report with a list of 20 diseases and the possibility of their presence. This report is not to be trusted completely. You can take this report to your doctor who can then advice you the right course of action.</p>
            </Col>
          </Row>
          <Row className="align-items-center" style={{ "margin-bottom": "1%" }}>
            <Col md={6}>
              <h1 class="fw-bold" style={{ "text-align": "left" }}>Platform Features</h1><br/>
              <p style={{ "text-align": "justify" }}>
                <h3>1. Risk Classification</h3>
                <p>Determining whether a patient is at risk for a disease is the goal of this section. The aim is to build a binary classification model that can classify the retinal scans based on the possibility of risk for any disease.</p>
                <h3>2. Disease Detection</h3>
                <p>To classify the disease and provide an accurate diagnosis based on the retinal fundus images. The aim is to build a multi-class classification model that can classify the retinal scans based on the possibility of risk for any disease.</p>
                <h3>3. Nerve Segmentation</h3>
                <p>The aim is to build an Image Segmentation model that can segment the nerves in retinal scans. </p>
              </p>
            </Col>
            <Col md={6}>
              <Image src={"/images/neural_networks.png"} alt="Your Image" fluid style={{ height: "300px", "margin": "1%" }} />
            </Col>
          </Row>
          <Row className="align-items-center card-container">
            <h1 class="fw-bold" >How to use?</h1>
            <p>We try to provide the easiest UI for you. Follow the procedure given bellow to get a complete diagnostic report. We don't garuntee that all the results in the report will be true.
              Once you get a report it is adviced that you consult a doctor and confirm the diagnosis.
              The aim of the report is only to point out the possible conditions one might have.
              The system will need some of your medical history along with your retinal scans</p>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/upload.png" style={{ "height": "100%", "width": "100%" }} />
              <Card.Body>
                <Card.Title>Upload Retinal Scan</Card.Title>
                <Card.Text>
                  Choose your retinal scan and upload it here. After uploading the image press on the Generate Report button.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/processing.png" style={{ "height": "100%", "width": "100%" }} />
              <Card.Body>
                <Card.Title>Image Scanning and Processing</Card.Title>
                <Card.Text>
                  The retinal fundus images will be processed by our system and the reports will be generated.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="images/report.png" style={{ "height": "100%", "width": "100%" }} />
              <Card.Body>
                <Card.Title>Download Generated Report</Card.Title>
                <Card.Text>
                  Track and save your medical history and health data calculated by our model.
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  )
}

export default Home;
