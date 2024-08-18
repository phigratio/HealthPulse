import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import { BASE_URL } from "../service/helper";
import { loadFood } from "../service/food-service";

const FoodPage = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    // load food of foodId
    loadFood(foodId)
      .then((data) => {
        console.log(data);
        setFood(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading food");
      });
  }, [foodId]);

  return (
    <Base>
      <Container className="mt-32">
        <Row>
          <Col md={8}>
            <Card>
              <CardBody>
                <CardText>
                  <h2>{food?.name}</h2>
                  <p>{food?.description}</p>
                  {food?.foodCategory && (
                    <p>
                      <small>
                        <strong>Category:</strong>{" "}
                        <Link
                          to={`/foodCategories/${food.foodCategory.food_categoryId}`}
                        >
                          {food.foodCategory.food_categoryTitle}
                        </Link>
                      </small>
                    </p>
                  )}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <CardBody>
                <CardText>
                  {food?.imageName && (
                    <div
                      className="image-container mt-4 shadow"
                      style={{ maxWidth: "100%" }}
                    >
                      <img
                        className="img-fluid"
                        src={BASE_URL + "/users/user/image/" + food.imageName}
                        alt=""
                      />
                    </div>
                  )}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default FoodPage;
