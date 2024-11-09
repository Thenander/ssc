import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./components/users/AuthForm";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthForm mode="login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
