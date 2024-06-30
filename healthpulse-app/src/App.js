import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import BMI from "./pages/BMI";
import Person from "./components/Person";
import ServicesBlock from "./components/ServicesBlock";
import Background from "./components/Background";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/bmi" element={<BMI />}></Route>
        <Route path="/person" element={<Person />}></Route>
        <Route path="/servicesblock" element={<ServicesBlock />}></Route>
        <Route path="/background" element={<Background />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
