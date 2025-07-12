import React from "react";
import SearchBar from "./SearchBar";
import Contacts from "./Contacts";
const Sidebar = () => {
  return (
    <div className="w-1/4 h-full border-r-[1px] border-secondary">
      <SearchBar />
      <Contacts />
    </div>
  );
};

export default Sidebar;
