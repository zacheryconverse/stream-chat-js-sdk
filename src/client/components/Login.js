import React, { useState } from "react";
import axios from "axios";
import { StreamChat } from "stream-chat";

const apiKey = process.env["REACT_APP_KEY"];

export default function Login({ setLogin, userId, setUserId, logout, }) {
  const [token, setToken] = useState('');
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  // const options = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ user_id: userId }),
  // };
  // fetch("http://localhost:8000/token", options)

  const chatClient = StreamChat.getInstance(apiKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/token", { user_id: userId })
      // .then((data) => setToken(data.data))
      .then((res) => chatClient.connectUser({ id: userId }, res.data))
      // .then(res => setToken(res))
      // .then((res) => console.log(res, 'response'))
      .then(() => setLogin(true))
      .then(() => console.log(chatClient, 'chat'))
      .catch((err) => console.error("ERROR", err));
  };

  // console.log(chatClient, 'client');
  // if (logout) {
  //   chatClient.disconnect();
  //   console.log('disconnected', chatClient);
  // }

  // console.log(login, 'login')
  // const connect = chatClient.connectUser({ id: userId }, token);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter a Username</label>
        <input
          type="text"
          name="userId"
          value={userId}
          placeholder="Enter a Username..."
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// export default Login;
// export { chatClient }
