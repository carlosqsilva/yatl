const express = require("express")
const mongoose = require("mongoose")

const bodyParser = require("body-parser")
const morgan = require("morgan")

const todoRouter = require("./routes/todos")
const config = require("./config")

const app = express()
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://carlosqsilva.github.io")
  res.header("Vary", "Origin")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }

  next()
})

app.use("/todos", todoRouter)

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      error: app.get("env") === "development" ? err : {}
    }
  })
})

connect().then(() => listen())

function listen() {
  const PORT = process.env.PORT || 5000
  app.listen(PORT)
  console.log(`Express server started on port ${PORT}`)
}

function connect() {
  return mongoose.connect(
    config.db,
    {
      reconnectTries: Number.MAX_VALUE,
      keepAlive: 120,
      poolSize: 10
    }
  )
}
