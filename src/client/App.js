import { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import "./App.css";
import Login from "./components/Login";
import SendMessage from './components/SendMessage/SendMessage'
const apiKey = process.env["REACT_APP_KEY"];
const chatClient = StreamChat.getInstance(apiKey);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  if (!isLoggedIn && chatClient.user) {
    chatClient.disconnectUser().then(console.log("disconnected", chatClient));
  }
console.log(chatClient)
  return (
    <div className="App">
      {isLoggedIn && chatClient.user ? (
        `Welcome ${chatClient.user.id}`
      ) :
        <Login chatClient={chatClient} setLoggedIn={setLoggedIn} />
      }
      <button onClick={() => setLoggedIn(!isLoggedIn)}>disconnect</button>
    </div>
  );
}

export default App;
