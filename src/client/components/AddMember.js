import React from "react";

export default function AddMember({ chatClient, channel }) {
  const addMemberToChannel = async (client, channel) => {
    await channel.addMembers([client.userID], {
      text: `${client.userID} joined the channel`,
    });
  };

  return (
    <div>
      {chatClient && (
        <button
          onClick={() => addMemberToChannel(chatClient, channel)}
          style={{ border: 0, backgroundColor: "transparent", color: "green" }}
        >
          Join Channel
        </button>
      )}
    </div>
  );
}
