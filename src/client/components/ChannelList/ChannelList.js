/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Channel from "../Channel/Channel";
import "./ChannelList.css";

const ChannelList = ({ chatClient, setActiveChannel }) => {
  const [channelList, setChannelList] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const filter = { type: "messaging", members: { $in: ["Zachery", "Cody"] } };
  //change filter to member who is currently logged in
  const sort = [{ last_message_at: -1 }];

  useEffect(
    () => {
      chatClient
        .queryChannels(filter, sort)
        .then((r) => setChannelList(r));
    },
    []
  );

//set limits
  const createChannel = async (e) => {
    e.preventDefault();
    const channel = chatClient.channel("messaging", newChannelName, {
      members: ["Cody", "Zachery"],
      name: "This channel was created client-side",
    });
    await channel.watch()
    const created = chatClient.channel("messaging", newChannelName)
    setChannelList([...channelList, created])
  };


//   trigger use effect ^^
  //look back at notification.added_to_channel
  //create client.on event handler? 

  const deleteChannel = async (channelid) => {
    const channel = chatClient.channel("messaging", channelid);
    await channel.delete();
    setChannelList(channelList.filter((channel) => channel.id !== channelid));
    // could trigger useeffect on this as well ^
    // listen for channel.deleted so another user can delete and update dynamically
    // only render delete if the current user is the owner
  };

  const renderChannelComponent = () => {
    if (channelList.length) {
      return channelList.map((channel) => {
        return (
          <Channel
            channelName={channel.id}
            deleteChannel={deleteChannel}
            messages={channel.state.messages}
            setActiveChannel={setActiveChannel}
            key={channel.id}
            channel={channel}
          />
        );
      });
    }
    return 'Loading'
  };
  return (
    <div className="channel-list-container">
      <div className="channel-list">
        All Channels
       {renderChannelComponent()}
      </div>
      <div className="create-channel-area">
        Create a channel named:
        <form onSubmit={(e) => createChannel(e)}>
          <input
            type="text"
            onChange={(e) => setNewChannelName(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChannelList;
