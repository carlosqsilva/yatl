const express = require("express")
const router = express.Router()

const Todo = require("../models/todos")

router.get("/", async (req, res, next) => {
  try {
    const result = await Todo.find()
      .select("task category done uuid")
      .exec()
    res.status(200).json({
      count: result.length,
      todos: result
    })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  const { task, done, category, uuid } = req.body

  const todo = new Todo({
    task,
    done,
    category,
    uuid
  })

  try {
    const result = await todo.save()
    res.status(201).json({
      message: "success",
      created: result
    })
  } catch (err) {
    next(err)
  }
})

router.delete("/:todoID", async (req, res, next) => {
  const id = req.params.todoID
  try {
    await Todo.remove({ uuid: id }).exec()
    res.status(200).json({
      message: `Todo ${id} deleted`
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
