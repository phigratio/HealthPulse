import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import Base from "../components/Base";
import { signUp, addUserInfo } from "../service/user-service";
import { toast } from "react-toastify";
import Background from "../components/basicComponents/Background";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    role: "502", // Default role set to User
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  useEffect(() => {
    document.title = "Signup";
  }, [data]);

  const handleChange = (e, property) => {
    setData({
      ...data,
      [property]: e.target.value,
    });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      role: "502", // Reset role to default User
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (error.isError) {
      toast.error("Please fill the form correctly !!!");
      setError({
        error: {},
        isError: false,
      });
    }

    console.log(data);

    signUp(data, data.role) // Pass role as a separate parameter
      .then((resp) => {
        console.log(resp);
        console.log("User Registered Successfully");
        toast.success(
          "User Registered Successfully with user id: " + resp.id + " !!!"
        );
        resetData();

        // Redirect to login page after successful registration

        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
        console.log("User Registration Failed");

        setError({
          error: err,
          isError: true,
        });
      });
  };

  // const submitForm = (e) => {
  //   e.preventDefault();

  //   if (error.isError) {
  //     toast.error("Please fill the form correctly !!!");
  //     setError({
  //       error: {},
  //       isError: false,
  //     });
  //     return; // Exit early if there is an error
  //   }

  //   console.log(data);

  //   signUp(data, data.role)
  //     .then((resp) => {
  //       console.log(resp);
  //       console.log("User Registered Successfully");
  //       toast.success(
  //         "User Registered Successfully with user id: " + resp.id + " !!!"
  //       );

  //       // Add user info after successful registration
  //       addUserInfo({}, resp.id)
  //         .then(() => {
  //           console.log("User Info added successfully");
  //           toast.success("User Info added successfully!");
  //           // Reset data after successfully adding user info
  //           resetData();
  //           // Redirect to login page after successful registration
  //           window.location.href = "/login";
  //         })
  //         .catch((addUserInfoError) => {
  //           console.error("Failed to add user info", addUserInfoError);
  //           toast.error("Failed to add user info. Please try again.");
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("User Registration Failed");

  //       setError({
  //         error: err,
  //         isError: true,
  //       });
  //       toast.error("User Registration Failed. Please try again.");
  //     });
  // };

  return (
    <div>
      <Background />
      <Base>
        <Container style={{ marginTop: "10vh" }}>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader style={{ textAlign: "center" }}>
                  <h3>Fill Information to Register</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    <FormGroup>
                      <Label>Name: </Label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        onChange={(e) => handleChange(e, "name")}
                        value={data.name}
                        invalid={
                          error.error?.response?.data?.name ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.error?.response?.data?.name}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label>Email: </Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={
                          error.error?.response?.data?.email ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.error?.response?.data?.email}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label>Password: </Label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                        invalid={
                          error.error?.response?.data?.password ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.error?.response?.data?.password}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label>About:</Label>
                      <Input
                        type="textarea"
                        placeholder="Write about yourself"
                        style={{ height: "15vh" }}
                        id="about"
                        onChange={(e) => handleChange(e, "about")}
                        value={data.about}
                        invalid={
                          error.error?.response?.data?.about ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.error?.response?.data?.about}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="role">Role:</Label>
                      <Input
                        type="select"
                        id="role"
                        onChange={(e) => handleChange(e, "role")}
                        value={data.role}
                      >
                        <option value="501">Admin</option>
                        <option value="502">User</option>
                        <option value="503">Doctor</option>
                      </Input>
                    </FormGroup>

                    <Container className="text-center">
                      <Button className=" button small-button me-2">
                        Register
                      </Button>
                      <Button
                        type="button"
                        className=" button small-button reset-button ms-2"
                        onClick={resetData}
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default Signup;
