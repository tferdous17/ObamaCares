import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ setHide }) => {
  return (
    <div className="top-navbar">
      <FontAwesomeIcon
        onClick={() => {
          setHide(true);
        }}
        icon={faTv}
        className="icon"
      />
      <h2>
        Health | <span>ObamaCares</span>
      </h2>
      <FontAwesomeIcon icon={faSearch} className="icon" />
    </div>
  );
};

export default TopNavbar;
