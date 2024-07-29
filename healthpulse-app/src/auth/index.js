//isLoggedIn=>

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

//doLogin=> data=>set to localstorage

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout=> remove from localStorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//get currentUser
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return undefined;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    console.log(
      "The token is:" + JSON.parse(localStorage.getItem("data")).token
    );
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};

//get current user role
export const getCurrentUserRole = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user.role;
  } else {
    return undefined;
  }
};

//update user data
export const updateUserData = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
