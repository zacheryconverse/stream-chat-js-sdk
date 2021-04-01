import React, { useEffect, useState, useRef, Fragment } from "react";

export default function MessageList({ chatClient }) {
  const [messages, setMessages] = useState("");
  const messagesEndRef = useRef(null);
  const channel = chatClient.channel("messaging", "channel-id-123");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await channel.watch();
      await setMessages(response.messages);
      // chatClient.on("user.watching.start", (e) => {
      //   console.log("Start Channel", e);
      //   console.log("Channel State", channel.state.messages);
      // });
      await scrollToBottom();
      channel.on("message.new", (e) => {
        console.log("New Message", e);
        console.log("Channel State", channel.state);
        setMessages(channel.state.messages);
        // ^^ change to optimistic render in sendMessage??
      });
    };
    fetchMessages();
  }, [channel, chatClient]);

  return (
    <div className="Message-List">
      MessageList
      <ul className="messages">
        {messages
          ? messages.map((message, i) => (
              <Fragment>
                <li key={message.id}>{message.text + "\n"}</li>
                <div ref={messagesEndRef} />
              </Fragment>
            ))
          : ""}
      </ul>
    </div>
  );
}
