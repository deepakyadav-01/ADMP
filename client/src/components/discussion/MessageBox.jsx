/* eslint-disable react/prop-types */
// MessageBox.jsx
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { sendMessage } from "@/services/messageService";
import { getMessages } from "@/services/messageService";
import Message from "./Message";
import { Separator } from "@/components/ui/separator";
import { common } from "../../lib/constants/string.json";

// MessageBox component
const MessageBox = ({ requestId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch messages when the component mounts and whenever the requestId changes 
  useEffect(() => {
    const fetchMessages = () => {
      getMessages(requestId)
        .then((response) => {
          setMessages(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error.message);
        });
    };

    fetchMessages();
  }, [requestId]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    sendMessage(message, requestId, user)
      .then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, createdBy: user },
        ]);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error.message);
        // Handle the error, e.g., show an error message to the user
      });
  };

  return (
    <div className="message-box flex flex-col">
      <form
        onSubmit={handleMessageSubmit}
        className="flex flex-col w-screen mb-5"
      >
        <Textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-3/4 py-2 border rounded-md"
          placeholder="Type a message..."
        />
        <Button
          type="submit"
          className="bg-primaryText text-white border-none focus:outline-none w-24 mt-5"
        >
          {common.addNotes}
        </Button>
      </form>
      <Separator className="mb-5" />
      <h3 className="text-2xl font-bold text-blue-800 mb-5">
        {common.comments}
      </h3>
      <div className="message-container w-11/12 mb-5">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
