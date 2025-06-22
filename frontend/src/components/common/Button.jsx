const Button = ({ text, icon, color, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex mt-0 justify-between text-white rounded-[5px] cursor-pointer hover:brightness-95 ${color} ${className}` }
    >
      <span className="font-medium md:min-w-[130px] px-3 md:px-6 py-1 md:py-2 text-sm md:text-[16px] self-center">{text}</span>
      <span className="w-px bg-white/20"></span>
      <span className="text-white py-2 px-3 flex items-center">{icon}</span>
    </button>
  );
};

export default Button;
