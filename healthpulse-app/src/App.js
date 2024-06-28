import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Base from "./components/Base";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import BMI from "./pages/BMI";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/bmi" element={<BMI />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
