import React from "react";
import { Link } from "react-router-dom";
import "./Monnav.css";

export const Monnav = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Register</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/addproduct">dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
