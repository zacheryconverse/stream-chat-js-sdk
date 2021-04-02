import React, { useEffect, useState } from "react";

export default function Header({ chatClient, channel, channelResult }) {
  const [online, setOnline] = useState(0);
  const getOnlineCount = (members) => {
    let online = 0;
    members.forEach((member) => {
      if (member.user.online) online++;
    });
    return online;
  };
  // useEffect(() => {
  //   getOnlineCount(channelResult.members)
  // }, [online])

  return (
    <div className="Header">
      {channelResult ? (
        // `${chatClient.user.id}`
        <div>
          <h2 className="Header_content">{channelResult.channel.id}</h2>
          <p className="Header_content">
            <small>{channelResult.channel.name}</small>
          </p>
          <p className="Header_content">
            <small>
              {channelResult.members.length} members,{" "}
              {getOnlineCount(channelResult.members)} online
            </small>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
