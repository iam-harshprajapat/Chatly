import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import InvalidRoute from "./pages/InvalidRoute";
import Chatly from "./pages/Chatly";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatly" element={<Chatly />} />

        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </>
  );
};

export default App;
