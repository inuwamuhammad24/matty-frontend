import React, { useEffect } from "react"
import { AnimatePresence, easeInOut, motion } from "framer-motion"

function FlashMessage(props) {
  useEffect(() => {
    setTimeout(() => {
      props.setState(draft => {
        draft.isFlashVisible = false
      })
    }, 3000)
  }, [props.isFlashVisible])
  return (
    <AnimatePresence>
      {props.isFlashVisible && (
        <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} transition={{ duration: 0.33, ease: easeInOut }} className="fixed top-8 right-4 bg-[#12181F] rounded-md border border-[#6b6b6b80] px-8 py-4 text-[#f7e4e4] z-5 flex items-center gap-2">
          <i className="bx  bxs-info-circle text-lg text-[#d44950]"></i>
          <p className="">{props.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FlashMessage
