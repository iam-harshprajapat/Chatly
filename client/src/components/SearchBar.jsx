import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="p-4 h-[10%]">
      <div className="input-container flex bg-secondary rounded-sm w-full h-7 items-center pl-2 gap-2">
        <FiSearch className="text-md text-font" />
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          placeholder="Search connections..."
          className="search-input text-font outline-none border-none w-full text-sm "
        />
      </div>
    </div>
  );
};

export default SearchBar;
