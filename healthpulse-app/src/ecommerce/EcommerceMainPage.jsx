import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import EcommerceNavigation from "./customer/components/navication/Navigation";
import EcomHomePage from "./customer/Pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import Cart from "./customer/components/Cart/Cart";
import Checkout from "./customer/components/Checkout/Checkout";
import Order from "./customer/components/Order/Order";
import OrderDetails from "./customer/components/Order/OrderDetails";
import { Route, Routes } from "react-router-dom";

const EcommerceMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <EcommerceNavigation />
        <div className="main">
          <Routes>
            <Route path="/" element={<EcomHomePage />} />
            <Route
              path="/:levelOne/:levelTwo/:levelThree"
              element={<Product />}
            />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order" element={<Order />} />
            <Route path="order/:orderId" element={<OrderDetails />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default EcommerceMainPage;
