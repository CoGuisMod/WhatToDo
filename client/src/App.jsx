import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Context import */
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";

/* Header import */
import Header from "./components/Header";

/* Home page imports */
import HomePage from "./pages/HomePage";

/* Log In page imports */
import LogInPage from "./pages/AuthPage/LogIn";
import SignUpPage from "./pages/AuthPage/SignUp";

/* Workspace page imports */
import WorkspacePage from "./pages/WorkspacePage";

/* Footer page imports */
import Footer from "./components/Footer";

/* Protected routes imports */
import NoLogged from "./protectedRoutes/NoLogged";
import Logged from "./protectedRoutes/Logged";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Header />
        {/* {window.location.pathname === "/workspace" ? null : <Header />} */}
        <DataContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/login"
              element={
                <Logged>
                  <LogInPage />
                </Logged>
              }
            />

            <Route
              path="/signup"
              element={
                <Logged>
                  <SignUpPage />
                </Logged>
              }
            />

            <Route
              path="/workspace"
              element={
                <NoLogged>
                  <WorkspacePage />
                </NoLogged>
              }
            />
          </Routes>
        </DataContextProvider>
      </AuthContextProvider>
      <Footer />
    </Router>
  );
};

export default App;
