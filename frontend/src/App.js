import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import AuthForm from "./components/users/AuthForm";
import Users from "./components/users/Users";
import NavBar from "./pages/NavBar/NavBar";
import ReleaseSwitcher from "./pages/releases/ReleaseSwitcher";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/releases" element={<ReleaseSwitcher />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
