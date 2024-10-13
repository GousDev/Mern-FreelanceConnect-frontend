import "../css/footer.css";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer>
      <div className="foot-container">
        <div className="row">
          <div className="footer-col col-ab">
            <h2>About Us</h2>
            <div>
              <p>
                FreelanceConnect is the premier platform dedicated to bridging
                the gap between talented freelancers and businesses seeking
                their expertise. With a passion for fostering meaningful
                connections, we've created a dynamic space where freelancers can
                showcase their skills, and clients can discover the perfect
                match for their projects Our mission is to empower freelancers
                to thrive in the gig economy while simplifying the process for
                clients to find the right talent. We believe in the power of
                collaboration, innovation, and the endless possibilities that
                emerge when freelancers and clients connect. Join our vibrant
                community today, and experience the future of freelance
                collaboration with FreelanceConnect
              </p>
            </div>
          </div>
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="/AllFreelancer">Freelancers</a>
              </li>
              <li>
                <a
                  href="/jobs
                "
                >
                  Jobs
                </a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              {/* <li>
                <a href="#">affiliate program</a>
              </li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.6,
                duration: 1,
              }}
              className="social-links"
            >
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ y: 800 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", delay: 0.3, duration: 0.6 }}
        >
          <hr />
          <p className="copyright">
            &copy;2023 FreelanceConnect | All Rights Reserved
          </p>
        </motion.div>
        {/* <hr />
        <p className="copyright">
          &copy;2023 FreelanceConnect | All Rights Reserved
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
