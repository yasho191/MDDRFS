import React from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';

function LoginPage() {
    return (
        <div>
            <NavBar />
            <section>
                <Container className="d-flex" style={{ minHeight: "80vh" }}>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <Image src={"/images/hero-header.png"} alt="Your Image" fluid style={{ "height": "50%" }} />
                        </Col>
                        <Col md={6} >
                            <h1 class="fw-bold">Welcome Back to DeepEye! <br /> Login </h1>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="d-flex">Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted d-flex">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="d-flex">Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </section>
            <Footer />
        </div>

    );
}

export default LoginPage;