import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Person from "./components/Person";
import ServicesBlock from "./components/ServicesBlock";
import Background from "./components/Background";
import DoctorChatBot from "./servicePage/DoctorChatBot";
import KidsCorner from "./servicePage/KidsCorner";
import HealthCalculator from "./servicePage/HealthCalculator";
import BookDoctor from "./servicePage/BookDoctor";
import AddPost from "./components/AddPost";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/person" element={<Person />}></Route>
        <Route path="/servicesblock" element={<ServicesBlock />}></Route>
        <Route path="/background" element={<Background />}></Route>
        <Route
          path="/service/doctor-chat-bot"
          element={<DoctorChatBot />}
        ></Route>
        <Route
          path="/service/health-calculator"
          element={<HealthCalculator />}
        ></Route>
        <Route path="/service/kids-corner" element={<KidsCorner />}></Route>
        <Route path="/service/book-doctor" element={<BookDoctor />}></Route>
        <Route path="/addpost" element={<AddPost />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
