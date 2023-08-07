import React from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import "./styles.css";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <HomePage />
      </div>
    </Router>
  );
}
