import React from "react";
import "./Channel.css";
const Channel = ({ channelList }) => {
  console.log(channelList);
  if (channelList.length) {
    console.log(channelList);
    const renderChannelItems = () => {
      return channelList.map((channel) => (
        <div className="channel-container">
          <h2>{channel.id}</h2>
          {!channel.state.messages.length ? (
            <p>No messages yet</p>
          ) : (
            <p>
              {
                channel.state.messages[channel.state.messages.length - 1].user
                  .id
              }
              : {channel.state.messages[channel.state.messages.length - 1].text}
            </p>
          )}
        </div>
      ));
    };
    return <div>{renderChannelItems()}</div>;
  } else {
    return "Loading";
  }
};

export default Channel;
