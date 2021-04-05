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
    const getChannels = async () => {
      await chatClient
        .queryChannels(filter, sort)
        .then((r) => setChannelList(r));
    };
    getChannels();

  }, []);

  //Updates on events
  const updateChannelList = (channelType, channelID, action) => {
    if (action === "add") {
      setChannelList([
        ...channelList,
        chatClient.channel(channelType, channelID),
      ]);
    }
    if (action === "delete") {
      setChannelList(channelList.filter((channel) => channel.id !== channelID));
    }   
  };
  
chatClient.on("notification.added_to_channel", (e) =>
  updateChannelList("messaging", e.channel.id, "add")
);
chatClient.on("notification.channel_deleted", (e) =>
  updateChannelList("messaging", e.channel.id, "delete")
);
chatClient.on("channel.deleted", (e) =>
  updateChannelList("messaging", e.channel.id, "delete")
);


  //set limits
  const createChannel = (e) => {
    e.preventDefault();
    const channel = chatClient.channel("messaging", newChannelName, {
      members: [chatClient.userID],
      name: "This channel was created client-side",
      created_by: { id: chatClient.userID },
    });
    channel.watch();
  };

  const deleteChannel = (channelid) => {
    const channel = chatClient.channel("messaging", channelid);
    channel.delete();
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
            chatClient={chatClient}
          />
        );
      });
    }
    return "Loading";
  };
  return (
    <div className="channel-list-container">
      <div className="channel-list">
        <h4 className="channel-list_header">All Channels</h4>
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
