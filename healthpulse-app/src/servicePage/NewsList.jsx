import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination.js";
import "../style/servicePage/NewsList.css"; // Updated CSS

import banner from "../images/banner/kidsCorner.mp4";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData = [], loading, error } = useNewsData("health", "en");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);

  return (
    <div className="news-page">
      <Background />
      <Base>
        <div className="video-container">
          <video src={banner} autoPlay loop muted className="banner-video" />
        </div>
        <Container fluid className="news-container">
          <Row>
            <Col xs={12} className="text-center">
              <h3 className="news-heading">Health News</h3>
            </Col>
          </Row>
          <Row>
            {currentArticles.map((article) => (
              <Col xs={12} md={6} lg={4} key={article.url} className="mb-4">
                <Card className="news-card">
                  <Card.Img
                    src={article.image}
                    variant="top"
                    className="news-card-img"
                  />
                  <Card.Body>
                    <Card.Title className="news-card-title">
                      {article.title}
                    </Card.Title>
                    <Card.Text className="news-card-text">
                      {article.description}
                    </Card.Text>
                    <p className="news-card-date">
                      Published on:{" "}
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <Card.Link
                      href={article.url}
                      className="news-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </Container>
      </Base>
    </div>
  );
};

export default NewsList;
