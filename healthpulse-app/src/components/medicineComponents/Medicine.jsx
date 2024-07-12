import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import { BASE_URL } from "../../service/helper";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";

const Medicine = ({ medicine, deleteMedicine }) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  const { addToCart } = useCartContext();

  const truncateDescription = (description) => {
    if (description?.length > 40) {
      return description.substring(0, 40) + "...";
    }
    return description;
  };

  return (
    <Card style={{ marginBottom: "20px", textAlign: "center", width: "100%" }}>
      <CardImg
        top
        width="100%"
        src={
          medicine?.imageName
            ? BASE_URL + "/users/user/image/" + medicine.imageName
            : "https://via.placeholder.com/150"
        }
        alt={medicine?.name}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <CardBody className="d-flex flex-column justify-content-between">
        <div>
          <CardTitle tag="h5">{medicine?.name}</CardTitle>
          <CardText>{truncateDescription(medicine?.description)}</CardText>
          <CardText>Price: ${medicine?.price}</CardText>
          <CardText>Quantity: {medicine?.quantity}</CardText>
        </div>
        <div>
          <Link
            className="btn-secondary border-0 button small-button"
            to={"/medicine/" + medicine.medicineId}
          >
            View Details
          </Link>
          <Button
            className="ml-2 button small-button mt-1 mr-2"
            onClick={() => addToCart({ medicine })}
          >
            Add to cart
          </Button>
          {user && user.roles[0].id === 501 && (
            <Button color="danger" onClick={deleteMedicine}>
              Delete
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Medicine;
