import React, { useEffect, useState } from "react";
import RemoveMember from "./RemoveMember";
import AddModerator from "./AddModerator";

export default function Header({ chatClient, channel, channelResult }) {
  const [memberCount, setMemberCount] = useState(0);
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [canBeModerator, setCanBeModerator] = useState(false);

  useEffect(() => {
    getMemberCounts(channelResult.members);
  }, [channelResult.members]);

  useEffect(() => {
    const getModeratorStatus = (state) => {
      if (state.membership) {
        if (state.membership.is_moderator) {
          setCanBeModerator(false);
          return;
        }
      }
      if (channel.data.created_by) {
        if (channel.data.created_by.id === chatClient.userID) {
          setCanBeModerator(true);
        }
      }
    };

    getModeratorStatus(channel.state);
  }, [channel.data.created_by, channel.state, chatClient.userID]);

  const getMemberCounts = (members) => {
    if (members) {
      let membersCount = members.reduce((a, c) => (a += c.user.online), 0);
      setOnlineMembers(membersCount);
      setMemberCount(members.length);
    }
  };

  channel.on("member.added", (e) => {
    console.log(e, "MEMBER ADDED");
    setMemberCount(memberCount + 1);
    setOnlineMembers(onlineMembers + 1);
  });

  channel.on("member.removed", () => {
    console.log("MEMBER REMOVED");
    setMemberCount(memberCount - 1);
    setOnlineMembers(onlineMembers - 1);
  });

  // chatClient.on('connection.changed', e => {
  //   if (e.online) console.log('connection is up!');
  //   else console.log('connection is down!');
  // })


  // const slowDown = async () => {
  //   await channel.enableSlowMode(1);
  // };
  // slowDown();
  // console.log("CHANNEL", channel);

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
          {canBeModerator && (
            <AddModerator
              setCanBeModerator={setCanBeModerator}
              channel={channel}
              chatClient={chatClient}
            />
          )}
        </div>
      )}
    </div>
  );
}
