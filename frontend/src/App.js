import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import AuthForm from "./components/users/AuthForm";
import Users from "./components/users/Users";
import NavBar from "./pages/NavBar/NavBar";
import Releases from "./pages/releases/Releases";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/login" element={<AuthForm mode="login" />} />
          <Route exact path="/releases" element={<Releases />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
