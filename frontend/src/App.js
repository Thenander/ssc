import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import AuthForm from "./components/users/AuthForm";
import Users from "./components/users/Users";
import NavBar from "./pages/NavBar/NavBar";
import ReleaseSwitcher from "./pages/releases/ReleaseSwitcher";
import Alert from "./components/Alert.js";

function App() {
  const [success, setSuccess] = useState();
  return (
    <AuthProvider>
      <NavBar />
      <Alert
        type="success"
        message={success}
        onClose={() => setSuccess(null)}
      />
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route
            path="/releases"
            element={
              <ReleaseSwitcher success={success} setSuccess={setSuccess} />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
