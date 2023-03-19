import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"
import { FaUserCircle } from 'react-icons/fa';

function NavBar() {
  return (
    <Navbar className="color-nav" expand="lg" variant="light" style={{ "padding": "1%", "font-size": "20px" }}>
      <Container >
        <Navbar.Brand style={{color:"white"}} href="/">DeepEye</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link style={{color:"white"}} href="/">Home</Nav.Link>
            <Nav.Link style={{color:"white"}} href="/test">Test</Nav.Link>
            <Nav.Link style={{color:"white"}} href="/patients">Patients</Nav.Link>
          </Nav>
          <Nav style={{"margin-left": "auto"}}>
            <Nav.Link style={{color:"white"}} href="/login">Login</Nav.Link>
            <Nav.Link style={{color:"white"}} href="/signup">Sign Up</Nav.Link>
            <Nav.Link style={{color:"white"}} href="/profile"><FaUserCircle size={40}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;