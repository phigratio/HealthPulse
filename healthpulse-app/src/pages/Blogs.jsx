import React from "react";
import Base from "../components/Base";
import Background from "../components/Background"; // Import the Background component
import { Container} from "react-bootstrap"; 
import { Row, Col } from "react-bootstrap";

import NewFeedPagination from "../components/NewFeedPagination";
import NewFeed from "../components/NewFeedInfinite";
import CategorySideMenu from "../components/CategorySideMenu";

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
