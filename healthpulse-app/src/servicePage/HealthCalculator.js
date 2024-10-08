import React, { useState, useEffect } from "react";
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
import Background from "../components/basicComponents/Background";
import { getCurrentUserDetail } from "../auth";
import banner from "../images/banner/healthCalculator.mp4";
import axios from "axios";
import TextToSpeechButton from "./TextToSpeechButton";
import { getUserInfo, updateUserInfo } from "../service/user-service";
import { geminiKey } from "./apiKeys";
import { toast } from "react-toastify";

const YOUR_API_KEY = geminiKey;

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

  const [userInfo, setUserInfo] = useState({
    address: "",
    district: "",
    phoneNumber: "",
    bloodGroup: "",
    readyToDonateBlood: "",
    geneticDisease: "",
    chronicDisease: "",
    allergies: "",
  });
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = getCurrentUserDetail().id;
        console.log("Fetched user id in health calculator:", userId);
        const user = await getUserInfo(userId);
        console.log("Fetched user details:", user);

        if (user) {
          setWeight(user.weight > 0 ? user.weight : "");
          setHeightCm(user.height > 0 ? user.height : "");
          setAge(user.age > 0 ? user.age : "");
          setGender(user.gender ? user.gender : "");
          setWaist(user.waist > 0 ? user.waist : "");
          setHip(user.hip > 0 ? user.hip : "");
          setActivityLevel(user.activityLevel ? user.activityLevel : "");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to fetch user information.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateUserHealth = () => {
    const updatedUserInfo = {
      ...userInfo,
      height:
        heightUnit === "cm"
          ? heightCm
          : convertHeightToCm(heightFeet, heightInches),
      weight: convertWeightToKg(weight, weightUnit),
      age: age,
      gender: gender,
      waist: convertLengthToCm(waist, waistUnit),
      hip: convertLengthToCm(hip, hipUnit),
    };

    results.forEach((result) => {
      switch (result.label) {
        case "BMI":
          updatedUserInfo.bmi = result.value;
          break;
        case "Body Fat Percentage":
          updatedUserInfo.bodyFatPercentage = result.value;
          break;
        case "Waist to Hip Ratio":
          updatedUserInfo.waistToHipRatio = result.value;
          break;
        case "Daily Caloric Needs":
          updatedUserInfo.calorieNeeds = result.value;
          break;
        case "Ideal Weight":
          updatedUserInfo.idealWeight = result.value;
          break;
        case "Daily Water Intake (L)":
          updatedUserInfo.waterIntake = result.value;
          break;
        case "Body Surface Area (BSA)":
          updatedUserInfo.bsa = result.value;
          break;
        case "Protein Needs":
          updatedUserInfo.proteinNeeds = result.value;
          break;
        case "Carbohydrate Needs":
          updatedUserInfo.carbNeeds = result.value;
          break;
        case "Fat Needs":
          updatedUserInfo.fatNeeds = result.value;
          break;
        case "Muscle Mass Needs":
          updatedUserInfo.muscleMassNeeds = result.value;
          break;
        case "Bone Density Needs":
          updatedUserInfo.boneDensityNeeds = result.value;
          break;
        case "Metabolic Age":
          updatedUserInfo.metabolicAge = result.value;
          break;
        case "Visceral Fat Needs":
          updatedUserInfo.visceralFatNeeds = result.value;
          break;
        case "Body Water Needs":
          updatedUserInfo.bodyWaterNeeds = result.value;
          break;
      }
    });

    const userDetails = getCurrentUserDetail();
    updateUserInfo(updatedUserInfo, userDetails.id)
      .then(() => {
        toast.success("Health information updated successfully");
      })
      .catch((error) => {
        console.error("Error updating health information:", error);
        toast.error("Error updating health information");
      });
  };
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

  const calculateProteinNeeds = (weight) => {
    return (weight * 0.8).toFixed(2);
  };

  const calculateCarbNeeds = (caloricNeeds) => {
    return (caloricNeeds * 0.55).toFixed(2);
  };

  const calculateFatNeeds = (caloricNeeds) => {
    return (caloricNeeds * 0.3).toFixed(2);
  };

  const calculateMuscleMassNeeds = (height, age) => {
    return ((height / 100) * (age * 0.3)).toFixed(2);
  };

  const calculateBoneDensityNeeds = (weight, height) => {
    return ((weight / height) * 0.5).toFixed(2);
  };

  const calculateMetabolicAge = (age, weight, height, gender) => {
    let metabolicAge = 0;
    if (gender === "male") {
      metabolicAge = Math.max(1, (age + weight * 0.8 + height * 0.5) / 2);
    } else {
      metabolicAge = Math.max(1, (age + weight * 0.5 + height * 0.3) / 2);
    }
    return metabolicAge.toFixed(2);
  };

  const calculateVisceralFatNeeds = (waist, hip, gender) => {
    const visceralFatNeeds = gender === "male" ? waist - hip : hip - waist;
    return visceralFatNeeds.toFixed(2);
  };

  const calculateBodyWaterNeeds = (weight) => {
    return (weight * 0.6).toFixed(2);
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
      const caloricNeeds = calculateCaloricNeeds(
        weightInKg,
        heightInCm,
        age,
        gender,
        activityLevel
      );
      const idealWeight = calculateIdealWeight(heightInCm, gender);
      const waterIntake = calculateWaterIntake(weightInKg);
      const bsa = calculateBSA(weightInKg, heightInCm);
      const proteinNeeds = calculateProteinNeeds(weightInKg);
      const carbNeeds = calculateCarbNeeds(caloricNeeds);
      const fatNeeds = calculateFatNeeds(caloricNeeds);
      const muscleMassNeeds = calculateMuscleMassNeeds(heightInCm, age);
      const boneDensityNeeds = calculateBoneDensityNeeds(
        weightInKg,
        heightInCm
      );
      const metabolicAge = calculateMetabolicAge(
        age,
        weightInKg,
        heightInCm,
        gender
      );
      const visceralFatNeeds = calculateVisceralFatNeeds(
        waistInCm,
        hipInCm,
        gender
      );
      const bodyWaterNeeds = calculateBodyWaterNeeds(weightInKg);

      // setResults([
      //   { label: "BMI", value: bmiValue },
      //   { label: "Body Fat Percentage", value: bodyFatPercentage },
      //   { label: "Waist to Hip Ratio", value: waistToHipRatio?.ratio },
      //   { label: "Waist to Hip Ratio Risk", value: waistToHipRatio?.risk },
      //   { label: "Daily Caloric Needs", value: caloricNeeds },
      //   { label: "Ideal Weight", value: idealWeight },
      //   { label: "Daily Water Intake (L)", value: waterIntake },
      //   { label: "Body Surface Area (BSA)", value: bsa },
      //   { label: "Protein Needs", value: proteinNeeds },
      //   { label: "Carbohydrate Needs", value: carbNeeds },
      //   { label: "Fat Needs", value: fatNeeds },
      //   { label: "Muscle Mass Needs", value: muscleMassNeeds },
      //   { label: "Bone Density Needs", value: boneDensityNeeds },
      //   { label: "Metabolic Age", value: metabolicAge },
      //   { label: "Visceral Fat Needs", value: visceralFatNeeds },
      //   { label: "Body Water Needs", value: bodyWaterNeeds },
      // ]);

      setResults([
        { label: "BMI", value: isNaN(bmiValue) ? 0 : bmiValue },
        {
          label: "Body Fat Percentage",
          value: isNaN(bodyFatPercentage) ? 0 : bodyFatPercentage,
        },
        {
          label: "Waist to Hip Ratio",
          value: isNaN(waistToHipRatio?.ratio) ? 0 : waistToHipRatio?.ratio,
        },
        {
          label: "Waist to Hip Ratio Risk",
          value: isNaN(waistToHipRatio?.risk) ? 0 : waistToHipRatio?.risk,
        },
        {
          label: "Daily Caloric Needs",
          value: isNaN(caloricNeeds) ? 0 : caloricNeeds,
        },
        { label: "Ideal Weight", value: isNaN(idealWeight) ? 0 : idealWeight },
        {
          label: "Daily Water Intake (L)",
          value: isNaN(waterIntake) ? 0 : waterIntake,
        },
        { label: "Body Surface Area (BSA)", value: isNaN(bsa) ? 0 : bsa },
        {
          label: "Protein Needs",
          value: isNaN(proteinNeeds) ? 0 : proteinNeeds,
        },
        {
          label: "Carbohydrate Needs",
          value: isNaN(carbNeeds) ? 0 : carbNeeds,
        },
        { label: "Fat Needs", value: isNaN(fatNeeds) ? 0 : fatNeeds },
        {
          label: "Muscle Mass Needs",
          value: isNaN(muscleMassNeeds) ? 0 : muscleMassNeeds,
        },
        {
          label: "Bone Density Needs",
          value: isNaN(boneDensityNeeds) ? 0 : boneDensityNeeds,
        },
        {
          label: "Metabolic Age",
          value: isNaN(metabolicAge) ? 0 : metabolicAge,
        },
        {
          label: "Visceral Fat Needs",
          value: isNaN(visceralFatNeeds) ? 0 : visceralFatNeeds,
        },
        {
          label: "Body Water Needs",
          value: isNaN(bodyWaterNeeds) ? 0 : bodyWaterNeeds,
        },
      ]);
    } else {
      setError("Please fill out all required fields with valid values.");
    }
  };

  const generateHealthUpdate = async () => {
    setGeneratingAnswer(true);
    setAnswer("Loading your health update...");

    // Construct the health index values from the results to include in the prompt
    const bmiValue = results.find((result) => result.label === "BMI")?.value;
    const bodyFatPercentage = results.find(
      (result) => result.label === "Body Fat Percentage"
    )?.value;
    const caloricNeeds = results.find(
      (result) => result.label === "Daily Caloric Needs"
    )?.value;
    const idealWeight = results.find(
      (result) => result.label === "Ideal Weight"
    )?.value;
    const waterIntake = results.find(
      (result) => result.label === "Daily Water Intake (L)"
    )?.value;
    const proteinNeeds = results.find(
      (result) => result.label === "Protein Needs"
    )?.value;
    const carbNeeds = results.find(
      (result) => result.label === "Carbohydrate Needs"
    )?.value;
    const fatNeeds = results.find(
      (result) => result.label === "Fat Needs"
    )?.value;
    const metabolicAge = results.find(
      (result) => result.label === "Metabolic Age"
    )?.value;

    // Construct the prompt with the calculated health index values
    const question = `Answer in one single long paragraph of 500 words.Give me health updates and suggestions based on the following values: 
    My BMI is ${bmiValue}, my body fat percentage is ${bodyFatPercentage}%, 
    my daily caloric needs are ${caloricNeeds} calories, my ideal weight is ${idealWeight} kg, 
    I need to drink ${waterIntake} liters of water daily, my protein needs are ${proteinNeeds} grams, 
    my carbohydrate needs are ${carbNeeds} grams, my fat needs are ${fatNeeds} grams, and my metabolic age is ${metabolicAge}. 
    Please provide advice on how to improve my overall health based on these values.`;

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${YOUR_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      // Set the answer generated by the API
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  };
  const formatAiResponse = (response) => {
    return response.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return <h4 key={index}>{line.replace("## ", "")}</h4>;
      } else if (line.startsWith("**")) {
        return <strong key={index}>{line.replace(/\*\*/g, "")}</strong>;
      } else if (line.startsWith("* ")) {
        return <li key={index}>{line.replace("* ", "")}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="video-container">
          <video src={banner} autoPlay loop muted></video>
        </div>
        <Container className="mt-32">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="weight">Weight</Label>
                  <Input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight"
                  />
                  <Input
                    type="select"
                    id="weightUnit"
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="height">Height</Label>
                  {heightUnit === "cm" ? (
                    <Input
                      type="number"
                      id="heightCm"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="Enter your height in cm"
                    />
                  ) : (
                    <>
                      <Input
                        type="number"
                        id="heightFeet"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="Feet"
                      />
                      <Input
                        type="number"
                        id="heightInches"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        placeholder="Inches"
                      />
                    </>
                  )}
                  <Input
                    type="select"
                    id="heightUnit"
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="ft">ft/in</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="gender">Gender</Label>
                  <Input
                    type="select"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="waist">Waist</Label>
                  <Input
                    type="number"
                    id="waist"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    placeholder="Enter your waist measurement"
                  />
                  <Input
                    type="select"
                    id="waistUnit"
                    value={waistUnit}
                    onChange={(e) => setWaistUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="hip">Hip</Label>
                  <Input
                    type="number"
                    id="hip"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    placeholder="Enter your hip measurement"
                  />
                  <Input
                    type="select"
                    id="hipUnit"
                    value={hipUnit}
                    onChange={(e) => setHipUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="activityLevel">Activity Level</Label>
                  <Input
                    type="select"
                    id="activityLevel"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                  >
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">
                      Sedentary (little to no exercise)
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
                      Extra active (very hard exercise/sports & physical job)
                    </option>
                  </Input>
                </FormGroup>

                {error && <Alert color="danger">{error}</Alert>}

                <Button type="submit" color="primary" block>
                  Calculate
                </Button>
              </Form>

              {results.length > 0 && (
                <div className="results mt-4">
                  <h4>Results</h4>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      margin: "20px 0",
                      fontSize: "18px",
                      textAlign: "left",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#3d5a80", color: "#fff" }}>
                        <th
                          style={{
                            border: "1px solid #3d5a80",
                            padding: "12px",
                          }}
                        >
                          Metric
                        </th>
                        <th
                          style={{
                            border: "1px solid #3d5a80",
                            padding: "12px",
                          }}
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#edf2f8" : "#cfe0e8",
                            color: "#000",
                          }}
                        >
                          <td
                            style={{
                              border: "1px solid #3d5a80",
                              padding: "12px",
                            }}
                          >
                            {result.label}
                          </td>
                          <td
                            style={{
                              border: "1px solid #3d5a80",
                              padding: "12px",
                            }}
                          >
                            {result.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    color="success"
                    onClick={handleUpdateUserHealth}
                    style={{
                      backgroundColor: "#28a745",
                      borderColor: "#28a745",
                      fontSize: "18px",
                      padding: "12px 24px",
                      marginTop: "20px",
                    }}
                  >
                    Update Health Profile
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            color="primary"
            onClick={generateHealthUpdate}
            disabled={generatingAnswer}
            className="mt-3"
            style={{
              backgroundColor: "#3d5a80", // Navy blue color
              borderColor: "#3d5a80",
              fontSize: "18px", // Make the button a bit bigger
              padding: "12px 24px", // Adjust padding to make it bigger
              marginBottom: "10px",
            }}
          >
            Give Me Suggestion
          </Button>
          {generatingAnswer && <p>Loading...</p>}
          {answer && (
            <div
              className="answer-card"
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#f8f9fa",
              }}
            >
              {formatAiResponse(answer)}
              <TextToSpeechButton text={answer} />
            </div>
          )}
        </div>
      </Base>
    </div>
  );
};

export default HealthCalculator;
