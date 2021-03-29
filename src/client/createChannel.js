const path = require('path');
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const apiKey = process.env["REACT_APP_KEY"];

console.log(apiKey, 'apiKey')
const chatClient = StreamChat.getInstance(apiKey);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmFjaGVyeSJ9.qQ49SM6QAQ2i5FAzwDS977orC1SxuP9UuVDZ6S7u9Kc";
const userId = 'Zachery';

chatClient.connectUser({ id: userId }, token);

const createChannel = async (channelType, cid, members, name) => {
  const channel = chatClient.channel(channelType, cid, {
    members,
    name,
  });
  await channel.create();

  const text = "Hello from the server";

  await channel
    .sendMessage({
      text: text,
    })
    .then((res) => console.log("sendMessage Called", res));

  await chatClient.disconnectUser();
  return;
};

createChannel(
  "messaging",
  "channel-id-123",
  ["Zachery", "Cody"],
  "A channel about coding a chat app"
).then(() => console.log("createChannel Called"));
