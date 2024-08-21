import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import { BASE_URL } from "../service/helper";
import { Link as ReactLink } from "react-router-dom";
import empty from "../images/basic/empty.png";
import { approveDoctor, rejectDoctor } from "../service/user-service";
import { toast } from "react-toastify";

const ViewUserProfile = ({ user, updateProfileClick }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  const hasRole = (roles, roleId) => {
    return roles.some((role) => role.id === roleId);
  };

  const canUpdateProfile = () => {
    if (!currentUser) {
      return false;
    }
    return currentUser.id === user.id;
  };

  const canViewPersonalInfo = () => {
    if (!currentUser) {
      return false;
    }
    return currentUser.id === user.id || hasRole(currentUser.roles, 503);
  };

  const canApproveDoctor = () => {
    if (!currentUser) {
      return false;
    }
    return hasRole(currentUser.roles, 501);
  };

  const isDoctor = hasRole(user.roles, 503);

  const handleApproveDoctor = () => {
    approveDoctor(user.id)
      .then((response) => {
        toast.success("Doctor approved successfully!");
        // Optionally, refresh or update the user info here
      })
      .catch((error) => {
        toast.error("Failed to approve the doctor!");
      });
  };

  const handleRejectDoctor = () => {
    rejectDoctor(user.id)
      .then((response) => {
        toast.success("Doctor rejected successfully!");
        // Optionally, refresh or update the user info here
      })
      .catch((error) => {
        toast.error("Failed to reject the doctor!");
      });
  };

  return (
    <Card
      className="mt-32 border-0 rounded-4"
      style={{
        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <CardBody>
        <h3 className="text-uppercase text-center">User Information</h3>

        <Container className="text-center">
          <img
            style={{ maxWidth: "250px", maxHeight: "250px" }}
            src={
              user.imageName
                ? BASE_URL + "/users/user/image/" + user.imageName
                : "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
            }
            alt="user profile picture"
            className="img-fluid rounded-circle d-block mx-auto"
          />
        </Container>
        <Table
          responsive
          striped
          hover
          bordered={true}
          className="text-center mt-5"
          style={{ width: "100%" }}
        >
          <tbody>
            <tr>
              <td>LCWDBlLOGS ID</td>
              <td>LCWD{user.id}</td>
            </tr>
            <tr>
              <td>USER NAME</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>USER EMAIL</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>ABOUT</td>
              <td>{user.about}</td>
            </tr>
            <tr>
              <td>ROLE</td>
              <td>
                {user.roles.map((role) => {
                  return <div key={role.id}>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>

        {isDoctor && user.doctorInfo && (
          <>
            <h3 className="text-center">Doctor Info</h3>
            <Table
              responsive
              striped
              hover
              bordered={true}
              className="text-center mt-5"
              style={{ width: "100%" }}
            >
              <tbody>
                <tr>
                  <td>Specialization</td>
                  <td>{user.doctorInfo.specialization}</td>
                </tr>
                <tr>
                  <td>Degrees</td>
                  <td>{user.doctorInfo.degrees}</td>
                </tr>
                <tr>
                  <td>Certificates</td>
                  <td>{user.doctorInfo.certificates}</td>
                </tr>
                <tr>
                  <td>Experience</td>
                  <td>{user.doctorInfo.experience}</td>
                </tr>
                <tr>
                  <td>Approved By Admin</td>
                  <td>{user.doctorInfo.approvedByAdmin}</td>
                </tr>

                <tr>
                  <td>Doctor Certificate:</td>
                  <td>
                    <Container className="text-center">
                      <img
                        style={{ maxWidth: "250px", maxHeight: "250px" }}
                        src={
                          user.imageName
                            ? BASE_URL +
                              "/users/user/image/" +
                              user.doctorInfo.certificateOfRegistration
                            : empty
                        }
                        alt="Doctor Certificate"
                        className="img-fluid d-block mx-auto text-center"
                      />
                    </Container>
                  </td>
                </tr>

                <tr>
                  <td>Doctor CV:</td>
                  <td>
                    <Container className="text-center">
                      <img
                        style={{ maxWidth: "250px", maxHeight: "250px" }}
                        src={
                          user.imageName
                            ? BASE_URL +
                              "/users/user/image/" +
                              user.doctorInfo.cv
                            : empty
                        }
                        alt="Doctor CV"
                        className="img-fluid d-block mx-auto text-center"
                      />
                    </Container>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {canViewPersonalInfo() && currentUser.id === user.id && (
          <>
            <h3 className="text-center">Person Info</h3>
            <Table
              responsive
              striped
              hover
              bordered={true}
              className="text-center mt-5"
              style={{ width: "100%" }}
            >
              <tbody>
                <tr>
                  <td>Age</td>
                  <td>{user.age === 0 ? "N/A" : user.age}</td>
                </tr>
                <tr>
                  <td>Blood Group</td>
                  <td>{user.bloodGroup ? user.bloodGroup : "N/A"}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{user.gender === 0 ? "N/A" : user.gender}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{user.weight === 0 ? "N/A" : user.weight}</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>{user.height === 0 ? "N/A" : user.height}</td>
                </tr>
                <tr>
                  <td>Waist Size</td>
                  <td>{user.waist === 0 ? "N/A" : user.waist}</td>
                </tr>
                <tr>
                  <td>Hip Size</td>
                  <td>{user.hip === 0 ? "N/A" : user.hip}</td>
                </tr>
                <tr>
                  <td>BMI</td>
                  <td>{user.bmi === 0 ? "N/A" : user.bmi}</td>
                </tr>
                <tr>
                  <td>Body Fat Percentage</td>
                  <td>
                    {user.bodyFatPercentage === 0
                      ? "N/A"
                      : user.bodyFatPercentage}
                  </td>
                </tr>
                <tr>
                  <td>Body Water</td>
                  <td>{user.bodyWater === 0 ? "N/A" : user.bodyWater}</td>
                </tr>
                <tr>
                  <td>Body Water Needs</td>
                  <td>
                    {user.bodyWaterNeeds === 0 ? "N/A" : user.bodyWaterNeeds}
                  </td>
                </tr>
                <tr>
                  <td>Bone Density</td>
                  <td>{user.boneDensity === 0 ? "N/A" : user.boneDensity}</td>
                </tr>
                <tr>
                  <td>Bone Density Needs</td>
                  <td>
                    {user.boneDensityNeeds === 0
                      ? "N/A"
                      : user.boneDensityNeeds}
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {canUpdateProfile() && (
          <Container className="text-center">
            <Button onClick={updateProfileClick} color="success" size="lg">
              Update Profile
            </Button>
          </Container>
        )}

        {canApproveDoctor() && isDoctor && (
          <Container className="text-center">
            <Button
              onClick={handleApproveDoctor}
              color="primary"
              size="lg"
              className="me-2"
            >
              Approve Doctor
            </Button>
            <Button
              onClick={handleRejectDoctor}
              color="danger"
              size="lg"
              className="ms-2"
            >
              Reject Doctor
            </Button>
          </Container>
        )}
      </CardBody>
      <CardFooter className="text-center">
        <Button
          onClick={() => window.history.back()}
          color="secondary"
          size="lg"
        >
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewUserProfile;
