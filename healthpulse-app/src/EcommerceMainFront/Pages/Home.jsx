import React, { useEffect } from "react";
import { Header } from "../Component/Header";
import { Hero } from "../Component/HomeComponent/Hero";
import { ListProduct } from "../Component/HomeComponent/ListProduct";

import { ToastContainer } from "react-toastify";

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <Hero />
    </>
  );
};
