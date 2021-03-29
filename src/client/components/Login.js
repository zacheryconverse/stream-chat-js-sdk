import axios from "axios";
import { StreamChat } from "stream-chat";

const apiKey = process.env["REACT_APP_KEY"];

export default function Login({ setLogin, userId, setUserId, }) {
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
      // .then((result) => console.log(result.data))
      .then((res) => chatClient.connectUser({ id: userId }, res.data))
      .then(() => setLogin(true))
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
  // module.exports = chatClient;
}
// export { chatClient }
