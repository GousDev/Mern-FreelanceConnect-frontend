import { Route, Router, BrowserRouter, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Login from "./components/Login";
import UiUx from "./components/UiUx";
import Footer from "./components/Footer";
import WebDev from "./components/WebDev";
import AppDev from "./components/AppDev";
import ProfInfo from "./components/profile/ProfInfo";
import Freelanceform from "./components/profile/Freelanceform";
import AllFreelancer from "./components/AllFreelancer";
import Jobs from "./components/Job/Jobs";
import Postajob from "./components/Job/Postajob";
import Myprofile from "./components/Myprofile";
import EditProfile from "./components/EditProfile";

function App() {
  // const [user, setUser] = useState(null);
  const isLoginOrRegisterPage = location.pathname === "/Login";
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UiUx" element={<UiUx />} />
        <Route path="/WebDev" element={<WebDev />} />
        <Route path="/AppDev" element={<AppDev />} />
        <Route path="/ProfInfo/:id" element={<ProfInfo />} />
        <Route path="/FreeLanceform" element={<Freelanceform />} />
        <Route path="/AllFreelancer" element={<AllFreelancer />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/Postajob" element={<Postajob />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/EditProfile/:id" element={<EditProfile />} />
      </Routes>
      {!isLoginOrRegisterPage && <Footer />}
    </BrowserRouter>
  );
}

export default App;
