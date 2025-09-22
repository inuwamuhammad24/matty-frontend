import React, { useEffect, useRef, useState } from "react"
import Axios from "axios"
import SmallLoading from "../../SmallLoading"
import Markdown from "react-markdown"
import UserMessage from "./UserMessage"
import ModelMessage from "./ModelMessage"
import { useImmer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import FlashMessage from "./FlashMessage"
const backendURL = "http://10.226.246.77:8000"

function MainInterface() {
  const chatContainer = useRef(null)
  const dialogContainer = useRef(null)
  const input = useRef(null)
  const toggleBar = useRef(null)
  const [state, setState] = useImmer({
    isGeneratingResponse: false,
    loadingMessage: "Thinking, Please wait...",
    input: "",
    alertDanger: false,
    flashMessage: "Hello and something went wrong",
    showDialog: false,
    darkMode: true,
    messages: [],
  })
  async function handleSubmit(e) {
    e.preventDefault()

    if (state.input) {
      setState(draft => {
        // add user input and loading message to UI
        draft.messages.push({ role: "user", content: state.input })
        draft.messages.push({ role: "model", status: "loading" })
        // Empty and focus the input field again
        draft.input = ""
        draft.isGeneratingResponse = true
      })
      input.current.focus()
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight

      // Send an asyncronous request to the backend to generate the response
      try {
        const response = await Axios.post(`${backendURL}/gen-answer`, { input: state.input })
        if (response.data) {
          // if the response is generated, add it to the UI and remove the loading message
          setState(draft => {
            draft.messages.pop()
            draft.messages.push({ role: "model", content: response.data })
            draft.isGeneratingResponse = false
          })
          chatContainer.current.scrollTop = chatContainer.current.scrollHeight
        } else {
          alert("An error has occured, Please try again later")
          setState(draft => {
            draft.isGeneratingResponse = false
            draft.messages.pop()
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight
          })
        }
      } catch (err) {
        setState(draft => {
          draft.isGeneratingResponse = false
          draft.flashMessage = "Something went wrong, try again later"
          draft.alertDanger = true
          draft.messages.pop()
        })
      }
    }
  }

  function showDialog(e) {
    e.preventDefault()
    setState(draft => {
      draft.showDialog = !draft.showDialog
    })
  }

  function changeTheme() {
    setState(draft => {
      draft.darkMode = !draft.darkMode
    })
    toggleBar.current.checked = state.darkMode
  }

  useEffect(() => {
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight
    input.current.focus()
  }, [])

  // Change the loading message after some seconds
  useEffect(() => {
    setTimeout(() => {
      setState(draft => {
        draft.loadingMessage = "Generating response, a moment please..."
      })
    }, 5000)
  }, [state.loadingMessage])

  return (
    <>
      <CSSTransition in={state.alertDanger} timeout={300} classNames={"show-flash"} unmountOnExit>
        <FlashMessage message={state.flashMessage} myclass={state.alertDanger ? "alert-danger" : "alert-success"} />
      </CSSTransition>
      <div className="main-int-cont">
        <div className="main-sidebar1">
          <div className="main-sidebar1-head">
            <div className="main-sidebar1-logo">
              <img src="../images/logo1.jpeg" />
            </div>
            <h2>Matty</h2>
          </div>
          <div className="main-sidebar1-recent-head">
            <h4>Recent Activities</h4>
          </div>
          <div className="main-sidebar1-menus-cont">
            <ul>
              <li>
                <a href="#">
                  <i className="bx bx-menu-alt-left"></i>
                  <p>Simple Inquiry</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-menu-alt-left"></i>
                  <p>Illustrative Resources ...</p>
                </a>
              </li>
              <li>
                <a href="#" onClick={showDialog}>
                  <i className="bx bx-cog"></i>
                  <p>Settings</p>
                </a>
                <div className="dialog-cont" ref={dialogContainer} style={state.showDialog ? { display: "flex" } : { display: "none" }}>
                  <div>
                    <p>Theme</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" onChange={changeTheme} ref={toggleBar} checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-help-circle"></i>
                  <p>Help</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-sidebar2">
          <div className="main-sidebar2-head">
            <div>
              <i className="bx bx-left-arrow-alt"></i>
            </div>
            <div>
              <i className="bx bx-user"></i>
            </div>
          </div>
          <div className="chat-cont">
            <div ref={chatContainer} className="chat-messages">
              {state.messages.length ? (
                <>
                  {state.messages.map(message => {
                    if (message.role == "user") {
                      return <UserMessage message={message.content} />
                    } else {
                      return <ModelMessage status={message.status} setState={setState} message={message.content} loadingMessage={state.loadingMessage} />
                    }
                  })}
                </>
              ) : (
                <div className="welcome-cont">
                  <h1>Hi there, how may I help Today?</h1>
                </div>
              )}
            </div>
            <div className="input-cont">
              <form onSubmit={handleSubmit}>
                <div className="input">
                  <textarea
                    ref={input}
                    name="input"
                    value={state.input}
                    onChange={e =>
                      setState(draft => {
                        draft.input = e.target.value
                      })
                    }
                    type={"text"}
                    placeholder="Ask Matty UJ related questions"
                  ></textarea>
                  <div className="button-cont">
                    {state.isGeneratingResponse ? (
                      <SmallLoading width={"30px"} height={"30px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} position={"relative"} marginRight={"5px"} transform={"none"} top={"0"} left={"0"} />
                    ) : (
                      <button>
                        <i class="bx bx-send"></i>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainInterface
