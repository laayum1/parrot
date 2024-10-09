// frontend/src/components/DropdownContents/ResourcesDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./DropdownContents.css";

const ResourcesDropdown = () => {
  return (
    <div className="dropdown-content">
      <Link to="/resources/terms">Terms of Service</Link>
      <Link to="/resources/privacy">Privacy Policy</Link>
      <Link to="/resources/downloads">Downloads</Link>
      <Link to="/resources/blog">Blog</Link>
    </div>
  );
};

export default ResourcesDropdown;
