import "../index.scss";
import "../Pages/Home.scss";
import React from "react";

// components
import CustomButton from "../components/Button";
import InputArea from "../components/InputArea";
import UploadForm from "../components/UploadForm";

function Home() {
  return (
    <div className="Main_Container">
      <UploadForm />
    </div>
  );
}

export default Home;
