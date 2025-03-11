import "./App.css";
import { TopBar } from "./TopBar";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Root() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/TopBar" element={<TopBar />} />
        </Routes>
      </Router>
      ;
    </>
  );
}

export default Root;
