import "../css/navbar.css";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { deepOrange, red } from "@mui/material/colors";
import { animate, motion } from "framer-motion";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const logincheck = async () => {
        const result = await axios.get(`http://localhost:3000/check/${userId}`);
        if (userId) {
          setLoggedIn(true);
        }
        // console.log(result.data);
        setData(result.data);
      };
      logincheck();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onLogout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/Login");
    }
  };
  return (
    <motion.nav
      initial={{ y: -250 }}
      animate={{ y: -5 }}
      transition={{ type: "spring", delay: 0.5, duration: 1 }}
      className="navbar"
    >
      <motion.div className="nav-container container">
        <img src="/Images/logoo.png" className="logo"></img>
        <ul className="nav-items">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="../AllFreelancer" onClick={handleLinkClick}>
              FindFreelancers
            </a>
          </li>
          <li>
            <NavLink to="/jobs" onClick={handleLinkClick}>
              FindJobs
            </NavLink>
          </li>
          <li>
            <a href="./contact">Contact</a>
          </li>
        </ul>
        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <p
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={handleMenuOpen}
            >
              Gous{" "}
            </p> */}
            <Avatar
              onClick={handleMenuOpen}
              alt="Gous"
              sx={{ bgcolor: red[900] }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate("/Myprofile");
                  window.href = "/Myprofile";
                }}
              >
                {" "}
                My Profile
              </MenuItem>

              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <a href="./Login" className="loginbtn btn-primary tw">
            {" "}
            Login
          </a>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
