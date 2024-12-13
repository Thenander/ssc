import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createPortal } from "react-dom";
import Container from "react-bootstrap/Container";

import { AuthProvider } from "./contexts/AuthProvider";

import Alert from "./components/Alert/Alert.js";

import NavBar from "./pages/NavBar/NavBar";
import Start from "./pages/Start/Start.js";
import Releases from "./pages/Releases/Releases.js";
import Tracks from "./pages/Tracks/Tracks.js";
import Sources from "./pages/Sources/Sources.js";
import NotFound from "./pages/NotFound.js";
import AuthForm from "./components/users/AuthForm.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const CAN_EDIT = true;

function App() {
  const [alert, setAlert] = useState({});

  return (
    <AuthProvider>
      <NavBar />
      {createPortal(<Alert alert={alert} setAlert={setAlert} />, document.body)}
      <Router>
        <Container className="main">
          <Routes>
            <Route exact path="/" element={<Start />} />
            <Route
              path="/releases"
              element={<Releases setAlert={setAlert} canEdit={CAN_EDIT} />}
            />
            <Route
              path="/tracks"
              element={<Tracks setAlert={setAlert} canEdit={CAN_EDIT} />}
            />
            <Route
              path="/sources"
              element={<Sources setAlert={setAlert} canEdit={CAN_EDIT} />}
            />
            <Route
              path="/login"
              element={<AuthForm mode={"login"} setAlert={setAlert} />}
            />
            <Route path="*" exact={true} element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
