import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Base from "./components/Base";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      {/* this is for toastify which is used for showing the popup message */}
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
