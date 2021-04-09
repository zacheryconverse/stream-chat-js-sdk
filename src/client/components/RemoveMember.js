import { Fragment } from "react";

export default function RemoveMember({ chatClient, channel }) {
  const removeMemberFromChannel = async (client, channel) => {
    await channel.removeMembers([client.userID], {
      text: `${client.userID} left ${channel.id}`
    });
  };

  const canLeave = (members) => {
    for (let member in members) {
      if (member === chatClient.userID) return true;
    }
    return false;
  };

  return (
    <Fragment>
      {chatClient && canLeave(channel.state.members) && (
        <button
          onClick={() => removeMemberFromChannel(chatClient, channel)}
          className="leave-channel"
        >
          Leave Channel
        </button>
      )}
    </Fragment>
  );
}
