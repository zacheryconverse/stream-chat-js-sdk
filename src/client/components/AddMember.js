import React, { Fragment } from "react";

export default function AddMember({ chatClient, channel }) {
  const addMemberToChannel = async (client, channel) => {
    await channel.addMembers([client.userID], {
      text: `${client.userID} joined the channel`,
    });
  };

  return (
    <Fragment>
      {chatClient && (
        <button
          onClick={() => addMemberToChannel(chatClient, channel)}
          className="join-channel"
        >
          Join Channel
        </button>
      )}
    </Fragment>
  );
}
