import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

const Diff = ({ beforeArr, afterArr }) => {
  const noDupesFound = beforeArr?.length === afterArr?.length;
  if (noDupesFound) return;
  const beforeResults = () => {
    return beforeArr?.length > 0 ? (
      beforeArr?.map((el, idx) => (
        <p className="all_csv_entries_existing" key={idx}>
          + {el.Names}
        </p>
      ))
    ) : (
      <p>+++</p>
    );
  };

  const afterResults = () => {
    return afterArr?.length > 0 ? (
      afterArr?.map((el, idx) => (
        <p className="all_csv_entries_removed" key={idx}>
          - {el}
        </p>
      ))
    ) : (
      <p>---</p>
    );
  };

  return (
    <div className="difference_display">
      <div className="before">
        <span>
          <IoMdAddCircle />
        </span>
        {beforeResults()}
      </div>
      <div className="after">
        <span>
          <RiDeleteBin5Fill />
        </span>
        {afterResults()}
      </div>
    </div>
  );
};

export default Diff;
