import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MiniSidebar from "./MiniSidebar";
import { io } from "socket.io-client";

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  return (
    <div className="bg-slate-800 max-h-screen h-screen w-full flex">
      {isSidebarOpen ? (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      ) : (
        <MiniSidebar setIsSidebarOpen={setIsSidebarOpen} />
      )}
      <div className="flex-1 bg-slate-700 h-full">
        <div className="flex flex-col h-full w-full">
          <div className="flex-1 p-4 overflow-y-auto"></div>
          <div className="bg-slate-700 p-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-lg bg-slate-500 text-white outline-none border-none focus:bg-slate-600"
              onChange={(e) => setMessages(e.target.value)}
              value={messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
