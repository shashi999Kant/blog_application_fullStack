
import "./App.css";
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { About } from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Services from "./pages/Services";
import { UserDashBoard } from "./user-routes/UserDashBoard";
import { PrivateRoute } from "./pages/privateRoute";
import { ProfileInfo } from "./user-routes/ProfileInfo";
import { PostPage } from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Category from "./pages/Category";
import UpdateBlog from "./pages/UpdateBlog";
import CreateCategory from "./components/CreateCategory";
import DonationComponent from "./services/DonationComponent";

export default function App() {



  return (


    <UserProvider>
      
    <Router>
      <ToastContainer position="bottom-center"/>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Category />} />

        <Route path="/user" element={<PrivateRoute />}> 
         <Route path="dashboard" element={<UserDashBoard />} />
         <Route path="profile-info/:userId" element={<ProfileInfo />} />
         <Route path="update-blog/:blogId" element={<UpdateBlog />} />
         <Route path="createCategory" element={<CreateCategory />} />
         <Route path="donation" element={<DonationComponent />} />
        </Route>


      </Routes>
      </Router>
    </UserProvider>


  )
}

