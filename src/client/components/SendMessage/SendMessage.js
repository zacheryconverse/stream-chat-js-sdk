import React, { useState } from "react";
import { StreamChat } from "stream-chat";

const SendMessage = ({ chatClient }) => {
  const apiKey = process.env["REACT_APP_KEY"];
  const channel = chatClient.channel('messaging', 'channel-id-123')
  
  const [messageText, setMessageText] = useState('')
  const send = (e) => {
      e.preventDefault()
    channel.sendMessage({text: messageText})
  }
  return (
    <div>
      <form className="send-message-container" onSubmit={send}>
        <input type="text" onChange={(e) => setMessageText(e.target.value)} placeholder="Type your message here"></input>
        <button>Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
