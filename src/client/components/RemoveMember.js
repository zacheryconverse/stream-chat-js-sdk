import { Fragment } from "react";

export default function RemoveMember({ chatClient, channel }) {
  const removeMemberFromChannel = async (client, channel) => {
    await channel.removeMembers([client.userID], {
      text: `${client.userID} left ${channel.id}`
    });
    // console.log(client, channel);
  };

  return (
    <Fragment>
      {chatClient && (
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
