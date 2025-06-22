import React, { useState } from "react";
import { RiInformation2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import SearchBar from "../common/SearchBar";
import Button from "../common/Button";
import CreateJobsiteModal from "./CreateJobsiteModal";
import JobsiteTable from "./JobsiteTable";

const JobsitesList = ({ jobSites, onAddJobsite }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddJobsite = (newJobsite) => {
    onAddJobsite(newJobsite);
  };

  const filteredSites = jobSites.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shadow-[0px_1px_4px_0px_#00000040] bg-white rounded-[10px]">
      <p className="bg-grey p-4 font-bold">Title</p>

      <div className="flex justify-between flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 p-4">
          <RiInformation2Fill className="text-blue-800" size={26} />
          <p>
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center p-4 gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            text="Create"
            icon={<FaPlus />}
            color="bg-green"
            onClick={() => setShowModal(true)}
            className="mt-0"
          />
        </div>
      </div>

      <JobsiteTable filteredSites={filteredSites} jobSites={jobSites} />

      {showModal && (
        <CreateJobsiteModal
          onClose={() => setShowModal(false)}
          onAddJobsite={handleAddJobsite}
        />
      )}
    </div>
  );
};

export default JobsitesList;
