import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Api = ({ employees }) => {
  const [useData, setUseData] = useState();
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(resp => {
      setUseData(resp.data);
      return resp.data;
    });
  }, []);

  return (
    <div data-testid="api_content" style={{ display: "none" }}>
      {useData &&
        useData.map((el, idx) => {
          return (
            <div key={idx}>
              <h3>{el.name}</h3>
              <h3>{el.username}</h3>
              <h6>{employees}</h6>
            </div>
          );
        })}
    </div>
  );
};

export default Api;
