import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Restaurants.css";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const location = useLocation();
  const history = useNavigate(); 

  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (searchQuery !== searchTerm) {
      setSearchTerm(searchQuery);  
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        let url = `https://restaurant-finder123.onrender.com/api/restaurants?page=${page}&limit=20`;
        if (searchTerm) {
          url += `&search=${searchTerm}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setRestaurants(data.restaurants || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, searchTerm]); 

  const filteredRestaurants = useMemo(() => {
    if (!searchTerm) return restaurants;
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisines.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [restaurants, searchTerm]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return "rating-green";
    if (rating >= 3) return "rating-yellow";
    if (rating >= 2) return "rating-orange";
    return "rating-red";
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    history({ search: params.toString() });
  };

  return (
    <div className="restaurant-container">
      <h1 className="restaurantt-title">Restaurant List</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search restaurants by name or cuisine..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* Restaurant Grid */}
          <div className="restaurant-grid">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id || restaurant.name} className="restaurant-card">
                  
                  {/* Image */}
                  <img 
                    src={restaurant.featured_image || restaurant.thumb || "https://placekitten.com/150/150"} 
                    alt={restaurant.name} 
                    className="restaurantt-image"
                  />

                  {/* Restaurant Details */}
                  <div className="restaurant-info">
                    <h2 className="restaurant-name">{restaurant.name || "Unnamed Restaurant"}</h2>
                    <p className="restaurant-location">{restaurant.location?.city || "Unknown City"}</p>
                    <p className="restaurant-cost">Avg Cost: Rs. {restaurant.average_cost_for_two || "N/A"}</p>

                    {/* Rating */}
                    <div className="restaurant-rating">
                      <span className={`rating-badge ${getRatingColor(restaurant.user_rating?.aggregate_rating)}`}>
                        ⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}
                      </span>
                      <span className="rating-votes">({restaurant.user_rating?.votes || 0} votes)</span>
                    </div>

                    {/* View Details Button */}
                    <Link to={`/restaurant/${restaurant.id}`} className="view-details">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No restaurants found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="pagination-btn">
              Previous
            </button>
            <span className="pagination-text">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="pagination-btn">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantsList;
