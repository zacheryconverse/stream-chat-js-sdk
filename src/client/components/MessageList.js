import React, { useEffect } from "react";

export default function MessageList({ chatClient }) {
  const channel = chatClient.channel("messaging", "channel-id-123");
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     await channel.watch();
  //     const response = chatClient.on((e) => {
  //       console.log("Event", e);
  //       console.log("Channel State", channel.state);
  //     });
  //   };
  //   fetchMessages();
  // }, [channel, chatClient]);

  return (
    <div className="Message-List">
      MessageList
    </div>
  );
}
