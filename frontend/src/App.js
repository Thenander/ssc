import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./components/users/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
