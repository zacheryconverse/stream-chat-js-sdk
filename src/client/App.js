import React, { useState, useEffect, Fragment } from "react";
import { StreamChat } from "stream-chat";
import "./App.css";
import SendMessage from "./components/SendMessage/SendMessage";
import Login from "./components/Login";
import MessageList from "./components/MessageList";
import ChannelList from "./components/ChannelList/ChannelList";
import NewUser from "./components/NewUser";
const apiKey = process.env["REACT_APP_KEY"];
const chatClient = StreamChat.getInstance(apiKey);
// const ClientContext = React.createContext(chatClient);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [activeChannel, setActiveChannel] = useState("");
  // hardcode this channel by default, but we could possibly implement some logic to make the active channel the most recently updated or something
  if (!isLoggedIn && chatClient.user) {
    chatClient.disconnectUser().then(console.log("disconnected"));
  }
  return (
    // <ClientContext.Provider value="client">
    <div className="App">
      {chatClient.user ? (
        // {isLoggedIn && chatClient.user ? (
        <div className="app-container">
          <div className="welcome"></div>
          <ChannelList
            chatClient={chatClient}
            setActiveChannel={setActiveChannel}
          />
          {activeChannel ? (
            <Fragment>
              <MessageList
                active={activeChannel}
                chatClient={chatClient}
                setLoggedIn={setLoggedIn}
              />
              <SendMessage active={activeChannel} chatClient={chatClient} />
            </Fragment>
          ) : (
            <NewUser client={chatClient} />
          )}
          <button
            className="logout-btn"
            onClick={() => setLoggedIn(!isLoggedIn)}
          >
            Logout
          </button>
        </div>
      ) : (
        <Login
          chatClient={chatClient}
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
        />
      )}
    </div>
    // </ClientContext.Provider>
  );
}

export default App;
