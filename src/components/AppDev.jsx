import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/uiux.css";
import Prof from "./profile/Prof";

const AppDev = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    res();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const res = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/getApp");
      setData(result.data);
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="uiux">
      <h1>App Developers</h1>
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

export default AppDev;
