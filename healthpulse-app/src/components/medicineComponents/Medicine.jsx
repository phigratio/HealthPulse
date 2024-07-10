import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../service/helper";
import { Link } from "react-router-dom";

const Medicine = ({ medicine, deleteMedicine }) => {
  const cardStyle = {
    marginBottom: "20px",
    textAlign: "center",
  };

  const imgStyle = {
    height: "150px",
    objectFit: "cover",
  };

  const truncateDescription = (description) => {
    if (description?.length > 40) {
      return description.substring(0, 40) + "...";
    }
    return description;
  };
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card style={cardStyle}>
      <CardImg
        top
        width="100%"
        src={
          medicine?.imageName
            ? BASE_URL + "/users/user/image/" + medicine.imageName
            : "https://via.placeholder.com/150"
        }
        alt={medicine?.name}
        style={imgStyle}
      />
      <CardBody className="text-center">
        <CardTitle tag="h5">{medicine?.name}</CardTitle>
        <CardText>{truncateDescription(medicine?.description)}</CardText>
        <CardText>Price: ${medicine?.price}</CardText>
        <CardText>Quantity: {medicine?.quantity}</CardText>
        <div className="text-center">
          <Link
            className="btn btn-secondary border-0 button small-button"
            to={"/medicine/" + medicine.medicineId}
          >
            View Details
          </Link>
          <Button
            color="primary"
            className="ml-2 button small-button mt-1 mr-2"
          >
            Add to cart
          </Button>

          {user &&
            (user.roles[0].id === 501 ? (
              <>
                <Button color="danger" onClick={deleteMedicine}>
                  Delete
                </Button>
              </>
            ) : null)}
        </div>
      </CardBody>
    </Card>
  );
};

export default Medicine;
