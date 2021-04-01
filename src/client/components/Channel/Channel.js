import React from "react";
import "./Channel.css";
const Channel = ({ channelList, chatClient, setActiveChannel }) => {
  const deleteChannel = async (channelid) => {
      const channel = chatClient.channel('messaging', channelid)
      await channel.delete()
  };

  if (channelList.length) {
    const renderChannelItems = () => {
      return channelList.map((channel) => (
        <div className="channel-container" key={channel.id} onClick={() => setActiveChannel(channel.id)}>
          <div className="channel-upper">
            <p>{channel.id}</p>
            <p className="delete-channel" onClick={() => deleteChannel(channel.id)}> Delete</p>
          </div>
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
