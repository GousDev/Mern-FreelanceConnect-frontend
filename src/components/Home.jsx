import "../css/home.css";
import "../App.css";
import "../css/categories.css";
import "animate.css";
import Categories from "./Categories";
import Freelancer from "./Freelancer";
import Testimonial from "./Testimonial";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="main-section"
      >
        <div className="main-content tb">
          <motion.p
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", delay: 0.5, duration: 0.5 }}
            className="animate__lightSpeedInLeft"
          >
            {" "}
            "<b>W</b>elcome to FreelanceConnect - Where Talent Meets
            Opportunity. Discover top freelancers or showcase your skills to
            find your next project. Join our community and start collaborating
            today!"
          </motion.p>
          <a
            href="#"
            className="m-btn tw "
            onClick={() => {
              navigate("/AllFreelancer");
            }}
          >
            Hire a Freelancer
          </a>
          <p>OR</p>
          <a
            href=""
            className="m-btn m-btn1 tw"
            onClick={() => {
              navigate("/Postajob");
            }}
          >
            Post a Job
          </a>
        </div>
      </motion.section>
      <Categories />
      <Freelancer />
      <Testimonial />
    </>
  );
};
export default Home;
