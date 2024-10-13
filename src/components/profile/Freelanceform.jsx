import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "../../css/Freelanceform.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const Freelanceform = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("App Developer");
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [project, setProject] = useState("");
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [email, setEmail] = useState("");

  const handleFreelanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("country", country);
      formData.append("category", category);
      formData.append("skills", skills);
      formData.append("about", about);
      formData.append("experience", experience);
      formData.append("project", project);
      formData.append("email", email);
      formData.append("image", image);

      const result = await axios.post(
        "http://localhost:3000/api/freelancerform",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      if (!email.includes("@") || !email.endsWith("gmail.com")) {
        toast.error("Please enter a valid Gmail address");
        return;
      }
      if (result.data.success == true) {
        toast.success(result.data.message);
        localStorage.setItem("freelanceId", result.data.result.freelancerId);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        // localStorage.setItem("freelanceId", result.data.result.freelancerId);
      }
    } catch (error) {
      toast.error("Something went Wrong", error);
    }
  };

  return (
    <section className="fformsect">
      <div className="fimg">
        <img src="/Images/Transhumans - New Beginnings.png" alt="" />
      </div>
      <form onSubmit={handleFreelanceSubmit} className="freelanceform">
        <h1>Create Your Freelancer Profile</h1>
        <div className="fname">
          <TextField
            fullWidth
            label="Name"
            id="fullWidth"
            helperText="Please enter your Name"
            margin="dense"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="fcountry">
          <TextField
            fullWidth
            label="Country"
            id="fullWidth"
            helperText="Please enter your Country name"
            placeholder="eg. Mumbai/India"
            margin="dense"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="fcat">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            id="demo-simple-fullwidth"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Ui/Ux">Ui/Ux{""}Designer</MenuItem>
            <MenuItem value="App Developer">App{""}Developer</MenuItem>
            <MenuItem value="Web Developer">Web{""}Developer</MenuItem>
          </Select>
        </div>

        <div className="fskill">
          <TextField
            fullWidth
            label="Skills"
            id="fullWidth"
            helperText="Please mention your Skills"
            margin="dense"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        <div className="fexp">
          <TextField
            fullWidth
            label="Experience"
            id="fullWidth"
            helperText="Please enter your Experience"
            margin="dense"
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>

        <div className="fabout">
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="About"
            multiline
            rows={4}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <div className="fproj">
          <TextField
            fullWidth
            label="Project [Links]"
            id="fullWidth"
            helperText="Please enter your project links"
            margin="dense"
            onChange={(e) => setProject(e.target.value)}
            required
          />
        </div>
        <div className="femail">
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            helperText="Please enter your Email for contact"
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="fprofimg">
          <TextField
            label="Upload Profile Picture"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              accept: "image/*",
            }}
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreviewURL(URL.createObjectURL(e.target.files[0]));
              console.log(setPreviewURL);
            }}
            required
          />
          {image && (
            <div className="selpimg">
              <img
                src={previewURL}
                alt="Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
          )}
        </div>

        <input type="submit" value="Submit" className="fbtnsub" />
      </form>
    </section>
  );
};

export default Freelanceform;
