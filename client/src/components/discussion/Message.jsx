/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

//message component to display the message  on screen.
const Message = ({ msg, user }) => {
  const [formattedCreatedAt, setFormattedCreatedAt] = useState("");

  useEffect(() => {
    // Check if createdAtDate is valid before rendering the message
    const createdAtDate = new Date(msg.createdAt);
    if (!createdAtDate) {
      return null; // or <div></div> or any other suitable fallback
    }

    // Parse the createdAt date string and get the desired format
    const time = createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const date = createdAtDate.toLocaleDateString([], {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    // Check if time and date are undefined, and if so, use the current time
    const formattedCreatedAt =
      time && date ? `${time} ${date}` : new Date().toLocaleString();

    setFormattedCreatedAt(formattedCreatedAt);
  }, [msg.createdAt]);

  return (
    <div
      className={`message bg-transparent p-2 mb-5 rounded-md w-full border shadow-sm ${
        msg.createdBy === user ? "justify-self-end" : "justify-self-start"
      }`}
    >
      <div className="flex items-center justify-between space-x-3">
        <p className="text-sm font-bold ">{msg.createdBy}</p>
        <p className="text-xs text-gray-500">{formattedCreatedAt}</p>
      </div>
      <p className="text-sm p-1">{msg.message}</p>
    </div>
  );
};

export default Message;
