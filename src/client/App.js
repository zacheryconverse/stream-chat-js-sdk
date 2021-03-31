import { useState } from "react";
import { StreamChat } from "stream-chat";
import "./App.css";
import Login from "./components/Login";
import MessageList from "./components/MessageList";
import SendMessage from "./components/SendMessage/SendMessage";
import ChannelList from "./components/ChannelList/ChannelList";
const apiKey = process.env["REACT_APP_KEY"];
const chatClient = StreamChat.getInstance(apiKey);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  if (!isLoggedIn && chatClient.user) {
    chatClient.disconnectUser().then(console.log("disconnected", chatClient));
  }

  return (
    <div className="App">
      {isLoggedIn && chatClient.user ? (
        <div>
          Welcome {chatClient.user.id}
          <ChannelList chatClient={chatClient} />
          <MessageList chatClient={chatClient} setLoggedIn={setLoggedIn} />
          <SendMessage chatClient={chatClient} />
          <button onClick={() => setLoggedIn(!isLoggedIn)}>Logout</button>
        </div>
      ) : (
        <Login chatClient={chatClient} setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
