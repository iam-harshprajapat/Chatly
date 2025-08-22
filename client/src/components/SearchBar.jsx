import React, { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

const SearchBar = () => {
  const { setIsProfileClicked, setProfileId } = useProfile();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (searchKey.length > 2) fetchConnections(searchKey);
    else setSearchResults([]);
  }, [searchKey]);

  const fetchConnections = async (searchKey) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/search?query=${searchKey}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.success) {
      setSearchResults(res.data.users);
    } else {
      setSearchResults([]);
    }
  };
  const handleClick = (id) => {
    setIsProfileClicked(true);
    setProfileId(id);
  };

  return (
    <div className="relative p-4 h-[10%]">
      <div className="input-container flex bg-secondary rounded-sm w-full h-7 items-center pl-2 gap-2">
        <FiSearch className="text-md text-font" />
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          placeholder="Search connections..."
          className="search-input text-font outline-none border-none w-full text-sm"
        />
      </div>

      {searchResults.length > 0 && (
        <ul className="bg-secondary absolute w-[90.5%] text-font mt-0.5 border-[1px] border-zinc-500 rounded-sm dropdown block z-10">
          {searchResults.map((item, index) => (
            <li
              key={index}
              className="h-10 flex items-center px-4 hover:bg-background gap-4 cursor-pointer select-none duration-200 rounded-sm"
              onClick={() => handleClick(item._id)}
            >
              <img src={item.avatar} className="h-5 rounded-full" />
              <h1>{item.name}</h1>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
