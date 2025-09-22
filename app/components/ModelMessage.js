import React from "react"
import Markdown from "react-markdown"
import SmallLoading from "../../SmallLoading"

export default function ModelMessage(props) {
  return (
    <>
      {props.status == "loading" ? (
        <div className="ai-message">
          <SmallLoading width={"30px"} height={"30px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} position={"relative"} marginRight={"5px"} transform={"none"} top={"0"} left={"0"} message={props.loadingMessage} />
        </div>
      ) : (
        <div className="ai-message">
          <div className="message-logo">
            <img src="../images/logo1.jpeg" />
          </div>
          <div className="message-content">
            <Markdown>{props.message}</Markdown>
          </div>
        </div>
      )}
    </>
  )
}
