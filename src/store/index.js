import * as types from "./types"

const initialState = {
  todo: {},
  todos: [],
  complete: [],
  loading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_LOAD:
      return {
        ...state,
        todos: action.todos,
        complete: action.complete,
        loading: action.loading
      }
    case types.ADD_TODO:
      return {
        ...state,
        [action.store]: [...state[action.store], action.todo]
      }
    case types.REMOVE_TODO:
      return {
        ...state,
        [action.store]: state[action.store].filter(
          todo => !action.ids.includes(todo.id)
        )
      }
    case types.UPDATE_TODO:
      return {
        ...state,
        todo: {},
        [action.store]: state[action.store].map(todo => {
          if (todo.id === action.updated.id) {
            return action.updated
          }
          return todo
        })
      }
    case types.EDIT_TODO:
      return {
        ...state,
        todo: action.todo
      }
    default:
      return state
  }
}
