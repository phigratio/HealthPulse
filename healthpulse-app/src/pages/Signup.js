// import React, { useEffect, useState } from "react";
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
//   FormFeedback,
// } from "reactstrap";
// import Base from "../components/Base";
<<<<<<< HEAD
// import { signUp, addUserInfo } from "../service/user-service";
=======
// import { signUp } from "../service/user-service";
>>>>>>> 6cb70320697f7403ba2e64ddcf1aac9f797b0f8c
// import { toast } from "react-toastify";
// import Background from "../components/basicComponents/Background";

// const Signup = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     about: "",
//     role: "502", // Default role set to User
//   });

//   const [error, setError] = useState({
//     error: {},
//     isError: false,
//   });

//   useEffect(() => {
//     document.title = "Signup";
//   }, [data]);

//   const handleChange = (e, property) => {
//     setData({
//       ...data,
//       [property]: e.target.value,
//     });
//   };

//   const resetData = () => {
//     setData({
//       name: "",
//       email: "",
//       password: "",
//       about: "",
//       role: "502", // Reset role to default User
//     });
//   };

//   const submitForm = (e) => {
//     e.preventDefault();

//     if (error.isError) {
//       toast.error("Please fill the form correctly !!!");
//       setError({
//         error: {},
//         isError: false,
//       });
//     }

//     console.log(data);

//     signUp(data, data.role) // Pass role as a separate parameter
//       .then((resp) => {
//         console.log(resp);
//         console.log("User Registered Successfully");
//         toast.success(
//           "User Registered Successfully with user id: " + resp.id + " !!!"
//         );
//         resetData();

//         // Redirect to login page after successful registration

//         window.location.href = "/login";
//       })
//       .catch((err) => {
//         console.log(err);
//         console.log("User Registration Failed");

//         setError({
//           error: err,
//           isError: true,
//         });
//       });
//   };

//   return (
//     <div>
//       <Background />
//       <Base>
//         <Container style={{ marginTop: "10vh" }}>
//           <Row>
//             <Col sm={{ size: 6, offset: 3 }}>
//               <Card>
//                 <CardHeader style={{ textAlign: "center" }}>
//                   <h3>Fill Information to Register</h3>
//                 </CardHeader>
//                 <CardBody>
//                   <Form onSubmit={submitForm}>
//                     <FormGroup>
//                       <Label>Name: </Label>
//                       <Input
//                         type="text"
//                         placeholder="Enter your name"
//                         id="name"
//                         onChange={(e) => handleChange(e, "name")}
//                         value={data.name}
//                         invalid={
//                           error.error?.response?.data?.name ? true : false
//                         }
//                       />
//                       <FormFeedback>
//                         {error.error?.response?.data?.name}
//                       </FormFeedback>
//                     </FormGroup>

//                     <FormGroup>
//                       <Label>Email: </Label>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email"
//                         id="email"
//                         onChange={(e) => handleChange(e, "email")}
//                         value={data.email}
//                         invalid={
//                           error.error?.response?.data?.email ? true : false
//                         }
//                       />
//                       <FormFeedback>
//                         {error.error?.response?.data?.email}
//                       </FormFeedback>
//                     </FormGroup>

//                     <FormGroup>
//                       <Label>Password: </Label>
//                       <Input
//                         type="password"
//                         placeholder="Enter your password"
//                         id="password"
//                         onChange={(e) => handleChange(e, "password")}
//                         value={data.password}
//                         invalid={
//                           error.error?.response?.data?.password ? true : false
//                         }
//                       />
//                       <FormFeedback>
//                         {error.error?.response?.data?.password}
//                       </FormFeedback>
//                     </FormGroup>

//                     <FormGroup>
//                       <Label>About:</Label>
//                       <Input
//                         type="textarea"
//                         placeholder="Write about yourself"
//                         style={{ height: "15vh" }}
//                         id="about"
//                         onChange={(e) => handleChange(e, "about")}
//                         value={data.about}
//                         invalid={
//                           error.error?.response?.data?.about ? true : false
//                         }
//                       />
//                       <FormFeedback>
//                         {error.error?.response?.data?.about}
//                       </FormFeedback>
//                     </FormGroup>

//                     <FormGroup>
//                       <Label for="role">Role:</Label>
//                       <Input
//                         type="select"
//                         id="role"
//                         onChange={(e) => handleChange(e, "role")}
//                         value={data.role}
//                       >
//                         <option value="501">Admin</option>
//                         <option value="502">User</option>
//                         <option value="503">Doctor</option>
//                       </Input>
//                     </FormGroup>

//                     <Container className="text-center">
//                       <Button className=" button small-button me-2">
//                         Register
//                       </Button>
//                       <Button
//                         type="button"
//                         className=" button small-button reset-button ms-2"
//                         onClick={resetData}
//                       >
//                         Reset
//                       </Button>
//                     </Container>
//                   </Form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </Base>
//     </div>
//   );
// };

// export default Signup;
<<<<<<< HEAD
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
import { signUp } from "../service/user-service"; // Assuming addUserInfo is not needed anymore
=======

import React, { useState, useEffect } from "react";
import { signUp } from "../service/user-service";
>>>>>>> 6cb70320697f7403ba2e64ddcf1aac9f797b0f8c
import { toast } from "react-toastify";
import Background from "../components/basicComponents/Background";
import axios from "axios";

import "../style/Signup.css"; // Import the custom CSS
import Base from "../components/Base";
import KitBoxL from "../components/LottieComponents/KitBox";
import RegisterL from "../components/LottieComponents/Register";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    role: "502", // Default role set to User
    firstName: "", // New field for First Name
    lastName: "", // New field for Last Name
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  useEffect(() => {
    document.title = "Signup";
  }, []);

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
      role: "502",
      firstName: "", // Reset first name
      lastName: "", // Reset last name
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
      return;
    }

<<<<<<< HEAD
    // Combine data for main microservice signup
    const mainSignupData = {
      ...data,
      name: data.lastName, // Send last name as 'name' to the main service
    };

    console.log("Submitting to main microservice:", mainSignupData);

    // Main microservice signup
    signUp(mainSignupData, data.role)
      .then((resp) => {
        console.log("Main microservice registration successful:", resp);
        toast.success(
          "User Registered Successfully with user id: " + resp.id + " !!!"
        );

        // After successful signup in the main microservice, signup in auth microservice
        const authSignupData = {
          username: data.email, // Use email as username for auth microservice
          secret: data.password, // Password goes as secret
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
        };

        console.log("Submitting to auth microservice:", authSignupData);

        axios
          .post("http://localhost:8081/chat/signup", authSignupData)
          .then((authResp) => {
            console.log("Auth microservice registration successful:", authResp);
            toast.success("User also registered in the chat service!");
            resetData();
            window.location.href = "/login";
          })
          .catch((authErr) => {
            console.log("Auth microservice registration failed:", authErr);
            toast.error("Registration in chat service failed. Try logging in.");
            window.location.href = "/login"; // Optional redirect even if chat service fails
          });
      })
      .catch((err) => {
        console.log("Main microservice registration failed:", err);
=======
    signUp(data, data.role)
      .then((resp) => {
        console.log("User Registered Successfully");
        toast.success(
          "User Registered Successfully with user id: " + resp.id + " !!!"
        );
        resetData();
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log("User Registration Failed");

>>>>>>> 6cb70320697f7403ba2e64ddcf1aac9f797b0f8c
        setError({
          error: err,
          isError: true,
        });
      });
  };

  return (
    <div>
      <Background />
      <Base>
<<<<<<< HEAD
        <Container style={{ marginTop: "10vh" }}>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader style={{ textAlign: "center" }}>
                  <h3>Fill Information to Register</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    {/* First Name Field */}
                    <FormGroup>
                      <Label>First Name:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        id="firstName"
                        onChange={(e) => handleChange(e, "firstName")}
                        value={data.firstName}
                      />
                    </FormGroup>

                    {/* Last Name Field */}
                    <FormGroup>
                      <Label>Last Name:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        id="lastName"
                        onChange={(e) => handleChange(e, "lastName")}
                        value={data.lastName}
                      />
                    </FormGroup>

                    {/* Other fields remain unchanged */}
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
=======
        <div className="signup-page">
          <div className="signup-container">
            <div className="lottie-container">
              <KitBoxL />
            </div>
            <div className="signup-form">
              <h3 className="signup-header">Fill Information to Register</h3>
              <form onSubmit={submitForm}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    className={
                      error.error?.response?.data?.name ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.name && (
                    <div className="form-error">
                      {error.error?.response?.data?.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    className={
                      error.error?.response?.data?.email ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.email && (
                    <div className="form-error">
                      {error.error?.response?.data?.email}
                    </div>
                  )}
                </div>
>>>>>>> 6cb70320697f7403ba2e64ddcf1aac9f797b0f8c

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    className={
                      error.error?.response?.data?.password ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.password && (
                    <div className="form-error">
                      {error.error?.response?.data?.password}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>About:</label>
                  <textarea
                    placeholder="Write about yourself"
                    style={{ height: "10vh" }}
                    onChange={(e) => handleChange(e, "about")}
                    value={data.about}
                    className={
                      error.error?.response?.data?.about ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.about && (
                    <div className="form-error">
                      {error.error?.response?.data?.about}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role:</label>
                  <select
                    id="role"
                    onChange={(e) => handleChange(e, "role")}
                    value={data.role}
                  >
                    <option value="501">Admin</option>
                    <option value="502">User</option>
                    <option value="503">Doctor</option>
                  </select>
                </div>

<<<<<<< HEAD
                    <Container className="text-center">
                      <Button className="button small-button me-2">
                        Register
                      </Button>
                      <Button
                        type="button"
                        className="button small-button reset-button ms-2"
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
=======
                <div className="button-container">
                  <button type="submit" className="signup-button">
                    Register
                  </button>
                  <button
                    type="button"
                    className="reset-button"
                    onClick={resetData}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div className="lottie-container">
              <RegisterL />
            </div>
          </div>
        </div>
>>>>>>> 6cb70320697f7403ba2e64ddcf1aac9f797b0f8c
      </Base>
    </div>
  );
};

export default Signup;
