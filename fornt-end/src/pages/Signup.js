import React, { useState, useEffect } from "react";
import { SignUp } from "../services/user-service";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
  Form,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import Base from "../components/Base";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Handle change
  const handleChange = (e, property) => {
    setData({ ...data, [property]: e.target.value });
  };

  // Reset data

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  // Submit form

  const submitForm = (e) => {
    e.preventDefault();

    // if (error.isError) {
    //   toast.error("Error occured while registering user !!!");
    //   setError({
    //     error: {},
    //     isError: false,
    //   });
    //   return;
    // }

    console.log(data);
    //data validate

    //call server api for sending data

    SignUp(data)
      .then((response) => {
        console.log(response);
        console.log("Data sent successfully");
        toast.success(
          "User is registered successfully !!! with user Id: " + response.id
        );
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Data not sent, Error occured !!!");
        toast.error("Error occured while registering user !!!");

        //handle error with proper way
        setError({
          error: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }} style={{ paddingTop: "80px" }}>
            <Card color="dark" outline>
              <CardHeader className="text-center">
                <h3> Fill Information to Register !!! </h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  {/* Name field */}

                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter Name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.error?.response?.data?.name ? true : false}
                    />

                    <FormFeedback>
                      {error.error?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter Email"
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

                  {/* Password field */}

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter Password"
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

                  {/* About field */}

                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      id="about"
                      placeholder="Type something about yourself"
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
                  <Container className="text-center">
                    <Button color="dark">Submit</Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      type="reset"
                      className="m-2"
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
  );
};

export default Signup;
