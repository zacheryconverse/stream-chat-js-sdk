import express from "express";
import { StreamChat } from "stream-chat";
require("dotenv").config({ path: __dirname + "/.env" });

const key = process.env["REACT_APP_KEY"];
const secret = process.env["SECRET"];
const serverClient =  StreamChat.getInstance(key, secret);

const app = express();
const PORT = 8000;

// const cors = require("cors");

// app.use(cors());
// app.use(express.static("public"));

app.post("/token", (req, res) => {
  const token = client.createToken(key, secret);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!!`));

// await client.setGuestUser({ id: "tommaso" });
// await client.connectAnonymousUser();

