import Base from "../components/Base";
import { useEffect, useState } from "react";

import React from "react";
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
} from "reactstrap";
import { LogIn } from "../services/user-service";

const Login = () => {
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({ ...loginDetail, [field]: actualValue });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    //Validation
    if (loginDetail.username.trim() == "") {
      toast.error("Please enter username (Email) !!!");
      return;
    }
    if (loginDetail.password.trim() == "") {
      toast.error("Please enter password !!!");
      return;
    }

    //submit the data to the server to generate the token

    LogIn(loginDetail)
      .then((jwtTokenData) => {
        console.log("User token :");
        console.log(jwtTokenData);
      })
      .catch((error) => {
        console.log(error);
        if (error.status == 400 || error.status == 401) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error occured while login -> Generating token !!!");
        }
      });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }} style={{ paddingTop: "80px" }}>
            <Card color="dark" outline>
              <CardHeader className="text-center">
                <h3> Fill Information to Login !!! </h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Username field */}

                  <FormGroup>
                    <Label for="email">Username (Email) </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter username (Email)"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                    {""}
                  </FormGroup>

                  {/* Password field */}

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                    {""}
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="dark">Log In</Button>
                    <Button
                      onClick={handleReset}
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

export default Login;
