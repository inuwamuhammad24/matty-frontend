import React from "react"

function FlashMessage(props) {
  return (
    <div className={`alert ${props.myclass}`}>
      <div>{props.message}</div>
    </div>
  )
}

export default FlashMessage
