import React from "react";
import SettingsSection from "../components/SettingSection";

const Settings = ({ userData, handleLogout }) => {
  return <SettingsSection userData={userData} handleLogout={handleLogout} />;
};

export default Settings;
