import React, {useState , useEffect} from "react";
import { loadAllFoods , deleteFood } from "../../service/food-service";
import { toast } from "react-toastify";
import Food from "./Food";
import {Row , Col , Container} from "reactstrap";

const FoodFeed = () => {
    const [foodContent , setFoodContent] = useState({
        content : [],
        totalPages : 0,
        totalElements : 0,
        pageSize : 5,
        lastPage : false,
        pageNumber : 0
    });

    const [currentPage , setCurrentPage] = useState(0);

    useEffect(() => {
        console.log("loading foods");
        console.log(currentPage);
        changePage(currentPage);
    } , [currentPage]);

    const changePage = (pageNumber = 0 , pageSize = 5) => {
        if(pageNumber > foodContent.pageNumber && foodContent.lastPage) return;
        if(pageNumber < foodContent.pageNumber && foodContent.pageNumber === 0) return;

        loadAllFoods(pageNumber , pageSize)
        .then((data) => {
            console.log(data);
            setFoodContent({
                content : data.content,
                totalPages : data.totalPages,
                totalElements : data.totalElements,
                pageSize : data.pageSize,
                lastPage : data.lastPage,
                pageNumber : data.pageNumber
            });
        })
        .catch((error) => {
            toast.error("Error in loading foods");
        });
    };

    const deleteFood = (food) => {
        console.log(food);
        deleteFood(food.foodId)
        .then((res) => {
            console.log(res);
            toast.success("Food is deleted.");
        })
        .catch((error) => {
            toast.error("Error in deleting food");
        });
    };

    return (
        <Container>
            <Row>
                {foodContent.content.map((food) => {
                    return (
                        <Col key={food.foodId} md="4">
                            <Food food={food} deleteFood={deleteFood}/>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default FoodFeed;