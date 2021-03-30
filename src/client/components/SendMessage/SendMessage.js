import React, { useState } from "react";

const SendMessage = ({ chatClient }) => {
  const channel = chatClient.channel("messaging", "channel-id-123");
  const [messageText, setMessageText] = useState("");
  const [errorText, setErrorText] = useState("");

  if (errorText && messageText) {
    setErrorText("");
  }
  const send = (e) => {
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
          value={messageText}
          type="text"
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here"
        ></input>
        <h3>{errorText}</h3>
        <button>Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
