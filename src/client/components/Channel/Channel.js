import React, { useState } from "react";
import AddMember from "../AddMember";
import "./Channel.css";
const Channel = ({
  channelName,
  chatClient,
  setActiveChannel,
  deleteChannel,
  id,
  messages,
  channel,
  createdBy,
  channelType
}) => {
  const [mostRecentMsg, setMostRecentMsg] = useState(
    messages.length
      ? [
          messages[messages.length - 1].user.id,
          messages[messages.length - 1].text,
        ]
      : "No Messages Yet"
  );

  channel.on("message.new", (e) =>
    setMostRecentMsg([e.user.id, e.message.text])
  );
  const canDelete = () => {
    if (!channel.data.created_by) {
      return false;
    }
    if (channel.data.created_by.id !== chatClient.userID) {
      return false;
    } else if (channel.data.created_by.id === chatClient.userID) {
      return true;
    }
  };
  return (
    <div
      className="channel-container"
      key={channelName}
      onClick={() => setActiveChannel(channelName)}
    >
      <div className="channel-upper">
        <p className="channel-name">{channelName}</p>
        <AddMember chatClient={chatClient} channel={channel} />
        {canDelete() && (
          <p
            className="delete-channel"
            onClick={() => deleteChannel(channelType, channelName)}
          >
            {" "}
            Delete
          </p>
        )}
      </div>
      {!messages.length ? (
        <p className="no-msg">No messages yet</p>
      ) : (
        <p className="recent-msg">
          {mostRecentMsg[0]}: {mostRecentMsg[1]}
        </p>
      )}
    </div>
  );
};

export default Channel;
