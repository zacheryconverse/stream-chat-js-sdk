import { Fragment } from "react";

export default function AddMember({ chatClient, channel }) {
  const addMemberToChannel = async (client, channel) => {
    await channel.addMembers([client.userID], {
      text: `${client.userID} joined the channel`,
    });
  };

  const canJoin = (members) => {
    for (let member in members) {
      if (member === chatClient.userID) return false;
    }
    return true;
  };

  return (
    <Fragment>
      {chatClient && canJoin(channel.state.members) && (
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
