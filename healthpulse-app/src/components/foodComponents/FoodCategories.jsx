import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../Base";
import { Container, Row, Col } from "reactstrap";
import FoodCateforiesSideMenu from "./FoodCategorySideMenu";
import { loadFoodsCategoryWise, deleteFood } from "../../service/food-service";

import { toast } from "react-toastify";
import Food from "./Food";
import Background from "../basicComponents/Background";

const containerStyle = { marginTop: "40px" };
const rowStyle = { display: "flex", flexWrap: "wrap" };

function FoodCategories() {
  const [foods, setFoods] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);
    loadFoodsCategoryWise(categoryId)
      .then((data) => {
        setFoods([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading foods");
      });
  }, [categoryId]);

  function deleteFoodItem(food) {
    //going to delete post
    console.log(food);
    deleteFood(food.foodId)
      .then((res) => {
        console.log(res);
        toast.success("food is deleled..");
        let newFoods = foods.filter((f) => f.foodId !== food.foodId);
        setFoods([...newFoods]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting food");
      });
  }

  return (
    <div>
      <Background />
      <Base>
        <div>
          <Container>
            <Row>
              <Col md={2}>
                <div className="mt-56">
                  <FoodCateforiesSideMenu />
                </div>
              </Col>
              <Col md={10}>
                <div className="mt-32">
                  <h1>Food Count ({foods.length}) </h1>
                  <Container>
                    <Row style={rowStyle}>
                      {foods &&
                        foods.map((food, index) => (
                          <Col key={index} sm="6" md="4" lg="3">
                            <Food
                              food={food}
                              deleteFood={() => deleteFoodItem(food)}
                            />
                          </Col>
                        ))}
                    </Row>
                  </Container>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Base>
    </div>
  );
}

export default FoodCategories;
