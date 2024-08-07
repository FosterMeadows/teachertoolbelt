import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import LessonPlanner from './components/LessonPlanner';
import GradeCalculator from './components/GradeCalculator';
import ToDo from './components/ToDo';
import Login from './components/Login';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthProvider } from './AuthProvider';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Teacher Toolbelt
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/lesson-planner">
                Lesson Planner
              </Button>
              <Button color="inherit" component={Link} to="/grade-calculator">
                Grade Calculator
              </Button>
              <Button color="inherit" component={Link} to="/to-do">
                To-Do List
              </Button>
             
             
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/lesson-planner"
              element={
                <PrivateRoute>
                  <LessonPlanner />
                </PrivateRoute>
              }
            />
            <Route
              path="/grade-calculator"
              element={
                <PrivateRoute>
                  <GradeCalculator />
                </PrivateRoute>
              }
            />
            <Route
              path="/to-do"
              element={
                <PrivateRoute>
                  <ToDo />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
