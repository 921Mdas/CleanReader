import React from "react";
import "./components.scss";
import { BsFillGearFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav_sec1"></div>
      <div className="nav_sec2">
        <div className="nav_subsec1">
          <p>Input</p>
          <h3>CSV</h3>
        </div>
        <div className="convert_icon">
          <BsFillGearFill color="white" className="convert_icon_el" />
        </div>
        <div className="nav_subsec2">
          <p>Output</p>
          <h3>TXT</h3>
        </div>
      </div>
      <div className="nav_sec3"></div>
    </div>
  );
};

export default Navbar;
