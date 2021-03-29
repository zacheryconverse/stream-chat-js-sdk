import { useState } from "react";
import { StreamChat } from 'stream-chat';
import "./App.css";
import Login from "./components/Login";
const apiKey = process.env["REACT_APP_KEY"];
// import { chatClient } from "./components/Login";
const chatClient = StreamChat.getInstance(apiKey);

function App() {
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false);
  const [userId, setUserId] = useState("");

  if (logout) {
    chatClient.disconnectUser()
    .then(console.log("disconnected", chatClient));
  }

  return (
    <div className="App">
      {login && !logout ? (
        `Welcome ${userId}`
      ) : (
        <Login setLogin={setLogin} userId={userId} setUserId={setUserId} setLogout={setLogout} logout={logout} />
      )}
      <button onClick={() => setLogout(!logout)}>disconnect</button>
    </div>
  );
}

export default App;
