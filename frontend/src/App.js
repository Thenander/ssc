import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createPortal } from "react-dom";

import { AuthProvider } from "./contexts/AuthProvider";

import Alert from "./components/Alert.js";

import NavBar from "./pages/NavBar/NavBar";
import Releases from "./pages/releases/Releases.js";
import Tracks from "./pages/tracks/Tracks.js";
import NotFound from "./pages/NotFound.js";
import AuthForm from "./components/users/AuthForm.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const CAN_EDIT = true;

function App() {
  const [alert, setAlert] = useState({});

  return (
    <AuthProvider className="bg-dark">
      <NavBar />
      {createPortal(<Alert alert={alert} setAlert={setAlert} />, document.body)}
      <Router>
        <main>
          <Routes>
            <Route
              path="/releases"
              element={<Releases setAlert={setAlert} canEdit={CAN_EDIT} />}
            />
            <Route
              path="/tracks"
              element={<Tracks setAlert={setAlert} canEdit={CAN_EDIT} />}
            />
            <Route
              path="/login"
              element={<AuthForm mode={"login"} setAlert={setAlert} />}
            />
            <Route path="*" exact={true} element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
