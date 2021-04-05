import React, { useState } from "react";
import AddMember from '../AddMember';
import "./Channel.css";
const Channel = ({
  channelName,
  chatClient,
  setActiveChannel,
  deleteChannel,
  id,
  messages,
  channel,
  createdBy
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
            return false
          }
          if (channel.data.created_by.id !== chatClient.userID) {
            return false
          }
          else if (channel.data.created_by.id === chatClient.userID) {
            return true
          }
        }
  return (
    <div
      className="channel-container"
      key={channelName}
      onClick={() => setActiveChannel(channelName)}
    >
      <div className="channel-upper">
<<<<<<< HEAD
        <p className="channel-name">{channelName}</p>
        <AddMember chatClient={chatClient} channel={channel} />
        <p
          className="delete-channel"
          onClick={() => deleteChannel(channelName)}
        >
          {" "}
          Delete
        </p>
=======
        <p>{channelName}</p>
        {
        canDelete() && (
          <p
            className="delete-channel"
            onClick={() => deleteChannel(channelName)}
          >
            {" "}
            Delete
          </p>
        )}
>>>>>>> 0a38ac7acd4b2d76f3963a8520d574f608b5df2e
      </div>
      {!messages.length ? (
        <p>No messages yet</p>
      ) : (
<<<<<<< HEAD
        <p className='recent-msg'>
          {mostRecentMsg[0]}:{" "}
          {mostRecentMsg[1]}
=======
        <p>
          {mostRecentMsg[0]}: {mostRecentMsg[1]}

>>>>>>> 0a38ac7acd4b2d76f3963a8520d574f608b5df2e
        </p>
      )}
    </div>
  );
};

export default Channel;
