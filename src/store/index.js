import * as types from "./types"
import { combineReducers } from "redux"

const initialState = {
  todo: {},
  late: [],
  todos: [],
  loading: true
}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_LOAD:
      return {
        ...state,
        todos: action.todos,
        late: action.late,
        loading: false
      }
    case types.ADD_TODO:
      return {
        ...state,
        [action.store]: [].concat(action.todos, state[action.store])
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

export const stats = (
  state = {
    name: "stats",
    active: 0,
    created: 0,
    completed: 0,
    categorys: {
      Today: 0,
      Studies: 0,
      Work: 0,
      Home: 0,
      Personal: 0,
      Other: 0
    },
    weekDay: {
      sun: 0,
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0
    }
  },
  action
) => {
  switch (action.type) {
    case types.INITIAL_LOAD:
      if (action.stats) {
        return action.stats
      } else return state
    case types.ADD_TODO:
      return {
        ...state,
        active: state.active + 1,
        created: state.created + 1
      }
    case types.UPDATE_STATS:
      console.log(action)
      return {
        ...state,
        ...action.stats
      }
    default:
      return state
  }
}

export default combineReducers({
  todos,
  stats
})
