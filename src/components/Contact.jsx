import styles from "../css/contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faL,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className={styles.contactsect}>
      <div className={styles["section-header"]}>
        <div className={styles.container1}>
          <h2>Contact Us</h2>
          <p>
            Fill up the form and our team will get back to you within 24 hours{" "}
          </p>
        </div>
      </div>

      <div className={styles.container1}>
        <div className={styles.row}>
          <div className={styles["contact-info"]}>
            <div className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon tw"]}>
                <FontAwesomeIcon
                  icon={faLocation}
                  className={styles["contact-info-icon"]}
                />
              </div>

              <div className={styles["contact-info-content"]}>
                <h4>Address</h4>
                <p>
                  4671 Sugar Camp Road,
                  <br /> Owatonna, Minnesota, <br />
                  55060
                </p>
              </div>
            </div>

            <div className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon tw"]}>
                <FontAwesomeIcon
                  icon={faPhone}
                  className={styles["contact-info-icon"]}
                />
              </div>

              <div className={styles["contact-info-content"]}>
                <h4>Phone</h4>
                <p>+91 8928065925</p>
              </div>
            </div>

            <div className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon tw"]}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles["contact-info-icon"]}
                />
              </div>

              <div className={styles["contact-info-content"]}>
                <h4>Email</h4>
                <p>freelanceconnect@gmail.com</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ x: 1800 }}
            animate={{ x: 0, rotate: [1, 3, 5, 5, 3, 1] }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className={styles["contact-form"]}
          >
            <form action="" id={styles["contact-form"]}>
              <h2>Send Message</h2>
              <div className={styles["input-boxx"]}>
                <input type="text" required name="" />
                <span>Full Name</span>
              </div>

              <div className={styles["input-boxx"]}>
                <input type="email" required name="email" />
                <span>Email</span>
              </div>

              <div className={styles["input-boxx"]}>
                <textarea required name="message"></textarea>
                <span>Type your Message...</span>
              </div>

              <div className={styles["input-boxx"]}>
                <input type="submit" value="Send" name="" />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
