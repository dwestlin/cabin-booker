import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TheHeader from "./components/TheHeader";
import Home from "./views/Home";
import Login from "./views/Login";
import AdminBoard from "./views/AdminBoard";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <Router>
        <TheHeader />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={loggedInUser}>
                  <AdminBoard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
