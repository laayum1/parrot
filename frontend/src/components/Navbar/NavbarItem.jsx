// frontend/src/components/Navbar/NavbarItem.jsx
import React from "react";
import PropTypes from "prop-types";
import "./NavbarItem.css";

const NavbarItem = ({ title, index, onMouseEnter, children }) => {
  return (
    <li
      className="navbar-item"
      onMouseEnter={() => onMouseEnter(index)}
    >
      {title}
      {children}
    </li>
  );
};

NavbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default NavbarItem;
