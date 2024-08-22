import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/Base"; // Import Base component
import Background from "../components/basicComponents/Background";
import userContext from "../context/userContext";
import { getUser, updateDoctorInfo } from "../service/user-service";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";

const UpdateDoctorInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState({});
  const [formData, setFormData] = useState(new FormData());
  const object = useContext(userContext);

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((data) => {
          if (data.roles[0].id === 503) {
            setDoctorInfo(data.doctorInfo);
          } else {
            toast.error("This user is not a doctor.");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in loading doctor data");
        });
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    setFormData((prevData) => {
      const newData = new FormData();
      prevData.forEach((value, key) => newData.append(key, value));
      newData.set(e.target.name, e.target.value);
      return newData;
    });
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => {
      const newData = new FormData();
      prevData.forEach((value, key) => newData.append(key, value));
      newData.append(e.target.name, e.target.files[0]);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      updateDoctorInfo(formData, userId)
        .then((response) => {
          console.log(response);
          toast.success("Doctor info updated successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error updating doctor info");
        });
    }
  };

  return (
    <div>
      <Background />
      <Base>
        <Container>
          <Card className="shadow-sm border-0 mt-2">
            <CardBody>
              <h3 className="text-center">Update Doctor Info</h3>
              <Form onSubmit={handleSubmit}>
                <div className="my-3">
                  <Label for="specialization">Specialization</Label>
                  <Input
                    type="text"
                    id="specialization"
                    name="specialization"
                    defaultValue={doctorInfo.specialization}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-3">
                  <Label for="degrees">Degrees</Label>
                  <Input
                    type="text"
                    id="degrees"
                    name="degrees"
                    defaultValue={doctorInfo.degrees}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-3">
                  <Label for="certificates">Certificates</Label>
                  <Input
                    type="text"
                    id="certificates"
                    name="certificates"
                    defaultValue={doctorInfo.certificates}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-3">
                  <Label for="cv">CV</Label>
                  <Input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="my-3">
                  <Label for="certificateOfRegistration">
                    Certificate of Registration
                  </Label>
                  <Input
                    type="file"
                    id="certificateOfRegistration"
                    name="certificateOfRegistration"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="my-3">
                  <Label for="experience">Experience</Label>
                  <Input
                    type="text"
                    id="experience"
                    name="experience"
                    defaultValue={doctorInfo.experience}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" color="primary">
                  Update
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Base>
    </div>
  );
};

export default UpdateDoctorInfoPage;
