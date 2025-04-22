import React, { useState } from "react";
import googleIcon from "../assets/Google.svg";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      console.log(googleResponse.user);
      const token = await googleResponse.user.getIdToken();

      // Send the token to your backend for verification and JWT generation
      const apiResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/google-oauth`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in Authorization header
          },
        }
      );

      if (apiResponse.data.success === true) {
        console.log("Login successful", apiResponse.data);
        // Store the JWT token (e.g., in localStorage or cookies)
        localStorage.setItem("token", apiResponse.data.token);
      } else throw new Error("Login failed");
    } catch (err) {
      console.error("Google sign-in error", err);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex justify-center items-center">
      <div
        onClick={handleGoogleLogin}
        className="cursor-pointer justify-center items-center border-[1px] border-slate-700 rounded-lg w-44 p-2 flex gap-3 hover:scale-[102%] duration-200 hover:shadow-[0_0_20px]  shadow-sky-600/30"
      >
        <img src={googleIcon} alt="GOOGLE" className="size-10" />
        <p className="font-bold text-2xl text-white font-mono">Sign In</p>
      </div>
    </div>
  );
};

export default Login;
