import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import App from "./App"
import Reducer from "./store"
import registerServiceWorker from "./registerServiceWorker"

const store = createStore(Reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
