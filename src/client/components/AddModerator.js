import axios from "axios";
import { Fragment } from "react";

export default function AddModerator({ chatClient, channel, setCanBeModerator }) {
  const channel_type = channel.type;
  const channel_id = channel.id;
  const userId = chatClient.userID;
  const addModeratorToChannel = () => {
    axios
      .post("http://localhost:8000/addModerator", {
        user_id: userId,
        channel_type,
        channel_id,
      })
      .then((res) => console.log(res, "addMod"))
      .then(() => setCanBeModerator(false))
      .catch((err) => console.log("ERROR", err));
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
}
