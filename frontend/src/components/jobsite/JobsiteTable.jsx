import React from "react";
import JobsiteRow from "./JobsiteRow";

const JobsiteTable = ({ filteredSites, jobSites }) => {
  return (
    <div className="overflow-x-auto max-h-100">
      <table className="min-w-full table-fixed border-collapse">
        <thead className="bg-white sticky top-0">
          <tr>
            <th className="w-1/2 px-4 py-2">Jobsite Name</th>
            <th className="w-1/2 px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredSites.map((site) => (
            <JobsiteRow key={site.id} site={site} jobSites={jobSites} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsiteTable;
