import axios from "axios";
import React, { useState } from 'react';

export default function Login({ setLoggedIn, chatClient }) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/token", { user_id: userId })
      .then((res) => chatClient.connectUser({ id: userId }, res.data))
      .then(() => setLoggedIn(true))
      .catch((err) => console.error("ERROR", err));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label>Enter a UserId: </label>
        <input
          autoFocus
          style={{ backgroundColor: "#E7B8AF" }}
          type="text"
          name="userId"
          value={userId}
          placeholder="Enter a UserId..."
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">⬆</button>
      </form>
    </div>
  );
}

