// frontend/src/components/DropdownContents/DevelopersDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./DropdownContents.css";

const DevelopersDropdown = () => {
  return (
    <div className="dropdown-content">
      <Link to="/developers/documentation">Documentation</Link>
      <Link to="/developers/portal">Developer Portal</Link>
      <Link to="/developers/guides">Guides</Link>
    </div>
  );
};

export default DevelopersDropdown;
