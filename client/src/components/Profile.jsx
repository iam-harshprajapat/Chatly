import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext";
import { IoMdClose } from "react-icons/io";
import { slideInFromRight } from "../animation/EnterAnimation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Profile = () => {
  const { setIsProfileClicked, profileId, profileUser } = useProfile();
  const [isSentSuccess, setIsSentSuccess] = useState(false);
  const { token } = useAuth();
  const sentConnection = async () => {
    console.log(`Bearer ${token}`);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/connection/request/${profileId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data.success) setIsSentSuccess(true);
  };
  return (
    <>
      <motion.div
        {...slideInFromRight}
        className="h-full w-[23%] bg-background text-font border-l-[1px] border-secondary overflow-y-clip"
      >
        <div className="w-full h-8 flex items-center justify-end pr-2">
          <IoMdClose
            className="float-end text-2xl text-primary cursor-pointer"
            onClick={() => setIsProfileClicked(false)}
          />
        </div>
        <div className="h-full w-full flex flex-col items-center gap-4">
          <img
            src={profileUser.avatar}
            alt="Profile_Picture"
            className="rounded-full h-28"
          />
          <p className="font-semibold text-2xl">{profileUser.name}</p>
          <p className="text-sm">{profileUser.status}</p>
          {isSentSuccess ? (
            <p className="text-primary">You are connected</p>
          ) : (
            <button
              className="bg-primary h-9 w-20 rounded-sm hover:bg-[#00657c] cursor-pointer  font-semibold active:scale-95"
              onClick={sentConnection}
            >
              Connect
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
