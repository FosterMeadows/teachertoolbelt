// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import LessonPlanner from "./components/LessonPlanner";
import GradeCalculator from "./components/GradeCalculator";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lesson-planner">Lesson Planner</Link>
            </li>
            <li>
              <Link to="/grade-calculator">Grade Calculator</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson-planner" element={<LessonPlanner />} />
          <Route path="/grade-calculator" element={<GradeCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
