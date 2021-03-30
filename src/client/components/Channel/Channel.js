import React from 'react';
import './Channel.css'
const Channel = ({channelList}) => {
    const renderChannelItems = () => {
        return channelList.map(channel => <div className="channel-container">
            <h2>{channel.id}</h2>
            <p>{channel.state.messages[0].text}</p>
        </div>)
    }
    return (
        <div>
            {renderChannelItems()}
        </div>
    )
}

export default Channel;