import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/user-routes/Dashboard";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
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
import User from "./components/User";
import NewFeed from "./components/NewFeedInfinite";
import NewFeedPagination from "./components/NewFeedPagination";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/person" element={<Person />} />
        <Route path="/servicesblock" element={<ServicesBlock />} />
        <Route path="/background" element={<Background />} />
        <Route path="/newfeed" element={<NewFeed />} /> 
        <Route path="/newfeedpagination" element={<NewFeedPagination />} />
        <Route path="/service/doctor-chat-bot" element={<DoctorChatBot />} />
        <Route
          path="/service/health-calculator"
          element={<HealthCalculator />}
        />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/service/kids-corner" element={<KidsCorner />} />
        <Route path="/service/book-doctor" element={<BookDoctor />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-profile" element={<ProfileInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
