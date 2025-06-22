import React, { useState, useEffect } from "react";
import StatusBoxes from "../components/jobsite/StatusBoxes";
import JobsitesList from "../components/jobsite/JobsitesList";

const MainPage = () => {
  const [jobSites, setJobSites] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobsites`)
      .then((res) => res.json())
      .then((data) => setJobSites(data))
      .catch((err) => console.error("Failed to fetch jobSites", err));
  }, []);

  const handleAddJobsite = (newJobsite) => {
    setJobSites((prev) => [...prev, newJobsite]);
  };

  return (
    <div className="bg-grey p-2 space-y-4">
      <StatusBoxes jobSites={jobSites} />
      <JobsitesList jobSites={jobSites} onAddJobsite={handleAddJobsite} />
    </div>
  );
};

export default MainPage;
