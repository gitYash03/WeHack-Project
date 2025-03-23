// In AppRoutes.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import History from "../pages/History";
import Home from "../pages/Home";
import Journal from "../pages/Journal";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
// ADD: Import LandingPage (adjust the path as needed)
import LandingPage from "../components/LandingPage";

const AppRoutes = ({
  userData,
  newEntry,
  setNewEntry,
  handleAddEntry,
  aiResponses,
  getPrompt,
  hasAnimatedRef
}) => {
  return (
    <Routes>
      {/* NEW: Route for LandingPage */}
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/history" element={<History />} />
      <Route
        path="/home"
        element={
          userData ? (
            <Home
              newEntry={newEntry}
              setNewEntry={setNewEntry}
              handleAddEntry={handleAddEntry}
              aiResponses={aiResponses}
              getPrompt={getPrompt}
              userData={userData}
            />
          ) : (
            <Navigate to="/landingpage" replace />
          )
        }
      />
      <Route
        path="/settings"
        element={userData ? <Settings userData={userData} /> : <Navigate to="/landingpage" replace />}
      />
      <Route
        path="/journal"
        element={
          userData ? (
            <Journal userData={userData} aiResponses={aiResponses} hasAnimatedRef={hasAnimatedRef} />
          ) : (
            <Navigate to="/landingpage" replace />
          )
        }
      />
      {/* Update catch-all route */}
      <Route path="*" element={<Navigate to={userData ? "/home" : "/landingpage"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
