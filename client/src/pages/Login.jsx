import React, { useState } from "react";
import googleIcon from "../assets/Google.svg";
import logo from "../assets/image.png";
import { auth, provider, signInWithPopup } from "../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // optional, if you want to update context

  const handleGoogleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const token = await googleResponse.user.getIdToken();

      const apiResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/google-oauth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (apiResponse.data.success === true) {
        localStorage.setItem("chatly_auth_t", apiResponse.data.chatly_auth_tea);
        setUser(apiResponse.data.user); // optional - update user context
        navigate("/home"); // ✅ now this will work!
      } else throw new Error("Login failed");
    } catch (err) {
      console.error("Google sign-in error", err);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex justify-center items-center relative">
      <img
        src={logo}
        className="absolute h-[70%] animate-spin animate-reverse animate-duration-[60s] opacity-5 overflow-clip"
      />
      <div
        onClick={handleGoogleLogin}
        className="z-10 cursor-pointer justify-center items-center border-[1px] border-slate-700 rounded-lg w-44 p-2 flex gap-3 hover:scale-[102%] duration-200 hover:shadow-[0_0_20px]  shadow-sky-600/30"
      >
        <img src={googleIcon} alt="GOOGLE" className="size-10" />
        <p className="font-bold text-2xl text-white font-mono">Sign In</p>
      </div>
    </div>
  );
};

export default Login;
