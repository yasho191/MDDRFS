import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import "./footer.css";

function Footer() {
  return (
    <footer className="foot" >
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a style={{color:"white"}} href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook size={30}/></a>
              </li>
              <li className="list-inline-item">
                <a style={{color:"white"}} href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter size={30}/></a>
              </li>
              <li className="list-inline-item">
                <a style={{color:"white"}} href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram size={30}/></a>
              </li>
            </ul>
            <p className="mt-3 mb-0" style={{color:"white"}}>&copy; {new Date().getFullYear()} DeepEye. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;