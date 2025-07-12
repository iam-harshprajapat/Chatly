import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user data from backend
  const [loading, setLoading] = useState(true); // initial load

  const token = localStorage.getItem("chatly_auth_t");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/user/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("chatly_auth_t");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("chatly_auth_t");
    setUser(null);
    const navigate = useNavigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth
export const useAuth = () => useContext(AuthContext);
