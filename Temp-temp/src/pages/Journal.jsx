import React from "react";
import Journal from "../components/Journal";

const JournalPage = ({ aiResponses, hasAnimatedRef,userData }) => {
  return <Journal userData={userData} aiResponses={aiResponses} hasAnimatedRef={hasAnimatedRef} />;
};

export default JournalPage;
