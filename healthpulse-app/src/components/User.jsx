import React from "react";
import { Outlet , Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

const User = () => {


  if (isLoggedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default User;
