import Jobcard from "./Jobcard";
import Postajob from "./Postajob";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/jobs.css";

const Jobs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    res();
  }, []);
  const res = async () => {
    try {
      const result = await axios("http://localhost:3000/api/getJobs");
      setData(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="jobs">
      <h1>Jobs</h1>
      <div className="jobcards">
        <div className="jobcard">
          {data.length > 0 ? (
            data.map((item, i) => (
              <Jobcard
                key={i}
                jobTitle={item.jobTitle}
                description={item.description}
                budget={item.budget}
                skills={item.skills[0].split(",")}
                email={item.email}
              />
            ))
          ) : (
            <Jobcard
              jobTitle="Web Developer - FreelanceConnect"
              budget="$200"
              description="I am looking for a freelance website with the following features:

             - Messaging and communication platform
             - Job posting and bidding system
             
             I have a timeline of 1-3 months for the completion of the website. 
             
             I am looking for a website that requires little to no customization. 
             
             Ideal skills and experience for this job include:
             
             - Proficiency in web development languages and frameworks
             - Experience in building messaging and communication platforms
             - Knowledge of job posting and bidding systems
             - Familiarity with payment processing systems
             
             If you have the necessary skills and can deliver the project within the specified timeline, please reach out to discuss further details."
              skills={["MongoDB", "Express.js", "React.js", "Node.js"]}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
