import { myAxios } from "./helper";

export const loadAllMedicineCategories = () => {
  return myAxios.get(`/medicineCategories/`).then((respone) => {
    return respone.data;
  });
};
