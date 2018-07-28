import * as types from "./types"
import Storage from "./storage"
import { id } from "./utils"

const date = new Date()
const today = date.toDateString()
const DB = new Storage({
  name: "yatl",
  store: [
    {
      name: "todos",
      key: "id"
    },
    {
      name: "late",
      key: "id"
    },
    {
      name: "stats",
      key: "name"
    }
  ]
})

export const init = () => async dispatch => {
  await DB.init()

  const [active, late, [stats]] = await Promise.all([
    DB.getAll("todos"),
    DB.getAll("late"),
    DB.getAll("stats")
  ])

  const todos = [],
    newLates = [],
    ids = []

  active.forEach(todo => {
    if (todo.category === "Today" && todo.date !== today) {
      newLates.push(todo)
      ids.push(todo.id)
    } else todos.push(todo)
  })

  dispatch({
    type: types.INITIAL_LOAD,
    todos: todos.reverse(),
    late: [...newLates, ...late].reverse(),
    stats
  })

  if (newLates.length !== 0) {
    Promise.all([DB.save("late", newLates), DB.delete("todos", ids)])
  }
}

export const delete_todo = (ids, store = "todos") => (dispatch, getState) => {
  Promise.all([
    DB.delete(store, ids),
    dispatch({
      type: types.REMOVE_TODO,
      store,
      ids
    })
  ]).then(() => {
    const { stats } = getState()
    DB.update("stats", stats)
  })
}

export const add_todo = (todos, store = "todos") => (dispatch, getState) => {
  Promise.all([
    DB.save(store, todos),
    dispatch({
      type: types.ADD_TODO,
      store,
      todos
    })
  ]).then(() => {
    const { stats } = getState()
    DB.update("stats", stats)
  })
}

export const create_todo = values => dispatch => {
  const todo = {
    ...values,
    id: id(),
    date: today
  }

  if (values.category === "") {
    todo.category = "Today"
  }

  dispatch(add_todo(todo))
}

export const update_todo = (updated, store = "todos") => dispatch => {
  Promise.all([
    DB.update(store, updated),
    dispatch({
      type: types.UPDATE_TODO,
      updated,
      store
    })
  ])
}

export const edit_todo = todo => dispatch => {
  dispatch({
    type: types.EDIT_TODO,
    todo
  })
}

export const to_complete = (ids, category, store) => (dispatch, getState) => {
  const { stats } = getState()

  const day = Reflect.ownKeys(stats.weekDay)[date.getDay()]
  const total = ids.length

  stats.active -= total
  stats.completed += total
  stats.weekDay[day] += total
  if (category in stats.categorys) {
    stats.categorys[category] += total
  } else stats.categorys[category] = total

  Promise.all([
    DB.update("stats", stats),
    dispatch(delete_todo(ids, store)),
    dispatch({
      type: types.UPDATE_STATS,
      stats
    })
  ])
}
