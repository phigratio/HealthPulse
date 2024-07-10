import React, { useState, useEffect } from "react";
import { loadAllFoods, deleteFood } from "../../service/food-service";
import { toast } from "react-toastify";
import Food from "./Food";
import { Row, Col, Container } from "reactstrap";

const FoodFeed = () => {
  const [foodContent, setFoodContent] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = () => {
    loadAllFoods()
      .then((data) => {
        console.log(data);
        setFoodContent(data);
      })
      .catch((error) => {
        toast.error("Error in loading foods");
        console.error(error);
      });
  };

  const doDeleteFood = (foodId) => {
    deleteFood(foodId)
      .then((data) => {
        console.log(data);
        toast.success("Food is deleted.");
        loadFoods();
      })
      .catch((error) => {
        toast.error("Error in deleting food");
        console.error(error);
      });
  };

  const containerStyle = {
    padding: "20px",
  };

  const rowStyle = {
    marginBottom: "20px",
  };

  return (
    <div>
      <Container style={containerStyle}>
        <Row style={rowStyle}>
          {foodContent.map((food, index) => (
            <Col key={index} sm="6" md="4" lg="3">
              <Food food={food} deleteFood={() => doDeleteFood(food.foodId)} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FoodFeed;
