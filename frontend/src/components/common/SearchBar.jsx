import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center text-gray-300 bg-white border border-gray-300 rounded-lg px-3 py-2 w-lg max-w-sm shadow-sm">
      <IoIosSearch className="text-gray-200 mr-2" size={26} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search a driver"
        className="outline-none w-full text-sm"
      />
    </div>
  );
};

export default SearchBar;
