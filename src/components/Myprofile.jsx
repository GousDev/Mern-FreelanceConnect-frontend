import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/myprofile.css";
import Prof from "./profile/Prof";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

const Myprofile = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, SetDob] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [freelanceId, setFreelanceId] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const isOwnFreelanceProfile = true;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const logincheck = async () => {
        const result = await axios.get(`http://localhost:3000/check/${userId}`);
        setData(result.data.result);
        setUname(result.data.result.name || "");
        setEmail(result.data.result.email || "");
        setFullname(result.data.result.fullname || "");
        setPhone(result.data.result.phone || "");
        setGender(result.data.result.gender || "");
        SetDob(result.data.result.dob || "");
        setImageUrl(result.data.result.imageUrl || "");
        // console.log(result);
        // console.log(result.data.result.imageUrl);
      };
      logincheck();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    const storedFreelanceId = localStorage.getItem("freelanceId");
    if (storedFreelanceId) {
      setFreelanceId(storedFreelanceId);
    }
  }, []);

  useEffect(() => {
    if (freelanceId) {
      const fetchProfileData = async () => {
        try {
          const result = await axios.get(
            `http://localhost:3000/freelancerCheck/${freelanceId}`
          );
          // console.log(result);
          setProfileData(result.data.freelancer);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [freelanceId]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true); //start loading
    try {
      const formData = new FormData();
      formData.append("id", data._id);
      formData.append("image1", image);

      // Logging formData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const result = await axios.post(
        "http://localhost:3000/uploadProfileImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.data.success) {
        console.log("Image uploaded successfully:", result);
        toast.success("User Pic updated");
        setTimeout(() => {
          window.location.href = " ";
        }, 2000);
      } else {
        console.error("Image upload failed:", result.data);
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", data._id);
      formData.append("fullname", fullname);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("dob", dob);

      const result = await axios.post(
        "http://localhost:3000/api/profile",

        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.data.success == true) {
        // console.log(result.data);
        toast.success(result.data.message);
        setTimeout(() => {
          window.location.href = " ";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong????");
    }
  };

  // const handleEdit = (id) => {
  //   navigate(`/Editprofile/${id}`);
  // };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:3000/delete/${id}`);
      console.log(result);
      setProfileData(null);
      if (localStorage.getItem("freelanceId")) {
        localStorage.removeItem("freelanceId");
      }
      window.location.href = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          {" "}
          <CircularProgress size={50} color="primary" />
        </div>
      ) : (
        <div className="mp-main">
          <h1>
            <i className="fa-regular fa-address-card"></i> Profile Details
          </h1>
          <hr />

          <div className="profile">
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", delay: 1, duration: 0.5 }}
              className="img"
            >
              <form onSubmit={handleFileUpload}>
                <div className="img-con">
                  {imageUrl ? (
                    <img src={imageUrl} alt="" />
                  ) : (
                    <img src="/Images/profilepic2.jpg" alt="Default" />
                  )}
                </div>
                <input
                  name="userpic"
                  type="file"
                  accept="image/*"
                  className="img-in"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <button className="up-img-btn">
                  <i className="fa-solid fa-upload"></i> upload
                </button>
              </form>
            </motion.div>

            {data && (
              <>
                <div className="profile-form">
                  <div className="p-div">
                    <label htmlFor="">UserName</label>
                    <br />
                    <input
                      type="text"
                      className="p-inputs"
                      value={uname}
                      onChange={(e) => {
                        setUname(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div className="p-div">
                    <label htmlFor="">Gmail</label>
                    <br />
                    <input
                      type="text"
                      className="p-inputs"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <br />

                  <div className="p-div">
                    <label htmlFor="">Full Name</label>
                    <br />
                    <input
                      type="text"
                      className="p-inputs"
                      placeholder="Enter your Full Name"
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div className="p-div">
                    <label htmlFor="">Phone</label>
                    <br />
                    <input
                      type="text"
                      className="p-inputs"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div className="p-div">
                    <label htmlFor="">Gender</label>
                    <br />
                    <select
                      className="p-inputs"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <br />

                  <div className="p-div">
                    <label htmlFor="">Date of Birth</label>
                    <br />
                    <input
                      type="date"
                      name=""
                      id=""
                      className="p-inputs"
                      value={dob}
                      onChange={(e) => {
                        SetDob(e.target.value);
                      }}
                    />
                  </div>
                  <button className="p-btn" onClick={handleProfile}>
                    {" "}
                    Update
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="fc-jp">
            <div className="mpfc">
              <h2>
                <i className="fa-solid fa-user"></i> Freelance profile
              </h2>
              <span>
                <hr />
              </span>
              <div>
                {profileData ? (
                  <div className="mpfc-c">
                    <Prof
                      name={profileData.name}
                      country={profileData.country}
                      skills={profileData.skills[0].split(",")}
                      category={profileData.category}
                      experience={profileData.experience}
                      project={profileData.project}
                      about={profileData.about}
                      imageUrl={profileData.imageUrl}
                      isOwnFreelanceProfile={isOwnFreelanceProfile}
                      id={profileData._id}
                      email={email}
                    />
                    <div className="mpfc-btn">
                      {/* <button onClick={() => handleEdit(profileData._id)}>
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ color: "#080ed4" }}
                        ></i>
                      </button> */}
                      <button
                        onClick={() => {
                          handleDelete(profileData._id);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "#db0000" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      navigate("/Freelanceform");
                    }}
                  >
                    <p className="fct">
                      Create your freelance profile{"  "}
                      <i className="fa-solid fa-user-plus"></i>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mpjp">
              <h2>
                <i className="fa-solid fa-briefcase"></i> Jobs Posted
              </h2>
              <span>
                <hr />
              </span>
              <p className="pjt" onClick={() => navigate("/Postajob")}>
                Post a Job{"  "}
                <i className="fa-solid fa-circle-plus"></i>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Myprofile;
