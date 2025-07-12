import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import ChatBody from "../components/ChatBody";

const Home = () => {
  return (
    <>
      <div className="h-screen w-full overscroll-contain">
        <NavBar />
        <div className="flex bg-background w-full h-[90%] border-t-[1px] border-secondary">
          <Sidebar />
          <ChatBody />
        </div>
      </div>
    </>
  );
};

export default Home;
