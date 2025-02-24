import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LocationSearch.css"; // External CSS

const LocationSearch = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(100);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const rad = searchParams.get("radius") || 100;

    if (lat && lng) {
      setLatitude(lat);
      setLongitude(lng);
      setRadius(rad);
      fetchRestaurants(lat, lng, rad);
    }
  }, [searchParams]);

  const fetchRestaurants = async (lat, lng, radius) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://restaurant-finder123.onrender.com/api/location?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "rating-green";
    if (rating >= 4.0) return "rating-yellow";
    if (rating >= 3.5) return "rating-orange";
    return "rating-red";
  };

  return (
    <div className="container">
      <motion.h1
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Restaurants Around You 🌎
      </motion.h1>

      {loading ? (
        <motion.div className="loading-text">Loading...</motion.div>
      ) : (
        <motion.div className="restaurant-grid">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <motion.div
                key={restaurant.restaurant.id}
                className="restaurant-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {restaurant.restaurant.featured_image ? (
                  <motion.img
                    src={restaurant.restaurant.featured_image}
                    alt={restaurant.restaurant.name}
                    className="restaurant-image"
                  />
                ) : (
                  <div className="no-image">No image available</div>
                )}
                <div className="restaurant-details">
                  <h2 className="restaurant-name">{restaurant.restaurant.name}</h2>
                  <p className="restaurant-address">{restaurant.restaurant.location.address}</p>
                  <div className="restaurant-rating">
                    <span className={`rating-badge ${getRatingColor(restaurant.restaurant.user_rating?.aggregate_rating)}`}>
                      ⭐ {restaurant.restaurant.user_rating?.aggregate_rating || "N/A"}
                    </span>
                    <span className="rating-votes">
                      ({restaurant.restaurant.user_rating?.votes || 0} votes)
                    </span>
                  </div>
                  <Link to={`/restaurant/${restaurant.restaurant.id}`} className="view-details">
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div className="no-results">No restaurants found within {radius} km.</motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LocationSearch;
