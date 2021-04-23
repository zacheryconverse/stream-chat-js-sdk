import React, { useState, useEffect } from "react";
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

  // useEffect(() => {
  //   // send message to channel not being watched:
  //   //  get token and connect user
  //   chatClient.connectUser(
  //     { id: "Zachery" },
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmFjaGVyeSJ9.qQ49SM6QAQ2i5FAzwDS977orC1SxuP9UuVDZ6S7u9Kc"
  //   );
  //   // define channel to send message to (one 'Cody' isn't currently watching)
  //   const channel2 = chatClient.channel("messaging", "CODEy");
  //   channel2.sendMessage({ text: "hi from vscode" });
  //   console.log("sendMessage");
  // }, []);

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
        {/* <button className="send-message">Send</button> */}
        <h3>{errorText}</h3>
      </form>
    </div>
  );
};

export default SendMessage;
