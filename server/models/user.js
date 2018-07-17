const mongoose = require("mongoose")

module.exports = mongoose.model(
  "User",
  mongoose.Schema({
    name: { type: String, required: true },
    token: { type: String, required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Todo", require: true }
  })
)
