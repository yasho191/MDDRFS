import React, {useState, useContext, useEffect} from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";
import { UserContext } from "../../context/UserContext";

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            label: "Tests",
            backgroundColor: "rgba(0,122,204,0.2)",
            borderColor: "#007ACC",
            borderWidth: 1,
            hoverBackgroundColor: "#007ACC",
            hoverBorderColor: "#007ACC",
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
    const [totaldoctors, setTotalDoctors] = useState("");
    const [totalpatients, setTotalPatients] = useState("");
    const [doctorpatients, setDoctorPatients] = useState("");
    const [doctortests, setDoctorTests] = useState("");
    const [doctordetails, setDoctorDetails] = useState("");
    const [token, ] = useContext(UserContext);

    useEffect (() => {
        const fetchTotalDoctors = async () => {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
    
            const response = await fetch("/api/num_of_doctors", requestOptions);
            const data = await response.json();
            setTotalDoctors(data);
        }
    
        const fetchTotalPatients = async () =>{
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
    
            const response = await fetch("/api/num_of_patients", requestOptions);
            const data = await response.json();
            setTotalPatients(data);
        }
    
        const fetchDoctorPatients = async () =>{
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                            Authorization: "Bearer " + token, 
                        },
            };
    
            const response = await fetch("/api/doctors/num_of_patients_for_doctor", requestOptions);
            const data = await response.json();
            setDoctorPatients(data);
        }
    
        const fetchDoctorTests = async () =>{
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                            Authorization: "Bearer " + token, 
                        },
            };
    
            const response = await fetch("/api/doctors/num_of_tests_for_doctor", requestOptions);
            const data = await response.json();
            setDoctorTests(data);
        }

        const fetchDoctorDetails = async () =>{
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                            Authorization: "Bearer " + token, 
                        },
            };
    
            const response = await fetch("/api/doctors/doctor", requestOptions);
            const data = await response.json();
            setDoctorDetails(data);
        }

        fetchTotalDoctors();
        fetchTotalPatients();
        fetchDoctorPatients();
        fetchDoctorTests();
        fetchDoctorDetails();
    }
    , [token]);

    return (
        <div>
            <NavBar />
            <div style={{margin: "2%"}}>
            <Container>
                
                <Row style={{marginTop: "2%", marginBottom: "2%"}}>
                    <Col md={6}>
                        <Card className="h-100">
                            <Card.Header>Doctor Information</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>First Name: {doctordetails.first_name}</ListGroup.Item>
                                    <ListGroup.Item>Last Name: {doctordetails.last_name}</ListGroup.Item>
                                    <ListGroup.Item>Age: {doctordetails.age}</ListGroup.Item>
                                    <ListGroup.Item>Specialty: {doctordetails.qualification}</ListGroup.Item>
                                    <ListGroup.Item>Phone: {doctordetails.phone_number}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} >
                        <Row>
                        <Col md={6} >
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Total Doctors</Card.Header>
                            {totaldoctors}
                        </Card>
                        </Col>
                        <Col md={6}>
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Total Patients</Card.Header>
                            {totalpatients}
                        </Card>
                        </Col>
                        </Row>
                        <Row style={{marginTop: "2%"}}>
                        <Col md={6} >
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Your Patients</Card.Header>
                            {doctorpatients}
                        </Card>
                        </Col>
                        <Col md={6}>
                        <Card className="p-4 h-100" style={{ fontSize: "1.5rem" }}>
                        <Card.Header>Your Tests</Card.Header>
                            {doctortests}
                        </Card>
                        </Col>
                        </Row>
                    </Col>
                </Row>
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
            </Container>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;