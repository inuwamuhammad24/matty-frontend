import React from "react"
import Markdown from "react-markdown"

export default function UserMessage(props) {
  return (
    <div className="user-message">
      <Markdown>{props.message}</Markdown>
    </div>
  )
}
