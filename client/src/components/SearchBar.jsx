import React from "react";
import { FiSearch } from "react-icons/fi";
const SearchBar = () => {
  return (
    <div className="p-4">
      <div className="flex bg-secondary rounded-sm w-full h-7 items-center pl-2 gap-2">
        <FiSearch className="text-md text-font" />
        <input
          type="text"
          placeholder="Search connections..."
          className="text-font outline-none border-none w-full text-sm "
        />
      </div>
    </div>
  );
};

export default SearchBar;
