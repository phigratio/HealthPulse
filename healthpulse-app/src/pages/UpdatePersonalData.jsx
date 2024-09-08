import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/Base";
import { getUserInfo, updateUserInfo } from "../service/user-service";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";

const UpdatePersonalData = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    address: "",
    district: "",
    phoneNumber: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    bloodGroup: "",
    readyToDonateBlood: "",
    Waist: "",
    Hip: "",
    bmi: "",
    bodyFatPercentage: "",
    waistToHipRatio: "",
    calorieNeeds: "",
    idealWeight: "",
    waterIntake: "",
    bsa: "",
    proteinNeeds: "",
    carbNeeds: "",
    fatNeeds: "",
    muscleMassNeeds: "",
    boneDensityNeeds: "",
    metabolicAgeNeeds: "",
    visceralFatNeeds: "",
    bodyWaterNeeds: "",
    muscleMass: "",
    boneDensity: "",
    metabolicAge: "",
    visceralFat: "",
    bodyWater: "",
    geneticDisease: "",
    chronicDisease: "",
    allergies: "",
  });

  useEffect(() => {
    if (isLoggedIn()) {
      const userDetails = getCurrentUserDetail();
      getUserInfo(userDetails.id)
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error loading user information");
        });
    } else {
      toast.error("You need to log in first!");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (event, fieldName) => {
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const userDetails = getCurrentUserDetail();
    updateUserInfo(userInfo, userDetails.id)
      .then((res) => {
        toast.success("User information updated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating user information");
      });
  };

  const updateHtml = () => (
    <div className="wrapper mt-32">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          <h3>Update Personal Information</h3>
          <Form onSubmit={handleUpdateUser}>
            {/* <div>
              <Label for="district">District</Label>
              <Input
                type="text"
                id="district"
                placeholder="Enter your district"
                className="rounded-0"
                value={userInfo.district}
                onChange={(event) => handleChange(event, "district")}
              />
            </div> */}
            <div>
              <Label for="district">District</Label>
              <Input
                type="select"
                id="district"
                className="rounded-0"
                value={userInfo.district}
                onChange={(event) => handleChange(event, "district")}
              >
                <option value="">Select your district</option>
                <option value="Bagerhat">Bagerhat</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Barguna">Barguna</option>
                <option value="Barisal">Barisal</option>
                <option value="Bhola">Bhola</option>
                <option value="Bogra">Bogra</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Chandpur">Chandpur</option>
                <option value="Chapai Nawabganj">Chapai Nawabganj</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Chuadanga">Chuadanga</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Cumilla">Cumilla</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Dinajpur">Dinajpur</option>
                <option value="Faridpur">Faridpur</option>
                <option value="Feni">Feni</option>
                <option value="Gaibandha">Gaibandha</option>
                <option value="Gazipur">Gazipur</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Habiganj">Habiganj</option>
                <option value="Jamalpur">Jamalpur</option>
                <option value="Jashore">Jashore</option>
                <option value="Jhalokathi">Jhalokathi</option>
                <option value="Jhenaidah">Jhenaidah</option>
                <option value="Joypurhat">Joypurhat</option>
                <option value="Khagrachari">Khagrachari</option>
                <option value="Khulna">Khulna</option>
                <option value="Kishoreganj">Kishoreganj</option>
                <option value="Kurigram">Kurigram</option>
                <option value="Kushtia">Kushtia</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Lalmonirhat">Lalmonirhat</option>
                <option value="Madaripur">Madaripur</option>
                <option value="Magura">Magura</option>
                <option value="Manikganj">Manikganj</option>
                <option value="Meherpur">Meherpur</option>
                <option value="Moulvibazar">Moulvibazar</option>
                <option value="Munshiganj">Munshiganj</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Narail">Narail</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Natore">Natore</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Nilphamari">Nilphamari</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Pabna">Pabna</option>
                <option value="Panchagarh">Panchagarh</option>
                <option value="Patuakhali">Patuakhali</option>
                <option value="Pirojpur">Pirojpur</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Satkhira">Satkhira</option>
                <option value="Shariatpur">Shariatpur</option>
                <option value="Sherpur">Sherpur</option>
                <option value="Sirajganj">Sirajganj</option>
                <option value="Sunamganj">Sunamganj</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Tangail">Tangail</option>
                <option value="Thakurgaon">Thakurgaon</option>
              </Input>
            </div>

            <div>
              <Label for="address">Full Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Enter your address"
                className="rounded-0"
                value={userInfo.address}
                onChange={(event) => handleChange(event, "address")}
              />
            </div>

            <div>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="rounded-0"
                value={userInfo.phoneNumber}
                onChange={(event) => handleChange(event, "phoneNumber")}
              />
            </div>

            <div className="my-3">
              <Label for="age">Age</Label>
              <Input
                type="number"
                id="age"
                placeholder="Enter your age"
                className="rounded-0"
                value={userInfo.age}
                onChange={(event) => handleChange(event, "age")}
              />
            </div>
            <div className="my-3">
              <Label for="height">Height (cm)</Label>
              <Input
                type="number"
                id="height"
                placeholder="Enter your height"
                className="rounded-0"
                value={userInfo.height}
                onChange={(event) => handleChange(event, "height")}
              />
            </div>
            <div className="my-3">
              <Label for="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                placeholder="Enter your weight"
                className="rounded-0"
                value={userInfo.weight}
                onChange={(event) => handleChange(event, "weight")}
              />
            </div>

            {/* <div className="my-3">
              <Label for="gender">Gender</Label>
              <Input
                type="text"
                id="gender"
                placeholder="Enter your gender"
                className="rounded-0"
                value={userInfo.gender}
                onChange={(event) => handleChange(event, "gender")}
              />
            </div> */}

            <div className="my-3">
              <Label for="gender">Gender</Label>
              <Input
                type="select" // Changed from "text" to "select" to show dropdown
                id="gender"
                className="rounded-0"
                value={userInfo.gender}
                onChange={(event) => handleChange(event, "gender")}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
                <option value="ThridGender">Thrid Gender</option>
                <option value="">No option for others</option>
              </Input>
            </div>

            {/* <div className="my-3">
              <Label for="bloodGroup">Blood Group</Label>
              <Input
                type="text"
                id="bloodGroup"
                placeholder="Enter your blood group"
                className="rounded-0"
                value={userInfo.bloodGroup}
                onChange={(event) => handleChange(event, "bloodGroup")}
              />
            </div> */}

            <div className="my-3">
              <Label for="bloodGroup">Blood Group</Label>
              <Input
                type="select"
                id="bloodGroup"
                className="rounded-0"
                value={userInfo.bloodGroup}
                onChange={(event) => handleChange(event, "bloodGroup")}
              >
                <option value="">Select your blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Input>
            </div>

            <div>
              <Label for="readyToDonateBlood">Ready to Donate Blood</Label>
              <Input
                type="select"
                id="readyToDonateBlood"
                className="rounded-0"
                value={userInfo.readyToDonateBlood}
                onChange={(event) => handleChange(event, "readyToDonateBlood")}
              >
                <option value="">Select your option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </Input>
            </div>

            <div className="my-3">
              <Label for="Waist">Waist (cm)</Label>
              <Input
                type="number"
                id="Waist"
                placeholder="Enter your waist size"
                className="rounded-0"
                value={userInfo.Waist}
                onChange={(event) => handleChange(event, "Waist")}
              />
            </div>
            <div className="my-3">
              <Label for="Hip">Hip (cm)</Label>
              <Input
                type="number"
                id="Hip"
                placeholder="Enter your hip size"
                className="rounded-0"
                value={userInfo.Hip}
                onChange={(event) => handleChange(event, "Hip")}
              />
            </div>
            <div className="my-3">
              <Label for="bmi">BMI</Label>
              <Input
                type="number"
                id="bmi"
                placeholder="Enter your BMI"
                className="rounded-0"
                value={userInfo.bmi}
                onChange={(event) => handleChange(event, "bmi")}
              />
            </div>
            <div className="my-3">
              <Label for="bodyFatPercentage">Body Fat Percentage</Label>
              <Input
                type="number"
                id="bodyFatPercentage"
                placeholder="Enter your body fat percentage"
                className="rounded-0"
                value={userInfo.bodyFatPercentage}
                onChange={(event) => handleChange(event, "bodyFatPercentage")}
              />
            </div>
            <div className="my-3">
              <Label for="waistToHipRatio">Waist to Hip Ratio</Label>
              <Input
                type="number"
                id="waistToHipRatio"
                placeholder="Enter your waist to hip ratio"
                className="rounded-0"
                value={userInfo.waistToHipRatio}
                onChange={(event) => handleChange(event, "waistToHipRatio")}
              />
            </div>
            <div className="my-3">
              <Label for="calorieNeeds">Calorie Needs</Label>
              <Input
                type="number"
                id="calorieNeeds"
                placeholder="Enter your calorie needs"
                className="rounded-0"
                value={userInfo.calorieNeeds}
                onChange={(event) => handleChange(event, "calorieNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="idealWeight">Ideal Weight</Label>
              <Input
                type="number"
                id="idealWeight"
                placeholder="Enter your ideal weight"
                className="rounded-0"
                value={userInfo.idealWeight}
                onChange={(event) => handleChange(event, "idealWeight")}
              />
            </div>
            <div className="my-3">
              <Label for="waterIntake">Water Intake (L)</Label>
              <Input
                type="number"
                id="waterIntake"
                placeholder="Enter your water intake"
                className="rounded-0"
                value={userInfo.waterIntake}
                onChange={(event) => handleChange(event, "waterIntake")}
              />
            </div>
            <div className="my-3">
              <Label for="bsa">Body Surface Area</Label>
              <Input
                type="number"
                id="bsa"
                placeholder="Enter your body surface area"
                className="rounded-0"
                value={userInfo.bsa}
                onChange={(event) => handleChange(event, "bsa")}
              />
            </div>
            <div className="my-3">
              <Label for="proteinNeeds">Protein Needs</Label>
              <Input
                type="number"
                id="proteinNeeds"
                placeholder="Enter your protein needs"
                className="rounded-0"
                value={userInfo.proteinNeeds}
                onChange={(event) => handleChange(event, "proteinNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="carbNeeds">Carbohydrate Needs</Label>
              <Input
                type="number"
                id="carbNeeds"
                placeholder="Enter your carbohydrate needs"
                className="rounded-0"
                value={userInfo.carbNeeds}
                onChange={(event) => handleChange(event, "carbNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="fatNeeds">Fat Needs</Label>
              <Input
                type="number"
                id="fatNeeds"
                placeholder="Enter your fat needs"
                className="rounded-0"
                value={userInfo.fatNeeds}
                onChange={(event) => handleChange(event, "fatNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="muscleMassNeeds">Muscle Mass Needs</Label>
              <Input
                type="number"
                id="muscleMassNeeds"
                placeholder="Enter your muscle mass needs"
                className="rounded-0"
                value={userInfo.muscleMassNeeds}
                onChange={(event) => handleChange(event, "muscleMassNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="boneDensityNeeds">Bone Density Needs</Label>
              <Input
                type="number"
                id="boneDensityNeeds"
                placeholder="Enter your bone density needs"
                className="rounded-0"
                value={userInfo.boneDensityNeeds}
                onChange={(event) => handleChange(event, "boneDensityNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="metabolicAgeNeeds">Metabolic Age Needs</Label>
              <Input
                type="number"
                id="metabolicAgeNeeds"
                placeholder="Enter your metabolic age needs"
                className="rounded-0"
                value={userInfo.metabolicAgeNeeds}
                onChange={(event) => handleChange(event, "metabolicAgeNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="visceralFatNeeds">Visceral Fat Needs</Label>
              <Input
                type="number"
                id="visceralFatNeeds"
                placeholder="Enter your visceral fat needs"
                className="rounded-0"
                value={userInfo.visceralFatNeeds}
                onChange={(event) => handleChange(event, "visceralFatNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="bodyWaterNeeds">Body Water Needs</Label>
              <Input
                type="number"
                id="bodyWaterNeeds"
                placeholder="Enter your body water needs"
                className="rounded-0"
                value={userInfo.bodyWaterNeeds}
                onChange={(event) => handleChange(event, "bodyWaterNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="muscleMass">Muscle Mass</Label>
              <Input
                type="number"
                id="muscleMass"
                placeholder="Enter your muscle mass"
                className="rounded-0"
                value={userInfo.muscleMass}
                onChange={(event) => handleChange(event, "muscleMass")}
              />
            </div>
            <div className="my-3">
              <Label for="boneDensity">Bone Density</Label>
              <Input
                type="number"
                id="boneDensity"
                placeholder="Enter your bone density"
                className="rounded-0"
                value={userInfo.boneDensity}
                onChange={(event) => handleChange(event, "boneDensity")}
              />
            </div>
            <div className="my-3">
              <Label for="metabolicAge">Metabolic Age</Label>
              <Input
                type="number"
                id="metabolicAge"
                placeholder="Enter your metabolic age"
                className="rounded-0"
                value={userInfo.metabolicAge}
                onChange={(event) => handleChange(event, "metabolicAge")}
              />
            </div>
            <div className="my-3">
              <Label for="visceralFat">Visceral Fat</Label>
              <Input
                type="number"
                id="visceralFat"
                placeholder="Enter your visceral fat"
                className="rounded-0"
                value={userInfo.visceralFat}
                onChange={(event) => handleChange(event, "visceralFat")}
              />
            </div>
            <div className="my-3">
              <Label for="bodyWater">Body Water</Label>
              <Input
                type="number"
                id="bodyWater"
                placeholder="Enter your body water"
                className="rounded-0"
                value={userInfo.bodyWater}
                onChange={(event) => handleChange(event, "bodyWater")}
              />
            </div>
            <div className="my-3">
              <Label for="geneticDisease">Genetic Disease</Label>
              <Input
                type="text"
                id="geneticDisease"
                placeholder="Enter any genetic diseases"
                className="rounded-0"
                value={userInfo.geneticDisease}
                onChange={(event) => handleChange(event, "geneticDisease")}
              />
            </div>
            <div className="my-3">
              <Label for="chronicDisease">Chronic Disease</Label>
              <Input
                type="text"
                id="chronicDisease"
                placeholder="Enter any chronic diseases"
                className="rounded-0"
                value={userInfo.chronicDisease}
                onChange={(event) => handleChange(event, "chronicDisease")}
              />
            </div>
            <div className="my-3">
              <Label for="allergies">Allergies</Label>
              <Input
                type="text"
                id="allergies"
                placeholder="Enter any allergies"
                className="rounded-0"
                value={userInfo.allergies}
                onChange={(event) => handleChange(event, "allergies")}
              />
            </div>
            <Button type="submit" color="primary" className="rounded-0">
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <Base>
      <Container>{updateHtml()}</Container>
    </Base>
  );
};

export default UpdatePersonalData;
