import React, { useState } from "react";
import "./Contact.css";

const Contacts = () => {
  const [connection, setConnection] = useState([
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
  ]);
  return (
    <div className=" h-[90%] overflow-y-scroll contact-container">
      {connection.map((connection, idx) => (
        <div
          key={idx}
          className="h-18 hover:bg-secondary px-4 flex items-center gap-4 "
        >
          <div className="h-10 w-10 bg-white rounded-full"></div>
          <div>
            <h2 className="text-font text-md font-semibold">Jhon Doe</h2>
            <p className="text-font">this is a text message</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
