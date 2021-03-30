import { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import "./App.css";
import Login from "./components/Login";
import SendMessage from './components/SendMessage/SendMessage'
const apiKey = process.env["REACT_APP_KEY"];
const chatClient = StreamChat.getInstance(apiKey);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  if (!isLoggedIn) {
    chatClient.disconnectUser()
    .then(console.log("disconnected", chatClient));
  }
console.log(chatClient)
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
        Welcome {chatClient.user.id}
        <SendMessage />
        </div>
      ) :
        <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      }
      <button onClick={() => setLoggedIn(!isLoggedIn)}>disconnect</button>
    </div>
  );
}

export default App;
