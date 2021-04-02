import React from "react";

export default function AddMember({ chatClient, channel }) {
  const addMemberToChannel = async (e, client, channel) => {
    e.preventDefault();
    await channel.addMember([client.userID]);
  };

  return (
    <div>
      {chatClient ? (
        <button
          onClick={(e) => addMemberToChannel(e, chatClient, channel)}
          style={{ border: 0, backgroundColor: "transparent", color: "green" }}
        >
          Join Channel
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
