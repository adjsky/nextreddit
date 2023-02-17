"use client"
import React, { useState, useEffect, useCallback } from "react"
import useWindowEvent from "@/utils/use-window-event"
import { IoArrowUp } from "react-icons/io5"
import clsx from "clsx"

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const callback = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight)
  }, [])

  useWindowEvent("scroll", callback)
  useEffect(() => {
    callback()
  }, [callback])

  if (!visible) {
    return null
  }

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, left: 0 })
      }}
      className={clsx(
        "fixed bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border",
        "border-gray-300 bg-black-900/80 transition-colors hover:bg-gray-500/80"
      )}
    >
      <IoArrowUp className="stroke-aqua" size="1.5rem" />
    </button>
  )
}

export default ScrollToTop
