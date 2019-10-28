const express = require("express");
const cors = require("cors");
const server = express();

const { find, findById, insert, remove, update } = require("./data/db");

server.use(express.json(), cors());

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    insert({ name, bio })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.get("/api/users", (req, res) => {
  find()
    .then(users => res.status(201).json(users))
    .catch(() =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

server.delete("/api/users/:id", (req, res) => {
  const user = req.params;
  remove(user.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  update(id, { name, bio })
    .then(() =>
      findById(id).then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
    )
    .catch(() =>
      res
        .status(500)
        .json({ error: "The user information could not be modified." })
    );
});

const port = 8000;
server.listen(port, () => console.log("port is running on 8000"));
