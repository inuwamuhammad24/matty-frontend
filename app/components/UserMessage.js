import React from "react"
import Markdown from "react-markdown"

export default function UserMessage(props) {
  return (
    <div className="user-message lg:text-lg">
      <Markdown>{props.message}</Markdown>
    </div>
  )
}
