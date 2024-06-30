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
import "../style/HealthCalculator.css";
import banner from "../images/banner/healthCalculator.mp4";
import Background from "../components/Background";

const HealthCalculator = () => {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [waistUnit, setWaistUnit] = useState("cm");
  const [hipUnit, setHipUnit] = useState("cm");
  const [activityLevel, setActivityLevel] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const convertWeightToKg = (weight, unit) =>
    unit === "lb" ? weight / 2.20462 : weight;
  const convertHeightToCm = (feet, inches) => feet * 30.48 + inches * 2.54;
  const convertLengthToCm = (length, unit) =>
    unit === "in" ? length * 2.54 : length;

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const calculateBodyFatPercentage = (bmi, age, gender) => {
    if (gender === "male") {
      return (1.2 * bmi + 0.23 * age - 16.2).toFixed(2);
    } else {
      return (1.2 * bmi + 0.23 * age - 5.4).toFixed(2);
    }
  };

  const calculateWaistToHipRatio = (waist, hip, gender) => {
    const ratio = (waist / hip).toFixed(2);
    const risk =
      gender === "male"
        ? ratio > 0.9
          ? "High"
          : "Low"
        : ratio > 0.85
        ? "High"
        : "Low";
    return { ratio, risk };
  };

  const calculateCaloricNeeds = (
    weight,
    height,
    age,
    gender,
    activityLevel
  ) => {
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    };

    return (bmr * (activityFactors[activityLevel] || 1.2)).toFixed(2);
  };

  const calculateIdealWeight = (height, gender) => {
    return gender === "male"
      ? (50 + 0.9 * (height - 152)).toFixed(2)
      : (45.5 + 0.9 * (height - 152)).toFixed(2);
  };

  const calculateWaterIntake = (weight) => {
    return (weight * 0.033).toFixed(2);
  };

  const calculateBSA = (weight, height) => {
    return Math.sqrt((weight * height) / 3600).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    let weightInKg = weight ? convertWeightToKg(weight, weightUnit) : null;
    let heightInCm =
      heightUnit === "cm"
        ? heightCm
        : heightFeet && heightInches
        ? convertHeightToCm(heightFeet, heightInches)
        : null;

    if (
      weightInKg &&
      heightInCm &&
      weightInKg > 0 &&
      heightInCm > 0 &&
      age &&
      age > 0 &&
      gender
    ) {
      const bmiValue = calculateBMI(weightInKg, heightInCm);
      const bodyFatPercentage = calculateBodyFatPercentage(
        bmiValue,
        age,
        gender
      );
      const waistInCm = waist ? convertLengthToCm(waist, waistUnit) : null;
      const hipInCm = hip ? convertLengthToCm(hip, hipUnit) : null;
      const waistToHipRatio =
        waistInCm && hipInCm
          ? calculateWaistToHipRatio(waistInCm, hipInCm, gender)
          : null;
      const caloricNeeds = activityLevel
        ? calculateCaloricNeeds(
            weightInKg,
            heightInCm,
            age,
            gender,
            activityLevel
          )
        : null;
      const idealWeight = calculateIdealWeight(heightInCm, gender);
      const waterIntake = calculateWaterIntake(weightInKg);
      const bsa = calculateBSA(weightInKg, heightInCm);

      setResults([
        { label: "BMI", value: bmiValue },
        { label: "Body Fat Percentage", value: bodyFatPercentage },
        {
          label: "Waist-to-Hip Ratio",
          value: waistToHipRatio ? waistToHipRatio.ratio : "N/A",
          message: waistToHipRatio ? `Risk: ${waistToHipRatio.risk}` : null,
        },
        { label: "Caloric Needs", value: caloricNeeds ? caloricNeeds : "N/A" },
        { label: "Ideal Weight", value: idealWeight },
        { label: "Water Intake", value: `${waterIntake} liters` },
        { label: "BSA", value: `${bsa} m²` },
      ]);
    } else {
      setError(
        "Please fill in all the required fields with valid values to calculate the metrics."
      );
    }
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="video-container">
          <video src={banner} autoPlay loop muted></video>
        </div>
        <Container>
          <h2 className="bmi-header">Health Calculator</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={`Enter your weight in ${weightUnit}`}
                    className={
                      error && (!weight || weight <= 0) ? "is-invalid" : ""
                    }
                  />
                  <Input
                    type="select"
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="height">Height</Label>
                  {heightUnit === "cm" ? (
                    <Input
                      id="heightCm"
                      name="heightCm"
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="Enter your height in cm"
                      className={
                        error && (!heightCm || heightCm <= 0)
                          ? "is-invalid"
                          : ""
                      }
                    />
                  ) : (
                    <>
                      <Input
                        id="heightFeet"
                        name="heightFeet"
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="Feet"
                        className={
                          error && (!heightFeet || heightFeet <= 0)
                            ? "is-invalid"
                            : ""
                        }
                      />
                      <Input
                        id="heightInches"
                        name="heightInches"
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        placeholder="Inches"
                        className={
                          error && (!heightInches || heightInches < 0)
                            ? "is-invalid"
                            : ""
                        }
                      />
                    </>
                  )}
                  <Input
                    type="select"
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="feetInches">feet & inches</option>
                  </Input>
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
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="waist">Waist</Label>
                  <Input
                    id="waist"
                    name="waist"
                    type="number"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    placeholder={`Enter your waist in ${waistUnit}`}
                    className={error && waist < 0 ? "is-invalid" : ""}
                  />
                  <Input
                    type="select"
                    value={waistUnit}
                    onChange={(e) => setWaistUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="in">inch</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="hip">Hip</Label>
                  <Input
                    id="hip"
                    name="hip"
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    placeholder={`Enter your hip in ${hipUnit}`}
                    className={error && hip < 0 ? "is-invalid" : ""}
                  />
                  <Input
                    type="select"
                    value={hipUnit}
                    onChange={(e) => setHipUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="in">inch</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="activityLevel">Activity Level</Label>
                  <Input
                    id="activityLevel"
                    name="activityLevel"
                    type="select"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className={error && !activityLevel ? "is-invalid" : ""}
                  >
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">
                      Sedentary (little or no exercise)
                    </option>
                    <option value="lightlyActive">
                      Lightly active (light exercise/sports 1-3 days/week)
                    </option>
                    <option value="moderatelyActive">
                      Moderately active (moderate exercise/sports 3-5 days/week)
                    </option>
                    <option value="veryActive">
                      Very active (hard exercise/sports 6-7 days a week)
                    </option>
                    <option value="extraActive">
                      Extra active (very hard exercise/sports & a physical job)
                    </option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {error && <Alert color="danger">{error}</Alert>}
            {results.length > 0 && (
              <Alert color="success">
                {results.map((result, index) => (
                  <div key={index}>
                    <strong>{result.label}:</strong> {result.value}{" "}
                    {result.message && `(${result.message})`}
                  </div>
                ))}
              </Alert>
            )}
            <Button type="submit">Calculate</Button>
          </Form>
        </Container>
      </Base>
    </div>
  );
};

export default HealthCalculator;
