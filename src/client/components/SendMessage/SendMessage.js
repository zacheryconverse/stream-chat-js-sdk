import React, { useState } from "react";
import "./SendMessage.css";

const SendMessage = ({ chatClient, active }) => {
  const channel = chatClient.channel("messaging", active);
  const [messageText, setMessageText] = useState("");
  const [errorText, setErrorText] = useState("");

  if (errorText && messageText) {
    setErrorText("");
  }
  const send = async (e) => {
    e.preventDefault();
    if (!messageText) {
      setErrorText("You can't send an empty message");
      return;
    }

    channel
      .sendMessage({ text: messageText })
      .then(() => setMessageText(""))
      .catch((err) => setErrorText("There was an error. Please try again."));
  };
  return (
    <div>
      <form className="send-message-container" onSubmit={send}>
        <input
          className="send-message-input"
          value={messageText}
          type="text"
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here"
        ></input>
        <button className="send-message">Send</button>
        <h3>{errorText}</h3>
      </form>
    </div>
  );
};

export default SendMessage;
