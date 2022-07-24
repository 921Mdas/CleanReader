import "./index.scss";
import "./mobile.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// how to upload an excell file

import Home from "./Pages/Home";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="Layout">
      <ToastContainer />
      <Header />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
