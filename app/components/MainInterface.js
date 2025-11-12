import React, { useEffect, useRef, useState } from "react"
import { BadgeQuestionMark, CircleUserRound, Menu, MessagesSquare, SendHorizonal, Settings, Sidebar, X } from "lucide-react"
import { Link } from "react-router-dom"
import Axios from "axios"
import SmallLoading from "../../SmallLoading"
import UserMessage from "./UserMessage"
import ModelMessage from "./ModelMessage"
import { useImmer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import TypeIt from "typeit-react"
import FlashMessage from "./FlashMessage"
import "../style.css"
import { AnimatePresence, motion } from "framer-motion"

const backendURL = "https://dull-morgen-easyaccess-c71f2507.koyeb.app"

// const backendURL = "http://172.24.44.77:8000"

function MainInterface() {
  const colors = {
    darkBackground: "#1b1b1d",
  }
  const chatContainer = useRef(null)
  const dialogContainer = useRef(null)
  const sideBarMenu = useRef(null)
  const sidebar1 = useRef(null)
  const input = useRef(null)
  const toggleBar = useRef(null)
  const toggler = useRef(null)
  const greet = useRef("Hi there, how may I help Today?")
  const [state, setState] = useImmer({
    isGeneratingResponse: false,
    loadingMessage: "Thinking...",
    input: "",
    alertDanger: false,
    flashMessage: "Hello and something went wrong",
    showDialog: false,
    darkMode: true,
    messages: [],
    isSideBarOpen: false,
    isFlashVisible: false,
  })
  async function handleSubmit(e) {
    e.preventDefault()

    if (state.input) {
      setState(draft => {
        // add user input and loading message to UI
        draft.messages.push({ role: "user", content: state.input })
        draft.messages.push({ role: "assistant", status: "loading" })
        // Empty and focus the input field again
        draft.input = ""
        draft.isGeneratingResponse = true
      })
      // input.current.focus()
      setTimeout(() => {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight
      }, 100)

      // Error message
      // setState(draft => {
      //   draft.flashMessage = "Temporary Issue: We're currently experiencing a service disruption and are actively working on a fix. We'll be back as soon as possible!"
      //   draft.isFlashVisible = true
      //   draft.isGeneratingResponse = false
      //   draft.alertDanger = true
      //   draft.messages.pop()
      //   draft.messages.pop()
      // })

      // Send an asyncronous request to the backend to generate the response
      try {
        const response = await Axios.post(`${backendURL}/gen-answer`, { input: state.messages.concat([{ role: "user", content: state.input, context: "" }]) })
        if (response.data) {
          // if the response is generated, add it to the UI and remove the loading message
          console.log(response.data)
          setState(draft => {
            draft.messages.pop()
            draft.messages.push({ role: "assistant", content: response.data })
            draft.isGeneratingResponse = false
          })
          chatContainer.current.scrollTop = chatContainer.current.scrollHeight
        } else {
          setState(draft => {
            draft.flashMessage = "We ran into an issue, please try again later"
            draft.isFlashVisible = true
            draft.isGeneratingResponse = false
            draft.messages.pop()
            draft.messages.pop()
            setTimeout(() => {
              chatContainer.current.scrollTop = chatContainer.current.scrollHeight
            }, 100)
          })
        }
      } catch (err) {
        setState(draft => {
          draft.flashMessage = "Check your network and try again"
          draft.isFlashVisible = true
          draft.isGeneratingResponse = false
          draft.alertDanger = true
          draft.messages.pop()
          console.log(state.messages)
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
    toggleBar.current.checked = !state.darkMode
  }

  function toggleSidebar() {
    // addevent listener to the sidebar menu
    if (sidebar1.current.style.left == "0px") {
      sidebar1.current.style.left = "-400px"
      setState(draft => {
        draft.isSideBarOpen = false
      })
    } else {
      sidebar1.current.style.left = "0px"
      setState(draft => {
        draft.isSideBarOpen = true
      })
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight
    input.current.focus()
  }, [])

  // Change the loading message after some seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(draft => {
        draft.loadingMessage = "A moment please..."
      })
    }, 8000)
    const timer1 = setTimeout(() => {
      setState(draft => {
        draft.loadingMessage = "Generating response"
      })
    }, 13000)

    const timer2 = setTimeout(() => {
      setState(draft => {
        draft.loadingMessage = "Almost done..."
      })
    }, 18000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [state.loadingMessage])

  return (
    <>
      <FlashMessage isFlashVisible={state.isFlashVisible} setState={setState} message={state.flashMessage} />
      <div className={`main-int-cont h-[100dvh] ${state.darkMode ? "bg-[#1b1b1d] text-[#222]" : "bg-[#fff]"} flex justify-between w-full overflow-clip`}>
        <div ref={sidebar1} className={`main-sidebar1 lg:w-1/4 p-5 lg:h-full ${state.darkMode ? "bg-[#2e2e2e]" : "bg-[#f1f1f1]"} lg:relative fixed left-100 w-[80%] z-3 h-[100dvh] ${state.darkMode ? "border-r-black text-white" : ""}`}>
          <div>
            <div className={`main-sidebar1-head mb-[50px] ${state.darkMode ? "text-white" : "text-black"}`}>
              <div className="main-sidebar1-logo">
                <img src="/images/logo3.png" />
              </div>
              <h2>Matty</h2>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="main-sidebar1-recent-head">
                <h4 className="mb-4">Recent Activities</h4>
                <div className="main-sidebar1-menus-cont">
                  <ul>
                    <li>
                      <a href="#">
                        <MessagesSquare size={15} />
                        <p>New Chat</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="main-sidebar1-recent-head">
                <div className="main-sidebar1-menus-cont">
                  <ul>
                    <li>
                      <Link to="/about">
                        <BadgeQuestionMark size={15} />
                        <p>About Matty</p>
                      </Link>
                    </li>
                    <li>
                      <a href="#" onClick={showDialog}>
                        <Settings size={15} />
                        <p>Settings</p>
                      </a>
                      <AnimatePresence>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.33 }} className="dialog-cont bg-[#222]" ref={dialogContainer} style={state.showDialog ? { display: "flex" } : { display: "none" }}>
                          <div className="flex justify-between items-center w-full">
                            <div>
                              <p>Dark</p>
                            </div>
                            <label class="switch">
                              <input type="checkbox" onChange={changeTheme} ref={toggleBar} />
                              <span ref={toggler} class="slider round"></span>
                            </label>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="absolute top-0 right-0 bottom-0 left-0 bg-black z-1"></div> */}
        </div>

        <div className="main-sidebar2 w-3/4 flex flex-col h-full mb-4">
          <div className={`main-sidebar2-head sticky top-[0px] flex justify-between flex-shrink-0 items-center border-b ${state.darkMode ? "border-b-black" : "border-b-[#f1f1f1]"}`}>
            <div className="main-sidebar1-head flex items-center ">
              <div className="main-sidebar1-logo">
                <img src={`${state.darkMode ? "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1760393145/logo1_jop19l.png" : "/images/logo1.png"}`} />
              </div>
              <h2>Matty</h2>
            </div>
            <div onClick={toggleSidebar} ref={sideBarMenu} className="sidebar-menu text-white p-1 hover:bg-emerald-950 rounded-xs block sm:hidden">
              {state.isSideBarOpen ? <X /> : <Menu />}
            </div>
            <div className={`sidebar-menu ${state.darkMode ? "text-white" : "text-black"} p-1 hover:bg-emerald-950 rounded-xs hidden sm:block`}>
              <CircleUserRound />
            </div>
          </div>
          <div className="chat-cont h-full relative w-[90%] overflow-y-auto flex flex-col">
            <div ref={chatContainer} className="chat-messages flex-grow overflow-y-auto">
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
                  <TypeIt as="div" options={{ cursor: false, speed: 40 }}>
                    <h1 className={`text-xl lg:text-2xl ${state.darkMode ? "text-[#e8eaed]" : "text-[#222222]"}`}>
                      Hello, I'm{" "}
                      <span className="text-[#0076ff]">
                        <em>Matty,</em>
                      </span>{" "}
                      Your Unijos vitual Assistant, How may I help?
                    </h1>
                  </TypeIt>
                </div>
              )}
            </div>
            <div className="input-cont">
              <form onSubmit={handleSubmit}>
                <div className={`input flex justify-between items-center rounded-xl ${state.darkMode ? "bg-[#2e2e2e]" : "bg-white"} border border-[#2e2e2e] focus-within:border-[#7cb3f3] mb-[4px]`}>
                  <textarea
                    className={`${state.darkMode ? "text-white" : "text-[#444]"}`}
                    ref={input}
                    name="input"
                    value={state.input}
                    onChange={e =>
                      setState(draft => {
                        draft.input = e.target.value
                      })
                    }
                    onKeyDown={handleKeyDown}
                    type={"text"}
                    placeholder="Ask Unijos related questions"
                  ></textarea>
                  <div className="button-cont">
                    {state.isGeneratingResponse ? (
                      <SmallLoading width={"30px"} height={"30px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} position={"relative"} marginRight={"5px"} transform={"none"} top={"0"} left={"0"} />
                    ) : (
                      <button type="submit" className={`${state.darkMode ? "bg-[#2a2a2a]" : "bg-[#ddd]"} text-[#0076ff]`}>
                        <SendHorizonal size={"18px"} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[#666666] text-xs">Matty's response might include mistakes</p>
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
