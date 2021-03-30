import axios from "axios";
import { StreamChat } from "stream-chat";
import React, { useState } from 'react';

const apiKey = process.env["REACT_APP_KEY"];

export default function Login({ setLoggedIn, isLoggedIn }) {
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const chatClient = StreamChat.getInstance(apiKey);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/token", { user_id: userId })
      .then((res) => chatClient.connectUser({ id: userId }, res.data))
      .then(() => setLoggedIn(true))
      .then(() => console.log('chatClient', chatClient))
      .catch((err) => console.error("ERROR", err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter a UserId</label>
        <input
          type="text"
          name="userId"
          value={userId}
          placeholder="Enter a UserId..."
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

