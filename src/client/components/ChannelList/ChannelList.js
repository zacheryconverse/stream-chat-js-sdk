import React, { useEffect, useState } from 'react';
import Channel from '../Channel/Channel';
import './ChannelList.css';

const ChannelList =  ({ chatClient }) => {
    const [channelList, setChannelList] = useState([])
    let list;
    const filter = { type: 'messaging', members: { $in: [chatClient.userID] } }; 
    const sort = [{ last_message_at: -1 }]; 

    useEffect(() => {
        const channels = chatClient.queryChannels(filter, sort, { 
            watch: true, 
            state: true, 
        }).then(r => setChannelList(r))
    }, [])

    return (
       <div className="channel-list-container">
           Channels
           <Channel channelList={channelList} />
       </div>
   )
}

export default ChannelList;