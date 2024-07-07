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
import DoctorChatBot from "./servicePage/DoctorChatBot";
import KidsCorner from "./servicePage/KidsCorner";
import HealthCalculator from "./servicePage/HealthCalculator";
import BookDoctor from "./servicePage/BookDoctor";
import AddPost from "./components/AddPost";
import User from "./components/User";
import PostPage from "./pages/PostPage";
import Blogs from "./pages/Blogs";
import Categories from "./components/Categories";
import MyPosts from "./pages/user-routes/MyPosts";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />

        <Route path="/service/doctor-chat-bot" element={<DoctorChatBot />} />
        <Route
          path="/service/health-calculator"
          element={<HealthCalculator />}
        />
        <Route path="/user/update-user" element={<UpdateUser />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        <Route path="/service/kids-corner" element={<KidsCorner />} />
        <Route path="/service/book-doctor" element={<BookDoctor />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-profile/:userId" element={<ProfileInfo />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="update-blog/:blogId" element={<UpdateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
