const Mat = require("../models/material");
const multer = require("multer");
const express = require("express");

const router = express.Router();
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "application/pdf": "pdf",
};
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, fileName + "-" + Date.now() + `.` + `${extension}`);
  },
});
const uploadOptions = multer({ storage: storage });
router.get("/get/notes/:subject", async (req, res) => {
  try {
    const catig = await Mat.find({ category: req.params.subject });

    if (catig.length) {
      return res.status(200).send(catig);
    } else {
      return res.status(202).json({ error: "No such category available yet" });
    }
  } catch (e) {
    console.log(e);
  }
});
router.get("/", async (req, res) => {
  try {
    const display = await Mat.find({});
    res.status(200).send(display);
  } catch (e) {
    console.log(e);
  }
});
router.post("/", uploadOptions.single("source"), async (req, res) => {
  console.log("entered the chat");
  // console.log(req.body);
  console.log(req.body);

  if (!req.file) {
    return res.status(400).send("No image found");
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const studyMaterial = new Mat({
    title: req.body.title,
    category: req.body.category,
    source: `${basePath}${fileName}`,
  });
  studyMaterial
    .save()
    .then((created) => {
      res.status(201).json(created);
    })
    .catch((err) => {
      res.status(500).json({ error: err, success: false });
    });
});
module.exports = router;
