import { privateAxios, myAxios } from "./helper";

// Create food function

export const createFood = (foodData, foodCategoryId) => {
  console.log(foodData);
  console.log("This is foodData.foodCategoryId: ", foodCategoryId);
  return privateAxios
    .post(`/categories/${foodCategoryId}/foods`, foodData)
    .then((response) => response.data);
};

// Load all foods

export const loadAllFoods = () => {
  return myAxios.get(`/foods/`).then((response) => response.data);
};

// Delete food

export function deleteFood(foodId) {
  return privateAxios.delete(`/foods/${foodId}`).then((res) => res.data);
}

// Load single food by ID

export const loadFood = (foodId) => {
  return myAxios.get(`/foods/${foodId}`).then((response) => response.data);
};

// Get category-wise foods

export function loadFoodsCategoryWise(categoryId) {
  return myAxios.get(`/foods/category/${categoryId}`).then((res) => res.data);
}

// Update food

export function updateFood(food, foodId) {
  console.log(food);
  return privateAxios.put(`/foods/${foodId}`, food).then((resp) => resp.data);
}

// Upload food image

export const uploadFoodImage = (image, foodId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/foods/image/upload/${foodId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
