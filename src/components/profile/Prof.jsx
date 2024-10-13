import "../../css/prof.css";
import { useNavigate } from "react-router-dom";

const Prof = (props) => {
  let skill = props.skills;

  console.log(props);

  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-image">
        <img src="/Images/App developer.jpg" alt="" />
      </div>
      <div className="profile-image">
        <img src={props.imageUrl} alt="" />
      </div>
      <div className="card-content">
        <h2>{props.name}</h2>
        <p>{props.category}</p>
      </div>

      <ul className="icons">
        {Array.isArray(skill)
          ? skill.map((item, i) => <li key={i}>{item}</li>)
          : "h"}
      </ul>
      <button
        onClick={() => navigate(`/ProfInfo/${props.id}`, { state: props })}
        className="vpbtn"
      >
        View Profile
      </button>
    </div>
  );
};

export default Prof;
