import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "../css/login.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpswd, setConfirmpswd] = useState("");
  const [lgemail, setLgemail] = useState("");
  const [lgpassword, setLgpassword] = useState("");

  const toggleForms = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.endsWith("gmail.com")) {
      toast.error("Please enter a valid Gmail address");
      return;
    }
    if (password !== confirmpswd) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
        phone: "",
        dob: "",
        gender: "",
        fullname: "",
      });
      if (result.data.success == true) {
        toast.success("Registration successful!!!!");
        setTimeout(() => {
          window.location.href = " ";
        }, 3000);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/login", {
        lgemail,
        lgpassword,
      });
      console.log(result.data.user._id);
      if (result) {
        toast.success("Login successful !!!!");
        localStorage.setItem("userId", result.data.user._id);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="loginbody">
      <div className="container3">
        <input type="checkbox" id="flip" />
        <div className="cover">
          {isLoginFormVisible ? (
            <div className="front">
              <img src="./Images/login1.png" alt="" />
              <div className="text">
                <span className="text-1">
                  Every new friend is a <br /> new adventure
                </span>
                <span className="text-2">Let's get connected</span>
              </div>
            </div>
          ) : (
            <div className="back">
              <img className="backImg" src="./Images/signup.png" alt="" />
              <div className="text">
                <span className="text-1">
                  Complete miles of journey <br /> with one step
                </span>
                <span className="text-2">Let's get started</span>
              </div>
            </div>
          )}
        </div>
        <div className="forms">
          <div className="form-content">
            <div className={isLoginFormVisible ? "login-form" : "signup-form"}>
              <div className="title">
                {isLoginFormVisible ? "Login" : "Signup"}
              </div>
              <div className="input-boxes">
                {isLoginFormVisible ? (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="input-box">
                      <i className="fas fa-envelope" />
                      <input
                        type="text"
                        placeholder="Enter your email"
                        required
                        value={lgemail}
                        onChange={(e) => setLgemail(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={lgpassword}
                        onChange={(e) => setLgpassword(e.target.value)}
                      />
                    </div>
                    <div className="button input-box">
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit}>
                    <div className="input-box">
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="text"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Re-enter your password"
                        required
                        value={confirmpswd}
                        onChange={(e) => setConfirmpswd(e.target.value)}
                      />
                    </div>
                    <div className="button input-box">
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                )}
                <div className="text sign-up-text">
                  {isLoginFormVisible
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <label htmlFor="flip" onClick={toggleForms}>
                    {isLoginFormVisible ? "Signup now" : "Login now"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
