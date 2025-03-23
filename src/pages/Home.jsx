import React from "react";
import JournalSection from "../components/JournalSection";

const Home = ({ userData,newEntry, setNewEntry, handleAddEntry, aiResponses, getPrompt }) => {
  if (!userData) return <div>Loading...</div>;
  return (
    <JournalSection
      newEntry={newEntry}
      setNewEntry={setNewEntry}
      handleAddEntry={handleAddEntry}
      aiResponses={aiResponses}
      getPrompt={getPrompt}
      userData={userData}
    />
  );
};

export default Home;
