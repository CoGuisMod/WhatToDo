import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Context import */
import { AuthContextProvider } from "./context/AuthContext";

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

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
        </Routes>
      </AuthContextProvider>
      <Footer />
    </Router>
  );
};

export default App;
