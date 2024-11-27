import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createPortal } from "react-dom";

import { AuthProvider } from "./contexts/AuthProvider";

import Alert from "./components/Alert.js";

import NavBar from "./pages/NavBar/NavBar";
import Releases from "./pages/releases/Releases.js";
import Tracks from "./pages/tracks/Tracks.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

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
          <Route
            path="/releases"
            element={<Releases success={success} setSuccess={setSuccess} />}
          />
          <Route
            path="/tracks"
            element={<Tracks success={success} setSuccess={setSuccess} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
