import React, { useEffect, useState } from "react";
import axios from "axios";
import Prof from "./profile/Prof";
import "../css/uiux.css";

const UiUx = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    res();
    // emailget();
  }, []);

  const res = async () => {
    try {
      const result = await axios("http://localhost:3000/api/getuiux");
      setData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const emailget = async () => {
  //   try {
  //     const result = await axios(`http://localhost:3000/check/${userId}`);
  //     setEmail(result.data.result.email);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="uiux">
      <h1>UiUx Designers</h1>
      <div className="profiles">
        <div className="profile">
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
            <h2> No Freelancer Available here</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default UiUx;
