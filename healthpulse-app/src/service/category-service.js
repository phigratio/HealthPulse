import { myAxios } from "./helper";

export const loadAllCategories = () => {
  return myAxios.get(`/api/category/`).then((respone) => {
    return respone.data;
  });
};
