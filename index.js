const express = require("express");
const cors = require("cors");
const server = express();

const db = require("./data/db");

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

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ response: "User does not exist" });
      }
    })
    .catch(err => res.status(500).json({ response: "Error", err: err }));
});

server.delete("/api/users/:id", (req, res) => {
  const user = req.params;
  db.remove(user.id)
    .then(user => res.status(200).json(user))
    .catch(err =>
      res.status(500).json({ response: "you have goofed", err: err })
    );
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db.update(id, user)
    .then(user => {
      if (user === 1) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ response: "user does not exist" });
      }
    })
    .catch(err => res.status(500).json({ response: "you goofed", err: err }));
});

const port = 8000;
server.listen(port, () => console.log("port is running on 8000"));
