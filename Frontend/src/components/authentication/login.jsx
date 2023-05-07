import { React, useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../error_message/ErrorMessage';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const response = await fetch("/api/token", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail + " Please check your Email ID and Password");
        } else {
            setToken(data.access_token);
            navigate("/profile")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };

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
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="d-flex">Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted d-flex">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="d-flex">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <ErrorMessage message={errorMessage}/>
                                <p>Haven't Yet Registered? <br /> <a href='/signup'>SignUp</a></p>
                                <Button variant="primary" type="submit" >
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