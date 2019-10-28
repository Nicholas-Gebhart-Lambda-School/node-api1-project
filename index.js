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

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(201).json(users))
    .catch(err =>
      res.status(500).json({ response: "Unable to fetch users", err: err })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      }
      res.status(404).json({ response: "user does not exist" });
    })
    .catch(err =>
      res
        .status(500)
        .json({ response: "you have made a mistake my dude", err: err })
    );
});

const port = 8000;
server.listen(port, () => console.log("port is running on 8000"));
