import React, { useEffect, useState } from "react";
import RemoveMember from './RemoveMember';
import AddModerator from "../../server/AddModerator";

export default function Header({ chatClient, channel, channelResult }) {
  const [memberCount, setMemberCount] = useState(0);
  const [onlineMembers, setOnlineMembers] = useState(0);
  // increment and decrement with join / leave channel

  useEffect(() => {
    getMemberCounts(channelResult.members);
  }, [channelResult.members]);

  const getMemberCounts = (members) => {
    if (members) {
      let membersCount = members.reduce((a, c) => (a += c.user.online), 0);
      setOnlineMembers(membersCount);
      setMemberCount(members.length);
    }
  };

  channel.on("member.added", async (e) => {
    console.log(e, "MEMBER ADDED");
    setMemberCount(memberCount + 1);
    setOnlineMembers(onlineMembers + 1);
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
              {memberCount} members, {onlineMembers} online
            </small>
          </p>
          <RemoveMember chatClient={chatClient} channel={channel} />
          {/* <AddModerator channel={channel} /> */}
        </div>
      )}
    </div>
  );
}
