const express = require("express");
const path = require("path");
const StreamChat = require('stream-chat').StreamChat;
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
// require("dotenv").config({ path: __dirname + ".env" });

const key = process.env["REACT_APP_KEY"];
const secret = process.env["REACT_APP_SECRET"];
const serverClient =  StreamChat.getInstance(key, secret);

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

app.post("/token", async (req, res) => {
  const { user_id } = req.body;
  const token = serverClient.createToken(user_id)
  try {
    res.status(200).send(token);
  } catch (err) {
    res.status(500).send('Server Error: ', err)
  }
});

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}!!`));

// await client.setGuestUser({ id: "tommaso" });
// await client.connectAnonymousUser();

