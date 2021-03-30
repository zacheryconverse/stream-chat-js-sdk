import { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import "./App.css";
import SendMessage from './components/SendMessage/SendMessage'
import Login from "./components/Login";
const apiKey = process.env["REACT_APP_KEY"];
// import { chatClient } from "./components/Login";
const chatClient = StreamChat.getInstance(apiKey);

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false)

  if (!isLoggedIn) {
    chatClient.disconnectUser()
    .then(console.log("disconnected", chatClient));
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        `Welcome ${chatClient.user.id}`
      ) :
        <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      }
      <button onClick={() => setLoggedIn(!isLoggedIn)}>disconnect</button>
      <SendMessage />
    </div>
  );
}

export default App;
