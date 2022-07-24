import React from "react";
import "./components.scss";

const CustomButton = ({ types, val, handleSubmit }) => {
  return (
    <>
      <input
        type={types}
        value={val}
        onSubmit={e => handleSubmit(e)}
        className="submitbtn"
      />
    </>
  );
};

export default CustomButton;
