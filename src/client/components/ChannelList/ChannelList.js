import React, { useEffect, useState } from "react";
import Channel from "../Channel/Channel";
import "./ChannelList.css";

const ChannelList = ({ chatClient, setActiveChannel }) => {
  const [channelList, setChannelList] = useState([]);
  const [newChannelName, setNewChannelName] = useState('');
  const filter = { type: "messaging", members: { $in: ['Zachery', 'Cody'] } };
  const sort = [{ last_message_at: -1 }];

  useEffect(() => {
    chatClient
      .queryChannels(filter, sort, {
        watch: true,
        state: true,
      })
      .then((r) => setChannelList(r));
  }, [], filter, sort);

  const createChannel = async (e) => {
      e.preventDefault()
      const channel = chatClient.channel('messaging', newChannelName, {
        members: ['Cody', 'Zachery'],
        name: 'This channel was created client-side'
      });
      await channel.create()
      await chatClient
        .queryChannels(filter, sort, {
          watch: true,
          state: true,
        })
        .then((r) => setChannelList(r));
  }
  const deleteChannel = async (channelid) => {
      const channel = chatClient.channel('messaging', channelid)
      await channel.delete()
      setChannelList(channelList.filter(channel => channel.id !== channelid))
      console.log('hey')
    };


  return (
    <div className="channel-list-container">
      <div className="channel-list">
        All Channels
        <Channel setActiveChannel={setActiveChannel} channelList={channelList} deleteChannel={deleteChannel} chatClient={chatClient} />
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
