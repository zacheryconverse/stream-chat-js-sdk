import { Fragment } from "react";
const path = require("path");
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const key = process.env["REACT_APP_KEY"];
const secret = process.env["REACT_APP_SECRET"];
// const serverClient = StreamChat.getInstance(key, secret);

const channel_type = "messaging";
const channel_id = "channel-id-123";

export default function AddModerator({ channel }) {
  // const channel = serverClient.channel(channel_type, channel_id);
  const addModeratorToChannel = async () => {
    console.log(channel.channel);
    // await channel.addModerators([serverClient.userID]).then(res => console.log(res, 'Moderator'));
  };

  return (
    <Fragment>
      {channel && (
        <button
          onClick={() => addModeratorToChannel(channel)}
          className="add-moderator"
        >
          Become a Moderator
        </button>
      )}
    </Fragment>
  );
};