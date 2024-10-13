import "../css/categories.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const navigate = useNavigate();
  const handleUIUX = () => {
    navigate("/UiUx");
  };

  const handleApp = () => {
    navigate("/AppDev");
  };

  const handleWeb = () => {
    navigate("/WebDev");
  };

  return (
    <section className="category-section">
      <h1 className="ctgh">Most Popular Categories</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 0.9, 0.9, 0.9, 1] }}
        transition={{ type: "spring", delay: 0.5, duration: 1 }}
        className="categories"
      >
        <div className="category ct1" onClick={handleWeb}>
          <img src="/Images/weblogo.png" className="webimg" alt="Web" />
          <div className="ctg-text">
            <h2>Web Developer</h2>
          </div>
        </div>
        <div className="category ct2" onClick={handleUIUX}>
          <img src="/Images/uilogo.png" className="uiuximg" alt="UI/UX" />
          <div className="ctg-text">
            <h2>UI/UX Designers</h2>
          </div>
        </div>
        <div className="category ct3" onClick={handleApp}>
          <img src="/Images/applogo.png" className="appimg" alt="App" />
          <div className="ctg-text">
            <h2>App Developer</h2>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Categories;
