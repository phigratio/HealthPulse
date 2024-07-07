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

  useEffect(() => {
    if (isLoggedIn()) {
      const userDetails = getCurrentUserDetail();
      setCurrentUser(userDetails);
      getUser(userDetails.id)
        .then((data) => {
          console.log(data);
          setUser(data);
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

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(imageFile);
  };

  const updateUser = (event) => {
    event.preventDefault();
    console.log(user);
    user.password = "a_dummy_password";
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
