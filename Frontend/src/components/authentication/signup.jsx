import React, {useState, useContext} from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../error_message/ErrorMessage';

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [age, setAge] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [qualification, setQualification] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    const submitSignUp = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
            { 
                email: email, 
                first_name: firstname,
                last_name: lastname,
                age: age,
                phone_number: phonenumber,
                qualification: qualification,
                hashed_password: password 
            }
            ),
        };

        const response = await fetch("/api/doctors", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
            navigate("/profile")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === repassword && password.length > 8) {
            submitSignUp();
        } else {
            setErrorMessage(
                "Ensure that the passwords match and greater than 8 characters"
            );
        }
    };

    return (
        <div>
            <NavBar />
            <section>
                <Container className="d-flex" style={{ minHeight: "80vh", marginTop: "2%" }}>
                    <Row className="align-items-center">
                        <Col md={6} >
                            <h1 class="fw-bold">Create A New DeepEye Account!</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="d-flex">Email address</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="example@name.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label className="d-flex">Personal Information</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Last Name"
                                    required
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)} 
                                    style={{ margin: "10px" }} />

                                    <Form.Control 
                                    type="text" 
                                    placeholder="First Name"
                                    required
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    style={{ margin: "10px" }} />

                                    <Form.Control 
                                    type="number" 
                                    placeholder="Age"
                                    required
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)} 
                                    style={{ margin: "10px" }} />

                                    <Form.Control 
                                    type="text" 
                                    placeholder="Phone Number"
                                    required
                                    value={phonenumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    style={{ margin: "10px" }} />

                                    <Form.Control 
                                    type="text" 
                                    placeholder="Qualification"
                                    required
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)} 
                                    style={{ margin: "10px" }} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="d-flex">Password</Form.Label>

                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />

                                    <Form.Text id="passwordHelpBlock" muted >
                                        Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters.
                                    </Form.Text>
                                    <Form.Label className="d-flex">Confirm Password</Form.Label>
                                    
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Re-enter Password"
                                    required
                                    value={repassword}
                                    onChange={(e) => setRePassword(e.target.value)} />

                                </Form.Group>
                                <p>Already Registered? <br/> <a href='/'>LogIn</a></p>
                                <ErrorMessage message={errorMessage}/>
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