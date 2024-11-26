import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import AuthForm from "./components/users/AuthForm";
import Users from "./components/users/Users";
import NavBar from "./pages/NavBar/NavBar";
import Releases from "./pages/releases/Releases.js";
import Alert from "./components/Alert.js";
import { createPortal } from "react-dom";
import "./index.scss";
import {} from "./App.module.scss";

function App() {
  const [success, setSuccess] = useState();
  return (
    <AuthProvider className="bg-dark">
      <NavBar />
      {createPortal(
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />,
        document.body
      )}
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route
            path="/releases"
            element={<Releases success={success} setSuccess={setSuccess} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
