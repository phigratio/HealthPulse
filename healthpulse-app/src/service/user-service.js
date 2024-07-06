import {myAxios} from "./helper"

export const signUp = (user , roleId) => {  
    return myAxios
      .post(`/auth/register?roleId=${roleId}`, user)  
      .then((response) => response.data);
};

export const login = (loginDetail) => {
    return myAxios
        .post("/auth/login", loginDetail)
        .then((response) => response.data);
}

export const getUser = (userId) => {
  return myAxios.get(`/users/${userId}`).then((resp) => resp.data);
};