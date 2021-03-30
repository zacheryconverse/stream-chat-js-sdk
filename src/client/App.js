import { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import "./App.css";
import Login from "./components/Login";
const apiKey = process.env["REACT_APP_KEY"];
const chatClient = StreamChat.getInstance(apiKey);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  if (!isLoggedIn && chatClient.user) {
    chatClient.disconnectUser().then(console.log("disconnected", chatClient));
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        `Welcome ${chatClient.user.id}`
      ) :
        <Login chatClient={chatClient} setLoggedIn={setLoggedIn} />
      }
      <button onClick={() => setLoggedIn(!isLoggedIn)}>disconnect</button>
    </div>
  );
}

export default App;
