import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "react-bootstrap";

import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../service/helper";
import { Link } from "react-router-dom";

const Food = ({ food, deleteFood }) => {
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
                    food?.imageName
                        ? BASE_URL + "/users/user/image/" + food.imageName
                        : "https://via.placeholder.com/150"
                }
                alt={food?.name}
                style={imgStyle}
            />
            <CardBody className="text-center">
                <CardTitle tag="h5">{food?.name}</CardTitle>
                <CardText>{truncateDescription(food?.description)}</CardText>
                <CardText>Price: ${food?.price}</CardText>
                <CardText>Quantity: {food?.quantity}</CardText>
                <div className="text-center">
                    <Link
                        className="btn btn-secondary border-0 button small-button"
                        to={"/food/" + food.foodId}
                    >
                        View
                    </Link>
                    {login && user?.role === "admin" && (
                        <Link
                            className="btn btn-warning border-0 button small-button"
                            to={"/food/edit/" + food.foodId}
                        >
                            Edit
                        </Link>
                    )}
                    {login && user?.role === "admin" && (
                        <Button
                            className="btn btn-danger border-0 button small-button"
                            onClick={() => deleteFood(food.foodId)}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}


export default Food;

