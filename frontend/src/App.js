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
import Samples from "./pages/jockes/Jockes.js";

function App() {
  const [alert, setAlert] = useState({});

  return (
    <AuthProvider className="bg-dark">
      <NavBar />
      {createPortal(<Alert alert={alert} setAlert={setAlert} />, document.body)}
      <Router>
        <Routes>
          <Route
            path="/releases"
            element={<Releases alert={alert} setAlert={setAlert} />}
          />
          <Route
            path="/tracks"
            element={<Tracks alert={alert} setAlert={setAlert} />}
          />
          <Route
            path="/test"
            element={<Samples alert={alert} setAlert={setAlert} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
