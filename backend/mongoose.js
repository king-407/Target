const mongoose = require("mongoose");
const express = require("express");
require("dotenv/config");
const api = process.env.MONGO_URL;

const app = express();
mongoose.connect(`${api}`, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
