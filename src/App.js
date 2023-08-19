import React from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import "./styles.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" component={HomePage} />
        </Routes>
        <HomePage />
      </div>
    </Router>
  );
}
