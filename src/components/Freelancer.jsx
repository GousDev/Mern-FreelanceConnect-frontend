import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/freelancer.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Freelancer = () => {
  const [freelanceId, setFreelanceID] = useState("not");
  const navigate = useNavigate();

  useEffect(() => {
    const fid = localStorage.getItem("freelanceId");
    setFreelanceID(fid || "");
  }, []);

  const freelancerCheck = async () => {
    try {
      if (freelanceId !== "") {
        toast.error("You already have a freelance id !!!!");
        setTimeout(() => {
          // navigate("/Myprofile");
        }, 2000);
        navigate("/Myprofile");
      } else {
        navigate("/Freelanceform");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = () => {
    freelancerCheck();
  };

  return (
    <section className="freelancer">
      <div className="fl-main">
        <h2>Freelancers</h2>
        <div className="fl-content">
          <h1 className="fl-heading">Embrace The FreeLance revolution</h1>
          <p>
            There's never been a better time to take yourself online and start
            making money from your very own fine-tuned set of skills
          </p>
          <p>
            Work wherever suits you, choose full-time, part-time or flexi-time.
            On FreelanceConnect you remain in control of everything — including
            your price based on customers.
          </p>
          <a href="" className="fl-btn" onClick={handleForm}>
            JOIN AS A FREELANCER
          </a>
        </div>
      </div>
      <div className="fl-img"></div>
    </section>
  );
};

export default Freelancer;
