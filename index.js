const express = require("express");
const cors = require("cors");
const server = express();

const db = require("./data/db.js");

server.use(express.json());
server.use(cors());
