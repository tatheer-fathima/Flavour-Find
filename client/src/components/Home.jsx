import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaLocationArrow, FaCamera, FaList } from "react-icons/fa";
import "./Home.css"; // Importing the CSS file

const Home = () => {
  const [search, setSearch] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(100);
  const [theme, setTheme] = useState("light");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/restaurants?query=${search.trim()}`);
    } else {
      navigate("/restaurants");
    }
  };

  const handleLocationSearch = () => {
    if (latitude && longitude) {
      navigate(`/restaurants/location?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    }
  };

  const handleGeoLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          navigate(`/restaurants/location?lat=${latitude}&lng=${longitude}&radius=${radius}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please grant location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleImageSearch = () => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        navigate("/restaurants/imgsearch", { state: { image: base64Image } });
      };
      reader.readAsDataURL(image);
    } else {
      alert("Please upload an image before searching.");
    }
  };

  const handleViewAll = () => {
    setSearch("");
    navigate("/restaurants");
  };

  return (
    <div className={`home-container ${theme}`}>
      <motion.h1 className="title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Find Your Favorite Restaurants 🍽️
      </motion.h1>

      {/* Search Bar (on top) */}
      <motion.div className="search-box" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <input type="text" placeholder="Search by Name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
        <button onClick={handleSearch}><FaSearch /></button>
      </motion.div>

      {/* Location and Image Search (Side by Side) */}
      <motion.div className="location-image-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <div className="location-box">
          <input type="text" placeholder="Enter Latitude..." value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <input type="text" placeholder="Enter Longitude..." value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          <input type="number" placeholder="Enter Radius in km..." value={radius} onChange={(e) => setRadius(e.target.value)} />
          <button onClick={handleLocationSearch}><FaSearch /> Search Nearby</button>
          <button onClick={handleGeoLocationSearch}><FaLocationArrow /> Use My Location</button>
        </div>

        <div className="image-box">
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={handleImageSearch}><FaCamera /> Search by Image</button>
        </div>
      </motion.div>

      {/* View All Restaurants Button */}
      <button className="view-all" onClick={handleViewAll}><FaList /> View All Restaurants</button>
    </div>
  );
};

export default Home;
