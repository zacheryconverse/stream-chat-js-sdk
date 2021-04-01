import React, { useEffect, useState } from "react";

export default function MessageList({ chatClient }) {
  const [messages, setMessages] = useState("");
  const channel = chatClient.channel("messaging", "channel-id-123");
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await channel.watch();
      await setMessages(response.messages);
      // chatClient.on("user.watching.start", (e) => {
      //   console.log("Start Channel", e);
      //   console.log("Channel State", channel.state.messages);
      // });
      channel.on("message.new", (e) => {
        console.log("New Message", e);
        console.log("Channel State", channel.state);
        setMessages(channel.state.messages);
        // change to optimistic render in sendMessage??
      });

      // const response = chatClient.on((e) => {
      //   console.log("Event", e);
      //   console.log("Channel State", channel.state);
      // });
    };
    fetchMessages();
  }, [channel, chatClient]);

  return (
    <div className="Message-List">
      MessageList
      <ul className="messages">
        {messages
          ? messages.map((message, i) => (
              <li key={message.id}> {message.text + "\n"} </li>
            ))
          : ""}
      </ul>
    </div>
  );
}
