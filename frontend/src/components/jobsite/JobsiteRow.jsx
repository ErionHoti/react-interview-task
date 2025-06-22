import React from "react";
import { useNavigate } from "react-router-dom";

const JobsiteRow = ({ site, jobSites }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green";
      case "On Hold":
        return "bg-red";
      case "On Road":
        return "bg-yellow";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <tr className="odd:bg-[#F5F5F7] text-center">
      <td
        className="px-4 py-1 cursor-pointer text-[#1264A3]"
        onClick={() =>
          navigate(`/inventory/${site.id}`, {
            state: { jobsite: site, jobSites },
          })
        }
      >
        {site.name}
      </td>
      <td className="px-4 py-1">
        <span
          className={`inline-block w-36 p-2 rounded text-sm text-white ${getStatusColor(
            site.status
          )}`}
        >
          {site.status}
        </span>
      </td>
    </tr>
  );
};

export default JobsiteRow;
