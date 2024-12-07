import { Link } from "react-router-dom";
import "./Student.css"; // Link your CSS file
import image1 from "../main/images/image1.png";
import image2 from "../main/images/image2.png";
import image3 from "../main/images/image3.png";
import image4 from "../main/images/image4.png";

export default function StudentHome() {

  return (
    <div className="student-home">
      <br/>
      <center>
      <h1 className="heading">Upcoming Placement Drives</h1>
      </center>

      <div className="student-card-container">
        <div className="student-card">
          <img src={image1} alt="Google Logo" />
          <h3>Google</h3>
          <p>Position: Software Developer</p>
          <p>Date: 12th October 2024</p>
          <Link to="#">Learn More</Link>
        </div>
        <div className="student-card">
          <img src={image2} alt="TCS Logo" />
          <h3>TCS</h3>
          <p>Position: Data Analyst</p>
          <p>Date: 15th October 2024</p>
          <Link to="#">Learn More</Link>
        </div>
        <div className="student-card">
          <img src={image3} alt="Amazon Logo" />
          <h3>Amazon</h3>
          <p>Position: UI/UX Designer</p>
          <p>Date: 20th October 2024</p>
          <Link to="#">Learn More</Link>
        </div>
      </div>

      <center>
      <h1 className="heading">Visited Placement Drives</h1>
      </center>
      
      <div className="student-card-container">
        <div className="student-card">
          <img src={image4} alt="Infosys Logo" />
          <h3>Infosys</h3>
          <p>Position: UI/UX Designer</p>
          <p className="pending">Process: Pending!</p>
        </div>
      </div>
    </div>
  );
}
