import React from "react"
import ReactDOM from "react-dom/client"

import Home from "./components/Home"

function App() {
  return <Home />
}

const root = ReactDOM.createRoot(document.querySelector("#root")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
