import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./components/About"
import CountDown from "./components/CountDown"
import Help from "./components/Help"

import Home from "./components/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<CountDown />} /> */}
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About darkMode={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
