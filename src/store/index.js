import * as types from "./types"

const initialState = {
  todos: [],
  loading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_LOAD:
      return {
        todos: action.todos,
        loading: action.loading
      }
    case types.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      }
    case types.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => !action.ids.includes(todo.id))
      }
    case types.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.updated.id) {
            return action.updated
          }
          return todo
        })
      }
    default:
      return state
  }
}
