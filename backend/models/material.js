const mongoose = require("mongoose");
const materialSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  source: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Material", materialSchema);
