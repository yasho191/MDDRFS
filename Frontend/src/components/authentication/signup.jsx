import React from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';

function SignUpPage() {
    return (
        <div>
            <NavBar />
            <section>
                <Container className="d-flex" style={{ minHeight: "80vh", marginTop: "2%" }}>
                    <Row className="align-items-center">
                        <Col md={6} >
                            <h1 class="fw-bold">Create A New DeepEye Account!</h1>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="d-flex">Email address</Form.Label>
                                    <Form.Control type="email" placeholder="example@name.com" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label className="d-flex">Personal Information</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" style={{ margin: "10px" }} />
                                    <Form.Control type="text" placeholder="First Name" style={{ margin: "10px" }} />
                                    <Form.Control type="text" placeholder="Age" style={{ margin: "10px" }} />
                                    <Form.Control type="text" placeholder="Phone Number" style={{ margin: "10px" }} />
                                    <Form.Control type="text" placeholder="Qualification" style={{ margin: "10px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="d-flex">Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                    <Form.Text id="passwordHelpBlock" muted >
                                        Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters.
                                    </Form.Text>
                                    <Form.Label className="d-flex">Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Re-enter Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <Image src={"/images/signup-image.jpeg"} alt="Your Image" fluid style={{ "max-width": "100%", "height": "auto" }} roundedCircle/>
                        </Col>
                    </Row>

                </Container>
            </section>
            <Footer />
        </div>

    );
}

export default SignUpPage;