import "../../css/jobcard.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const Jobcard = (props) => {
  const userId = localStorage.getItem("userId");
  let skill = props.skills;
  const [open, setOpen] = useState(false);
  const [fromemail, setFromemail] = useState("");
  const [uname, setUname] = useState("");
  const [loading, setLoading] = useState(false);
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

        setFromemail(result.data.result.email);
        setUname(result.data.result.name);
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
    const { name, from } = formData;
    const message = `Subject: Expression of Interest in ${props.jobTitle}- 

    Hello Dear ,

    I hope this message finds you well.
    
    I came across your job posting for ${props.jobTitle} and I'm very interested in the opportunity to collaborate with you. The project seems like an exciting challenge that aligns perfectly with my skills and expertise. I have [mention relevant experience or skills] that I believe would contribute positively to the project's success.
    
    I would love to discuss further details, such as project requirements, timelines, and your vision for the final outcome. Additionally, if you have any specific questions or would like to see samples of my previous work, please feel free to ask.
    
    In the meantime, I've included my email below for easier communication:
    
    Email: ${fromemail}
    
    Looking forward to the possibility of working together!
    
    Best regards,
    ${name}`;

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
        to: props.email,
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
      toast.error("Failed to send Email");
    }
  };

  return (
    <div>
      <div className="jcontent">
        <h1>{props.jobTitle}</h1>
        <p>
          <strong>Budget</strong> {props.budget}
        </p>
        <p>{props.description}</p>
        <div className="jconlower">
          <ul>
            {Array.isArray(skill)
              ? skill.map((item, i) => <li key={i}>{item}</li>)
              : "h"}
          </ul>
        </div>
        <button className="jobbtn" onClick={handleClickOpen}>
          Contact
        </button>
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
                value={props.email}
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
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">
                  {" "}
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
      </div>
    </div>
  );
};

export default Jobcard;
