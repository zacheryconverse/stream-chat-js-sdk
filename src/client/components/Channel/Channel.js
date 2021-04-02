import React, { useState } from "react";
import "./Channel.css";
const Channel = ({
  channelName,
  chatClient,
  setActiveChannel,
  deleteChannel,
  id,
  messages,
  channel,
}) => {
  const [mostRecentMsg, setMostRecentMsg] = useState(messages.length ? [messages[messages.length - 1].user.id, messages[messages.length - 1].text] : 'No Messages Yet')
  channel.on('message.new', e => setMostRecentMsg([e.user.id, e.message.text] ))

  return (
    <div
      className="channel-container"
      key={channelName}
      onClick={() => setActiveChannel(channelName)}
    >
      <div className="channel-upper">
        <p>{channelName}</p>
        <p
          className="delete-channel"
          onClick={() => deleteChannel(channelName)}
        >
          {" "}
          Delete
        </p>
      </div>
      {!messages.length ? (
        <p>No messages yet</p>
      ) : (
        <p>
          {mostRecentMsg[0]}:{" "}
          {mostRecentMsg[1]}
        </p>
      )}
    </div>
  );
};

export default Channel;
