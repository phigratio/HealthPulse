import React from "react";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { Container, Row, Col } from "reactstrap";
import "./Footer.css"; // Custom CSS file

const FooterList = ({ children }) => (
  <div className="footer-list">{children}</div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="4">
            <FooterList>
              <h3 className="footer-heading">Service Categories</h3>
              <a href="#">Vaccine Corner</a>
              <a href="#">Daily Health</a>
              <a href="#">BMI and Fitness</a>
              <a href="#">Seasonal Health</a>
              <a href="#">Teli-Medicine</a>
              <a href="#">Medicine Corner</a>
            </FooterList>
          </Col>
          <Col md="4">
            <FooterList>
              <h3 className="footer-heading">Patients Service</h3>
              <a href="#">Contact Us</a>
              <a href="#">Policies and Regulations</a>
              <a href="#">HealthCare Update</a>
              <a href="#">FAQs</a>
            </FooterList>
          </Col>
          <Col md="4">
            <div className="about-us">
              <h3 className="footer-heading">About Us</h3>
              <p>
                We are dedicated to providing you with the resources and support
                you need to achieve optimal health and well-being. Whether
                you're starting a new fitness regimen, managing a chronic
                condition, or seeking preventative care, we're here to guide you
                every step of the way. Our comprehensive tools and expert advice
                are designed to empower you on your health journey.
              </p>
              <p>
                &copy; {new Date().getFullYear()} YourDoctor. All rights
                reserved.
              </p>
            </div>
          </Col>
          <Col md="4">
            <FooterList>
              <h3 className="footer-heading">Follow Us</h3>
              <div className="social-links">
                <a href="#">
                  <MdFacebook />
                </a>
                <a href="#">
                  <AiFillTwitterCircle />
                </a>
                <a href="#">
                  <AiFillInstagram />
                </a>
                <a href="#">
                  <AiFillYoutube />
                </a>
              </div>
            </FooterList>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
