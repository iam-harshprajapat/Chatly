import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import InvalidRoute from "./pages/InvalidRoute";
import Home from "./pages/Home.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<InvalidRoute />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
