import React, { useEffect, useState } from "react";
import Prof from "./profile/Prof";
import axios from "axios";
import "../css/allfreelancer.css";

const AllFreelancer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    res();
  }, []);

  const res = async () => {
    try {
      const result = await axios("http://localhost:3000/getAll");
      console.log(result);
      setData(result.data);
      console.log(result.data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="allf">
      <h1>Freelancers</h1>
      <div className="allfp">
        {data.length > 0 ? (
          data.map((item, i) => (
            <Prof
              key={i}
              name={item.name}
              country={item.country}
              skills={item.skills[0].split(",")}
              category={item.category}
              experience={item.experience}
              project={item.project}
              about={item.about}
              imageUrl={item.imageUrl}
              id={item._id}
              email={item.email}
            />
          ))
        ) : (
          <Prof
            imageUrl="/Images/pic-2.jpeg"
            name="Gous Shaikh"
            country="Mumbai/India"
            skills={["Javascript", "React.js", "Python"]}
            category="Web Developer"
            experience="My expertise includes front-end and back-end development, with a strong track record of delivering projects on time and exceeding client expectations."
            project="Travel Website"
            about="Hello, I'm Muhammed Gous, a passionate freelance developer with over 2 years of experience in the world of web development. My journey in this field has been driven by my love for creating digital experiences that not only work seamlessly but also captivate and engage users.

                  My expertise lies in Javascript, and I offer a range of services, including Frontend and backend Web development. What sets me apart is my commitment to understanding each client's unique needs and crafting tailored solutions that drive real results.
                  I'm excited to collaborate with you and transform your ideas into reality. Let's get started to achieve your goals together. Feel free to Contact me for a chat or to explore how we can work together"
          />
        )}
      </div>
    </section>
  );
};

export default AllFreelancer;
