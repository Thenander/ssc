import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./components/users/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthForm mode="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
