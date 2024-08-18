import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

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
import AddPost from "./components/postComponents/AddPost";
import User from "./components/User";
import PostPage from "./pages/PostPage";
import MedicinePage from "./pages/MedicinePage";
import Blogs from "./pages/Blogs";
import Categories from "./components/postComponents/Categories";
import MyPosts from "./pages/user-routes/MyPosts";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateUser from "./pages/UpdateUser";
import MedicineFeed from "./components/medicineComponents/MedicineFeed";
import MedicineShop from "./pages/MedicineShop";
import FoodPage from "./pages/FoodPage";

import FoodFeed from "./components/foodComponents/FoodFeed";
import FoodShop from "./pages/FoodShop";
import FoodCategories from "./components/foodComponents/FoodCategories";

import MedicineCategories from "./components/medicineComponents/MedicineCategories";
import NewsList from "./servicePage/NewsList";
import Weather from "./servicePage/Weather";
import PrescriptionAnalyzer from "./servicePage/PrescriptionAnalyzer";
import NearestHospital from "./servicePage/NearestHospital";
import MapHome from "./servicePage/MapHome";

// Ecommerce part

import EcommerceMainPage from "./ecommerce/EcommerceMainPage";

//cabin booking part

import CabinMainPage from "./CabinBooking/CabinMainPage";

//Admin part

import AdminMainPage from "./admin_part/AdminMainPage";

//Appointment part
import AppointMainPage from "./appointPart/AppointMainPage";

library.add(fas);
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

        <Route path="/landing" element={<Landing />} />

        <Route path="/service/doctor-chat-bot" element={<DoctorChatBot />} />
        <Route
          path="/service/health-calculator"
          element={<HealthCalculator />}
        />
        <Route path="/service/kids-corner" element={<KidsCorner />} />
        <Route path="/service/newsapp" element={<NewsList />} />
        <Route path="/service/book-doctor" element={<BookDoctor />} />
        <Route path="/service/weatherapp" element={<Weather />} />
        <Route
          path="/service/prescription-analyzer"
          element={<PrescriptionAnalyzer />}
        />
        <Route path="/service/nearest-hospital" element={<MapHome />} />

        <Route path="/user/update-user" element={<UpdateUser />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/medicine/:medicineId" element={<MedicinePage />} />
        <Route path="/food/:foodId" element={<FoodPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        <Route
          path="/medicineCategories/:categoryId"
          element={<MedicineCategories />}
        />

        <Route
          path="/foodCategories/:categoryId"
          element={<FoodCategories />}
        />

        <Route path="/addpost" element={<AddPost />} />
        <Route path="/medicine-feed" element={<MedicineFeed />} />
        <Route path="/food-feed" element={<FoodFeed />} />
        <Route path="/medicine" element={<MedicineShop />} />
        <Route path="/food" element={<FoodShop />} />

        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-profile/:userId" element={<ProfileInfo />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="update-blog/:blogId" element={<UpdateBlog />} />
        </Route>

        {/* Ecommerce part */}

        <Route path="/ecommerce/*" element={<EcommerceMainPage />} />

        {/* Cabin booking part */}

        <Route path="/cabin-booking/*" element={<CabinMainPage />} />

        {/* Admin part */}
        <Route path="/admin/*" element={<AdminMainPage />} />

        {/* Appointment part */}
        <Route path="/appoint/*" element={<AppointMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
