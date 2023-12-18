import "../Styles/Footer.css";
import tm from "../Images/registered.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footerContainerContainer">
      <div className="footerContainer">
        <div>
          <p>Redundancy Productions Ltd.</p>
          <div>
            <img src={tm} alt="trademark"></img>
          </div>
        </div>
        <div>
          <p onClick={() => navigate("/about")}>About Us</p>
          <p onClick={() => navigate("/FAQs")}>FAQs</p>
        </div>
      </div>
    </div>
  );
}
