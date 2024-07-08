import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/Base";
import userContext from "../context/userContext";
import {
  getUser,
  updateProfile,
  uploadProfileImage,
} from "../service/user-service";
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

const UpdateUser = () => {
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State to hold profile image file
  const [doctorInfo, setDoctorInfo] = useState({
    specialization: "",
    degrees: "",
    certificates: "",
    experience: "",
    approvedByAdmin: false, // Assuming approvedByAdmin is a boolean
  });

  useEffect(() => {
    if (isLoggedIn()) {
      const userDetails = getCurrentUserDetail();
      setCurrentUser(userDetails);
      getUser(userDetails.id)
        .then((data) => {
          setUser(data);
          if (data.roles[0].id === 503) {
            setDoctorInfo(data.doctorInfo);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in loading user data");
        });
    } else {
      toast.error("You need to log in first!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && currentUser) {
      if (user.id !== currentUser.id) {
        toast.error("This is not your profile!");
        navigate("/");
      }
    }
  }, [user, currentUser, navigate]);

  const handleChange = (event, fieldName) => {
    setUser({
      ...user,
      [fieldName]: event.target.value,
    });
  };

  const handleDoctorChange = (event, fieldName) => {
    setDoctorInfo({
      ...doctorInfo,
      [fieldName]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(imageFile);
  };

  const updateUser = (event) => {
    event.preventDefault();
    console.log(user);
    user.password = "a_dummy_password";
    if (doctorInfo) {
      user.doctorInfo = doctorInfo;
    }
    updateProfile(user, user.id)
      .then((res) => {
        console.log(res);
        toast.success("User profile updated");
        if (profileImage) {
          // Upload profile image if selected
          uploadProfileImage(profileImage, user.id)
            .then((imageRes) => {
              console.log(imageRes);
              toast.success("Profile image updated");
            })
            .catch((imageError) => {
              console.log(imageError);
              toast.error("Error updating profile image");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating user profile");
      });
  };

  const updateHtml = () => (
    <div className="wrapper mt-32">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          <h3>Update Profile</h3>
          <Form onSubmit={updateUser}>
            <div className="my-3">
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter here"
                className="rounded-0"
                name="name"
                value={user.name}
                onChange={(event) => handleChange(event, "name")}
              />
            </div>

            <div className="mt-3">
              <Label for="image">Select Profile Image</Label>
              <Input type="file" id="image" onChange={handleImageChange} />
            </div>

            <div className="my-3">
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter here"
                className="rounded-0"
                name="email"
                value={user.email}
                onChange={(event) => handleChange(event, "email")}
              />
            </div>
            <div className="my-3">
              <Label for="about">About</Label>
              <Input
                type="textarea"
                id="about"
                placeholder="Enter here"
                className="rounded-0"
                name="about"
                value={user.about}
                onChange={(event) => handleChange(event, "about")}
              />
            </div>
            <div className="my-3">
              <Label for="age">Age</Label>
              <Input
                type="number"
                id="age"
                placeholder="Enter here"
                className="rounded-0"
                name="age"
                value={user.age}
                onChange={(event) => handleChange(event, "age")}
              />
            </div>
            <div className="my-3">
              <Label for="height">Height</Label>
              <Input
                type="text"
                id="height"
                placeholder="Enter here"
                className="rounded-0"
                name="height"
                value={user.height}
                onChange={(event) => handleChange(event, "height")}
              />
            </div>
            <div className="my-3">
              <Label for="weight">Weight</Label>
              <Input
                type="text"
                id="weight"
                placeholder="Enter here"
                className="rounded-0"
                name="weight"
                value={user.weight}
                onChange={(event) => handleChange(event, "weight")}
              />
            </div>
            <div className="my-3">
              <Label for="gender">Gender</Label>
              <Input
                type="text"
                id="gender"
                placeholder="Enter here"
                className="rounded-0"
                name="gender"
                value={user.gender}
                onChange={(event) => handleChange(event, "gender")}
              />
            </div>
            <div className="my-3">
              <Label for="bloodGroup">Blood Group</Label>
              <Input
                type="text"
                id="bloodGroup"
                placeholder="Enter here"
                className="rounded-0"
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={(event) => handleChange(event, "bloodGroup")}
              />
            </div>
            <div className="my-3">
              <Label for="waist">Waist</Label>
              <Input
                type="text"
                id="waist"
                placeholder="Enter here"
                className="rounded-0"
                name="waist"
                value={user.waist}
                onChange={(event) => handleChange(event, "waist")}
              />
            </div>
            <div className="my-3">
              <Label for="hip">Hip</Label>
              <Input
                type="text"
                id="hip"
                placeholder="Enter here"
                className="rounded-0"
                name="hip"
                value={user.hip}
                onChange={(event) => handleChange(event, "hip")}
              />
            </div>
            <div className="my-3">
              <Label for="bmi">BMI</Label>
              <Input
                type="text"
                id="bmi"
                placeholder="Enter here"
                className="rounded-0"
                name="bmi"
                value={user.bmi}
                onChange={(event) => handleChange(event, "bmi")}
              />
            </div>
            <div className="my-3">
              <Label for="bodyFatPercentage">Body Fat Percentage</Label>
              <Input
                type="text"
                id="bodyFatPercentage"
                placeholder="Enter here"
                className="rounded-0"
                name="bodyFatPercentage"
                value={user.bodyFatPercentage}
                onChange={(event) => handleChange(event, "bodyFatPercentage")}
              />
            </div>
            <div className="my-3">
              <Label for="waistToHipRatio">Waist to Hip Ratio</Label>
              <Input
                type="text"
                id="waistToHipRatio"
                placeholder="Enter here"
                className="rounded-0"
                name="waistToHipRatio"
                value={user.waistToHipRatio}
                onChange={(event) => handleChange(event, "waistToHipRatio")}
              />
            </div>
            <div className="my-3">
              <Label for="calorieNeeds">Caloric Needs</Label>
              <Input
                type="text"
                id="calorieNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="calorieNeeds"
                value={user.calorieNeeds}
                onChange={(event) => handleChange(event, "calorieNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="idealWeight">Ideal Weight</Label>
              <Input
                type="text"
                id="idealWeight"
                placeholder="Enter here"
                className="rounded-0"
                name="idealWeight"
                value={user.idealWeight}
                onChange={(event) => handleChange(event, "idealWeight")}
              />
            </div>
            <div className="my-3">
              <Label for="waterIntake">Water Intake</Label>
              <Input
                type="text"
                id="waterIntake"
                placeholder="Enter here"
                className="rounded-0"
                name="waterIntake"
                value={user.waterIntake}
                onChange={(event) => handleChange(event, "waterIntake")}
              />
            </div>
            <div className="my-3">
              <Label for="bsa">BSA</Label>
              <Input
                type="text"
                id="bsa"
                placeholder="Enter here"
                className="rounded-0"
                name="bsa"
                value={user.bsa}
                onChange={(event) => handleChange(event, "bsa")}
              />
            </div>
            <div className="my-3">
              <Label for="proteinNeeds">Protein Needs</Label>
              <Input
                type="text"
                id="proteinNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="proteinNeeds"
                value={user.proteinNeeds}
                onChange={(event) => handleChange(event, "proteinNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="carbNeeds">Carb Needs</Label>
              <Input
                type="text"
                id="carbNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="carbNeeds"
                value={user.carbNeeds}
                onChange={(event) => handleChange(event, "carbNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="fatNeeds">Fat Needs</Label>
              <Input
                type="text"
                id="fatNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="fatNeeds"
                value={user.fatNeeds}
                onChange={(event) => handleChange(event, "fatNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="muscleMassNeeds">Muscle Mass Needs</Label>
              <Input
                type="text"
                id="muscleMassNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="muscleMassNeeds"
                value={user.muscleMassNeeds}
                onChange={(event) => handleChange(event, "muscleMassNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="boneDensityNeeds">Bone Density Needs</Label>
              <Input
                type="text"
                id="boneDensityNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="boneDensityNeeds"
                value={user.boneDensityNeeds}
                onChange={(event) => handleChange(event, "boneDensityNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="metabolicAgeNeeds">Metabolic Age Needs</Label>
              <Input
                type="text"
                id="metabolicAgeNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="metabolicAgeNeeds"
                value={user.metabolicAgeNeeds}
                onChange={(event) => handleChange(event, "metabolicAgeNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="visceralFatNeeds">Visceral Fat Needs</Label>
              <Input
                type="text"
                id="visceralFatNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="visceralFatNeeds"
                value={user.visceralFatNeeds}
                onChange={(event) => handleChange(event, "visceralFatNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="bodyWaterNeeds">Body Water Needs</Label>
              <Input
                type="text"
                id="bodyWaterNeeds"
                placeholder="Enter here"
                className="rounded-0"
                name="bodyWaterNeeds"
                value={user.bodyWaterNeeds}
                onChange={(event) => handleChange(event, "bodyWaterNeeds")}
              />
            </div>
            <div className="my-3">
              <Label for="muscleMass">Muscle Mass</Label>
              <Input
                type="text"
                id="muscleMass"
                placeholder="Enter here"
                className="rounded-0"
                name="muscleMass"
                value={user.muscleMass}
                onChange={(event) => handleChange(event, "muscleMass")}
              />
            </div>
            <div className="my-3">
              <Label for="boneDensity">Bone Density</Label>
              <Input
                type="text"
                id="boneDensity"
                placeholder="Enter here"
                className="rounded-0"
                name="boneDensity"
                value={user.boneDensity}
                onChange={(event) => handleChange(event, "boneDensity")}
              />
            </div>
            <div className="my-3">
              <Label for="metabolicAge">Metabolic Age</Label>
              <Input
                type="text"
                id="metabolicAge"
                placeholder="Enter here"
                className="rounded-0"
                name="metabolicAge"
                value={user.metabolicAge}
                onChange={(event) => handleChange(event, "metabolicAge")}
              />
            </div>
            <div className="my-3">
              <Label for="visceralFat">Visceral Fat</Label>
              <Input
                type="text"
                id="visceralFat"
                placeholder="Enter here"
                className="rounded-0"
                name="visceralFat"
                value={user.visceralFat}
                onChange={(event) => handleChange(event, "visceralFat")}
              />
            </div>
            <div className="my-3">
              <Label for="bodyWater">Body Water</Label>
              <Input
                type="text"
                id="bodyWater"
                placeholder="Enter here"
                className="rounded-0"
                name="bodyWater"
                value={user.bodyWater}
                onChange={(event) => handleChange(event, "bodyWater")}
              />
            </div>

            {currentUser.roles[0].id === 503 && doctorInfo && (
              <>
                <div className="my-3">
                  <Label for="specialization">Specialization</Label>
                  <Input
                    type="text"
                    id="specialization"
                    placeholder="Enter here"
                    className="rounded-0"
                    name="specialization"
                    value={doctorInfo.specialization}
                    onChange={(event) =>
                      handleDoctorChange(event, "specialization")
                    }
                  />
                </div>
                <div className="my-3">
                  <Label for="degrees">Degrees</Label>
                  <Input
                    type="text"
                    id="degrees"
                    placeholder="Enter here"
                    className="rounded-0"
                    name="degrees"
                    value={doctorInfo.degrees}
                    onChange={(event) => handleDoctorChange(event, "degrees")}
                  />
                </div>
                <div className="my-3">
                  <Label for="certificates">Certificates</Label>
                  <Input
                    type="text"
                    id="certificates"
                    placeholder="Enter here"
                    className="rounded-0"
                    name="certificates"
                    value={doctorInfo.certificates}
                    onChange={(event) =>
                      handleDoctorChange(event, "certificates")
                    }
                  />
                </div>
                <div className="my-3">
                  <Label for="experience">Experience</Label>
                  <Input
                    type="text"
                    id="experience"
                    placeholder="Enter here"
                    className="rounded-0"
                    name="experience"
                    value={doctorInfo.experience}
                    onChange={(event) =>
                      handleDoctorChange(event, "experience")
                    }
                  />
                </div>
              </>
            )}

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
      <Container>{user && updateHtml()}</Container>
    </Base>
  );
};

export default UpdateUser;
