import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import InvalidRoute from "./pages/InvalidRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </>
  );
};

export default App;
