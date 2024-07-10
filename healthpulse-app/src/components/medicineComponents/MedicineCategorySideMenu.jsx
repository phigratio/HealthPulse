import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllMedicineCategories } from "../../service/medicine-category-service";

const MedicineCategorySideMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllMedicineCategories()
      .then((data) => {
        console.log("loading categories ", data);
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        toast.error("Error in loading categories");
      });
  }, []);

  return (
    <div>
      <ListGroup>
        <ListGroupItem
          tag={Link}
          to="/medicine"
          action={true}
          className="border-0"
        >
          All Medicines
        </ListGroupItem>
        {categories?.length > 0 ? (
          categories.map((cat, index) => (
            <ListGroupItem
              tag={Link}
              to={"/medicineCategories/" + cat.medicine_categoryId}
              className="border-0 shadow-0 mt-1"
              key={index}
              action={true}
            >
              {cat.medicine_categoryTitle}
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

export default MedicineCategorySideMenu;
