import React, { useState } from "react";

const SendMessage = ({ chatClient }) => {
  // should we define channel multiple times? -> it was first defined in createChannel
  const channel = chatClient.channel("messaging", "channel-id-123");
  const [messageText, setMessageText] = useState("");
  const send = (e) => {
    e.preventDefault();
    channel.sendMessage({ text: messageText }).then(() => setMessageText(""));
    // maybe look into error handling?
  };
  return (
    <div>
      <form className="send-message-container" onSubmit={send}>
        <input
          value={messageText}
          type="text"
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here"
          style={{
            backgroundColor: "#FFE599",
            minHeight: "8vh",
            width: "80vw",
            border: "1px solid"
          }}
        ></input>
        {/* <button>⬆</button> */}
      </form>
    </div>
  );
};

export default SendMessage;
