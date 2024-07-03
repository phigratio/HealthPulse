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
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../service/user-service";
import { doLogin } from "../auth";
import Background from "../components/Background"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;

    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Please fill all the fields !!!");
      return;
    }

    //submit the form to the server using axios locatedd in src/service/user-service.js


    login(loginDetail).then((data) => {


      //save the token to the local storage
      doLogin(data, () => {
        console.log("Token saved to local storage");

        //redirect to the user home page
        navigate("/user/dashboard");

      });
      
      toast.success("Token received successfully  !!!"); 
      console.log(data);
      
    }
    ).catch((error) => {
      console.log(error);
      if(error.response.status === 400  || error.response.status === 404){
        toast.error(error.response.data.message);
      }else{
        toast.error("Something went wrong !!!");
      }

    });




  };

  return (
    <div>
      <Background /> 
      <Base>
        <Container style={{ marginTop: "10vh" }}>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader style={{ textAlign: "center" }}>
                  <h3>Fill Information to Log In</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                      <Label>Email: </Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={loginDetail.username}
                        onChange={(e) => handleChange(e, "username")}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Password: </Label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        value={loginDetail.password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </FormGroup>

                    <Container className="text-center">
                      <Button className=" button small-button me-2">
                        Log In
                      </Button>
                      <Button
                        onClick={handleReset}
                        className=" button small-button reset-button ms-2"
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

export default Login;
