import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../Base";
import { Container, Row, Col } from "reactstrap";
import { loadAllFoodCategories } from "../../service/food-category-service";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem} from "reactstrap";
import { Link } from "react-router-dom";

const FoodCategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    loadAllFoodCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading food categories");
      });
  }, []);

  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/food" action={true} className="border-0">
          All Foods
        </ListGroupItem>
        {categories?.length > 0 ? (
          categories.map((cat, index) => (
            <ListGroupItem
              tag={Link}
              to={"/foodCategories/" + cat.foodCategoryId}
              className="border-0 shadow-0 mt-1"
              key={index}
              action={true}
            >
              {cat.foodCategoryTitle}
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem className="border-0">
            No categories available
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
};

export default FoodCategorySideMenu;
