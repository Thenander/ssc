import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import AuthForm from "./components/users/AuthForm";
import Users from "./components/users/Users";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/" element={<AuthForm mode="login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
