import React from "react";
import { toast } from "react-toastify";

const Toast = (msg, msgType) => {
  return (
    <div>
      {toast(msg, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        type: msgType,
      })}
    </div>
  );
};

export default Toast;
