import { privateAxios, myAxios } from "./helper";

// Create medicine function
export const createMedicine = (medicineData, medicineCategoryId) => {
  console.log(medicineData);
  console.log("This is medicineData.medicineCategoryId: ", medicineCategoryId);
  return privateAxios
    .post(`/categories/${medicineCategoryId}/medicines`, medicineData)
    .then((response) => response.data);
};

// Load all medicines
export const loadAllMedicines = () => {
  return myAxios.get(`/medicines/`).then((response) => response.data);
};

// Delete medicine
export function deleteMedicine(medicineId) {
  return privateAxios
    .delete(`/medicines/${medicineId}`)
    .then((res) => res.data);
}

// Load single medicine by ID
export const loadMedicine = (medicineId) => {
  return myAxios
    .get(`/medicines/${medicineId}`)
    .then((response) => response.data);
};

// Get category-wise medicines
export function loadMedicinesCategoryWise(categoryId) {
  return myAxios
    .get(`/medicines/category/${categoryId}`)
    .then((res) => res.data);
}

// Update medicine
export function updateMedicine(medicine, medicineId) {
  console.log(medicine);
  return privateAxios
    .put(`/medicines/${medicineId}`, medicine)
    .then((resp) => resp.data);
}

// Upload medicine image
export const uploadMedicineImage = (image, medicineId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/medicines/image/upload/${medicineId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
 