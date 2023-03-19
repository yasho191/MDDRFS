import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './test_type.css';

function TestType() {
  return (
    <div className="card-container">
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/images/nerve_segmentation.png" />
          <Card.Body>
            <Card.Title>Risk Classification</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" href="/risk_classification">Select</Button>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/images/risk_classification.png" />
          <Card.Body>
            <Card.Title>Disease Detection</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" href="/disease_detection">Select</Button>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/images/nerve_segmentation.png" />
          <Card.Body>
            <Card.Title>Nerve Segmentation</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" href="/nerve_segmentation">Select</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default TestType;
