import React, { useEffect, useState } from "react";
import Channel from "../Channel/Channel";
import "./ChannelList.css";

const ChannelList = ({ chatClient, setActiveChannel }) => {
  const [channelList, setChannelList] = useState([]);
  const [newChannelName, setNewChannelName] = useState('');
  
  useEffect(() => {
      const filter = { type: "messaging", members: { $in: [chatClient.userID] } };
      const sort = [{ last_message_at: -1 }];
    chatClient
      .queryChannels(filter, sort, {
        watch: true,
        state: true,
      })
      .then((r) => setChannelList(r));
  }, [chatClient]);

  const createChannel = async (e) => {
      e.preventDefault()
      const channel = chatClient.channel('messaging', newChannelName, {
        members: ['Cody', 'Zachery'],
        name: 'This channel was created client-side'
      });
      await channel.create().then(r => console.log(r));
  }
  return (
    <div className="channel-list-container">
      <div className="channel-list">
        All Channels
        <Channel channelList={channelList} />
      </div>
      <div className="create-channel-area">
        Create a channel named: 
        <form onSubmit={(e) => createChannel(e)}>
        <input type="text" onChange={(e) => setNewChannelName(e.target.value)} />
        </form>
      </div>
    </div>
  );
};

export default ChannelList;
