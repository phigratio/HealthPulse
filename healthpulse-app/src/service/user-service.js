import { myAxios, privateAxios } from "./helper";

export const signUp = (user, roleId) => {
  return myAxios
    .post(`/auth/register?roleId=${roleId}`, user)
    .then((response) => response.data);
};

export const login = (loginDetail) => {
  console.log(loginDetail);
  return myAxios
    .post("/auth/token", loginDetail)
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
