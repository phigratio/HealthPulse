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
import {
  approveDoctor,
  rejectDoctor,
  getUserInfo,
} from "../service/user-service";
import { toast } from "react-toastify";

const ViewUserProfile = ({ user, updateProfileClick }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());

    // Fetch user info when the component mounts
    if (user && user.id) {
      getUserInfo(user.id)
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          toast.error("Failed to fetch user info!");
          console.error(error);
        });
    }
  }, [user]);

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
      className="mt-24 border-0 rounded-4"
      style={{
        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <CardBody>
        <h3 className="text-uppercase text-center mt-24">User Information</h3>

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

        {canUpdateProfile() && (
          <CardFooter className="text-center">
            <Button color="primary" tag={ReactLink} to={"/user/update-user"}>
              Update Basic Profile
            </Button>
          </CardFooter>
        )}

        {isDoctor && user.doctorInfo && (
          <>
            <h3>
              <br />
            </h3>
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
                          user.doctorInfo.certificateOfRegistration
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
                          user.doctorInfo.cv
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
            {isDoctor && canUpdateProfile() && (
              <CardFooter className="text-center">
                <Button
                  color="primary"
                  tag={ReactLink}
                  to={"/update-doctor-info/" + user.id}
                >
                  Update Doctor Info
                </Button>
              </CardFooter>
            )}
          </>
        )}

        {canViewPersonalInfo() && currentUser.id === user.id && (
          <>
            <h3>
              <br />
            </h3>
            <h3 className="text-center">Personal Info</h3>
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
                  <td>Phone No</td>
                  <td>{userInfo ? userInfo.phoneNumber : "N/A"}</td>
                </tr>

                <tr>
                  <td>District</td>
                  <td>{userInfo ? userInfo.district : "N/A"}</td>
                </tr>

                <tr>
                  <td>Full Address</td>
                  <td>{userInfo ? userInfo.address : "N/A"}</td>
                </tr>

                <tr>
                  <td>Age</td>
                  <td>{userInfo ? userInfo.age : "N/A"}</td>
                </tr>
                <tr>
                  <td>Blood Group</td>
                  <td>{userInfo ? userInfo.bloodGroup : "N/A"}</td>
                </tr>

                <tr>
                  <td>Ready to Donate Blood</td>
                  <td>{userInfo ? userInfo.readyToDonateBlood : "N/A"}</td>
                </tr>

                <tr>
                  <td>Gender</td>
                  <td>{userInfo ? userInfo.gender : "N/A"}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{userInfo ? userInfo.weight : "N/A"}</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>{userInfo ? userInfo.height : "N/A"}</td>
                </tr>
                <tr>
                  <td>Waist Size</td>
                  <td>{userInfo ? userInfo.waist : "N/A"}</td>
                </tr>
                <tr>
                  <td>Hip Size</td>
                  <td>{userInfo ? userInfo.hip : "N/A"}</td>
                </tr>
                <tr>
                  <td>BMI</td>
                  <td>{userInfo ? userInfo.bmi : "N/A"}</td>
                </tr>
                <tr>
                  <td>Body Fat Percentage</td>
                  <td>{userInfo ? userInfo.bodyFatPercentage : "N/A"}</td>
                </tr>
                <tr>
                  <td>Body Water</td>
                  <td>{userInfo ? userInfo.bodyWater : "N/A"}</td>
                </tr>
                <tr>
                  <td>Body Water Needs</td>
                  <td>{userInfo ? userInfo.bodyWaterNeeds : "N/A"}</td>
                </tr>
                <tr>
                  <td>Muscle Mass</td>
                  <td>{userInfo ? userInfo.muscleMass : "N/A"}</td>
                </tr>
                <tr>
                  <td>Muscle Mass Needs</td>
                  <td>{userInfo ? userInfo.muscleMassNeeds : "N/A"}</td>
                </tr>
                <tr>
                  <td>Bone Density</td>
                  <td>{userInfo ? userInfo.boneDensity : "N/A"}</td>
                </tr>
                <tr>
                  <td>Bone Density Needs</td>
                  <td>{userInfo ? userInfo.boneDensityNeeds : "N/A"}</td>
                </tr>
                <tr>
                  <td>Metabolic Age</td>
                  <td>{userInfo ? userInfo.metabolicAge : "N/A"}</td>
                </tr>
                <tr>
                  <td>Metabolic Age Needs</td>
                  <td>{userInfo ? userInfo.metabolicAgeNeeds : "N/A"}</td>
                </tr>
                <tr>
                  <td>Visceral Fat</td>
                  <td>{userInfo ? userInfo.visceralFat : "N/A"}</td>
                </tr>
                <tr>
                  <td>Visceral Fat Needs</td>
                  <td>{userInfo ? userInfo.visceralFatNeeds : "N/A"}</td>
                </tr>
                <tr>
                  <td>Genetic Disease</td>
                  <td>{userInfo ? userInfo.geneticDisease : "N/A"}</td>
                </tr>
                <tr>
                  <td>Chronic Disease</td>
                  <td>{userInfo ? userInfo.chronicDisease : "N/A"}</td>
                </tr>
                <tr>
                  <td>Allergies</td>
                  <td>{userInfo ? userInfo.allergies : "N/A"}</td>
                </tr>
              </tbody>
            </Table>
            {canUpdateProfile() && (
              <CardFooter className="text-center">
                <Button
                  color="primary"
                  tag={ReactLink}
                  to={"/user/update-personal-info"}
                >
                  Update Personal Info
                </Button>
              </CardFooter>
            )}
          </>
        )}

        {canApproveDoctor() && (
          <CardFooter className="text-center">
            <Button color="success" onClick={handleApproveDoctor}>
              Approve Doctor
            </Button>
            <Button
              color="danger"
              onClick={handleRejectDoctor}
              className="ml-2"
            >
              Reject Doctor
            </Button>
          </CardFooter>
        )}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
