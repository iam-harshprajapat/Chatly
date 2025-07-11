import React from "react";
import logo from "../assets/image.png";

const Loading = () => {
  return (
    <div className="h-screen w-full bg-black/50 flex justify-center items-center absolute">
      <img
        src={logo}
        className="h-[8%] animate-spin animate-reverse animate-duration-[3s] overflow-clip "
      />
    </div>
  );
};

export default Loading;
