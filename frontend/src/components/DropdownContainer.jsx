// frontend/src/components/DropdownContainer.jsx
import React from "react";
import PropTypes from "prop-types";
import "./DropdownContainer.css";

const DropdownContainer = ({ direction, animatingOut, duration, children }) => {
  return (
    <div
      className={`dropdown-container ${direction}`}
      style={{
        animation: animatingOut
          ? `fadeOut ${duration}ms forwards`
          : `fadeIn ${duration}ms forwards`,
      }}
    >
      {children}
    </div>
  );
};

DropdownContainer.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
  animatingOut: PropTypes.bool,
  duration: PropTypes.number,
  children: PropTypes.node,
};

DropdownContainer.defaultProps = {
  direction: "right",
  animatingOut: false,
  duration: 300,
};

export default DropdownContainer;
