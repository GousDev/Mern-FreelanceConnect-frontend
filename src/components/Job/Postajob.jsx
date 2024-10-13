import "../../css/postajob.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import TextField from "@mui/material/TextField";

const Postajob = () => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [email, setEmail] = useState("");

  const nextStep = () => {
    if (step === 1 && jobTitle === "") {
      // toast.error('JobTitle is required required');
      return;
    }
    if (step === 2 && (skills.length === 0 || description === "")) {
      // toast.error('Description and Skills are required');
      return;
    }
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jobTitle") {
      setJobTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "budget") {
      setBudget(value);
    } else if (name === "skills") {
      setSkills(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handlejobpost = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/postJob", {
        jobTitle,
        budget,
        description,
        skills,
        email,
      });
      if (result.data.success == true) {
        toast.success(result.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong", error);
    }
  };

  return (
    <section className="postajobsect">
      <h1>Post a Job</h1>
      <form onSubmit={handlejobpost}>
        {step === 1 && (
          <div className="step1 pstep">
            <h2>Step 1: Enter Your Job Title</h2>
            <TextField
              fullWidth
              label="Job Title"
              id="fullWidth"
              helperText="Please enter Title for your Job "
              margin="dense"
              name="jobTitle"
              value={jobTitle}
              onChange={handleChange}
              placeholder="Give a Title what you want"
              required
            />
            <button onClick={nextStep} className="nxtbtn">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step2 pstep">
            <h2>Step 2: Enter Description and Skills</h2>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={8}
              name="description"
              value={description}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Skills"
              id="fullWidth"
              helperText="Please describe your languages"
              margin="dense"
              name="skills"
              value={skills}
              onChange={handleChange}
              required
            />
            <div className="btns">
              <button onClick={previousStep} className="prebtn">
                {" "}
                Previous{" "}
              </button>
              <button onClick={nextStep} className="nxtbtn">
                {" "}
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step3 pstep">
            <h2>Step 3: Enter your Budget & Email</h2>
            <TextField
              fullWidth
              label="Job Budget"
              id="fullWidth"
              helperText="Please enter  your Budget "
              margin="dense"
              name="budget"
              value={budget}
              onChange={handleChange}
              placeholder=" $ 2000"
              required
            />
            <TextField
              fullWidth
              label="Email for Contact"
              id="fullWidth"
              helperText="Please enter  your Email id "
              margin="dense"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder=" must contain @gmail.com"
              required
            />
            <div className="btns">
              <button onClick={previousStep} className="prebtn">
                {" "}
                Previous{" "}
              </button>
              <button type="submit" className="nxtbtn">
                {" "}
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default Postajob;
