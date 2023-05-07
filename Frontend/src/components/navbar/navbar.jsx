import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"
import { FaUserCircle } from 'react-icons/fa';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [token, setToken] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/")
  };

  return (
    <Navbar className="color-nav" expand="lg" variant="light" style={{ "padding": "1%", "font-size": "20px" }}>
      <Container >
        <Navbar.Brand style={{ color: "white" }} href="/home">DeepEye</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">


          {
            token ? (
              <>
                <Nav className="me-auto" >
                  <Nav.Link style={{ color: "white" }} href="/home">Home</Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="/test">Test</Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="/patients">Patients</Nav.Link>
                </Nav>
                <Nav style={{ "margin-left": "auto" }}>
                  <Nav.Link style={{ color: "white" }} onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="/profile"><FaUserCircle size={40} /></Nav.Link>
                </Nav>
              </>


            ) : (
              <>
                <Nav className="me-auto" >
                  <Nav.Link style={{ color: "white" }} href="/home">Home</Nav.Link>
                </Nav>
                <Nav style={{ "margin-left": "auto" }}>
                  <Nav.Link style={{ color: "white" }} href="/">Login</Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="/signup">Sign Up</Nav.Link>
                </Nav>
              </>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;