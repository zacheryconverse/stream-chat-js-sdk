import React, { useEffect, useState } from "react";

export default function Header({ chatClient, channel, channelResult }) {
  const [online, setOnline] = useState(0);

  const getOnlineCount = (members) => {
    return members.reduce((a, c) => (a += c.user.online), 0);
  };
  // getOnlineCount(channelResult.members);
  // useEffect(() => {
  //   getOnlineCount(channelResult.members)
  // }, [channelResult.members])

  channel.on("member.added", (e) => {
    console.log(e, "MEMBER ADDED");
    // channel.query
    // setOnline(channel.data.member_count)
  });

  return (
    <div className="Header">
      {channelResult && (
        <div>
          <h2 className="Header_content">{channelResult.channel.id}</h2>
          <p className="Header_content">
            <small>{channelResult.channel.name}</small>
          </p>
          <p className="Header_content">
            <small>
              {channelResult.members.length} members, {getOnlineCount(channelResult.members)} online
            </small>
          </p>
        </div>
      )}
    </div>
  );
}
