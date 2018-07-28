import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import "./index.css"
import App from "./App"
import Reducer from "./store"
import { init } from "./store/actions"
import registerServiceWorker from "./registerServiceWorker"

const store = createStore(Reducer, applyMiddleware(thunk))
const CONTAINER = document.getElementById("root")

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </Provider>,
  CONTAINER
)

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update")
  whyDidYouUpdate(React)
}

window.addEventListener("load", () => {
  store
    .dispatch(init())
    .then(() => setBackgroundImage())
    .then(() => registerServiceWorker())
})

function setBackgroundImage() {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = "https://source.unsplash.com/random?nature"
    img.onerror = () => reject()
    img.onload = () => {
      document.body.style.backgroundImage = `url(${url})`
      CONTAINER.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
      resolve()
    }
    img.src = url
  })
}
