import StatusBox from "./StatusBox";

const StatusBoxes = ({ jobSites }) => {
  const getCount = (status) =>
    jobSites.filter((site) => site.status === status).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-white rounded-[10px] p-2 mb-2 shadow-[0px_1px_4px_0px_#00000040]">
      <StatusBox label="On Road" color="bg-yellow" number={getCount("On Road")} />
      <StatusBox label="Completed" color="bg-light-green" number={getCount("Completed")} />
      <StatusBox label="On Hold" color="bg-red" number={getCount("On Hold")} />
    </div>
  );
};

export default StatusBoxes;
