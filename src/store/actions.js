import * as types from "./types"
import Storage from "./storage"
import { id } from "./utils"

const DB = new Storage({
  name: "yatl",
  store: [
    {
      name: "todos",
      key: "id"
    }
  ]
})

export const init = () => async dispatch => {
  await DB.init()

  const todos = await DB.getAll("todos")

  dispatch({
    type: types.INITIAL_LOAD,
    todos: todos.reverse(),
    loading: false
  })
}

export const delete_todo = ids => dispatch => {
  DB.delete("todos", ids).then(() => {
    dispatch({
      type: types.REMOVE_TODO,
      ids
    })
  })
}

export const add_todo = values => dispatch => {
  const todo = {
    ...values,
    id: id()
  }

  DB.save("todos", todo).then(() => {
    dispatch({
      type: types.ADD_TODO,
      todo
    })
  })
}

export const update_todo = updated => dispatch => {
  DB.update("todos", updated).then(() => {
    dispatch({
      type: types.UPDATE_TODO,
      updated
    })
  })
}
