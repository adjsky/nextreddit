"use client"

import React, { cloneElement, useMemo, useEffect } from "react"
import useToggle from "@/utils/use-toggle"
import { motion, useAnimationControls } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"
import { lockScroll, unlockScroll } from "@/utils/lock-body-scroll"

import type { ImageProps } from "next/image"
import type { ReactElement } from "react"

const MediaViewer: React.FC<{ children: ReactElement<ImageProps> }> = ({
  children
}) => {
  const [toggled, toggle] = useToggle()
  const controls = useAnimationControls()

  const bigImage = useMemo(
    () =>
      cloneElement(children, {
        className:
          "max-w-[1000px] w-[calc(100%-1.25rem)] h-auto max-h-[85%] object-contain"
      }),
    [children]
  )

  const handleClose = async () => {
    await controls.start("closed")
    unlockScroll()
    toggle()
  }

  const handleOpen = () => {
    lockScroll()
    toggle()
  }

  useEffect(() => {
    if (!toggled) {
      return
    }

    controls.start("open")
  }, [controls, toggled])

  return (
    <>
      <button onClick={handleOpen}>{children}</button>
      {toggled && (
        <motion.div
          animate={controls}
          initial="closed"
          variants={{
            open: {
              opacity: 1,
              transition: { ease: "easeOut", duration: 0.15 }
            },
            closed: {
              opacity: 0,
              transition: { ease: "easeIn", duration: 0.15 }
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,.88)]"
          onClick={handleClose}
        >
          <button className="group absolute right-1 top-1 rounded-full p-1.5 transition-colors hover:bg-gray-600/40 sm:right-3 sm:top-3">
            <IoCloseOutline
              size="1.75rem"
              className="stroke-gray-100 transition-colors group-hover:stroke-white"
            />
          </button>
          {bigImage}
        </motion.div>
      )}
    </>
  )
}

export default MediaViewer
