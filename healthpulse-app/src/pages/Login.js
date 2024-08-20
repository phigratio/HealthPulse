// import React, { useState, useContext } from "react";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   Row,
//   Col,
// } from "reactstrap";
// import Base from "../components/Base";
// import { toast } from "react-toastify";
// import { login } from "../service/user-service";
// import { doLogin } from "../auth";
// import { useNavigate } from "react-router-dom";
// import userContext from "../context/userContext";
// import "../style/login.css"; // CSS file for custom styles
// import KitBoxL from "../components/LottieComponents/KitBox"; // Left Lottie Component
// import BacteriaL from "../components/LottieComponents/Bacteria"; // Right Lottie Component

// const Login = () => {
//   const userContxtData = useContext(userContext);
//   const navigate = useNavigate();

//   const [loginDetail, setLoginDetail] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (event, field) => {
//     let actualValue = event.target.value;
//     setLoginDetail({
//       ...loginDetail,
//       [field]: actualValue,
//     });
//   };

//   const handleReset = () => {
//     setLoginDetail({
//       username: "",
//       password: "",
//     });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     if (
//       loginDetail.username.trim() === "" ||
//       loginDetail.password.trim() === ""
//     ) {
//       toast.error("Please fill all the fields !!!");
//       return;
//     }

//     login(loginDetail)
//       .then((data) => {
//         doLogin(data, () => {
//           navigate("/user/dashboard");
//           userContxtData.setUser({
//             data: data.user,
//             login: true,
//           });
//         });
//         toast.success("Token received successfully  !!!");
//       })
//       .catch((error) => {
//         if (error.response.status === 400 || error.response.status === 404) {
//           toast.error(error.response.data.message);
//         } else {
//           toast.error("Something went wrong !!!");
//         }
//       });
//   };

//   return (
//     <div>
//       <Base>
//         <div className="main-container">
//           <div className="lottie-container left">
//             <KitBoxL />
//           </div>
//           <div className="login-container">
//             <Container>
//               <Row>
//                 <Col>
//                   <Card className="login-card">
//                     <CardHeader className="text-center login-card-header">
//                       <h3>Fill Information to Log In</h3>
//                     </CardHeader>
//                     <CardBody>
//                       <Form onSubmit={handleFormSubmit}>
//                         <FormGroup>
//                           <Label>Email: </Label>
//                           <Input
//                             type="username"
//                             placeholder="Enter your email"
//                             id="username"
//                             value={loginDetail.username}
//                             onChange={(e) => handleChange(e, "username")}
//                           />
//                         </FormGroup>

//                         <FormGroup>
//                           <Label>Password: </Label>
//                           <Input
//                             type="password"
//                             placeholder="Enter your password"
//                             id="password"
//                             value={loginDetail.password}
//                             onChange={(e) => handleChange(e, "password")}
//                           />
//                         </FormGroup>

//                         <Container className="text-center">
//                           <Button
//                             className="login-button small-button me-2"
//                             type="submit"
//                           >
//                             Log In
//                           </Button>
//                           <Button
//                             onClick={handleReset}
//                             className="reset-button small-button ms-2"
//                             type="button"
//                           >
//                             Reset
//                           </Button>
//                         </Container>
//                       </Form>
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             </Container>
//           </div>
//           <div className="lottie-container right">
//             <BacteriaL />
//           </div>
//         </div>
//       </Base>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import {
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
import { toast } from "react-toastify";
import { login } from "../service/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import "../style/login.css"; // CSS file for custom styles
import KitBoxL from "../components/LottieComponents/KitBox"; // Left Lottie Component
import BacteriaL from "../components/LottieComponents/Bacteria"; // Right Lottie Component

const Login = () => {
  const userContxtData = useContext(userContext);
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    setLoginDetail({
      ...loginDetail,
      [field]: event.target.value,
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
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Please fill all the fields !!!");
      return;
    }

    login(loginDetail)
      .then((data) => {
        doLogin(data, () => {
          navigate("/user/dashboard");
          userContxtData.setUser({
            data: data.user,
            login: true,
          });
        });
        toast.success("Token received successfully  !!!");
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong !!!");
        }
      });
  };

  return (
    <div>
      <Base>
        <div className="main-container">
          <div className="lottie-container left">
            <KitBoxL />
          </div>
          <div className="form-container">
            <Container>
              <Row>
                <Col>
                  <h3 className="text-center">Fill Information to Log In</h3>
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                      <Label>Email: </Label>
                      <Input
                        type="username"
                        placeholder="Enter your email"
                        id="username"
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
                      <Button
                        className="login-button small-button me-2"
                        type="submit"
                      >
                        Log In
                      </Button>
                      <Button
                        onClick={handleReset}
                        className="reset-button small-button ms-2"
                        type="button"
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="lottie-container right">
            <BacteriaL />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Login;
