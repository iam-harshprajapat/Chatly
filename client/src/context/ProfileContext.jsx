import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const { token } = useAuth();
  useEffect(() => {
    fetchUser();
  }, [profileId]);

  const fetchUser = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/auth/user/${profileId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data.success) {
      setProfileUser(res.data.user);
    } else {
      setProfileUser({});
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        isProfileClicked,
        setIsProfileClicked,
        profileId,
        setProfileId,
        profileUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
