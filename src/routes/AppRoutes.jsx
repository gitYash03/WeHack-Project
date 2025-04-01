import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import History from "../pages/History";
import Home from "../pages/Home";
import Journal from "../pages/Journal";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import LandingPage from "../components/LandingPage";

const AppRoutes = ({
  userData,
  newEntry,
  setNewEntry,
  handleAddEntry,
  aiResponses,
  getPrompt,
  hasAnimatedRef,
  handleLogout, // ADDED: Logout handler
}) => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/history"
        element={
          userData ? (
            <History />
          ) : (
            <Navigate to="/landingpage" replace state={{ from: location.pathname }} />
          )
        }
      />
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
            <Navigate to="/landingpage" replace state={{ from: location.pathname }} />
          )
        }
      />
      <Route
        path="/settings"
        element={
          userData ? (
            <Settings userData={userData} handleLogout={handleLogout} />
          ) : (
            <Navigate to="/landingpage" replace state={{ from: location.pathname }} />
          )
        }
      />
      <Route
        path="/journal"
        element={
          userData ? (
            <Journal userData={userData} aiResponses={aiResponses} hasAnimatedRef={hasAnimatedRef} />
          ) : (
            <Navigate to="/landingpage" replace state={{ from: location.pathname }} />
          )
        }
      />
      {/* Redirect to /home if authenticated, otherwise to /landingpage */}
      <Route path="*" element={<Navigate to={userData ? "/home" : "/landingpage"} replace state={{ from: location.pathname }} />} />
    </Routes>
  );
};

export default AppRoutes;
