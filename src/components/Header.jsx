import React from "react";
import "./components.scss";

import { BiStar } from "react-icons/bi";
import { AiTwotoneBuild } from "react-icons/ai";

const Header = () => {
  return (
    <div className="Header">
      <div className="header_section1">
        <AiTwotoneBuild className="logo" /> CLEANREADER
      </div>
      <div className="header_section2">
        <a href="https://github.com/921Mdas/CleanReader">
          <span>STAR</span> ON <BiStar /> GITHUB
        </a>
      </div>
    </div>
  );
};

export default Header;
