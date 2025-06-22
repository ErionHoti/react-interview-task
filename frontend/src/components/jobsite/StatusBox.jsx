const StatusBox = ({ label, color, number }) => {
  return <button className={`${color} rounded-lg text-white px-3 py-5 text-xl font-bold tracking-wider `}>{number} {label}</button>;
};

export default StatusBox;
