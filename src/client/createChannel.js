const path = require('path');
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const apiKey = process.env["REACT_APP_KEY"];
const token = process.env["REACT_APP_TOKEN"];
const userId = process.env["REACT_APP_USERID"];

console.log(apiKey, token, userId, 'apiKey');
const chatClient = StreamChat.getInstance(apiKey);

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
  ["Zachery", "Cody", "Sam"],
  "A channel about coding a chat app"
).then(() => console.log("createChannel Called"));


