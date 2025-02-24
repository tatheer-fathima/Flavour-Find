import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => { // Use the prop directly
  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">
        <Link to="/">Flavour Find</Link>
      </div>
      
    </nav>
  );
};

export default Navbar;
