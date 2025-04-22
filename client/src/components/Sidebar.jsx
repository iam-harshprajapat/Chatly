import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Sidebar = ({ setIsSidebarOpen }) => {
  return (
    <>
      <div className="h-screen max-h-screen bg-slate-900 md:w-[25%] shadow-[0_5px_10px] shadow-slate-900 p-4">
        <div className="flex justify-between items-center bg-slate-700 h-14 p-4 rounded-lg">
          <p className="text-center w-full text-lg font-semibold text-white tracking-wide">
            Jhon Doe
          </p>
          <div
            className="size-8 hover:bg-slate-800 rounded-full flex items-center justify-center rotate-180"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaChevronRight className=" ml-1 text-lg text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
