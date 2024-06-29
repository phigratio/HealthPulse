import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import Base from "../components/Base";
import "../style/BMI.css";

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (
      !weight ||
      !height ||
      !age ||
      !gender ||
      weight <= 0 ||
      height <= 0 ||
      age <= 0
    ) {
      setError("Please fill in all the fields with valid values.");
      setMessage("");
      return;
    }

    setError("");
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    let bmiMessage = "";
    if (gender === "male") {
      if (bmiValue < 18.5) {
        bmiMessage = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiMessage = "Normal weight";
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiMessage = "Overweight";
      } else {
        bmiMessage = "Obesity";
      }
    } else if (gender === "female") {
      if (bmiValue < 18.5) {
        bmiMessage = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiMessage = "Normal weight";
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiMessage = "Overweight";
      } else {
        bmiMessage = "Obesity";
      }
    }

    setMessage(`Your BMI is ${bmiValue}. ${bmiMessage}`);
  };

  return (
    <Base>
      <Container>
        <h2 className="bmi-header">BMI Calculator</h2>
        <Form onSubmit={calculateBMI}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight in kg"
                  className={
                    error && (!weight || weight <= 0) ? "is-invalid" : ""
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height in cm"
                  className={
                    error && (!height || height <= 0) ? "is-invalid" : ""
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className={error && (!age || age <= 0) ? "is-invalid" : ""}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  type="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={error && !gender ? "is-invalid" : ""}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          {error && <Alert color="danger">{error}</Alert>}
          {message && <Alert color="success">{message}</Alert>}
          <Button type="submit">Calculate BMI</Button>
        </Form>
      </Container>
    </Base>
  );
};

export default BMI;
