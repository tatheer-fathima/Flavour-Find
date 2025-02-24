// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import RestaurantsList from "./components/Restaurants";
// import Rdetails from "./components/Rdetails";
// import LocationSearch from "./components/LocationSearch";
// import ImageSearch from "./components/ImageSearch";
// import Navbar from "./components/Navbar"; // Import Navbar

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="dark:bg-gray-1500 dark:text-white min-h-screen w-full flex flex-col transition-colors duration-300">
//         <Navbar /> {/* Navbar added here */}
//         <div className="flex flex-col items-center justify-center p-5">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/restaurants" element={<RestaurantsList />} />
//             <Route path="/restaurant/:id" element={<Rdetails />} />
//             <Route path="/restaurants/location" element={<LocationSearch />} />
//             <Route path="/restaurants/imgsearch" element={<ImageSearch />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RestaurantsList from "./components/Restaurants";
import Rdetails from "./components/Rdetails";
import LocationSearch from "./components/LocationSearch";
import ImageSearch from "./components/ImageSearch";
import Navbar from "./components/Navbar"; // Import Navbar
import LandingPage from "./components/Landing"; // Import LandingPage

const App = () => {
  return (
    <BrowserRouter>
      <div className="dark:bg-gray-1500 dark:text-white min-h-screen w-full flex flex-col transition-colors duration-300">
        {/* Navbar should not appear on LandingPage, but appear on Home and other pages */}
        <Navbar /> 
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Show LandingPage at / */}
          <Route path="/home" element={<Home />} /> {/* Home page */}
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurant/:id" element={<Rdetails />} />
          <Route path="/restaurants/location" element={<LocationSearch />} />
          <Route path="/restaurants/imgsearch" element={<ImageSearch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
