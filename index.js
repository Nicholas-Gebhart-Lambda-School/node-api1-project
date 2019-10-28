const express = require("express");
const cors = require("cors");
const server = express();

const db = require("./data/db.js");

server.use(express.json());
server.use(cors());

server.post("/api/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ response: "you have goofed" });
    });
});

const port = 8000;
server.listen(port, () => console.log("port is running on 8000"));
