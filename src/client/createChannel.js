const path = require('path');
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const apiKey = process.env["REACT_APP_KEY"];
const token = process.env["REACT_APP_TOKEN"];
const codyToken = process.env["REACT_APP_CODY_TOKEN"];
const secret = process.env["REACT_APP_SECRET"];
// const userId = process.env["REACT_APP_USERID"];
const userId = 'Zachery';

// console.log(apiKey, token, userId, 'apiKey');
// const chatClient = StreamChat.getInstance(apiKey);
const serverClient = StreamChat.getInstance(apiKey, secret)

// chatClient.connectUser({ id: userId }, token);

// const createChannel = async (channelType, cid, members, name) => {
  // const channel = chatClient.channel(channelType, cid, {
  //   members,
  //   name,
  // });
  // await channel.create();
  //
//   return;
// }

const sendMessageToUnwatchedMemberChannel = async () => {
  const channel = serverClient.channel('messaging', 'New-Room2')
  // await channel.watch();
  // channel.on("message.new", (e) => console.log(e, "new message"));

  // const text = "Hello there from THE awesome backend server";

  await channel
    .sendMessage({
      text: "this is my message zachery!",

      user_id: userId,
    })
    .then((res) => console.log("sendMessage Called", res));

  // await chatClient.disconnectUser();
  return;
};

// createChannel(
//   "messaging",
//   "New-Room3",
//   ["Zachery", "Cody"],
//   "Where new people chat"
// ).then(() => console.log("createChannel Called"));

sendMessageToUnwatchedMemberChannel();
