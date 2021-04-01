import React, { useEffect, useState, useRef, Fragment } from "react";

export default function MessageList({ chatClient }) {
  const [messages, setMessages] = useState("");
  const messagesEndRef = useRef(null);
  const channel = chatClient.channel("messaging", "channel-id-123");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return month + "/" + day + "/" + year;
  }

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
      <ul className="messages">
        {messages
          ? messages.map((message, i) => (
              <Fragment key={message.id}>
                <li>{`${message.text}\n`}</li>
                <ul>
                  <li style={{ fontSize: "small", listStyleType: "none" }}>
                    {`${message.user.id} on ${getFormattedDate(new Date(message.created_at))}`}
                  </li>
                </ul>
                <div ref={messagesEndRef}></div>
              </Fragment>
            ))
          : ""}
      </ul>
    </div>
  );
}
