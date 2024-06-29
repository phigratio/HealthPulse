import { myAxios } from "./helper";

export const SignUp = (user) => {
  return myAxios
    .post("/api/v1/auth/register", user)
    .then((response) => response.data);
};

export const LogIn = (loginDetail) => {
  return myAxios
    .post("/api/v1/auth/login", loginDetail)
    .then((response) => response.data);
};
