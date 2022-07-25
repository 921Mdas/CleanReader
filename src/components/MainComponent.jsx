import React from "react";
import "./components.scss";
import DupeRemover from "./DupeRemover";

// additional functions can be added as components here
// render components on toggle
const MainComponent = () => {
  return (
    <div>
      <DupeRemover />
    </div>
  );
};

export default MainComponent;
