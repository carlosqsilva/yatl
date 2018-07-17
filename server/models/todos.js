const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Todo",
  mongoose.Schema({
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
    category: { type: String, required: true },
    uuid: { type: String, required: true }
  })
)
