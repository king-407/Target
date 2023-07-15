const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const studyRouter = require("./routers/material");

const app = express();

require("./mongoose");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(`/study`, studyRouter);
app.get("/public/uploads", (req, res) => {});
app.listen(3000, () => {
  console.log("running");
});
