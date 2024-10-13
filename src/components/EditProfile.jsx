import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../css/freelanceform.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    country: "",
    about: "",
    skills: [],
    experience: "",
    category: "",
    project: "",
    image: null,
    imagename: "",
    imageUrl: "",
  });

  useEffect(() => {
    const getdata = async () => {
      try {
        const result = await axios(`http://localhost:3000/edit/${id}`);
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, [id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("country", data.country);
      formData.append("about", data.about);
      formData.append("skills", data.skills);
      formData.append("experience", data.experience);
      formData.append("category", data.category);
      formData.append("project", data.project);
      formData.append("image", data.image);

      // console.log(formData);
      const result = await axios.put(`http://localhost:3000/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(result);
      if (result) {
        toast.success("Updated SuccessFully~!!!!");
        setTimeout(() => {
          navigate("/Myprofile");
        }, 2000);
        // navigate("/Myprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="ep-h1"> Edit Your Freelance Profile</h1>
      <section className="fformsect f-up">
        <form className="freelanceupform" onSubmit={handleUpdateProfile}>
          <div className="fname">
            <TextField
              fullWidth
              label="Name"
              id="fullWidth"
              //   helperText="Please enter your Name"
              margin="dense"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              required
            />
          </div>

          <div className="fcat">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              id="demo-simple-fullwidth"
              value={data.category}
              label="Category"
              onChange={(e) => setData({ ...data, category: e.target.value })}
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
              value={data.skills}
              onChange={(e) => setData({ ...data, skills: e.target.value })}
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
              value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })}
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
              value={data.about}
              onChange={(e) => setData({ ...data, about: e.target.value })}
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
              value={data.project}
              onChange={(e) => setData({ ...data, project: e.target.value })}
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
                setData({ ...data, image: e.target.files[0] });
              }}
              required
            />
            <div className="selpimg">
              <img
                src={data.imageUrl}
                alt="Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
          </div>

          <input type="submit" value="Update" className="fbtnsub" />
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
