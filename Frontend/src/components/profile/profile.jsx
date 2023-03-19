import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Line, Chart } from "react-chartjs-2";

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            label: "Tests",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40, 45, 56, 78, 89, 3],
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

function Profile() {
    return (
        <div>
            <NavBar />
            <div style={{margin: "2%"}}>
            <Container>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Number of Tests Per Month</Card.Header>
                            <Card.Body>
                                <Bar data={data} options={options} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Line Chart</Card.Header>
                            <Card.Body>
                                <Line data={data} options={options} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: "2%"}}>
                    <Col md={6}>
                        <Card className="h-100">
                            <Card.Header>Doctor Information</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>First Name: Dr. John</ListGroup.Item>
                                    <ListGroup.Item>Last Name: Doe</ListGroup.Item>
                                    <ListGroup.Item>Age: 56</ListGroup.Item>
                                    <ListGroup.Item>Specialty: Cardiologist</ListGroup.Item>
                                    <ListGroup.Item>Phone: 555-555-5555</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} >
                        <Row>
                        <Col md={6} >
                        
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Total Doctors</Card.Header>
                        45
                        </Card>
                        </Col>
                        <Col md={6}>
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Total Patients</Card.Header>
                            32
                        </Card>
                        </Col>
                        </Row>
                        <Row style={{marginTop: "2%"}}>
                        <Col md={6} >
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Your Patients</Card.Header>
                            45
                        </Card>
                        </Col>
                        <Col md={6}>
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Your Tests</Card.Header>
                            32
                        </Card>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;