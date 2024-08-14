import { myAxios, privateAxios } from "./helper";

export const signUp = (user, roleId) => {
  return myAxios
    .post(`/auth/register?roleId=${roleId}`, user)
    .then((response) => response.data);
};

export const login = (loginDetail) => {
  console.log("Login Detail:");
  console.log(loginDetail);
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return myAxios.get(`/users/${userId}`).then((resp) => resp.data);
};

//update post
export function updateProfile(user, userId) {
  console.log(user);
  return privateAxios.put(`/users/${userId}`, user).then((resp) => resp.data);
}

//update profile image

export const uploadProfileImage = (image, userId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/users/user/image/upload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// Function to get user data from local storage
export const getUserData = () => {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data).user : null;
};

// Function to check if the user is an admin
export const isAdmin = () => {
  const user = getUserData();
  return user && user.roles.some((role) => role.id === 501);
};

// Function to check if the user is a doctor
export const isDoctor = () => {
  const user = getUserData();
  return user && user.roles.some((role) => role.id === 503);
};

// Function to check if the user is a normal user
export const isUser = () => {
  const user = getUserData();
  return user && user.roles.some((role) => role.id === 502);
};
