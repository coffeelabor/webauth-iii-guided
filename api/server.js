const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const jwt = require("jsonwebtoken");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

server.get("/token", (req, res) => {
  const payload = {
    subject: "Howdy",
    me: "Reed"
  };
  const secret = "secret secret";
  const options = {
    expiresIn: "1d"
  };
  const token = jwt.sign(payload, secret, options);

  res.status(200).json(token);
});

module.exports = server;
