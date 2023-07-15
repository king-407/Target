const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect(
  "mongodb+srv://shivamtiwaritiwari0704:aezakmi@cluster0.ei4fu11.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
