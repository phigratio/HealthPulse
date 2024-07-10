import React from "react";
import Base from "../components/Base";
import Background from "../components/basicComponents/Background"; // Import the Background component
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import NewFeedPagination from "../components/postComponents/NewFeedPagination";
import NewFeed from "../components/postComponents/NewFeedInfinite";
import CategorySideMenu from "../components/postComponents/CategorySideMenu";

const Blogs = () => {
  return (
    <div>
      <Background />
      <Base>
        <Container className="mt-40">
          <Row>
            <Col md={2} className="">
              <CategorySideMenu />
            </Col>
            <Col md={10}>
              <NewFeed />
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default Blogs;
