import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext";
import Tippy from "@tippyjs/react";
import logo from "../assets/image.png";
import "tippy.js/dist/tippy.css";
import DropdownMenu from "./DropdownMenu.jsx";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [notification, setNotification] = useState(false);
  return (
    <div className="bg-background h-[10%] flex px-4">
      <div className="flex-1 flex items-center">
        <img src={logo} className="h-7" />
        <h2 className="text-primary pl-4 text-2xl font-bold">Chatly</h2>
      </div>
      <div className="flex gap-4 h-full justify-center items-center ">
        <Tippy content="Notifications">
          <div className="h-10 w-10 rounded-full flex justify-center items-center bg-secondary hover:scale-105 cursor-pointer duration-300">
            {notification ? (
              <VscBellDot className="text-xl text-font" />
            ) : (
              <VscBell className="text-xl text-font" />
            )}
          </div>
        </Tippy>
        <Tippy content="Profile">
          <div className="h-10 w-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:border-2 border-primary">
            <img
              src={user.avatar}
              alt="profilePicture"
              className="rounded-full"
            />
          </div>
        </Tippy>
        <Tippy content="More">
          <DropdownMenu
            trigger={
              <div className="h-10 w-10 rounded-full flex justify-center items-center cursor-pointer duration-300">
                <BsThreeDotsVertical className="text-xl text-font" />
              </div>
            }
            items={[
              {
                label: "Settings",
                action: () => console.log("Settings opened"),
              },
              {
                label: "Change Theme",
                action: () => console.log("Theme Changed"),
              },
              {
                label: "Logout",
                action: logout,
              },
            ]}
          />
        </Tippy>
      </div>
    </div>
  );
};

export default NavBar;

<DropdownMenu
  trigger={<div className="px-4 py-2 bg-blue-500 text-white">Open Menu</div>}
  items={[
    { label: "Edit", action: () => console.log("Edit clicked") },
    { label: "Delete", action: () => console.log("Delete clicked") },
  ]}
/>;
