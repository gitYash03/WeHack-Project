import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import History from "../pages/History";
import Home from "../pages/Home";
import Journal from "../pages/Journal";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";

const AppRoutes = ({ userData,newEntry, setNewEntry, handleAddEntry, aiResponses, getPrompt, hasAnimatedRef }) => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/history" element={<History />} />
      <Route
        path="/home"
        element={
          <Home
            newEntry={newEntry}
            setNewEntry={setNewEntry}
            handleAddEntry={handleAddEntry}
            aiResponses={aiResponses}
            getPrompt={getPrompt}
            userData={userData}
          />
        }
      />
      <Route path="/settings" element={<Settings userData={userData} />} />
      <Route path="/journal" element={<Journal userData={userData} aiResponses={aiResponses} hasAnimatedRef={hasAnimatedRef} />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
