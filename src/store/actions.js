import * as types from "./types"
import Storage from "./storage"
import { id } from "./utils"

const DB = new Storage({
  name: "yatl",
  store: [
    {
      name: "todos",
      key: "id"
    },
    {
      name: "complete",
      key: "id"
    }
  ]
})

export const init = () => async dispatch => {
  await DB.init()

  const [todos, complete] = await Promise.all([
    DB.getAll("todos"),
    DB.getAll("complete")
  ])

  dispatch({
    type: types.INITIAL_LOAD,
    todos: todos.reverse(),
    complete: complete.reverse(),
    loading: false
  })
}

export const delete_todo = (ids, store = "todos") => dispatch => {
  DB.delete(store, ids).then(() => {
    dispatch({
      type: types.REMOVE_TODO,
      store,
      ids
    })
  })
}

export const add_todo = (todo, store = "todos") => dispatch => {
  DB.save(store, todo).then(() => {
    dispatch({
      type: types.ADD_TODO,
      store,
      todo
    })
  })
}

export const create_todo = values => dispatch => {
  const todo = {
    ...values,
    id: id()
  }

  dispatch(add_todo(todo))
}

export const update_todo = (updated, store = "todos") => dispatch => {
  DB.update(store, updated).then(() => {
    dispatch({
      type: types.UPDATE_TODO,
      updated,
      store
    })
  })
}

export const to_complete = ids => (dispatch, getState) => {
  const todo = getState().todos.find(task => task.id === ids[0])

  Promise.all([
    dispatch(add_todo(todo, "complete")),
    dispatch(delete_todo(ids, "todos"))
  ])
}

export const to_todos = ids => (dispatch, getState) => {
  const todo = getState().complete.find(task => task.id === ids[0])

  Promise.all([
    dispatch(add_todo(todo, "todos")),
    dispatch(delete_todo(ids, "complete"))
  ])
}

export const edit_todo = todo => dispatch => {
  dispatch({
    type: types.EDIT_TODO,
    todo
  })
}
