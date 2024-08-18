import { myAxios } from "./helper";

export const loadAllFoodCategories = () => {
  return myAxios.get(`/foodCategories/`).then((respone) => {
    return respone.data;
  });
}