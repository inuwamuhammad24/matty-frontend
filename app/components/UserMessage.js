import React from "react"
import Markdown from "react-markdown"

export default function UserMessage(props) {
  return (
    <div className="user-message lg:text-md">
      <Markdown>{props.message}</Markdown>
    </div>
  )
}
