import { useState } from "react";
import { StreamChat } from "stream-chat";
import "./App.css";
import SendMessage from "./components/SendMessage/SendMessage";
import Login from "./components/Login";
import MessageList from "./components/MessageList";
import ChannelList from "./components/ChannelList/ChannelList";
const apiKey = process.env["REACT_APP_KEY"];
const chatClient = StreamChat.getInstance(apiKey);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [activeChannel, setActiveChannel] = useState("channel-id-123");
  // hardcode this channel by default, but we could possibly implement some logic to make the active channel the most recently updated or something

  if (!isLoggedIn && chatClient.user) {
    chatClient.disconnectUser().then(console.log("disconnected"));
  }
  return (
    <div className="App">
      {isLoggedIn && chatClient.user ? (
        <div className="container">
          <div className="welcome"></div>
          <ChannelList
            chatClient={chatClient}
            setActiveChannel={setActiveChannel}
          />
          <MessageList chatClient={chatClient} setLoggedIn={setLoggedIn} />
          <SendMessage chatClient={chatClient} />
          <button
            className="logout-btn"
            onClick={() => setLoggedIn(!isLoggedIn)}
          >
            Logout
          </button>
        </div>
      ) : (
        <Login chatClient={chatClient} setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
