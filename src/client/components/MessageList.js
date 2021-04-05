import React, { useEffect, useState, useRef, Fragment } from "react";
import Header from "./Header";

export default function MessageList({ chatClient, active }) {
  const [channelResult, setChannelResult] = useState("");
  const [messages, setMessages] = useState("");
  const messagesEndRef = useRef(null);
  const channel = chatClient.channel("messaging", active);

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
      await setChannelResult(response);
      // chatClient.on("user.watching.start", (e) => {
      //   console.log("Start Channel", e);
      //   console.log("Channel State", channel.state.messages);
      // });
      await scrollToBottom();
      channel.on("message.new", (e) => {
        setMessages(channel.state.messages);
        // ^^ change to optimistic render in sendMessage??
        scrollToBottom();
      });
    };
    fetchMessages();
  }, [channel, chatClient, active]);

  const checkIfMe = (message) => {
    if (message.type === "system") return "system";
    else if (message.user.id === chatClient.userID) return "my-message";
    else return "not-my-message";
  };

  return (
    <div className="Message-List">
      <Header
        chatClient={chatClient}
        channel={chatClient}
        channelResult={channelResult}
      />
      <ul className="messages">
        {messages &&
          messages.map((message, i) => (
            <Fragment key={message.id}>
              <li
                className={`${checkIfMe(message)} message`}
              >{`${message.text}\n`}</li>
              <ul
                className={
                  checkIfMe(message) === "my-message" ? "me" : "not-me"
                }
              >
                <li
                  style={{
                    fontSize: "small",
                    listStyleType: "none",
                    border: "0",
                  }}
                >
                  {`${message.user.id} on ${getFormattedDate(
                    new Date(message.created_at)
                  )}`}
                </li>
              </ul>
              <div ref={messagesEndRef}></div>
            </Fragment>
          ))}
      </ul>
    </div>
  );
}
