import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import ChatBody from "../components/ChatBody";
import Profile from "../components/Profile";
import { useProfile } from "../context/ProfileContext";
import { AnimatePresence } from "framer-motion";

const Home = () => {
  const { isProfileClicked } = useProfile();
  return (
    <>
      <div className="h-screen w-full overscroll-contain overflow-clip">
        <NavBar />
        <div className="flex bg-background w-full h-[90%] border-t-[1px] border-secondary">
          <Sidebar />
          <ChatBody />
          <AnimatePresence mode="wait">
            {isProfileClicked && <Profile />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Home;
