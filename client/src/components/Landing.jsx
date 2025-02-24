import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css"; // Import the CSS file


const LandingPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page-container">
      <div className="text-container">
        <h1>Welcome to Flavour Find</h1>
        <p>
          Whether you're craving a specific dish or looking for local hotspots, we've got you covered!
        </p>
        <button onClick={goToHome}>Explore Here</button>
      </div>
      <div className="image-container">
      </div>
    </div>
  );
};

export default LandingPage;
