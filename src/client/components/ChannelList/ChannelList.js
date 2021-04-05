import React, { useEffect, useState } from "react";
import Channel from "../Channel/Channel";
import "./ChannelList.css";

const ChannelList = ({ chatClient, setActiveChannel }) => {
  const [channelList, setChannelList] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  //change filter to member who is currently logged in

  //Populates channelList
  useEffect(() => {
    const filter = { type: "messaging", members: { $in: [chatClient.userID] } };
    const sort = [{ last_message_at: -1 }];

    chatClient.queryChannels(filter, sort).then((r) => setChannelList(r));
  }, [chatClient]);

  const updateChannelList = async (channelType, channelID) => {
    setChannelList([
      ...channelList,
      chatClient.channel(channelType, channelID),
    ]);
  };


  chatClient.on("notification.added_to_channel", (e) =>
    updateChannelList("messaging", e.channel.id)
  );
  chatClient.on("channel.deleted", (e) =>
    setChannelList(channelList.filter((channel) => channel.id !== e.channel.id))
  );
  //set limits
  const createChannel = async (e) => {
    e.preventDefault();
    const channel = chatClient.channel("messaging", newChannelName, {
      members: ["Cody", "Zachery"],
      name: "This channel was created client-side",
    });
    channel.watch();
    const created = chatClient.channel("messaging", newChannelName);

    // channel.on('channel.update', setChannelList([...channelList, created]))
  };
  //    chatClient.on("notification.added_to_channel",
  //    console.log('add-d')
  //     //   updateChannelList('messaging', chatClient.channel.channel_id)
  //       );

  const deleteChannel = async (channelid) => {
    const channel = chatClient.channel("messaging", channelid);
    await channel.delete();
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
    return "Loading";
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
