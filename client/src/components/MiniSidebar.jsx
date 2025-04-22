import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const MiniSidebar = ({ setIsSidebarOpen }) => {
  return (
    <div className="bg-slate-900 h-screen max-h-screen md:w-[4%] shadow-[0_5px_10px] shadow-slate-900 py-4 px-2 flex justify-center">
      <div
        className="size-8 hover:bg-slate-800 rounded-full flex items-center justify-center"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaChevronRight className=" ml-1 text-lg text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default MiniSidebar;
