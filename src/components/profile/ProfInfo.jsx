import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import "../../css/profinfo.css";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const ProfInfo = () => {
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const data = location.state;
  let skill = data.skills;
  const [fromemail, setFromemail] = useState("");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    name: "",
    message: "",
  });

  useEffect(() => {
    try {
      const logincheck = async () => {
        const result = await axios.get(`http://localhost:3000/check/${userId}`);
        // console.log(result.data.result);
        setFromemail(result.data.result.email);
      };
      logincheck();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateMessage = () => {
    const { name } = formData;
    // console.log(formData);
    const message = `Subject: Interest in Your Freelance Profile - Let's Collaborate!\n\nDear ${data.name},\n\nI hope this message finds you well. My name is ${name}, and I'm reaching out to express my interest in your freelance profile. After reviewing your portfolio and skillset, I'm impressed by your expertise and the quality of your work.\n\nI believe there could be potential synergy between your capabilities and the projects I have in mind. Your skills align perfectly with the requirements of the projects I'm currently undertaking, and I am eager to explore the possibility of working together to bring these initiatives to fruition.\n\nI would love to schedule a meeting or call to further discuss the details of the projects and explore how we can collaborate effectively. Please feel free to contact me at your earliest convenience via email at ${fromemail} so that we can arrange a suitable time to connect.\n\nLooking forward to the opportunity to work together and achieve great results.\n\nBest regards,\n${name}`;

    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const message = generateMessage();
      const response = await axios.post("http://localhost:3000/sendmail", {
        ...formData,
        message,
        from: fromemail,
        to: data.email,
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success("Email Sent Successfully");
        setTimeout(() => {
          window.location.href = " ";
        }, 1000);
      } else {
        toast.error("Error Sending Email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };
  return (
    <section className="profinfo">
      <div className="profInfo_left">
        <div className="img">
          <img src={data.imageUrl} alt="no image available" />
        </div>
        <h2>
          <i className="fa-solid fa-location-dot"></i> {data.country}
        </h2>
        {data.isOwnProfile ? null : (
          <button onClick={handleClickOpen} className="chatbtn">
            Contact
          </button>
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Email Sending Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details below to send an email.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="from"
              name="from"
              label="From"
              type="email"
              value={fromemail}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="to"
              name="to"
              label="To"
              type="email"
              value={data.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Your Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            {/* <TextField
              required
              margin="dense"
              id="message"
              name="message"
              label="Message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              fullWidth
            /> */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div className="profcontent">
        <div className="profhead">
          <h1>{data.name}</h1>
          <h2>{data.category}</h2>
        </div>
        <div className="profskill">
          <h2>Skills</h2>
          <ul className="sk-li">
            {Array.isArray(skill)
              ? skill.map((item, i) => <li key={i}>{item}</li>)
              : "h"}
          </ul>
        </div>
        <div className="profdescr">
          <h2>About</h2>
          <p>{data.about}</p>
        </div>
        <div className="profexp">
          <h2>Experience </h2>
          <p>{data.experience}</p>
        </div>
        <div className="profproj">
          <h2>Projects [Links] :</h2>
          <ul>
            <li>
              <a href="">{data.project}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfInfo;
